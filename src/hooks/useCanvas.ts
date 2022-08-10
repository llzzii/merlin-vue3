import { throttle } from 'lodash';
import { computed, onMounted, onUnmounted, ref, Ref, watch, reactive } from 'vue';

export function useCanvas(
  canvasRef: Ref<HTMLCanvasElement | undefined>,
  props: {
    theme?: string;
    width?: number;
    height?: number;
    model?: 'pen' | 'eraser' | 'mark';
    color?: string;
  } = {
    theme: 'default',
    width: 600,
    height: 500,
    model: 'pen',
    color: '#ffcc00',
  },
) {
  let ctx: CanvasRenderingContext2D | null = null;
  const penSize = ref(6);
  const rubberSize = ref(80);
  const markSize = ref(24);
  const options = reactive({
    theme: 'default',
    width: 600,
    height: 500,
    model: 'pen',
    color: '#ffcc00',
  });
  Object.assign(options, props);
  console.log('🚀 ~ file: useCanvas.ts ~ line 17 ~ options', options);

  let lastPos = {
    x: 0,
    y: 0,
  };
  let isMouseDown = false;
  let lastTime = 0;
  let lastLineWidth = -1;

  // 鼠标位置坐标：用于画笔或橡皮位置跟随
  const mouse = ref({
    x: 0,
    y: 0,
  });

  // 鼠标是否处在画布范围内：处在范围内才会显示画笔或橡皮
  const mouseInCanvas = ref(false);

  // 监听更新canvas尺寸
  const canvasWidth = ref(options.width);
  const canvasHeight = ref(options.height);

  const widthScale = computed(() =>
    canvasRef.value ? canvasWidth.value / canvasRef.value.width : 1,
  );
  const heightScale = computed(() =>
    canvasRef.value ? canvasHeight.value / canvasRef.value.height : 1,
  );
  const updateCanvasSize = () => {
    canvasWidth.value = options.width;
    canvasHeight.value = options.height;
  };
  const resizeObserver = new ResizeObserver(updateCanvasSize);
  onMounted(() => {
    if (canvasRef.value) resizeObserver.observe(canvasRef.value);
  });
  onUnmounted(() => {
    if (canvasRef.value) resizeObserver.unobserve(canvasRef.value);
  });

  // 初始化画布
  const initCanvas = () => {
    if (!canvasRef.value) return;

    ctx = canvasRef.value.getContext('2d');
    if (!ctx) return;

    canvasRef.value.width = options.width;
    canvasRef.value.height = options.height;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };
  // 切换画笔模式时，更新 canvas ctx 配置
  const updateCtx = (model?: 'pen' | 'eraser' | 'mark') => {
    if (!ctx) return;
    if (model) {
      options.model = model;
    }
    if (options.model === 'mark') {
      ctx.globalCompositeOperation = 'xor';
      ctx.globalAlpha = 0.5;
    } else if (options.model === 'pen') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
    }
  };
  watch(() => options.model, updateCtx);
  // 绘制画笔墨迹方法
  const draw = (posX: number, posY: number, lineWidth: number) => {
    if (!ctx) return;

    const lastPosX = lastPos.x;
    const lastPosY = lastPos.y;

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = options.color;
    ctx.beginPath();
    ctx.moveTo(lastPosX, lastPosY);
    ctx.lineTo(posX, posY);
    ctx.stroke();
    ctx.closePath();
  };

  // 擦除墨迹方法
  const erase = (posX: number, posY: number) => {
    if (!ctx || !canvasRef.value) return;
    const lastPosX = lastPos.x;
    const lastPosY = lastPos.y;

    const radius = rubberSize.value / 2;

    const sinRadius = radius * Math.sin(Math.atan((posY - lastPosY) / (posX - lastPosX)));
    const cosRadius = radius * Math.cos(Math.atan((posY - lastPosY) / (posX - lastPosX)));
    const rectPoint1: [number, number] = [lastPosX + sinRadius, lastPosY - cosRadius];
    const rectPoint2: [number, number] = [lastPosX - sinRadius, lastPosY + cosRadius];
    const rectPoint3: [number, number] = [posX + sinRadius, posY - cosRadius];
    const rectPoint4: [number, number] = [posX - sinRadius, posY + cosRadius];

    ctx.save();
    ctx.beginPath();
    ctx.arc(posX, posY, radius, 0, Math.PI * 2);
    ctx.clip();
    ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(...rectPoint1);
    ctx.lineTo(...rectPoint3);
    ctx.lineTo(...rectPoint4);
    ctx.lineTo(...rectPoint2);
    ctx.closePath();
    ctx.clip();
    ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
    ctx.restore();
  };

  // 计算鼠标两次移动之间的距离
  const getDistance = (posX: number, posY: number) => {
    const lastPosX = lastPos.x;
    const lastPosY = lastPos.y;
    return Math.sqrt((posX - lastPosX) * (posX - lastPosX) + (posY - lastPosY) * (posY - lastPosY));
  };

  // 根据鼠标两次移动之间的距离s和时间t计算绘制速度，速度越快，墨迹越细
  const getLineWidth = (s: number, t: number) => {
    const maxV = 10;
    const minV = 0.1;
    const maxWidth = penSize.value;
    const minWidth = 3;
    const v = s / t;
    let lineWidth;

    if (v <= minV) lineWidth = maxWidth;
    else if (v >= maxV) lineWidth = minWidth;
    else lineWidth = maxWidth - (v / maxV) * maxWidth;

    if (lastLineWidth === -1) return lineWidth;
    return (lineWidth * 1) / 3 + (lastLineWidth * 2) / 3;
  };

  // 路径操作
  const handleMove = (x: number, y: number) => {
    const time = new Date().getTime();

    if (options.model === 'pen') {
      const s = getDistance(x, y);
      const t = time - lastTime;
      const lineWidth = getLineWidth(s, t);

      draw(x, y, lineWidth);
      lastLineWidth = lineWidth;
    } else if (options.model === 'mark') draw(x, y, markSize.value);
    else erase(x, y);

    lastPos = { x, y };
    lastTime = new Date().getTime();
  };

  // 获取鼠标在canvas中的相对位置
  const getMouseOffsetPosition = (e: MouseEvent | TouchEvent) => {
    if (!canvasRef.value) return [0, 0];
    const event = e instanceof MouseEvent ? e : e.changedTouches[0];
    const canvasRect = canvasRef.value.getBoundingClientRect();
    const x = event.pageX - canvasRect.x;
    const y = event.pageY - canvasRect.y;
    return [x, y];
  };

  // 处理鼠标（触摸）事件
  // 准备开始绘制/擦除墨迹（落笔）
  const handleMousedown = (e: MouseEvent | TouchEvent) => {
    const [mouseX, mouseY] = getMouseOffsetPosition(e);
    const x = mouseX / widthScale.value;
    const y = mouseY / heightScale.value;

    isMouseDown = true;
    lastPos = { x, y };
    lastTime = new Date().getTime();

    if (!(e instanceof MouseEvent)) {
      mouse.value = { x: mouseX, y: mouseY };
      mouseInCanvas.value = true;
    }
  };

  // 开始绘制/擦除墨迹（移动）
  const handleMousemove = (e: MouseEvent | TouchEvent) => {
    const [mouseX, mouseY] = getMouseOffsetPosition(e);
    const x = mouseX / widthScale.value;
    const y = mouseY / heightScale.value;

    mouse.value = { x: mouseX, y: mouseY };

    if (isMouseDown) handleMove(x, y);
  };

  // 结束绘制/擦除墨迹（停笔）
  const handleMouseup = () => {
    if (!isMouseDown) return;
    isMouseDown = false;
  };

  // 清空画布
  const clearCanvas = () => {
    if (!ctx || !canvasRef.value) return;
    ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
  };

  // 获取 DataURL
  const getImageDataURL = () => {
    return canvasRef.value?.toDataURL();
  };

  // 设置 DataURL（绘制图片到 canvas）
  const setImageDataURL = (imageDataURL: string) => {
    const img = new Image();
    img.src = imageDataURL;
    img.onload = () => {
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
    };
  };

  // 滚动鼠标滚轮，调整笔触大小
  const mousewheelListener = throttle(
    function (e: WheelEvent) {
      if (options.model === 'eraser') {
        if (e.deltaY < 0 && rubberSize.value < 200) rubberSize.value += 20;
        else if (e.deltaY > 0 && rubberSize.value > 20) rubberSize.value -= 20;
      }
      if (options.model === 'pen') {
        if (e.deltaY < 0 && penSize.value < 10) penSize.value += 2;
        else if (e.deltaY > 0 && penSize.value > 4) penSize.value -= 2;
      }
      if (options.model === 'mark') {
        if (e.deltaY < 0 && markSize.value < 40) markSize.value += 4;
        else if (e.deltaY > 0 && markSize.value > 16) markSize.value -= 4;
      }
    },
    300,
    { leading: true, trailing: false },
  );

  return {
    initCanvas,
    canvasWidth,
    canvasHeight,
    draw,
    erase,
    mousewheelListener,
    setImageDataURL,
    getImageDataURL,
    clearCanvas,
    handleMouseup,
    handleMousedown,
    handleMousemove,
    mouseInCanvas,
    updateCtx,
    penSize,
    rubberSize,
    markSize,
    options,
    mouse,
  };
}
