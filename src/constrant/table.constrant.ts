import { VxePagerProps, VxeTableListeners, VxeTableProps, VxeTablePropTypes } from 'vxe-table';

export const defaultTableConfig: VxeTableProps = {
  border: false, //'full','outer','inner','none'
  stripe: false,
  size: 'small', // 'medium, small, mini'
  showHeader: true,
  showFooter: true,
  resizable: true,
  showHeaderOverflow: true,
  showOverflow: true,
  columnConfig: { minWidth: '150px' },
  rowConfig: { isCurrent: true, isHover: true },
  rowClassName: 'ml-table-row',
  headerRowClassName: 'ml-table-header',
  footerRowClassName: 'ml-table-footer',
  // footerMethod: ({ columns }) => {
  //   // const footerData = [
  //   //   columns.map((column, _columnIndex) => {
  //   //     if (_columnIndex === 0) {
  //   //       return '合计';
  //   //     }
  //   //     return null;
  //   //   }),
  //   // ];
  //   // return footerData;
  // },
  seqConfig: {
    startIndex: 1,
    seqMethod({ rowIndex }) {
      return `NO${rowIndex + 1000}`;
    },
  },
  sortConfig: {
    trigger: 'cell',
    remote: false, // 所有列是否使用服务端排序，如果设置为 true 则不会对数据进行处理
    defaultSort: {
      field: 'name',
      order: 'desc',
    },
    showIcon: true,
    // iconAsc: 'iconfont icon-paixu-shengxu sort-icon',
    // iconDesc: 'iconfont icon-paixu-jiangxu sort-icon',
  },
  filterConfig: {
    remote: true,
  },
  // tooltipConfig: {
  //   contentMethod({ type, row, column }) {
  //     if (column.property === 'name') {
  //       if (type === 'header') {
  //         return '自定义标题提示内容：' + column.title;
  //       }
  //       return '自定义提示内容：' + row[column.field];
  //     }
  //   },
  //   enterable: true,
  // },
};
export const defaultTableFunc: VxeTableListeners = {
  checkboxChange: ({
    row,
    rowIndex,
    $rowIndex,
    column,
    columnIndex,
    $columnIndex,
    triggerRadio,
    triggerCheckbox,
    triggerTreeNode,
    triggerExpandNode,
    $event,
  }) => {
    console.log(
      '🚀 ~ file: table.constrant.ts ~ line 71 ~ row',
      row,
      rowIndex,
      $rowIndex,
      column,
      columnIndex,
      $columnIndex,
      triggerRadio,
      triggerCheckbox,
      triggerTreeNode,
      triggerExpandNode,
      $event,
    );
  },
  checkboxAll: () => {},
};
export const defaultPagination: VxePagerProps = {
  currentPage: 1,
  pageSize: 10,
  total: 0,
};

export const defaultTreeConfig: VxeTablePropTypes.TreeConfig = {
  rowField: 'id',
  parentField: 'parentId',
  indent: 13,
  line: true,
  expandAll: false,
  showIcon: true,
};
export const defaultEditConfig: VxeTablePropTypes.EditConfig = {
  trigger: 'click',
  mode: 'cell', //编辑模式 'row
  icon: 'iconfont icon-xinpin', // 自定义可编辑列的状态图标
  showIcon: true, // 是否显示列头编辑图标
  showStatus: true, // 只对 keep-source 开启有效，是否显示单元格新增与修改状态
  showUpdateStatus: true, // 只对 keep-source 开启有效，是否显示单元格修改状态
  showInsertStatus: true, //只对 keep-source 开启有效，是否显示单元格新增状态
  showAsterisk: true, // 是否显示必填字段的红色星号
  autoClear: true, // 当点击非编辑列之后，是否自动清除单元格的激活状态
  activeMethod: (params) => true, // 该方法的返回值用来决定该单元格是否允许编辑
};
