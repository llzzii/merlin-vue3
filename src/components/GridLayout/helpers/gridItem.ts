import { isClient } from '../../../utils/is';
import interact from 'interactjs';
import { computed, watch, unref } from 'vue';
import { createCoreData, getControlPosition } from './draggableUtils';
import { setTopLeft, setTopRight, setTransform, setTransformRtl, gridEmitter } from './utils';
import { ItemState, ItemProps } from '../types';

export function useGridItem(itemState: ItemState, itemProps: ItemProps, gridItem) {
  
  const renderRtl = computed(() => {
    const x = itemState.layout?.isMirrored ? !itemState.rtl : itemState.rtl;
    return x;
  });
  const resizableAndNotStatic = computed(() => {
    return itemState.resizable && !itemProps.static;
  });
  const resizableHandleClass = computed(() => {
    if (renderRtl.value) {
      return 'grid-resizable-handle grid-rtl-resizable-handle';
    } else {
      return 'grid-resizable-handle';
    }
  });
  const classObj = computed(() => {
    return {
      'vue-resizable': resizableAndNotStatic,
      static: itemProps.static,
      resizing: itemState.isResizing,
      'vue-draggable-dragging': itemState.isDragging,
      cssTransforms: itemState.useCssTransforms,
      'render-rtl': renderRtl.value,
      'disable-userselect': itemState.isDragging,
    };
  });
  const updateStyle = () => {
    if (itemProps.x + itemProps.w > (itemState.cols as number)) {
      itemState.innerX = 0;
      itemState.innerW = itemProps.w > (itemState.cols as number) ? itemState.cols : itemProps.w;
    } else {
      itemState.innerX = itemProps.x;
      itemState.innerW = itemProps.w;
    }

    const pos = calcPosition(
      itemState.innerX,
      itemState.innerY,
      itemState.innerW,
      itemState.innerH,
    );
    // console.log('🚀 ~ file: gridItem.ts ~ line 23 ~ style ~ pos', pos);

    if (itemState.isDragging) {
      pos.top = itemState.dragging.top;
      //                    Add rtl support
      if (renderRtl.value) {
        pos.right = itemState.dragging.left;
      } else {
        pos.left = itemState.dragging.left;
      }
    }
    if (itemState.isResizing) {
      pos.width = itemState.resizing.width;
      pos.height = itemState.resizing.height;
    }

    let style;
    // CSS Transforms support (default)
    if (itemState.useCssTransforms) {
      //                    Add rtl support
      if (renderRtl.value) {
        style = setTransformRtl(pos.top, pos.right, pos.width, pos.height);
      } else {
        style = setTransform(pos.top, pos.left, pos.width, pos.height);
      }
    } else {
      // top,left (slow)
      //                    Add rtl support
      if (renderRtl.value) {
        style = setTopRight(pos.top, pos.right, pos.width, pos.height);
      } else {
        style = setTopLeft(pos.top, pos.left, pos.width, pos.height);
      }
    }
    itemState.style = style;
    if (itemProps.i === '4') {
      console.log(itemProps, '{{{{{{{{{{{[[[', style, itemState.style);
    }
    return style;
  };
  const calcPosition = (x, y, w, h) => {
    const colWidth = calcColWidth();
    // add rtl support
    let out;
    if (renderRtl.value) {
      out = {
        right: Math.round(colWidth * x + (x + 1) * itemState.margin[0]),
        top: Math.round((itemState.rowHeight as number) * y + (y + 1) * itemState.margin[1]),
        // 0 * Infinity === NaN, which causes problems with resize constriants;
        // Fix this if it occurs.
        // Note we do it here rather than later because Math.round(Infinity) causes deopt
        width:
          w === Infinity ? w : Math.round(colWidth * w + Math.max(0, w - 1) * itemState.margin[0]),
        height:
          h === Infinity
            ? h
            : Math.round(
                (itemState.rowHeight as number) * h + Math.max(0, h - 1) * itemState.margin[1],
              ),
      };
    } else {
      out = {
        left: Math.round(colWidth * x + (x + 1) * itemState.margin[0]),
        top: Math.round((itemState.rowHeight as number) * y + (y + 1) * itemState.margin[1]),
        // 0 * Infinity === NaN, which causes problems with resize constriants;
        // Fix this if it occurs.
        // Note we do it here rather than later because Math.round(Infinity) causes deopt
        width:
          w === Infinity ? w : Math.round(colWidth * w + Math.max(0, w - 1) * itemState.margin[0]),
        height:
          h === Infinity
            ? h
            : Math.round(
                (itemState.rowHeight as number) * h + Math.max(0, h - 1) * itemState.margin[1],
              ),
      };
    }

    return out;
  };

  const calcColWidth = (): number => {
    const colWidth =
      ((itemState.containerWidth as number) -
        itemState.margin[0] * ((itemState.cols as number) + 1)) /
      (itemState.cols as number);

    return colWidth;
  };
  const tryMakeResizable = () => {

    if (itemState.interactObj == null&&unref(gridItem)!=null) {
     
      itemState.interactObj = interact(unref(gridItem));
    }

    if (itemState.resizable && !itemProps.static) {
      const maximum = calcPosition(0, 0, itemProps.maxW, itemProps.maxH);
      const minimum = calcPosition(0, 0, itemProps.minW, itemProps.minH);
      const opts = {
        preserveAspectRatio: true,
        // allowFrom: "." + this.resizableHandleClass,
        edges: {
          left: false,
          right: '.' + resizableHandleClass.value,
          bottom: '.' + resizableHandleClass.value,
          top: false,
        },
        ignoreFrom: itemProps.resizeIgnoreFrom,
        restrictSize: {
          min: {
            height: minimum.height,
            width: minimum.width,
          },
          max: {
            height: maximum.height,
            width: maximum.width,
          },
        },
      };
      itemState.interactObj?.resizable(opts);

      if (!itemState.resizeEventSet) {
        itemState.resizeEventSet = true;
        itemState.interactObj.on('resizestart resizemove resizeend', function (event) {
          handleResize(event);
        });
      }
    } else {
      itemState?.interactObj?.resizable({
        enabled: false,
      });
    }
  };
  const handleResize = (event: MouseEvent) => {
    if (itemProps.static) return;
    const position = getControlPosition(event);
    if (position == null) return; // not possible but satisfies flow
    const { x, y } = position;

    const newSize = { width: 0, height: 0 };
    let pos: any;
    switch (event.type) {
      case 'resizestart':
        itemState.previousW = itemState.innerW;
        itemState.previousH = itemState.innerH;
        pos = calcPosition(itemState.innerX, itemState.innerY, itemState.innerW, itemState.innerH);
        newSize.width = pos.width;
        newSize.height = pos.height;
        itemState.resizing = newSize;
        itemState.isResizing = true;
        break;
      case 'resizemove':
        const coreEvent = createCoreData(
          itemState.lastW as number,
          itemState.lastH as number,
          x,
          y,
        );
        if (renderRtl.value) {
          newSize.width = itemState.resizing.width - coreEvent.deltaX;
        } else {
          newSize.width = itemState.resizing.width + coreEvent.deltaX;
        }
        newSize.height = itemState.resizing.height + coreEvent.deltaY;
        itemState.resizing = newSize;
        break;
      case 'resizeend':
        pos = calcPosition(itemState.innerX, itemState.innerY, itemState.innerW, itemState.innerH);
        newSize.width = pos.width;
        newSize.height = pos.height;
        itemState.resizing = null;
        itemState.isResizing = false;
        break;
    }
    pos = calcWH(newSize.height, newSize.width);
    if (pos.w < (itemProps.minW as number)) {
      pos.w = itemProps.minW;
    }
    pos.w > (itemProps.maxW as number) && (pos.w = itemProps.maxW);
    pos.h < (itemProps.minH as number) && (pos.h = itemProps.minH);
    pos.h > (itemProps.maxH as number) && (pos.h = itemProps.maxH);
    pos.h < 1 && (pos.h = 1);
    pos.w < 1 && (pos.w = 1);
    if (itemState.innerW !== pos.w || itemState.innerH !== pos.h) {
      gridEmitter.emit('resize', {
        i: itemProps.i,
        x: pos.h,
        y: pos.w,
        h: newSize.height,
        w: newSize.width,
      });
    }
    if (
      event.type === 'resizeend' &&
      (itemState.previousW !== itemState.innerW || itemState.previousH !== itemState.innerH)
    ) {
      gridEmitter.emit('resized', {
        i: itemProps.i,
        x: pos.h,
        y: pos.w,
        h: newSize.height,
        w: newSize.width,
      });
    }
    console.log(2);
    gridEmitter.emit('resizeEvent', {
      eventType: event.type,
      i: itemProps.i,
      x: itemState.innerX,
      y: itemState.innerY,
      h: pos.h,
      w: pos.w,
    });
  };

  const emitContainerResized = () => {
    const styleProps: { height: number; width: number } = {} as { height: number; width: number };
    for (const prop of ['width', 'height']) {
      const val = itemState.style[prop];
      const matches = val.match(/^(\d+)px$/);
      if (!matches) return;
      styleProps[prop] = matches[1];
    }
    gridEmitter.emit('container-resized', {
      i: itemProps.i,
      x: itemProps.h,
      y: itemProps.w,
      h: styleProps.height,
      w: styleProps.width,
    });
  };
  const calcWH = (height: number, width: number, autoSizeFlag = false) => {
    const colWidth = calcColWidth();
    let w = Math.round((width + itemState.margin[0]) / (colWidth + itemState.margin[0]));
    let h = 0;
    if (autoSizeFlag) {
      h = Math.round(
        (height + itemState.margin[1]) / ((itemState.rowHeight as number) + itemState.margin[1]),
      );
    } else {
      h = Math.ceil(
        (height + itemState.margin[1]) / ((itemState.rowHeight as number) + itemState.margin[1]),
      );
    }
    w = Math.max(Math.min(w, (itemState.cols as number) - (itemState.innerX as number)), 0);
    h = Math.max(Math.min(h, (itemState.maxRows as number) - (itemState.innerY as number)), 0);

    return { w, h };
  };
  const calcXY = (top: number, left: number) => {
    const colWidth = calcColWidth();

    // left = colWidth * x + margin * (x + 1)
    // l = cx + m(x+1)
    // l = cx + mx + m
    // l - m = cx + mx
    // l - m = x(c + m)
    // (l - m) / (c + m) = x
    // x = (left - margin) / (coldWidth + margin)
    let x = Math.round((left - itemState.margin[0]) / (colWidth + itemState.margin[0]));
    let y = Math.round(
      (top - itemState.margin[1]) / ((itemState.rowHeight as number) + itemState.margin[1]),
    );

    // Capping
    x = Math.max(Math.min(x, (itemState.cols as number) - (itemState.innerW as number)), 0);
    y = Math.max(Math.min(y, (itemState.maxRows as number) - (itemState.innerH as number)), 0);

    return { x, y };
  };
  const tryMakeDraggable = () => {
    if (itemState.interactObj == null) {
      itemState.interactObj = interact(unref(gridItem));
    }
    if (itemState.draggable && !itemProps.static) {
      const opts = {
        ignoreFrom: itemProps.dragIgnoreFrom,
        allowFrom: itemProps.dragAllowFrom,
      };
      itemState.interactObj.draggable(opts);
      /*this.interactObj.draggable({allowFrom: '.vue-draggable-handle'});*/
      if (!itemState.dragEventSet) {
        itemState.dragEventSet = true;
        itemState.interactObj.on('dragstart dragmove dragend', function (event) {
          handleDrag(event);
        });
      }
    } else {
      itemState.interactObj.draggable({
        enabled: false,
      });
    }
  };
  const handleDrag = (event: MouseEvent) => {
    if (itemProps.static) return;
    if (itemState.isResizing) return;

    const position = getControlPosition(event);

    // Get the current drag point from the event. This is used as the offset.
    if (position === null) return; // not possible but satisfies flow
    const { x, y } = position;

    // let shouldUpdate = false;
    const newPosition = { top: 0, left: 0 };
    const parentRect = (
      (event.target as HTMLElement).offsetParent as HTMLElement
    ).getBoundingClientRect();
    const clientRect = (event.target as HTMLElement).getBoundingClientRect();

    switch (event.type) {
      case 'dragstart': {
        itemState.previousX = itemState.innerX;
        itemState.previousY = itemState.innerY;

        if (renderRtl.value) {
          newPosition.left = (clientRect.right - parentRect.right) * -1;
        } else {
          newPosition.left = clientRect.left - parentRect.left;
        }
        newPosition.top = clientRect.top - parentRect.top;
        itemState.dragging = newPosition;
        itemState.isDragging = true;
        break;
      }
      case 'dragend': {
        if (!itemState.isDragging) return;
        //                        Add rtl support
        if (renderRtl.value) {
          newPosition.left = (clientRect.right - parentRect.right) * -1;
        } else {
          newPosition.left = clientRect.left - parentRect.left;
        }
        newPosition.top = clientRect.top - parentRect.top;
        itemState.dragging = null;
        itemState.isDragging = false;
        // shouldUpdate = true;
        break;
      }
      case 'dragmove': {
        const coreEvent = createCoreData(
          itemState.lastX as number,
          itemState.lastY as number,
          x,
          y,
        );
        //                        Add rtl support
        if (renderRtl.value) {
          newPosition.left = itemState.dragging.left - coreEvent.deltaX;
        } else {
          newPosition.left = itemState.dragging.left + coreEvent.deltaX;
        }
        newPosition.top = itemState.dragging.top + coreEvent.deltaY;
        itemState.dragging = newPosition;
        break;
      }
    }

    // Get new XY
    let pos;
    if (renderRtl.value) {
      pos = calcXY(newPosition.top, newPosition.left);
    } else {
      pos = calcXY(newPosition.top, newPosition.left);
    }

    itemState.lastX = x;
    itemState.lastY = y;

    if (itemState.innerX !== pos.x || itemState.innerY !== pos.y) {
      gridEmitter.emit('move', { i: itemProps.i, x: pos.x, y: pos.y });
    }
    if (
      event.type === 'dragend' &&
      (itemState.previousX !== itemState.innerX || itemState.previousY !== itemState.innerY)
    ) {
      gridEmitter.emit('moved', { i: itemProps.i, x: pos.x, y: pos.y });
    }
    gridEmitter.emit('dragEvent', {
      eventType: event.type,
      i: itemProps.i,
      x: pos.x,
      y: pos.y,
      h: itemState.innerH,
      w: itemState.innerW,
    });
  };
  return {
    renderRtl,
    updateStyle,
    emitContainerResized,
    tryMakeResizable,
    tryMakeDraggable,
    resizableAndNotStatic,
    resizableHandleClass,
    classObj,
  };
}
