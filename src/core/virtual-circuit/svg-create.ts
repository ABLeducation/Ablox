import { createComponentEl } from "./svg-helpers";
import type { Element, Svg } from "@svgdotjs/svg.js";
import {
  ArduinoComponentState,
  ArduinoComponentType,
  Visual,
} from "../frames/arduino.frame";
import { addDraggableEvent } from "./component-events.helpers";
import {
  bluetoothPosition,
  createBluetoothWires,
  bluetoothCreate,
} from "../../blocks/bluetooth/virtual-circuit";
import {
  createIrRemote,
  createWiresIrRemote,
  positionIrRemote,
} from "../../blocks/ir_remote/virtual-circuit";
import {
  createWiresLcd,
  lcdCreate,
  lcdPosition,
} from "../../blocks/lcd_screen/virtual-circuit";
import {
  createWiresRgbLed,
  createRgbLed,
  positionRgbLed,
} from "../../blocks/rgbled/virtual-circuit";
import {
  createWiresLedMatrix,
  ledMatrixCreate,
  ledMatrixPosition,
} from "../../blocks/led_matrix/virtual-circuit";

import {
  ledCreate,
  createWiresLed,
  ledPosition,
} from "../../blocks/led/virtual-circuit";

import { arduinoMessageCreate } from "../../blocks/message/virtual-circuit";
import {
  motorCreate,
  motorPosition,
} from "../../blocks/motors/virtual-circuit";
import {
  neoPixelCreate,
  createWiresNeoPixels,
  neoPixelPosition,
} from "../../blocks/neopixels/virtual-circuit";
import {
  digitalAnanlogWritePinCreate,
  createWiresDigitalAnalogWrite,
  digitalAnanlogWritePinPosition,
} from "../../blocks/writepin/virtual-circuit";

import {
  createWiresRfid,
  positionRfid,
  createRfid,
} from "../../blocks/rfid/virtual-circuit";
import {
  servoCreate,
  createWiresServo,
  servoPosition,
} from "../../blocks/servo/virtual-circuit";
import {
  createTemp,
  createWiresTemp,
  positionTemp,
} from "../../blocks/temperature/virtual-circuit";
import {
  createWiresUltraSonicSensor,
  positionUltraSonicSensor,
  createUltraSonicSensor,
} from "../../blocks/ultrasonic_sensor/virtual-circuit";
import { getSvgString } from "./svg-string";
import { arduinoComponentStateToId } from "../frames/arduino-component-id";
import type {
  BreadBoardArea,
  MicroController,
} from "../microcontroller/microcontroller";
import {
  createButton,
  createWiresButton,
  positionButton,
} from "../../blocks/button/virtual-circuit";
import {
  createWireDigitalSensor,
  positionDigitalSensor,
  createDigitalSensor,
} from "../../blocks/digitalsensor/virtual-circuit";

import {
  analogSensorCreate,
  analogSensorPosition,
  createWireAnalogSensors,
} from "../../blocks/analogsensor/virtual-circuit";
import type { Settings } from "../../firebase/model";
import { takeBoardArea } from "./wire";
import {
  createThermistorSensorHook,
  createThermistorWires,
  positionThermistorSensor,
} from "../../blocks/thermistor/virtual-circuit";
import {
  afterCreatePassiveBuzzer,
  createWiresPassiveBuzzer,
  positionPassiveBuzzer,
} from "../../blocks/passivebuzzer/virtual-circuit";
import {
  createWireStepperMotor,
  positionStepperMotor,
} from "../../blocks/steppermotor/virtual-circuit";
import { saveComponentsHoles } from "../blockly/helpers/save-svg-data-board-selector";

