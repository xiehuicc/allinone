<template>
  <div class="table el-table__body-wrapper is-scrolling-left">
    <el-table
    :data="tableData"
    border
    style="100%">
     <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="date"
      label="入住日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="picture"
      label="照片"
      width="120">
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      width="120">
    </el-table-column>
    <el-table-column
      prop="age"
      label="年龄"
      width="120">
    </el-table-column>
    <el-table-column
      prop="job"
      label="职业"
      width="120">
    </el-table-column>
    <el-table-column
      prop="room"
      label="房间号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="tenancy"
      label="租期"
      width="120">
    </el-table-column>
     <el-table-column
      prop="endtime"
      label="到期时间"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div>
    <button @click="confire">确认</button>
    <button @click="delay">延迟</button>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
       tableData: [{
         date:'2020-02-20',
         name:'小木'
       }]
    }
  },
  methods: {
    handleClick(row){
      console.log(row);
    },
     confire() {
        console.log('1111111111confirm')
        this.debounce(2000)
    },
     test() {
        console.log('method22222222')
    },
     debounce(fn,delay){
        let timer = null //借助闭包
        if(timer !==null) clearTimeout(timer)
        timer = setTimeout(() => {
          this.test()
        },2000)
        console.log('tiemr',timer)
        // return function() {
        // // 每次执行前先清除定时器，以确保在delay时间内fn函数不被执行。
        // timer && clearTimeout(timer) 
        // timer = setTimeout(fn, delay)
        // }
      },
      delay() {
        console.log('ddddddd')
        setTimeout(() => {
          console.log('delaydelay')
        },2000)
      }
    },
}
</script>

<style lang="scss">
.table{
  margin:20px 0 20px 20px;
}
</style>