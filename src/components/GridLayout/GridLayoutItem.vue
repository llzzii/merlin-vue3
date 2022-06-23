<script setup lang="ts">
  import { inject, getCurrentInstance, onMounted, reactive, ref, watchEffect, unref } from 'vue';
  import { useGridItem } from './helpers/gridItem';
  import { useGridItemWatchs } from './helpers/itemWatchs';
  import { gridEmitter } from './helpers/utils';
  import { ItemProps, ItemState } from './types';
  const gridItem = ref<HTMLElement | null>(null);
  const handle = ref<HTMLElement | null>(null);
  const props = withDefaults(
    defineProps<{
      static?: boolean;
      minH?: number;
      minW?: number;
      maxH?: number;
      maxW?: number;
      isDraggable?: boolean;
      isResizable?: boolean;
      x: number;
      y: number;
      w: number;
      h: number;
      i?: number | string;
      dragIgnoreFrom?: string;
      dragAllowFrom?: string;
      resizeIgnoreFrom?: string;
      preserveAspectRatio?: boolean;
    }>(),
    {
      static: false,
      minH: 1,
      minW: 1,
      maxH: Infinity,
      maxW: Infinity,
      isDraggable: true,
      isResizable: true,
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      i: 0,
      dragIgnoreFrom: 'a, button',
      dragAllowFrom: '',
      resizeIgnoreFrom: 'a, button',
      preserveAspectRatio: false,
    },
  );
  const state = reactive<ItemState>({
    cols: 12,
    containerWidth: 100,
    rowHeight: 30,
    margin: [10, 10],
    maxRows: Infinity,
    draggable: null,
    resizable: null,
    useCssTransforms: true,
    useStyleCursor: true,

    isDragging: false,
    dragging: {},
    isResizing: false,
    resizing: {},
    lastX: NaN,
    lastY: NaN,
    lastW: NaN,
    lastH: NaN,
    style: {},
    rtl: false,

    dragEventSet: false,
    resizeEventSet: false,
    layout: null,
    previousW: undefined,
    previousH: undefined,
    previousX: undefined,
    previousY: undefined,
    innerX: props.x,
    innerY: props.y,
    innerW: props.w,
    innerH: props.h,
    interactObj: null,
  });

  const { updateStyle, resizableAndNotStatic, resizableHandleClass, classObj } = useGridItem(
    state,
    props,
    gridItem,
  );
  const { init } = useGridItemWatchs(state, props, gridItem);

  init();
  let parent: any = inject('layoutInstance');
  // watchEffect(() => {
  //   if (props.i === '4') {
  //     console.log('state.style', state.style);
  //   }
  //   // if (parent && parent.value) {
  //   //   state.rowHeight = unref(parent).props.rowHeight;
  //   //   state.containerWidth = unref(parent).props.width !== null ? unref(parent).props.width : 100;
  //   //   state.margin =
  //   //     unref(parent).props.margin !== undefined ? unref(parent).props.margin : [10, 10];
  //   //   state.maxRows = unref(parent).props.maxRows;
  //   //   if (props.isDraggable == null) {
  //   //     state.draggable = unref(parent).props.isDraggable;
  //   //   } else {
  //   //     state.draggable = props.isDraggable;
  //   //   }
  //   //   if (props.isResizable === null) {
  //   //     state.resizable = unref(parent).props.isResizable;
  //   //   } else {
  //   //     state.resizable = props.isResizable;
  //   //   }
  //   //   state.useCssTransforms = unref(parent).props.useCssTransforms;
  //   //   style();
  //   // }
  // });
  gridEmitter.on('layoutInstance', (parent) => {
    // console.log('layoutInstance', parent);
    if (parent && parent.value) {
      state.rowHeight = unref(parent).props.rowHeight;
      state.containerWidth = unref(parent).props.width !== null ? unref(parent).props.width : 100;
      state.margin =
        unref(parent).props.margin !== undefined ? unref(parent).props.margin : [10, 10];
      state.maxRows = unref(parent).props.maxRows;
      if (props.isDraggable == null) {
        state.draggable = unref(parent).props.isDraggable;
      } else {
        state.draggable = props.isDraggable;
      }
      console.log(
        '🚀 ~ file: GridLayoutItem.vue ~ line 126 ~ gridEmitter.on ~ state.draggable',
        state.draggable,
      );

      if (props.isResizable === null) {
        state.resizable = unref(parent).props.isResizable;
      } else {
        state.resizable = props.isResizable;
      }
      state.useCssTransforms = unref(parent).props.useCssTransforms;
      state.layout = { ...unref(parent).props, ...unref(parent).props.state };
      updateStyle();
    }
  });

  onMounted(() => {
    updateStyle();
  });
</script>

<template>
  <div ref="gridItem" class="grid-item" :style="state.style" :class="classObj">
    <slot></slot>

    <span v-if="resizableAndNotStatic" ref="handle" :class="resizableHandleClass"></span>
    <!-- :class="classObj" :style="style" -->
    <!--<span v-if="draggable" ref="dragHandle" class="draggable-handle"></span>-->
  </div>
