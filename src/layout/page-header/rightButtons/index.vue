<template>
  <a-space class="header-r-buttons">
    <a class="h-btn" href="https://github.com/llzzii/merlin-vue3-template" target="_blank">
      <i class="iconfont icon-github-fill"></i>
    </a>
    <a class="h-btn">
      <i class="iconfont icon-quanping"></i>
    </a>
    <a class="h-btn">
      <i class="iconfont icon-tongzhi"></i>
    </a>
    <a class="h-btn">
      <i class="iconfont icon-zhuti_o"></i>
    </a>
    <a class="h-btn">
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
<style lang="less" scoped>
  .header-r-buttons {
    .h-btn {
      display: flex;
      padding: 0 3px;
      color: rgb(51, 54, 57);
      &:hover {
        background-color: rgb(246, 246, 246);
      }
    }

    i {
      font-size: 20px;
    }
    .icon-avatar {
      margin-top: 5px;
    }
  }
</style>
