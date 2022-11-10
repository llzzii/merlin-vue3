<template>
  <!-- <RouterView>
    <template #default="{ Component, route }">
      <keep-alive>
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </template>
  </RouterView> v-loading="loading" -->
  <div class="h-full ease-in-out"  v-loading="loading">
    <router-view v-slot="{ Component, route }">
      <transition
        v-if="!route.meta.hideTab"
        name="fade-slide"
        mode="out-in"
        :appear="true"
        @before-leave="handleBeforeLeave"
        @before-enter="onBeforeEnter"
        @after-enter="handleAfterEnter"
        @enter="onEnter"
        @enter-cancelled="onEnterCancelled"
        @after-leave="onAfterLeave"
        @leave-cancelled="onLeaveCancelled"
      >
      <!-- @leave="onLeave" :include="getCaches" 
      keep-alive属性“include，exclude”的使用:
       注意：使用include，exclude 属性需要给所有vue类的name赋值，否则 include，exclude将不生效
      -->

        <keep-alive >
          <component :is="Component" :key="route.name"  />
        </keep-alive>
        

      </transition>
      <component :is="Component" :key="route.name" v-if="route.meta.hideTab" />
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
    console.log("🚀 ~ file: index.vue ~ line 47 ~ getCaches ~  menuStore.getCachedTabList",  menuStore.getCachedTabList)
    return menuStore.getCachedTabList;

  });
  const handleBeforeLeave=() =>{
    console.log('🚀 ~ file: index.vue ~ line 43 ~ handleBeforeLeave ~ loading', loading, getCaches);
  }
  // 当进入过渡完成时调用。
  const handleAfterEnter=()=> {
    loading.value = false;

    console.log('🚀 ~ file: index.vue ~ line 47 ~ handleAfterEnter ~ loading', loading, getCaches);
  }
  // 在元素被插入到 DOM 之后的下一帧被调用
  // 用这个来开始进入动画
  const onEnter=(el, done)=> {
    // 调用回调函数 done 表示过渡结束
    // 如果与 CSS 结合使用，则这个回调是可选参数
    done();

  }
  // 在元素被插入到 DOM 之前被调用
  // 用这个来设置元素的 "enter-from" 状态
  const onBeforeEnter=(el)=> {
    loading.value = true;
  }
  // 当进入过渡完成时调用。
  const onEnterCancelled=(el)=> {}

  // 在离开过渡开始时调用
  // 用这个来开始离开动画
  const onLeave=(el, done)=> {
    // 调用回调函数 done 表示过渡结束
    // 如果与 CSS 结合使用，则这个回调是可选参数
    done();
  }

  // 在离开过渡完成、
  // 且元素已从 DOM 中移除时调用
  const onAfterLeave=(el)=> {}

  // 仅在 v-show 过渡中可用
  const onLeaveCancelled=(el)=> {}
</script>
<style lang="less" scoped>
  .h-full {
    height: 100%;
    overflow: auto;
  }
  .fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.5s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
}
</style>
