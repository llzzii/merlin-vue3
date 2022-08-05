<template>
  <div class="file-list">
    <DefaultTableWapper
      ref="defaultTableWapper"
      :columns="columns"
      :tableData="fileLists"
      :showPagination="true"
    >
      <template #operation="{ column, row }">
        <a-button type="link" @click="showFile(row)">详情</a-button>
      </template>
    </DefaultTableWapper>
    <FileView :fileKey="fileUrl" :visible="fileVisible" @changeVisible="changeVisible" />
  </div>
</template>

<script lang="ts" setup>
  import { getBucketsList } from '@/api/upload';

  import { DefaultTableWapper, FileView } from '@/components';
  import { onMounted, ref } from 'vue';
  import { VxeColumnProps } from 'vxe-table';
  import moment from 'moment';

  const fileLists = ref<Array<any>>([]);
  const fileVisible = ref(false);
  const fileUrl = ref('');
  const columns: VxeColumnProps = [
    {
      key: 1,
      field: 'key',
      title: '名称',
      width: 100,
      columnConfig: {
        fixed: 'left',
      },
    },
    {
      key: 4,
      title: '类型',
      field: 'mimeType',
      width: 100,
    },
    {
      key: 2,
      title: '大小',
      field: 'fsize',
      width: 100,
      columnConfig: {
        formatter: ({ cellValue }) => {
          return toSize(cellValue);
        },
      },
    },
    {
      key: 3,
      title: '上传时间',
      field: 'putTime',
      width: 100,
      columnConfig: {
        formatter: ({ cellValue }) => {
          console.log('🚀 ~ file: file-list.vue ~ line 64 ~ cellValue', cellValue);
          return moment(cellValue / 10000).format('YYYY-MM-DD hh:mm:ss');
        },
      },
    },
    {
      title: '操作',
      field: 'operation',
      key: 'operation',
      slots: { body: 'operation' },
    },
  ];
  const { run, data, loading } = getBucketsList();
  const toSize = (size) => {
    return size > 100 * 1024
      ? (size / (1024 * 1024)).toFixed(2) + 'M'
      : (size / 1024).toFixed(2) + 'kb';
  };
  const showFile = (row) => {
    //https://sspai.com/post/63507 http图片在https网站不显示，解决参考前面链接
    const domain = 'http://rfzdamvd3.hd-bkt.clouddn.com';

    fileUrl.value = domain + '/' + row.key;
    fileVisible.value = true;
  };
  const changeVisible = () => {
    fileVisible.value = false;
  };
  onMounted(async () => {
    await run();
    fileLists.value = data.value?.data.items;
    console.log('🚀 ~ file: file-list.vue ~ line 37 ~ onMounted ~ d', fileLists.value);
  });
</script>
