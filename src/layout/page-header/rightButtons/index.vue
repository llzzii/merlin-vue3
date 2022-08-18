<template>
  <a-space class="header-r-buttons">
    <a class="h-btn" href="https://github.com/llzzii/merlin-vue3-template" target="_blank">
      <i class="iconfont icon-github-fill"></i>
    </a>
    <a class="h-btn" @click="changeFullScreen">
      <i
        class="iconfont"
        :class="{ 'icon-fullscreen-expand': !isFULL, 'icon-fullscreen-shrink': isFULL }"
      ></i>
    </a>
    <a class="h-btn" @click="notificationShow">
      <a-badge :count="notificationCount">
        <i class="iconfont icon-tongzhi"></i>
      </a-badge>
    </a>
    <a class="h-btn">
      <i class="iconfont icon-zhuti_o"></i>
    </a>
    <a class="h-btn" @click="lockScreen">
      <i class="iconfont icon-suoping"></i>
    </a>
    <a class="h-btn">
      <i class="iconfont icon-xitong"></i>
    </a>

    <a-dropdown :trigger="['click']" class="h-btn">
      <a class="ant-dropdown-link" @click.prevent>
        <a-avatar class="icon-avatar" src="https://joeschmoe.io/api/v1/random" />
        Merlin
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item key="0"> 系统配置 </a-menu-item>
          <a-menu-item key="1"> 个人中心 </a-menu-item>
          <a-menu-item key="3">退出登录</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </a-space>
</template>

<script lang="ts" setup>
  import { useDesktopMsg } from '@/hooks/useDesktopMsg';
  import { enterFullscreen, exitFullscreen, isFullscreen } from '@/utils/fullscreen';
  import { ref } from 'vue';
  import tzImg from '@/assets/img/tz.gif';
  import { useUserStore } from '@/stores/modules/user';

  const isFULL = ref(isFullscreen());
  const notificationCount = ref(10);
  const userStore = useUserStore();
  const changeFullScreen = () => {
    if (isFULL.value) {
      exitFullscreen();
      isFULL.value = false;
    } else {
      enterFullscreen();
      isFULL.value = true;
    }
  };

  const notificationShow = () => {
    const option = {
      title: '通知',
      body: '起来跳个舞吧',
      icon: tzImg,
      cb: () => {
        notificationCount.value--;
      },
    };

    let n = useDesktopMsg(option as any);
    if (n) {
      n.onerror = (e) => {
        console.log(e);
      };
    }
  };
  const lockScreen = () => {
    userStore.setLockStatus(true);
    console.log('🚀 ~ file: index.vue ~ line 82 ~ lockScreen ~ userStore', userStore.getLockStatus);
  };
</script>
<style lang="less" scoped>
  .header-r-buttons {
    .h-btn {
      display: flex;
      padding: 0 3px;
      color: rgb(51, 54, 57);
      height: 48px;
      align-items: center;
      &:hover {
        background-color: rgb(246, 246, 246);
      }
    }

    i {
      font-size: 20px;
    }
    .icon-avatar {
      margin-top: -3px;
    }
  }
</style>
