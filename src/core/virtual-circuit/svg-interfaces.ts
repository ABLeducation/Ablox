import { ArduinoFrame, ArduinoComponentState } from '../frames/arduino.frame';
// We put the interfaces here to prevent circular dependency

export interface ResetExistComponentEl {
  (
    frame: ArduinoFrame,
    state: ArduinoComponentState,
    componentEl: Element,
    showArduino: boolean
  ): void;
}

export interface CreateWires {
  (
    frame: ArduinoFrame,
    state: ArduinoComponentState,
    componentEl: Element,
    showArduino: boolean
  ): void;
}

export interface ResetExistingComponentNoArduino {
  (
    frame: ArduinoFrame,
    state: ArduinoComponentState,
    componentEl: Element,
    showArduino: boolean
  ): void;
}

export interface CreateComponent {
  (
    frame: ArduinoFrame,
    state: ArduinoComponentState,
    componentEl: Element,
    showArduino: boolean
  ): void;
}
