/*
 * @Author: labike 
 * @Date: 2018-03-12 21:26:51 
 * @Last Modified by: labike
 * @Last Modified time: 2018-09-03 20:16:55
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PageTitle from 'component/page-title/index.jsx';

import ShopUtil from 'utils/shop.jsx'
import StaticServer from 'service/static-service.jsx'

const _shop = new ShopUtil()
const _static = new StaticServer()

import './index.scss';

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            userCount: '123456',
            productCount: '5234234',
            orderCount: '213123'
        }
    }
    componentDidMount(){
        this.loadCount()
    }
    loadCount(){
        _static.getCount().then(res => {
            this.setState(res)
        }, errMsg => {
            _shop.errorTips(errMsg)
        })
    }
    render(){
        return(
            <div id='page-wrapper'>
                <PageTitle title="首页" />
                <div className="row">
                    <div className="col-md-4">
                        <Link to='/user' className="color-box blue">
                            <p className="count">{this.state.userCount}</p>
                            <p className="desc">
                                <i className="fa fa-user-o"></i>
                                <span>用户总数</span>
                            </p>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to='/product' className="color-box green">
                            <p className="count">{this.state.productCount}</p>
                            <p className="desc">
                                <i className="fa fa-list"></i>
                                <span>商品总数</span>
                            </p>
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <Link to='/order' className="color-box brown">
                            <p className="count">{this.state.orderCount}</p>
                            <p className="desc">
                                <i className="fa fa-check-square-o"></i>
                                <span>订单总数</span>
                            </p>
                        </Link>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Home;