</template>
<style lang="less" scoped>
  .grid-item {
    transition: all 200ms ease;
    transition-property: left, top, right;
    /* add right for rtl */
  }

  .grid-item.no-touch {
    -ms-touch-action: none;
    touch-action: none;
  }

  .grid-item.cssTransforms {
    transition-property: transform;
    left: 0;
    right: auto;
  }

  .grid-item.cssTransforms.render-rtl {
    left: auto;
    right: 0;
  }

  .grid-item.resizing {
    opacity: 0.6;
    z-index: 3;
  }

  .grid-item.draggable-dragging {
    transition: none;
    z-index: 3;
  }

  .grid-item.grid-placeholder {
    background: red;
    opacity: 0.2;
    transition-duration: 100ms;
    z-index: 2;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
  }

  .grid-item > .grid-resizable-handle {
    position: absolute;
    width: 20px;
    height: 20px;
    bottom: 0;
    right: 0;
    background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg08IS0tIEdlbmVyYXRvcjogQWRvYmUgRmlyZXdvcmtzIENTNiwgRXhwb3J0IFNWRyBFeHRlbnNpb24gYnkgQWFyb24gQmVhbGwgKGh0dHA6Ly9maXJld29ya3MuYWJlYWxsLmNvbSkgLiBWZXJzaW9uOiAwLjYuMSAgLS0+DTwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DTxzdmcgaWQ9IlVudGl0bGVkLVBhZ2UlMjAxIiB2aWV3Qm94PSIwIDAgNiA2IiBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmMDAiIHZlcnNpb249IjEuMSINCXhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiDQl4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjZweCIgaGVpZ2h0PSI2cHgiDT4NCTxnIG9wYWNpdHk9IjAuMzAyIj4NCQk8cGF0aCBkPSJNIDYgNiBMIDAgNiBMIDAgNC4yIEwgNCA0LjIgTCA0LjIgNC4yIEwgNC4yIDAgTCA2IDAgTCA2IDYgTCA2IDYgWiIgZmlsbD0iIzAwMDAwMCIvPg0JPC9nPg08L3N2Zz4=');
    background-position: bottom right;
    padding: 0 3px 3px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: se-resize;
  }

  .grid-item > .grid-rtl-resizable-handle {
    bottom: 0;
    left: 0;
    background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAuMDAwMDAwMDAwMDAwMDAyIiBoZWlnaHQ9IjEwLjAwMDAwMDAwMDAwMDAwMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KIDwhLS0gQ3JlYXRlZCB3aXRoIE1ldGhvZCBEcmF3IC0gaHR0cDovL2dpdGh1Yi5jb20vZHVvcGl4ZWwvTWV0aG9kLURyYXcvIC0tPgogPGc+CiAgPHRpdGxlPmJhY2tncm91bmQ8L3RpdGxlPgogIDxyZWN0IGZpbGw9Im5vbmUiIGlkPSJjYW52YXNfYmFja2dyb3VuZCIgaGVpZ2h0PSIxMiIgd2lkdGg9IjEyIiB5PSItMSIgeD0iLTEiLz4KICA8ZyBkaXNwbGF5PSJub25lIiBvdmVyZmxvdz0idmlzaWJsZSIgeT0iMCIgeD0iMCIgaGVpZ2h0PSIxMDAlIiB3aWR0aD0iMTAwJSIgaWQ9ImNhbnZhc0dyaWQiPgogICA8cmVjdCBmaWxsPSJ1cmwoI2dyaWRwYXR0ZXJuKSIgc3Ryb2tlLXdpZHRoPSIwIiB5PSIwIiB4PSIwIiBoZWlnaHQ9IjEwMCUiIHdpZHRoPSIxMDAlIi8+CiAgPC9nPgogPC9nPgogPGc+CiAgPHRpdGxlPkxheWVyIDE8L3RpdGxlPgogIDxsaW5lIGNhbnZhcz0iI2ZmZmZmZiIgY2FudmFzLW9wYWNpdHk9IjEiIHN0cm9rZS1saW5lY2FwPSJ1bmRlZmluZWQiIHN0cm9rZS1saW5lam9pbj0idW5kZWZpbmVkIiBpZD0ic3ZnXzEiIHkyPSItNzAuMTc4NDA3IiB4Mj0iMTI0LjQ2NDE3NSIgeTE9Ii0zOC4zOTI3MzciIHgxPSIxNDQuODIxMjg5IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlPSIjMDAwIiBmaWxsPSJub25lIi8+CiAgPGxpbmUgc3Ryb2tlPSIjNjY2NjY2IiBzdHJva2UtbGluZWNhcD0idW5kZWZpbmVkIiBzdHJva2UtbGluZWpvaW49InVuZGVmaW5lZCIgaWQ9InN2Z181IiB5Mj0iOS4xMDY5NTciIHgyPSIwLjk0NzI0NyIgeTE9Ii0wLjAxODEyOCIgeDE9IjAuOTQ3MjQ3IiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiLz4KICA8bGluZSBzdHJva2UtbGluZWNhcD0idW5kZWZpbmVkIiBzdHJva2UtbGluZWpvaW49InVuZGVmaW5lZCIgaWQ9InN2Z183IiB5Mj0iOSIgeDI9IjEwLjA3MzUyOSIgeTE9IjkiIHgxPSItMC42NTU2NCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiM2NjY2NjYiIGZpbGw9Im5vbmUiLz4KIDwvZz4KPC9zdmc+);
    background-position: bottom left;
    padding-left: 3px;
    background-repeat: no-repeat;
    background-origin: content-box;
    cursor: sw-resize;
    right: auto;
  }

  .grid-item.disable-userselect {
    user-select: none;
  }
</style>
