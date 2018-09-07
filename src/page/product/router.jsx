/*
 * @Author: labike 
 * @Date: 2018-03-09 14:12:55 
 * @Last Modified by: labike
 * @Last Modified time: 2018-09-06 21:42:51
 */

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

import ProductList from 'page/product/index/index.jsx';
import ProductSave from './index/save.jsx';
import ProductDetail from './index/detail.jsx';
import CategoryList from './category/index.jsx';
import CategoryAdd from './category/add.jsx';

class ProductRouter extends Component{
    render(){
        return(
            <Switch>
                <Route path="/product/index" component={ProductList} />
                <Route path="/product/save/:pid?" component={ProductSave} />
                <Route path="/product/detail/:pid" component={ProductDetail} />
                <Route path='/product-category/index/:categoryId?' component={CategoryList} />
                <Route path='/product-category/add' component={CategoryAdd} />
                <Redirect exact from="/product" to="product/index" />
                <Redirect exact from="/product-category" to="product-category/index" />
            </Switch>
        )
    }
}

export default ProductRouter