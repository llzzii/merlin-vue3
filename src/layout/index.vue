<template>
  <a-layout class="ml-layout">
    <LayoutsAside></LayoutsAside>
    <a-layout class="ml-layout-main">
      <page-header></page-header>

      <a-layout-content class="ml-layout-content">
        <PageContent></PageContent>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import LayoutsAside from "./aside/index.vue";
import PageHeader from "./page-header/index.vue";
import PageContent from "./page-content/index.vue";
</script>
<script lang="ts">
export default {
  name: "Layout",
};
</script>

<style lang="less" scoped>
@import "@/assets/less/layout.component.less";
</style>
