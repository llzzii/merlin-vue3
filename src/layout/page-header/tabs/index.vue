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
      <template #rightExtra>
        <span class="refresh-page" @click="handleMenuClick({ key: 'refresh' })">
          <redo-outlined :spin="loading" />
        </span>
        <a-dropdown>
          <span class="refresh-page" @click.prevent>
            <DownOutlined />
          </span>
          <template #overlay>
            <a-menu @click="handleMenuClick">
              <a-menu-item key="refresh">
                <redo-outlined :spin="loading" />
                <span class="dropdown-title">重新加载</span>
              </a-menu-item>
              <a-menu-item key="2">
                <close-outlined />
                <span class="dropdown-title">关闭当前页</span>
              </a-menu-item>
              <a-menu-item key="3">
                <minus-outlined />
                <span class="dropdown-title">关闭全部页</span>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </a-tabs>
  </div>
</template>
<script lang="ts" setup>
  import { REDIRECT_NAME } from '@/constrant';
  import { useTabs } from '@/hooks/useTabs';
  import { listenerRouteChange } from '@/logics/mitt/routeChange';
  import { useMenuStore } from '@/stores/modules/menu';
  import { RedoOutlined, DownOutlined, CloseOutlined, MinusOutlined } from '@ant-design/icons-vue';
  import { MenuProps } from 'ant-design-vue';
  import { computed, ref, unref } from 'vue';
  import { RouteLocationNormalized, useRouter } from 'vue-router';
  const menuStore = useMenuStore();
  const router = useRouter();
  const loading = ref(false);

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

    push(activeKey);
  };
  const { refreshPage } = useTabs();

  const handleMenuClick: MenuProps['onClick'] = async (e) => {
    loading.value = true;
    console.log('click', e, loading);

    if (e.key == 'refresh') {
      await refreshPage();
    }
    loading.value = false;
    console.log('click', loading);
  };
  // Close the current tab
  const handleEdit = (targetKey: string) => {
    menuStore.closeTabByKey(targetKey, router);
  };
</script>
<style lang="less" scoped>
  @import url('./tabs.less');

  .refresh-page {
    display: inline-block;
    width: 36px;
    height: 30px;
    line-height: 30px;
    color: #00000073;
    text-align: center;
    cursor: pointer;
    border-left: 1px solid #d9d9d9;
  }
  .dropdown-title {
    display: inline-block;
    margin-left: 5px;
  }
</style>
