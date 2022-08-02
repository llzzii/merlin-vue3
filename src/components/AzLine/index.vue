<template>
  <div class="tl-container">
    <ul class="tl-ul" ref="categoryline" @click="setCategory()">
      <li class="tl-li" v-for="item in categoryList" :key="item">
        <div>{{ item }}</div>
      </li>
    </ul>
    <div class="current-li" :style="{ top: currentTop + uiOffset + 'px' }">
      <span>{{ currentCategory }}</span>
    </div>
    <div
      class="current-li hover"
      :style="{ top: hoverTop + uiOffset + 'px' }"
      @click="setCategory()"
    >
      <span>{{ hoverCategory }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { nextTick, onMounted, reactive, ref, unref, watch } from 'vue';
  import { useMouseInElement } from '@vueuse/core';
  import _ from 'lodash';
  import { categoryList } from './constant';

  const props = withDefaults(
    defineProps<{
      scrollCategory?: any;
      activeKey?: string;
    }>(),
    {
      scrollCategory: '',
      activeKey: '',
    },
  );
  const categoryline = ref<HTMLElement | null>(null);
  const emits = defineEmits(['changeValue']);
  const mouse = reactive(useMouseInElement(categoryline));
  const hoverTop = ref(0);
  const uiOffset = 8;
  const currentTop = ref(0);

  const currentCategory = ref('C');
  const hoverCategory = ref('');

  let categorySlide = ref(12);

  const handelHoverCategory = () => {
    let m = _.floor(hoverTop.value / categorySlide.value);
    // console.log(
    //   "🚀 ~ file: time-line.vue ~ line 44 ~ handelCurrentTime ~ m",

    //   hoverTop.value
    // );
    hoverCategory.value = categoryList[m];
  };

  const handlerTopByCategory = (curCategory) => {
    let d = categoryList.findIndex((o) => o == curCategory);
    // console.log(
    //   "🚀 ~ file: time-line.vue ~ line 67 ~ handlerTopByTime ~ d",
    //   d,
    //   curCategory,
    //   categorySlide.value,
    //   _.round(d * categorySlide.value, 4)
    // );
    return _.round(d * categorySlide.value, 4);
  };

  watch(
    () => mouse,
    (n) => {
      if (
        n &&
        !n.isOutside &&
        mouse.elementY > 0 &&
        categoryline.value &&
        mouse.elementY < categoryline.value?.clientHeight
      ) {
        hoverTop.value = mouse.elementY;
        handelHoverCategory();
      }
    },
    {
      deep: true,
    },
  );

  watch(
    () => props.scrollCategory,
    (n) => {
      if (!n || n == '') {
        return;
      }
      console.log('🚀 ~ file: time-line.vue ~ line 78 ~ n', unref(n));

      currentCategory.value = unref(props.scrollCategory);

      currentTop.value = handlerTopByCategory(unref(currentCategory));
    },
    {
      immediate: true,
    },
  );
  watch(
    () => props.activeKey,
    async (n) => {
      if (!n || n != 'projectCategory') {
        return;
      }
      await nextTick();
      if (categoryline.value) {
        categorySlide.value = _.round(categoryline.value?.clientHeight / categoryList.length, 4);
        currentTop.value = handlerTopByCategory(unref(currentCategory));
        console.log(
          '🚀 ~ file: time-line.vue ~ line 45 ~ nextTick ~ offsetTop.value',
          categoryline.value?.clientHeight,
          categorySlide.value,
          categoryline.value,
        );
      }

      currentCategory.value = props.scrollCategory;

      currentTop.value = handlerTopByCategory(unref(currentCategory));
    },
    {
      immediate: true,
    },
  );

  const setCategory = () => {
    currentTop.value = hoverTop.value;
    currentCategory.value = hoverCategory.value;
    emits('changeValue', currentCategory.value);
  };

  onMounted(() => {
    nextTick(() => {
      if (categoryline.value) {
        categorySlide.value = _.round(categoryline.value?.clientHeight / categoryList.length, 4);
        currentTop.value = handlerTopByCategory(unref(currentCategory));
        // console.log(
        //   "🚀 ~ file: time-line.vue ~ line 45 ~ nextTick ~ offsetTop.value",
        //   categoryline.value?.clientHeight,
        //   categorySlide.value
        // );
      }
    });
  });
</script>

<style lang="less" scoped>
  .tl-ul {
    height: calc(~'100% - 52px');
    display: flex;
    flex-direction: column;
    list-style: none;
    border-right: 2px solid #f0f0f0;
    margin: 20px 0;
    padding: 0;
    cursor: row-resize;
    .tl-li {
      flex: 1;
      // align-items: center;
      display: flex;
      position: relative;
      div {
        margin-top: -8px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.45);
        width: 100%;
        text-align: right;
        padding-right: 15px;
      }

      div:after {
        content: '';
        width: 6px;
        height: 2px;
        background-color: #dcdfe6;
        display: inline-block;
        position: absolute;
        top: 0;
        margin-left: 6px;
        right: 0;
      }
    }
  }
  .current-li {
    position: absolute;
    top: 74px;
    right: 15px;
    background: #2f7bff;
    color: #fff;
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 14px;
    span:after {
      content: '';
      width: 0;
      height: 0;
      border: 6px solid transparent;
      border-left-color: #2f7bff;

      display: inline-block;
      position: absolute;
      top: 7px;
      right: -12px;
    }
  }
  .current-li:after {
    content: '';
    width: 8px;
    height: 8px;
    border: 2px solid #2f7bff;
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    top: 9px;
    right: -18px;
    background-color: #fff;
  }
  .hover {
    top: 174px;
    cursor: row-resize;

    display: none;
  }
  .tl-container:hover .hover {
    display: block;
  }
</style>
