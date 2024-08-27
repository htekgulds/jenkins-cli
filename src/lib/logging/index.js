import winston from 'winston'

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
  trace: 5
}

export const logger = winston.createLogger({
  levels,
  level: process.env.LOG_LEVEL || 'http',
  format: winston.format.cli(),
  transports: [new winston.transports.Console()]
})
