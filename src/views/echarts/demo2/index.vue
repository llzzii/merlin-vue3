<template>
  <div class="container" :style="style">
    <div class="header">
      <div class="mh-left"></div>
      <div class="mh-middle">大屏Demo</div>
      <div class="mh-right">
        <BBox1
          style="
            width: 120px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            margin-left: 200px;
          "
        >
          查看详情
        </BBox1>
      </div>
    </div>
    <BBox2 class="main-container" :border-width="200" :border-height="250" />
  </div>
</template>
<script lang="ts" setup>
  import { CSSProperties, reactive, nextTick } from 'vue';
  import { BBox2, BBox1 } from '@/components';

  const style = reactive<CSSProperties>({
    width: '100%',
    height: '100%',
  });
  nextTick(() => {});
</script>

<style lang="less" scoped>
  .container {
    background-image: url('@/assets/img/bg.110420cf.png');
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
    color: white;
    .header {
      height: 80px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;

      .mh-left {
        font-size: 20px;
        color: rgb(1, 134, 187);

        a:visited {
          color: rgb(1, 134, 187);
        }
      }

      .mh-middle {
        font-size: 30px;
      }

      .mh-left,
      .mh-right {
        width: 450px;
      }
    }
    .main-container {
      height: calc(~'100% - 100px');
      width: calc(~'100% - 10px');

      .border-box-content {
        padding: 20px;
        box-sizing: border-box;
        display: flex;
      }
    }
  }
</style>
