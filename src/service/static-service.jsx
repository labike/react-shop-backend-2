import ShopUtil from 'utils/shop.jsx'

const _shop = new ShopUtil()

class StaticServer{
    getCount(){
        return _shop.request({
            url: '/manage/statistic/{首页获取所有用户, 订单, 商品总数接口}'
        })
    }
}

export default StaticServer