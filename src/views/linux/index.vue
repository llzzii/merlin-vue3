<template>
  <div>
    <div v-for="item in LinuxJson" :key="item.id" style="background: #fff; padding: 10px">
      <h3 style="margin: 0; padding: 5px 10px">{{ item.name }}</h3>
      <DefaultTableWapper
        :columns="columns"
        :showSeq="false"
        :showCheckbox="false"
        :showPagination="false"
        :tableData="item.children"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import LinuxJson from '@/assets/jsons/linux.json';
  import { DefaultTableWapper } from '@/components';
  const columns = [
    {
      key: 1,
      field: 'remark',
      title: '操作',
      width: 100,
      columnConfig: {
        minWidth: 200,
      },
    },
    {
      key: 2,
      field: 'name',
      title: '指令',
      width: 50,
    },
    {
      key: 3,
      field: 'param',
      title: '详细参数',
      columnConfig: {
        minWidth: 500,
      },
    },
  ];
</script>
