<template>
  <div class="logo">
    <img class="logo__img" src="@/assets/img/logo.png" />
    <div style="margin-left: 8px; width: 127px" v-if="!collapsed">
      <h1 class="logo__title">Merlin</h1>
    </div>
  </div>
</template>
<script lang="ts" setup name="Logo">
  const { collapsed } = defineProps(['collapsed']);
  console.log(collapsed);
</script>
<script lang="ts">
  export default {
    name: 'Logo',
  };
</script>

<style lang="less" scoped>
  .logo {
    display: flex;
    flex-shrink: 0;
    height: 48px;
    padding: 10px 4px 10px 25px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease;
    &__img {
      width: 36px;
      height: 36px;
    }

    &__title {
      font-size: 16px;
      font-weight: 700;
      transition: all 0.5s;
      line-height: normal;
      color: #fff;
    }
  }
</style>
