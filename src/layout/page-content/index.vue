<template>
  <!-- <RouterView>
    <template #default="{ Component, route }">
      <keep-alive>
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </template>
  </RouterView> -->
  <div class="h-full ease-in-out" v-loading="loading">
    <router-view v-slot="{ Component, route }">
      <transition
        name="fade-slide"
        mode="out-in"
        :appear="true"
        @before-leave="handleBeforeLeave"
        @after-enter="handleAfterEnter"
      >
        <keep-alive :include="getCaches">
          <component :is="Component" v-if="menuStore.reloadFlag" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
  import { useMenuStore } from '@/stores/modules/menu';
  import { computed, ref, watch } from 'vue';
  const menuStore = useMenuStore();
  const loading = ref(false);
  watch(
    () => menuStore.reloadFlag,

    (e) => {
      console.log('🚀 ~ file: index.vue ~ line 33 ~ getCachedTabList e', e);
    },
  );
  const getCaches = computed((): string[] => {
    return menuStore.getCachedTabList;
  });
  function handleBeforeLeave() {
    loading.value = true;
  }
  function handleAfterEnter() {
    loading.value = false;
  }
</script>
<style lang="less" scoped>
  .h-full {
    height: 100%;
    overflow: auto;
  }
</style>
