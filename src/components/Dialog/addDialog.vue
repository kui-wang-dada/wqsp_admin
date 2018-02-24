<template>
  <div>
    <el-dialog :title="addContent.title" :visible.sync="showDialog" :width="addContent.width">
      <div v-if="addContent.type==0">
        <el-form ref="dataForm" :model="addContent"  label-position="left" label-width="110px"
                 style='width: 400px; margin-left:50px;'>
          <el-form-item :label="item.label"  v-for="item in addContent.content">
            <el-input v-if="item.type==0" :placeholder="item.placehold" v-model="item.select"></el-input>
            <el-select v-else-if="item.type==1" :placeholder="item.placehold" v-model="item.select">
              <el-option
                v-for="option in item.options"
                :label="option"
                :value="option">
              </el-option>
            </el-select>
            <el-autocomplete
              v-else-if="item.type==2"
              class="inline-input"
              v-model="item.select"
              :fetch-suggestions="querySearch"
              :placeholder="item.placehold"
              @focus="handleFocus(item)"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
        </el-form>
      </div>
      <div v-else-if="addContent.type==1">
        <el-table  :data="addContent.content" border style="width: 100%">
          <el-table-column v-for="(item,index) in addContent.label" :label="item.label" :width="item.width">
            <template slot-scope="scope">
              <el-input v-if="item.type==0" :placeholder="item.label" v-model="scope.row.model[index]"></el-input>
              <el-select v-else-if="item.type==1" :placeholder="item.label" v-model="scope.row.model[index]">
                <el-option
                  v-for="option in item.options"
                  :label="option"
                  :value="option">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button @click="addRow" type="success">添加一行</el-button>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">{{$t('table.cancel')}}</el-button>
        <el-button type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>

</template>



<script>
  export default {
    props:[
      "addContent"
    ],
    data(){
      return{
        showDialog:false,
        select_1:"角色",
        selection:[],
        state1:''
      }
    },
    created(){
    },
    methods:{
      add:function () {
        this.showDialog = true
      },
      addRow:function () {
        var content={placehold:this.addContent.content[0].placehold,model:[]}
        this.addContent.content.push(content)
      },
      querySearch(queryString,cb){
        console.log(2)
        var selection=this.selection
        var results = queryString ?selection.filter(this.createFilter(queryString)) : selection;
        results = results.map(o=>{
          return {"value":o}
        })
        console.log(results)
        cb(results);
      },
      createFilter(queryString) {
        return (selection) => {
          return (selection.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleFocus(item) {
        this.selection=item.options
        console.log(123)
      },
      handleSelect(item){
        console.log(item)
      },
      updateData() {
        console.log(this.addContent)
        // this.$refs['dataForm'].validate((valid) => {
        //   if (valid) {
        //     updateArticle(tempData).then(() => {
        //       for (const v of this.list) {
        //         if (v.id === this.temp.id) {
        //           const index = this.list.indexOf(v)
        //           this.list.splice(index, 1, this.temp)
        //           break
        //         }
        //       }
        //       this.showDialog = false
        //       this.$notify({
        //         title: '成功',
        //         message: '更新成功',
        //         type: 'success',
        //         duration: 2000
        //       })
        //     })
        //   }
        // })
      },
    }
  }
</script>

<style>

</style>
