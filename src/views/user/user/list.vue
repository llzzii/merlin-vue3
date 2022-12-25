<template>
  <DefaultTableWapper
    ref="defaultTableWapper"
    :columns="columns"
    :toolbar="toolbar"
    :showPagination="true"
    :tableData="tableData"
    :pagination="pagination"
  >
    <template #toolbar_buttons>
      <form-btn @refresh="refresh"></form-btn>
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
  </DefaultTableWapper>
</template>
<script lang="ts" setup>
  import { DefaultTableWapper } from '@/components';
  import { onMounted, reactive, unref, ref } from 'vue';
  import _ from 'lodash';
  import formBtn from './form.vue';
  import { defaultTableConfig, defaultTableFunc } from '@/constrant/table.constrant';

  import { VxeColumnProps } from 'vxe-table';
  import { UserService } from '../user.service';
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
  const { run, data: tableData } = UserService.getUserlist();
  const columns: VxeColumnProps = [
    {
      key: 'username',
      field: 'username',
      title: '用户名',
      width: 100,
    },
    {
      key: 'realname',
      field: 'realname',
      title: '昵称',
      width: 100,
    },
    {
      key: 'mobile',
      field: 'mobile',
      title: '手机号',
      width: 100,
    },
    {
      key: 'createTime',
      field: 'createTime',
      title: '创建时间',
      width: 100,
    },
    {
      key: 'createBy',
      field: 'createBy',
      title: '创建人',
      width: 100,
    },
  ];
  let handelTableDataValue = reactive<Array<any>>([]);
  const handelTableData = async () => {
    await run();
    // if (!unref(tableData)) return [];
    pagination.total = unref(tableData).length;
    console.log('🚀 ~ file: list.vue:81 ~ handelTableData ~ tableData', tableData);
    let start = (pagination.currentPage - 1) * pagination.pageSize;
    // handelTableDataValue = unref(tableData).slice(start, start + pagination.pageSize);
    return tableData;
  };

  const toolbar = {
    custom: {
      icon: 'iconfont icon-zidingyilie',
    },
  };

 
  const refresh=async()=>{
    await handelTableData();

  }
  onMounted(async () => {
    await handelTableData();
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
