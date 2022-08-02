<template>
  <div class="tl-container">
    <ul class="tl-ul" ref="timeline" @click="setTime()">
      <li class="tl-li" v-for="item in timeList" :key="item">
        <div>{{ item }}</div>
      </li>
    </ul>
    <div class="current-li" :style="{ top: currentTop + uiOffset + 'px' }">
      <span>{{ currentTime }}</span>
    </div>
    <div class="current-li hover" :style="{ top: hoverTop + uiOffset + 'px' }" @click="setTime()">
      <span>{{ hoverTime }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import moment from 'moment';
  import { nextTick, onMounted, reactive, ref, unref, watch } from 'vue';
  import { useMouseInElement, useIntersectionObserver } from '@vueuse/core';
  import _ from 'lodash';

  const props = withDefaults(
    defineProps<{
      startTime?: string;
      endTime?: string;
      scrollTime?: any;
      activeKey?: string;
    }>(),
    {
      startTime: moment().format('YYYY-MM-DD'),
      endTime: moment().format('YYYY-MM-DD'),
      scrollTime: '',
      activeKey: '',
    },
  );
  const timeline = ref<HTMLElement | null>(null);
  const emits = defineEmits(['changeValue']);
  const mouse = reactive(useMouseInElement(timeline));
  const hoverTop = ref(0);
  const uiOffset = 8;
  const currentTop = ref(0);

  const currentTime = ref(moment().format('YYYY.MM'));
  const hoverTime = ref(moment().format('YYYY.MM'));
  const timeList = ref<Array<number>>([]);
  let allMonths = ref(12);
  let monthsSlide = ref(12);

  // 根据开始时间和结束时间确定时间轴的长度
  const handlerTimeList = () => {
    let l = moment(props.endTime).year() - moment(props.startTime).year();
    allMonths.value = l * 12 + 12;
    for (let i = 0; i <= l; i++) {
      timeList.value.unshift(moment(props.startTime).year() + i);
    }
  };

  // 根据鼠标距离顶部位置确定hover时显示的时间
  const handelHoverTime = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    let m = _.round((hoverTop.value / timeline.value?.clientHeight!) * allMonths.value, 4);
    hoverTime.value = moment(moment(unref(props.endTime)).format('YYYY-01-01'))
      .add(1, 'years')
      .subtract(m, 'months')
      .format('YYYY.MM');
  };

  // 根据传入的时间确定位置
  const handlerTopByTime = (curtime) => {
    let d = moment(moment(unref(props.endTime)).format('YYYY-01-01'))
      .add(1, 'years')
      .diff(moment(curtime), 'months');

    return _.round(d * monthsSlide.value, 4);
  };

  // 鼠标移动事件
  watch(
    () => mouse,
    (n) => {
      if (n && !n.isOutside) {
        hoverTop.value = mouse.elementY;
        handelHoverTime();
      }
    },
    {
      deep: true,
    },
  );

  // 外部时间改变时，改变位置
  watch(
    () => props.scrollTime,
    (n) => {
      if (!n || n == '') {
        return;
      }

      currentTime.value = moment(props.scrollTime).format('YYYY.MM');

      currentTop.value = handlerTopByTime(unref(currentTime));
    },
    {
      immediate: true,
    },
  );

  // 点击时间事件
  const setTime = () => {
    currentTop.value = hoverTop.value;
    currentTime.value = hoverTime.value;
    emits('changeValue', currentTime.value);
  };

  onMounted(() => {
    handlerTimeList();

    nextTick(() => {
      useIntersectionObserver(
        timeline.value,
        ([{ isIntersecting }]) => {
          if (isIntersecting && timeline.value) {
            monthsSlide.value = _.round(timeline.value?.clientHeight / allMonths.value, 4);
            currentTime.value = moment(props.scrollTime).format('YYYY.MM');
            currentTop.value = handlerTopByTime(unref(currentTime));
          }
        },
        {},
      );
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
        margin-bottom: -8px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.45);
        width: 100%;
        text-align: right;
        padding-right: 15px;
        align-self: flex-end;
      }

      div:after {
        content: '';
        width: 6px;
        height: 2px;
        background-color: #dcdfe6;
        display: inline-block;
        position: absolute;
        bottom: 0;
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
