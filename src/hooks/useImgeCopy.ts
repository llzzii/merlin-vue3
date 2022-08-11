import { message } from 'ant-design-vue';
export const handleCopyImg = (imgSrc, callback?, imgWidth = '100', imgHeight = '100') => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();

  canvas.width = parseFloat(imgWidth);
  canvas.height = parseFloat(imgHeight);

  img.crossOrigin = 'Anonymous';
  img.src = imgSrc;

  img.onload = () => {
    ctx!.clearRect(0, 0, ctx!.canvas.width, ctx!.canvas.height);
    ctx!.drawImage(img, 0, 0, parseFloat(imgWidth), parseFloat(imgHeight));

    // 将canvas转为blob
    canvas.toBlob(async (blob: any) => {
      console.log(blob);
      //   const { text, copy, copied, isSupported } = useClipboard();
      //   console.log(
      //     "🚀 ~ file: useImgeCopy.ts ~ line 21 ~ canvas.toBlob ~ text, copy, copied, isSupported",
      //     text,
      //     copy,
      //     copied,
      //     isSupported
      //   );
      //   copy(blob);
      try {
        const { ClipboardItem } = window;
        const data = [
          // eslint-disable-next-line no-undef
          new ClipboardItem({
            [blob.type]: blob,
          }),
        ];

        await navigator.clipboard.write(data).then(
          () => {
            console.log('Copied to clipboard successfully!');
            // callback();
            message.success('复制成功');
          },
          () => {
            console.error('Unable to write to clipboard.');
          },
        );
      } catch (e: any) {
        console.error(e);
        message.success('复制失败,请检查您的浏览器是否开启复制权限');
      }
    });
  };
};

export default handleCopyImg;
