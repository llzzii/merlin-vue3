<template>
  <GridLayout v-model:layout="testLayout" :responsive="true">
    <GridItem
      v-for="item in testLayout"
      :key="item.i"
      :static="item.static"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      :min-w="item.minW"
      :max-w="item.maxW"
      :min-x="item.minX"
      :max-x="item.maxX"
      :min-y="item.minY"
      :max-y="item.maxY"
      :preserve-aspect-ratio="item.preserveAspectRatio"
    >
      <!--<custom-drag-element :text="item.i"></custom-drag-element>-->
      {{ item.i }}
      <!--<button @click="clicked">CLICK ME!</button>-->
    </GridItem>
  </GridLayout>
</template>

<script lang="ts" setup>
  import { GridLayout, GridItem } from '@/components';
  let testLayout = [
    {
      x: 0,
      y: 0,
      w: 2,
      h: 2,
      i: '0',
      resizable: true,
      draggable: true,
      static: false,
      minY: 0,
      maxY: 2,
    },
    { x: 2, y: 0, w: 2, h: 4, i: '1', resizable: null, draggable: null, static: false },
    {
      x: 4,
      y: 0,
      w: 2,
      h: 5,
      i: '2',
      resizable: false,
      draggable: false,
      static: false,
      minX: 4,
      maxX: 4,
      minW: 2,
      maxW: 2,
      preserveAspectRatio: true,
    },
    { x: 6, y: 0, w: 2, h: 3, i: '3', resizable: false, draggable: false, static: false },
    { x: 8, y: 0, w: 2, h: 3, i: '4', resizable: false, draggable: false, static: false },
    { x: 10, y: 0, w: 2, h: 3, i: '5', resizable: false, draggable: false, static: false },
    { x: 0, y: 5, w: 2, h: 5, i: '6', resizable: false, draggable: false, static: false },
    { x: 2, y: 5, w: 2, h: 5, i: '7', resizable: false, draggable: false, static: false },
    { x: 4, y: 5, w: 2, h: 5, i: '8', resizable: false, draggable: false, static: false },
    { x: 6, y: 3, w: 2, h: 4, i: '9', resizable: false, draggable: false, static: false },
    { x: 8, y: 4, w: 2, h: 4, i: '10', resizable: false, draggable: false, static: false },
    {
      x: 10,
      y: 4,
      w: 2,
      h: 4,
      i: '11',
      resizable: false,
      draggable: false,
      static: false,
      minY: 4,
    },
    { x: 0, y: 10, w: 2, h: 5, i: '12', resizable: false, draggable: false, static: false },
    { x: 2, y: 10, w: 2, h: 5, i: '13', resizable: false, draggable: false, static: false },
    { x: 4, y: 8, w: 2, h: 4, i: '14', resizable: false, draggable: false, static: false },
    { x: 6, y: 8, w: 2, h: 4, i: '15', resizable: false, draggable: false, static: false },
    { x: 8, y: 10, w: 2, h: 5, i: '16', resizable: false, draggable: false, static: false },
    { x: 10, y: 4, w: 2, h: 2, i: '17', resizable: false, draggable: false, static: false },
    { x: 0, y: 9, w: 2, h: 3, i: '18', resizable: false, draggable: false, static: false },
    { x: 2, y: 6, w: 2, h: 2, i: '19', resizable: false, draggable: false, static: false },
  ];
  console.log("🚀 ~ file: index.vue ~ line 86 ~ testLayout", testLayout)
  
</script>
<style lang="less" scoped>
  .grid-item {
    background: #ccc;
    border: 1px solid black;
  }
</style>
