export interface MenuSetting {
  bgColor?: string;
  fixed?: boolean;
  collapsed?: boolean;
  canDrag?: boolean;
  show?: boolean;
  hidden?: boolean;
  split?: boolean;
  menuWidth?: number;
  mode?: string;
  type?: string;
  theme?: string;
  topMenuAlign?: 'start' | 'center' | 'end';
  trigger?: string;
  accordion?: boolean;
  closeMixSidebarOnChange?: boolean;
  collapsedShowTitle?: boolean;
  mixSideTrigger?: string;
  mixSideFixed?: boolean;
}

export interface HeaderSetting {
  bgColor?: string;
  fixed?: boolean;
  show?: boolean;
  theme?: string;
  // Turn on full screen
  showFullScreen?: boolean;
  // Whether to show the lock screen
  useLockPage?: boolean;
  // Show document button
  showDoc?: boolean;
  // Show message center button
  showNotice?: boolean;
  showSearch?: boolean;
}

export interface ProjectConfig {
  // menuType?: MenuTypeEnum;
  headerSetting?: HeaderSetting;
  // menuSetting
  menuSetting?: MenuSetting;
}
