<template>
  <DefaultTableWapper
    ref="defaultTableWapper"
    :columns="columns"
    :toolbar="toolbar"
    :showPagination="true"
    :tableData="handelTableData()"
    :tableConfig="tableConfig"
    :pagination="pagination"
    :tableFunc="tableFunc"
  >
    <template #beginTimeTitle="{ column }">
      {{ column.title }}
      <span class="custom-sort" :class="{ 'is-order': column.order }">
        <i
          class="iconfont"
          :class="[column.order ? `icon-wind-${column.order}ending ` : 'icon-sort-line']"
        ></i>
      </span>
    </template>
  </DefaultTableWapper>
</template>
<script lang="ts" setup>
  import { getTableData } from '@/api/demo';
  import { DefaultTableWapper } from '@/components';
  import { onMounted, reactive, unref, ref } from 'vue';
  import _ from 'lodash';
  import { defaultTableConfig, defaultTableFunc } from '@/constrant/table.constrant';

  import { VxeColumnProps } from 'vxe-table';
  const pagination = reactive<any>({
    currentPage: 1,
    pageSize: 10,
    total: 0,
    onTableChange: ({ type, currentPage, pageSize, $event }) => {
      pagination.currentPage = currentPage;
      pagination.pageSize = pageSize;
      console.log(type, currentPage, pageSize, $event, 111111, pagination.currentPage);
      handelTableData();
    },
  });
  const defaultTableWapper = ref({});
  const { run, data: tableData } = getTableData();
  const columns: VxeColumnProps = [
    {
      key: 3,
      field: 'id',
      title: 'ID',
      width: 100,
      columnConfig: {
        fixed: 'left',
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
        },
        { key: 5, field: 'name1', title: '名称1', width: 200 },
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
        formatter: ({ cellValue }) => {
          return cellValue ? (cellValue === '1' ? '男' : '女') : '';
        },
      },
    },
    { key: 6, field: 'address', title: '地址', width: 200 },
    {
      key: 6,
      field: 'weight',
      title: '体重(Kg)',
      width: 300,
      columnConfig: {
        sortable: true,
      },
    },
    {
      key: 9,
      field: 'weight',
      title: '柱状图',
      width: 300,
      columnConfig: {
        cellRender: {
          name: 'bar',
          props: {
            bar: {
              max: 100,
            },
            label: {
              formatter: '{value}%',
            },
          },
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
      },
      slots: { header: 'beginTimeTitle' },
    },
    { key: 8, field: 'endTime', title: '结束时间', width: 300 },
  ];
  let handelTableDataValue = reactive<Array<any>>([]);
  const handelTableData = () => {
    if (!unref(tableData)) return [];
    pagination.total = unref(tableData).length;
    let start = (pagination.currentPage - 1) * pagination.pageSize;
    handelTableDataValue = unref(tableData).slice(start, start + pagination.pageSize);
    return handelTableDataValue;
    console.log(
      '🚀 ~ file: index.vue ~ line 42 ~ handelTableData ~ handelTableDataValue',
      handelTableDataValue,
      pagination,
    );
  };
  const sumNum = (list: any[], field: string) => {
    let count = 0;
    list.forEach((item) => {
      count += Number(item[field]);
    });
    return count;
  };
  const toolbar = {
    custom: {
      icon: 'iconfont icon-zidingyilie',
    },
  };

  let tableConfig = reactive<any>({
    ...defaultTableConfig,
    ...{
      maxHeight: 600,
      showFooter: true,
      sortConfig: {
        showIcon: false,
      },
      customConfig: {
        checkMethod: ({ column }) => {
          console.log('🚀 ~ file: index.vue ~ line 93 ~ column', column);
          return true;
        },
      },
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
  let tableFunc = reactive<any>({
    ...defaultTableFunc,
    ...{
      checkboxChange: ({ records, $table, ...result }) => {
        let selectedRows = $table.getCheckboxRecords();
        console.log(
          '🚀 ~ file: table.constrant.ts ~ line 71 ~ selectedRows',
          records,
          selectedRows,
        );
      },
      checkboxAll: ({ records, $table, ...result }) => {
        console.log('🚀 ~ file: table.constrant.ts ~ line 71 ~ selectedRows', records);
      },
    },
  });
  onMounted(async () => {
    await run();
    handelTableData();
  });
</script>
<style scoped>
  .custom-sort {
    padding: 0 4px;
  }
  .custom-sort.is-order {
    color: #409eff;
  }
</style>
