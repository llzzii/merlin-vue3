<template>
  <div class="page">
    <ul class="daiyiru">
      <li draggable="true">模块1</li>
      <li draggable="true">模块2</li>
      <li draggable="true">模块3</li>
      <li draggable="true">模块4</li>
      <li draggable="true">模块5</li>
    </ul>

    <div class="daiy"> <DropContainer /></div>
  </div>
</template>

<script lang="ts" setup>
  import { DropContainer } from '@/components';
</script>
<style lang="less" scoped>
  .daiyiru {
    display: flex;
    list-style: none;
    background-color: #fff;
    padding: 10px;
    li {
      width: 100px;
      height: 100px;
      border: 1px solid #ccc;
      padding: 5px;
      margin-right: 5px;
    }
  }
  .daiy {
    height: 100px;
    background-color: #fff;
    margin-top: 10px;
    padding: 10px;
  }
  .page {
    position: relative;
  }
</style>
