import { getIdentation, DEFAULT_INNER_CLASS_TABS } from '../templates';

export function fromPascalToKebab(input: string) {
  return fromCamelToKebab(fromPascalToCamel(input));
}

export function fromPascalToCamel(input: string) {
  return input.substr(0, 1).toLocaleLowerCase() + input.substr(1, input.length);
}

export function fromKebabToCamel(input: string) {
  return input.replace(/([-][a-z])/g, (group: string) => group.toUpperCase().replace('-', ''));
}

export function fromCamelToKebab(input: string) {
  return input.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}

export function capitalize(input: string) {
  return input && input.substr(0, 1).toUpperCase() + input.substr(1, input.length);
}

export function getKeys<T>(obj: Record<string, T>) {
  return Object.keys(obj);
}

export function getValues<T>(obj: Record<string, T>) {
  return getKeys(obj).map(k => obj[k]);
}

export function addSuffix(suffix: string, separator: string = '') {
  return (str: string) => `${str}${separator}${suffix}`;
}

export function addIdentationSpacesFn(tabSize: number) {
  const innerIdentationSpaces = getIdentation(tabSize, DEFAULT_INNER_CLASS_TABS + 1);

  return (str: string) => `${innerIdentationSpaces}${str}`;
}
