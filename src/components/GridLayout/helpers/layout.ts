import { nextTick, ref, unref, watch } from 'vue';
import {
  validateLayout,
  compact,
  bottom,
  gridEmitter,
  getLayoutItem,
  getAllCollisions,
  cloneLayout,
  moveElement,
} from './utils';
import elementResizeDetectorMaker from 'element-resize-detector';
import { LayoutItem, LayoutProps, LayoutSate } from '../types';
import {
  findOrGenerateResponsiveLayout,
  getBreakpointFromWidth,
  getColsFromBreakpoint,
} from './responsiveUtils';

export function useGridLayout(
  layoutState: LayoutSate,
  layoutProps: LayoutProps,
  gridContainer,
  emits?,
) {
  const findDifference = (layout, originalLayout) => {
    const uniqueResultOne = layout.filter(function (obj) {
      return !originalLayout.some(function (obj2) {
        return obj.i === obj2.i;
      });
    });

    //Find values that are in result2 but not in result1
    const uniqueResultTwo = originalLayout.filter(function (obj) {
      return !layout.some(function (obj2) {
        return obj.i === obj2.i;
      });
    });

    //Combine the two arrays of unique entries#
    return uniqueResultOne.concat(uniqueResultTwo);
  };
  const initResponsiveFeatures = () => {
    // clear layouts
    layoutState.layouts = Object.assign({}, layoutProps.responsiveLayouts);
  };
  const updateHeight = () => {
    if (!layoutProps.autoSize) return;
    // console.log("bottom: " + bottom(this.layout))
    // console.log("rowHeight + margins: " + (this.rowHeight + this.margin[1]) + this.margin[1])
    const containerHeight =
      bottom(layoutProps.layout) * (layoutProps.rowHeight + (layoutProps.margin as any)[1]) +
      (layoutProps.margin as any)[1] +
      'px';
    layoutState.mergedStyle = {
      height: containerHeight,
    };
  };

  const responsiveGridLayout = () => {
    const newBreakpoint = getBreakpointFromWidth(
      layoutProps.breakpoints,
      layoutState.width as number,
    );
    const newCols = getColsFromBreakpoint(newBreakpoint, layoutProps.cols);

    // save actual layout in layouts
    if (layoutState.lastBreakpoint != null && !layoutState.layouts[layoutState.lastBreakpoint])
      layoutState.layouts[layoutState.lastBreakpoint] = cloneLayout(layoutProps.layout);
    console.log(111);

    // Find or generate a new layout.
    const layout = findOrGenerateResponsiveLayout(
      layoutState.originalLayout,
      layoutState.layouts,
      layoutProps.breakpoints,
      newBreakpoint,
      layoutState.lastBreakpoint,
      newCols,
      layoutProps.verticalCompact,
    );

    // Store the new layout.
    layoutState.layouts[newBreakpoint] = layout;

    if (layoutState.lastBreakpoint !== newBreakpoint) {
      gridEmitter.emit('breakpoint-changed', { newBreakpoint, layout });
    }

    // new prop sync
    emits('update:layout', layout);
    console.log(
      "🚀 ~ file: layout.ts ~ line 189 ~ responsiveGridLayout ~ emits('update:layout', layout);",
      layout,
    );

    layoutState.lastBreakpoint = newBreakpoint;
    gridEmitter.emit('setColNum', getColsFromBreakpoint(newBreakpoint, layoutProps.cols));
  };

  const onWindowResize = (e?) => {
    if ((unref(gridContainer) as any) != null) {
      layoutState.width = (unref(gridContainer) as any).offsetWidth;
    }
    gridEmitter.emit('containerWidth', layoutState.width);
    gridEmitter.emit('resizeEvent', {});
  };

  const resizeEvent = (eventName?, id?, x?, y?, h?, w?) => {
    let l = getLayoutItem(layoutProps.layout, id);
    if (l == undefined) {
      l = { h: 0, w: 0 } as LayoutItem;
    }
    const collisions = getAllCollisions(layoutProps.layout, { ...l, w, h }).filter(
      (layoutItem) => layoutItem.i !== l?.i,
    );
    const hasCollisions = layoutProps.preventCollision && collisions.length > 0;

    if (hasCollisions) {
      // adjust w && h to maximum allowed space
      let leastX = Infinity,
        leastY = Infinity;
      collisions.forEach((layoutItem) => {
        if (layoutItem.x > l.x) leastX = Math.min(leastX, layoutItem.x);
        if (layoutItem.y > l.y) leastY = Math.min(leastY, layoutItem.y);
      });

      if (Number.isFinite(leastX)) l.w = leastX - l.x;
      if (Number.isFinite(leastY)) l.h = leastY - l.y;
    } else {
      l.w = w;
      l.h = h;
    }
    if (eventName === 'resizestart' || eventName === 'resizemove') {
      layoutState.placeholder.i = id;
      layoutState.placeholder.x = l.x;
      layoutState.placeholder.y = l.y;
      layoutState.placeholder.w = w;
      layoutState.placeholder.h = h;
      nextTick(() => {
        layoutState.isDragging = true;
      });
      //this.$broadcast("updateWidth", this.width);
      gridEmitter.emit('updateWidth', layoutState.width);
    } else {
      nextTick(() => {
        layoutState.isDragging = false;
      });
    }

    if (layoutProps.responsive) responsiveGridLayout();

    compact(layoutProps.layout, layoutProps.verticalCompact);

    gridEmitter.emit('compact');
    updateHeight();

    if (eventName === 'resizeend') gridEmitter.emit('layout-updated', layoutProps.layout);
  };

  const dragEvent = (eventName?, id?, x?, y?, h?, w?) => {
    let l = getLayoutItem(layoutProps.layout, id);
    //GetLayoutItem sometimes returns null object
    if (l === undefined || l === null) {
      l = { x: 0, y: 0 } as LayoutItem;
    }

    if (eventName === 'dragmove' || eventName === 'dragstart') {
      layoutState.placeholder.i = id;
      layoutState.placeholder.x = l.x;
      layoutState.placeholder.y = l.y;
      layoutState.placeholder.w = w;
      layoutState.placeholder.h = h;
      nextTick(() => {
        layoutState.isDragging = true;
      });
      //this.$broadcast("updateWidth", this.width);
      gridEmitter.emit('updateWidth', layoutState.width);
    } else {
      nextTick(() => {
        layoutState.isDragging = false;
      });
    }

    // Move the element to the dragged location.
    const layout = moveElement(layoutProps.layout, l, x, y, true, layoutProps.preventCollision);
    emits('update:layout', layout);

    compact(layoutProps.layout, layoutProps.verticalCompact as boolean);
    // console.log(
    //   '🚀 ~ file: layout.ts ~ line 192 ~ dragEvent ~ layoutProps.layout',
    //   layoutProps.layout,
    // );
    // needed because vue can't detect changes on array element properties
    nextTick(() => {
      gridEmitter.emit('compact');
    });
    updateHeight();
    if (eventName === 'dragend') gridEmitter.emit('layout-updated', layoutProps.layout);
  };
  const layoutUpdate = () => {
    if (layoutProps.layout == null || layoutState.originalLayout == null) return;
    if (layoutProps.layout.length !== layoutState.originalLayout.length) {
      const diff = findDifference(layoutProps.layout, layoutState.originalLayout);
      if (diff.length > 0) {
        // console.log(diff);
        if (layoutProps.layout.length > layoutState.originalLayout.length) {
          layoutState.originalLayout = layoutState.originalLayout.concat(diff);
        } else {
          layoutState.originalLayout = layoutState.originalLayout.filter((obj) => {
            return !diff.some((obj2) => {
              return obj.i === obj2.i;
            });
          });
        }
      }

      layoutState.lastLayoutLength = layoutProps.layout.length;
      initResponsiveFeatures();
    }
    compact(layoutProps.layout, layoutProps.verticalCompact as boolean);
    gridEmitter.emit('updateWidth', layoutState.width);
    updateHeight();
    gridEmitter.emit('layout-updated', layoutProps.layout);
  };
  const init = () => {
    gridEmitter.on('resizeEvent', ({ ...res }) => {
      resizeEvent();
    });

    nextTick(() => {
      validateLayout(layoutProps.layout);
      layoutState.originalLayout = layoutProps.layout;
      onWindowResize();
      initResponsiveFeatures();
      compact(layoutProps.layout, layoutProps.verticalCompact as boolean);
      updateHeight();
      window.addEventListener('resize', onWindowResize);
      layoutState.width = (unref(gridContainer) as any)?.offsetWidth;
      gridEmitter.emit('containerWidth', layoutState.width);
      nextTick(() => {
        const erd = elementResizeDetectorMaker({
          strategy: 'scroll', //<- For ultra performance.
          // See https://github.com/wnr/element-resize-detector/issues/110 about callOnAdd.
          callOnAdd: false,
        });
        erd.listenTo(unref(gridContainer) as any, () => {
          onWindowResize();
        });
      });
    });
  };
  watch(
    () => layoutState.width,
    (n, o) => {
      nextTick(() => {
        gridEmitter.emit('updateWidth', layoutState.width);
        if (o === null) {
          nextTick(() => {
            gridEmitter.emit('layout-ready', layoutProps.layout);
          });
        }
      });
      updateHeight();
    },
  );

  watch(
    () => layoutProps.layout,
    (n, o) => {
      layoutUpdate();
    },
    {
      deep: true,
      immediate: true,
    },
  );
  watch(
    () => layoutProps.colNum,
    (n) => {
      gridEmitter.emit('setColNum', n);
    },
  );
  watch(
    () => layoutProps.rowHeight,
    (n) => {
      gridEmitter.emit('setRowHeight', n);
    },
  );
  watch(
    () => layoutProps.isDraggable,
    (n) => {
      gridEmitter.emit('setDraggable', n);
    },
  );
  watch(
    () => layoutProps.isResizable,
    (n) => {
      gridEmitter.emit('setResizable', n);
    },
  );
  watch(
    () => layoutProps.responsive,
    (n) => {
      if (!n) {
        emits('update:layout', layoutState.originalLayout);
        gridEmitter.emit('setColNum', n);
      }
      onWindowResize();
    },
  );
  watch(
    () => layoutProps.maxRows,
    (n) => {
      gridEmitter.emit('setMaxRows', n);
    },
  );
  watch(
    () => layoutProps.margin,
    (n) => {
      gridEmitter.emit('setMargin', n);
      updateHeight();
    },
  );
  return { init, initResponsiveFeatures, updateHeight, resizeEvent, dragEvent };
}
