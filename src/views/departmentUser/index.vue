<template>
  <div class="app-container">
    <h1>{{ id }}</h1>
    <div style="text-align: left;">
      <el-button type="primary" style="margin-left: 15px;" @click="handleCreate">新建</el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" border fit>
      <el-table-column prop="id" label="id" width="40" align="center"/>
      <el-table-column prop="userId" label="userId" align="center"/>
      <el-table-column prop="realName" label="人员名称" align="center"/>
      <el-table-column prop="departmentId" label="departmentId" align="center"/>
      <el-table-column prop="departmentName" label="部门名称" align="center"/>
      <el-table-column prop="role" label="担任职位" align="center"/>
      
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogTitle" width="600px">
      <el-form ref="departmentForm" :model="temp" :rules="departmentRules" label-width="100px" style="width: 400px" label-position="left">
        
    
      <el-form-item label="人员选择" prop="userId" placeholder="人员选择">
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


        <el-form-item label="部门选择" prop="departmentId" placeholder="部门选择">
          <el-select v-model="temp.departmentId">
  
          <el-option
          v-for="item in departmentList" 
          :key="item.id" 
          :label="item.name" 
          :value="item.id"
          >
          </el-option>

          </el-select>
        </el-form-item> 

        <el-form-item label="担任职位" prop="role">
          <el-input v-model="temp.role" placeholder="担任职位"/>
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
import { getList, updateDepartment, createDepartment, deleteDepartment } from '@/api/departmentUser'
import {getUsersList} from '@/api/table'
import {getDepartmentList} from '@/api/tree'

export default {
  // name: 'table',
  data() {
    return {
      temp: {
        id: undefined,
        name: '',
        extension: '',
        role:'',
        userId:undefined,
        departmentId:undefined
      },
      list: null,
      userList: null,
      departmentList: null,
      dialogVisible: false,
      dialogTitle: '编辑',
      dialogType: 'edit',
      departmentRules: {
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

      getDepartmentList({ page: 1, size: 1000 }).then(res => {
      const data2 = res.list
      data2.forEach((value, index) => {
        for (const key in value) {
          if (!value.hasOwnProperty(key)) {
            continue
          }
          if (value[key] === 'string' || value[key] === null) {
            value[key] = '未知'
          }
        }
      })
      this.departmentList = data2
      console.log(departmentList)
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
        console.log(data)
        this.list = data
        this.listLoading = false
      }).catch(res => {
        // console.error(res)
      })
    
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        name: '',
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
      this.$refs['departmentForm'].validate().then(valid => {
        updateDepartment(this.temp).then(res => {
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
      this.$refs['departmentForm'].validate().then(valid => {
        createDepartment(this.temp).then(res => {
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
      this.$confirm('确认删除此用户吗？', '确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDepartment({ 'departmentUserId': row.id }).then(res => {
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
              type: 'error'
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
    }
    
  }
}
</script>

<style>
</style>
