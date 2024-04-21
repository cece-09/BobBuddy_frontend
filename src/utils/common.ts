export const isObject = (value: unknown): value is Object => {
  if (typeof value !== 'object' || value === null) return false;
  return Object.getPrototypeOf(value) === Object.prototype;
};

export const isPublicPath = (path: string) =>
  ['/login', '/create-account', '/forgot-password'].includes(path);

export const isRootPath = (path: string) => path === '/';
