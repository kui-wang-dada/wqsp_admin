export default {
  route: {
    cadd: '供应商管理',
  },
  premiss: {
    filter: {
      title_1: '权限管理',
      title_2: '角色名称',
      title_3_1: '用户名',
      title_3_2: '账号',
      title_4: '字典名称',
      search: '查询'
    },
    table: {
      name: '名称',
      sort: '排序',
      parentName: '上级目录',
      actions: '操作',
      descript: '说明',
      edit: '修改',
      delete: '删除',
      phone: '联系电话',
      username: '账号',
      name_2: '用户名',
      email: '邮箱',
      code: '代码',
      value: '值域'
    },
  },
  bill: {
    filter: {
      billNo: '审核单号',
      checkStatus: '审核状态',
      goodsName: '商品名称',
      fullName: '商品全称',
      goodsCode: '商品编码',
      createName: '创建人',
      updateName: '审核人',
      startTime: '开始时间',
      endTime: '结束时间',
      search: '查询'
    },
    table: {
      id: '编号',
      billNo: '审核单号',
      goodsName: '商品名称',
      fullName: '商品全称',
      merNum: '数量',
      createName: '创建人',
      updateName: '审核人',
      checkStatus: '审核状态',
      createDate: '创建时间',
      updateDate: '更改时间',
      shelfLife: '保质期',
      opType: '操作类型',
      actions: '操作',
      edit: '修改',
      delete: '删除'

    },
  },
  supplier: {
    filter: {
      batchNo: '批次号',
      dataType: '操作类型',
      status: '审核状态',
      supplierName: '供应商名称',
      phone: '联系电话',
      buyType: '采购类型',
      payType: '支付类型',
      status_2: '状态',
      id: 'id',
      search: '查询'
    },
    table: {
      batchNo: '批次号',
      createDate: '创建时间',
      createUser: '创建人',
      auditDate: '审核时间',
      status: '审核状态',
      auditUser: '审核人',
      dataType: '操作类型',
      id: '供应商编码',
      supplierName: '供应商名称',
      phone: '联系电话',
      linkMan: '联系人',
      buyType: '采购类型',
      payType: '支付类型',
      status_2: '状态',
      actions: '操作',
      detail: '详情',
      edit: '修改',
      delete: '删除'

    },
  },
  merchant: {
    filter: {
      billNo: '审核单号',
      merchantName: "商户名称",
      merchantType: '商户类型',
      merchantStatus: '商户状态',
      belongArea: '所属区域',
      id: '商户编号',
      goodsCode: '商品编号',
      linkMan: '联系人姓名',
      phone: '联系电话',
      checkStatus: '审核状态',
      search: '查询'
    },
    table: {
      billNo: '审核单号',
      merNum: '商户数量',
      createUser: '创建人',
      createDate: '创建日期',
      updateUser: '审核人',
      updateDate: '审核日期',
      actions: '操作',
      checkStatus: '审核状态',
      opType: '操作类型',
      id: '商户编号',
      merchantName: '商户名称',
      merchantType: '商户类型',
      linkMan: '联系人',
      contactNum: '联系电话',
      addressDetail: '详细地址',
      merchantStatus: '商户状态',

      detail: '详情',
      edit: '修改',
      delete: '删除'

    },
  },
  customer: {
    filter: {
      shopName: '店铺名称',
      channelType: '渠道类型',
      auditStatus: '审核状态',
      belongArea: '所属区域',
      shopPhone: '店主手机',
      contactNum: '联系电话',
      search: '查询'
    },
    table: {
      shopName: '店铺名称',
      channelType: '渠道类型',
      shopMan: '店主姓名',
      shopPhone: '店主手机',
      linkMan: '联系人',
      contactNum: '联系电话',
      shopAddress: '店铺地址',
      auditStatus: '审核状态',
      opType: '操作类型',
      actions: '操作',
      detail: '详情',
      edit: '修改',
      delete: '删除'

    },
  },
  login: {
    title: '系统登录',
    logIn: '登录',
    username: '账号',
    password: '密码',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
  },
  table: {
    add:'新增',
    search:'查询',
    type:'名称',
    date:'时间',
    title:'标题',
    status:'状态',
    importance:'重要性',
    remark:'评论',
    cancel:'取消',
    confirm:'保存',
  },
  head: {
    title_1:'标题',
    title_2:'请选择运营区',
    title_2_4:'标题',
    add:'增加',
    search:'查询'
  },
  sms: {
    filter: {
      title_1:'电话号码',
      title_2:'短信内容',
      title_3_1:'短信类型',
      search:'查询'
    },
    table:{
      mobileNum:'联系电话',
      content:'短信内容',
      createTime:'创建时间',
      randomCode:'验证码',
      type:'类型'
    },
  },
  navbar: {
    logOut: '退出登录',
    dashboard: '首页',
    github: '项目地址',
    screenfull: '全屏',
    theme: '换肤'
  },
}
