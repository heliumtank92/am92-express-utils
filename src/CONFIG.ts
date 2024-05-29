/** @ignore */
const { npm_package_name: pkgName = '', npm_package_version: pkgVersion = '' } =
  process.env

/** @ignore */
export const SERVICE = `${pkgName}@${pkgVersion}`
