<template>
  <div>
    <h1>{{form._id? '编辑':'新建'}}英雄</h1>
    <el-form label-width="80px">
      <el-tabs type="card">
        <el-tab-pane label="基本信息">
          <el-form-item label="名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="form.avatar" :src="form.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型">
            <el-select multiple v-model="form.category">
              <el-option
                v-for="(item,index) in categories"
                :label="item.name"
                :value="item._id"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate :max="9" show-score style="margin-top: 0.6rem" v-model="form.scores.difficult"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate :max="9" show-score style="margin-top: 0.6rem" v-model="form.scores.skill"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate :max="9" show-score style="margin-top: 0.6rem" v-model="form.scores.attack"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate :max="9" show-score style="margin-top: 0.6rem" v-model="form.scores.survive"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select multiple v-model="form.items1">
              <el-option
                v-for="(item,index) in items"
                :label="item.name"
                :value="item._id"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select multiple v-model="form.items2">
              <el-option
                v-for="(item,index) in items"
                :label="item.name"
                :value="item._id"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="form.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对战技巧">
            <el-input type="textarea" v-model="form.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战技巧">
            <el-input type="textarea" v-model="form.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能信息">
          <el-button
            size="small"
            type="primary"
            plain
            icon="el-icon-plus"
            @click="form.skills.push({})"
          >添加技能</el-button>
          <el-row style="margin-top:1rem;flex-wrap:wrap" type="flex">
            <el-col :span="12" v-for="(item,index) in form.skills" :key="index">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="res => $set(item,'icon',res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  @click="form.skills.splice(index,1)"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                ></el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item>
        <el-button style="margin-top: 1rem" type="primary" @click="save()">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      categories: [],
      form: {
        _id: this.$route.query._id,
        name: '',
        avatar: '',
        scores: {},
        skills: []
      }
    }
  },
  mounted() {
    this.fetchItems()
    this.fetchCategories()
    this.form._id && this.init()
  },
  methods: {
    handleAvatarSuccess(res) {
      this.form.avatar = res.url
    },
    fetchItems() {
      this.$http.post('rest/good/list').then(res => {
        this.items = res.data
      })
    },
    fetchCategories() {
      this.$http.post('rest/category/list').then(res => {
        this.categories = res.data
      })
    },
    init() {
      this.$http.get(`rest/hero/detail/${this.form._id}`).then(res => {
        this.form = Object.assign({}, this.form, res.data)
      })
    },
    save() {
      if (this.form._id) {
        this.$http.post('rest/hero/update', this.form).then(res => {
          console.log(res)
          this.$router.push('/hero/list')
          this.$message({
            type: 'success',
            message: '更新成功'
          })
        })
      } else {
        this.$http.post('rest/hero/create', this.form).then(res => {
          console.log(res)
          this.$router.push('/hero/list')
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
  width: 6rem;
  height: 6rem;
  line-height: 6rem;
  text-align: center;
}
.avatar {
  width: 6rem;
  height: 6rem;
  display: block;
}
</style>
