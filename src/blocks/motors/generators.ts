import Blockly from 'blockly';
import type { Block } from 'blockly';

Blockly['Arduino']['move_motor'] = function(block: Block) {
  const motorNumber = Blockly['Arduino'].valueToCode(
    block,
    'MOTOR',
    Blockly['Arduino'].ORDER_ATOMIC
  );

  const direction = block.getFieldValue('DIRECTION').toUpperCase();

  const speed = Blockly['Arduino'].valueToCode(
    block,
    'SPEED',
    Blockly['Arduino'].ORDER_ATOMIC
  );

  Blockly['Arduino'].libraries_['include_motor_library'] =
    '#include <rds3.h>;\n';
  Blockly['Arduino'].libraries_['include_motor_init_' + motorNumber] =
    'rds3.Motor_Settings' + '();\n';

  let code = 'rds3.motor_' + motorNumber + '.run(' + direction + ');\n';
  code += 'rds3.motor_' + motorNumber + '.setSpeed(' + speed + ');\n';

  return code;
};
