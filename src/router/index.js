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
    name: '功能板块',
    meta: { title: '功能板块', icon: 'premiss', noCache: true },
    children: [
      { path: 'premiss', component: _import('premiss/Permiss'), name: 'premiss', meta: { title: '功能板块', icon: 'pre-quan' }},
      { path: 'role', component: _import('premiss/role'), name: 'role', meta: { title: '功能板块', icon: 'pre-jiao' }},
      { path: 'user', component: _import('premiss/user'), name: 'user', meta: { title: '功能板块', icon: 'pre-yong' }},
      { path: 'datadict', component: _import('premiss/datadict'), name: 'datadict', meta: { title: '功能板块', icon: 'pre-zi' }}]
  },
  {
    path: '/goodsBills',
    component: Layout,
    name: '功能板块',
    redirect: '/goodsBills/goodsBill',
    meta: { title: '功能板块', icon: 'goodsBill', noCache: true },
    children: [
      { path: 'goodsBill', component: _import('bill/goodsBill'), name: '功能板块', meta: { title: '功能板块', icon: 'pre-zeng' }},
      { path: 'goods', component: _import('bill/goods'), name: '功能板块', meta: { title: '功能板块', icon: 'pre-lie' }}
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
    name: '功能板块',
    redirect: '/supplierAudits/supplierAudit',
    meta: { title: '功能板块', icon: 'supplier', noCache: true },
    children: [
      { path: 'supplierAudit', component: _import('supplier/supplierAudit'), name: '功能板块', meta: { title: '功能板块', icon: 'pre-hu' }},
      { path: '3_supplier', component: _import('supplier/supplier'), name: '功能板块', meta: { title: '功能板块', icon: 'pre-gong' }}
    ]
  },
  {
    path: '/merchantBillAudits',
    component: Layout,
    name: '功能板块',
    redirect: '/merchantBillAudits/merchantBillAudit',
    meta: { title: '功能板块', icon: 'merchants', noCache: true },
    children: [
      { path: 'merchantBillAudit', component: _import('merchant/merchantBillAudit'), name: '功能板块', meta: { title: '功能板块', icon: 'pre-dan' }},
      { path: 'merchant', component: _import('merchant/merchant'), name: '功能板块', meta: { title: '功能板块', icon: 'pre-cus' }}
    ]
  },
  {
    path: '/operateAreas',
    component: Layout,
    name: '功能板块',
    redirect: '/operateAreas/operateArea',
    meta: { title: '功能板块', icon: 'operating', noCache: true },
    children: [
      { path: 'operateArea', component: _import('sale/operateArea'), name: '功能板块', meta: { title: '功能板块', icon: 'pre-wei' }},
      { path: 'operateClassify', component: _import('sale/operateClassify'), name: '功能板块', meta: { title: '功能板块', icon: 'pre-sou' }},
      { path: 'salesAreaBill', component: _import('sale/salesAreaBill'), name: '功能板块', meta: { title: '功能板块', icon: 'pre-fu' }},
      { path: 'salesArea', component: _import('sale/salesArea'), name: '功能板块', meta: { title: '功能板块', icon: 'pre-zuo' }},
      { path: 'salesAreaPriceBill', component: _import('sale/salesAreaPriceBill'), name: '功能板块', meta: { title: '功能板块', icon: 'pre-order' }},
      { path: 'classifyGoods', component: _import('sale/classifyGoods'), name: '功能板块', meta: { title: '功能板块', icon: 'pre-zhan' }},
      { path: 'operatePro', component: _import('sale/operatePro'), name: '功能板块', meta: { title: '功能板块', icon: 'pre-cu' }},
      { path: 'operateAreaGoodClass', component: _import('sale/operateAreaGoodClass'), name: '功能板块', meta: { title: '功能板块', icon: 'pre-jin' }},
      { path: 'promotionRule', component: _import('sale/promotionRule'), name: '功能板块', meta: { title: '功能板块', icon: 'pre-cu' }},
      { path: 'limitBuy', component: _import('sale/limitBuy'), name: '功能板块', meta: { title: '功能板块', icon: 'xiangou' }},
      { path: 'tempadjust', component: _import('sale/tempadjust'), name: '功能板块', meta: { title: '功能板块', icon: 'shuliang' }},
      { path: 'promotionGroup', component: _import('sale/promotionGroup'), name: '功能板块', meta: { title: '功能板块', icon: 'guanli' }}
    ]
  },
  {
    path: '/customerAudits',
    component: Layout,
    name: '功能板块',
    redirect: '/customerAudits/customerAudit',
    meta: { title: '功能板块', icon: 'customer', noCache: true },
    children: [
      { path: 'customerAudit', component: _import('customer/customerAudit'), name: '功能板块', meta: { title: '功能板块', icon: 'kehu' }},
      { path: 'customer', component: _import('customer/customer'), name: '功能板块', meta: { title: '功能板块', icon: 'chaxun' }},
      { path: 'deliveryAddressAudit', component: _import('customer/deliveryAddressAudit'), name: '功能板块', meta: { title: '功能板块', icon: 'dizhi' }},
      { path: 'voucherGrant', component: _import('customer/voucherGrant'), name: '功能板块', meta: { title: '功能板块', icon: 'jinquan' }},
      { path: 'deliveryAddress', component: _import('customer/deliveryAddress'), name: '功能板块', meta: { title: '功能板块', icon: 'add-dizhi' }},
      { path: 'voucher', component: _import('customer/voucher'), name: '功能板块', meta: { title: '功能板块', icon: 'add-fa' }},
      { path: 'customerPushMan', component: _import('customer/customerPushMan'), name: '功能板块', meta: { title: '功能板块', icon: 'add-ren' }}
    ]
  },
  {
    path: '/appOrders',
    component: Layout,
    name: '功能板块',
    redirect: '/appOrders/appOrder',
    meta: { title: '功能板块', icon: 'appOrder', noCache: true },
    children: [
      { path: 'appOrder', component: _import('finance/appOrder'), name: '功能板块', meta: { title: '功能板块', icon: 'add-lie' }},
      { path: 'saleInfo', component: _import('finance/saleInfo'), name: '功能板块', meta: { title: '功能板块', icon: 'add-chai' }},
      { path: 'finance', component: _import('finance/finance'), name: '功能板块', meta: { title: '功能板块', icon: 'guanli' }},
      { path: 'financeGather', component: _import('finance/financeGather'), name: '功能板块', meta: { title: '功能板块', icon: 'add-bao' }},
      { path: 'financeCost', component: _import('finance/financeCost'), name: '功能板块', meta: { title: '功能板块', icon: 'add-fei' }},
      { path: 'goodsSale', component: _import('finance/goodsSale'), name: '功能板块', meta: { title: '功能板块', icon: 'add-pin' }}
    ]
  },
  {
    path: '/purchaseAudits',
    component: Layout,
    name: '功能板块',
    redirect: '/purchaseAudits/purchaseAudit',
    meta: { title: '功能板块', icon: 'purchase', noCache: true },
    children: [
      { path: 'purchaseAudit', component: _import('purchase/purchaseAudit'), name: '功能板块', meta: { title: '功能板块', icon: 'add-zeng' }},
      { path: 'purchase', component: _import('purchase/purchase'), name: '功能板块', meta: { title: '功能板块', icon: 'add-gou' }}
    ]
  },
  {
    path: '/purchasePriceAudits',
    component: Layout,
    name: '功能板块',
    redirect: '/purchasePriceAudits/purchasePriceAudit',
    meta: { title: '功能板块', icon: 'purch', noCache: true },
    children: [
      { path: 'purchasePriceAudit', component: _import('purch/purchasePriceAudit'), name: '功能板块', meta: { title: '功能板块', icon: 'add-ku' }},
      { path: 'purchasePrice', component: _import('purch/purchasePrice'), name: '功能板块', meta: { title: '功能板块', icon: 'add-cun' }}
    ]
  },
  {
    path: '/goodsShelvesAudits',
    component: Layout,
    name: '功能板块',
    redirect: '/goodsShelvesAudits/goodsShelvesAudit',
    meta: { title: '功能板块', icon: 'goodsShelvesAudit', noCache: true },
    leaf: true,
    children: [
      { path: 'goodsShelvesAudit', component: _import('audit/goodsShelvesAudit'), name: '功能板块', meta: { title: '功能板块', icon: 'add-jia' }}
    ]
  },
  {
    path: '/goodsBacks',
    component: Layout,
    name: '功能板块',
    redirect: '/goodsBacks/goodsBack',
    meta: { title: '功能板块', icon: 'goodsBack', noCache: true },
    children: [
      { path: 'goodsBack', component: _import('goods/goodsBack'), name: '功能板块', meta: { title: '功能板块', icon: 'new-yun' }},
      { path: 'goodsBackDelivery', component: _import('goods/goodsBackDelivery'), name: '功能板块', meta: { title: '功能板块', icon: 'new-chu' }}
    ]
  },
  {
    path: '/operateWmsAudits',
    component: Layout,
    name: '功能板块',
    redirect: '/operateWmsAudits/operateWmsAudit',
    meta: { title: '功能板块', icon: 'icon_dail_fill', noCache: true },
    children: [
      { path: 'operateWmsAudit', component: _import('operate/operateWmsAudit'), name: '功能板块', meta: { title: '功能板块', icon: 'new-cang' }},
      { path: 'operateWms', component: _import('operate/operateWms'), name: '功能板块', meta: { title: '功能板块', icon: 'new-ku' }},
      { path: 'wmsDept', component: _import('operate/wmsDept'), name: '功能板块', meta: { title: '功能板块', icon: 'new-li' }}
    ]
  },
  {
    path: '/pushManAudits',
    component: Layout,
    name: '功能板块',
    redirect: '/pushManAudits/pushManAudit',
    meta: { title: '功能板块', icon: 'icon_file_fill', noCache: true },
    children: [
      { path: 'pushManAudit', component: _import('push/pushManAudit'), name: '功能板块', meta: { title: '功能板块', icon: 'new-di' }},
      { path: 'pushManTbl', component: _import('push/pushManTbl'), name: '功能板块', meta: { title: '功能板块', icon: 'new-zhi' }}
    ]
  },
  {
    path: '/headliness',
    component: Layout,
    name: '功能板块',
    redirect: '/headliness/headlines',
    meta: { title: '功能板块', icon: 'app', noCache: true },
    children: [
      { path: 'headlines', component: _import('meeting/headlines'), name: '功能板块', meta: { title: '功能板块', icon: 'new-tou' }},
      { path: 'meetingCarousel', component: _import('meeting/meetingCarousel'), name: '功能板块', meta: { title: '功能板块', icon: 'new-tiao' }}
    ]
  },
  {
    path: '/smss',
    component: Layout,
    name: '功能板块',
    redirect: '/smss/sms',
    meta: { title: '功能板块', icon: 'sms', noCache: true },
    leaf: true,
    children: [
      { path: 'sms', component: _import('sms/sms'), name: '功能板块', meta: { title: '功能板块', icon: 'new-daun' }}
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
