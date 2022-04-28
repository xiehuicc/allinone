<template>
  <div class="employee-main">
    <div class="employee-list-top">
      <div class="search-people">
        <el-input v-model="searchContent" placeholder="姓名/工号/手机号" style="border-radius:0px"></el-input>
        <el-button type="primary" icon="el-icon-search" style="border-radius:0px" @click="searchPeople"></el-button>
      </div>
      <div class="add-people-button">
        <el-button  type="primary" @click="dialogVisible = true">新增</el-button>
      </div>
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
      border
      height="650"
      class="people-list-table"
      style="width: 90%">
       <el-table-column
        type="selection"
        width="50">
      </el-table-column>
       <el-table-column
        type="index"
        label="序号"
        width="60">
      </el-table-column>
      <el-table-column
        prop="profile.employeeNumber"
        label="工号"
        width="120">
      </el-table-column>
       <el-table-column
        prop="profile.name"
        label="姓名"
        width="120">
      </el-table-column>
       <el-table-column
        prop="profile.tel"
        label="手机号"
        width="150">
      </el-table-column>
       <el-table-column
        prop="birthday"
        label="生日"
        width="120">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="250">
      </el-table-column>
       <el-table-column
        prop="createTime"
        label="操作"
        width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="handelEdit(scope.row)">编辑</el-button>
            <el-button  type="text">查看</el-button>
          </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      searchContent:'',
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
  mounted() {
    this.getEmployeeList()
  },
  methods: {
    searchPeople(){
      console.log('1111111')
    },
    getEmployeeList() {
      axios.get('/people/pageQuery',{deleted: false})
      .then(res => {
        if(res.data.code == 200) {
          this.employeeList = res.data.result.results
        }
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
    },
    handelEdit(row){
      console.log('row',row)
    }
  },
}
</script>

<style>
.employee-list {
  background-color: blue;
}
.employee-list-top {
  margin: 10px 30px;
  display: flex;
}
.search-people {
  display: flex;
}
.add-people-button {
  margin-left: 50px;
}
.people-list-table {
  margin: 30px 30px;
}
</style>