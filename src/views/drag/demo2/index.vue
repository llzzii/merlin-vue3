<template>
  <div class="page">
    <Draggable class="draggable-ul" animation="300" :list="list" group="people" itemKey="id">
      <template #item="{ element }">
        <div class="cursor-move draggable-li">
          <a-tag color="error">已完成</a-tag
          ><span class="ml-2">{{ element.name + element.id }}</span>
        </div>
      </template>
    </Draggable>

    <div class="daiy">
      <Draggable class="draggable-ul" animation="300" :list="list2" group="people" itemKey="id">
        <template #item="{ element }">
          <div class="cursor-move draggable-li">
            <a-tag color="error">已完成</a-tag
            ><span class="ml-2">{{ element.name + element.id }}</span>
          </div>
        </template>
      </Draggable></div
    >
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import Draggable from 'vuedraggable';

  const list = reactive([
    { name: '模块', id: 1 },
    { name: '模块', id: 2 },
    { name: '模块', id: 3 },
    { name: '模块', id: 4 },
    { name: '模块', id: 5 },
    { name: '模块', id: 6 },
    { name: '模块', id: 7 },
    { name: '模块', id: 8 },
  ]);

  const list2 = reactive([]);
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
  .draggable-ul {
    width: 100%;
    overflow: hidden;
    margin-top: 20px;
    min-height: 200px;
    background-color: #fff;
    .draggable-li {
      width: 100%;
      padding: 16px 10px;
      color: #333;
      border-bottom: 1px solid #efeff5;
      cursor: move;
    }
  }
</style>
