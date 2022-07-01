const logPrefix = 'KGAFG logger - '
export const logger = {
  log(...params) {
    console.log(`${logPrefix}log:`, ...params)
  },
  warn(...params) {
    console.warn(`${logPrefix}warn:`, ...params)
  },
}
