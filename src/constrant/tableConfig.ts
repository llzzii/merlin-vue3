import VXETable from 'vxe-table';
import XEUtils from 'xe-utils';

VXETable.setup({
  // size: null, // 全局尺寸
  zIndex: 99, // 全局 zIndex 起始值，如果项目的的 z-index 样式值过大时就需要跟随设置更大，避免被遮挡
  // version: 0, // 版本号，对于某些带数据缓存的功能有用到，上升版本号可以用于重置数据
  // table: {
  //   showHeader: true,
  //   keepSource: false,
  //   showOverflow: null,
  //   showHeaderOverflow: null,
  //   showFooterOverflow: null,
  //   size: null,
  //   autoResize: false,
  //   stripe: false,
  //   border: false,
  //   round: false,
  //   emptyText: '暂无数据',
  //   rowConfig: {
  //     keyField: '_X_ROW_KEY' // 行数据的唯一主键字段名
  //   },
  //   radioConfig: {
  //     trigger: 'default'
  //   },
  //   checkboxConfig: {
  //     strict: false,
  //     highlight: false,
  //     range: false,
  //     trigger: 'default'
  //   },
  //   sortConfig: {
  //     remote: false,
  //     trigger: 'default',
  //     orders: ['asc', 'desc', null],
  //     sortMethod: null
  //   },
  //   filterConfig: {
  //     remote: false,
  //     filterMethod: null
  //   },
  //   expandConfig: {
  //     trigger: 'default',
  //     showIcon: true
  //   },
  //   treeConfig: {
  //     rowField: 'id',
  //     parentField: 'parentId',
  //     children: 'children',
  //     hasChild: 'hasChild',
  //     mapChildren: '_X_ROW_CHILD',
  //     indent: 20,
  //     showIcon: true
  //   },
  //   tooltipConfig: {
  //     enterable: true
  //   },
  //   menuConfig: {
  //     visibleMethod () {}
  //   },
  //   editConfig: {
  //     mode: 'cell',
  //     showAsterisk: true
  //   },
  //   importConfig: {
  //     modes: ['insert', 'covering']
  //   },
  //   exportConfig: {
  //     modes: ['current', 'selected']
  //   },
  //   customConfig: {
  //    storage: false
  //   },
  //   scrollX: {
  //     gt: 60
  //   },
  //   scrollY: {
  //     gt: 100
  //   }
  // },
  // grid: {
  //   size: null,
  //   zoomConfig: {
  //     escRestore: true
  //   },
  //   pagerConfig: {
  //     perfect: false
  //   },
  //   toolbarConfig: {
  //     perfect: false
  //   },
  //   proxyConfig: {
  //     autoLoad: true,
  //     message: true,
  //     props: {
  //       list: null, // 用于列表，读取响应数据
  //       result: 'result', // 用于分页，读取响应数据
  //       total: 'page.total' // 用于分页，读取总条数
  //     }
  //     beforeItem: null,
  //     beforeColumn: null,
  //     beforeQuery: null,
  //     afterQuery: null,
  //     beforeDelete: null,
  //     afterDelete: null,
  //     beforeSave: null,
  //     afterSave: null
  //   }
  // },
  // pager: {
  //   size: null,
  //   autoHidden: false,
  //   perfect: true,
  //   pageSize: 10,
  //   pagerCount: 7,
  //   pageSizes: [10, 15, 20, 50, 100],
  //   layouts: ['PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'Sizes', 'Total']
  // },
  // form: {
  //   preventSubmit: false
  //   size: null,
  //   colon: false,
  //   validConfig: {
  //     autoPos: true
  //   },
  //   tooltipConfig: {
  //     enterable: true
  //   },
  //   titleAsterisk: true
  // },
  // input: {
  //   size: null,
  //   transfer: false
  //   parseFormat: 'yyyy-MM-dd HH:mm:ss.SSS',
  //   labelFormat: '',
  //   valueFormat: '',
  //   startDay: 1,
  //   digits: 2,
  //   controls: true
  // },
  // textarea: {
  //   size: null
  //   autosize: {
  //     minRows: 1,
  //     maxRows: 10
  //   }
  // },
  // select: {
  //   size: null,
  //   transfer: false,
  //   optionConfig: {
  //     keyField: '_X_OPTION_KEY' // 选项数据的唯一主键字段名
  //   },
  //   multiCharOverflow: 8
  // },
  // toolbar: {
  //   size: null,
  //   import: {
  //     mode: 'covering'
  //   },
  //   export: {
  //     types: ['csv', 'html', 'xml', 'txt']
  //   },
  //   custom: {
  //     isFooter: true
  //   },
  //   buttons: [],
  //   tools: []
  // },
  // button: {
  //   size: null,
  //   transfer: false
  // },
  // radio: {
  //   size: null
  // },
  // checkbox: {
  //   size: null
  // },
  // switch: {
  //   size: null
  // },
  // modal: {
  //   // size: null,
  //   minWidth: 340,
  //   minHeight: 200,
  //   lockView: true,
  //   mask: true,
  //   duration: 3000,
  //   marginSize: 0,
  //   dblclickZoom: true,
  //   showTitleOverflow: true
  //   storage: false
  // },
  // list: {
  //   scrollY: {
  //     gt: 100
  //   }
  // }
});

// 自定义全局的格式化处理函数
VXETable.formats.mixin({
  // 格式化性别
  formatSex({ cellValue }) {
    return cellValue ? (cellValue === '1' ? '男' : '女') : '';
  },
  // 格式化下拉选项
  formatSelect({ cellValue }, list: any[]) {
    const item = list.find((item) => item.value === cellValue);
    return item ? item.label : '';
  },
  // 格式化日期，默认 yyyy-MM-dd HH:mm:ss
  formatDate({ cellValue }, format?: string) {
    return XEUtils.toDateString(cellValue, format || 'yyyy-MM-dd HH:mm:ss');
  },
  // 四舍五入金额，每隔3位逗号分隔，默认2位数
  formatAmount({ cellValue }, digits = 2) {
    return XEUtils.commafy(XEUtils.toNumber(cellValue), { digits });
  },
  // 格式化银行卡，默认每4位空格隔开
  formatBankcard({ cellValue }) {
    return XEUtils.commafy(XEUtils.toValueString(cellValue), { spaceNumber: 4, separator: ' ' });
  },
  // 四舍五入,默认两位数
  formatFixedNumber({ cellValue }, digits = 2) {
    return XEUtils.toFixed(XEUtils.round(cellValue, digits), digits);
  },
  // 向下舍入,默认两位数
  formatCutNumber({ cellValue }, digits = 2) {
    return XEUtils.toFixed(XEUtils.floor(cellValue, digits), digits);
  },
});
