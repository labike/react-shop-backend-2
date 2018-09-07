/*
 * @Author: labike 
 * @Date: 2018-03-13 20:07:42 
 * @Last Modified by: labike
 * @Last Modified time: 2018-03-13 20:19:49
 */

import React, { Component } from 'react';


class PageTitle extends Component{
    constructor(props){
        super(props)
    }
    componentWillMount(){
        document.title = this.props.title + '- REACT SHOP';
    }
    render(){
        return(
            <div className="row">
                <div className="col-md-12">
                    <h1 className="page-header">{this.props.title}</h1>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default PageTitle;