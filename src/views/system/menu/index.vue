<template>
  <div class="container">
    <el-form :model="queryForm">
      <el-row :gutter="24">
        <el-col :span="24">
          <el-button
            v-permission="['system:menu:addMenu']"
            type="primary"
            @click="handleAddRootMenu"
            >{{ t("button.addRootMenu") }}</el-button
          >
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <el-form-item label="权限名">
            <el-input v-model="queryForm.name" placeholder="请输入权限名" />
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
      <el-table-column label="标题" prop="title" align="center" />
      <el-table-column label="路径" prop="path" align="center" />
      <el-table-column label="权限" prop="permission" align="center" />
      <el-table-column label="类型" prop="type" align="center">
        <template #default="scope">
          <el-tag
            v-for="item in pageTypeList.filter(i => i.key === scope.row.type)"
            :key="item.key"
            type="success"
            >{{ item.name }}</el-tag
          >
        </template>
      </el-table-column>
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
              v-if="scope.row.type === 0"
              v-permission="['system:menu:addMenu']"
              type="primary"
              @click="handleAddSubMenu(scope.row.id)"
              >{{ t("button.addSubMenu") }}</el-button
            >
            <el-button
              v-if="scope.row.type !== 4"
              v-permission="['system:menu:edit']"
              type="primary"
              @click="handleAddSubBtn(scope.row.id)"
              >{{ t("button.addBtn") }}</el-button
            >
            <el-button text @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-popconfirm
              title="确认删除？"
              @confirm="handleDelete(scope.row.id)"
            >
              <template #reference>
                <el-button v-permission="['system:menu:del']" text type="danger"
                  >删除</el-button
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
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="dialogForm.data.type">
            <el-radio-button
              v-for="item in pageTypeList"
              :key="item.key"
              :label="item.name"
              :value="item.key"
            />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="父级菜单" prop="parentId">
          <el-cascader
            v-model="dialogForm.data.parentId"
            :options="menuTree"
            :show-all-levels="false"
            :props="{
              checkStrictly: true
            }"
          />
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="dialogForm.data.title" />
        </el-form-item>
        <el-form-item label="名称" prop="name" required>
          <el-input v-model="dialogForm.data.name" />
        </el-form-item>
        <el-form-item label="路径" prop="path">
          <el-input v-model="dialogForm.data.path" />
        </el-form-item>
        <el-form-item label="组件" prop="component">
          <el-input v-model.trim="dialogForm.data.component" />
        </el-form-item>
        <el-form-item label="权限" prop="permission">
          <el-input v-model.trim="dialogForm.data.permission" />
        </el-form-item>
        <el-form-item label="重定向" prop="redirect">
          <el-input v-model.trim="dialogForm.data.redirect" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="dialogForm.data.status" />
        </el-form-item>
        <el-form-item label="是否缓存" prop="keepAlive">
          <el-switch v-model="dialogForm.data.keepAlive" />
        </el-form-item>
        <el-form-item label="是否需要登录" prop="needLogin">
          <el-switch v-model="dialogForm.data.needLogin" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="systemMenu">
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
  ElRadioGroup,
  ElRadioButton,
  ElCascader,
  ElMessage,
  ElTag,
  ElPopconfirm
} from "element-plus";
import { onMounted, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import {
  getMenus,
  getMenuTree,
  createMenu,
  getMenu,
  updateMenu,
  deleteMenu
} from "@/api/system/menu";
import type { vDialogForm } from "@/types/module";
import type { vMenu } from "@/api/system/menu";
import { menuArrToTree } from "@/utils";
import { pageTypeList, dialogFormData_default } from "./data";

const { t } = useI18n();

defineOptions({
  name: "systemMenu"
});

const queryForm = reactive({
  name: ""
});

const menuTree = ref<vMenuTreeObj[]>([]);

const tableData = reactive<any>({
  list: [],
  total: 0,
  page: 1,
  pageSize: 10
});

const dialogForm = reactive<vDialogForm<vMenu>>({
  visible: false,
  data: {
    ...dialogFormData_default
  },
  title: "编辑管理员",
  type: "add",
  rules: {
    name: [
      { required: true, message: "请输入名称", trigger: "blur" },
      { min: 3, max: 32, message: "长度在 2 到 20 个字符", trigger: "blur" },
      {
        pattern: /^[a-zA-Z0-9]+$/,
        message: "名称只能包含字母和数字",
        trigger: "blur"
      }
    ]
  }
});

onMounted(() => {
  getList();
});

const getList = async () => {
  const result = await getMenus();
  if (result.code === 200) {
    tableData.list = result.data;
  } else {
    tableData.list = [];
    tableData.total = 0;
    tableData.page = 1;
    tableData.pageSize = 10;
  }
};

const getMenuTreeList = async () => {
  const result = await getMenuTree<vMenuTree[]>();
  if (result.code === 200) {
    menuTree.value = menuArrToTree(result.data);
  } else {
    menuTree.value = menuArrToTree([]);
  }
};

const handleAddRootMenu = () => {
  dialogForm.type = "add";
  getMenuTreeList();
  dialogForm.visible = true;
  dialogForm.title = "新增一级菜单";
  dialogForm.data = {
    ...dialogFormData_default,
    type: 0
  };
};

const handleAddSubMenu = (parentId: number) => {
  dialogForm.type = "add";
  getMenuTreeList();
  dialogForm.visible = true;
  dialogForm.title = "新增二级菜单";
  dialogForm.data = {
    ...dialogFormData_default,
    type: 1,
    parentId
  };
};
const handleAddSubBtn = (parentId: number) => {
  dialogForm.type = "add";
  getMenuTreeList();
  dialogForm.visible = true;
  dialogForm.title = "新增按钮";
  dialogForm.data = {
    ...dialogFormData_default,
    type: 4,
    parentId
  };
};

const handleEdit = async (id: number) => {
  const result = await getMenu<vMenu>(id);
  if (result.code === 200) {
    dialogForm.type = "edit";
    dialogForm.visible = true;
    dialogForm.title = "编辑菜单";
    dialogForm.data = result.data;
    getMenuTreeList();
  } else {
    ElMessage.error(result.msg);
  }
};

const handleSubmit = async () => {
  const data = JSON.parse(JSON.stringify(dialogForm.data));
  if (Array.isArray(data.parentId)) {
    data.parentId = data.parentId[data.parentId.length - 1];
  }
  if (dialogForm.type === "edit") {
    if (!data.id) {
      return;
    }
    const res = await updateMenu(data);
    if (res.code === 200) {
      dialogForm.visible = false;
      ElMessage.success("修改成功");
      getList();
    } else {
      ElMessage.error(res.msg);
    }
  } else if (dialogForm.type === "add") {
    const res = await createMenu(data);
    if (res.code === 200) {
      dialogForm.visible = false;
      ElMessage.success("新增成功");
      getList();
    } else {
      ElMessage.error(res.msg);
    }
  }
};

const handleDelete = async (id: number) => {
  const result = await deleteMenu(id);
  if (result.code === 200) {
    ElMessage.success("删除成功");
    getList();
  } else {
    ElMessage.error(result.msg);
  }
};

const handleQuery = () => {
  getList();
};

const handleReset = () => {
  queryForm.name = "";
  getList();
};
</script>
