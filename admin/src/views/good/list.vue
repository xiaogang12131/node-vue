<template>
  <div>
    <div>物品列表</div>
    <el-table :data="tableData">
      <el-table-column prop="_id" label="ID" width="300"></el-table-column>
      <el-table-column prop="name" label="物品名称"></el-table-column>\
      <el-table-column label="图标">
        <template slot-scope="scope">
          <img :src="scope.row.icon" alt style="width:10rem" />
        </template>
      </el-table-column>
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
      this.$http.post('/rest/good/list').then(res => {
        console.log(res)
        this.tableData = res.data
      })
    },
    editItem(_id) {
      this.$router.push({ path: '/good/edit', query: { _id } })
    },
    deleteItem(_id) {
      this.$http.delete(`/rest/good/delete/${_id}`).then(res => {
        this.$message(res.data)
        this.init()
      })
    }
  }
}
</script>

<style></style>
