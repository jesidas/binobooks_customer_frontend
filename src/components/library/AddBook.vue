<template>
  <div>
    <el-form
      :model="addBookForm"
      :rules="addBookFormRules"
      ref="addBookFormRef"
      label-width="80px"
      style="width:50%"
    >
      <el-form-item label="书名" prop="name">
        <el-input v-model="addBookForm.name"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="addBookForm.author"></el-input>
      </el-form-item>
      <el-form-item label="出版社" prop="publish">
        <el-input v-model="addBookForm.publish"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model="addBookForm.price"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addBookForm: {
        id: "",
        name: "",
        author: "",
        publish: "",
        price: "",
      },
      addBookFormRules: {
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

  methods: {
    onSubmit() {
      this.$refs.addBookFormRef.validate(async (valid) =>{
        if(!valid) return this.$message.error("请补全表单")
        // 调用接口，提交信息
        const {data: res} = await this.$http.post('book/save', this.addBookForm)
        if(res === 'success') return this.$message.success("成功添加")
        this.$message.error("添加失败")
      })
    },
    resetForm(){
      this.$refs.addBookFormRef.resetFields()
    }
  },
};
</script>


<style lang="less" scoped>
</style>