<script lang="ts" setup>
  import { ContextmenuItem } from './types';

  const props = withDefaults(
    defineProps<{
      menus: Array<ContextmenuItem>;
      handleClickMenuItem: Function;
    }>(),
    { menus: () => [], handleClickMenuItem: () => {} },
  );
</script>
<template>
  <ul class="menu-content">
    <template v-for="(menu, index) in menus" :key="menu.text || index">
      <li
        v-if="!menu.hide"
        class="menu-item"
        @click.stop="handleClickMenuItem(menu)"
        :class="{ divider: menu.divider, disable: menu.disable }"
      >
        <div
          class="menu-item-content"
          :class="{
            'has-children': menu.children,
            'has-handler': menu.handler,
          }"
          v-if="!menu.divider"
        >
          <span class="text">{{ menu.text }}</span>
          <span class="sub-text" v-if="menu.subText && !menu.children">{{ menu.subText }}</span>

          <menu-content
            class="sub-menu"
            :menus="menu.children"
            v-if="menu.children && menu.children.length"
            :handleClickMenuItem="handleClickMenuItem"
          />
        </div>
      </li>
    </template>
  </ul>
</template>
<style lang="less" scoped>
  .menu-content {
    width: 170px;
    padding: 5px 0;
    background: #fff;
    border: 1px solid #eee;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.15);
    border-radius: 2px;
    list-style: none;
    margin: 0;
  }
  .menu-item {
    padding: 0 20px;
    color: #555;
    font-size: 12px;
    transition: all 0.1s;
    white-space: nowrap;
    height: 30px;
    line-height: 30px;
    background-color: #fff;
    cursor: pointer;

    &:not(.disable):hover > .menu-item-content > .sub-menu {
      display: block;
    }

    &:not(.disable):hover > .has-children.has-handler::after {
      transform: scale(1);
    }

    &:hover:not(.disable) {
      background-color: rgba(209, 68, 36, 0.2);
    }

    &.divider {
      height: 1px;
      overflow: hidden;
      margin: 5px;
      background-color: #e5e5e5;
      line-height: 0;
      padding: 0;
    }

    &.disable {
      color: #b1b1b1;
      cursor: no-drop;
    }
  }
  .menu-item-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    &.has-children::before {
      content: '';
      display: inline-block;
      width: 8px;
      height: 8px;
      border-width: 1px;
      border-style: solid;
      border-color: #666 #666 transparent transparent;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%) rotate(45deg);
    }
    &.has-children.has-handler::after {
      content: '';
      display: inline-block;
      width: 1px;
      height: 24px;
      background-color: #f1f1f1;
      position: absolute;
      right: 18px;
      top: 3px;
      transform: scale(0);
      transition: transform 0.2s;
    }

    .sub-text {
      opacity: 0.6;
    }
    .sub-menu {
      width: 120px;
      position: absolute;
      display: none;
      left: 112%;
      top: -6px;
    }
  }
</style>
