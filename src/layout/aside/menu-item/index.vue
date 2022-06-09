<template>
  <a-sub-menu :key="menuInfo.path">
    <template #icon>
      <IconfontIcon
        v-if="menuInfo.icon"
        :class="menuInfo.icon"
        :color="'#fff'"
        :size="18"
      />
    </template>
    <template #title>{{ menuInfo.name }}</template>
    <template v-for="item in menuInfo.children" :key="item.path">
      <template v-if="!item.children || item.children.length == 0">
        <a-menu-item :key="item.path">
          <template #icon>
            <IconfontIcon
              v-if="item.icon"
              :class="item.icon"
              :color="'#fff'"
              :size="18"
            />
          </template>
          {{ item.name }}
        </a-menu-item>
      </template>
      <template v-else>
        <SubMenu :menu-info="item" :key="item.path" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script lang="ts" setup>
const { menuInfo } = defineProps(["menuInfo", "key"]);
</script>

<script lang="ts">
export default {
  name: "SubMenu",
};
</script>
