import { Timeline, ArduinoFrame } from "../arduino.frame";
import { Color } from "../arduino.frame";
import { BlockData } from "../../blockly/dto/block.type";
import { VariableData } from "../../blockly/dto/variable.type";

export interface ValueGenerator {
  (
    blocks: BlockData[],
    currentBlock: BlockData,
    variables: VariableData[],
    timeline: Timeline,
    previousState?: ArduinoFrame
  ):
    | number
    | string
    | boolean
    | Color
    | number[]
    | string[]
    | boolean[]
    | Color[];
}
