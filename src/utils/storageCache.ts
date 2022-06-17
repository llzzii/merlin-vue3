import { decodeByBase64, encryptByBase64 } from '.';
import { isNullOrUnDef } from './is';

class WebStorage {
  private storage: Storage = window.sessionStorage;
  private prefixKey = 'ml';
  private isEncryptToBase64 = false;
  constructor(
    opt = {
      storage: window.sessionStorage,
      prefixKey: 'ml',
      isEncryptToBase64: false,
    },
  ) {
    this.storage = opt.storage;
    this.prefixKey = opt.prefixKey;
    this.isEncryptToBase64 = opt.isEncryptToBase64;
  }

  /**
   *处理下key值
   *
   * @private
   * @param {string} key
   * @return {*}
   * @memberof WebStorage
   */
  private getKey(key: string) {
    return `${this.prefixKey}${key}`.toUpperCase();
  }

  /**
   *存储
   *
   * @param {string} key
   * @param {*} value
   * @param {(number | null)} [expire=null] 过期时间
   * @memberof WebStorage
   */
  set(key: string, value: any, expire: number | null = null) {
    const storageData = JSON.stringify({
      value: value,
      time: Date.now(),
      expire: !isNullOrUnDef(expire) ? new Date().getTime() + expire * 1000 : null,
    });
    const stringData = this.isEncryptToBase64 ? encryptByBase64(storageData) : storageData;
    this.storage.setItem(this.getKey(key), stringData);
    console.log(
      `🚀 ~ file: storageCache.ts ~ WebStorage ~ set ~ size ${
        this.storage === window.sessionStorage ? 'sessionStorage' : 'localStorage'
      }已使用：`,
      this.size(),
    );
  }

  /**
   *
   * 获取key对应值
   * @param {string} key
   * @param {*} [def=null] 如果没有，返回默认值
   * @memberof WebStorage
   */
  get(key: string, def: any = null) {
    const val = this.storage.getItem(this.getKey(key));
    if (!val) return def;
    try {
      const desData = this.isEncryptToBase64 ? decodeByBase64(val) : val;
      const data = JSON.parse(desData);
      const { value, expire } = data;
      if (isNullOrUnDef(expire) || expire >= new Date().getTime()) {
        return value;
      } else {
        this.remove(key);
      }
    } catch (err) {
      return def;
    }
  }

  remove(key: string) {
    this.storage.removeItem(this.getKey(key));
  }

  clear() {
    this.storage.clear();
  }

  size() {
    let size = 0;
    if (this.storage) {
      for (const item in this.storage) {
        if (this.storage.hasOwnProperty(item)) {
          size += this.storage.getItem(item)?.length || 0;
        }
      }
      return (size / 1024 / 1024).toFixed(4) + 'MB';
    }
  }
}

export const sessionCache = (
  opt = {
    prefixKey: 'ml',
    storage: sessionStorage,
    isEncryptToBase64: false,
  },
) => {
  return new WebStorage(opt);
};

export const localCache = (
  opt = { prefixKey: 'ml', storage: localStorage, isEncryptToBase64: true },
) => {
  return new WebStorage(opt);
};
