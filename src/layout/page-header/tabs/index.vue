<template>
  <div class="ml-tab-views">
    <a-tabs
      type="editable-card"
      size="small"
      :animated="false"
      :hideAdd="true"
      :tabBarGutter="3"
      :activeKey="activeKeyRef"
      @change="handleChange"
      @edit="handleEdit"
    >
      <template v-for="item in getTabsState" :key="item.query ? item.fullPath : item.path">
        <a-tab-pane :closable="!(item && item.meta && item.meta.affix)">
          <template #tab>
            <!-- <TabContent :tabItem="item" /> -->
            {{ item.meta.title }}
          </template>
          <template #closeIcon>
            <IconfontIcon
              v-if="!(item && item.meta && item.meta.affix)"
              class="icon-close"
              :color="'#fff'"
              :size="12"
            />
          </template>
        </a-tab-pane>
      </template>
    </a-tabs>
  </div>
</template>
<script lang="ts" setup>
  import { REDIRECT_NAME } from '@/constrant';
  import { listenerRouteChange } from '@/logics/mitt/routeChange';
  import { useMenuStore } from '@/stores/modules/menu';
  import { computed, ref, unref } from 'vue';
  import { RouteLocationNormalized, useRouter } from 'vue-router';

  const menuStore = useMenuStore();
  const router = useRouter();

  const activeKeyRef = ref('');
  const getTabsState = computed(() => {
    return menuStore.getTabList.filter((item) => !item.meta?.hideTab);
  });

  listenerRouteChange((route) => {
    const {
      name,
      path,
      fullPath,
      meta: { hideTab, currentActiveMenu },
    } = route;
    console.log(
      '🚀 ~ file: index.vue ~ line 66 ~ listenerRouteChange ~  activeKeyRef.value',
      activeKeyRef.value,
    );

    if (!route || name === REDIRECT_NAME) {
      return;
    }

    let isHideTab = !hideTab ? null : currentActiveMenu;

    let setPath = isHideTab || path || fullPath;
    if (activeKeyRef.value !== setPath) {
      activeKeyRef.value = setPath;
    }

    if (!isHideTab) {
      menuStore.addTab(unref(route));
    } else {
      let currentActiveRouteConf = router.getRoutes().find((o) => o.path === currentActiveMenu);
      currentActiveRouteConf &&
        menuStore.addTab(currentActiveRouteConf as unknown as RouteLocationNormalized);
    }
  });

  const handleChange = (activeKey: any) => {
    activeKeyRef.value = activeKey;
    const { push, replace } = router;
    console.log('🚀 ~ file: index.vue ~ line 86 ~ handleChange ~ getTabsState', getTabsState);

    push(activeKey);
  };

  // Close the current tab
  const handleEdit = (targetKey: string) => {
    console.log('🚀 ~ file: index.vue ~ line 99 ~ handleEdit ~ menuStore', menuStore);
    menuStore.closeTabByKey(targetKey, router);
  };
</script>
<style lang="less" scoped>
  @import url('./tabs.less');
</style>
