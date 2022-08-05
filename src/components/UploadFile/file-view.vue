<template>
  <div ref="viewRef" v-viewer="{ movable: false }">
    <img :src="previewImgUrl" width="0" height="0" style="display: none" />
  </div>

  <a-modal
    v-model:visible="fileVisible"
    title="文件预览"
    width="100%"
    :footer="null"
    @cancel="close"
    wrap-class-name="full-modal"
  >
    <div ref="docsRef" id="fileView"> </div>
  </a-modal>
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { renderAsync } from 'docx-preview';
  import axios from 'axios';
  import { previewImageSuffix } from './icon.constrant.js';
  import LuckyExcel from 'luckyexcel';
  import { message } from 'ant-design-vue';
  const previewImgUrl = ref('');
  const viewRef = ref(null);
  const docsRef = ref<HTMLElement>();
  const fileVisible = ref(false);
  const props = withDefaults(
    defineProps<{
      visible?: boolean;
      fileKey?: string;
    }>(),
    {
      visible: false,
      fileKey: '',
    },
  );
  const emits = defineEmits(['changeVisible']);
  watch(
    () => [props.visible, props.fileKey],
    (n) => {
      const suffix = props.fileKey.split('.').pop()?.toLowerCase() || '';
      if (previewImageSuffix.includes(suffix)) {
        imgShow(props.fileKey);
      }
      if (props.visible) {
        if (['doc', 'docx'].includes(suffix)) {
          docView(props.fileKey);
        }
        if (['xlsx'].includes(suffix)) {
          excelView(props.fileKey);
        }
      }
    },
  );
  const close = () => {
    emits('changeVisible');
  };
  const imgShow = (url) => {
    previewImgUrl.value = url;
    (viewRef.value as any)?.$viewer.show();
  };
  const docView = (url) => {
    fileVisible.value = true;

    axios({
      method: 'GET',
      responseType: 'blob',
      url: url,
    }).then((res) => {
      console.log('🚀 ~ file: file-list.vue ~ line 104 ~ docView ~ res', res);
      renderAsync(res.data, docsRef.value as unknown as HTMLElement, null, {
        className: 'docx', // 默认和文档样式类的类名/前缀
        inWrapper: true, // 启用围绕文档内容渲染包装器
        ignoreWidth: false, // 禁止页面渲染宽度
        ignoreHeight: false, // 禁止页面渲染高度
        ignoreFonts: false, // 禁止字体渲染
        breakPages: true, // 在分页符上启用分页
        ignoreLastRenderedPageBreak: true, //禁用lastRenderedPageBreak元素的分页
        experimental: false, //启用实验性功能（制表符停止计算）
        trimXmlDeclaration: true, //如果为真，xml声明将在解析之前从xml文档中删除
        debug: true, // 启用额外的日志记录
      });
    });
  };
  const excelView = (url) => {
    fileVisible.value = true;

    // 加载 excel 文件
    LuckyExcel.transformExcelToLuckyByUrl(url, '', (exportJson, luckysheetfile) => {
      console.log(exportJson);
      console.log(luckysheetfile);
      if (exportJson.sheets == null || exportJson.sheets.length == 0) {
        message.error('文件读取失败!');
        return;
      }
      // 销毁原来的表格
      window.luckysheet.destroy();
      // 重新创建新表格
      window.luckysheet.create({
        container: 'fileView', // 设定DOM容器的id
        showtoolbar: false, // 是否显示工具栏
        showinfobar: false, // 是否显示顶部信息栏
        showstatisticBar: false, // 是否显示底部计数栏
        sheetBottomConfig: false, // sheet页下方的添加行按钮和回到顶部按钮配置
        allowEdit: false, // 是否允许前台编辑
        enableAddRow: false, // 是否允许增加行
        enableAddCol: false, // 是否允许增加列
        sheetFormulaBar: false, // 是否显示公式栏
        enableAddBackTop: false, //返回头部按钮
        data: exportJson.sheets, //表格内容
        title: exportJson.info.name, //表格标题
      });
    });
  };
</script>
<style lang="less">
  .full-modal {
    .ant-modal {
      max-width: 100%;
      top: 0;
      padding-bottom: 0;
      margin: 0;
    }
    .ant-modal-content {
      display: flex;
      flex-direction: column;
      height: calc(100vh);
    }
    .ant-modal-body {
      flex: 1;
    }
  }
  #fileView {
    margin: 0px;
    padding: 0px;
    position: absolute;
    width: 100%;
    left: 0px;
    top: 30px;
    bottom: 0px;
  }
</style>
