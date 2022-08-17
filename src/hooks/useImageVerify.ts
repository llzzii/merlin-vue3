import { randomColor, randomNum } from '@/utils';
import { onMounted, ref } from 'vue';

export const useImageVerify = (width = 120, height = 40) => {
  const domRef = ref<HTMLCanvasElement>();
  const imgCode = ref('');
  const setImgCode = (code) => {
    imgCode.value = code;
  };

  const getImgCode = () => {
    imgCode.value = drawImage();
    console.log(
      '🚀 ~ file: useImageVerify.ts ~ line 13 ~ getImgCode ~ imgCode.value',
      imgCode.value,
    );
  };
  const drawImage = () => {
    let code = '';
    if (!domRef.value) return code;
    const NUMBER_STRING = '0123456789';
    const ctx = domRef.value.getContext('2d');
    if (!ctx) return code;
    ctx.fillStyle = randomColor(180, 230);
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < 4; i += 1) {
      const text = NUMBER_STRING[randomNum(0, NUMBER_STRING.length)];
      code += text;
      const fontSize = randomNum(18, 41);
      const deg = randomNum(-30, 30);
      ctx.font = `${fontSize}px Simhei`;
      ctx.textBaseline = 'top';
      ctx.fillStyle = randomColor(80, 150);
      ctx.save();
      ctx.translate(30 * i + 15, 15);
      ctx.rotate((deg * Math.PI) / 180);
      ctx.fillText(text, -15 + 5, -15);
      ctx.restore();
    }
    for (let i = 0; i < 5; i += 1) {
      ctx.beginPath();
      ctx.moveTo(randomNum(0, width), randomNum(0, height));
      ctx.lineTo(randomNum(0, width), randomNum(0, height));
      ctx.strokeStyle = randomColor(180, 230);
      ctx.closePath();
      ctx.stroke();
    }
    for (let i = 0; i < 41; i += 1) {
      ctx.beginPath();
      ctx.arc(randomNum(0, width), randomNum(0, height), 1, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fillStyle = randomColor(150, 200);
      ctx.fill();
    }
    return code;
  };
  onMounted(() => {
    getImgCode();
  });
  return { setImgCode, getImgCode, domRef, imgCode };
};