export default (
  state: ArduinoComponentState,
  draw: Svg,
  arduinoEl: Element,
  board: MicroController,
  settings: Settings,
  visual?: Visual
): void => {
  const id = arduinoComponentStateToId(state);
  const visualComponent =
    visual && visual.components ? visual.components[id] : undefined;
  const usedHoles =
    visualComponent && visualComponent.holes ? visualComponent.holes : [];
  // only take an area if the component does
  // not exist
  const area = takeBoardArea(usedHoles);

  const componentEl = createComponentEl(
    draw,
    state,
    getSvgString(state)
  ) as Element;
  componentEl.on("dblclick", function () {
    alert("function called");
  });
  // This so that we know the area that a component has taken up.
  componentEl.data("holes", area.holes.sort().join("-"));
  saveComponentsHoles(area.holes, id);
  addDraggableEvent(componentEl, arduinoEl, draw);
  (window as any)[state.type] = componentEl;

  console.log(area, visual, "position");
  if (
    area &&
    (!visual ||
      !visual.components ||
      !visual.components[id] ||
      !visual.components[id].x ||
      !visual.components[id].y)
  ) {
    console.log("positionComponentHookFunc x y");

    positionComponentHookFunc[state.type](
      state,
      componentEl,
      arduinoEl,
      draw,
      board,
      area
    );
  } else if (
    area &&
    area.holes.sort().join("-") === visual.components[id].holes.sort().join("-")
  ) {
    console.log("positioned x y");
    const { x, y } = visual.components[id];
    componentEl.x(x);
    componentEl.y(y);
  }

  if (area) {
    createWires[state.type](
      state,
      draw,
      componentEl,
      arduinoEl,
      id,
      board,
      area
    );
  }
  createComponentHookFunc[state.type](
    state,
    componentEl,
    arduinoEl,
    draw,
    board,
    settings
  );
};

export interface PositionComponent<T extends ArduinoComponentState> {
  (
    state: T,
    componentEl: Element,
    arduinoEl: Element,
    draw: Svg,
    board: MicroController,
    area: BreadBoardArea
  ): void;
}

export interface AfterComponentCreateHook<T extends ArduinoComponentState> {
  (
    state: T,
    componentEl: Element,
    arduinoEl: Element,
    draw: Svg,
    board: MicroController,
    settings: Settings
  ): void;
}

export interface CreateWire<T extends ArduinoComponentState> {
  (
    state: T,
    draw: Svg,
    component: Element,
    arduinoEl: Element,
    componentId: string,
    board: MicroController,
    area: BreadBoardArea
  ): void;
}

const createNoWires: CreateWire<ArduinoComponentState> = (
  state,
  draw,
  component,
  arduino,
  id,
  area
) => {};

const emptyPositionComponent: PositionComponent<ArduinoComponentState> = (
  state,
  componentEl,
  arduinoEl,
  draw
) => {};

const emptyCreateHookComponent: AfterComponentCreateHook<ArduinoComponentState> = (
  state,
  componentEl,
  arduinoEl,
  draw,
  wire
) => {};

const createWires: { [key: string]: CreateWire<ArduinoComponentState> } = {
  [ArduinoComponentType.BLUE_TOOTH]: createBluetoothWires,
  [ArduinoComponentType.BUTTON]: createWiresButton,
  [ArduinoComponentType.IR_REMOTE]: createWiresIrRemote,
  [ArduinoComponentType.LCD_SCREEN]: createWiresLcd,
  [ArduinoComponentType.LED_COLOR]: createWiresRgbLed,
  [ArduinoComponentType.LED_MATRIX]: createWiresLedMatrix,
  [ArduinoComponentType.LED]: createWiresLed,
  [ArduinoComponentType.MESSAGE]: createNoWires,
  [ArduinoComponentType.MOTOR]: createNoWires,
  [ArduinoComponentType.NEO_PIXEL_STRIP]: createWiresNeoPixels,
  [ArduinoComponentType.RFID]: createWiresRfid,
  [ArduinoComponentType.SERVO]: createWiresServo,
  [ArduinoComponentType.WRITE_PIN]: createWiresDigitalAnalogWrite,
  [ArduinoComponentType.TEMPERATURE_SENSOR]: createWiresTemp,
  [ArduinoComponentType.ULTRASONICE_SENSOR]: createWiresUltraSonicSensor,
  [ArduinoComponentType.DIGITAL_SENSOR]: createWireDigitalSensor,
  [ArduinoComponentType.ANALOG_SENSOR]: createWireAnalogSensors,
  [ArduinoComponentType.THERMISTOR]: createThermistorWires,
  [ArduinoComponentType.PASSIVE_BUZZER]: createWiresPassiveBuzzer,
  [ArduinoComponentType.STEPPER_MOTOR]: createWireStepperMotor,
};

