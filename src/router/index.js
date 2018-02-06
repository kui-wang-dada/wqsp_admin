import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if fasle ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'premiss',
    name:'系统管理',
    meta: { title: '系统管理', icon: 'premiss', noCache: true },
    children: [
      { path: 'premiss', component: _import('premiss/Permiss'), name: 'premiss', meta: { title: '权限管理' , icon: 'pre-quan' }, },
      // { path: 'premiss:id', component: _import('premiss/addform'), name: 'premiss',  hidden: true},
      { path: 'role', component: _import('premiss/role'), name: 'role', meta: { title: '角色管理' , icon: 'pre-jiao'}},
      { path: 'user', component: _import('premiss/user'), name: 'user', meta: { title: '用户管理' , icon: 'pre-yong'}},
      { path: 'datadict', component: _import('premiss/datadict'), name: 'datadict', meta: { title: '数据字典' , icon: 'pre-zi'}}]
  },
  {
    path: '/goodsBills',
    component: Layout,
    name:'商品管理',
    redirect: '/goodsBills/goodsBill',
    meta: { title: '商品管理', icon: 'goodsBill', noCache: true },
    children: [
      { path: 'goodsBill', component: _import('bill/goodsBill'), name: '新增商品单据', meta: { title: '新增商品单据' , icon: 'pre-zeng'}},
      { path: 'goods', component: _import('bill/goods'), name: '商品管理列表', meta: { title: '商品管理列表' , icon: 'pre-lie'}}
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/supplierAudits',
    component: Layout,
    name: '供应商管理',
    redirect: '/supplierAudits/supplierAudit',
    meta: { title: '供应商管理', icon: 'supplier', noCache: true },
    children: [
      { path: 'supplierAudit', component: _import('supplier/supplierAudit'), name: '新增供应商', meta: { title: '新增供应商' , icon: 'pre-hu'}},
      { path: '3_supplier', component: _import('supplier/supplier'), name: '供应商管理列表', meta: { title: '供应商管理列表' , icon: 'pre-gong'}}
    ]
  },
  {
    path: '/merchantBillAudits',
    component: Layout,
    name: '商户管理管理',
    redirect: '/merchantBillAudits/merchantBillAudit',
    meta: { title: '商户管理', icon: 'merchants', noCache: true },
    children: [
      { path: 'merchantBillAudit', component: _import('merchant/merchantBillAudit'), name: '新增商户单据', meta: { title: '新增商户单据' , icon: 'pre-dan'}},
      { path: 'merchant', component: _import('merchant/merchant'), name: '商户查询', meta: { title: '商户查询' , icon: 'pre-cus'}}
    ]
  },
  {
    path: '/operateAreas',
    component: Layout,
    name: '运营区管理',
    redirect: '/operateAreas/operateArea',
    meta: { title: '运营区管理', icon: 'operating', noCache: true },
    children: [
      { path: 'operateArea', component: _import('sale/operateArea'), name: '运营区管理列表', meta: { title: '运营区管理列表' , icon: 'pre-wei'}},
      { path: 'operateClassify', component: _import('sale/operateClassify'), name: '运营区展示分类管理', meta: { title: '运营区展示分类' , icon: 'pre-sou'}},
      { path: 'salesAreaBill', component: _import('sale/salesAreaBill'), name: '销售范围指定', meta: { title: '销售范围指定' , icon: 'pre-fu'}},
      { path: 'salesArea', component: _import('sale/salesArea'), name: '销售范围查询', meta: { title: '销售范围查询' , icon: 'pre-zuo'}},
      { path: 'salesAreaPriceBill', component: _import('sale/salesAreaPriceBill'), name: '售价管理', meta: { title: '售价管理' , icon: 'pre-order'}},
      { path: 'classifyGoods', component: _import('sale/classifyGoods'), name: '展示分类、归属商品', meta: { title: '展示分类归属商品' , icon: 'pre-zhan'}},
      { path: 'operatePro', component: _import('sale/operatePro'), name: '促销、清仓商品', meta: { title: '促销、清仓商品' , icon: 'pre-cu'}},
      { path: 'operateAreaGoodClass', component: _import('sale/operateAreaGoodClass'), name: '进口商品管理', meta: { title: '进口商品管理' , icon: 'pre-jin'}},
      { path: 'promotionRule', component: _import('sale/promotionRule'), name: '促销活动管理', meta: { title: '促销活动管理' , icon: 'pre-cu'}},
      { path: 'limitBuy', component: _import('sale/limitBuy'), name: '限购', meta: { title: '限购' , icon: 'xiangou'}},
      { path: 'tempadjust', component: _import('sale/tempadjust'), name: '限购数量临时调整', meta: { title: '限购数量临时调整' , icon: 'shuliang'}},
      { path: 'promotionGroup', component: _import('sale/promotionGroup'), name: '促销组管理', meta: { title: '促销组管理' , icon: 'guanli'}}
    ]
  },
  {
    path: '/customerAudits',
    component: Layout,
    name: '客户管理',
    redirect: '/customerAudits/customerAudit',
    meta: { title: '客户管理', icon: 'customer', noCache: true },
    children: [
      { path: 'customerAudit', component: _import('customer/customerAudit'), name: '新增客户单据', meta: { title: '新增客户单据' , icon: 'kehu'}},
      { path: 'customer', component: _import('customer/customer'), name: '客户查询', meta: { title: '客户查询' , icon: 'chaxun'}},
      { path: 'deliveryAddressAudit', component: _import('customer/deliveryAddressAudit'), name: '收货地址审核', meta: { title: '收货地址审核' , icon: 'dizhi'}},
      { path: 'voucherGrant', component: _import('customer/voucherGrant'), name: '代金券管理', meta: { title: '代金券管理' , icon: 'jinquan'}},
      { path: 'deliveryAddress', component: _import('customer/deliveryAddress'), name: '客户地址查询', meta: { title: '客户地址查询' , icon: 'add-dizhi' }},
      { path: 'voucher', component: _import('customer/voucher'), name: '代金券发放', meta: { title: '代金券发放' , icon: 'add-fa' }},
      { path: 'customerPushMan', component: _import('customer/customerPushMan'), name: '修改客户地推人员', meta: { title: '修改客户地推人员' , icon: 'add-ren' }}
    ]
  },
  {
    path: '/appOrders',
    component: Layout,
    name: '订单管理',
    redirect: '/appOrders/appOrder',
    meta: { title: '订单管理', icon: 'appOrder', noCache: true },
    children: [
      { path: 'appOrder', component: _import('finance/appOrder'), name: '订单管理列表', meta: { title: '订单管理列表' , icon: 'add-lie' }},
      { path: 'saleInfo', component: _import('finance/saleInfo'), name: '订单拆单查询', meta: { title: '订单拆单查询' , icon: 'add-chai' }},
      { path: 'finance', component: _import('finance/finance'), name: '财务订单报表', meta: { title: '财务订单报表' , icon: 'guanli' }},
      { path: 'financeGather', component: _import('finance/financeGather'), name: '财务汇总报表', meta: { title: '财务汇总报表' , icon: 'add-bao' }},
      { path: 'financeCost', component: _import('finance/financeCost'), name: '财务费用查询', meta: { title: '财务费用查询' , icon: 'add-fei' }},
      { path: 'goodsSale', component: _import('finance/goodsSale'), name: '商品销量报表', meta: { title: '商品销量报表' , icon: 'add-pin' }}
    ]
  },
  {
    path: '/purchaseAudits',
    component: Layout,
    name: '采购管理',
    redirect: '/purchaseAudits/purchaseAudit',
    meta: { title: '采购管理', icon: 'purchase', noCache: true },
    children: [
      { path: 'purchaseAudit', component: _import('purchase/purchaseAudit'), name: '新增采购单据', meta: { title: '新增采购单据' , icon: 'add-zeng' }},
      { path: 'purchase', component: _import('purchase/purchase'), name: '采购查询', meta: { title: '采购查询' , icon: 'add-gou' }}
    ]
  },
  {
    path: '/purchasePriceAudits',
    component: Layout,
    name: '库存管理',
    redirect: '/purchasePriceAudits/purchasePriceAudit',
    meta: { title: '库存管理', icon: 'purch', noCache: true },
    children: [
      { path: 'purchasePriceAudit', component: _import('purch/purchasePriceAudit'), name: '新增库存', meta: { title: '新增库存' , icon: 'add-ku' }},
      { path: 'purchasePrice', component: _import('purch/purchasePrice'), name: '库存查询', meta: { title: '库存查询' , icon: 'add-cun' }}
    ]
  },
  {
    path: '/goodsShelvesAudits',
    component: Layout,
    name: '商品上下架管理',
    redirect: '/goodsShelvesAudits/goodsShelvesAudit',
    meta: { title: '商品上下架管理', icon: 'goodsShelvesAudit', noCache: true },
    leaf: true,
    children: [
      { path: 'goodsShelvesAudit', component: _import('audit/goodsShelvesAudit'), name: '商品上下架管理列表', meta: { title: '商品上下架管理' , icon: 'add-jia' }}
    ]
  },
  {
    path: '/goodsBacks',
    component: Layout,
    name: '退货管理',
    redirect: '/goodsBacks/goodsBack',
    meta: { title: '退货管理', icon: 'goodsBack', noCache: true },
    children: [
      { path: 'goodsBack', component: _import('goods/goodsBack'), name: '退货单据管理', meta: { title: '退货单据管理' , icon: 'new-yun' }},
      { path: 'goodsBackDelivery', component: _import('goods/goodsBackDelivery'), name: '退货出库查询', meta: { title: '退货出库查询' , icon: 'new-chu' }}
    ]
  },
  {
    path: '/operateWmsAudits',
    component: Layout,
    name: '运营区仓库管理',
    redirect: '/operateWmsAudits/operateWmsAudit',
    meta: { title: '运营区仓库管理', icon: 'icon_dail_fill', noCache: true },
    children: [
      { path: 'operateWmsAudit', component: _import('operate/operateWmsAudit'), name: '新增运营区仓库', meta: { title: '新增运营区仓库' , icon: 'new-cang' }},
      { path: 'operateWms', component: _import('operate/operateWms'), name: '运营区仓库查询', meta: { title: '运营区仓库查询' , icon: 'new-ku' }},
      { path: 'wmsDept', component: _import('operate/wmsDept'), name: '仓库管理', meta: { title: '仓库管理' , icon: 'new-li' }}
    ]
  },
  {
    path: '/pushManAudits',
    component: Layout,
    name: '地推管理',
    redirect: '/pushManAudits/pushManAudit',
    meta: { title: '地推管理', icon: 'icon_file_fill', noCache: true },
    children: [
      { path: 'pushManAudit', component: _import('push/pushManAudit'), name: '新增地推', meta: { title: '新增地推' , icon: 'new-di' }},
      { path: 'pushManTbl', component: _import('push/pushManTbl'), name: '地推查询', meta: { title: '地推查询' , icon: 'new-zhi' }}
    ]
  },
  {
    path: '/headliness',
    component: Layout,
    name: 'APP管理',
    redirect: '/headliness/headlines',
    meta: { title: 'APP管理', icon: 'app', noCache: true },
    children: [
      { path: 'headlines', component: _import('meeting/headlines'), name: '万全头条', meta: { title: '万全头条' , icon: 'new-tou' }},
      { path: 'meetingCarousel', component: _import('meeting/meetingCarousel'), name: '会场轮播管理', meta: { title: '会场轮播管理' , icon: 'new-tiao' }}
    ]
  },
  {
    path: '/smss',
    component: Layout,
    name: '短信发送',
    redirect: '/smss/sms',
    meta: { title: '短信发送', icon: 'sms', noCache: true },
    leaf: true,
    children: [
      { path: 'sms', component: _import('sms/sms'), name: '短信发送列表', meta: { title: '短信发送列表' , icon: 'new-daun' }}
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
