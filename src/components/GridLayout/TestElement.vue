<template>
  <span class="text">
    {{ text }}
  </span>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'TestElement',
    props: {
      text: {
        type: String,
        default: 'x',
      },
    },
    data: function () {
      return {};
    },
    mounted: function () {
      console.log('### ' + this.text + ' ready!');
    },
  });
</script>
<style></style>
