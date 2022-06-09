<template>
  <div class="table-wapper">
    <vxe-grid ref="xGrid" v-bind="gridOptions" />
  </div>
</template>

<script lang="ts" setup>
  import { VXETable, VxeGridInstance, VxeGridProps } from 'vxe-table';
  import { ref } from 'vue';
  const props = withDefaults(
    defineProps<{
      gridOptions: VxeGridProps;
    }>(),
    {
      gridOptions: {},
    },
  );
  const xGrid = ref({} as VxeGridInstance);
</script>
<style></style>
