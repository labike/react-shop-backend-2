/*
 * @Author: labike 
 * @Date: 2018-03-12 22:19:49 
 * @Last Modified by: labike
 * @Last Modified time: 2018-09-03 17:32:34
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ShopUtil from 'utils/shop.jsx'
import User from 'service/user-service.jsx'

const _shop = new ShopUtil()
const _user = new User()

class TopNav extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: _shop.getStorage('userInfo').username || ''
        }
    }
    onLogout(){
        _user.logout().then(res => {
            _shop.removeStorage('userInfo')
            window.location.href = '/login'
            //this.props.history.push('/login')
        }, errMsg => {
            _shop.errorTips(errMsg)
        })
    }
    render(){
        return(
            <div className="navbar navbar-default top-navbar">
                <div className="navbar-header">
                    <Link to="/" className="navbar-brand" href="index.html"><b>React</b>后台</Link>
                </div>

                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle"  href="javascript:;" aria-expanded="false">
                            <i className="fa fa-user fa-fw"></i> 
                            {
                                this.state.username
                                ? <span>欢迎您, {this.state.username}</span>
                                : <span>欢迎您</span>
                            }
                            <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li>
                                <a onClick={() => {
                                    this.onLogout()
                                }}>
                                    <i className="fa fa-sign-out fa-fw"></i> 
                                    <span>退出登录</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
}

export default TopNav;