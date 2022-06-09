import { defineStore } from "pinia";
import { store } from "@/stores";
import _ from "lodash";

import type { HeaderSetting, ProjectConfig, MenuSetting } from "@/types/config";

interface AppState {
  // project config
  projectConfig: ProjectConfig | null;
}
export const useAppStore = defineStore({
  id: "app",
  state: (): AppState => {
    return {
      projectConfig: {
        menuSetting: {
          collapsed: false,
        },
        headerSetting: {},
      },
    };
  },
  getters: {
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig);
    },
    getMenuSetting(): MenuSetting {
      return this.projectConfig?.menuSetting || ({} as MenuSetting);
    },

    getHeaderSetting(): HeaderSetting {
      return this.getProjectConfig.headerSetting || ({} as HeaderSetting);
    },
  },
  actions: {
    setProjectConfig(config: ProjectConfig): void {
      this.projectConfig = _.merge(this.projectConfig || {}, config);
    },
    setMenuConfig(config: MenuSetting): void {
      this.projectConfig = _.merge(this.projectConfig || {}, {
        menuSetting: config,
      });
    },
  },
});
