<template>
  <div class="container" v-contextmenu="contextmenu3">
    <UploadFile />
    <a-button v-contextmenu="contextmenu">右键菜单</a-button>
  </div>
</template>
<script lang="ts" setup>
  import { UploadFile } from '@/components';
  import { onMounted } from 'vue';
  const contextmenu = () => {
    return [
      {
        text: '粘贴',
        subText: 'Ctrl + V',
        handler: () => console.log('粘贴'),
      },
      {
        text: '全选',
        subText: 'Ctrl + A',
        handler: () => console.log('全选'),
      },
    ];
  };
  const contextmenu3 = () => {
    return [
      {
        text: '复制',
        subText: 'Ctrl + C',
        handler: () => console.log('复制'),
      },
      {
        text: '剪切',
        subText: 'Ctrl + X',
        handler: () => console.log('全选'),
      },
      {
        text: '粘贴',
        subText: 'Ctrl + V',
        handler: () => console.log('全选'),
      },
      {
        text: '全选',
        subText: 'Ctrl + A',
        handler: () => console.log('全选'),
      },
    ];
  };
</script>
<style lang="less" scoped>
  .container {
    padding: 10px;
    background-color: #fff;
    height: calc(~'100% - 20px');
  }
</style>
