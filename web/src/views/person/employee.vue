<template>
  <div class="employee-main">
    <div class="employee-list-top">
      <el-button type="primary" @click="dialogVisible = true">新增</el-button>
      <el-dialog
        title="人员新增"
        :visible.sync="dialogVisible"
        :close-on-click-modal = "false"
        width="400px">
        <div class="add-people-form">
          <el-form ref="peopleForm" :model="peopleForm" :rules="rules" label-width="80px">
            <el-form-item label="工号" prop="employeeNumber">
              <el-input v-model="peopleForm.employeeNumber"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="peopleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="账号" prop="account">
              <el-input v-model="peopleForm.account"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="peopleForm.password"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="tel">
              <el-input v-model="peopleForm.tel"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary"  @click="addPeople">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <el-table
      :data="employeeList"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="工号"
        width="100">
      </el-table-column>
       <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
       <el-table-column
        prop="name"
        label="手机号"
        width="120">
      </el-table-column>
       <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
       <el-table-column
        prop="name"
        label="姓名"
        width="60">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      employeeList:[],
      peopleForm:{
        employeeNumber: '',
        name: '',
        tel: '',
        account:'',
      },
      rules:{
        employeeNumber: [
          { required: true, trigger: 'blur', message: '请输入员工工号'}
        ],
        name: [
          { required: true, trigger: 'blur', message: '请输入姓名'}
        ],
        account: [
          { required: true, trigger: 'blur', message: '请输入账号'}
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码'}
        ],
        tel: [
          {required: true, trigger: 'blur', message: '请输入手机号码'}
        ]
      },
      dialogVisible: false
    }
  },
  methods: {
    getEmployeeList() {
      axios.get('',{delete: false})
      .then(res => {
        console.log('res',res)
      })
      .catch(err => {
        console.log(err)
      })
    },
    addPeople() {
      console.log('form',this.peopleForm)
      axios.post('/people/add',this.peopleForm)
      .then(res => {
        console.log('res',res)
        if(res.data.code == 200) {
          this.$message.success('人员新增成功')
          this.dialogVisible = false
        } else {
          this.$message.error(`人员新增失败,${res.data.msg}`)
          this.dialogVisible = false
        }
        
      })
      .catch(err => {
        console.log('err',err)
        this.dialogVisible = false
      })
    }
  },
}
</script>

<style>
.employee-list {
  background-color: blue;
}
</style>