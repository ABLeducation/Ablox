import { SyncComponent, ResetComponent } from '../svg-sync';
import { CreateCompenentHook, CreateWire } from '../svg-create';

import { ArduinoReceiveMessageState } from '../../frames/arduino-components.state';
import { Text, Svg } from '@svgdotjs/svg.js';
import { findSvgElement, LED_COLORS, findArduinoEl } from '../svg-helpers';

export const arduinoMessageUpdate: SyncComponent = (state, _, draw, frame) => {
  const messageState = state as ArduinoReceiveMessageState;
  const arduino = findArduinoEl(draw);

  if (!arduino) {
    return;
  }

  if (!messageState.hasMessage) {
    arduino.findOne('#MESSAGE').hide();
    findSvgElement('RX_LED', arduino as Svg).fill(LED_COLORS.LED_OFF);
    return;
  }

  const txLedColor = frame.sendMessage ? LED_COLORS.LED_ON : LED_COLORS.LED_OFF;
  findSvgElement('TX_LED', arduino as Svg).fill(txLedColor);

  const message = getMessage(frame.sendMessage, messageState.message);

  arduino.findOne('#MESSAGE').show();

  const title = arduino.findOne('#MESSAGE_ARDUINO_TITLE') as Text;
  const textSvg1 = arduino.findOne('#MESSAGE_LINE_2') as Text;
  const textSvg2 = arduino.findOne('#MESSAGE_LINE_3') as Text;
  arduino.findOne('#MESSAGE').show();
  title.node.innerHTML = frame.sendMessage
    ? 'Sending Message:'
    : 'Incoming Message:';
  textSvg1.node.innerHTML = message.slice(0, 17);
  textSvg2.node.innerHTML = message.slice(17);
  findSvgElement('RX_LED', arduino as Svg).fill(
    frame.sendMessage ? LED_COLORS.LED_OFF : LED_COLORS.LED_ON
  );
};

export const arduinoMessageCreate: CreateCompenentHook<ArduinoReceiveMessageState> = (
  _,
  __,
  arduino
) => {
  arduino.findOne('#MESSAGE').hide();
};

const getMessage = (sendMessage: string, receiveMessage: string) => {
  if (sendMessage) {
    return sendMessage.length > 34
      ? sendMessage.slice(0, 31) + '...'
      : sendMessage;
  }

  return receiveMessage.length > 34
    ? receiveMessage.slice(0, 31) + '...'
    : receiveMessage;
};

export const resetArduinoMessage: ResetComponent = (componentEl) => {};
