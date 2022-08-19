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
        @click="setNum()"
      ></canvas>

      <a-button v-loading.fullscreen="loading" @click="loading = !loading"> loading </a-button>
    </a-space>
  </div>
</template>
<script lang="ts" setup>
  import { UploadFile } from '@/components';
  import { useImageVerify } from '@/hooks/useImageVerify';
  import { randomNum } from '@/utils';
  import { onMounted, ref } from 'vue';
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
  const setNum = () => {
    let c = randomNum(1000, 10000);
    setImgCode(c);
  };
  const { domRef, imgCode, setImgCode } = useImageVerify();
  const loading = ref(false);
  onMounted(() => {
    setNum();
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
