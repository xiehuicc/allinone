<template>
  <div class="login">
    <div class="loginbox">
      <div class="container">
         <el-form 
        :model="ruleForm" 
        status-icon 
        :rules="rules" 
        ref="ruleForm" 
        class="demo-ruleForm">
          <el-form-item prop="user">
            <el-input
              placeholder="请输入账号"
              prefix-icon="el-icon-user"
              v-model="ruleForm.user"
            ></el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input 
            placeholder="请输入密码"
            type="password" 
            prefix-icon="el-icon-lock"
            v-model="ruleForm.pass" 
            autocomplete="off">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
   data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      return {
        //表单数据
        ruleForm: {
          user:'admin',
          pass: '111111',
        },
        rules: {
          user: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在3到5个字符', trigger: 'blur' }
        ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$router.push({path:'/sideBar'})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
}
</script>

<style scoped lang="scss">
*{
  padding: 0;
  margin: 0;
}
.login{
  height: 100%;
  width: 100%;
  margin-top: 200px;
}
.loginbox{
  display: flex;
  justify-content: center;
  align-items: center;
  .container{
    width: 400px;
    height: 300px;
  }
  }
</style>