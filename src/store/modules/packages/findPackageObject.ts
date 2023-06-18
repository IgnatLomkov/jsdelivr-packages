import type { IPackageObject } from './initPackagesState'

export function findPackageObject(
  objects: IPackageObject[],
  packageName: string
) {
  return objects.find(object => object.package.name === packageName)
}
