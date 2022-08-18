import { useFullModel } from '@/hooks/useFullModel';
import { UserInfo } from '@/types/store';
import { defineStore } from 'pinia';
import { store } from '@/stores';
import { localCache } from '@/utils/storageCache';
export enum RoleEnum {
  SUPER = 'super',
  USER = 'user',
  ADMIN = 'admin',
}

interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  roleList: RoleEnum[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
  isLock?: boolean;
}
const USER_LOCAL_LOCK_KEY = 'USER_LOCAL_LOCK_KEY__';
const { mountModel, unMountModel } = useFullModel();
export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
    // roleList
    roleList: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
    isLock: localCache().get(USER_LOCAL_LOCK_KEY),
  }),
  getters: {
    getLockStatus(): boolean {
      return !!this.isLock;
    },
  },
  actions: {
    setLockStatus(isLock) {
      this.isLock = isLock;
      if (isLock) {
        mountModel();
      } else {
        unMountModel();
      }
      localCache().set(USER_LOCAL_LOCK_KEY, isLock);
    },
  },
});

// Need to be used outside the setup,否则路由拦截器中无法使用
export function useUserStoreWithOut() {
  return useUserStore(store);
}
