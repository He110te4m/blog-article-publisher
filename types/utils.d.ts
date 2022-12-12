declare global {
  export type MaybeAsync<T> = T extends (...args: any[]) => any
    ? (...args: Parameters<T>) => MaybeAsync<ReturnType<T>>
    : T extends Promise<unknown>
      ? T | Awaited<T>
      : T | Promise<T>
}

export {}
