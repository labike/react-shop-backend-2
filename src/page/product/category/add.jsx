/*
 * @Author: labike 
 * @Date: 2018-03-12 21:26:51 
 * @Last Modified by: labike
 * @Last Modified time: 2018-09-06 22:07:56
 */

import React, { Component } from 'react';

import PageTitle from 'component/page-title/index.jsx';

import ShopUtil from 'utils/shop.jsx';
import Product from 'service/product-service.jsx';

const _shop = new ShopUtil()
const _product = new Product()

class CategoryAdd extends Component{
    constructor(props){
        super(props)
        this.state = {
            categoryList: [],
            parentId: 0,
            categoryName: ''
        }
    }
    componentDidMount(){
        this.locdCategoryList()
    }
    locdCategoryList(){
        _product.getCategoryList().then(res => {
            this.setState({
                categoryList: res
            })
        }, errMsg => {
            _shop.errorTips(errMsg)
        })
    }
    handleChangeValue(e){
        let name = e.target.name
        let value = e.target.value
        this.setState({
            [name]: value
        })
    }
    handleSubmit(e){
        let categoryName = this.state.categoryName.trim()
        if(categoryName){
            _product.saveCategory({
                parentId: this.state.parentId,
                categoryName: categoryName
            }).then(res => {
                _shop.successTips(res)
                this.props.history.push('/product-category/index')
            }, errMsg => {
                _shop.errorTips(errMsg)
            })
        }else{
            _shop.errorTips('修改品类出错')
        }
    }
    render(){
        return(
            <div id='page-wrapper'>
                <PageTitle title="分类列表" />
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-md-2 control-label">所属分类</label>
                                <div className="col-md-10">
                                    <select name="parentId" className="form-control"
                                        onChange={(e) => this.handleChangeValue(e)}
                                    >
                                        <option value="0">根品类/</option>
                                        {
                                            this.state.categoryList.map((category, index) => {
                                                return <option key={index} value={category.id}>{category.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">品类名称</label>
                                <div className="col-md-5">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="请输入品类名称"
                                        name="categoryName" 
                                        value={this.state.name}
                                        onChange={(e) => this.handleChangeValue(e)}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-10">
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary" 
                                        onClick={(e) => this.handleSubmit(e)}
                                    >提交</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CategoryAdd;