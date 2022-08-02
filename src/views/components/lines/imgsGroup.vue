<template>
  <div class="imgs-group" ref="root">
    <div class="date-title">
      <a-checkbox v-model:checked="allChecked" @change="allCheckBoxChange">{{ title }}</a-checkbox>
    </div>
    <ul class="img-list" ref="imgList">
      <li v-for="list in imagesList" class="img-list-item" :key="list">
        <a-popover
          trigger="contextmenu"
          arrowPointAtCenter
          :align="{ offset: [0, 70] }"
          overlayClassName="img-popover"
          v-model:visible="list.popoverVisible"
          @visibleChange="popoverChange($event, list)"
        >
          <img
            :src="imgsLoad"
            class="img"
            :data-src="'https://source.unsplash.com/random/200x200/'"
            alt=""
            :ref="imgRefs.set"
          />
          <!-- <div>
            <img :src="imgs" />
          </div> -->
          <template #content>
            <ul class="img-popover-menu">
              <li @click="showBig(list)">打开</li>
              <li>下载</li>
              <li>删除</li>
              <li @click="copyImg(list)">复制</li>
              <li>移动</li>
            </ul>
          </template>
        </a-popover>
        <div class="img-action" :class="{ active: list?.checked }">
          <a-checkbox v-model:checked="list.checked" @change="checkBoxChange(list)" />
          <a-dropdown overlayClassName="dr-actions">
            <ellipsis-outlined class="more-action" />
            <template #overlay>
              <a-menu>
                <a-menu-item> 下载 </a-menu-item>
                <a-menu-item> 删除 </a-menu-item>
                <a-menu-item> 复制 </a-menu-item>
                <a-menu-item> 移动 </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import { watch, onMounted, reactive, ref, nextTick } from 'vue';
  import imgsLoad from '@/assets/img/img_load.png';
  import { EllipsisOutlined } from '@ant-design/icons-vue';
  import { useIntersectionObserver, useTemplateRefsList } from '@vueuse/core';
  const props = withDefaults(
    defineProps<{
      index?: number;
      title?: string;
      imgs?: any;
    }>(),
    {
      index: 0,
      title: '2021-04-05',
      imgs: [
        { label: 'Apple', value: 'Apple', checked: false },
        { label: 'Pear', value: 'Pear', checked: false },
        { label: 'Orange', value: 'Orange', checked: false },
        { label: 'Apple', value: 'Apple', checked: false },
        { label: 'Pear', value: 'Pear', checked: false },
        { label: 'Orange', value: 'Orange', checked: false },
        { label: 'Apple', value: 'Apple', checked: false },
        { label: 'Pear', value: 'Pear', checked: false },
        { label: 'Orange', value: 'Orange', checked: false },
      ],
    },
  );
  const emits = defineEmits(['groupCheckBoxChange']);
  const imgList = ref<HTMLDivElement>();
  const root = ref<HTMLDivElement>();
  const imgRefs = useTemplateRefsList<HTMLDivElement>();

  let currentImg = reactive({});

  const allChecked = ref(false);
  const popoverVisible = ref(false);
  const checkedList: any = ref([]);
  let imagesList: any = reactive([]);

  const popoverChange = (e, data) => {
    if (e) {
      currentImg = data;
    } else {
      currentImg = reactive({});
    }
  };

  const showBig = (data) => {
    (imgList.value as any).$viewer.show({
      options: {
        toolbar: true,
        url: 'data-source',
        initialViewIndex: 1,
      },
      images: imgs,
    });
    data.popoverVisible = false;
  };

  const checkBoxChange = (data) => {
    if (data.checked) {
      checkedList.value.push(data);
    } else {
      checkedList.value.splice(
        checkedList.value.findIndex((x) => x.value === data.value),
        1,
      );
    }
    if (checkedList.value.length === imagesList.length) {
      allChecked.value = true;
    } else {
      allChecked.value = false;
    }
    emits('groupCheckBoxChange', {
      title: props.title,
      checkData: checkedList.value,
    });
  };
  const allCheckBoxChange = (e) => {
    if (allChecked.value) {
      imagesList.map((o) => (o.checked = true));
      checkedList.value = [...imagesList];
    } else {
      imagesList.map((o) => (o.checked = false));
      checkedList.value = [];
    }
    emits('groupCheckBoxChange', {
      title: props.title,
      checkData: checkedList.value,
    });
  };
  const copyImg = (data) => {
    // handleCopyImg(imgs);
  };

  onMounted(() => {
    props.imgs.map((o, i) => {
      if (i > props.index) {
        return false;
      }
      imagesList.push({
        ...o,
        checked: false,
      });
    });
    nextTick(() => {
      useIntersectionObserver(
        imgList.value,
        ([{ isIntersecting }]) => {
          // const images = document.querySelectorAll(".img");
          console.log('🚀 ~ file: imgs-group.vue ~ line 163 ~ nextTick ~ images', [
            ...imgRefs.value,
          ]);
          [...imgRefs.value].forEach((entry, index) => {
            console.log(
              '🚀 ~ file: imgs-group.vue ~ line 160 ~ images.forEach ~ isIntersecting',
              isIntersecting,
            );
            if (isIntersecting) {
              if (entry['dataset']['src'] == '') {
                return;
              }
              // entry["src"] = entry["dataset"]["src"];
              entry['dataset']['src'] = '';
              entry['src'] = 'https://www.dmoe.cc/random.php?t=' + index + new Date().getTime();
            }
          });
        },
        {},
      );
    });
  });
</script>

<style lang="less" scoped>
  /deep/.ant-checkbox-wrapper {
    width: auto;
  }
  .imgs-group {
    padding-bottom: 5px;
  }
  .img-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    margin-right: 80px;
    flex-wrap: wrap;
    padding-left: 20px;
    justify-content: flex-start;
    li {
      position: relative;
      padding-right: 10px;
      padding-top: 10px;
      img {
        width: 144px;
        height: 144px;
      }
      .img-action {
        position: absolute;
        display: none;
        z-index: 10;
        top: 15px;
        width: 100%;
        padding: 0 20px 0 10px;
        justify-content: space-between;
        align-items: center;
        .more-action {
          width: 26px;
          height: 16px;
          background: #ffffff;
          border-radius: 2px;
        }
      }
      .active {
        display: flex;
      }
    }
  }
  .img-list-item:hover .img-action {
    display: flex;
  }
  .more-action {
    padding: 0;
  }
  /deep/.dr-actions {
    min-width: 70px !important;
    .ant-dropdown-menu-title-content {
      text-align: center;
    }
  }
</style>

<style lang="less">
  .img-popover {
    margin-top: -78px;
    .img-popover-menu {
      border: none;
      list-style: none;
      margin: 0;
      padding: 0;
      width: 80px;
      text-align: center;
      li {
        height: 30px;
        line-height: 30px;
        padding: 0;
        cursor: pointer;
      }
      li:hover {
        background-color: #eff5ff;
        color: #2f7bff;
      }
    }
    .ant-popover-inner-content {
      padding: 0;
    }
  }
</style>
