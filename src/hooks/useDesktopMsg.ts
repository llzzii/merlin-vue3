import { message } from 'ant-design-vue';

interface MsgOption extends Notification {
  title: string;
  cb: Fn;
}

/**
 * 通知的使用，需要再window操作系统，右下角通知设置，==> 打开通知显示选项
 *  关闭专注助手，通知会直接显示在右下角
 *
 */

export const useDesktopMsg = (option: MsgOption) => {
  let notification: any;
  // 先检查浏览器是否支持
  if (!('Notification' in window)) {
    message.warn('This browser does not support desktop notification');
    return;
  }
  // 检查用户是否同意接受通知
  else if (Notification.permission === 'granted') {
    notification = new Notification(option.title, option);
    console.log(
      '🚀 ~ file: useDesktopMsg.ts ~ line 17 ~ useDesktopMsg ~ notification',
      notification,
    );
    notification.onclick = function () {
      option.cb();
      notification.close();
    };
  }
  // 否则我们需要向用户获取权限
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(function (permission) {
      // 如果用户接受权限，我们就可以发起一条消息
      if (permission === 'granted') {
        notification = new Notification(option.title, option);
        notification.onclick = function () {
          option.cb();
          notification.close();
        };
      }
    });
  } else {
    Notification.requestPermission();
    console.log('没有权限,用户拒绝:Notification');
  }
  return notification;
};
