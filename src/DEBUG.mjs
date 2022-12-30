const { DEBUG: debug } = process.env

const DEBUG_ID = 'expressUtils'
const debugAll = debug === '*' || debug?.includes(`${DEBUG_ID}:*`)
const debugFeatures = new RegExp(`${DEBUG_ID}:([A-Za-z0-9,]*);?`).exec(debug)
const debugFeaturesList = (debugFeatures && debugFeatures[1]) || []

const DEBUG = {
  disableCrypto: false
}

const DEBUG_FEATURES = Object.keys(DEBUG)
for (const feature of DEBUG_FEATURES) {
  const debugFeature = debugFeaturesList.includes(feature)
  DEBUG[feature] = debugAll || debugFeature
}

export default DEBUG
