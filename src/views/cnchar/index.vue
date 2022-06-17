<template>
  <a-space direction="vertical" class="pad10">
    <a-input-search
      v-model:value="text"
      placeholder="请输入"
      enter-button="开始"
      size="large"
      @search="onSearch"
    />

    <a-alert type="info">
      <template #description>
        <p>
          {{ description }}
        </p>
        <div>歇后语：{{ cnchar.random.xhy().join(',') }}</div>
        <div>成语：{{ cnchar.random.idiom().join(',') }}</div>
        <div>相关歇后语：{{ cnchar.xhy(text).join(',') }}</div>
        <div>相关成语：{{ cnchar.idiom(text).join(',') }}</div>
      </template>
    </a-alert>
    <div ref="drawArea"> </div>
  </a-space>
</template>
<script lang="ts" setup>
  import { ref, nextTick, reactive } from 'vue';
  import cnchar from 'cnchar-all';
  import nzhcn from 'nzh/cn';

  const drawArea = ref<HTMLElement | null>(null);
  let option = reactive({
    clear: false,
    el: drawArea.value as HTMLElement,
    type: cnchar.draw.TYPE.ANIMATION,
    style: {
      radicalColor: '#44f',
      backgroundColor: '#eee',
      length: 60,
    },
  });
  let text = ref('你是不是一个很酷ren');
  let description = ref('');
  const handelText = () => {
    text.value = [...text.value]
      .filter((e) => {
        return cnchar.isCnChar(e);
      })
      .join('');
    console.log('🚀 ~ file: index.vue ~ line 46 ~ handelText ~ text.value', text.value);
    description.value = `你一共输入${nzhcn.encodeB(
      text.value.length,
    )}个汉字，共${text.value.stroke()}笔画，拼音是${text.value.spell()},转为${text.value.convertSimpleToSpark()}`;
  };
  const onSearch = () => {
    handelText();
    option.el = drawArea.value as HTMLElement;
    option.type = cnchar.draw.TYPE.NORMAL;
    cnchar.draw(text.value, option);

    option.type = cnchar.draw.TYPE.STROKE;
    cnchar.draw(text.value, option);
    option.type = cnchar.draw.TYPE.ANIMATION;
    cnchar.draw(text.value, option);
  };
  nextTick(() => {
    console.log('🚀 ~ file: index.vue ~ line 21 ~ nextTick ~ drawArea.value', drawArea.value);
    console.log('🚀 ~ file: index.vue ~ line 21 ~ nextTick ~ option', option);
    onSearch();
  });
</script>
