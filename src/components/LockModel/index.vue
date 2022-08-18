<template>
  <a-modal
    v-model:visible="visible"
    width="100%"
    :destroyOnClose="true"
    wrap-class-name="full-modal"
    :footer="null"
    :title="null"
    :closable="false"
  >
    <swiper
      :modules="modules"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
      @click="close"
      class="h100"
    >
      <swiper-slide>
        <img :src="b1" alt="" class="swiper-image" />
      </swiper-slide>
      <swiper-slide>
        <img :src="b2" alt="" class="swiper-image" />
      </swiper-slide>
      <swiper-slide>
        <img :src="b3" alt="" class="swiper-image" />
      </swiper-slide>
      <swiper-slide>
        <img :src="b4" alt="" class="swiper-image" />
      </swiper-slide>
      <swiper-slide>
        <img :src="b5" alt="" class="swiper-image" />
      </swiper-slide>
    </swiper>
    <div class="time-container">
      <div class="time">{{ time }}</div>
      <div class="date">{{
        moment().format('YYYY-MM-DD') + '  星期' + '日一二三四五六'[moment().day()]
      }}</div>
    </div>
  </a-modal>
</template>
<script lang="ts" setup>
  import { useUserStore } from '@/stores/modules/user';
  import { ref } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Autoplay, Pagination } from 'swiper';
  import 'swiper/css/bundle';
  import { onBeforeRouteLeave } from 'vue-router';
  import b1 from '@/assets/banner/ban1.jpg';
  import b2 from '@/assets/banner/ban2.jpg';
  import b3 from '@/assets/banner/ban3.jpg';
  import b4 from '@/assets/banner/ban4.jpg';
  import b5 from '@/assets/banner/ban5.jpg';
  import moment from 'moment';
  const userStore = useUserStore();
  const visible = ref(true);
  const modules = [Autoplay, Pagination];
  const close = () => {
    visible.value = false;
    userStore.setLockStatus(false);
  };
  const time = ref(moment().format('hh:mm'));
  onBeforeRouteLeave((to, from, next) => {
    console.log(to, from, next, 11111111111);
  });
</script>
<style lang="less">
  .full-modal {
    .ant-modal {
      max-width: 100%;
      top: 0;
      padding-bottom: 0;
      margin: 0;
    }
    .ant-modal-content {
      display: flex;
      flex-direction: column;
      height: calc(100vh);
    }
    .ant-modal-body {
      flex: 1;
      height: 100%;
      overflow: hidden;
      padding: 0;
    }
  }
</style>

<style lang="less" scoped>
  .swiper-image {
    width: 100%;
    height: 100%;
  }
  .h100 {
    height: 100%;
  }
  .time-container {
    position: fixed;
    z-index: 1000;
    color: #fff;
    padding: 50px;
    bottom: 20px;
    .time {
      font-size: 100px;
    }
    .date {
      font-size: 60px;
    }
  }
</style>
