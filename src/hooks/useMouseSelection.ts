import { Ref, ref } from 'vue';

export const useMouseSelection = (viewportRef: Ref<HTMLElement | undefined>) => {
  const mouseSelectionVisible = ref(false);
  const mouseSelectionQuadrant = ref(1);
  const mouseSelection = ref({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const updateMouseSelection = (e: MouseEvent) => {
    if (!viewportRef.value) return;

    let isMouseDown = true;
    const viewportRect = viewportRef.value.getBoundingClientRect();

    const minSelectionRange = 5;

    const startPageX = e.pageX;
    const startPageY = e.pageY;

    const left = startPageX - viewportRect.x;
    const top = startPageY - viewportRect.y;
    // 确定框选的起始位置和其他默认值初始化
    mouseSelection.value = {
      top: top,
      left: left,
      width: 0,
      height: 0,
    };
    mouseSelectionVisible.value = false;
    mouseSelectionQuadrant.value = 4;
    document.onmousemove = (event) => {
      if (!isMouseDown) return;

      const currentPageX = event.pageX;
      const currentPageY = event.pageY;
      const offsetWidth = currentPageX - startPageX;
      const offsetHeight = currentPageY - startPageY;
      const width = Math.abs(offsetWidth);
      const height = Math.abs(offsetHeight);
      if (width < minSelectionRange || height < minSelectionRange) return;
      // 计算鼠标框选（移动）的方向
      // 按四个象限的位置区分，如右下角为第四象限
      let quadrant = 0;
      if (offsetWidth > 0 && offsetHeight > 0) quadrant = 4;
      else if (offsetWidth < 0 && offsetHeight < 0) quadrant = 1;
      else if (offsetWidth > 0 && offsetHeight < 0) quadrant = 2;
      else if (offsetWidth < 0 && offsetHeight > 0) quadrant = 3;

      // 更新框选范围
      mouseSelection.value = {
        ...mouseSelection.value,
        width: width,
        height: height,
      };
      mouseSelectionVisible.value = true;
      mouseSelectionQuadrant.value = quadrant;
    };
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      isMouseDown = false;

      mouseSelectionVisible.value = false;
    };
  };

  return { updateMouseSelection, mouseSelectionVisible, mouseSelection, mouseSelectionQuadrant };
};
