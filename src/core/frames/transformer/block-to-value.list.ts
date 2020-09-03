import {
  mathNumber,
  mathArithmetic,
  mathRound,
  mathModulus,
  mathRandom,
  numberToString,
} from "./blocktovalue/math";
import {
  logicBoolean,
  logicCompare,
  logicOperation,
  logicNot,
} from "./blocktovalue/logic";
import {
  text,
  textJoin,
  textLength,
  textParse,
  textIsEmpty,
  changeCase,
  numberToText,
} from "./blocktovalue/text";
import { colorPicker, randomColor, rgbColor } from "./blocktovalue/colors";
import { getVariable } from "./blocktovalue/get_variables";
import { getItemInList } from "./blocktovalue/list-get-item";
import { getArduinoMessage, arduinoHasMessage } from "./blocktovalue/message";
import { timeSeconds } from "./blocktovalue/time_seconds";
import { hasBtMessage, getBtMessage } from "./blocktovalue/bluetooth";
import { getPinState } from "./blocktovalue/pin";
import { isButtonPressed } from "./blocktovalue/button";
import { irRemoteHasCode, irRemoteGetCode } from "./blocktovalue/ir_remote";
import { ultraSonicSensorDistance } from "./blocktovalue/ultra_sonic_sensor";
import { rfidScannedCard, rfidCardNumber, rfidTag } from "./blocktovalue/rfid";
import { getHumidity, getTemp } from "./blocktovalue/temp";
import { ValueGenerator } from "./block-to-value.interface";

export const valueList: { [blockName: string]: ValueGenerator } = {
  math_number: mathNumber,
  math_arithmetic: mathArithmetic,
  math_modulo: mathModulus,
  math_round: mathRound,
  math_random_int: mathRandom,

  logic_boolean: logicBoolean,
  logic_compare: logicCompare,
  logic_operation: logicOperation,
  logic_negate: logicNot,

  variables_get_number: getVariable,
  variables_get_string: getVariable,
  variables_get_boolean: getVariable,
  variables_get_colour: getVariable,

  get_colour_from_list: getItemInList,
  get_string_from_list: getItemInList,
  get_number_from_list: getItemInList,
  get_boolean_from_list: getItemInList,

  string_to_number: numberToString,
  text_join: textJoin,
  text_length: textLength,
  text,
  parse_string_block: textParse,
  text_isEmpty: textIsEmpty,
  number_to_string: numberToText,
  text_changeCase: changeCase,

  colour_picker: colorPicker,
  colour_random: randomColor,
  colour_rgb: rgbColor,

  arduino_get_message: getArduinoMessage,
  arduino_receive_message: arduinoHasMessage,

  time_seconds: timeSeconds,

  bluetooth_has_message: hasBtMessage,
  bluetooth_get_message: getBtMessage,

  digital_read: getPinState("digital_read_setup"),
  analog_read: getPinState("analog_read_setup"),

  is_button_pressed: isButtonPressed,

  ir_remote_get_code: irRemoteGetCode,
  ir_remote_has_code_receive: irRemoteHasCode,

  ultra_sonic_sensor_motion: ultraSonicSensorDistance,

  rfid_scan: rfidScannedCard,
  rfid_card: rfidCardNumber,
  rfid_tag: rfidTag,

  temp_get_humidity: getHumidity,
  temp_get_temp: getTemp,
};
