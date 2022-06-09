<template>
  <a-breadcrumb class="ml-breadcrumb" :routes="routes">
    <template #itemRender="{ route, paths, routes: routesMatched }">
      <template v-if="!route?.meta?.hideBreadcrumb">
        <span v-if="routesMatched.indexOf(route) === routesMatched.length - 1">
          {{ route.name || route.meta.title }}
        </span>
        <router-link v-else to="" @click="handleClick(route, paths, $event)">
          {{ route.name || route.meta.title }}
        </router-link>
      </template>
    </template>
  </a-breadcrumb>
</template>
<script lang="ts" setup name="Breadcrumb">
import { REDIRECT_NAME } from "@/constrant";
import { Menu } from "@/layout/aside/menu/menu";
import { useMenuStore } from "@/stores/modules/menu";
import { getAllParentPath, getMatched, treeFilter } from "@/utils";
import { isString } from "@/utils/is";
import { ref, watchEffect } from "vue";
import { RouteLocationMatched, useRouter } from "vue-router";

const routes = ref<RouteLocationMatched[]>([]);
const menuStore = useMenuStore();

const { currentRoute, push } = useRouter();
watchEffect(() => {
  console.log(
    "🚀 ~ file: index.vue ~ line 29 ~ watchEffect ~ menuStore",
    menuStore
  );

  const menus: Menu[] = menuStore.getMenuData;

  if (currentRoute.value.name === REDIRECT_NAME) return;

  const routeMatched = currentRoute.value.matched;
  const cur = routeMatched?.[routeMatched.length - 1];
  let path = currentRoute.value.path;

  if (cur && cur?.meta?.currentActiveMenu) {
    path = cur.meta.currentActiveMenu as string;
  }

  const parent = getAllParentPath(menus, path);
  const filterMenus = menus.filter((item) => item.path === parent[0]);
  const matched = getMatched(filterMenus, parent) as any;

  if (!matched || matched.length === 0) return;

  const breadcrumbList = filterItem(matched);

  if (currentRoute.value.meta?.currentActiveMenu) {
    breadcrumbList.push({
      ...currentRoute.value,
      name: currentRoute.value.meta?.title || currentRoute.value.name,
    } as unknown as RouteLocationMatched);
  }
  routes.value = breadcrumbList;
  console.log("🚀 ~ file: index.vue ~ line 15 ~ currentRoute", currentRoute);
});
const filterItem = (list: RouteLocationMatched[]) => {
  return treeFilter(list, (item) => {
    const { meta, name } = item;
    if (!meta) {
      return !!name;
    }
    const { title, hideBreadcrumb, hideMenu } = meta;
    if (!title || hideBreadcrumb || hideMenu) {
      return false;
    }
    return true;
  }).filter((item) => !item.meta?.hideBreadcrumb);
};
const handleClick = (
  route: RouteLocationMatched,
  paths: string[],
  e: Event
) => {
  e?.preventDefault();
  const { children, redirect, meta } = route;

  if (children?.length && !redirect) {
    e?.stopPropagation();
    return;
  }
  if (meta?.carryParam) {
    return;
  }

  if (redirect && isString(redirect)) {
    push(redirect);
  } else {
    let goPath = "";
    if (paths.length === 1) {
      goPath = paths[0];
    } else {
      const ps = paths.slice(1);
      const lastPath = ps.pop() || "";
      goPath = `${lastPath}`;
    }
    goPath = /^\//.test(goPath) ? goPath : `/${goPath}`;
    push(goPath);
  }
};
</script>
<style scoped lang="less">
.ml-breadcrumb {
  display: flex;
  padding: 0 8px;
  align-items: center;
}
</style>
