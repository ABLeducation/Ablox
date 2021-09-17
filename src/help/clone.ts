export const cloneDeep = <T>(clone: T): T => {
  return JSON.parse(JSON.stringify(clone)) as T;
};
