import { ValueGenerator } from '../../value.factories';
import { findComponent } from '../../factory.helpers';
import { RfidState } from '../../../state/arduino-components.state';
import { ArduinoComponentType } from '../../../state/arduino.state';

export const rfidScannedCard: ValueGenerator = (
  blocks,
  block,
  variables,
  timeline,
  previousState
) => {
  return findComponent<RfidState>(previousState, ArduinoComponentType.RFID)
    .scannedCard;
};

export const rfidTag: ValueGenerator = (
  blocks,
  block,
  variables,
  timeline,
  previousState
) => {
  return findComponent<RfidState>(previousState, ArduinoComponentType.RFID).tag;
};

export const rfidCardNumber: ValueGenerator = (
  blocks,
  block,
  variables,
  timeline,
  previousState
) => {
  return findComponent<RfidState>(previousState, ArduinoComponentType.RFID)
    .cardNumber;
};
