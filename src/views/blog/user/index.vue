<template>
  <div class="container">
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
      <el-table-column label="邮箱号" prop="email" align="center" />
      <el-table-column label="部门" prop="dept" align="center">
        <template #default="scope">
          <div v-if="scope.row.dept">{{ scope.row.dept.name }}</div>
        </template>
      </el-table-column>
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
            >{{ t("button.edit") }}</el-button
          >
          <el-button
            v-if="scope.row.id !== 1"
            v-permission="['system:admin:del']"
            type="danger"
            text
            @click="handleDelete(scope.row.id)"
            >{{ t("button.delete") }}</el-button
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

        <el-form-item label="部门" prop="deptId">
          <el-cascader
            v-model="dialogForm.data.deptId"
            :options="dialogForm.deptList"
            :show-all-levels="false"
            :props="{
              checkStrictly: true,
              label: 'name',
              value: 'id'
            }"
          />
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
  ElCascader,
  ElMessage
} from "element-plus";
import type { FormInstance } from "element-plus";
import { reactive, ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import {
  createUser,
  getUserList,
  getUser,
  updateUser,
  deleteUser
} from "@/api/blog/user";
import { utcToLocalTime } from "@/utils/date";
import type { vDialogForm } from "@/types/module";
import { getDeptTree } from "@/api/system/dept";

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

const tableData = reactive<vListResponse<vUserTable>>({
  list: [],
  total: 0,
  page: 1,
  pageSize: 10
});

const dialogForm = reactive<
  vDialogForm<vUserForm> & {
    deptList: Array<ITree<vListOption>>;
  }
>({
  visible: false,
  data: {
    name: "",
    email: "",
    password: "",
    avatar: ""
  },
  title: "编辑管理员",
  deptList: [],
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

    password: [
      { required: true, message: "请输入密码", trigger: "blur" },
      { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
    ]
  }
});

const dialogFormRef = ref<FormInstance>();

onMounted(() => {
  getList();
  getQueryDeptTree();
});

const getList = async () => {
  const res = await getUserList<vUserTable>(queryForm);
  if (res.code === 200) {
    tableData.list = res.data?.list || [];
    tableData.total = res.data?.total || 0;
  } else {
    tableData.list = [];
    tableData.total = 0;
  }
};

const getQueryDeptTree = async () => {
  const res = await getDeptTree();
  if (res.code === 200) {
    dialogForm.deptList = res.data;
  } else {
    dialogForm.deptList = [];
  }
};

const handleQuery = async () => {
  getList();
};

const handleAdd = () => {
  dialogForm.type = "add";
  getQueryDeptTree();
  dialogForm.visible = true;
  dialogForm.title = "新增管理员";
  resetDialogForm();
};
const resetDialogForm = () => {
  dialogForm.data = {
    name: "",
    email: "",
    password: ""
  };
};

const handlePageChange = (page: number) => {
  queryForm.page = page;
  getList();
};

const handleEdit = async (id: number) => {
  const res = await getUser<Omit<vUser, "password">>(id);
  if (res.code === 200) {
    dialogForm.visible = true;
    dialogForm.type = "edit";
    dialogForm.title = "编辑管理员";
    dialogForm.data = res.data;
    getQueryDeptTree();
  } else {
    ElMessage.error(res.msg);
  }
};

const handleSubmit = async () => {
  dialogFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      const data = JSON.parse(JSON.stringify(dialogForm.data));
      if (Array.isArray(data.deptId)) {
        data.deptId = data.deptId[data.deptId.length - 1];
      }
      if (dialogForm.type === "add") {
        const res = await createUser(data);
        if (res.code === 200) {
          dialogForm.visible = false;
          resetDialogForm();
          handleQuery();
          ElMessage.success("新增成功");
        } else {
          ElMessage.error(res.msg);
        }
      } else if (dialogForm.type === "edit") {
        if (data.id) {
          const res = await updateUser(data);
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
  const res = await deleteUser(id);
  if (res.code === 200) {
    handleQuery();
    ElMessage.success("删除成功");
  } else {
    ElMessage.error(res.msg);
  }
};
</script>
