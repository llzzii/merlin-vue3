<script setup lang="ts">
import { RouterView } from "vue-router";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import { ConfigProvider } from "ant-design-vue";
</script>

<template>
  <ConfigProvider :locale="zhCN">
    <router-view></router-view>
  </ConfigProvider>
</template>
