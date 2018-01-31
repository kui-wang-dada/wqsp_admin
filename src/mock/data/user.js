import Mock from 'mockjs';

const LoginUsers = [
	{
		id: 1,
		username: 'admin',
		password: '123456',
		avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
		name: '张某某'
	}
];

const Users = [
	{
		name: "权限管理",
		sort: "1",
		parentName: "系统管理",
	},
	{
		name: "角色管理",
		sort: "2",
		parentName: "系统管理",
	},
	{
		name: "用户管理",
		sort: "3",
		parentName: "系统管理",
	},
	{
		name: "数据字典",
		sort: "5",
		parentName: "系统管理",
	},
	{
		name: "新增商品单据",
		sort: "1",
		parentName: "商品管理",
	},
	{
		name: "商品管理",
		sort: "3",
		parentName: "商品管理",
	},
	{
		name: "新增供应商",
		sort: "1",
		parentName: "供应商管理",
	},
	{
		name: "供应商管理",
		sort: "2",
		parentName: "供应商管理",
	},
	{
		name: "新增商户单据",
		sort: "1",
		parentName: "商户管理",
	},
	{
		name: "商户查询",
		sort: "2",
		parentName: "商户管理",
	},
	{
		name: "商户查询",
		sort: "2",
		parentName: "商户管理",
	},
	{
		name: "新增商户单据",
		sort: "1",
		parentName: "商户管理",
	},
	{
		name: "商户查询",
		sort: "2",
		parentName: "商户管理",
	},
	{
		name: "商户查询",
		sort: "2",
		parentName: "商户管理",
	},
	{
		name: "新增商户单据",
		sort: "1",
		parentName: "商户管理",
	},
	{
		name: "商户查询",
		sort: "2",
		parentName: "商户管理",
	},
	{
		name: "商户查询",
		sort: "2",
		parentName: "商户管理",
	},
	{
		name: "新增商户单据",
		sort: "1",
		parentName: "商户管理",
	},
	{
		name: "商户查询",
		sort: "2",
		parentName: "商户管理",
	},
	{
		name: "商户查询",
		sort: "2",
		parentName: "商户管理",
	},
	{
		name: "新增商户单据",
		sort: "1",
		parentName: "商户管理",
	},
	{
		name: "商户查询",
		sort: "2",
		parentName: "商户管理",
	},
	{
		name: "商户查询",
		sort: "2",
		parentName: "商户管理",
	},
	{
		name: "新增商户单据",
		sort: "1",
		parentName: "商户管理",
	},
	{
		name: "商户查询",
		sort: "2",
		parentName: "商户管理",
	},
	{
		name: "商户查询",
		sort: "2",
		parentName: "商户管理",
	},
	{
		name: "商户查询",
		sort: "2",
		parentName: "商户管理",
	},
	{
		name: "新增商户单据",
		sort: "1",
		parentName: "商户管理",
	},
	{
		name: "商户查询",
		sort: "2",
		parentName: "商户管理",
	},
	{
		name: "商户查询",
		sort: "2",
		parentName: "商户管理",
	}
];

/*const Users = []
for (let i = 0; i < 86; i++) {
	Users.push(Mock.mock({
		id: Mock.Random.guid(),
		name: Mock.Random.cname(),
		addr: Mock.mock('@county(true)'),
		'age|18-60': 1,
		birth: Mock.Random.date(),
		sex: Mock.Random.integer(0, 1)
	}));
}*/


export {LoginUsers, Users};
