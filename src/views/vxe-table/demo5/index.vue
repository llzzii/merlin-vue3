<template>
  <div>
    <div class="toolbar">
      <a-space>
        <a-button @click="reduceColumn">减一列</a-button>
      </a-space>
    </div>
    <a-table :data-source="tableData" :columns="state.columns" />
  </div>
</template>
<script setup lang="ts">
  import { getTableData } from '@/api/demo';
  import { onMounted, reactive, unref, ref } from 'vue';
  import _ from 'lodash';
  const { run, data: tableData } = getTableData();
  const columns3 = [
    {
      key: 3,
      field: 'id',
      title: 'ID',
      width: 100,
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
  let state = reactive<any>({
    columns: [],
  });
  const getColumn = (num?) => {
    let handleColumn = [];
    columns3.map((c, i) => {
      if (num && num === i) {
        return;
      }
      let children = [];
      if (c.children && c.children.length > 0) {
        c.children.map((o) => {
          children.push({
            key: o.field,
            title: o.title,
            width: o.width,
            dataIndex: o.field,
          });
        });
      }
      handleColumn.push({
        key: c.field,
        title: c.title,
        width: c.width,
        dataIndex: c.field,
        children,
      });
    });
    console.log('🚀 ~ file: index.vue ~ line 85 ~ getColumn ~ handleColumn', handleColumn);
    state.columns = handleColumn;
  };
  const reduceColumn = () => {
    const n = Math.floor(Math.random() * (7 - 0 + 1));
    console.log('🚀 ~ file: index.vue ~ line 111 ~ reduceColumn ~ n', n);
    getColumn(n);
  };
  onMounted(async () => {
    await run();
    getColumn();
  });
</script>
<style lang="less" scoped>
  .toolbar {
    background: #fff;
    padding: 10px;
  }
</style>
