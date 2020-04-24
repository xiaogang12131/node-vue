<template>
  <div>
    <h1>{{form._id? '编辑':'新建'}}分类</h1>
    <el-form label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="form.icon" :src="form.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
        icon: ''
      }
    }
  },
  mounted() {
    this.form._id && this.init()
  },
  methods: {
    handleAvatarSuccess(res) {
      this.form.icon = res.url
    },
    init() {
      this.$http.get(`rest/good/detail/${this.form._id}`).then(res => {
        this.form = res.data
      })
    },
    save() {
      if (this.form._id) {
        this.$http.post('rest/good/update', this.form).then(res => {
          console.log(res)
          this.$router.push('/good/list')
          this.$message({
            type: 'success',
            message: '更新成功'
          })
        })
      } else {
        this.$http.post('rest/good/create', this.form).then(res => {
          console.log(res)
          this.$router.push('/good/list')
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

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
