<template>
  <a-row>
    <a-col :span="8">
      <h3>后端处理数据</h3>
      <DefaultTreeTableWapper
        ref="defaultTableWapper"
        :columns="columns"
        :toolbar="toolbar"
        :showPagination="false"
        :tableData="tableData"
        :tableConfig="tableConfig"
        :tableFunc="tableFunc"
        :showSeq="false"
      >
        <template #toolbar_buttons="{ $table }">
          <a-space>
            <a-button @click="clickThis($table)">获取选中行</a-button>
            <a-button @click="getParent($table)">获取高亮行的父信息</a-button>
          </a-space>
        </template>
        <template #endTime="{ rowData, index }">
          <span style="color: red">自定义内容:{{ rowData.endTime }}</span>
        </template>
      </DefaultTreeTableWapper></a-col
    >
    <a-col :span="8">
      <h3>懒加载</h3>
      <DefaultTreeTableWapper
        :columns="columns"
        :showPagination="false"
        :tableData="tableData2"
        :tableConfig="tableConfig2"
        :tableFunc="tableFunc"
        :showSeq="false"
      >
        <template #endTime="{ rowData, index }">
          <span style="color: red">自定义内容:{{ rowData.endTime }}</span>
        </template>
      </DefaultTreeTableWapper>
    </a-col>
    <a-col :span="8">
      <h3>前端处理数据</h3>
      <DefaultTreeTableWapper
        :columns="columns"
        :showPagination="false"
        :tableData="tableData3"
        :tableConfig="tableConfig3"
        :tableFunc="tableFunc"
        :showSeq="false"
      >
        <template #endTime="{ rowData, index }">
          <span style="color: red">自定义内容:{{ rowData.endTime }}</span>
        </template>
      </DefaultTreeTableWapper></a-col
    >
  </a-row>
</template>
<script lang="ts" setup>
  import { getTreeTableData, getTreeTableData2, getTreeTableData3 } from '@/api/demo';
  import { DefaultTreeTableWapper } from '@/components';
  import { onMounted, reactive, unref, ref, createVNode } from 'vue';
  import _ from 'lodash';
  import { defaultTableConfig, defaultTableFunc } from '@/constrant/table.constrant';
  import { Modal } from 'ant-design-vue';

  const defaultTableWapper = ref({});
  let tableData2 = ref<any>([]);
  let tableData3 = ref<any>([]);

  const { run, data: tableData } = getTreeTableData({ keyword: 'table' });
  const { run: run2 } = getTreeTableData2();
  const { run: run3 } = getTreeTableData3();

  const columns = [
    {
      key: 4,
      field: 'name',
      title: '名称',
      width: 200,
      columnConfig: {
        treeNode: true,
      },
    },

    {
      key: 7,
      field: 'endTime',
      title: '开始时间',
      width: 300,
      slots: { body: 'endTime' },
      columnConfig: {
        sortable: true,
      },
    },
  ];

  const toolbar = {
    custom: {
      icon: 'iconfont icon-zidingyilie',
    },
    slots: {
      buttons: 'toolbar_buttons',
      tools: 'toolbar_tools',
    },
  };

  let tableConfig = reactive<any>({
    ...defaultTableConfig,
    ...{
      border: 'none',
      resizable: false,
      showHeader: false,
      maxHeight: 300,
      sortConfig: {
        showIcon: false,
      },
      showSeq: false,
      showFooter: false,
      customConfig: {
        checkMethod: ({ column }) => {
          console.log('🚀 ~ file: index.vue ~ line 93 ~ column', column);
          return true;
        },
      },
      treeConfig: {
        rowField: 'id',
        parentField: 'parentId',
        indent: 13,
        line: true,
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
      currentChange: ({ row, $table, ...result }) => {
        // $table.toggleCheckboxRow(row);
      },
      cellClick: ({ row, column, $table, ...result }) => {
        console.log('🚀 ~ file: index.vue ~ line 120 ~ result', result);
        if (column.type !== 'checkbox') {
          $table.toggleCheckboxRow(row);
        }
      },
      toggleTreeExpand: ({ $event }) => {
        console.log('56');
        $event.stopPropagation();
      },
    },
  });
  const clickThis = ($table) => {
    const selectedRows = $table.getCheckboxRecords();
    Modal.info({
      title: '提示',
      width: '700px',
      content: createVNode('textarea', {
        // innerHTML: `<span style="color:green">${JSON.stringify(selectedRows, null, 2)} </span>`,
        value: `${JSON.stringify(selectedRows, null, 2)}`,
        style: 'width:100%;min-height:400px',
        disabled: true,
      }),
    });
  };
  const getParent = ($table) => {
    const selectedRows = $table.getCurrentRecord();

    const p = $table.getParentRow(selectedRows);
    Modal.info({
      title: '提示',
      width: '700px',
      content: createVNode('textarea', {
        // innerHTML: `<span style="color:green">${JSON.stringify(selectedRows, null, 2)} </span>`,
        value: `${JSON.stringify(p, null, 2)}`,
        style: 'width:100%;min-height:400px',
        disabled: true,
      }),
    });
  };

  let tableConfig2 = reactive<any>({
    ...defaultTableConfig,
    ...{
      border: 'none',
      resizable: false,
      showHeader: false,
      maxHeight: 300,
      sortConfig: {
        showIcon: false,
      },
      showSeq: false,
      showFooter: false,
      customConfig: {
        checkMethod: ({ column }) => {
          console.log('🚀 ~ file: index.vue ~ line 93 ~ column', column);
          return true;
        },
      },
      treeConfig: {
        rowField: 'id',
        parentField: 'parentId',
        indent: 13,
        line: true,
        lazy: 'true',
        hasChild: 'hasChild',
        loadMethod: async ({ row }) => {
          console.log('🚀 ~ file: index.vue ~ line 212 ~ loadMethod: ~ row', row);
          return await run2(row.id);
        },
      },
    },
  });

  let tableConfig3 = reactive<any>({
    ...defaultTableConfig,
    ...{
      border: 'none',
      resizable: false,
      showHeader: false,
      maxHeight: 300,
      sortConfig: {
        showIcon: false,
      },
      showSeq: false,
      showFooter: false,
      customConfig: {
        checkMethod: ({ column }) => {
          console.log('🚀 ~ file: index.vue ~ line 93 ~ column', column);
          return true;
        },
      },
      treeConfig: {
        transform: true,
        rowField: 'id',
        parentField: 'parentId',
        indent: 13,
      },
    },
  });

  onMounted(async () => {
    await run();
    tableData2.value = await run2({ pId: '' });
    tableData3.value = await run3();
    console.log('🚀 ~ file: index.vue ~ line 222 ~ onMounted ~ tableData2', tableData2);
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
