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
      :loading="loading"
      :height="tableConfig.height"
      v-on="tableFunc"
    >
    <!-- v-bind="tableConfig" -->

      <vxe-column v-if="showCheckbox" type="checkbox" fixed="left" width="50" />
      <vxe-column v-if="showSeq" type="seq" fixed="left" title="序号" width="80" />
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
                v-if="columnData.slots && columnData.slots?.body"
              >
                <slot :name="columnData.slots?.body" :row="row" :index="rowIndex">
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
              <template
                #edit="{ row, items, _columnIndex }"
                v-if="childItem.slots && childItem.slots?.edit"
              >
                <slot :name="childItem.slots.edit" :row="row" :_columnIndex="_columnIndex"> </slot>
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
            #default="{ column, row, rowIndex, ...res }"
            v-if="columnData.slots && columnData.slots?.body"
          >
            <slot :name="columnData.slots?.body" :row="row" v-bind="res" :index="rowIndex">
              <!-- {{
                (columnData.columnConfig?.formatter
                  ? columnData.columnConfig?.formatter({ cellValue: row[column.field] })
                  : row[column.field]) ?? '-'
              }} -->
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
          <template
            #edit="{ row, items, _columnIndex }"
            v-if="columnData.slots && columnData.slots?.edit"
          >
            <slot :name="columnData.slots.edit" :row="row" :_columnIndex="_columnIndex"> </slot>
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
        v-model:current-page="pagination.currentPage"
        v-model:page-size="pagination.pageSize"
        :total="pagination.total"
        @page-change="pagination.onTableChange"
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
import { setTableHeight } from '@/utils/tableFn';

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
      toolbar: () => null,
      tableConfig: () => defaultTableConfig,
      tableFunc: () => defaultTableFunc,
    },
  );
  let xTable = ref({} as VxeTableInstance);
  let xToolbar = ref({} as VxeToolbarInstance);
  const emits=defineEmits(['onTableChange'])
  // let configOptions = reactive<any>({});
  // let configPagination = reactive<any>({});
  watch(
    () => props.tableData,
    () => {
      nextTick(() => {
        const $table = xTable.value;
      console.log("🚀 ~ file: DefaultTable.vue:187 ~ $table", $table)
      if ($table) {
        $table.reloadData(props.tableData);
      }
      })
     
    },
    { immediate: true, deep: true },
  );
  const onTableChange = (e) => {
      e.current = e.currentPage;
      emits("onTableChange", e);
    };
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
    if(!props.tableConfig?.height){
      props.tableConfig.height=setTableHeight(props)
      // props.tableConfig.height=1000
      xTable.value.refreshScroll()
    }
    console.log("🚀 ~ file: DefaultTable.vue:208 ~ nextTick ~ props.tableConfig", props.tableConfig)
  });
    
</script>

<style lang="less">
  .table-wapper {
    padding: 5px;
  }
</style>
