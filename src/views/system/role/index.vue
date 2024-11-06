<template>
  <div class="container">
    <el-form :model="queryForm">
      <el-row :gutter="24">
        <el-col :span="24">
          <el-button
            v-permission="['system:role:add']"
            type="primary"
            @click="handleAdd"
            >{{ t("button.add") }}</el-button
          >
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <el-form-item label="角色名">
            <el-input v-model="queryForm.name" placeholder="请输入角色名" />
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
      <el-table-column label="角色名称" prop="name" align="center" />
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
            v-permission="['system:role:edit']"
            text
            @click="handleEdit(scope.row.id)"
            >{{ t("button.edit") }}</el-button
          >
          <el-button
            v-permission="['system:role:del']"
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
        <el-form-item label="角色名称" prop="name" required>
          <el-input v-model="dialogForm.data.name" />
        </el-form-item>
        <el-form-item label="权限树" prop="title" required>
          <el-tree
            ref="treeRef"
            :data="dialogForm.menuTree"
            show-checkbox
            node-key="id"
            empty-text="无权限"
            :props="{ label: 'title', children: 'children' }"
            :check-strictly="true"
            @check-change="handleMenuTreeChange"
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

<script setup lang="ts" name="systemRole">
import { vDialogForm } from "@/types/module";
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
  ElMessage,
  ElTree
} from "element-plus";
import { onMounted, reactive, ref, nextTick } from "vue";
import { useI18n } from "vue-i18n";
import { utcToLocalTime } from "@/utils/date";
import {
  createRole,
  getRole,
  getRoles,
  updateRole,
  type vRole
} from "@/api/system/role";
import { getMenuOption } from "@/api/system/menu";

const { t } = useI18n();

defineOptions({
  name: "systemMenu"
});

const tableData = reactive<vListResponse<any>>({
  list: [],
  total: 0,
  page: 1,
  pageSize: 10
});

const queryForm = reactive({
  page: 1,
  pageSize: 10,
  name: ""
});

const treeRef = ref<InstanceType<typeof ElTree>>();

const dialogForm = reactive<
  vDialogForm<vRole & { id?: number }> & {
    menuTree: vToTree<vListOption>[];
  }
>({
  visible: false,
  data: {
    name: "",
    menuIds: []
  },
  title: "编辑管理员",
  type: "add",
  menuTree: [],
  rules: {
    name: [
      { required: true, message: "请输入角色名称", trigger: "blur" },
      { min: 3, max: 16, message: "长度在 2 到 20 个字符", trigger: "blur" }
    ]
  }
});

onMounted(() => {
  getList();
  getMenuTreeData();
});

const getList = async () => {
  const res = await getRoles(queryForm);
  if (res.code === 200) {
    tableData.list = res.data.list;
    tableData.total = res.data.total;
    tableData.page = queryForm.page;
    tableData.pageSize = queryForm.pageSize;
  } else {
    ElMessage.error(res.msg);
  }
};

const getMenuTreeData = async () => {
  const res = await getMenuOption<vToTree<vListOption>[]>();
  if (res.code === 200) {
    const list = res.data;
    dialogForm.menuTree = list;
    return res.data;
  } else {
    ElMessage.error(res.msg);
    return [];
  }
};

const handleAdd = () => {
  dialogForm.visible = true;
  dialogForm.type = "add";
  dialogForm.title = "新增角色";
  dialogForm.data = {
    name: "",
    menuIds: []
  };
  nextTick(() => {
    treeRef.value?.setCheckedKeys([]);
  });
};

const handleEdit = async (id: number) => {
  const res = await getRole<vRole & { id: number }>(id);
  if (res.code === 200) {
    dialogForm.visible = true;
    dialogForm.type = "edit";
    dialogForm.title = "编辑角色";
    dialogForm.data = res.data;
    nextTick(() => {
      treeRef.value?.setCheckedKeys(res.data.menuIds);
    });
  } else {
    ElMessage.error(res.msg);
  }
};

const handleSubmit = async () => {
  if (dialogForm.type === "add") {
    const res = await createRole(dialogForm.data);
    if (res.code === 200) {
      ElMessage.success("新增角色成功");
      dialogForm.visible = false;
      getList();
    } else {
      ElMessage.error(res.msg);
    }
  } else if (dialogForm.type === "edit") {
    if (dialogForm.data.id === undefined) {
      return;
    }
    const data = {
      id: dialogForm.data.id,
      name: dialogForm.data.name,
      menuIds: dialogForm.data.menuIds
    };
    const res = await updateRole(data);
    if (res.code === 200) {
      ElMessage.success("编辑角色成功");
      dialogForm.visible = false;
      getList();
    } else {
      ElMessage.error(res.msg);
    }
  }
};

const handleMenuTreeChange = () => {
  const keys = treeRef.value?.getCheckedKeys();
  if (Array.isArray(keys)) {
    dialogForm.data.menuIds = keys as number[];
  }
};

const handlePageChange = (page: number) => {
  queryForm.page = page;
};

const handleQuery = () => {
  queryForm.page = 1;
  getList();
};

const handleReset = () => {
  queryForm.page = 1;
  queryForm.name = "";
  getList();
};

const handleDelete = async (id: number) => {
  console.log(id);
};
</script>
