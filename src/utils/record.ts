const get = <K extends string | number | symbol, T>(
  record: Record<K, T>,
  key: K,
): T | undefined => {
  if (record[key] === undefined) {
    return undefined;
  }
  return record[key];
};

const set = <R, K extends keyof R>(
  record: R,
  key: K,
  value: Partial<R[K]>,
): void => {
  record[key] = { ...record[key], value };
};

const remove = <K extends string | number | symbol, T>(
  record: Record<K, T>,
  key: K,
): void => {
  delete record[key];
};

export const RecordUtil = {
  get,
  set,
  remove,
};
