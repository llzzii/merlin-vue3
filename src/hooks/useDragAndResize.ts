import { computed, Ref } from 'vue';

export const enum OperateBorderLines {
  T = 'top',
  B = 'bottom',
  L = 'left',
  R = 'right',
}

export const enum OperateResizeHandlers {
  LEFT_TOP = 'left-top',
  TOP = 'top',
  RIGHT_TOP = 'right-top',
  LEFT = 'left',
  RIGHT = 'right',
  LEFT_BOTTOM = 'left-bottom',
  BOTTOM = 'bottom',
  RIGHT_BOTTOM = 'right-bottom',
}

export const MIN_SIZE = {
  text: 20,
  image: 20,
  shape: 15,
  chart: 200,
  table: 20,
  video: 250,
  audio: 20,
};

export function useDragAndResize(elRef: Ref<HTMLElement>) {
  const width = computed(() => elRef.value.offsetWidth);
  const height = computed(() => elRef.value.offsetHeight);
  // 元素缩放点
  const resizeHandlers = computed(() => {
    return [
      { direction: OperateResizeHandlers.LEFT_TOP, style: {} },
      { direction: OperateResizeHandlers.TOP, style: { left: width.value / 2 + 'px' } },
      { direction: OperateResizeHandlers.RIGHT_TOP, style: { left: width.value + 'px' } },
      { direction: OperateResizeHandlers.LEFT, style: { top: height.value / 2 + 'px' } },
      {
        direction: OperateResizeHandlers.RIGHT,
        style: { left: width.value + 'px', top: height.value / 2 + 'px' },
      },
      { direction: OperateResizeHandlers.LEFT_BOTTOM, style: { top: height.value + 'px' } },
      {
        direction: OperateResizeHandlers.BOTTOM,
        style: { left: width.value / 2 + 'px', top: height.value + 'px' },
      },
      {
        direction: OperateResizeHandlers.RIGHT_BOTTOM,
        style: { left: width.value + 'px', top: height.value + 'px' },
      },
    ];
  });
  // 文本元素缩放点
  const textElementResizeHandlers = computed(() => {
    return [
      { direction: OperateResizeHandlers.LEFT, style: { top: height.value / 2 + 'px' } },
      {
        direction: OperateResizeHandlers.RIGHT,
        style: { left: width.value + 'px', top: height.value / 2 + 'px' },
      },
    ];
  });

  // 元素选中边框线
  const borderLines = computed(() => {
    return [
      { type: OperateBorderLines.T, style: { width: width.value + 'px' } },
      {
        type: OperateBorderLines.B,
        style: { top: height.value + 'px', width: width.value + 'px' },
      },
      { type: OperateBorderLines.L, style: { height: height.value + 'px' } },
      {
        type: OperateBorderLines.R,
        style: { left: width.value + 'px', height: height.value + 'px' },
      },
    ];
  });

  /**
   * 计算旋转后的元素八个缩放点的位置
   * @param element 元素原始位置大小信息
   * @param angle 旋转角度
   */
  const getRotateElementPoints = (eelRef, angle: number) => {
    const left = elRef.value.offsetLeft;
    const top = elRef.value.offsetTop;
    const width = elRef.value.offsetWidth;
    const height = elRef.value.offsetHeight;

    const radius = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / 2;
    const auxiliaryAngle = (Math.atan(height / width) * 180) / Math.PI;

    const tlbraRadian = ((180 - angle - auxiliaryAngle) * Math.PI) / 180;
    const trblaRadian = ((auxiliaryAngle - angle) * Math.PI) / 180;
    const taRadian = ((90 - angle) * Math.PI) / 180;
    const raRadian = (angle * Math.PI) / 180;

    const halfWidth = width / 2;
    const halfHeight = height / 2;

    const middleLeft = left + halfWidth;
    const middleTop = top + halfHeight;

    const leftTopPoint = {
      left: middleLeft + radius * Math.cos(tlbraRadian),
      top: middleTop - radius * Math.sin(tlbraRadian),
    };
    const topPoint = {
      left: middleLeft + halfHeight * Math.cos(taRadian),
      top: middleTop - halfHeight * Math.sin(taRadian),
    };
    const rightTopPoint = {
      left: middleLeft + radius * Math.cos(trblaRadian),
      top: middleTop - radius * Math.sin(trblaRadian),
    };
    const rightPoint = {
      left: middleLeft + halfWidth * Math.cos(raRadian),
      top: middleTop + halfWidth * Math.sin(raRadian),
    };
    const rightBottomPoint = {
      left: middleLeft - radius * Math.cos(tlbraRadian),
      top: middleTop + radius * Math.sin(tlbraRadian),
    };
    const bottomPoint = {
      left: middleLeft - halfHeight * Math.sin(raRadian),
      top: middleTop + halfHeight * Math.cos(raRadian),
    };
    const leftBottomPoint = {
      left: middleLeft - radius * Math.cos(trblaRadian),
      top: middleTop + radius * Math.sin(trblaRadian),
    };
    const leftPoint = {
      left: middleLeft - halfWidth * Math.cos(raRadian),
      top: middleTop - halfWidth * Math.sin(raRadian),
    };

    return {
      leftTopPoint,
      topPoint,
      rightTopPoint,
      rightPoint,
      rightBottomPoint,
      bottomPoint,
      leftBottomPoint,
      leftPoint,
    };
  };

  /**
   * 获取元素某缩放点相对的另一个点的位置，如：【上】对应【下】、【左上】对应【右下】
   * @param direction 当前操作的缩放点
   * @param points 旋转后的元素八个缩放点的位置
   */
  const getOppositePoint = (
    direction: string,
    points: ReturnType<typeof getRotateElementPoints>,
  ): { left: number; top: number } => {
    const oppositeMap = {
      [OperateResizeHandlers.RIGHT_BOTTOM]: points.leftTopPoint,
      [OperateResizeHandlers.LEFT_BOTTOM]: points.rightTopPoint,
      [OperateResizeHandlers.LEFT_TOP]: points.rightBottomPoint,
      [OperateResizeHandlers.RIGHT_TOP]: points.leftBottomPoint,
      [OperateResizeHandlers.TOP]: points.bottomPoint,
      [OperateResizeHandlers.BOTTOM]: points.topPoint,
      [OperateResizeHandlers.LEFT]: points.rightPoint,
      [OperateResizeHandlers.RIGHT]: points.leftPoint,
    };
    return oppositeMap[direction];
  };

  // 缩放元素
  const scaleElement = (e: MouseEvent, command: OperateResizeHandlers) => {
    const isMouseDown = true;
    const elOriginLeft = elRef.value.offsetLeft;
    console.log(
      '🚀 ~ file: useDragAndResize.ts ~ line 157 ~ scaleElement ~ elRef.value',
      elRef.value,
    );
    const elOriginTop = elRef.value.offsetTop;
    const elOriginWidth = elRef.value.offsetWidth;
    const elOriginHeight = elRef.value.offsetHeight;
    console.log(
      '🚀 ~ file: useDragAndResize.ts ~ line 80 ~ scaleElement ~ elOriginHeight',
      elOriginHeight,
      elOriginWidth,
      elOriginTop,
      elOriginLeft,
    );
    const elRotate = 0;
    const fixedRatio = false; // 锁定宽高比例（仅四个角可能触发，四条边不会触发）
    const rotateRadian = (Math.PI * elRotate) / 180;
    const aspectRatio = elOriginWidth / elOriginHeight;

    const startPageX = e.pageX;
    const startPageY = e.pageY;
    // 元素最小缩放限制
    const minSize = 20;
    const getSizeWithinRange = (size: number) => (size < minSize ? minSize : size);

    let points: ReturnType<typeof getRotateElementPoints>;
    const baseLeft = 0;
    const baseTop = 0;
    const horizontalLines: AlignLine[] = [];
    const verticalLines: AlignLine[] = [];
    document.onmousemove = (e: MouseEvent) => {
      if (!isMouseDown) return;

      const currentPageX = e.pageX;
      const currentPageY = e.pageY;

      const x = currentPageX - startPageX;
      const y = currentPageY - startPageY;

      let width = elOriginWidth;
      let height = elOriginHeight;
      let left = elOriginLeft;
      let top = elOriginTop;
      // 元素被旋转的情况下，需要根据元素旋转的角度，重新计算需要缩放的距离（鼠标按下后移动的距离）
      if (elRotate) {
        const revisedX = Math.cos(rotateRadian) * x + Math.sin(rotateRadian) * y;
        let revisedY = Math.cos(rotateRadian) * y - Math.sin(rotateRadian) * x;
        // 以水平方向上缩放的距离为基础，计算垂直方向上的缩放距离，保持二者具有相同的缩放比例
        if (fixedRatio) {
          if (
            command === OperateResizeHandlers.RIGHT_BOTTOM ||
            command === OperateResizeHandlers.LEFT_TOP
          ) {
            revisedY = revisedX / aspectRatio;
          }
          if (
            command === OperateResizeHandlers.LEFT_BOTTOM ||
            command === OperateResizeHandlers.RIGHT_TOP
          ) {
            revisedY = -revisedX / aspectRatio;
          }
          // 根据不同的操作点分别计算元素缩放后的大小和位置
          // 需要注意：
          // 此处计算的位置需要在后面重新进行校正，因为旋转后再缩放事实上会改变元素基点的位置（虽然视觉上基点保持不动，但这是【旋转】+【移动】共同作用的结果）
          // 但此处计算的大小不需要重新校正，因为前面已经重新计算需要缩放的距离，相当于大小已经经过了校正
          if (command === OperateResizeHandlers.RIGHT_BOTTOM) {
            width = getSizeWithinRange(elOriginWidth + revisedX);
            height = getSizeWithinRange(elOriginHeight + revisedY);
          } else if (command === OperateResizeHandlers.LEFT_BOTTOM) {
            width = getSizeWithinRange(elOriginWidth - revisedX);
            height = getSizeWithinRange(elOriginHeight + revisedY);
            left = elOriginLeft - (width - elOriginWidth);
          } else if (command === OperateResizeHandlers.LEFT_TOP) {
            width = getSizeWithinRange(elOriginWidth - revisedX);
            height = getSizeWithinRange(elOriginHeight - revisedY);
            left = elOriginLeft - (width - elOriginWidth);
            top = elOriginTop - (height - elOriginHeight);
          } else if (command === OperateResizeHandlers.RIGHT_TOP) {
            width = getSizeWithinRange(elOriginWidth + revisedX);
            height = getSizeWithinRange(elOriginHeight - revisedY);
            top = elOriginTop - (height - elOriginHeight);
          } else if (command === OperateResizeHandlers.TOP) {
            height = getSizeWithinRange(elOriginHeight - revisedY);
            top = elOriginTop - (height - elOriginHeight);
          } else if (command === OperateResizeHandlers.BOTTOM) {
            height = getSizeWithinRange(elOriginHeight + revisedY);
          } else if (command === OperateResizeHandlers.LEFT) {
            width = getSizeWithinRange(elOriginWidth - revisedX);
            left = elOriginLeft - (width - elOriginWidth);
          } else if (command === OperateResizeHandlers.RIGHT) {
            width = getSizeWithinRange(elOriginWidth + revisedX);
          }
          // 获取当前元素的基点坐标，与初始状态时的基点坐标进行对比，并计算差值进行元素位置的校正
          const currentPoints = getRotateElementPoints({ width, height, left, top }, elRotate);
          console.log(
            '🚀 ~ file: useDragAndResize.ts ~ line 251 ~ scaleElement ~ currentPoints',
            currentPoints,
          );
          const currentOppositePoint = getOppositePoint(command, currentPoints);
          const currentBaseLeft = currentOppositePoint.left;
          const currentBaseTop = currentOppositePoint.top;

          const offsetX = currentBaseLeft - baseLeft;
          const offsetY = currentBaseTop - baseTop;

          left = left - offsetX;
          top = top - offsetY;
        }
      }
      // 元素未被旋转的情况下，正常计算新的位置大小即可，无需复杂的校正等工作
      // 额外需要处理对齐吸附相关的操作
      // 锁定宽高比例相关的操作同上，不再赘述
      else {
        let moveX = x;
        let moveY = y;
        const offsetX = 0;
        const offsetY = 0;
        if (fixedRatio) {
          if (
            command === OperateResizeHandlers.RIGHT_BOTTOM ||
            command === OperateResizeHandlers.LEFT_TOP
          )
            moveY = moveX / aspectRatio;
          if (
            command === OperateResizeHandlers.LEFT_BOTTOM ||
            command === OperateResizeHandlers.RIGHT_TOP
          )
            moveY = -moveX / aspectRatio;
        }

        if (command === OperateResizeHandlers.RIGHT_BOTTOM) {
          // const { offsetX, offsetY } = alignedAdsorption(
          //   elOriginLeft + elOriginWidth + moveX,
          //   elOriginTop + elOriginHeight + moveY,
          // );
          moveX = moveX - offsetX;
          moveY = moveY - offsetY;
          if (fixedRatio) {
            if (offsetY) moveX = moveY * aspectRatio;
            else moveY = moveX / aspectRatio;
          }
          width = getSizeWithinRange(elOriginWidth + moveX);
          height = getSizeWithinRange(elOriginHeight + moveY);
        } else if (command === OperateResizeHandlers.LEFT_BOTTOM) {
          // const { offsetX, offsetY } = alignedAdsorption(
          //   elOriginLeft + moveX,
          //   elOriginTop + elOriginHeight + moveY,
          // );
          moveX = moveX - offsetX;
          moveY = moveY - offsetY;
          if (fixedRatio) {
            if (offsetY) moveX = -moveY * aspectRatio;
            else moveY = -moveX / aspectRatio;
          }
          width = getSizeWithinRange(elOriginWidth - moveX);
          height = getSizeWithinRange(elOriginHeight + moveY);
          left = elOriginLeft - (width - elOriginWidth);
        } else if (command === OperateResizeHandlers.LEFT_TOP) {
          // const { offsetX, offsetY } = alignedAdsorption(elOriginLeft + moveX, elOriginTop + moveY);
          moveX = moveX - offsetX;
          moveY = moveY - offsetY;
          if (fixedRatio) {
            if (offsetY) moveX = moveY * aspectRatio;
            else moveY = moveX / aspectRatio;
          }
          width = getSizeWithinRange(elOriginWidth - moveX);
          height = getSizeWithinRange(elOriginHeight - moveY);
          left = elOriginLeft - (width - elOriginWidth);
          top = elOriginTop - (height - elOriginHeight);
        } else if (command === OperateResizeHandlers.RIGHT_TOP) {
          // const { offsetX, offsetY } = alignedAdsorption(
          //   elOriginLeft + elOriginWidth + moveX,
          //   elOriginTop + moveY,
          // );
          moveX = moveX - offsetX;
          moveY = moveY - offsetY;
          if (fixedRatio) {
            if (offsetY) moveX = -moveY * aspectRatio;
            else moveY = -moveX / aspectRatio;
          }
          width = getSizeWithinRange(elOriginWidth + moveX);
          height = getSizeWithinRange(elOriginHeight - moveY);
          top = elOriginTop - (height - elOriginHeight);
        } else if (command === OperateResizeHandlers.LEFT) {
          // const { offsetX } = alignedAdsorption(elOriginLeft + moveX, null);
          moveX = moveX - offsetX;
          width = getSizeWithinRange(elOriginWidth - moveX);
          left = elOriginLeft - (width - elOriginWidth);
        } else if (command === OperateResizeHandlers.RIGHT) {
          // const { offsetX } = alignedAdsorption(elOriginLeft + elOriginWidth + moveX, null);
          moveX = moveX - offsetX;
          width = getSizeWithinRange(elOriginWidth + moveX);
        } else if (command === OperateResizeHandlers.TOP) {
          // const { offsetY } = alignedAdsorption(null, elOriginTop + moveY);
          moveY = moveY - offsetY;
          height = getSizeWithinRange(elOriginHeight - moveY);
          top = elOriginTop - (height - elOriginHeight);
        } else if (command === OperateResizeHandlers.BOTTOM) {
          // const { offsetY } = alignedAdsorption(null, elOriginTop + elOriginHeight + moveY);
          moveY = moveY - offsetY;
          height = getSizeWithinRange(elOriginHeight + moveY);
        }
      }
      setStyle({ width: width, height: height, left: left, top: top });
    };
  };
  const setStyle = ({ height, width, left, top, right, bottom }) => {
    height && (elRef.value.style.height = height + 'px');
    width && (elRef.value.style.width = width + 'px');
    left && (elRef.value.style.left = left + 'px');
    top && (elRef.value.style.top = top + 'px');
    right && (elRef.value.style.right = right + 'px');
    bottom && (elRef.value.style.bottom = bottom + 'px');
  };

  return {
    resizeHandlers,
    textElementResizeHandlers,
    borderLines,
    scaleElement,
    setStyle,
  };
}
