<template>
  <div class="container">
    <a-alert message="DataV(装饰) 的Vue3版本，原文地址：http://datav.jiaminghi.com/" type="info" />
    <a-divider orientation="left">装饰demo</a-divider>
    <div class="decoration-container">
      <Decoration1 class="decoration" style="width: 200px; height: 50px">装饰1</Decoration1>
      <Decoration2 class="decoration">装饰2</Decoration2>
      <Decoration2 class="decoration" :reverse="true">装饰2</Decoration2>
      <Decoration3 class="decoration" style="width: 200px; height: 50px">装饰3</Decoration3>
      <Decoration4 class="decoration">装饰4</Decoration4>
      <Decoration4 class="decoration" :reverse="true">装饰4</Decoration4>
      <Decoration5 class="decoration" style="width: 300px; height: 40px">装饰5</Decoration5>
      <Decoration6 class="decoration" style="width: 300px; height: 30px">装饰6</Decoration6>
      <Decoration7 class="decoration">装饰7</Decoration7>
      <Decoration8 class="decoration">装饰8</Decoration8>
      <Decoration9 class="decoration">装饰9</Decoration9>
      <Decoration10 class="decoration" style="width: 200px; height: 60px">装饰10</Decoration10>
      <Decoration11 class="decoration" style="width: 150px; height: 150px">装饰11</Decoration11>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Decoration1 } from '@/components';
</script>
<style lang="less" scoped>
  .container {
    margin: 10px;
    background-color: #fff;
    padding: 10px;
  }
  .decoration-container {
    display: grid;
    grid-template-columns: repeat(3, 30%);
    grid-row-gap: 20px;
    grid-column-gap: 20px;
    justify-items: center;
    align-items: center;
    grid-template-rows: 200px;
    grid-auto-rows: 200px;
    color: #fff;
    .decoration {
      background-color: #282c34;
    }
  }
</style>
