export function random(min: number, max: number): number {
  return Math.floor(Math.random() * max + min);
}

export function range(min: number, max: number): number[] {
  min += 1;
  return Array.from(new Array(Math.abs(min - max)), (x, i) => i + min);
}
