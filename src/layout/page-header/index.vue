<template>
  <a-layout-header class="ml-header" :style="{ width: 'calc(100% - ' + headerWidth + ')' }">
    <div class="header">
      <div class="header-left">
        <Breadcrumb />
      </div>
      <div class="header-right">
        <RightButtons />
      </div>
    </div>
    <Tabs />
  </a-layout-header>
</template>
<script lang="ts" setup>
  import Breadcrumb from './breadcrumb/index.vue';
  import RightButtons from './rightButtons/index.vue';
  import Tabs from './tabs/index.vue';
  import { useAppStore } from '@/stores/modules/app';
  import { computed } from 'vue';
  const appStore = useAppStore();

  const collapsed = computed(() => {
    return appStore.getMenuSetting.collapsed;
  });
  const headerWidth = computed(() => {
    return collapsed.value ? '80px' : '200px';
  });
</script>

<style lang="less" scoped>
  .ml-header {
    position: fixed;
    top: 0;
    z-index: 505;
    transition: width 0.2s;
    flex: 0 0 auto;
    background-color: #fff;
    padding: 0;
    .header {
      display: flex;
      height: 48px;
      padding: 0;
      line-height: 48px;
      color: rgba(0, 0, 0, 0.85);
      background-color: #fff;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      .header-left {
        display: flex;
        height: 100%;
        align-items: center;
      }
      .header-right {
        height: 100%;
        align-items: center;
        padding: 0 10px;
      }
    }
  }
</style>
