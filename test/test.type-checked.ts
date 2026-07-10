async function work(): Promise<void> {
  await Promise.resolve();
}

// floating promise: only flagged by the type-aware `no-floating-promises` rule
work();
