<template>
  <div class="timeLine-container">
    <div class="left-list">
      <div class="img-list" ref="rootTimeDiv">
        <div v-for="(item, index) in imgs" :id="item" :key="item" :ref="elRefs.set">
          <ImgsGroup :title="item" :index="index" @groupCheckBoxChange="groupTimeCheckBoxChange" />
        </div>
      </div>
      <TimeLine
        class="fixed-right"
        @changeValue="changeTimeValue"
        :scrollTime="currentTime"
        :endTime="imgs[0]"
        :startTime="imgs[imgs.length - 1]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import _ from 'lodash';
  import { TimeLine } from '@/components';
  import ImgsGroup from './imgsGroup.vue';
  import moment from 'moment';
  import { useTemplateRefsList } from '@vueuse/core';
  import { useIntersectionObserver, useElementVisibility } from '@vueuse/core';
  const elRefs = useTemplateRefsList<HTMLDivElement>();

  const rootTimeDiv = ref<HTMLDivElement | null>(null);
  let currentTime = ref('');
  let currentId = ref('');
  let elRefStatus: any = ref([]);
  let checkedTimeImgsMap = new Map();
  let checkedTimeImgsData = ref<any>([]);
  const imgs = [
    '2022-11-01',
    '2022-09-01',
    '2022-04-01',
    '2022-01-01',
    '2021-11-01',
    '2021-01-01',
    '2020-01-01',
    '2019-11-01',
    '2019-01-01',
    '2018-01-01',
    '2017-01-01',
    '2016-11-01',
    '2016-01-01',
    '2015-10-01',
  ];

  // 点击时间时滚动到指定位置，如果没有对应时间则滚动到期上一个月
  const changeTimeValue = (data) => {
    let jumpTime = moment(data).format('YYYY-MM-DD');
    while (!imgs.includes(jumpTime) && !moment(jumpTime).isBefore(imgs[imgs.length - 1])) {
      jumpTime = moment(jumpTime).subtract(1, 'months').format('YYYY-MM-DD');
    }
    document.getElementById(jumpTime)?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  // 选择框选择事件
  const groupTimeCheckBoxChange = ({ title, checkData }) => {
    checkedTimeImgsMap.set(title, checkData);
    let res: any = [];
    checkedTimeImgsMap.forEach(function (item, key, mapObj) {
      res.push(...item);
    });
    checkedTimeImgsData.value = res;
  };

  const handleCurrentTime = () => {
    currentTime.value = currentId.value;
  };

  const calcBool = (arr, value) => {
    let indexArr: any = [];
    for (let i = 0; i < arr.length; i++) {
      arr[i] === value && indexArr.push(i);
    }
    return indexArr;
  };

  // 滚动时处理当前显示时间事件
  watch(
    elRefs,
    async () => {
      [...elRefs.value].map((el, index) => {
        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            elRefStatus.value[index] = isIntersecting;
            let a = calcBool(elRefStatus.value, true);
            if (a.length > 0) {
              currentId.value = [...elRefs.value][a[0]].id;
              handleCurrentTime();
            }
          },
          { root: rootTimeDiv, threshold: 0.8 },
        );
      });
    },
    {
      deep: true,
      flush: 'post',
    },
  );
</script>
<style lang="less" scoped>
  .mrl16 {
    margin-left: 16px;
    margin-right: 16px;
    height: 100%;
  }
  .timeLine-container {
    display: flex;
    height: calc(~'100% - 65px');
    background-color: #fff;

    .left-list {
      flex: 1;
      height: 100%;
      position: relative;
      border: 1px solid #ebebeb;
      padding: 16px 0px 0 16px;
    }
    .right-detail {
      border-left: 1px solid red;
      width: 299px;
    }
    .img-list::-webkit-scrollbar {
      width: 6px;
      height: 8px;
    }

    // ::-webkit-scrollbar-track {
    //   background: transparent;
    // }

    .img-list::-webkit-scrollbar-track {
      background-color: transparent;
    }

    .img-list::-webkit-scrollbar-thumb {
      // background: rgba(0, 0, 0, 0.6);
      background-color: rgb(144 147 153 / 30%);
      border-radius: 2px;
      box-shadow: inset 0 0 6px rgb(0 0 0 / 20%);
    }

    .img-list::-webkit-scrollbar-thumb:hover {
      background-color: #cbcbcb;
    }
  }
  .fixed-right {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 5px;
    width: 70px;
  }
  .img-list {
    height: 100%;
    overflow: auto;
  }
</style>
