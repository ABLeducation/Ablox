import {
  ArduinoComponentState,
  ArduinoFrame,
  ArduinoComponentType,
} from '../frames/arduino.frame';
import { Svg, Element } from '@svgdotjs/svg.js';
import {
  servoCreate,
  servoUpdate,
  servoReset,
  servoResetComponentEl,
} from './components/servo.sync';
import { bluetoothCreate, bluetoothUpdate } from './components/bluetooth.sync';
import {
  arduinoMessageUpdate,
  arduinoMessageCreate,
} from './components/arduino-message.sync';
import { lcdCreate, lcdUpdate } from './components/lcd.sync';
import { componentToSvgId } from './svg-helpers';
import { updateRgbLed, createRgbLed } from './components/rgbled.sync';
import { ledCreate, updateLed, resetLed } from './components/led.sync';
import {
  digitalAnanlogWritePinCreate,
  digitalAnalogWritePinSync,
  digitalAnalogWritePinReset,
} from './components/digitalanalogwritepin.sync';
import { neoPixelCreate } from './components/neoPixel.sync';
import { LCDScreenState } from '../frames/arduino-components.state';

import _ from 'lodash';

// SVG Strings
import rgbLedLightStripSvg from '../svgs/rgbledlightstrip/rgbledlightstrip.svg';
import servoSVGText from '../svgs/servo/servo.svg';
import rgbLedSvg from '../svgs/rgbled/rgbled.svg';
import lcd_16_2_svg from '../svgs/lcd/lcd_16_2.svg';
import lcd_20_4_svg from '../svgs/lcd/lcd_20_4.svg';
import bluetoothSvg from '../svgs/bluetooth/bluetooth.svg';

// SVG Interfaces
import { ResetExistComponentEl, CreateWires } from './svg-interfaces';
import { updateWires } from './wire';
import { positionComponent } from './svg-position';

export interface SyncComponent {
  (state: ArduinoComponentState, ArduinoFrame: ArduinoFrame, draw: Svg): void;
}

export interface ResetComponent {
  (componentEl: Element): void;
}

export interface CreateComponent {
  (
    state: ArduinoComponentState,
    frame: ArduinoFrame,
    draw: Svg,
    showArduino: boolean
  ): void;
}

const listSyncs = [
  servoUpdate,
  arduinoMessageUpdate,
  bluetoothUpdate,
  lcdUpdate,
  updateRgbLed,
  updateLed,
  digitalAnalogWritePinSync,
];
const listCreate = [
  servoCreate,
  arduinoMessageCreate,
  bluetoothCreate,
  lcdCreate,
  createRgbLed,
  ledCreate,
  digitalAnanlogWritePinCreate,
  neoPixelCreate,
];

const resetComponent = [servoReset, resetLed, digitalAnalogWritePinReset];

export const syncComponents = (frame: ArduinoFrame, draw: Svg) => {
  frame.components.forEach((componentState) => {
    listSyncs.forEach((func) => func(componentState, frame, draw));
  });
  const componentIds = frame.components.map((c) => componentToSvgId(c));
  console.log(componentIds, 'componentIds');
  draw
    .find('.component')
    .filter((componentEl) => !componentIds.includes(componentEl.id()))
    .forEach((componentEl) => {
      resetComponent.forEach((func) => func(componentEl));
    });
};

export const createComponents = (
  frame: ArduinoFrame,
  draw: Svg,
  showArduino: boolean
) => {
  frame.components.forEach((componentState) =>
    createComponent(frame, componentState, draw, showArduino)
  );
};

const createComponent = (
  frame: ArduinoFrame,
  componentState: ArduinoComponentState,
  draw: Svg,
  showArduino: boolean
) => {
  const id = componentToSvgId(componentState);
  let componentEl = draw.findOne('#' + id) as Element;
  const arduino = draw.findOne('#arduino_main_svg') as Element;

  if (showArduino && componentEl) {
    const wiresExist = draw.find(`[component-id=${id}]`).length > 0;

    if (!wiresExist) {
      createWiresFunctionList[componentState.type](
        componentEl,
        componentState,
        draw,
        showArduino
      );
    }

    (componentEl as any).draggable().on('dragmove', () => {
      if (showArduino) {
        updateWires(componentEl, draw, arduino as Svg);
      }
    });

    if (_.isFunction(resetComponentPositionFunctionList[componentState.type])) {
      resetComponentPositionFunctionList[componentState.type](
        frame,
        componentState,
        componentEl,
        showArduino
      );
    }
    return;
  }

  if (componentEl && !showArduino) {
    draw
      .find('line')
      .filter((w) => w.data('component-id') === id)
      .forEach((w) => w.remove());
    return;
  }

  componentEl = createComponentEl(draw, componentState);
  componentEl.addClass('component');
  componentEl.attr('id', id);
  componentEl.data('component-type', componentState.type);

  if (showArduino) {
    arduino.y(draw.viewbox().y2 - arduino.height() + 100);
  }
};

const createComponentEl = (draw: Svg, state: ArduinoComponentState) => {
  if (state.type === ArduinoComponentType.LCD_SCREEN) {
    return draw
      .svg((state as LCDScreenState).rows === 4 ? lcd_20_4_svg : lcd_16_2_svg)
      .last();
  }

  // TODO Fix RGB LED

  if (_.isEmpty(svgString[state.type])) {
    throw new Error('No Component for type ' + state.type);
  }

  return draw.svg(svgString[state.type]).last();
};

const svgString = {
  [ArduinoComponentType.BLUE_TOOTH]: bluetoothSvg,
  [ArduinoComponentType.SERVO]: servoSVGText,
  [ArduinoComponentType.NEO_PIXEL_STRIP]: rgbLedLightStripSvg,
};

type tempRemoveType =
  | ArduinoComponentType.SERVO
  | ArduinoComponentType.NEO_PIXEL_STRIP;

const resetComponentPositionFunctionList: {
  [key in tempRemoveType]: ResetExistComponentEl;
} = {
  [ArduinoComponentType.SERVO]: servoResetComponentEl,
  [ArduinoComponentType.NEO_PIXEL_STRIP]: servoResetComponentEl,
};

const createWiresFunctionList: {
  [key in tempRemoveType]: CreateWires;
} = {
  [ArduinoComponentType.SERVO]: servoResetComponentEl,
  [ArduinoComponentType.NEO_PIXEL_STRIP]: servoResetComponentEl,
};
