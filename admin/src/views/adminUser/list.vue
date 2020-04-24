<template>
  <div>
    <div>分类列表</div>
    <el-table :data="tableData">
      <el-table-column prop="_id" label="ID" width="300"></el-table-column>
      <el-table-column prop="username" label="名称"></el-table-column>
      <el-table-column prop="password" label="密码"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editItem(scope.row._id)">编辑</el-button>
          <el-button type="text" size="small" @click="deleteItem(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.$http.post('/rest/adminUser/list').then(res => {
        console.log(res)
        this.tableData = res.data
      })
    },
    editItem(_id) {
      this.$router.push({ path: '/adminUser/edit', query: { _id } })
    },
    deleteItem(_id) {
      this.$http.delete(`/rest/adminUser/delete/${_id}`).then(res => {
        this.$message(res.data)
        this.init()
      })
    }
  }
}
</script>

<style></style>
