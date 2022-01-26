import { writable } from 'svelte/store';

export interface ArduinoMessage {
  type: 'Arduino' | 'Computer';
  message: string;
  id: string;
  time: string;
}

let serialPort: any;
const arduinoMessageStore = writable<ArduinoMessage>(undefined);

const connect = async (navSerialPort) => {
  serialPort = navSerialPort;
  serialPort.on('data', (message: string) => {
    arduinoMessageStore.set({
      message,
      type: 'Arduino',
      id: new Date().getTime() + '_' + Math.random().toString(),
      time: new Date().toLocaleTimeString(),
    });
  });
};

const closePort = async () => {
  await serialPort.close();
};

const getSerialPort = () => {
  return serialPort;
};

const sendMessage = async (message: string) => {
  await serialPort.write(message, null, (err?: any) => {
    if (err) {
      console.log(err, 'sendmessage');
    }
    arduinoMessageStore.set({
      message,
      type: 'Computer',
      id: new Date().getTime() + '_' + Math.random().toString(),
      time: new Date().toLocaleTimeString(),
    });
  });
};

export default {
  subscribe: arduinoMessageStore.subscribe,
  connect,
  closePort,
  sendMessage,
  getSerialPort,
};
