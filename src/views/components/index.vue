<template>
  <div class="container" v-contextmenu="contextmenu3">
    <UploadFile />
    <a-space direction="vertical" class="minw200">
      <a-button v-contextmenu="contextmenu">右键菜单</a-button>
      <a-divider orientation="left" style="border-color: #7cb305" dashed
        >图片验证码({{ imgCode }})</a-divider
      >
      <canvas
        ref="domRef"
        width="120"
        height="40"
        class="cursor-pointer"
        @click="getImgCode"
      ></canvas>
    </a-space>
  </div>
</template>
<script lang="ts" setup>
  import { UploadFile } from '@/components';
  import { useImageVerify } from '@/hooks/useImageVerify';
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
  const { domRef, imgCode, setImgCode, getImgCode } = useImageVerify();
  onMounted(() => {
    setImgCode(5689);
  });
</script>
<style lang="less" scoped>
  .container {
    padding: 10px;
    background-color: #fff;
    height: calc(~'100% - 20px');
  }
  .minw200 {
    min-width: 200px;
  }
</style>
