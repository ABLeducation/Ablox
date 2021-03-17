import { getBlockByType } from "./block.helper";

export const saveViewBoxPosition = (
  x: number,
  y: number,
  width: number,
  height: number,
  zoom: number
) => {
  const block = getBlockByType("board_selector");

  const json = JSON.parse(block.data || "{}");

  if (!json.viewbox) {
    json.viewbox = {};
  }
  json.viewbox.x = x;
  json.viewbox.y = y;
  json.viewbox.width = width;
  json.viewbox.height = height;
  json.viewbox.zoom = zoom;

  block.data = JSON.stringify(json);
};

// Need a function to remote component once it's delete
// Need a function to save the breadboard area of to as well.
export const saveComponentPosition = (
  x: number,
  y: number,
  componentId: string
) => {
  const block = getBlockByType("board_selector");

  const json = JSON.parse(block.data || "{}");

  if (!json.components) {
    json.components = {};
  }

  if (!json.components[componentId]) {
    json.components[componentId] = {};
  }

  json.components[componentId].x = x;
  json.components[componentId].y = y;

  block.data = JSON.stringify(json);
};

export const saveComponentsHoles = (holes: number[], id: string) => {
  const block = getBlockByType("board_selector");
  const json = JSON.parse(block.data || "{}");
  if (!json.components) {
    json.components = {};
  }

  if (!json.components[id]) {
    json.components[id] = {};
  }

  json.components[id].holes = holes;

  block.data = JSON.stringify(json);
};

export const deleteComponent = (id: string) => {
  const block = getBlockByType("board_selector");

  const json = JSON.parse(block.data || "{}");

  if (!json.components) return;

  delete json.components[id];

  block.data = JSON.stringify(json);
};
