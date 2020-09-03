import _ from "lodash";
import { BlockData } from "../../blockly/dto/block.type";
import { Timeline, ArduinoFrame } from "../arduino.frame";
import { BlockToFrameTransformer } from "./block-to-frame.interface";
import blockToFrameTransformerList from "./block-to-frame.list";
import { VariableData } from "../../blockly/dto/variable.type";
import {
  findInputStatementStartBlock,
  findBlockById,
} from "../../blockly/helpers/block-data.helper";

export const generateFrame: BlockToFrameTransformer = (
  blocks,
  block,
  variables,
  timeline,
  previousState
) => {
  try {
    return blockToFrameTransformerList[block.blockName](
      blocks,
      block,
      variables,
      timeline,
      previousState
    );
  } catch (e) {
    console.log(block.blockName, "block name");
    throw e;
  }
};

export const generateInputFrame = (
  block: BlockData,
  blocks: BlockData[],
  variables: VariableData[],
  timeline: Timeline,
  inputName: string,
  previousState?: ArduinoFrame
): ArduinoFrame[] => {
  // Fixing memory sharing between objects
  previousState = previousState ? _.cloneDeep(previousState) : undefined;
  const startingBlock = findInputStatementStartBlock(blocks, block, inputName);
  if (!startingBlock) {
    return [];
  }
  const arduinoStates = [];
  let nextBlock = startingBlock;
  do {
    const states = generateFrame(
      blocks,
      nextBlock,
      variables,
      timeline,
      previousState
    );
    arduinoStates.push(...states);
    const newPreviousState = states[states.length - 1];
    previousState = _.cloneDeep(newPreviousState);
    nextBlock = findBlockById(blocks, nextBlock.nextBlockId);
  } while (nextBlock !== undefined);

  return arduinoStates;
};
