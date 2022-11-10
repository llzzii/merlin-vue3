<template>
  <div>这是一个详情页
    <p>缓存测试：<a-input v-model:value="value" placeholder="Basic usage" /></p>
    <router-link to="/manage/document">返回</router-link>
  </div>

</template>

<script setup lang="ts">
  const value =ref('test 子页面')
</script>
