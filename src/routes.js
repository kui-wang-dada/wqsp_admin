import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'

import role from './views/premiss/role.vue'
import Permiss from './views/premiss/Permiss.vue'
import user from './views/premiss/user.vue'
import datadict from './views/premiss/datadict.vue'

import goodsBill from './views/bill/goodsBill.vue'
import goods from './views/bill/goods.vue'

import supplierAudit from './views/supplier/supplierAudit.vue'
import supplier from './views/supplier/supplier.vue'

import merchantBillAudit from './views/merchant/merchantBillAudit.vue'
import merchant from './views/merchant/merchant.vue'

import customerAudit from './views/customer/customerAudit.vue'
import customer from './views/customer/customer.vue'
import deliveryAddressAudit from './views/customer/deliveryAddressAudit.vue'
import voucherGrant from './views/customer/voucherGrant.vue'
import deliveryAddress from './views/customer/deliveryAddress.vue'
import voucher from './views/customer/voucher.vue'
import customerPushMan from './views/customer/customerPushMan.vue'

import operateArea from './views/sale/operateArea.vue'
import operateClassify from './views/sale/operateClassify.vue'
import salesAreaBill from './views/sale/salesAreaBill.vue'
import salesArea from './views/sale/salesArea.vue'
import salesAreaPriceBill from './views/sale/salesAreaPriceBill.vue'
import classifyGoods from './views/sale/classifyGoods.vue'
import operatePro from './views/sale/operatePro.vue'
import operateAreaGoodClass from './views/sale/operateAreaGoodClass.vue'
import promotionRule from './views/sale/promotionRule.vue'
import limitBuy from './views/sale/limitBuy.vue'
import tempadjust from './views/sale/tempadjust.vue'
import promotionGroup from './views/sale/promotionGroup.vue'

import appOrder from './views/finance/appOrder.vue'
import saleInfo from './views/finance/saleInfo.vue'
import finance from './views/finance/finance.vue'
import financeGather from './views/finance/financeGather.vue'
import financeCost from './views/finance/financeCost.vue'
import goodsSale from './views/finance/goodsSale.vue'

import purchaseAudit from './views/purchase/purchaseAudit.vue'
import purchase from './views/purchase/purchase.vue'

import purchasePriceAudit from './views/purch/purchasePriceAudit.vue'
import purchasePrice from './views/purch/purchasePrice.vue'

import goodsShelvesAudit from './views/audit/goodsShelvesAudit.vue'

import goodsBack from './views/goods/goodsBack.vue'
import goodsBackDelivery from './views/goods/goodsBackDelivery.vue'

import pushManAudit from './views/push/pushManAudit.vue'
import pushManTbl from './views/push/pushManTbl.vue'

import headlines from './views/meeting/headlines.vue'
import meetingCarousel from './views/meeting/meetingCarousel.vue'

import operateWmsAudit from './views/operate/operateWmsAudit.vue'
import operateWms from './views/operate/operateWms.vue'
import wmsDept from './views/operate/wmsDept.vue'

import sms from './views/sms/sms.vue'

