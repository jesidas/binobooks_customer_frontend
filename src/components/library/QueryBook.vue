<template>
  <div>
    <el-table :data="books" stripe border style="width: 100%">
      <el-table-column prop="id" label="id" width="180"> </el-table-column>
      <el-table-column prop="name" label="书名" width="180"> </el-table-column>
      <el-table-column prop="author" label="作者"> </el-table-column>
      <el-table-column prop="publish" label="出版社"> </el-table-column>
      <el-table-column prop="pages" label="页数"> </el-table-column>
      <el-table-column prop="price" label="价格"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >修改</el-button
          >
          <el-button type="text" size="small" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="this.currentPage"
      :page-sizes="[1, 2]"
      :page-size="this.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.total"
    >
    </el-pagination>
    <!-- 修改信息-弹窗 -->
    <el-dialog
      title="修改信息"
      :visible.sync="editDialogVisible"
      width="45%"
      @closed="handleDialogClosed"
    >
      <span
        ><el-form
          :model="editBookForm"
          :rules="editBookFormRules"
          ref="editBookFormRef"
          label-width="80px"
        >
          <el-form-item label="书名" prop="name">
            <el-input v-model="editBookForm.name"></el-input>
          </el-form-item>
          <el-form-item label="作者" prop="author">
            <el-input v-model="editBookForm.author"></el-input>
          </el-form-item>
          <el-form-item label="出版社" prop="publish">
            <el-input v-model="editBookForm.publish"></el-input>
          </el-form-item>
          <el-form-item label="价格" prop="price">
            <el-input v-model="editBookForm.price"></el-input>
          </el-form-item> </el-form
      ></span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmitEditForm">修改</el-button>
        <el-button @click="resetEditForm">重置</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      books: [],
      total: 0,
      pageSize: 2,
      currentPage: 1,
      // 弹窗设置
      editDialogVisible: false,
      editBookForm: {
        id: "",
        name: "",
        author: "",
        publish: "",
        price: "",
      },
      editBookFormRules: {
        name: [
          { required: true, message: "请输入书籍名称", trigger: "blur" },
          { min: 1, max: 100, message: "长度在至少为1字符", trigger: "blur" },
        ],
        author: [
          { required: true, message: "请输入作者名", trigger: "blur" },
          { min: 1, max: 100, message: "长度在至少为1字符", trigger: "blur" },
        ],
        publish: [
          { required: true, message: "请输入出版社名称", trigger: "blur" },
          { min: 1, max: 100, message: "长度在至少为1字符", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    async getTableData() {
      const res = await this.$http.get(
        `/book/findAll/${this.currentPage}/${this.pageSize}`
      );
      console.log(res.data);
      this.books = res.data.content;
      this.total = res.data.totalElements;
    },
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.getTableData();
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
      this.getTableData();
    },
    async handleEdit(info) {
      console.log(info);
      this.editDialogVisible = true;
      const id = info.id;
      const { data: res } = await this.$http.get("/book/findById/" + id);
      this.editBookForm = res;
    },
    // 弹窗
    resetEditForm() {
      this.$refs.editBookFormRef.resetFields();
    },
    onSubmitEditForm() {
      this.$refs.editBookFormRef.validate(async (valid) => {
        if (!valid) return this.$message.error("请补全表单");
        // 调用接口，提交信息
        const { data: res } = await this.$http.put(
          "book/update",
          this.editBookForm
        );
        // 修改成功
        if (res === "success") {
          this.editDialogVisible = false;
          this.getTableData();
          return this.$message.success("修改成功");
        }
        this.$message.error("修改失败");
      });
    },
    handleDialogClosed() {
      this.resetEditForm();
    },
    // 删除
    handleDelete(info) {
      this.$confirm("此操作将永久删除该数据信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const result = await this.$http.delete("/book/deleteById/" + info.id);
          if (result.status !== 200) {
            return this.$message.error("删除失败");
          }
          this.$message.success("删除成功!")
          this.getTableData()
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>