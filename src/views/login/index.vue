<template>
  <div class="bg-login" :style="{ backgroundImage: `url(${LoginImg})` }"> </div>
  <div class="login-form">
    <h3>登录</h3>
    <div class="login-box">
      <div class="user-box" :class="{hasValue:formState.username!=''}">
        <a-input v-model:value="formState.username"  >
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
        <label>用户名</label>
      </div>
      <div class="user-box" :class="{hasValue:formState.password!=''}">
        <a-input-password v-model:value="formState.password"  >
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
        <label>密码</label>
      </div>
      <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
      <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        登录
      </a-button>
    </div>
    <!-- <a-form
      :model="formState"
      name="normal_login"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        name="username"
        label="用户名"
        :rules="[{ required: true, message: '请输入用户名!' }]"
      >
        <a-input v-model:value="formState.username" placeholder="用户名">
          <template #prefix>
            <UserOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item
        name="password"
        label="密码"
        :rules="[{ required: true, message: '请输入密码!' }]"
      >
        <a-input-password v-model:value="formState.password" placeholder="密码">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item>
        <a-form-item name="remember" no-style>
          <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
        </a-form-item>
      </a-form-item>

      <a-form-item class="tx-center">
        <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          登录
        </a-button>
      </a-form-item>
    </a-form> -->
  </div>
</template>

<script lang="ts" setup>
  import LoginImg from '@/assets/img/123.jpg';
  import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
  interface FormState {
    username: string;
    password: string;
    remember: boolean;
  }
  const formState = reactive<FormState>({
    username: '',
    password: '',
    remember: true,
  });
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const disabled = computed(() => {
    return !(formState.username && formState.password);
  });
</script>

<style lang="less" scoped>
  .bg-login {
    height: 100%;
    width: 100%;
    background-clip: content-box;
    background-size: 100% auto;
    background-repeat: no-repeat;
  }
  .login-form {
    position: absolute;
    top: 40%;
    right: 13%;
    width: 400px;
    padding: 40px;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
    border-radius: 10px;
    h3 {
      margin: 0 0 30px;
      padding: 0;
      text-align: center;
      font-size: 20px;
    }
  }
  .login-box .user-box {
    position: relative;
  }

  .login-box .user-box .ant-input-affix-wrapper {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #111;
    outline: none;
    background: transparent;
    box-shadow: none;
  }
  .login-box .user-box label {
    position: absolute;
    top: 0;
    left: 24px;
    padding: 10px 0;
    font-size: 16px;
    color: #101010;
    pointer-events: none;
    transition: 0.5s;
  }
  .login-box .user-box.hasValue label,
  .login-box .user-box .ant-input-affix-wrapper-focused ~ label,
  .login-box .user-box .ant-input-affix-wrapper:hover ~ label {
    top: -20px;
    left: 0;
    color: #007aff;

    font-size: 12px;
  }

  .login-box  .login-form-button {
    position: relative;
    display: inline-block;
    padding: 5px 20px;
    color: #007aff;
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: 0.5s;
    /* margin-top: 40px; */
    letter-spacing: 4px;
    height: auto;
    margin-left: 50px;
    background-color: #fff;
  }

  .login-box .login-form-button:hover {
    background: #007aff;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px #007aff, 0 0 25px #007aff, 0 0 50px #007aff, 0 0 100px #007aff;
  }

  .login-box .login-form-button span {
    position: absolute;
    display: block;
  }

  .login-box .login-form-button span:nth-child(1) {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #007aff);
    animation: btn-anim1 1s linear infinite;
  }

  @keyframes btn-anim1 {
    0% {
      left: -100%;
    }
    50%,
    100% {
      left: 100%;
    }
  }

  .login-box .login-form-button span:nth-child(2) {
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent, #007aff);
    animation: btn-anim2 1s linear infinite;
    animation-delay: 0.25s;
  }

  @keyframes btn-anim2 {
    0% {
      top: -100%;
    }
    50%,
    100% {
      top: 100%;
    }
  }

  .login-box .login-form-button span:nth-child(3) {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, transparent, #007aff);
    animation: btn-anim3 1s linear infinite;
    animation-delay: 0.5s;
  }

  @keyframes btn-anim3 {
    0% {
      right: -100%;
    }
    50%,
    100% {
      right: 100%;
    }
  }

  .login-box .login-form-button span:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, #007aff);
    animation: btn-anim4 1s linear infinite;
    animation-delay: 0.75s;
  }

  @keyframes btn-anim4 {
    0% {
      bottom: -100%;
    }
    50%,
    100% {
      bottom: 100%;
    }
  }
</style>
