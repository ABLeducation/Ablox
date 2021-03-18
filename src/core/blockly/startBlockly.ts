import { WorkspaceSvg, BlocklyOptions, Block } from "blockly";
import Blockly from "blockly";
import "./menus";
import "./blocks";
import "./overrides/index";
import "./generators/index";

import { theme } from "./theme";

import { addListener, createFrames } from "./registerEvents";
import registerListMenu from "../../blocks/list/menu";
import registerCodeMenu from "../../blocks/arduino/menu";

import { getToolBoxString } from "./toolbox";

import { connectToArduinoBlock, createBlock } from "./helpers/block.helper";
import { ARDUINO_PINS } from "../microcontroller/selectBoard";

/**
 * This will start up blockly and will add all the event listeners and styles
 */
const startBlockly = (blocklyElement: HTMLElement) => {
  // creates the blockly workspace and toolbox
  const workspace = createWorkspace(blocklyElement);

  // Register custom list menu event for the toolbox
  registerListMenu(workspace);

  // Setups all the listeners for the blockly events
  addListener(workspace);

  // Registers the code menu
  registerCodeMenu(workspace);

  // Create the blocks for selecting the board
  createBlock("board_selector", 50, 50, false);

  // creates the arduino loop block
  const arduinoBlock = createBlock("arduino_loop", 50, 151, false);

  // Creating Blink
  createLedWithDelay(1, false);
  createLedWithDelay(1, true);

  createFrames({
    type: Blockly.Events.MOVE,
    blockId: arduinoBlock.id,
  });
};

/**
 * Creates the Blockly Workspace
 */
const createWorkspace = (blocklyElement: HTMLElement) => {
  Blockly.inject(blocklyElement, createBlockConfig());
  return Blockly.getMainWorkspace() as WorkspaceSvg;
};

const createLedWithDelay = (seconds = 1, isOn = true) => {
  const ledBlock1 = createBlock("led", 0, 0, true);
  ledBlock1.setFieldValue(ARDUINO_PINS.PIN_13, "PIN");
  ledBlock1.setFieldValue(isOn ? "ON" : "OFF", "STATE");
  connectToArduinoBlock(ledBlock1);
  const delayBlock1 = createBlock("delay_block", 0, 0, false);
  const numberBlock1 = createBlock("math_number", 0, 0);
  numberBlock1.setFieldValue(seconds.toString(), "NUM");
  delayBlock1
    .getInput("DELAY")
    .connection.connect(numberBlock1.outputConnection);
  ledBlock1.nextConnection.connect(delayBlock1.previousConnection);
};

/**
 * Returns the blockly config object
 */
const createBlockConfig = (): BlocklyOptions => {
  const toolboxString = getToolBoxString();

  return {
    toolbox: toolboxString,
    collapse: true,
    comments: true,
    disable: false,
    trashcan: true,
    horizontalLayout: false,
    toolboxPosition: "start",
    css: true,
    media: "https://blockly-demo.appspot.com/static/media/",
    rtl: false,
    sounds: true,
    theme,
    oneBasedIndex: true,
    grid: {
      spacing: 20,
      length: 1,
      colour: "#888",
      snap: false,
    },
    zoom: {
      controls: true,
      wheel: true,
      startScale: 1,
      maxScale: 3,
      minScale: 0.3,
      scaleSpeed: 1.2,
    },
  };
};

export default startBlockly;
