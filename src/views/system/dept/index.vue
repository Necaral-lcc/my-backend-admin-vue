<template>
  <div class="container">
    <el-form :model="queryForm">
      <el-row :gutter="24">
        <el-col :span="24">
          <el-button
            v-permission="['system:dept:add']"
            type="primary"
            @click="handleAdd()"
            >{{ t("button.add") }}</el-button
          >
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <el-form-item label="父级菜单" prop="parentId">
            <el-cascader
              v-model="queryForm.parentId"
              :options="deptTreeOption"
              :show-all-levels="false"
              :props="{
                checkStrictly: true,
                label: 'name',
                value: 'id'
              }"
            />
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
    <el-table :data="tableData.list" border default-expand-all row-key="id">
      <el-table-column label="ID" prop="id" align="center" />
      <el-table-column label="名称" prop="name" align="center" />
      <el-table-column label="描述" prop="description" align="center" />
      <el-table-column label="状态" prop="status" align="center">
        <template #default="scope">
          <el-tag v-if="scope.row.status" type="success">启用</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createdAt" align="center">
        <template #default="scope">
          <div v-local-time="scope.row.createdAt">
            {{ scope.row.createdAt }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" prop="updatedAt" align="center">
        <template #default="scope">
          <div v-local-time="scope.row.updatedAt">
            {{ scope.row.updatedAt }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <div class="table-actions">
            <el-button
              v-permission="['system:dept:add']"
              type="primary"
              @click="handleAdd(scope.row.id)"
              >{{ t("button.add") }}</el-button
            >

            <el-button text @click="handleEdit(scope.row.id)">{{
              t("button.edit")
            }}</el-button>
            <el-popconfirm
              title="确认删除？"
              @confirm="handleDelete(scope.row.id)"
            >
              <template #reference>
                <el-button
                  v-permission="['system:dept:del']"
                  text
                  type="danger"
                  >{{ t("button.delete") }}</el-button
                >
              </template>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-if="dialogForm.visible"
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
        <el-form-item label="父级菜单" prop="parentId">
          <el-cascader
            v-model="dialogForm.data.parentId"
            :options="tableData.list"
            :show-all-levels="false"
            :props="{
              checkStrictly: true,
              label: 'name',
              value: 'id'
            }"
            clearable
          />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="dialogForm.data.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input
            v-model="dialogForm.data.description"
            placeholder="请输入描述"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="dialogForm.data.status" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="systemDept">
import {
  ElButton,
  ElInput,
  ElTable,
  ElTableColumn,
  ElForm,
  ElFormItem,
  ElRow,
  ElCol,
  ElDialog,
  ElSwitch,
  ElCascader,
  ElMessage,
  ElTag,
  ElPopconfirm,
  type FormInstance
} from "element-plus";
import { onMounted, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import {
  getDept,
  getDepts,
  createDept,
  updateDept,
  deleteDept,
  getDeptTree
} from "@/api/system/dept";
import { vDialogForm } from "@/types/module";
import { dialogFormData_default } from "./data";

defineOptions({
  name: "systemDept"
});
const { t } = useI18n();

const tableData = reactive<vListResponse<vToTree<vDept & vTime>>>({
  list: [],
  total: 0,
  page: 1,
  pageSize: 10
});

const queryForm = reactive<{
  parentId: number[];
}>({
  parentId: []
});
const dialogFormRef = ref<FormInstance>();

const dialogForm = reactive<
  vDialogForm<Omit<vDept, "id"> & Partial<Pick<vDept, "id">>>
>({
  visible: false,
  data: {
    ...dialogFormData_default
  },
  title: "编辑管理员",
  type: "add",
  rules: {
    name: [
      { required: true, message: "请输入名称", trigger: "blur" },
      { min: 3, max: 32, message: "长度在 2 到 20 个字符", trigger: "blur" }
    ]
  }
});

const deptTreeOption = ref<vToTree<vListOption>[]>([]);

onMounted(() => {
  init();
});

const init = () => {
  dialogForm.visible = false;
  getList();
  getQueryDeptTree();
};

const getList = async () => {
  const data = JSON.parse(JSON.stringify(queryForm));
  if (Array.isArray(data.parentId) && data.parentId.length > 0) {
    data.parentId = data.parentId[data.parentId.length - 1];
  } else {
    data.parentId = null;
  }
  const res = await getDepts(data);
  if (res.code === 200) {
    tableData.list = res.data;
  } else {
    ElMessage.error(res.msg);
    tableData.list = [];
  }
};

const getQueryDeptTree = async () => {
  const res = await getDeptTree();
  if (res.code === 200) {
    deptTreeOption.value = res.data;
  } else {
    ElMessage.error(res.msg);
  }
};

const handleQuery = () => {
  getList();
};

const handleReset = () => {
  queryForm.parentId = [];
  getList();
};

const handleAdd = (id?: number) => {
  dialogForm.visible = true;
  dialogForm.type = "add";
  dialogForm.title = "新增部门";
  dialogForm.data = {
    ...dialogFormData_default
  };
  if (id) {
    dialogForm.data.parentId = id;
  }
};
const handleEdit = async (id: number) => {
  dialogForm.data = {
    ...dialogFormData_default
  };
  const res = await getDept(id);
  if (res.code === 200) {
    dialogForm.visible = true;
    dialogForm.type = "edit";
    dialogForm.title = "编辑部门";
    dialogForm.data = res.data;
  } else {
    ElMessage.error(res.msg);
  }
};
const handleDelete = async (id: number) => {
  const res = await deleteDept(id);
  if (res.code === 200) {
    ElMessage.success("删除成功");
    getList();
  } else {
    ElMessage.error(res.msg);
  }
};
const handleSubmit = async () => {
  dialogFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      const data = JSON.parse(JSON.stringify(dialogForm.data));
      if (Array.isArray(data.parentId) && data.parentId.length > 0) {
        data.parentId = data.parentId[data.parentId.length - 1];
      } else {
        data.parentId = null;
      }
      if (dialogForm.type === "add") {
        const res = await createDept(data);
        if (res.code === 200) {
          ElMessage.success("新增成功");
          dialogForm.visible = false;
          getList();
        } else {
          ElMessage.error(res.msg);
        }
      } else {
        const id = data.id;
        if (id) {
          const res = await updateDept({ id, ...data });
          if (res.code === 200) {
            ElMessage.success("编辑成功");
            dialogForm.visible = false;
            getList();
          } else {
            ElMessage.error(res.msg);
          }
        } else {
          ElMessage.error("id不能为空");
        }
      }
    }
  });
};
</script>
