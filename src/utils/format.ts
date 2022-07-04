import { isNumber } from './is';

export const formatNumber = (value: string | number | undefined, def = 100): number => {
  if (value == null) {
    return def;
  }
  return isNumber(value) ? Number(value) : parseInt(value);
};
