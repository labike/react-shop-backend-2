import ShopUtil from 'utils/shop.jsx'

const _shop = new ShopUtil()

class Order{
    getOrderList(listParam){
        let url = ''
        let data = {}
        if(listParam.listType === 'list'){
            url = '/manage/order/{订单列表接口}'
            data.pageNum = listParam.pageNum
        }else if(listParam.listType === 'search'){
            url = '/manage/order/{订单查询接口}'
            data.pageNum = listParam.pageNum
            data.orderNo = listParam.orderNo
        }
        return _shop.request({
            type: 'post',
            url: url,
            data: data
        })
    }
    getOrderDetail(orderNumber){
        return _shop.request({
            type: 'post',
            url: '/manage/order/{订单详情接口}',
            data: {
                orderNo: orderNumber
            }
        })
    }
    sendGoods(orderNumber){
        return _shop.request({
            type: 'post',
            url: '/manage/order/{发货接口地址}',
            data: {
                orderNo: orderNumber
            }
        })
    }
}

export default Order