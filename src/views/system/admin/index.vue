<template>
  <div class="container" :class="styles.container">
    <el-form :model="queryForm">
      <el-row :gutter="24">
        <el-col :span="24">
          <el-button
            v-permission="['system:admin:add']"
            type="primary"
            @click="handleAdd"
            >{{ t("button.add") }}</el-button
          >
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <el-form-item label="用户名">
            <el-input v-model="queryForm.name" placeholder="请输入用户名" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <el-form-item label="邮箱号">
            <el-input v-model="queryForm.email" placeholder="请输入邮箱号" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <el-form-item>
            <el-button type="primary" @click="handleQuery">{{
              t("button.submit")
            }}</el-button>
            <el-button @click="handleReset">{{ t("button.reset") }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="tableData.list" border>
      <el-table-column label="ID" prop="id" align="center" />
      <el-table-column label="用户名" prop="name" align="center" />
      <el-table-column label="昵称" prop="nickname" align="center" />
      <el-table-column label="邮箱号" prop="email" align="center" />
      <el-table-column label="创建时间" prop="createdAt" align="center">
        <template #default="scope">{{
          utcToLocalTime(scope.row.createdAt)
        }}</template>
      </el-table-column>
      <el-table-column label="更新时间" prop="updatedAt" align="center">
        <template #default="scope">{{
          utcToLocalTime(scope.row.updatedAt)
        }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            v-permission="['system:admin:edit']"
            text
            @click="handleEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            v-if="scope.row.id !== 1"
            v-permission="['system:admin:del']"
            type="danger"
            text
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="tableData.total > queryForm.pageSize"
      layout="prev, pager, next"
      :total="tableData.total"
      :page-size="queryForm.pageSize"
      :current-page="queryForm.page"
      @current-change="handlePageChange"
    />
    <el-dialog
      v-model="dialogForm.visible"
      :title="dialogForm.title"
      append-to-body
    >
      <el-form
        ref="dialogFormRef"
        :model="dialogForm.data"
        :rules="dialogForm.rules"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="name" required>
          <el-input v-model="dialogForm.data.name" />
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="dialogForm.data.nickname" />
        </el-form-item>
        <el-form-item label="邮箱号" prop="email" required>
          <el-input v-model="dialogForm.data.email" />
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :required="dialogForm.type === 'add'"
        >
          <el-input
            v-model.trim="dialogForm.data.password"
            type="password"
            autocomplete="new-password"
          />
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select v-model="dialogForm.data.roleId" placeholder="请选择角色">
            <el-option
              v-for="item in dialogForm.roleList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="dialogForm.data.status" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">{{
            t("button.submit")
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  ElButton,
  ElInput,
  ElTable,
  ElTableColumn,
  ElForm,
  ElFormItem,
  ElRow,
  ElCol,
  ElPagination,
  ElDialog,
  ElSwitch,
  ElSelect,
  ElOption,
  ElMessage
} from "element-plus";
import type { FormInstance } from "element-plus";
import { reactive, ref, onMounted } from "vue";
import styles from "./index.module.scss";
import { useI18n } from "vue-i18n";
import {
  createAdminUser,
  getAdminUser,
  getAdminUsers,
  updateAdminUser
} from "@/api/system/admin";
import { utcToLocalTime } from "@/utils/date";
import type { vDialogForm } from "@/types/module";
import { getRoleOptions } from "@/api/system/role";

defineOptions({
  name: "systemAdmin"
});

const { t } = useI18n();

const queryForm = reactive({
  name: "",
  email: "",
  page: 1,
  pageSize: 10
});

const tableData = reactive<vListResponse<vAdminUser & vTime>>({
  list: [],
  total: 0,
  page: 1,
  pageSize: 10
});

const dialogForm = reactive<
  vDialogForm<vAdminUserForm> & {
    roleList: vOption[];
  }
>({
  visible: false,
  data: {
    name: "",
    nickname: "",
    email: "",
    password: "",
    status: true
  },
  title: "编辑管理员",
  roleList: [],
  type: "add",
  rules: {
    name: [
      { required: true, message: "请输入用户名", trigger: "blur" },
      { min: 3, max: 16, message: "长度在 2 到 20 个字符", trigger: "blur" }
    ],
    email: [
      { required: true, message: "请输入邮箱号", trigger: "blur" },
      { type: "email", message: "请输入正确的邮箱号", trigger: "blur" }
    ],
    nickname: [
      { min: 2, max: 16, message: "长度在 2 到 16 个字符", trigger: "blur" }
    ],
    password: [
      { required: true, message: "请输入密码", trigger: "blur" },
      { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
    ]
  }
});

const dialogFormRef = ref<FormInstance>();

onMounted(() => {
  getList();
});

const getList = async () => {
  const res = await getAdminUsers<vAdminUser & vTime>(queryForm);
  if (res.code === 200) {
    tableData.list = res.data?.list || [];
    tableData.total = res.data?.total || 0;
  } else {
    tableData.list = [];
    tableData.total = 0;
  }
};

const getRoleList = async () => {
  const res = await getRoleOptions();
  if (res.code === 200) {
    dialogForm.roleList = res.data;
  } else {
    dialogForm.roleList = [];
  }
};

const handleQuery = async () => {
  getList();
};

const handleAdd = () => {
  dialogForm.type = "add";
  getRoleList();
  dialogForm.visible = true;
  dialogForm.title = "新增管理员";
  resetDialogForm();
};
const resetDialogForm = () => {
  dialogForm.data = {
    name: "",
    nickname: "",
    email: "",
    password: "",
    status: true
  };
};

const handlePageChange = (page: number) => {
  queryForm.page = page;
  getList();
};

const handleEdit = async (id: number) => {
  const res = await getAdminUser<Omit<vAdminUser, "password">>(id);
  if (res.code === 200) {
    dialogForm.visible = true;
    dialogForm.type = "edit";
    dialogForm.title = "编辑管理员";
    dialogForm.data = res.data;
    getRoleList();
  } else {
    ElMessage.error(res.msg);
  }
};

const handleSubmit = async () => {
  dialogFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      if (dialogForm.type === "add") {
        const res = await createAdminUser(dialogForm.data);
        if (res.code === 200) {
          dialogForm.visible = false;
          resetDialogForm();
          handleQuery();
          ElMessage.success("新增成功");
        } else {
          ElMessage.error(res.msg);
        }
      } else if (dialogForm.type === "edit") {
        if (dialogForm.data.id) {
          const res = await updateAdminUser(
            dialogForm.data.id,
            dialogForm.data
          );
          if (res.code === 200) {
            dialogForm.visible = false;
            resetDialogForm();
            handleQuery();
            ElMessage.success("修改成功");
          } else {
            ElMessage.error(res.msg);
          }
        }
      }
      // TODO: 提交表单
    } else {
      console.log("error submit", dialogForm.data);
    }
  });
};

const handleReset = () => {
  queryForm.name = "";
  queryForm.email = "";
  queryForm.page = 1;
  queryForm.pageSize = 10;
  dialogForm.visible = false;
  resetDialogForm();
  getList();
};

const handleDelete = async (id: number) => {
  console.log(id);
};
</script>
