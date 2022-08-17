<template>
  <div class="ml-menu">
    <a-menu
      v-model:open-keys="menuState.openKeys"
      v-model:selected-keys="menuState.selectedKeys"
      mode="inline"
      theme="dark"
      @click="menuClick"
    >
      <template v-for="item in menus" :key="item.path">
        <template v-if="!item.children || item.children.length == 0">
          <a-menu-item :key="item.path">
            <template #icon>
              <IconfontIcon v-if="item.icon" :color="'#fff'" :size="18" :class="item.icon" />
            </template>
            {{ item.name }}
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :key="item.path" :menu-info="item" />
        </template>
      </template>
    </a-menu>
  </div>
</template>
<script lang="ts" setup name="LayoutMenu">
  import { getMenu } from '@/api/menu';
  import { computed, onMounted, reactive, ref, unref, watch } from 'vue';
  import SubMenu from '../menu-item/index.vue';
  import { Menu, MenuState } from './menu';
  import { RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router';
  import { findNode, getAllParentPath } from '@/utils/treeHelper';
  import { listenerRouteChange } from '@/logics/mitt/routeChange';
  import { useMenuStore } from '@/stores/modules/menu';
  const currentRoute = useRoute();

  const menuState = reactive<MenuState>({
    defaultSelectedKeys: ['/dashboard'],
    openKeys: [],
    selectedKeys: [currentRoute.fullPath],
    collapsedOpenKeys: [],
  });
  const { run, data: menus } = getMenu();
  const router = useRouter();
  const menuStore = useMenuStore();
  const currentActiveMenu = ref('');

  // menuState.selectedKeys = computed(() => [currentRoute.fullPath]);

  const menuClick = ({ key }: { key: string; keyPath: string[] }) => {
    router.push(key);
  };
  const setOpenKeys = async (path) => {
    if (!unref(menus)) {
      return;
    }
    const parentPaths = await getAllParentPath(unref(menus), path);

    menuState.openKeys = parentPaths;
  };
  listenerRouteChange((route) => {
    handleMenuChange(route);
    currentActiveMenu.value = route.meta?.currentActiveMenu as string;

    if (unref(currentActiveMenu)) {
      menuState.selectedKeys = [unref(currentActiveMenu)];
      setOpenKeys(unref(currentActiveMenu));
    }
  });
  async function handleMenuChange(route?: RouteLocationNormalizedLoaded) {
    const path =
      (route || unref(currentRoute)).meta?.currentActiveMenu || (route || unref(currentRoute)).path;
    setOpenKeys(path);
    if (unref(currentActiveMenu)) return;
    if (!unref(menus)) {
      return;
    }
    const parentPaths = await getAllParentPath(unref(menus), path as string);
    menuState.selectedKeys = parentPaths;
  }

  onMounted(async () => {
    await run();
    menuStore.setMenuData(unref(menus));
    setOpenKeys(currentRoute.path);
    const openNode = findNode(unref(menus), (n) => n.path === '/dashboard');
  });
</script>
<style scoped lang="less">
  .ml-menu {
    height: calc(100% - 50px);
    overflow-y: auto;
  }
</style>
