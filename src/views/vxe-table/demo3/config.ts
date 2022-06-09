import {
  defaultEditConfig,
  defaultTableConfig,
  defaultTableFunc,
} from '@/constrant/table.constrant';
import { reactive, ref } from 'vue';
import { VxeColumnProps } from 'vxe-table';

export const toolbar = {
  custom: {
    icon: 'iconfont icon-zidingyilie',
  },
  slots: {
    buttons: 'toolbar_buttons',
    tools: 'toolbar_tools',
  },
};

export const tableConfig = reactive<any>({
  ...defaultTableConfig,
  ...{
    maxHeight: 300,
    showFooter: true,
    sortConfig: {
      showIcon: false,
    },
    keepSource: true,
    customConfig: {
      checkMethod: ({ column }) => {
        return true;
      },
    },
    editRules: {
      name: [
        { required: true, message: '名称必填' },
        { min: 3, max: 50, message: '名称长度在 3 到 50 个字符' },
      ],
      weight: [{ min: 40, max: 100, type: 'number', message: '数值在40-100之间' }],
    },
    editConfig: { ...defaultEditConfig, ...{ trigger: 'manual', mode: 'row' } },
    footerMethod: ({ columns, data }) => {
      const footerData = [
        columns.map((column, _columnIndex) => {
          if (_columnIndex === 0) {
            return '合计';
          } else if (column.field === 'weight') {
            return sumNum(data, 'weight');
          }
          return null;
        }),
      ];
      return footerData;
    },
  },
});
export const tableFunc = reactive<any>({
  ...defaultTableFunc,
  ...{
    checkboxChange: ({ records, $table, ...result }) => {
      const selectedRows = $table.getCheckboxRecords();
      console.log('🚀 ~ file: table.constrant.ts ~ line 71 ~ selectedRows', records, selectedRows);
    },
    checkboxAll: ({ records, $table, ...result }) => {
      console.log('🚀 ~ file: table.constrant.ts ~ line 71 ~ selectedRows', records);
    },
    validError: ({ row, $table, ...res }) => {
      //   console.log('res,', res);
      //   $table.setActiveRow(row);
    },
    editClosed: async ({ row, $table, ...res }) => {
      console.log('res,', res);
      const errMap = await $table.validate(row);
      if (errMap) {
        $table.setActiveRow(row);
      }
    },
  },
});

const sumNum = (list: any[], field: string) => {
  let count = 0;
  list.forEach((item) => {
    count += Number(item[field]);
  });
  return count;
};

export const defaultTableWapper = ref({});
export const sexList2 = ref([
  { label: '男', value: '1' },
  { label: '女', value: '0' },
]);
export const regionList = [
  {
    label: '北京',
    value: 1,
    children: [
      { value: 3, label: '东城区' },
      { value: 4, label: '西城区' },
    ],
  },
  {
    label: '上海',
    value: 21,
    children: [
      { value: 23, label: '黄浦区' },
      { value: 24, label: '卢湾区' },
    ],
  },
  {
    label: '广东',
    value: 42,
    children: [
      { value: 43, label: '广州市' },
      { value: 67, label: '深圳市' },
    ],
  },
];
export const columns = [
  {
    key: 3,
    field: 'id',
    title: 'ID',
    width: 50,
    columnConfig: {
      width: 40,
    },
  },
  {
    key: 4,
    title: '名称',
    children: [
      {
        key: 4,
        field: 'name',
        title: '名称',
        width: 200,
        columnConfig: {
          editRender: {
            name: '$input',
          },
        },
      },
      {
        key: 5,
        field: 'name1',
        title: '名称1',
        width: 200,
        columnConfig: {
          editRender: {
            name: '$select',
            options: [
              {
                label: '姓名1',
                value: '姓名1',
                key: 'name1',
              },
              {
                label: '姓名2',
                value: '姓名2',
                key: 'name2',
              },
              {
                label: '姓名3',
                value: '姓名3',
                key: 'name3',
              },
              {
                label: '姓名4',
                value: '姓名4',
                key: 'name4',
              },
            ],
            props: { multiple: true },
          },
        },
      },
    ],
  },

  {
    key: 5,
    field: 'sex',
    title: '性别',
    width: 200,
    filters: [
      { value: '1', label: '男' },
      { value: '0', label: '女' },
    ],
    columnConfig: {
      // formatter: ({ cellValue }) => {
      //   console.log('🚀 ~ file: index.vue ~ line 96 ~ cellValue', cellValue);
      //   return cellValue ? (cellValue === '1' ? '男' : '女') : '';
      // },
      formatter: 'formatSex',
      editRender: {},
    },
    slots: {
      edit: 'sexEdit',
    },
  },

  {
    key: 6,
    field: 'address',
    title: '地址',
    width: 200,
    columnConfig: { editRender: {} },
    slots: { edit: 'addressEdit' },
  },
  {
    key: 6,
    field: 'weight',
    title: '体重(Kg)',
    width: 300,
    columnConfig: {
      sortable: true,
      editRender: {
        name: 'AInputNumber',
        props: { min: 40, max: 100, step: 1 },
      },
    },
  },
  {
    key: 7,
    field: 'beginTime',
    title: '开始时间',
    width: 300,
    columnConfig: {
      sortable: true,
      editRender: {
        name: '$input',
        props: { type: 'datetime' },
      },
    },
    slots: { header: 'beginTimeTitle' },
  },
  {
    key: 8,
    field: 'endTime',
    title: '结束时间(有问题)',
    width: 300,
    columnConfig: {
      // editRender: { name: 'ADatePicker', props: { format: 'YYYY-MM-DD HH:mm:ss' } },
    },
    slots: { edit: 'endTimeEdit' },
  },
  {
    key: 11,
    field: 'action',
    title: '操作',
    width: 200,
    slots: { body: 'action' },
  },
];
