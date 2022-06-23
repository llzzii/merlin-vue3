<template>
  <div class="table-wapper">
    <vxe-toolbar ref="xToolbar" v-if="toolbar != null" v-bind="toolbar">
      <template #buttons>
        <slot name="toolbar_buttons" :$table="xTable"></slot>
      </template>
      <template #tools>
        <slot name="toolbar_tools" :$table="xTable"></slot>
      </template>
    </vxe-toolbar>
    <vxe-table
      class="vxe-table"
      ref="xTable"
      :data="tableData"
      :loading="loading"
      v-bind="tableConfig"
      v-on="tableFunc"
    >
      <vxe-column v-if="showCheckbox" type="checkbox" fixed="left" width="30" />
      <template v-for="columnData in columns" :key="columnData.id">
        <vxe-colgroup
          v-if="columnData.children && columnData.children.length > 0"
          :title="columnData.title"
          align="center"
        >
          <template v-for="childItem in columnData.children" :key="childItem.id">
            <vxe-column
              :title="childItem.title"
              :align="childItem.align"
              :field="childItem.field"
              :filters="childItem.filters"
              :formatter="childItem.formatter"
              v-bind="childItem.columnConfig"
            >
              <template
                #header="{ column, columnIndex }"
                v-if="childItem.slots && childItem.slots?.header"
              >
                <slot :name="childItem.slots.header" :column="column" :columnIndex="columnIndex">{{
                  column.title || ''
                }}</slot>
              </template>
              <template
                #default="{ column, row, rowIndex }"
                v-if="childItem.slots && childItem.slots?.body"
              >
                <slot :name="childItem.slots?.body" :rowData="row" :index="rowIndex">
                  {{ row[column.field] ?? '-' }}
                </slot>
              </template>
              <template
                #footer="{ column, items, _columnIndex }"
                v-if="childItem.slots && childItem.slots?.footer"
              >
                <slot :name="childItem.slots.footer" :items="items" :_columnIndex="_columnIndex">
                </slot>
              </template>
            </vxe-column>
          </template>
        </vxe-colgroup>
        <vxe-column
          v-else
          :title="columnData.title"
          :align="columnData.align"
          :field="columnData.field"
          :filters="columnData.filters"
          :formatter="columnData.formatter"
          v-bind="columnData.columnConfig"
        >
          <template
            #header="{ column, columnIndex }"
            v-if="columnData.slots && columnData.slots?.header"
          >
            <slot :name="columnData.slots.header" :column="column" :columnIndex="columnIndex">{{
              column.title || ''
            }}</slot>
          </template>
          <template
            #default="{ column, row, rowIndex }"
            v-if="columnData.slots && columnData.slots?.body"
          >
            <slot :name="columnData.slots?.body" :rowData="row" :index="rowIndex">
              {{ row[column.field] ?? '-' }}
            </slot>
          </template>
          <template
            #footer="{ column, items, _columnIndex }"
            v-if="columnData.slots && columnData.slots?.footer"
          >
            <slot :name="columnData.slots.footer" :items="items" :_columnIndex="_columnIndex">
            </slot>
          </template>
        </vxe-column>
      </template>
    </vxe-table>
    <template v-if="showPagination">
      <vxe-pager
        perfect
        :layouts="[
          'Total',
          'PrevPage',
          'Number',
          'NextPage',
          'Sizes',
          pagination.showFullJump ? 'FullJump' : '',
        ]"
        :current-page="pagination.currentPage"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        @page-change="pagination?.onTableChange"
        style="height: 48px !important"
      />
    </template>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, nextTick, watch, reactive } from 'vue';
  import {
    defaultTableConfig,
    defaultPagination,
    defaultTableFunc,
  } from '../../constrant/table.constrant';
  import _ from 'lodash';

  import {
    VxeColumnProps,
    VxePagerProps,
    VxeTableInstance,
    VxeTableListeners,
    VxeTableProps,
    VxeToolbarInstance,
    VxeToolbarProps,
  } from 'vxe-table';

  const props = withDefaults(
    defineProps<{
      tableData: Array<any>;
      columns: VxeColumnProps;
      loading?: boolean;
      showSeq?: boolean;
      pagination?: VxePagerProps;
      toolbar?: VxeToolbarProps | null;
      tableConfig?: VxeTableProps;
      showPagination?: boolean;
      showCheckbox?: boolean;
      tableFunc?: VxeTableListeners;
    }>(),
    {
      tableData: () => [],
      columns: () => [] as VxeColumnProps,
      loading: false,
      showSeq: true,
      showCheckbox: true,
      showPagination: true,
      pagination: () => defaultPagination,
      toolbar: null,
      tableConfig: () => defaultTableConfig,
      tableFunc: () => defaultTableFunc,
    },
  );
  let xTable = ref({} as VxeTableInstance);
  let xToolbar = ref({} as VxeToolbarInstance);
  // let configOptions = reactive<any>({});
  // let configPagination = reactive<any>({});
  watch(
    () => props.tableData,
    () => {
      console.log(
        '🚀 ~ file: DefaultTable.vue ~ line 210 ~ props.tableData',
        props.tableData,
        props.tableFunc,
      );
    },
    { immediate: true, deep: true },
  );
  onMounted(() => {
    console.log('1', props);
  });
  nextTick(() => {
    if (props.toolbar != null) {
      // 将表格和工具栏进行关联
      const $table = xTable.value;
      const $toolbar = xToolbar.value;
      $table.connect($toolbar);
    }
  });
</script>

<style lang="less">
  .table-wapper {
    padding: 5px;
  }
</style>
