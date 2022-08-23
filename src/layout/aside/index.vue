<template>
  <a-layout-sider ref="sideRef" breakpoint="lg" collapsible :collapsed="collapsed" :theme="'dark'">
    <Logo :collapsed="collapsed" />
    <LayoutMenu />
    <template #trigger>
      <div @click.stop="toggleCollapsed">
        <DoubleRightOutlined v-if="collapsed" />
        <DoubleLeftOutlined v-else />
      </div>
    </template>
  </a-layout-sider>
</template>
<script lang="ts" setup name="LayoutsAside">
  import { ref } from 'vue';
  import Logo from './logo/index.vue';
  import LayoutMenu from './menu/index.vue';
  import { DoubleRightOutlined, DoubleLeftOutlined } from '@ant-design/icons-vue';
  import { useAppStore } from '@/stores/modules/app';
  const appStore = useAppStore();
  const collapsed = ref(appStore.getMenuSetting.collapsed);
  const toggleCollapsed = () => {
    collapsed.value = !collapsed.value;
    appStore.setMenuConfig({ collapsed: collapsed.value });
  };
</script>
