<template>
  <a-row class="container">
    <a-col :span="6" class="mb10"><Echart :option="options" :is-loading="loading" /></a-col>
    <a-col :span="24"
      ><Echart :option="option2" :is-loading="loading" :theme="'dark'" :style="{ height: '500px' }"
    /></a-col>
  </a-row>
</template>

<script lang="ts" setup>
  import { Echart } from '@/components';
  import { EChartsOption } from 'echarts';
  import { ref } from 'vue';
  const loading = ref(true);
  const options: EChartsOption = {
    tooltip: {
      trigger: 'item',
    },

    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '80%',
        center: ['50%', '50%'],
        color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
        data: [
          { value: 500, name: '电子产品' },
          { value: 310, name: '服装' },
          { value: 274, name: '化妆品' },
          { value: 400, name: '家居' },
        ].sort(function (a, b) {
          return a.value - b.value;
        }),
        roseType: 'radius',
        animationType: 'scale',
        animationEasing: 'exponentialInOut',
        animationDelay: function () {
          return Math.random() * 400;
        },
      },
    ],
  };
  setTimeout(() => {
    loading.value = false;
  }, 2000);

  const createNodes = (widthCount, heightCount) => {
    let nodes: Array<{ x: number; y: number; value: number }> = [];
    for (let i = 0; i < widthCount; i++) {
      for (let j = 0; j < heightCount; j++) {
        nodes.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          value: 1,
        });
      }
    }
    return nodes;
  };
  const createEdges = (widthCount, heightCount) => {
    let edges: Array<{ source: number; target: number; value: number }> = [];
    for (let i = 0; i < widthCount; i++) {
      for (let j = 0; j < heightCount; j++) {
        if (i < widthCount - 1) {
          edges.push({
            source: i + j * widthCount,
            target: i + 1 + j * widthCount,
            value: 1,
          });
        }
        if (j < heightCount - 1) {
          edges.push({
            source: i + j * widthCount,
            target: i + (j + 1) * widthCount,
            value: 1,
          });
        }
      }
    }
    return edges;
  };

  const option2 = {
    series: [
      {
        type: 'graphGL',
        nodes: createNodes(50, 50),
        edges: createEdges(50, 50),
        itemStyle: {
          color: 'rgba(255,255,255,0.8)',
        },
        lineStyle: {
          color: 'rgba(255,255,255,0.8)',
          width: 3,
        },
        forceAtlas2: {
          steps: 5,
          jitterTolerence: 10,
          edgeWeightInfluence: 4,
        },
      },
    ],
  };
</script>
<style lang="less">
  .container {
    background-color: #fff;
    margin: 10px;
  }
  .mb10 {
    margin-bottom: 10px;
  }
</style>
