import { Svg, Element } from "@svgdotjs/svg.js";
import { saveComponentPosition } from "../blockly/helpers/save-svg-data-board-selector";
import { updateWires } from "./wire";

export const addDraggableEvent = (
  componentEl: Element,
  arduino: Element,
  draw: Svg
) => {
  (componentEl as any).draggable().on("dragmove", (e) => {
    e.stopPropagation();
    updateWires(componentEl, draw, arduino as Svg);
    saveComponentPosition(componentEl.x(), componentEl.y(), componentEl.id());
  });
};
