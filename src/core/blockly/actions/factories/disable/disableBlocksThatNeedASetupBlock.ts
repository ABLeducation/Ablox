import { BlockEvent } from '../../../state/event.data';
import { DisableBlock, ActionType } from '../../actions';
import {
  multipleTopBlocks,
  blocksThatRequireSetup,
  setupBlockTypeToHumanName,
  BlockData
} from '../../../state/block.data';
import _ from 'lodash';

// This will disable blocks that require a setup block to run
// If there are more than 2 setup blocks it will disable all the blocks
// if multiple blocks are not allowed.  Example would be it would disable
// RFID block because only one RFID component is allowed but would not do
// The same for the button block
export const disableBlocksThatNeedASetupBlock = (
  event: BlockEvent
): DisableBlock[] => {
  const { blocks } = event;

  return blocks
    .filter((b) => _.keys(blocksThatRequireSetup).includes(b.blockName))
    .filter((block) => shouldDisableBlock(block, blocks))
    .map((b) => {
      return {
        blockId: b.id,
        type: ActionType.DISABLE_BLOCK,
        warningText: `This block requires a ${
          setupBlockTypeToHumanName[blocksThatRequireSetup[b.blockName]]
        }.`
      };
    });
};

const shouldDisableBlock = (block: BlockData, blocks: BlockData[]): boolean => {
  const nameOfSetupBlock = blocksThatRequireSetup[block.blockName];

  const numberOfSetupBlocks = blocks.filter(
    (b) => b.blockName === nameOfSetupBlock && !b.disabled
  ).length;

  if (numberOfSetupBlocks == 1) {
    return false;
  }

  // If no setup blocks are found we need disable the block
  if (numberOfSetupBlocks < 1) {
    return true;
  }

  // If the user has more that one setup block than it must be marked as multiple allowed
  return !multipleTopBlocks.includes(nameOfSetupBlock);
};
