<template>
  <div ref="item" class="vue-grid-layout" :style="mergedStyle">
    <slot></slot>
    <grid-item
      class="vue-grid-placeholder"
      v-show="isDragging"
      :x="placeholder.x"
      :y="placeholder.y"
      :w="placeholder.w"
      :h="placeholder.h"
      :i="placeholder.i"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import mitt from 'mitt';
  import elementResizeDetectorMaker from 'element-resize-detector';
  import { bottom, compact, getLayoutItem, moveElement, validateLayout } from '../helpers/utils';
  import GridItem from './GridItem.vue';
  import { addWindowEventListener, removeWindowEventListener } from '../helpers/DOM';

  export default defineComponent({
    name: 'GridLayout',
    components: {
      GridItem,
    },
    provide() {
      return {
        eventBus: this.eventBus,
      };
    },
    props: {
      // If true, the container height swells and contracts to fit contents
      autoSize: {
        type: Boolean,
        default: true,
      },
      colNum: {
        type: Number,
        default: 12,
      },
      rowHeight: {
        type: Number,
        default: 150,
      },
      maxRows: {
        type: Number,
        default: Infinity,
      },
      margin: {
        type: Array,
        default: function () {
          return [10, 10];
        },
      },
      isDraggable: {
        type: Boolean,
        default: true,
      },
      isResizable: {
        type: Boolean,
        default: true,
      },
      isMirrored: {
        type: Boolean,
        default: false,
      },
      useCssTransforms: {
        type: Boolean,
        default: true,
      },
      verticalCompact: {
        type: Boolean,
        default: true,
      },
      layout: {
        type: Array,
        required: true,
      },
    },
    data: function () {
      return {
        eventBus: mitt(),
        width: null,
        mergedStyle: {},
        lastLayoutLength: 0,
        isDragging: false,
        placeholder: {
          x: 0,
          y: 0,
          w: 0,
          h: 0,
          i: -1,
        },
      };
    },
    watch: {
      width: function () {
        this.$nextTick(() => {
          //this.$broadcast("updateWidth", this.width);
          this.eventBus.emit('updateWidth', this.width);
          this.updateHeight();
        });
      },
      layout: function () {
        this.layoutUpdate();
      },
      colNum: function (val) {
        this.eventBus.emit('setColNum', val);
      },
      rowHeight: function () {
        this.eventBus.emit('setRowHeight', this.rowHeight);
      },
      isDraggable: function () {
        this.eventBus.emit('setDraggable', this.isDraggable);
      },
      isResizable: function () {
        this.eventBus.emit('setResizable', this.isResizable);
      },
    },
    created() {
      const self = this;

      // Accessible refernces of functions for removing in beforeDestroy
      self.resizeEventHandler = function (eventType, i, x, y, h, w) {
        self.resizeEvent(eventType, i, x, y, h, w);
      };

      self.dragEventHandler = function (eventType, i, x, y, h, w) {
        self.dragEvent(eventType, i, x, y, h, w);
      };

      self.eventBus.on('resizeEvent', self.resizeEventHandler);
      self.eventBus.on('dragEvent', self.dragEventHandler);
    },
    beforeUnmount: function () {
      //Remove listeners
      this.eventBus.off('resizeEvent', this.resizeEventHandler);
      this.eventBus.off('dragEvent', this.dragEventHandler);
      removeWindowEventListener('resize', this.onWindowResize);
    },
    mounted: function () {
      this.$nextTick(() => {
        validateLayout(this.layout);
        const self = this;
        this.$nextTick(() => {
          if (self.width === null) {
            self.onWindowResize();
            //self.width = self.$el.offsetWidth;
            addWindowEventListener('resize', self.onWindowResize);
          }
          compact(self.layout, self.verticalCompact);

          self.updateHeight();
          self.$nextTick(function () {
            const erd = elementResizeDetectorMaker({
              strategy: 'scroll', //<- For ultra performance.
            });
            erd.listenTo(self.$refs.item, function () {
              self.onWindowResize();
            });
          });
        });

        addWindowEventListener('load', self.onWindowLoad.bind(this));
      });
    },
    methods: {
      onWindowLoad: function () {
        const self = this;

        if (self.width === null) {
          self.onWindowResize();
          //self.width = self.$el.offsetWidth;
          addWindowEventListener('resize', self.onWindowResize);
        }
        compact(self.layout, self.verticalCompact);

        self.updateHeight();
        self.$nextTick(function () {
          const erd = elementResizeDetectorMaker({
            strategy: 'scroll', //<- For ultra performance.
          });
          erd.listenTo(self.$refs.item, function () {
            self.onWindowResize();
          });
        });
      },
      layoutUpdate() {
        if (this.layout !== undefined) {
          if (this.layout.length !== this.lastLayoutLength) {
            //console.log("### LAYOUT UPDATE!");
            this.lastLayoutLength = this.layout.length;
          }
          compact(this.layout, this.verticalCompact);
          this.eventBus.emit('updateWidth', this.width);
          this.updateHeight();
        }
      },
      updateHeight: function () {
        this.mergedStyle = {
          height: this.containerHeight(),
        };
      },
      onWindowResize: function () {
        if (this.$refs !== null && this.$refs.item !== null && this.$refs.item !== undefined) {
          this.width = this.$refs.item.offsetWidth;
        }
      },
      containerHeight: function () {
        if (!this.autoSize) return;
        return bottom(this.layout) * (this.rowHeight + this.margin[1]) + this.margin[1] + 'px';
      },
      dragEvent: function (eventName, id, x, y, h, w) {
        if (eventName === 'dragmove' || eventName === 'dragstart') {
          this.placeholder.i = id;
          this.placeholder.x = x;
          this.placeholder.y = y;
          this.placeholder.w = w;
          this.placeholder.h = h;
          this.$nextTick(() => {
            this.isDragging = true;
          });
          //this.$broadcast("updateWidth", this.width);
          this.eventBus.emit('updateWidth', this.width);
        } else {
          this.$nextTick(() => {
            this.isDragging = false;
          });
        }
        //console.log(eventName + " id=" + id + ", x=" + x + ", y=" + y);
        let l = getLayoutItem(this.layout, id);
        //GetLayoutItem sometimes returns null object
        if (l === undefined || l === null) {
          l = { x: 0, y: 0 };
        }
        l.x = x;
        l.y = y;
        // Move the element to the dragged location.
        this.layout = moveElement(this.layout, l, x, y, true);
        compact(this.layout, this.verticalCompact);
        // needed because vue can't detect changes on array element properties
        this.eventBus.emit('compact');
        this.updateHeight();
        if (eventName === 'dragend') this.$emit('layout-updated', this.layout);
      },
      resizeEvent: function (eventName, id, x, y, h, w) {
        if (eventName === 'resizestart' || eventName === 'resizemove') {
          this.placeholder.i = id;
          this.placeholder.x = x;
          this.placeholder.y = y;
          this.placeholder.w = w;
          this.placeholder.h = h;
          this.$nextTick(() => {
            this.isDragging = true;
          });
          //this.$broadcast("updateWidth", this.width);
          this.eventBus.emit('updateWidth', this.width);
        } else {
          this.$nextTick(() => {
            this.isDragging = false;
          });
        }
        let l = getLayoutItem(this.layout, id);
        //GetLayoutItem sometimes return null object
        if (l === undefined || l === null) {
          l = { h: 0, w: 0 };
        }
        l.h = h;
        l.w = w;
        compact(this.layout, this.verticalCompact);
        this.eventBus.emit('compact');
        this.updateHeight();
        if (eventName === 'resizeend') this.$emit('layout-updated', this.layout);
      },
    },
  });
</script>
<style>
  .vue-grid-layout {
    position: relative;
    transition: height 200ms ease;
  }
</style>
