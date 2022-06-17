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
    <template #toolbar_buttons="{ $table }">
      <a-space>
        <a-button @click="getDelete($table)">获取已删除数据</a-button>
        <a-button @click="getEdit($table)">获取已修改数据</a-button>
      </a-space>
    </template>
    <template #beginTimeTitle="{ column }">
      {{ column.title }}
      <span class="custom-sort" :class="{ 'is-order': column.order }">
        <i
          class="iconfont"
          :class="[column.order ? `icon-wind-${column.order}ending ` : 'icon-sort-line']"
        ></i>
      </span>
    </template>
    <template #sexEdit="{ row }">
      <vxe-radio-group v-model="row.sex" size="mini">
        <vxe-radio
          v-for="item in sexList2"
          :key="item.value"
          :label="item.value"
          :content="item.label"
        />
      </vxe-radio-group>
    </template>
    <template #endTimeEdit="{ row }">
      <a-date-picker
        placeholder="Select Time"
        v-model:value="row.endTime"
        value-format="YYYY-MM-DD HH:mm:ss"
        @change="dateChange(row.endTime)"
      />
    </template>
    <template #addressEdit="{ row }">
      <a-cascader v-model:value="row.address" :options="regionList" />
    </template>
    <template #action="{ row, ...res }">
      <a-space>
        <a-button size="small" type="link" @click="updateRow(res, row)"
          ><template #icon><i class="vxe-icon--edit-outline"></i></template
        ></a-button>
        <a-button size="small" type="link" @click="revertRow(res, row)"
          ><template #icon><i class="iconfont icon-praise_fill"></i></template
        ></a-button>
        <a-button size="small" type="link" @click="deleteRow(res, row)"
          ><template #icon><i class="vxe-icon--close"></i></template
        ></a-button>
      </a-space>
    </template>
  </DefaultTableWapper>
</template>
<script lang="ts" setup>
  import { getTableData } from '@/api/demo';
  import { DefaultTableWapper } from '@/components';
  import { Modal } from 'ant-design-vue';

  import { onMounted, reactive, unref, createVNode } from 'vue';
  import _ from 'lodash';
  import {
    columns,
    toolbar,
    tableConfig,
    tableFunc,
    defaultTableWapper,
    sexList2,
    regionList,
  } from './config';
  let handelTableDataValue = reactive<Array<any>>([]);
  const { run, data: tableData } = getTableData();

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

  onMounted(async () => {
    await run();
    handelTableData();
  });
  const updateRow = (res, row) => {
    res.$table.setActiveRow(row);
  };
  const revertRow = (res, row) => {
    res.$table.revertData(row);
  };
  const deleteRow = (res, row) => {
    res.$table.remove(row);
  };
  const getDelete = ($table) => {
    const removeRecords = $table.getRemoveRecords();
    Modal.info({
      title: '提示',
      width: '700px',
      content: createVNode('textarea', {
        // innerHTML: `<span style="color:green">${JSON.stringify(selectedRows, null, 2)} </span>`,
        value: `${JSON.stringify(removeRecords, null, 2)}`,
        style: 'width:100%;min-height:400px',
        disabled: true,
      }),
    });
  };

  const getEdit = ($table) => {
    const updateRecords = $table.getUpdateRecords();
    Modal.info({
      title: '提示',
      width: '700px',
      content: createVNode('textarea', {
        // innerHTML: `<span style="color:green">${JSON.stringify(selectedRows, null, 2)} </span>`,
        value: `${JSON.stringify(updateRecords, null, 2)}`,
        style: 'width:100%;min-height:400px',
        disabled: true,
      }),
    });
  };

  const dateChange = (v) => {
    console.log(v, 2222222222222);
  };
</script>
<style scoped lang="less">
  .custom-sort {
    padding: 0 4px;
  }
  .custom-sort.is-order {
    color: #409eff;
  }
  /deep/.ant-input-number-handler-wrap {
    z-index: 10000; // 不改变时无法点击
  }
</style>
