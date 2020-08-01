import { Svg, Element } from '@svgdotjs/svg.js';
import {
  ArduinoFrame,
  ArduinoComponentState,
  ArduinoComponentType,
} from '../../frames/arduino.frame';
import { componentToSvgId } from '../svg-helpers';

import _ from 'lodash';

import servoSVGText from '../svgs/servo/servo.svg';
import lcd_16_2_svg from '../svgs/lcd/lcd_16_2.svg';
import lcd_20_4_svg from '../svgs/lcd/lcd_20_4.svg';
import { LCDScreenState } from '../../frames/arduino-components.state';
import { updateWires } from '../wire';

abstract class SvgComponentPaint {
  constructor(
    protected state: ArduinoComponentState,
    protected frame: ArduinoFrame,
    protected draw: Svg,
    protected showArduino: boolean
  ) {}

  public create(): void {
    const id = componentToSvgId(this.state);
    let componentEl = this.draw.find('#' + id).pop();

    if (componentEl && !this.showArduino) {
      this.resetComponentNoArduino(componentEl);
      return;
    }

    if (componentEl && this.showArduino) {
      this.resetComponent(componentEl);
      return;
    }

    const arduino = this.findArduinoEl();

    componentEl = this.createComponentEl();
    componentEl.addClass('component');
    componentEl.attr('id', id);
    (componentEl as Svg).viewbox(
      0,
      0,
      componentEl.width(),
      componentEl.height()
    );
    (componentEl as any).draggable().on('dragmove', () => {
      if (this.showArduino) {
        updateWires(componentEl, this.draw, arduino as Svg);
      }
    });

    if (this.showArduino) {
    }
  }

  protected resetComponentNoArduino(element: Element) {}

  protected resetComponent(element: Element) {}

  protected createWires() {}

  /**
   * Creates a new component element
   */
  protected createComponentEl() {
    if (!_.isEmpty(svgStrings[this.state.type])) {
      return this.draw.svg(svgStrings[this.state.type]).last();
    }

    if (this.state.type === ArduinoComponentType.LCD_SCREEN) {
      const state = this.state as LCDScreenState;
      return this.draw.svg(state.rows === 4 ? lcd_20_4_svg : lcd_16_2_svg);
    }

    throw new Error('No Svg String found for ' + this.state.type);
  }

  /**
   * Finds the Arduino EL
   */
  protected findArduinoEl() {
    return this.draw.findOne('#arduino_main_svg') as Element;
  }
}

const svgStrings = {
  [ArduinoComponentType.SERVO]: servoSVGText,
};
