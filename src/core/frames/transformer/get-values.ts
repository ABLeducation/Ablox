import { Timeline, ArduinoFrame } from "../arduino.frame";
import { BlockData } from "../../blockly/dto/block.type";
import { VariableData } from "../../blockly/dto/variable.type";
import { findBlockInput } from "./frame-transformer.helpers";
import _ from "lodash";
import { ValueGenerator } from "./block-to-value.interface";
import { valueList } from "./block-to-value.list";

export const getInputValue = (
  blocks: BlockData[],
  block: BlockData,
  variables: VariableData[],
  timeline: Timeline,
  inputName: string,
  defaultValue: any,
  previousState: ArduinoFrame = undefined
) => {
  const inputBlock = findBlockInput(blocks, block, inputName);

  if (!inputBlock) {
    return defaultValue;
  }
  const value = blockToValue(
    blocks,
    inputBlock,
    variables,
    timeline,
    previousState
  );

  return value === undefined ? defaultValue : value;
};

export const blockToValue: ValueGenerator = (
  blocks,
  block,
  variables,
  timeline,
  previousState
) => {
  try {
    return valueList[block.blockName](
      blocks,
      block,
      variables,
      timeline,
      previousState
    );
  } catch (e) {
    console.trace();
    console.log(block);

    console.log(e);
    throw e;
  }
};
