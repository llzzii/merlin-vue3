<template>
  <DefaultTableWapper
    ref="defaultTableWapper"
    :columns="columns"
    :toolbar="toolbar"
    :showPagination="true"
    :tableData="tableData"
    :pagination="pagination"
    @onTableChange="onTableChange"
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
  import { VxeColumnProps } from 'vxe-table';
  import { UserService } from '../user.service';
  import {UserListQuery} from "./user.instance"

  const userReq=new UserListQuery()
  const defaultTableWapper = ref({});
  const { run, data: tableData,pagination,refresh } = UserService.getUserlist();

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
  const search=async ()=>{
    await run({...userReq})
  }


  const toolbar = {
    custom: {
      icon: 'iconfont icon-zidingyilie',
    },
  };

 
 
  onMounted(async () => {
    await search();
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
