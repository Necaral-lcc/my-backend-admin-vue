<template>
  <div class="login">
    <div class="login-left">login</div>
    <div class="login-right">
      <el-form ref="formRef" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit(formRef)">login</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ElButton,
  ElInput,
  ElForm,
  ElFormItem,
  FormInstance,
  ElMessage
} from "element-plus";
import { login } from "@/api";
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";

const router = useRouter();

const formRef = ref<FormInstance>();
const form = reactive({
  username: "",
  password: ""
});

const rules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 16, message: "长度在 3 到 5 个字符", trigger: "blur" }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
  ]
});

const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return;
  }
  const isValid = await formEl.validate();
  if (!isValid) {
    return;
  }

  const res = await login(form);
  if (res.code == 200) {
    router.push("/");
  } else {
    ElMessage.error(res.msg);
  }
};
</script>

<style lang="scss" scoped>
.login {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  height: 100%;

  .login-right {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
