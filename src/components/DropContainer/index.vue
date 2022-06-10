<script setup lang="ts">
  import { useDropZone } from '@vueuse/core';
  import { ref, reactive } from 'vue';

  const dropZoneRef = ref(null);
  let upFiles = reactive<File[]>([]);

  function onDrop(files: File[]) {
    upFiles.push(files[0]);
    console.log(
      '🚀 ~ file: index.vue ~ line 8 ~ onDrop ~ dropZoneRef',
      isOverDropZone,
      files,
      upFiles,
    );
    // Trigger an event when file(s) is drop on zone
  }
  const { isOverDropZone } = useDropZone(dropZoneRef, onDrop);
</script>

<template>
  <div ref="dropZoneRef" class="dropZone"> 文件上传，拖动文件到此位置 </div>
  <ul>
    <li v-for="item in upFiles" :key="item">
      <p>文件名：{{ item.name }}</p>
      <p>大小{{ item.size }}</p>
    </li>
  </ul>
</template>
<style lang="less" scoped>
  .dropZone {
    width: 100%;
    height: 100%;
    border: 1px dotted #ddd;
  }
</style>
