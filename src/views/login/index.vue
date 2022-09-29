<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">登录</div>
    <div class="login-form-sub-title">Login</div>
    <div class="login-form-error-msg">{{ errorMessage }}</div>
    <a-form ref="loginForm" :model="userInfo" class="login-form" layout="vertical" @submit="handleSubmit">
      <a-form-item field="username" :rules="[{ required: true, message: '用户名不能为空！' }]"
        :validate-trigger="['change', 'blur']" hide-label>
        <a-input v-model="userInfo.username" placeholder="xxx" @keyup.enter="handleSubmit">
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item field="password" :rules="[{ required: true, message: '密码不能为空' }]"
        :validate-trigger="['change', 'blur']" hide-label>
        <a-input-password v-model="userInfo.password" placeholder="xxx" allow-clear @keyup.enter="handleSubmit">
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <a-button type="primary" html-type="submit" long>
          登录
        </a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Message } from '@arco-design/web-vue';

import { login } from "@/api/auth";

export default defineComponent({
  setup() {
    const router = useRouter();
    const errorMessage = ref('');
    const userInfo = reactive({
      username: 'admin',
      password: '123456',
    });
    const handleSubmit = async () => {
      const res = await login(userInfo)
      sessionStorage.setItem('token', res.data.token)
      console.log('res.data.token: ', res.data.token);
    }
    return {
      userInfo,
      errorMessage,
      handleSubmit
    };
  },
});
</script>

<style lang="less" scoped>
.login-form {
  &-wrapper {
    width: 320px;
  }

  &-title {
    color: var(--color-text-1);
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
  }

  &-sub-title {
    color: var(--color-text-3);
    font-size: 16px;
    line-height: 24px;
  }

  &-error-msg {
    height: 32px;
    color: rgb(var(--red-6));
    line-height: 32px;
  }

  &-password-actions {
    display: flex;
    justify-content: space-between;
  }

  &-register-btn {
    color: var(--color-text-3) !important;
  }
}
</style>
