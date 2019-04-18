<template>
  <div class="app-container">
    <div style="text-align: left;">
      <el-button type="primary" style="margin-left: 15px;" @click="handleCreate">新建</el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" border fit>
      <el-table-column prop="id" label="id" width="40" align="center"/>
      <el-table-column prop="realName" label="姓名" align="center"/>
      <el-table-column label="性别" align="center" width="70">
        <template slot-scope="scope">
          <span v-if="scope.row.gender === '1'">男</span>
          <span v-else-if="scope.row.gender === '2'">女</span>
          <span v-else>未知</span>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" align="center"/>
      <el-table-column prop="nickName" label="昵称" align="center"/>
      <el-table-column label="个人主页" align="center" width="250">
        <template slot-scope="scope">
          <a v-if="scope.row.homePage !== '未知'" :href="scope.row.homePage">{{ scope.row.homePage }}</a>
          <span v-else>未知</span>
        </template>
      </el-table-column>
      <el-table-column prop="studentNum" label="学号" align="center"/>
      <el-table-column prop="birthday" label="生日" align="center"/>
      <el-table-column prop="major" label="专业" align="center"/>

      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogTitle" width="600px">
      <el-form ref="userForm" :model="temp" :rules="userRules" label-width="100px" style="width: 400px" label-position="left">
        <el-form-item label="姓名" prop="realName">
          <el-input v-model="temp.realName" placeholder="姓名"/>
        </el-form-item>
        <el-form-item label="性别" prop="gender" placeholder="性别">
          <el-select v-model="temp.gender">
            <el-option label="未知" value="0"/>
            <el-option label="男" value="1"/>
            <el-option label="女" value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="temp.username" placeholder="用户名"/>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="temp.nickName" placeholder="昵称"/>
        </el-form-item>
        <el-form-item label="个人主页" prop="homePage">
          <el-input v-model="temp.homePage" placeholder="个人主页"/>
        </el-form-item>
        <el-form-item label="学号" prop="studentNum">
          <el-input v-model="temp.studentNum" placeholder="学号"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="temp.password" placeholder="密码"/>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker v-model="temp.birthday" type="date" placeholder="生日" value-format="yyyy-MM-dd" format="yyyy年MM月dd日"/>
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-input v-model="temp.major" placeholder="专业"/>
        </el-form-item>
      </el-form>
      <div style="text-align: right;">
        <el-button @click="dialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogType === 'update'?updateU():createU()">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, updateUser, createUser, deleteUser } from '@/api/table'

export default {
  // name: 'table',
  data() {
    return {
      temp: {
        id: undefined,
        username: '',
        nickName: '',
        realName: '',
        homePage: '',
        studentNum: '',
        password: '',
        birthday: '',
        major: '',
        gender: '0'
      },
      list: null,
      dialogVisible: false,
      dialogTitle: '编辑',
      dialogType: 'edit',
      gender: ['未知', '男', '女'],
      userRules: {
        id: [{ required: true, trigger: 'blur' }],
        username: [{ required: true, trigger: 'blur' }],
        nickName: [{ required: true, trigger: 'blur' }],
        realName: [{ required: true, trigger: 'blur' }],
        homePage: [{ required: true, trigger: 'blur' }],
        studentNum: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur' }],
        birthday: [{ required: true, trigger: 'blur' }],
        major: [{ required: true, trigger: 'blur' }],
        gender: [{ required: true, trigger: 'blur' }]
      }
    }
  },
  created() {
    this.initData()
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
          // value['gender'] = this.gender[value['gender']]
          value['gender'] = String(value['gender'])
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
        username: '',
        nickName: '',
        realName: '',
        homePage: '',
        studentNum: '',
        password: '',
        birthday: '2011-01-22',
        major: '',
        gender: 0
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
    updateU(row) {
      console.log(this.temp)
      this.$refs['userForm'].validate().then(valid => {
        this.temp['gender'] = Number(this.temp['gender'])
        updateUser(this.temp).then(res => {
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
              title: '成功',
              message: res.error,
              type: 'success'
            })
          }
          location.reload();

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
    createU() {
      this.$refs['userForm'].validate().then(valid => {
        createUser(this.temp).then(res => {
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
          location.reload();
        })
      })
    },
    handleDelete(row) {
      this.$confirm('确认删除此用户吗？', '确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser({ 'userId': row.id }).then(res => {
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
              title: '成功',
              message: res.error,
              type: 'success'
            })
          }
          location.reload();
        })
      }).catch(() => {
        this.$notify({
          title: '已取消',
          type: 'success'
        })
      })
    }
  }
}
</script>

<style>
</style>
