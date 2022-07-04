<template>
  <div class="container">
    <a-alert message="DataV(边框) 的Vue3版本，原文地址：http://datav.jiaminghi.com/" type="info" />
    <a-divider orientation="left">边框demo</a-divider>
    <div class="border-container">
      <BBox1
        class="border1"
        style="
          width: 120px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          background-color: #000;
          color: white;
        "
        >边框1</BBox1
      >
      <BBox2
        class="border1"
        style="width: 320px; height: 200px; line-height: 50px; text-align: center"
        >边框2</BBox2
      >
      <BBox3 class="border1" style="padding: 30px">BBox3</BBox3>
      <BBox4 class="border1" style="padding: 30px">BBox4</BBox4>
      <BBox4 class="border1" style="padding: 30px" :reverse="true">BBox4(reverse)</BBox4>
      <BBox5 class="border1" style="padding: 30px">BBox5</BBox5>
      <BBox5 class="border1" style="padding: 30px" :reverse="true">BBox5(reverse)</BBox5>
      <BBox6 class="border1" style="padding: 30px">BBox6</BBox6>
      <BBox7 class="border1">BBox7</BBox7>
      <BBox8>BBox8</BBox8>
      <BBox9>BBox9</BBox9>
      <BBox10>BBox10</BBox10>
      <BBox11 title="BBox11">BBox11</BBox11>
      <BBox12 style="padding: 30px">BBox12</BBox12>
      <BBox13 style="padding: 30px">BBox13</BBox13>
      <!-- <BBox8 :reverse="true">BBox8</BBox8> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { BBox1 } from '@/components';
</script>
<style lang="less" scoped>
  .container {
    margin: 10px;
    background-color: #fff;
    padding: 10px;
  }
  .border-container {
    display: grid;
    grid-template-columns: repeat(3, 30%);
    grid-row-gap: 20px;
    grid-column-gap: 20px;
    justify-items: center;
    align-items: center;
    grid-template-rows: 200px;
    grid-auto-rows: 200px;
  }
</style>
