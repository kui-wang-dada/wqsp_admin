<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="字典名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUser">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<template>
			<el-table :data="users" highlight-current-row v-loading="loading" border stripe style="width: 100%;">
				<el-table-column type="selection" min-width="50">
				</el-table-column>
				<el-table-column prop="name" label="名称" min-width="120" sortable>
				</el-table-column>
				<el-table-column prop="code" label="代码" min-width="100"  sortable>
				</el-table-column>
				<el-table-column prop="descript" label="说明" min-width="200" sortable>
				</el-table-column>
				<el-table-column prop="value" label="值域" min-width="200" sortable>
				</el-table-column>
				<el-table-column label="操作" min-width="150">
					<template slot-scope="scope">
						<el-button size="small" type="primary" icon="edit" >编辑</el-button>
						<el-button type="danger" icon="delete" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</template>

	</section>
</template>
<script>
	import { getUserList } from '../../api/api';

		var datadict=require("../../mock/falseData/1_systemAdmin/datadict")
	//import NProgress from 'nprogress'
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				loading: false,
				users: datadict.data
			}
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			//获取用户列表
			getUser: function () {
				let para = {
					name: this.filters.name
				};
				this.loading = true;
				//NProgress.start();
				getUserList(para).then((res) => {
					this.users = res.data.users;
					this.loading = false;
					//NProgress.done();
				});
			}
		},
		
	};

</script>

<style scoped>

</style>