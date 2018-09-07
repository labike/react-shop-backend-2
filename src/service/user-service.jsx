import ShopUtil from 'utils/shop.jsx'

const _shop = new ShopUtil()

class User{
    login(loginInfo){
        return _shop.request({
            type: 'post',
            url: '/manage/user/{登录接口}',
            data: loginInfo
        })
    }
    checkLoginInfo(loginInfo){
        let username = $.trim(loginInfo.username)
        let password = $.trim(loginInfo.password)
        if(typeof username !== 'string' || username.length === 0){
            return {
                status: false,
                msg: '用户名不能为空'
            }
        }
        if(typeof password !== 'string' || password.length === 0){
            return {
                status: false,
                msg: '密码不能为空'
            }
        }
        return {
            status: true,
            msg: '验证通过'
        }
    }
    logout(){
        return _shop.request({
            type: 'post',
            url: '/user/{注销接口}'
        })
    }
    getUserList(pageNum){
        return _shop.request({
            url: 'post',
            url: '/manage/user/{获取用户接口}',
            data: {
                pageNum: pageNum
            }
        })
    }
}

export default User