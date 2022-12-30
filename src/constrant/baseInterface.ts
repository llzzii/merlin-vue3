

 export class ResponseResp<T> {
    code: string = "";
    msg: string = "";
    data!: T;
  }
  
  /**
   * 分页接口入参
   */
  export class PaginationReq  {
    current: number = 1;
    size: number = 15;
    sortBy: string = "updateTime";
    sortOrder: string = "desc";
    editStart: string = "";
    editEnd: string = "";
  }
  
  /**
   * 分页接口出参
   */
  export class PaginationResp<T> {
    current: number = 0;
    size: number = 0;
    total: number = 0;
    records: T[] = [];
    name?: string = "";
  }