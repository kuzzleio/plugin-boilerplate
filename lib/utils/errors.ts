export function keepStack (error: any, message: string) {
  const err = new error.constructor(message);
  err.stack = error.stack;
  return err;
}
