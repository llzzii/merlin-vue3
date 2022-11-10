import { ItemProps } from './../types';
import { watch, nextTick } from 'vue';
import { ItemProps, ItemState } from '../types';
import { getDocumentDir } from './DOM';
import { useGridItem } from './gridItem';
import { compact, gridEmitter } from './utils';

export function useGridItemWatchs(itemState: ItemState, itemProps: ItemProps, gridItem) {
  const { renderRtl, updateStyle, tryMakeResizable, emitContainerResized, tryMakeDraggable } =
    useGridItem(itemState, itemProps, gridItem);

  const init = () => {
    watch(
      () => [itemProps.x, itemProps.y, itemProps.h, itemProps.w],
      ([x, y, h, w]) => {
        console.log(123);
        itemState.innerY = y;
        itemState.innerX = x;
        itemState.innerH = h;
        itemState.innerW = w;
        updateStyle();
      },
    );

    watch(
      () => [itemState.containerWidth, itemState.cols],
      ([w, c]) => {
        updateStyle();
        tryMakeResizable();
        emitContainerResized();
      },
    );
    watch(
      () => [itemProps.minH, itemProps.maxH, itemProps.minW, itemProps.maxW],
      ([w, c]) => {
        tryMakeResizable();
      },
    );

    watch(
      () => itemProps.isDraggable,
      (n) => {
        itemState.draggable = n;
      },
    );

    watch(
      () => itemProps.static,
      () => {
        tryMakeDraggable();
        tryMakeResizable();
      },
    );
    watch(
      () => itemState.draggable,
      () => {
        tryMakeDraggable();
      },
    );
    watch(
      () => itemProps.isResizable,
      (n) => {
        itemState.resizable = n;
      },
    );
    watch(
      () => itemState.resizable,
      () => {
        tryMakeResizable();
      },
    );

    watch(
      () => itemState.rowHeight,
      () => {
        updateStyle();
        emitContainerResized();
      },
    );

    watch(
      () => renderRtl,
      () => {
        updateStyle();
        tryMakeResizable();
      },
    );
    gridEmitter.on('setMargin', (margin) => {
      if (!margin || (margin[0] == itemState.margin[0] && margin[1] == itemState.margin[1])) {
        return;
      }
      itemState.margin = margin.map((m) => Number(m));
      updateStyle();
      emitContainerResized();
    });
    gridEmitter.on('containerWidth', (data) => {
      console.log("🚀 ~ file: itemWatchs.ts ~ line 97 ~ gridEmitter.on ~ data", data)
      itemState.containerWidth = data;
      updateStyle();
    });

    gridEmitter.on('setColNum', (data) => {
      itemState.cols = parseInt(data);
      // console.log('🚀 ~ file: itemWatchs.ts ~ line 101 ~ gridEmitter.on ~ data', data);
    });

    gridEmitter.on('compact', (data) => {
      if (itemProps.i === '4') {
        console.log(
          '🚀 ~ file: itemWatchs.ts ~ line 107 ~ gridEmitter.on ~ compact',
          itemProps,
          data,
        );
      }
      nextTick(() => {
        updateStyle();
      });
    });
    gridEmitter.on('setDraggable', (data) => {
      if (itemProps.isDraggable === null) {
        itemState.draggable = data;
      }
    });
    gridEmitter.on('setResizable', (data) => {
      if (itemProps.isResizable === null) {
        itemState.resizable = data;
      }
    });
    gridEmitter.on('setRowHeight', (data) => {
      itemState.rowHeight = parseInt(data);
    });
    gridEmitter.on('setMaxRows', (data) => {
      itemState.maxRows = data;
    });
    gridEmitter.on('directionchange', (data) => {
      itemState.rtl = getDocumentDir() === 'rtl';
      updateStyle();
    });
  };
  return { init };
}
