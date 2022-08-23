declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const Component: DefineComponent<{}, {}, any>;
  export default Component;
}
declare type ReadonlyRecordable<T = any> = {
  readonly [key: string]: T;
};

declare module 'virtual:*' {
  const result: any;
  export default result;
}

// declare module '*.vue' {
//     import * as vue from 'vue';
//     export declare const render: vue.RootRenderFunction<Element | DocumentFragment>
// }

// declare module '@vue/runtime-core' {
//     interface ComponentCustomProperties {
//         $createLoading: () => any
//     }
// }

declare type Nullable<T> = T | null;

declare type CustomizedHTMLElement<T> = HTMLElement & T;

declare type Indexable<T> = {
  [key: string]: T;
};
declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>;
}

declare type RefType<T> = T | null;
