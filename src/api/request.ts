import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { computed, createVNode, ref, type Ref ,h} from 'vue';
import _ from 'lodash';
import { PaginationResp, ResponseResp } from '@/constrant/baseInterface';
import { Modal } from 'ant-design-vue';
import ExclamationCircleFilled from '@ant-design/icons-vue/lib/icons/ExclamationCircleFilled';

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
    autoRun: false,
    // 调用完毕可执行的函数
    onFinish: (res:ResponseResp<any>):any => {
      let output={};
      if (res.code=='0000') {
        output = res.data;
      }else{
        output={};
        Modal.error({
          title:"请求失败",
          icon: createVNode(ExclamationCircleFilled),
          content: h('div', {}, [
            h('p', {style: { color: '#999',marginBottom:'2px' }},res.msg||'服务不可用'),
          ]),
          okText:'确定'
        })
      }
      return output     
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
        if (res?.status === 200) {
          return res.data;
        }else{
          Modal.error({
            title:"请求失败",
            icon: createVNode(ExclamationCircleFilled),
            content: h('div', {}, [
              h('p', {style: { color: '#666',marginBottom:'2px' }}, '服务异常!'),
              h('p', {style: { color: '#999',marginBottom:'2px' }},res?.status||'服务不可用'),
            ]),
            okText:'确定'
          })
        }
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
  promiseRequest =  (config: RequestConfig = {}) => {
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
    return this.instance(config);
   
  };
  useRequest =  <T>(service: any, options = {}) => {
    // 合并配置项
    const option = Object.assign({}, this.defaultOption, options);
    const loading = ref(false);
    let res: Ref<T|undefined> = ref();
    const paramsCache = ref();
    const promiseRequests = typeof service == 'function' ? service : () => this.promiseRequest(service);
    let output: ResponseResp<T | undefined> = {
      code: "",
      msg: "",
      data:undefined,
    };
    const run = async (params = {}) => {
      paramsCache.value = params;
      // const option = Object.assign({}, this.defaultOption, options);
      loading.value = true;
      const r: ResponseResp<T> = await promiseRequests(params);
      loading.value = false;
      Object.assign( output, r);
      output.data= option.onFinish(r)
      res.value=  output.data;
      option.polling && _.delay(run, option.pollingInterval as number);
      return output;
    };
    const refresh = async () => {
      if (paramsCache.value) {
        await run(...paramsCache.value);
      } else {
        await run();
      }
    };
    return {
      run: run,
      loading,
      data:res,
      refresh
    };
  };
  usePageRequest= <T>(service: any, options = {})=>{
      // 合并配置项
    const option = Object.assign({}, this.defaultOption, options);
    const loading = ref(false);
    let res: Ref<T|undefined> = ref();
    const paramsCache = ref();
    const promiseRequests = typeof service == 'function' ? service : () => this.promiseRequest(service);
     const pagination = reactive({
      currentPage: 0,
      pageSize: 0,
      total: 0,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total) => `共 ${total} 条`,
      pageSizeOptions: ["10", "20", "50", "100"],
      reconnection: 0,
      onTableChange:async(e) => {
        console.log("🚀 ~ file: request.ts:216 ~ HttpService ~ onTableChange:async ~ e", e,{ ...paramsCache.value,current:e.currentPage, size:e.pageSize})
       
        await run({ ...paramsCache.value,current:e.currentPage, size:e.pageSize});
      }
    });
    let output: ResponseResp<PaginationResp<T>> = {
      code: "",
      msg: "",
      data: {
        current: 0,
        size: 0,
        total: 0,
        records: [],
      },
    };
     const run = async (params = {}) => {
       // const option = Object.assign({}, this.defaultOption, options);
      
      paramsCache.value = params;
      // const option = Object.assign({}, this.defaultOption, options);
      loading.value = true;
      const r: ResponseResp<T> = await promiseRequests(params);
      loading.value = false;
      Object.assign( output, r);
      output.data= option.onFinish(r)
      const { current, size, total, records } =  output.data;
      pagination.currentPage = current;
      pagination.pageSize = size;
      pagination.total = total;
      //@ts-ignore
      res.value= records
      option.polling && _.delay(run, option.pollingInterval as number);
      return output;
     };
     const refresh = async () => {
      console.log('Refreshing')
      if (paramsCache.value) {
        await run(paramsCache.value);
      } else {
        await run();
      }
    };
    return {
      run: run,
      loading,
      pagination,
      data:res,
      refresh
    };
  }
}

export const httpService = new HttpService();
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
