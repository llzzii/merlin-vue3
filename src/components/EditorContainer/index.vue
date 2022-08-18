<script setup lang="ts">
  import { type CSSProperties, ref } from 'vue';
  import { Editor, Viewer } from '@bytemd/vue-next';
  import gfm from '@bytemd/plugin-gfm';
  import 'bytemd/dist/index.css';
  import highlight from '@bytemd/plugin-highlight';
  import breaks from '@bytemd/plugin-breaks';
  import footnotes from '@bytemd/plugin-footnotes';
  import frontmatter from '@bytemd/plugin-frontmatter';
  import gemoji from '@bytemd/plugin-gemoji';
  import mediumZoom from '@bytemd/plugin-medium-zoom';
  import mermaid from '@bytemd/plugin-mermaid';
  import mathssr from '@bytemd/plugin-math-ssr';
  import { getProcessor } from 'bytemd';
  import gfmLocale from '@bytemd/plugin-gfm/locales/zh_Hans.json';
  import mathLocale from '@bytemd/plugin-math/locales/zh_Hans.json';
  import mermaidLocale from '@bytemd/plugin-mermaid/locales/zh_Hans.json';

  // 引入中文包
  import zhHans from 'bytemd/lib/locales/zh_Hans.json';
  // 引入基础css
  import 'bytemd/dist/index.min.css';
  // 引入高亮css
  // import 'highlight.js/styles/vs.css';

  /**
   * 可用插件地址 https://github.com/bytedance/bytemd/blob/main/README.md
    @bytemd/plugin-gfm (支持GFM(自动链接文字,删除线,表,任务列表))
    @bytemd/plugin-gemoji(支持Gemoji短代码)
    @bytemd/plugin-highlight-ssr(高亮代码块(与SSR兼容))
    @bytemd/plugin-medium-zoom(像媒体中一样缩放图像)
    remark-gemoji (不安装会报错，@bytemd/plugin-gemoj插件中有使用，不使用这个插件的话可以不安装)

   *
   */
  const plugins = [
    gfm({ locale: gfmLocale }),
    // highlightssr(),
    breaks(),
    highlight(),
    mermaid({ locale: mermaidLocale }),
    mathssr({ locale: mathLocale }),
    frontmatter(),
    footnotes(),
    gemoji(),
    mediumZoom(),
  ];

  const props = withDefaults(
    defineProps<{
      content?: string;
      isEdit?: boolean;
      style?: CSSProperties;
      mode?: 'split' | 'tab' | 'auto';
      placeholder?: string;
      maxLength?: number;
      editorConfig?: any;
    }>(),
    {
      content: '',
      isEdit: true,
      style: () => {
        return {
          height: '100%',
        };
      },
      mode: 'split',
      placeholder: '请输入',
      maxLength: 5000,
      editorConfig: {},
    },
  );
  const emits = defineEmits(['update:content']);
  const uploadImage = async (files) => {
    console.log('files', files);
    return [
      {
        title: files.map((i) => i.name),
        url: 'http',
      },
    ];
  };
  const handleChange = (v: string) => {
    emits('update:content', v);
  };
</script>

<template>
  <main class="editor-container">
    <Editor
      v-if="isEdit"
      :style="style"
      :mode="mode"
      :value="content"
      :placeholder="placeholder"
      :maxLength="maxLength"
      :plugins="plugins"
      :locale="zhHans"
      @change="handleChange"
      :uploadImages="uploadImage"
    />

    <Viewer v-else :value="content" :style="style" :plugins="plugins" :locale="zhHans" />
  </main>
</template>

<style lang="less" scoped>
  .editor-container {
    min-height: 300px;
  }
  /deep/.bytemd {
    height: 100%;
  }
</style>
