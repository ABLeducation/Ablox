import Blockly from 'blockly';
import type { Block } from 'blockly';
import { isNotEmptyFunction, isNotEmptyString } from '../../help/isEmpty';

Blockly['Arduino']['arduino_setup'] = function (block: Block) {
  const statementsSetup = Blockly['Arduino'].statementToCode(block, 'setup');

  return (
    '\nvoid setup() { \n' +
    '__REPLACE_WITH_SETUP_CODE' +
    statementsSetup +
    '}\n'
  );
};

Blockly['Arduino']['arduino_loop'] = function (block: Block) {
  const statementsLoop = Blockly['Arduino'].statementToCode(block, 'loop');

  let resetBluetoothVariable = '';
  let resetMessageVariable = '';
  let resetIrRemoteCode = '';
  let getNewTempReading = '';
  let setJoyStickValues = '';
  let setSerialMessageDEV = '';

  if (isNotEmptyString(Blockly['Arduino'].setupCode_['bluetooth_setup'])) {
    resetBluetoothVariable = '\tbluetoothMessageDEV = ""; \n';
  }

  if (isNotEmptyString(Blockly['Arduino'].setupCode_['joystick'])) {
    setJoyStickValues = '\tsetJoyStickValues(); \n';
  }

  if (isNotEmptyString(Blockly['Arduino'].setupCode_['serial_begin'])) {
    resetMessageVariable = '\tserialMessageDEV= ""; \n';
    setSerialMessageDEV = '\tsetSerialMessage();';
  }

  if (isNotEmptyString(Blockly['Arduino'].setupCode_['setup_ir_remote'])) {
    resetIrRemoteCode = '\tirReceiver.resume(); \n';
  }

  if (
    isNotEmptyFunction(Blockly['Arduino'].functionNames_['takeTempReading'])
  ) {
    getNewTempReading = '\ttakeTempReading(); \n';
  }
  return (
    '\nvoid loop() { \n' +
    setSerialMessageDEV +
    statementsLoop +
    '\n' +
    resetBluetoothVariable +
    resetMessageVariable +
    resetIrRemoteCode +
    getNewTempReading +
    setJoyStickValues +
    '}'
  );
};
