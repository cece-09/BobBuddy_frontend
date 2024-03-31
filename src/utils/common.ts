export const isObject = (value: unknown): value is Object => {
  if (typeof value !== "object" || value === null) return false
  return Object.getPrototypeOf(value) === Object.prototype
}
