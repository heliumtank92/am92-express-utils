const { NODE_ENV, DEBUG: debug } = process.env

const DEBUG_ID = 'expressUtils'
const isProduction = NODE_ENV === 'production'
const debugAll = !isProduction || debug === '*' || debug.includes(`${DEBUG_ID}:*`)

const DEBUG = {
  crypto: debugAll
}

if (!debugAll) {
  const execArray = new RegExp(`${DEBUG_ID}:([A-Za-z0-9,]*);?`).exec(debug)
  const debugString = (execArray && execArray[1]) || ''
  const DEBUG_FEATURES = (debugString && Object.keys(DEBUG)) || []

  for (const feature of DEBUG_FEATURES) {
    DEBUG[feature] = debugString.includes(feature)
  }
}

export default DEBUG
