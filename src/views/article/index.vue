<template>
  <div class="app-container">
    <div style="text-align: left;">
      <el-button type="primary" style="margin-left: 15px;" @click="handleCreate">新建</el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" border fit>
      <el-table-column prop="id" label="id" width="40" align="center"/>
      <el-table-column prop="title" label="标题" align="center"/>
      <el-table-column prop="summary" label="概要" align="center"/>
      <el-table-column prop="cover" label="封面url" align="center"/>
      <el-table-column prop="auther" label="作者" align="center"/>
      <el-table-column prop="time" label="发布时间" align="center"/>
      <el-table-column label="操作" align="center" width="300">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogTitle" width="600px">
      <el-form ref="articleForm" :model="temp" :rules="articleRules" label-width="100px" style="width: 400px" label-position="left">
        <el-form-item label="标题" prop="title">
          <el-input v-model="temp.title" placeholder="标题"/>
        </el-form-item>
        <el-form-item label="概要" prop="summary">
          <el-input v-model="temp.summary" placeholder="概要"/>
        </el-form-item>
        <el-form-item label="封面url" prop="cover">
          <el-input v-model="temp.cover" placeholder="封面url"/>
        </el-form-item>
        <el-form-item label="作者" prop="auther">
          <el-input v-model="temp.auther" placeholder="作者"/>
        </el-form-item>
        <el-form-item label="发布时间" prop="time">
          <el-date-picker type="datetime"  v-model="temp.time" placeholder="发布时间" value-format="yyyy-mm-dd HH:mm:ss" format="yyyy年MM月dd日 HH时mm分ss秒"/>
        </el-form-item>
        <el-form-item  label="内容" prop="content">
          <el-input v-model="temp.content" placeholder="内容"/>
        </el-form-item>

 
        <el-form-item label="撰写人" prop="userId" placeholder="撰写人">
          <el-select v-model="temp.userId">
            
          <el-option
          v-for="item in userList" 
          :key="item.id" 
          :label="item.realName" 
          :value="item.id"
          >
          </el-option>

          </el-select>
      </el-form-item>

      </el-form>
      <div style="text-align: right;">
        <el-button @click="dialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogType === 'update'?updateD():createD()">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, updateArticle, createArticle, deleteArticle } from '@/api/article'
import {getUsersList} from '@/api/table'

export default {
  // name: 'table',
  data() {
    return {
      temp: {
        id: undefined,
        name: '',
        extension: ''
      },
      list: null,
      userList: null,
      dialogVisible: false,
      dialogTitle: '编辑',
      dialogType: 'edit',
      articleRules: {
        id: [{ required: true, trigger: 'blur' }],
        name: [{ required: true, trigger: 'blur' }],
        extension: [{ required: true, trigger: 'blur' }]
      }
    }
  },
  created() {
    this.initData()
    getUsersList({ page: 1, size: 1000 }).then(res => {
      const data1 = res.list
      data1.forEach((value, index) => {
        for (const key in value) {
          if (!value.hasOwnProperty(key)) {
            continue
          }
          if (value[key] === 'string' || value[key] === null) {
            value[key] = '未知'
          }
        }
      })
      this.userList = data1
      console.log(userList)
      }).catch(res => {
        // console.error(res)
      })
  },
  methods: {
    initData() {
      this.listLoading = true
      getList({ page: 1, size: 1000 }).then(res => {
        const data = res.list
        data.forEach((value, index) => {
          for (const key in value) {
            if (!value.hasOwnProperty(key)) {
              continue
            }
            if (value[key] === 'string' || value[key] === null) {
              value[key] = '未知'
            }
          }
        })
        this.list = data
        this.listLoading = false
      }).catch(res => {
        // console.error(res)
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        time: '2000-01-22 11:11:11',
        extension: ''
      }
    },
    handleUpdate(row) {
      // 复制row对象
      this.temp = Object.assign({}, row)
      console.log(row)
      this.dialogTitle = '编辑'
      this.dialogType = 'update'
      this.dialogVisible = true
    },
    updateD(row) {
      console.log(this.temp)
      this.$refs['articleForm'].validate().then(valid => {
        updateArticle(this.temp).then(res => {
          if (res.status) {
            this.dialogVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success'
            })
          } else {
            this.dialogVisible = false
            this.$notify({
              title: '更新成功',
              message: res.error,
              type: 'success'
            })
          }
           location.reload()
        })
      }).catch(valid => {
        // valid failed
      })
    },
    handleCreate() {
      this.resetTemp()
      this.dialogTitle = '新建'
      this.dialogType = 'create'
      this.dialogVisible = true
    },
    createD() {
      this.$refs['articleForm'].validate().then(valid => {
        createArticle(this.temp).then(res => {
          if (res.status) {
            this.dialogVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success'
            })
          } else {
            this.dialogVisible = false
            this.$notify({
              title: '成功',
              message: res.error,
              type: 'success'
            })
          }
            location.reload()
        })

      })
    },
    handleDelete(row) {
      this.$confirm('确认删除此这个文章吗？', '确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle({ 'articleId': row.id }).then(res => {
          if (res.status) {
            const index = this.list.indexOf(row)
            this.list.splice(index, 1)
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success'
            })
          } else {
            this.$notify({
              title: '删除成功',
              message: res.error,
              type: 'success'
            })
          }
          location.reload()
        })
      }).catch(() => {
        this.$notify({
          title: '已取消',
          type: 'success'
        })
      })
    },
    redictToArticleUser(row) {
      this.$router.push({ name: 'articleUser', params: { id: row.id }})
    }
  }
}
</script>

<style>
</style>
