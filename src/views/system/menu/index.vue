<template>
  <div class="container">
    <el-form :model="queryForm">
      <el-row :gutter="24">
        <el-col :span="24">
          <el-button type="primary" @click="handleAdd">{{
            t("button.add")
          }}</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="tableData.list" border default-expand-all row-key="id">
      <el-table-column label="ID" prop="id" align="center" />
      <el-table-column label="路由名称" prop="name" align="center" />
      <el-table-column label="路由标题" prop="title" align="center" />
      <el-table-column label="路径" prop="path" align="center" />
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
          <el-button text @click="handleEdit(scope.row.id)">编辑</el-button>
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
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="dialogForm.data.type">
            <el-radio-button label="目录" :value="0" />
            <el-radio-button label="页面" :value="1" />
            <el-radio-button label="内嵌" :value="2" />
            <el-radio-button label="外链" :value="3" />
          </el-radio-group>
        </el-form-item>

        <el-form-item label="路由名称" prop="name" required>
          <el-input v-model="dialogForm.data.name" />
        </el-form-item>
        <el-form-item label="路由标题" prop="title">
          <el-input v-model="dialogForm.data.title" />
        </el-form-item>
        <el-form-item label="路由路径" prop="path" required>
          <el-input v-model="dialogForm.data.path" />
        </el-form-item>
        <el-form-item label="路由组件" prop="component">
          <el-input v-model.trim="dialogForm.data.component" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="dialogForm.data.status" />
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
  ElPagination,
  ElDialog,
  ElSwitch,
  ElRadioGroup,
  ElRadioButton
} from "element-plus";
import { onMounted, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { utcToLocalTime } from "@/utils/date";
import { getMenus, getMenuTree } from "@/api/system/menu";
import type { vDialogForm } from "@/types/module";
import type { vMenu } from "./type";

const { t } = useI18n();

defineOptions({
  name: "systemMenu"
});

const queryForm = reactive({
  page: 1,
  pageSize: 10
});

const menuTree = ref<vMenuTree[]>([]);

const tableData = reactive<vListResponse<any>>({
  list: [],
  total: 0,
  page: 1,
  pageSize: 10
});

const dialogForm = reactive<vDialogForm<vMenu>>({
  visible: false,
  data: {
    name: "",
    title: "",
    path: "",
    component: "",
    status: true,
    type: 0,
    redirect: "",
    keepAlive: false,
    needLogin: true,
    parentId: 0,
    link: ""
  },
  title: "编辑管理员",
  rules: {
    name: [
      { required: true, message: "请输入路由名称", trigger: "blur" },
      { min: 3, max: 16, message: "长度在 2 到 20 个字符", trigger: "blur" },
      {
        pattern: /^[a-zA-Z0-9]+$/,
        message: "路由名称只能包含字母和数字",
        trigger: "blur"
      }
    ]
  }
});

onMounted(() => {
  getList();
});

const getList = async () => {
  const result = await getMenus(queryForm);
  if (result.code === 200) {
    tableData.list = result.data.list;
    tableData.total = result.data.total;
    tableData.page = result.data.page;
    tableData.pageSize = result.data.pageSize;
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
    menuTree.value = result.data;
  } else {
    menuTree.value = [];
  }
};

const handleAdd = () => {
  console.log("handleAdd");
  getMenuTreeList();
  dialogForm.visible = true;
  dialogForm.title = "新增菜单";
  dialogForm.data = {
    name: "",
    title: "",
    path: "",
    component: "",
    status: true,
    type: 0,
    redirect: "",
    keepAlive: false,
    needLogin: true,
    parentId: 0,
    link: ""
  };
};

const handlePageChange = (page: number) => {
  queryForm.page = page;
  getList();
};
const handleEdit = (id: number) => {
  console.log("handleEdit", id);
};
</script>
