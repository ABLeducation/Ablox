import { BlockData } from "../../blockly/dto/block.type";
import { Timeline, ArduinoFrame } from "../arduino.frame";
import { VariableData } from "../../blockly/dto/variable.type";

export interface BlockToFrameTransformer {
  (
    blocks: BlockData[],
    block: BlockData,
    variables: VariableData[],
    timeline: Timeline,
    previousState?: ArduinoFrame
  ): ArduinoFrame[];
}
