import { writable } from "svelte/store";
import config from "../../env";
import { MicroControllerType } from "../microcontroller/microcontroller";

// THINGS I HAVE LEARNED
// BAUD RATE 9600 always!!!
// IF you get programer error
// unplug the board
// push the reset button for 3 seconds
// replug the board back in

const chromeExtensionID = "hfejhkbipnickajaidoppbadcomekkde";
const serial_baud_rate = 9600;

let daemon;
let chunks;
let serialPortName;
let uploading = false;
export interface ArduinoMessage {
  type: "Arduino" | "Computer";
  message: string;
  id: string;
  time: string;
}

export enum PortState {
  CLOSE = "CLOSE",
  CLOSING = "CLOSING",
  OPEN = "OPEN",
  OPENNING = "OPENNING",
  UPLOADING = "UPLOADING",
}

const arduinoMessageStore = writable<ArduinoMessage>(undefined);
const arduinoPortStatus = writable<PortState>(PortState.CLOSE);
const arduinoAgentStore = writable<boolean>(false);

arduinoMessageStore.subscribe((m) => console.log(m, "m"));

export const init = (DameonClass) => {
  daemon = new DameonClass(
    "https://builder.arduino.cc/v3/boards",
    chromeExtensionID
  );

  daemon.agentFound.subscribe((status) => {
    arduinoAgentStore.set(status);
  });

  daemon.uploading.subscribe((upload) => {
    console.log(upload);
    if (upload.status === "UPLOAD_DONE") {
      uploading = false;
      daemon.openSerialMonitor(serialPortName, serial_baud_rate);
    }
  });

  daemon.devicesList.subscribe(({ serial, network }) => {
    console.log(serial);
    if (!serial[0] || serial[0].IsOpen) return;

    serialPortName = serial[0].Name;
    daemon.openSerialMonitor(serial[0].Name, serial_baud_rate);
    console.log("should be open");
  });

  daemon.serialMonitorMessages.subscribe((message) => {
    const messages = parseMessage(message);
    messages.forEach(setCurrentMessage);
  });
};

export const sendMessage = (message: string) => {};

export const uploadCode = async (code) => {
  const hex = await compileCode(code, MicroControllerType.ARDUINO_UNO);

  if (!daemon) {
    return;
  }
  try {
    uploading = true;
    console.log(hex);
    console.log(serialPortName);
    const target = {
      board: "arduino:avr:uno",
      port: serialPortName,
      network: false,
    };
    daemon.uploadSerial(target, "sketch_jan26a.ino", { hex: btoa(hex) });
  } catch (e) {
    console.log(e);
  }
};

const compileCode = async (code: string, type: string): Promise<string> => {
  const headers = new Headers();
  headers.append("Content-Type", "text/plain");

  const response = await fetch(
    `${config.server_arduino_url}/upload-code/${type}`,
    {
      method: "POST",
      body: code,
      headers,
    }
  );

  return await response.text();
};

function setCurrentMessage(message) {
  arduinoMessageStore.set({
    message,
    type: "Arduino",
    id: new Date().getTime() + "_" + Math.random().toString(),
    time: new Date().toLocaleTimeString(),
  });
}

function parseMessage(messagePart) {
  try {
    // Append new chunks to existing chunks.
    chunks += messagePart;
    // For each line breaks in chunks, send the parsed lines out.
    const lines = chunks.split("\n");
    chunks = lines.pop();

    return lines;
  } catch (e) {
    console.error(e);
  }
}
