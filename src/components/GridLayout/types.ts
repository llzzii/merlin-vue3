export type LayoutItemRequired = { w: number; h: number; x: number; y: number; i: string };
export type LayoutItem = LayoutItemRequired & {
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
  moved?: boolean;
  static?: boolean;
  isDraggable?: boolean;
  isResizable?: boolean;
};
export type Layout = Array<LayoutItem>;
// export type Position = {left: number, top: number, width: number, height: number};
/*
export type DragCallbackData = {
  node: HTMLElement,
  x: number, y: number,
  deltaX: number, deltaY: number,
  lastX: number, lastY: number
};
*/
// export type DragEvent = {e: Event} & DragCallbackData;
export type Size = { width: number; height: number };
export interface ItemState {
  cols?: number;
  containerWidth?: number;
  rowHeight?: number;
  margin: Array<number>;
  maxRows?: number;
  draggable: any;
  resizable: any;
  useCssTransforms: boolean;
  useStyleCursor: boolean;

  isDragging: boolean;
  dragging: any;
  isResizing: boolean;
  resizing: any;
  lastX?: number;
  lastY?: number;
  lastW?: number;
  lastH?: number;
  style: any;
  rtl: boolean;

  dragEventSet: boolean;
  resizeEventSet: boolean;
  layout: any;
  previousW?: number;
  previousH?: number;
  previousX?: number;
  previousY?: number;
  innerX?: number;
  innerY?: number;
  innerW?: number;
  innerH?: number;
  interactObj?: any;
}
export interface ItemProps {
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
}

export interface LayoutProps {
  autoSize?: boolean;
  colNum?: number;
  rowHeight?: number;
  maxRows?: number;
  margin?: Array<any>;
  isDraggable?: boolean;
  isResizable?: boolean;
  isMirrored?: boolean;
  useCssTransforms?: boolean;
  verticalCompact?: boolean;
  layout: Array<any>;
  responsive?: boolean;
  responsiveLayouts?: Object;
  breakpoints?: Object;
  cols?: Object;
  useStyleCursor?: boolean;
  preventCollision?: boolean;
}

export interface LayoutSate {
  width: number | undefined;
  mergedStyle: {};
  lastLayoutLength: number;
  isDragging: boolean;
  placeholder: {
    x: number;
    y: number;
    w: number;
    h: number;
    i: string;
  };
  layouts: any; // array to store all layouts from different breakpoints
  lastBreakpoint: any;
  originalLayout: Array<any>;
}
