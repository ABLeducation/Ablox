import { findFieldValue } from "../../../blockly/helpers/block-data.helper";
import { arduinoFrameByExplanation } from "../frame-transformer.helpers";
import { generateInputFrame } from "../generate-frame";
import { BlockToFrameTransformer } from "../block-to-frame.interface";

export const customBlock: BlockToFrameTransformer = (
  blocks,
  block,
  variables,
  timeline,
  preivousState
) => {
  const functionName = findFieldValue(block, "NAME");
  const functionCallState = arduinoFrameByExplanation(
    block.id,
    block.blockName,
    timeline,
    `Calling function ${functionName}.`,
    preivousState
  );

  const functionDefinitionBlock = blocks.find(
    (b) =>
      b.blockName === "procedures_defnoreturn" &&
      findFieldValue(b, "NAME") === functionName
  );

  return [
    functionCallState,
    ...generateInputFrame(
      functionDefinitionBlock,
      blocks,
      variables,
      timeline,
      "STACK",
      functionCallState
    ),
  ];
};
