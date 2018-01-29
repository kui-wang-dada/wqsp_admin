import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'

import role from './views/nav1/role.vue'
import Permiss from './views/nav1/Permiss.vue'
import user from './views/nav1/user.vue'
import datadict from './views/nav1/datadict.vue'

import goodsBill from './views/nav2/goodsBill.vue'
import goods from './views/nav2/goods.vue'

import supplierAudit from './views/nav3/supplierAudit.vue'
import supplier from './views/nav3/supplier.vue'

import merchantBillAudit from './views/nav4/merchantBillAudit.vue'
import merchant from './views/nav4/merchant.vue'

import customerAudit from './views/nav5/customerAudit.vue'
import customer from './views/nav5/customer.vue'
import deliveryAddressAudit from './views/nav5/deliveryAddressAudit.vue'
import voucherGrant from './views/nav5/voucherGrant.vue'
import deliveryAddress from './views/nav5/deliveryAddress.vue'
import voucher from './views/nav5/voucher.vue'
import customerPushMan from './views/nav5/customerPushMan.vue'

import operateArea from './views/nav6/operateArea.vue'
import operateClassify from './views/nav6/operateClassify.vue'
import salesAreaBill from './views/nav6/salesAreaBill.vue'
import salesArea from './views/nav6/salesArea.vue'
import salesAreaPriceBill from './views/nav6/salesAreaPriceBill.vue'
import classifyGoods from './views/nav6/classifyGoods.vue'
import operatePro from './views/nav6/operatePro.vue'
import operateAreaGoodClass from './views/nav6/operateAreaGoodClass.vue'
import promotionRule from './views/nav6/promotionRule.vue'
import limitBuy from './views/nav6/limitBuy.vue'
import tempadjust from './views/nav6/tempadjust.vue'
import promotionGroup from './views/nav6/promotionGroup.vue'

import appOrder from './views/nav7/appOrder.vue'
import saleInfo from './views/nav7/saleInfo.vue'
import finance from './views/nav7/finance.vue'
import financeGather from './views/nav7/financeGather.vue'
import financeCost from './views/nav7/financeCost.vue'
import goodsSale from './views/nav7/goodsSale.vue'

import purchaseAudit from './views/nav8/purchaseAudit.vue'
import purchase from './views/nav8/purchase.vue'

import purchasePriceAudit from './views/nav9/purchasePriceAudit.vue'
import purchasePrice from './views/nav9/purchasePrice.vue'

import goodsShelvesAudit from './views/nav10/goodsShelvesAudit.vue'

import goodsBack from './views/nav11/goodsBack.vue'
import goodsBackDelivery from './views/nav11/goodsBackDelivery.vue'

import pushManAudit from './views/nav12/pushManAudit.vue'
import pushManTbl from './views/nav12/pushManTbl.vue'

import headlines from './views/nav13/headlines.vue'
import meetingCarousel from './views/nav13/meetingCarousel.vue'

import operateWmsAudit from './views/nav14/operateWmsAudit.vue'
import operateWms from './views/nav14/operateWms.vue'
import wmsDept from './views/nav14/wmsDept.vue'

import sms from './views/nav15/sms.vue'

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
            { path: '/permiss.json', component: Permiss, name: '权限管理' },
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
            { path: '/supplier', component: supplier, name: '供应商管理列表' }
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
    //     path: '/echarts',
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