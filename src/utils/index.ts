import { Menu } from '@/layout/aside/menu/menu';
import { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router';
import UTF8 from 'crypto-js/enc-utf8';
import Base64 from 'crypto-js/enc-base64';

// 获取路由的数据信息
export function getRawRoute(route: RouteLocationNormalized): RouteLocationNormalized {
  if (!route) return route;
  const { matched, ...opt } = route;
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path,
        }))
      : undefined) as RouteRecordNormalized[],
  };
}

export function getMatched(menus: Menu[], parent: string[]) {
  const metched: Menu[] = [];
  menus.forEach((item) => {
    if (parent.includes(item.path)) {
      metched.push({
        ...item,
        name: (item.meta?.title || item.name) as string,
      });
    }
    if (item.children?.length) {
      metched.push(...getMatched(item.children, parent));
    }
  });
  return metched;
}

export function encryptByBase64(cipherText: string) {
  return UTF8.parse(cipherText).toString(Base64);
}

export function decodeByBase64(cipherText: string) {
  return Base64.parse(cipherText).toString(UTF8);
}

export const randomNum = (min: number, max: number) => {
  const num = Math.floor(Math.random() * (max - min) + min);
  return num;
};
export const randomColor = (min: number, max: number) => {
  const r = randomNum(min, max);
  const g = randomNum(min, max);
  const b = randomNum(min, max);
  return `rgb(${r},${g},${b})`;
};
