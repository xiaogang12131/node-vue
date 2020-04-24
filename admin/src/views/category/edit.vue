<template>
  <div>
    <h1>{{form._id? '编辑':'新建'}}分类</h1>
    <el-form label-width="80px">
      <el-form-item label="上级分类">
        <el-select v-model="form.parent" clearable>
          <el-option
            v-for="(item,index) in parents"
            :label="item.name"
            :value="item._id"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
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
    this.fetchCategoryList()
    this.form._id && this.init()
    console.log(this.$route)
  },
  methods: {
    fetchCategoryList() {
      this.$http.get('rest/category/parentList').then(res => {
        console.log(res)
        this.parents = res.data
      })
    },
    init() {
      this.$http.get(`rest/category/detail/${this.form._id}`).then(res => {
        this.form = res.data
      })
    },
    save() {
      if (this.form._id) {
        this.$http.post('rest/category/update', this.form).then(res => {
          console.log(res)
          this.$router.push('/category/list')
          this.$message({
            type: 'success',
            message: '更新成功'
          })
        })
      } else {
        this.$http.post('rest/category/create', this.form).then(res => {
          console.log(res)
          this.$router.push('/category/list')
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
