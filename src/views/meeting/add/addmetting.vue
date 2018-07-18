<template>
  <div class="mainsecond">
    <div class="tittle">
      {{tittle}}
    </div>
    <el-form ref="form" :model="form" label-width="110px" class="form" label-position="left">
      <el-form-item label="标题">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="运营区">
        <el-select v-model="form.region" placeholder="搜索板块">
          <el-option label="厦门市" value="shanghai"></el-option>
          <el-option label="福州市" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动开始时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="搜索板块" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="活动结束时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="搜索板块" v-model="form.date1" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="活动类型">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="会场活动" value="shanghai"></el-option>
          <el-option label="普通运营区活动" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="展示类别">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="轮播方式" value="shanghai"></el-option>
          <el-option label="轮播方式+会场活动" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="展示方式">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="会场列表" value="shanghai"></el-option>
          <el-option label="商品列表" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详情">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="上传图片">
        <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" show-file-list="true">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="详情图">
        <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" show-file-list="true">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="goback">取消</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
export default {
  data() {
    return {
      tittle: "修改会场轮播",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    }
  },
  methods: {
    goback: function() {
      this.$emit("c", "true")
    },
    onSubmit() {
      console.log("submit!")
    }
  }
}
</script>
<style lang="css" scope>
.mainsecond {
  padding: 10px 15px;
}
.tittle {
  padding: 10px 15px;
  line-height: 20px;
  font-size: 18px;
  /* border-bottom: 1px solid #DCDFE6; */
  /* margin-bottom: 10px; */
}
.form {
  padding: 15px 300px 15px 20px;
  border: 1px solid #dcdfe6;
  box-shadow: 0px 1px 1px #dcdfe6;
}
</style>
