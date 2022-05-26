export class TimeOutException extends Error {
  constructor(message?: string) {
    super(message ?? 'Processing timed out.')
  }
}
