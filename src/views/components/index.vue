<template>
  <div class="container">
    <UploadFile />
  </div>
</template>
<script lang="ts" setup>
  import { UploadFile } from '@/components';
  import { onMounted } from 'vue';
</script>
<style lang="less" scoped>
  .container {
    padding: 10px;
    background-color: #fff;
    height: calc(~'100% - 20px');
  }
</style>
