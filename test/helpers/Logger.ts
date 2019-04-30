import { Writable } from 'stream'

class Logger {
  public accumulatedText: string = ''
  public accumulatedStdOutText: string = ''
  public accumulatedStdErrText: string = ''

  getLogger() {
    return {
      log: async (data: string) => {
        this.accumulatedText += data
      }
    }
  }

  getStdLoggers() {
    const stdout = new Writable()
    stdout._write = (chunk, _encoding, done) => {
      this.accumulatedStdOutText += chunk.toString()
      return done()
    }
    const stderr = new Writable()
    stderr._write = (chunk, _encoding, done) => {
      this.accumulatedStdErrText += chunk.toString()
      return done()
    }
    return {
      stdout,
      stderr
    }
  }
}

export { Logger }
