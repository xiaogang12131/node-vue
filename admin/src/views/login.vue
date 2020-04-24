<template>
  <el-card class="login-container" title="登录">
    <el-form class="login-form">
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button style="width: 100%" type="primary" @click="login()">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      form: {}
    }
  },
  methods: {
    login() {
      this.$http.post('/login', this.form).then(res => {
        const { token } = res.data
        localStorage.setItem('token', token)
        this.$message({
          type: 'success',
          message: '登录成功'
        })
        this.$router.push('/')
      })
    }
  }
}
</script>

<style>
.login-container {
  width: 35rem;
  margin: 8rem auto;
}
</style>