import echarts from './views/charts/echarts.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '系统管理',
        iconCls: 'fa fa-cog',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/permiss', component: Permiss, name: '权限管理' },
            { path: '/role', component: role, name: '角色管理' },
            { path: '/user', component: user, name: '用户管理' },
            { path: '/datadict', component: datadict, name: '数据字典' },
        ]
    },
    {
        path: '/goodsBills',
        component: Home,
        name: '商品管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/goodsBill', component: goodsBill, name: '新增商品单据' },
            { path: '/goods', component: goods, name: '商品管理列表' }
        ]
    },
    {
        path: '/supplierAudits',
        component: Home,
        name: '供应商管理',
        iconCls: 'fa fa-address-card',
        // leaf: true,//只有一个节点
        children: [
            { path: '/supplierAudit', component: supplierAudit, name: '新增供应商' },
            { path: '/supplier_3', component: supplier, name: '供应商管理列表' }
        ]
    },
    {
        path: '/merchantBillAudits',
        component: Home,
        name: '商户管理管理',
        iconCls: 'fa fa-address-book-o',
        // leaf: true,//只有一个节点
        children: [
            { path: '/merchantBillAudit', component: merchantBillAudit, name: '新增商户单据' },
            { path: '/merchant', component: merchant, name: '商户查询' }
        ]
    },
    {
        path: '/operateAreas',
        component: Home,
        name: '运营区管理',
        iconCls: 'fa fa-home',
        children: [
            { path: '/operateArea', component: operateArea, name: '运营区管理列表' },
            { path: '/operateClassify', component: operateClassify, name: '运营区展示分类管理' },
            { path: '/salesAreaBill', component: salesAreaBill, name: '销售范围指定' },
            { path: '/salesArea', component: salesArea, name: '销售范围查询' },
            { path: '/salesAreaPriceBill', component: salesAreaPriceBill, name: '售价管理' },
            { path: '/classifyGoods', component: classifyGoods, name: '展示分类、归属商品' },
            { path: '/operatePro', component: operatePro, name: '促销、清仓商品' },
            { path: '/operateAreaGoodClass', component: operateAreaGoodClass, name: '进口商品管理' },
            { path: '/promotionRule', component: promotionRule, name: '促销活动管理' },
            { path: '/limitBuy', component: limitBuy, name: '限购' },
            { path: '/tempadjust', component: tempadjust, name: '限购数量临时调整' },
            { path: '/promotionGroup', component: promotionGroup, name: '促销组管理' },
        ]
    },
    {
        path: '/customerAudits',
        component: Home,
        name: '客户管理',
        iconCls: 'fa fa-address-book',
        children: [
            { path: '/customerAudit', component: customerAudit, name: '新增客户单据' },
            { path: '/customer', component: customer, name: '客户查询' },
            { path: '/deliveryAddressAudit', component: deliveryAddressAudit, name: '收货地址审核' },
            { path: '/voucherGrant', component: voucherGrant, name: '代金券管理' },
            { path: '/deliveryAddress', component: deliveryAddress, name: '客户地址查询' },
            { path: '/voucher', component: voucher, name: '代金券发放' },
            { path: '/customerPushMan', component: customerPushMan, name: '修改客户地推人员' }
        ]
    },
    {
        path: '/appOrders',
        component: Home,
        name: '订单管理',
        iconCls: 'fa fa-calendar-check-o',
        children: [
            { path: '/appOrder', component: appOrder, name: '订单管理列表' },
            { path: '/saleInfo', component: saleInfo, name: '订单拆单查询' },
            { path: '/finance', component: finance, name: '财务订单报表' },
            { path: '/financeGather', component: financeGather, name: '财务汇总报表' },
            { path: '/financeCost', component: financeCost, name: '财务费用查询' },
            { path: '/goodsSale', component: goodsSale, name: '商品销量报表' },
        ]
    },
    {
        path: '/purchaseAudits',
        component: Home,
        name: '采购管理',
        iconCls: 'fa fa-shopping-basket',
        children: [
            { path: '/purchaseAudit', component: purchaseAudit, name: '新增采购单据' },
            { path: '/purchase', component: purchase, name: '采购查询' },
        ]
    },
    {
        path: '/purchasePriceAudits',
        component: Home,
        name: '库存管理',
        iconCls: 'fa fa-building',
        children: [
            { path: '/purchasePriceAudit', component: purchasePriceAudit, name: '新增库存' },
            { path: '/purchasePrice', component: purchasePrice, name: '库存查询' },
        ]
    },
    {
        path: '/goodsShelvesAudits',
        component: Home,
        name: '商品上下架管理',
        iconCls: 'fa fa-cart-arrow-down',
        leaf: true,
        children: [
            { path: '/goodsShelvesAudit', component: goodsShelvesAudit, name: '商品上下架管理列表' },
        ]
    },
    {
        path: '/goodsBacks',
        component: Home,
        name: '退货管理',
        iconCls: 'fa fa-exchange',
        children: [
            { path: '/goodsBack', component: goodsBack, name: '退货单据管理' },
            { path: '/goodsBackDelivery', component: goodsBackDelivery, name: '退货出库查询' },
        ]
    },
    {
        path: '/operateWmsAudits',
        component: Home,
        name: '运营区仓库管理',
        iconCls: 'fa fa-industry',
        children: [
            { path: '/operateWmsAudit', component: operateWmsAudit, name: '新增运营区仓库' },
            { path: '/operateWms', component: operateWms, name: '运营区仓库查询' },
            { path: '/wmsDept', component: wmsDept, name: '仓库管理' },
        ]
    },
    {
        path: '/pushManAudits',
        component: Home,
        name: '地推管理',
        iconCls: 'fa fa-fax',
        children: [
            { path: '/pushManAudit', component: pushManAudit, name: '新增地推' },
            { path: '/pushManTbl', component: pushManTbl, name: '地推查询' },
        ]
    },
    {
        path: '/headliness',
        component: Home,
        name: 'APP管理',
        iconCls: 'fa fa-desktop',
        children: [
            { path: '/headlines', component: headlines, name: '万全头条' },
            { path: '/meetingCarousel', component: meetingCarousel, name: '会场轮播管理' },
        ]
    },
    {
        path: '/smss',
        component: Home,
        name: '短信发送',
        iconCls: 'fa fa-rss',
        leaf: true,
        children: [
            { path: '/sms', component: sms, name: '短信发送列表' },
        ]
    },
    // {
    //     path: '/echart',
    //     component: Home,
    //     name: 'Charts',
    //     iconCls: 'fa fa-bar-chart',
    //     children: [
    //         { path: '/echarts', component: echarts, name: 'echarts' }
    //     ]
    // },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;