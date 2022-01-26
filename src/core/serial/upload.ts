import type { MicroControllerType } from '../microcontroller/microcontroller';
import AvrgirlArduino from 'avrgirl-arduino/avrgirl-arduino-browser';
import arduinoConfig from './arduino.config';
import config from '../../env';
declare var buffer: any;

export const upload = async (
  code: string,
  type: MicroControllerType,
  serial: Object
) => {
  const hexCode = await compileCode(code, type);

  await uploadCode(hexCode, type, serial);
};

const uploadCode = (hex, board: MicroControllerType, serial) =>
  new Promise((resolve, reject) => {
    const avrgirl = new AvrgirlArduino({
      board: arduinoConfig[board].protocol,
      serialPort: serial,
      debug: true,
    });

    avrgirl.flash(buffer.Buffer.from(hex, 'base64'), (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(true);
    });
  });

const compileCode = async (code: string, type: string): Promise<string> => {
  const headers = new Headers();
  headers.append('Content-Type', 'text/plain');

  const response = await fetch(
    `${config.server_arduino_url}/upload-code/${type}`,
    {
      method: 'POST',
      body: code,
      headers,
    }
  );

  return await response.text();
};
