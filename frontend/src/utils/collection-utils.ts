const equal = <T>(a: Set<T>, b: Set<T>) =>
    a.size === b.size && [...a].every(value => b.has(value));


export { equal };