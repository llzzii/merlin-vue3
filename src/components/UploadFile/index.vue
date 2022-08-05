<template>
  <div>
    <a-upload
      v-model:fileList="fileLists"
      :beforeUpload="beforeUpload"
      :customRequest="upload"
      list-type="picture"
      :showUploadList="false"
    >
      <a-button>
        <upload-outlined />
        上传
      </a-button>
    </a-upload>
    <div class="file-list">
      <div class="file-item" v-for="item in fileLists" :key="item.fileName">
        <div
          class="file-item-img"
          :style="{
            backgroundSize: ImgSize.x + ' ' + ImgSize.y,
            backgroundPositionX: '-' + typeMap[item.icon].w + 'px',
            backgroundPositionY: '-' + typeMap[item.icon].y + 'px',
          }"
        ></div>
        <div class="file-item-process">
          <div class="file-name" :title="item.fileName">{{ item.fileName }}</div>
          <a-progress :percent="item.percent" />
          <div class="file-size">
            <div> {{ toSize(item.loaded) }} </div>
            <div>{{ toSize(item.size) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { UploadOutlined } from '@ant-design/icons-vue';
  import { ref, onMounted, reactive } from 'vue';
  import { type UploadProps, message } from 'ant-design-vue';
  import * as qiniu from 'qiniu-js';
  import { getQiNiuToken, getBucketsList } from '@/api/upload';
  import { ImgSize, typeMap } from './icon.constrant';
  const fileLists = ref<Array<any>>([]);
  let token = ref('');

  const upload = ({ file, fileList, ...res }) => {
    console.log(
      '🚀 ~ file: index.vue ~ line 48 ~ upload ~ file, fileList',
      file,
      fileList,
      'd',
      res,
      fileLists,
    );
    let fileObj = {};
    qiniu.upload(file, file.name, token.value, {}, {}).subscribe(
      (res) => {
        fileObj = {
          fileName: file.name,
          loaded: res?.total.loaded,
          percent: res?.total.percent,
          size: res?.total.size,
          icon: file.name?.substr(file.name.lastIndexOf('.') + 1).toLowerCase(),
          id: res?.uploadInfo?.id,
        };
        fileLists.value.map((o) => {
          console.log(
            '🚀 ~ file: index.vue ~ line 61 ~ fileLists.value.map ~ o',
            o,
            file,
            o.name == file.name,
          );
          if (o.name == file.name) {
            Object.assign(o, fileObj);
          }
          console.log('🚀 ~ file: index.vue ~ line 63 ~ upload ~ o', o);
        });
        fileLists.value = [...fileLists.value];
        console.log('🚀 ~ file: index.vue ~ line 60 ~ upload ~ res', res, fileLists.value);
      },
      (err) => {
        console.log('🚀 ~ file: index.vue ~ line 63 ~ upload ~ err', err);
      },
    );
  };
  const toSize = (size) => {
    return size > 100 * 1024
      ? (size / (1024 * 1024)).toFixed(2) + 'M'
      : (size / 1024).toFixed(2) + 'kb';
  };
  const beforeUpload = (file, fileList) => {
    console.log('fileList----', fileList);
    if (file.size > 1024 * 1024 * 1024) {
      message.warning(`单个文件不得超过1G`);
      return false;
    }
  };
  onMounted(() => {
    token.value = getQiNiuToken();
    const list = getBucketsList();
    console.log('🚀 ~ file: index.vue ~ line 12 ~ onMounted ~ token', token, list);
  });
</script>
<style lang="less" scoped>
  .file-list {
    height: 439px;
    overflow-y: auto;
    margin-bottom: 16px;
    .file-item {
      display: flex;
      align-items: center;
      padding-top: 22px;
      cursor: pointer;
      .file-item-img {
        width: 50px;
        height: 60px;
        margin-right: 10px;
        background: url('../../assets/fileIcons/fileType.png');
      }
      .file-item-process {
        width: 350px;
        margin-left: 6px;
        overflow: hidden;
        .file-name {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.85);
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          height: 22px;
          line-height: 22px;
        }
      }
      .video-btn {
        margin-left: 20px;
        display: flex;
        padding-top: 13px;
        margin-right: 10px;
        img {
          width: 26px;
          height: 26px;
          margin: 0;
          margin-left: 8px;
        }
      }
      .file-size {
        display: flex;
        justify-content: space-between;
        line-height: 1;
        flex-shrink: 0;
        div:nth-child(1) {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.45);
        }
        div:nth-child(2) {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #2f7bff;
        }
      }
    }
    .line {
      height: 1px;
      background: rgba(0, 0, 0, 0.06);
      margin-top: 23px;
    }
  }
</style>
