<template>
  <div>
    这是一个子页面
    <p>缓存测试：<a-input v-model:value="value" placeholder="Basic usage" /></p>
    <router-link to="/manage/document/detail">打开详情</router-link>
  </div>
</template>
<script setup lang="ts">
  const value=ref('test')
</script>
