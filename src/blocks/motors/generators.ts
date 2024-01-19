import Blockly from 'blockly';
import type { Block } from 'blockly';

Blockly['Arduino']['move_motor'] = function(block: Block) {
  const motorNumber = Blockly['Arduino'].valueToCode(
    block,
    'MOTOR',
    Blockly['Arduino'].ORDER_ATOMIC
  );

  const direction = block.getFieldValue('DIRECTION');

  const speed = Blockly['Arduino'].valueToCode(
    block,
    'SPEED',
    Blockly['Arduino'].ORDER_ATOMIC
  );

  Blockly['Arduino'].libraries_['include_motor_library'] =
    '#include <rds3.h>;\n';
  Blockly['Arduino'].setupCode_[
    'digital_display_setup'
  ] = `rds3.Motor_Settings();`;

  let code = 'rds3.Motor_' + motorNumber + '(' + direction + ',' + speed + ');\n';

  return code;
};
