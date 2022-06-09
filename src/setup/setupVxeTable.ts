import type { App } from 'vue';
import 'xe-utils';
import VXETable from 'vxe-table';
import 'vxe-table/lib/style.css';
import '../constrant/tableConfig';
import VXETablePluginRenderer from 'vxe-table-plugin-renderer';
import 'vxe-table-plugin-renderer/dist/style.css';
import VXETablePluginAntd from 'vxe-table-plugin-antd';
import 'vxe-table-plugin-antd/dist/style.css';
VXETable.use(VXETablePluginRenderer);
VXETable.use(VXETablePluginAntd);
export function setupVxeTable(app: App<Element>) {
  app.use(VXETable);
}
