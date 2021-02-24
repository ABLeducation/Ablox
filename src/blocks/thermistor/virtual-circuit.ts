import type {
  SyncComponent,
  ResetComponent,
} from "../../core/virtual-circuit/svg-sync";
import type {
  PositionComponent,
  CreateWire,
  CreateCompenentHook,
} from "../../core/virtual-circuit/svg-create";

import type { ThermistorState } from "./state";
import type { Element, Svg } from "@svgdotjs/svg.js";
import resistorSvg from "../../core/virtual-circuit/commonsvgs/resistors/resistor-tiny.svg";

import { positionComponent } from "../../core/virtual-circuit/svg-position";
import {
  createWire,
  createPowerWire,
  createGroundWire,
  findResistorBreadboardHoleXY,
  createStationaryWireOneUpFromPinToSideOfTheBoard,
} from "../../core/virtual-circuit/wire";
import { ARDUINO_PINS } from "../../core/microcontroller/selectBoard";
import { MicroController } from "../../core/microcontroller/microcontroller";

export const positionThermistorSensor: PositionComponent<ThermistorState> = (
  state,
  thermistorEl,
  arduinoEl,
  draw,
  board
) => {
  positionComponent(
    thermistorEl,
    arduinoEl,
    draw,
    state.pins[0],
    "PIN_GND",
    board
  );
};

export const createThermistorSensorHook: CreateCompenentHook<ThermistorState> = (
  state,
  thermistorEl
) => {};

export const updateThermistorSensor: SyncComponent = (
  state: ThermistorState,
  thermistorEl
) => {};

export const resetThermistorSensor: ResetComponent = (thermistorEl) => {};

export const createThermistorWires: CreateWire<ThermistorState> = (
  state,
  draw,
  componentEl,
  arduionEl,
  id,
  board
) => {
  createWire(
    componentEl,
    state.pins[0],
    "PIN_GND",
    arduionEl,
    draw,
    "#000",
    "GND-CONNECTOR",
    board
  );

  createStationaryWireOneUpFromPinToSideOfTheBoard(
    draw,
    arduionEl as Svg,
    state.pins[0],
    "right",
    board,
    "GND",
    id,
    "PIN_GND"
  );

  createPowerWire(
    componentEl,
    state.pins[0],
    arduionEl as Svg,
    draw,
    id,
    "left",
    board
  );
  createResistor(arduionEl, draw, state.pins[0], id, board);
};

const createResistor = (
  arduino: Svg | Element,
  draw: Svg,
  pin: ARDUINO_PINS,
  componentId: string,
  board: MicroController
) => {
  const resistorEl = draw.svg(resistorSvg).last();
  resistorEl.data("component-id", componentId);
  (window as any).resistor = resistorEl;

  const { x, y } = findResistorBreadboardHoleXY(pin, arduino, draw, board);
  resistorEl.cx(x);
  resistorEl.y(y);
  console.log(resistorEl, "resistorEl");
};
