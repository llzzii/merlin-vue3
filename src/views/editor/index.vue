<template>
  <div>
    <EditorContainer v-model:content="content" :style="{ height: '300px' }" />
    <a-button type="primary" @click="getContent()">获取</a-button>

    <EditorContainer :is-edit="false" :style="{ height: '300px' }" :content="content" />
  </div>
</template>

<script lang="ts" setup>
  import { EditorContainer } from '@/components';
  import { Modal } from 'ant-design-vue';
  import { createVNode, ref } from 'vue';
  const content = ref('nihao');
  const getContent = () => {
    Modal.info({
      title: '提示',
      width: '700px',
      content: createVNode('div', {
        // innerHTML: `<span style="color:green">${JSON.stringify(selectedRows, null, 2)} </span>`,
        innerHTML: `${content.value}`,
        style: 'width:100%;min-height:400px',
      }),
    });
  };
</script>
