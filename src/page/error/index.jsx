/*
 * @Author: labike 
 * @Date: 2018-03-12 21:26:51 
 * @Last Modified by: labike
 * @Last Modified time: 2018-09-04 09:07:25
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PageTitle from 'component/page-title/index.jsx';

class ErrorPage extends Component{
    render(){
        return(
            <div id='page-wrapper'>
                <PageTitle title="页面出错了!" />
                <div className="row">
                    <div className="col-md-12">
                        <span>404 not found, </span>
                        <Link to="/">返回首页</Link>
                    </div>   
                </div>
            </div>
        )
    }
}

export default ErrorPage;