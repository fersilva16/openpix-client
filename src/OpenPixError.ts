export class OpenPIXError extends Error {
  constructor(public readonly status: number, message: string = 'Unknown error') {
    super(message);
  }
}
