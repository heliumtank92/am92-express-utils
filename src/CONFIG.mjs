const {
  npm_package_name: pkgName = '',
  npm_package_version: pkgVersion = ''
} = process.env
const SERVICE = `${pkgName}@${pkgVersion}`

export { SERVICE }
