import React, { Component } from 'react'

import ShopUtil from 'utils/shop.jsx'
import User from 'service/user-service.jsx'

import './index.scss'

const _shop = new ShopUtil()
const _user = new User()

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            redirect: _shop.getUrlParam('redirect') || '/'
        }
    }
    componentWillMount(){
        document.title = '登录'
    }
    handleChangeInput(e){
        let inputNewName = e.target.name;
        let inputNewValue = e.target.value; 
        this.setState({
            [inputNewName]: inputNewValue
        })
    }
    handleKeyUp(e){
        if(e.keyCode === 13){
            this.handleLogin()
        }
    }
    handleLogin(e){
        // _shop.request({
        //     type: 'post',
        //     url: '/manage/user/login.do',
        //     data: {
        //         username: this.state.username,
        //         password: this.state.password
        //     }
        // })
        let loginInfo = {
            username: this.state.username,
            password: this.state.password
        }
        let checkResult = _user.checkLoginInfo(loginInfo)
        if(checkResult.status){
            _user.login(loginInfo).then(res => {
                _shop.setStorage('userInfo', JSON.stringify(res))
                //console.log(this.state.redirect)
                this.props.history.push(this.state.redirect)
            }, errMsg => {
                _shop.errorTips(errMsg)
            })
        }else{
            _shop.errorTips(checkResult.msg)
        }       
    }
    render(){
        return (
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">欢迎登陆React后台管理系统</div>
                    <div className="panel-body">
                        <div>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    name="username"
                                    className="form-control" 
                                    placeholder="请输入用户名" 
                                    onKeyUp={(e) => this.handleKeyUp(e)}
                                    onChange={(e) => this.handleChangeInput(e)}
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="password" 
                                    name="password"
                                    className="form-control" 
                                    placeholder="请输入密码" 
                                    onKeyUp={(e) => this.handleKeyUp(e)}
                                    onChange={(e) => this.handleChangeInput(e)}
                                />
                            </div>
                            <button 
                                className="btn btn-primary btn-lg btn-block"
                                onClick={(e) => this.handleLogin(e)}
                            >登录</button>
                        </div>
                    </div>
                </div>
            </div>  
        )
    }
}

export default Login