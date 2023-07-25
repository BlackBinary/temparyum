const makeMemory = <T>() => {
  const map = new Map<string, T>();

  return {
    get: (key: string) => map.get(key),
    set: (key: string, value: T) => map.set(key, value),
    delete: (key: string) => map.delete(key),
    has: (key: string) => map.has(key),
    entries: () => map.entries(),
    [Symbol.iterator]: () => map[Symbol.iterator](),
    _map: map,
  };
};

export type Memory<T> = ReturnType<typeof makeMemory<T>>;
export default makeMemory;