const positionComponentHookFunc: {
  [key: string]: PositionComponent<ArduinoComponentState>;
} = {
  [ArduinoComponentType.BLUE_TOOTH]: bluetoothPosition,
  [ArduinoComponentType.BUTTON]: positionButton,
  [ArduinoComponentType.IR_REMOTE]: positionIrRemote,
  [ArduinoComponentType.LCD_SCREEN]: lcdPosition,
  [ArduinoComponentType.LED_COLOR]: positionRgbLed,
  [ArduinoComponentType.LED_MATRIX]: ledMatrixPosition,
  [ArduinoComponentType.LED]: ledPosition,
  [ArduinoComponentType.MESSAGE]: emptyPositionComponent,
  [ArduinoComponentType.MOTOR]: motorPosition,
  [ArduinoComponentType.NEO_PIXEL_STRIP]: neoPixelPosition,
  [ArduinoComponentType.WRITE_PIN]: digitalAnanlogWritePinPosition,
  [ArduinoComponentType.RFID]: positionRfid,
  [ArduinoComponentType.SERVO]: servoPosition,
  [ArduinoComponentType.TEMPERATURE_SENSOR]: positionTemp,
  [ArduinoComponentType.ULTRASONICE_SENSOR]: positionUltraSonicSensor,
  [ArduinoComponentType.DIGITAL_SENSOR]: positionDigitalSensor,
  [ArduinoComponentType.ANALOG_SENSOR]: analogSensorPosition,
  [ArduinoComponentType.THERMISTOR]: positionThermistorSensor,
  [ArduinoComponentType.PASSIVE_BUZZER]: positionPassiveBuzzer,
  [ArduinoComponentType.STEPPER_MOTOR]: positionStepperMotor,
};

const createComponentHookFunc: {
  [key: string]: AfterComponentCreateHook<ArduinoComponentState>;
} = {
  [ArduinoComponentType.BLUE_TOOTH]: bluetoothCreate,
  [ArduinoComponentType.BUTTON]: createButton,
  [ArduinoComponentType.IR_REMOTE]: createIrRemote,
  [ArduinoComponentType.LCD_SCREEN]: lcdCreate,
  [ArduinoComponentType.LED_COLOR]: createRgbLed,
  [ArduinoComponentType.LED_MATRIX]: ledMatrixCreate,
  [ArduinoComponentType.MESSAGE]: arduinoMessageCreate,
  [ArduinoComponentType.MOTOR]: motorCreate,
  [ArduinoComponentType.NEO_PIXEL_STRIP]: neoPixelCreate,
  [ArduinoComponentType.WRITE_PIN]: digitalAnanlogWritePinCreate,
  [ArduinoComponentType.LED]: ledCreate,
  [ArduinoComponentType.RFID]: createRfid,
  [ArduinoComponentType.SERVO]: servoCreate,
  [ArduinoComponentType.TEMPERATURE_SENSOR]: createTemp,
  [ArduinoComponentType.ULTRASONICE_SENSOR]: createUltraSonicSensor,
  [ArduinoComponentType.DIGITAL_SENSOR]: createDigitalSensor,
  [ArduinoComponentType.ANALOG_SENSOR]: analogSensorCreate,
  [ArduinoComponentType.THERMISTOR]: createThermistorSensorHook,
  [ArduinoComponentType.PASSIVE_BUZZER]: afterCreatePassiveBuzzer,
  [ArduinoComponentType.STEPPER_MOTOR]: emptyCreateHookComponent,
};
