import type { App } from 'vue';

import {
  Modal,
  Table,
  Menu,
  Input,
  Form,
  Card,
  Checkbox,
  Radio,
  Button,
  Divider,
  Select,
  TreeSelect,
  PageHeader,
  Descriptions,
  Tabs,
  Row,
  Col,
  message,
  Skeleton,
  Popconfirm,
  Drawer,
  InputNumber,
  Switch,
  Cascader,
  ConfigProvider,
  Tag,
  Tree,
  Upload,
  DatePicker,
  Pagination,
  Timeline,
  Dropdown,
  Spin,
  Alert,
  Popover,
  Tooltip,
  Empty,
  Steps,
  Result,
  Collapse,
  Badge,
  Space,
} from 'ant-design-vue';

import 'ant-design-vue/dist/antd.less';

export function setupAntDesign(app: App<Element>) {
  app
    .use(Space)
    .use(Form)
    .use(Input)
    .use(InputNumber)
    .use(Modal)
    .use(Table)
    .use(Menu)
    .use(Card)
    .use(Checkbox)
    .use(Radio)
    .use(Button)
    .use(Divider)
    .use(Select)
    .use(TreeSelect)
    .use(PageHeader)
    .use(Descriptions)
    .use(Tabs)
    .use(Row)
    .use(Col)
    .use(Skeleton)
    .use(Popconfirm)
    .use(Drawer)
    .use(Switch)
    .use(Cascader)
    .use(ConfigProvider)
    .use(Tag)
    .use(Tree)
    .use(DatePicker)
    .use(Pagination)
    .use(Upload)
    .use(Dropdown)
    .use(Timeline)
    .use(Spin)
    .use(Alert)
    .use(Popover)
    .use(Empty)
    .use(Tooltip)
    .use(Steps)
    .use(Collapse)
    .use(Badge)
    .use(Result);

  message.config({
    maxCount: 1,
  });
}
