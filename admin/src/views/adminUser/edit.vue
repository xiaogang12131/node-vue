<template>
  <div>
    <h1>{{form._id? '编辑':'新建'}}分类</h1>
    <el-form label-width="120px">
      <el-form-item label="管理员名称">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="管理员密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save()">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      parents: [],
      form: {
        _id: this.$route.query._id,
        name: '',
        parent: ''
      }
    }
  },
  mounted() {
    this.form._id && this.init()
    console.log(this.$route)
  },
  methods: {
    init() {
      this.$http.get(`rest/adminUser/detail/${this.form._id}`).then(res => {
        this.form = res.data
      })
    },
    save() {
      if (this.form._id) {
        this.$http.post('rest/adminUser/update', this.form).then(res => {
          console.log(res)
          this.$router.push('/adminUser/list')
          this.$message({
            type: 'success',
            message: '更新成功'
          })
        })
      } else {
        this.$http.post('rest/adminUser/create', this.form).then(res => {
          console.log(res)
          this.$router.push('/adminUser/list')
          this.$message({
            type: 'success',
            message: '保存成功'
          })
        })
      }
    }
  }
}
</script>

<style></style>
