import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { computed, ref, type Ref } from 'vue';
import _ from 'lodash';

export class HttpService {
  // axios 实例
  instance: AxiosInstance;
  // 拦截器对象
  interceptorsObj?: RequestInterceptors<AxiosResponse>;
  /*
  存放取消方法的集合
  * 在创建请求后将取消请求方法 push 到该集合中
  * 封装一个方法，可以取消请求，传入 url: string|string[]  
  * 在请求之前判断同一URL是否存在，如果存在就取消请求
  */
  cancelRequestSourceList?: CancelRequestSource[];
  /*
  存放所有请求URL的集合
  * 请求之前需要将url push到该集合中
  * 请求完毕后将url从集合中删除
  * 添加在发送请求之前完成，删除在响应之后删除
  */
  requestUrlList?: string[];
  defaultOption = {
    // 是否开启防抖 时长
    debounce: false,
    debounceInterval: 1000,
    // 是否开启节流 时长
    throttle: false,
    throttleInterval: 1000,
    // 是否轮询
    polling: false,
    pollingInterval: 5000,
    // 是否自动调用
    autoRun: true,
    // 调用完毕可执行的函数
    onFinish: (e: any) => {
      console.log('🚀 ~ file: request.ts ~ line 39 ~ HttpService ~ e', e);
      if (e.code === 0) {
        return e.result;
      } else {
        console.error(e.message);
        return [];
      }
    },
  };
  constructor(config?: RequestConfig) {
    this.requestUrlList = [];
    this.cancelRequestSourceList = [];
    this.instance = axios.create(config);
    this.interceptorsObj = config?.interceptors;
    // 拦截器执行顺序 接口请求 -> 实例请求 -> 全局请求 -> 实例响应 -> 全局响应 -> 接口响应
    this.instance.interceptors.request.use(
      (res: AxiosRequestConfig) => res,
      (err: any) => err,
    );

    // 使用实例拦截器
    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch,
    );
    this.instance.interceptors.response.use(
      this.interceptorsObj?.responseInterceptors,
      this.interceptorsObj?.responseInterceptorsCatch,
    );
    // 全局响应拦截器保证最后执行
    this.instance.interceptors.response.use(
      // 因为我们接口的数据都在res.data下，所以我们直接返回res.data
      (res: AxiosResponse) => {
        return res.data;
      },
      (err: any) => err,
    );
  }
  /**
   * @description: 获取指定 url 在 cancelRequestSourceList 中的索引
   * @param {string} url
   * @returns {number} 索引位置
   */
  private getSourceIndex(url: string): number {
    return this.cancelRequestSourceList?.findIndex((item: CancelRequestSource) => {
      return Object.keys(item)[0] === url;
    }) as number;
  }
  /**
   * @description: 删除 requestUrlList 和 cancelRequestSourceList
   * @param {string} url
   * @returns {*}
   */
  private delUrl(url: string) {
    const urlIndex = this.requestUrlList?.findIndex((u) => u === url);
    const sourceIndex = this.getSourceIndex(url);
    // 删除url和cancel方法
    urlIndex !== -1 && this.requestUrlList?.splice(urlIndex as number, 1);
    sourceIndex !== -1 && this.cancelRequestSourceList?.splice(sourceIndex as number, 1);
  }
  // 取消请求
  cancelRequest(url: string | string[]) {
    if (typeof url === 'string') {
      // 取消单个请求
      const sourceIndex = this.getSourceIndex(url);
      sourceIndex >= 0 && this.cancelRequestSourceList?.[sourceIndex][url]();
    } else {
      // 存在多个需要取消请求的地址
      url.forEach((u) => {
        const sourceIndex = this.getSourceIndex(u);
        sourceIndex >= 0 && this.cancelRequestSourceList?.[sourceIndex][u]();
      });
    }
  }
  // 取消全部请求
  cancelAllRequest() {
    this.cancelRequestSourceList?.forEach((source) => {
      const key = Object.keys(source)[0];
      source[key]();
    });
  }
  promiseRequest = (config: RequestConfig = {}) => {
    return new Promise((resolve, reject) => {
      // 如果我们为单个请求设置拦截器，这里使用单个请求的拦截器
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config);
      }
      const url = config.url;
      // url存在保存取消请求方法和当前请求url
      if (url) {
        this.requestUrlList?.push(url);
        config.cancelToken = new axios.CancelToken((c) => {
          this.cancelRequestSourceList?.push({
            [url]: c,
          });
        });
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 如果我们为单个响应设置拦截器，这里使用单个响应的拦截器
          if (config.interceptors?.responseInterceptors) {
            res = config.interceptors.responseInterceptors(res);
          }

          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        })
        .finally(() => {
          url && this.delUrl(url);
        });
    });
  };
  useRequest = <T>(service: any, options = {}) => {
    // 合并配置项
    const option = Object.assign({}, this.defaultOption, options);
    const loading = ref(false);
    const data: Ref<T | undefined> = ref();
    const promiseRequest = typeof service == 'function' ? service : () => this.instance(service);
    const run = async (params = {}) => {
      // const option = Object.assign({}, this.defaultOption, options);
      loading.value = true;
      data.value = await promiseRequest(params);
      console.log('🚀 ~ file: request.ts ~ line 131 ~ HttpService ~ run ~ data.value', data.value);

      loading.value = false;
      data.value =
        option.onFinish && option.onFinish(data.value) ? option.onFinish(data.value) : data.value;
      option.polling && _.delay(run, option.pollingInterval as number);
      return data.value;
    };
    // 自动调用
    option.autoRun && run();
    // 计算最终使用的函数
    const runComputed = computed(() => {
      //是否开启防抖
      if (option.debounce) {
        return {
          run: _.debounce(run, option.debounceInterval) as (p?: any) => Promise<void>,
        };
      }
      //是否开启节流
      if (option.debounce) {
        return {
          run: _.throttle(run, option.throttleInterval) as (p?: any) => Promise<void>,
        };
      }
      return {
        run,
      };
    });
    return {
      run: runComputed.value.run,
      loading,
      data,
    };
  };
}

export interface RequestInterceptors<T> {
  // 请求拦截
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorsCatch?: (err: any) => any;
  // 响应拦截
  responseInterceptors?: (config: T) => T;
  responseInterceptorsCatch?: (err: any) => any;
}
// 自定义传入的参数
export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>;
}
export interface CancelRequestSource {
  [index: string]: () => void;
}
