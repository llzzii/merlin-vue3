<template>
  <div class="mrl16">
    <div class="timeLine-container">
      <div class="left-list">
        <div class="img-list" ref="rootCateDiv">
          <div v-for="(item, index) in projects" :id="item" :key="item" :ref="elCateRefs.set">
            <ImgsGroup :title="item" :index="index" @groupCheckBoxChange="groupCategoryChange" />
          </div>
        </div>
        <AzLine
          class="fixed-right"
          @changeValue="changeCategoryValue"
          :scrollCategory="currentCateId"
          :activeKey="activeKey"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import _ from 'lodash';
  import { AzLine } from '@/components';
  import ImgsGroup from './imgsGroup.vue';
  import moment from 'moment';
  import { useTemplateRefsList } from '@vueuse/core';
  import { useIntersectionObserver, useElementVisibility } from '@vueuse/core';
  import { categoryList } from '@/components/AzLine/constant';
  const elRefs = useTemplateRefsList<HTMLDivElement>();
  const elCateRefs = useTemplateRefsList<HTMLDivElement>();

  const rootTimeDiv = ref<HTMLDivElement | null>(null);
  const rootCateDiv = ref<HTMLDivElement | null>(null);
  let currentTime = ref('');
  let currentId = ref('');
  let currentCate = ref('');
  let currentCateId = ref('');
  let elRefStatus: any = ref([]);
  let elCatreRefStatus: any = ref([]);
  let checkedTimeImgsMap = new Map();
  let checkedTimeImgsData = ref<any>([]);
  let checkedCategoryImgsMap = new Map();
  let checkedCategoryImgsData = ref<any>([]);
  const activeKey=ref('timeLine')
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
  const projects = ['A', 'B', 'F', 'H', 'I', 'J', 'N', 'O', 'P', 'Q', 'S', 'W', 'Z', '其他'];
  const changeTimeValue = (data) => {
    let jumpTime = moment(data).format('YYYY-MM-DD');
    while (!imgs.includes(jumpTime) && !moment(jumpTime).isBefore(imgs[imgs.length - 1])) {
      jumpTime = moment(jumpTime).subtract(1, 'months').format('YYYY-MM-DD');
      console.log(
        '🚀 ~ file: index.vue ~ line 39 ~ changeValue ~ data',
        jumpTime,
        imgs.includes(jumpTime),
      );
    }
    document.getElementById(jumpTime)?.scrollIntoView({
      behavior: 'smooth',
    });
  };
  const changeCategoryValue = (data) => {
    let index = categoryList.findIndex((c) => c === data);
    let jumpProject = data;
    while (!projects.includes(jumpProject) && index > -1) {
      jumpProject = categoryList[index - 1];
      index--;
      console.log(
        '🚀 ~ file: index.vue ~ line 125 ~ changeCategoryValue ~ jumpProject',
        jumpProject,
        index,
        projects.includes(jumpProject),
        !projects.includes(jumpProject) && index > 0,
      );
    }
    console.log(
      '🚀 ~ file: index.vue ~ line 109 ~ changeCategoryValue ~ jumpProject',
      jumpProject,
      index,
    );
    document.getElementById(jumpProject)?.scrollIntoView({
      behavior: 'smooth',
    });
  };
  const groupTimeCheckBoxChange = ({ title, checkData }) => {
    checkedTimeImgsMap.set(title, checkData);
    let res: any = [];
    checkedTimeImgsMap.forEach(function (item, key, mapObj) {
      res.push(...item);
    });
    checkedTimeImgsData.value = res;
    console.log('🚀 ~ file: index.vue ~ line 88 ~ checkedTimeImgsData', checkedTimeImgsData);
  };

  const groupCategoryChange = ({ title, checkData }) => {
    checkedCategoryImgsMap.set(title, checkData);
    let res: any = [];
    checkedCategoryImgsMap.forEach(function (item, key, mapObj) {
      res.push(...item);
    });
    checkedCategoryImgsData.value = res;
    console.log(
      '🚀 ~ file: index.vue ~ line 88 ~ checkedCategoryImgsData',
      checkedCategoryImgsData,
    );
  };

  const handleCurrentTime = () => {
    currentTime.value = currentId.value;
    console.log(
      '🚀 ~ file: index.vue ~ line 67 ~ handleCurrentTime ~ currentTime.value',
      currentTime.value,
    );
  };

  const calcBool = (arr, value) => {
    let indexArr: any = [];
    for (let i = 0; i < arr.length; i++) {
      arr[i] === value && indexArr.push(i);
    }
    return indexArr;
  };

  watch(
    elRefs,
    async () => {
      if (activeKey.value !== 'timeLine') {
        return;
      }
      [...elRefs.value].map((el, index) => {
        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            // console.log("🚀 ~ file: index.vue ~ line 159 ~ elRefStatus", elRefStatus);
            elRefStatus.value[index] = isIntersecting;
            let a = calcBool(elRefStatus.value, true);
            if (a.length > 0) {
              currentId.value = [...elRefs.value][a[0]].id;
              // _.debounce(handleCurrentTime, 100);
              handleCurrentTime();
              // stop();
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

  watch(
    elCateRefs,
    async () => {
      if (activeKey.value !== 'projectCategory') {
        return;
      }
      [...elCateRefs.value].map((el, index) => {
        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            elCatreRefStatus.value[index] = isIntersecting;
            let a = calcBool(elCatreRefStatus.value, true);
            if (a.length > 0) {
              currentCateId.value = [...elCateRefs.value][a[0]].id;
              // _.debounce(handleCurrentTime, 100);
              // handleCurrentTime();
              // stop();
            }
          },
          { root: rootCateDiv, threshold: 0.8 },
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
