/*
 * @Author: labike 
 * @Date: 2018-03-12 21:26:51 
 * @Last Modified by: labike
 * @Last Modified time: 2018-09-07 08:57:06
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PageTitle from 'component/page-title/index.jsx';
import TableList from 'utils/table-list/index.jsx';

import ShopUtil from 'utils/shop.jsx';
import Product from 'service/product-service.jsx';

const _shop = new ShopUtil()
const _product = new Product()

class CategoryList extends Component{
    constructor(props){
        super(props)
        this.state = {
            list: [],
            parentCategoryId: this.props.match.params.categoryId || 0
        }
    }
    componentDidMount(){
        this.locdCategoryList()
    }
    componentDidUpdate(prevProps, prevState){
        let oldPath = prevProps.location.pathname
        let newPath = this.props.location.pathname
        let newId = this.props.match.params.categoryId || 0
        if(oldPath !== newPath){
            this.setState({
                parentCategoryId: newId,
            }, () => {
                this.locdCategoryList()
            })
        }
        //console.log('componentDidUpdate')
        //console.log(this.props.match.params.categoryId)
    }
    locdCategoryList(){
        _product.getCategoryList(this.state.parentCategoryId).then(res => {
            this.setState({
                list: res
            })
        }, errMsg => {
            this.setState({
                list: []
            })
            _shop.errorTips(errMsg)
        })
    }
    handleChangePageNum(pageNum){
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadUserList()
        })
    }
    handleChangeName(categoryId, categoryName){
        let newName = window.prompt('请输入新分类名称', categoryName)
        if(newName){
            _product.updateCategoryName({
                categoryId: categoryId,
                categoryName: newName
            }).then(res => {
                _shop.successTips(res)
                this.locdCategoryList()
            }, errMsg => {
                _shop.errorTips(errMsg)
            })
        }
    }
    render(){
        let tableHeads = [
            {name: '分类ID', width: '25%'},
            {name: '分类名称', width: '25%'},
            {name: '操作', width: '50%'}
        ]
        let ListBody = this.state.list.map((category, index) => {
            return (
                <tr key={index}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>
                        <a 
                            className="opera" 
                            style={{cursor: "pointer", marginRight: "10px"}}
                            onClick={(e) => this.handleChangeName(category.id, category.name)}
                        >修改名称</a>
                        {
                            category.parentId === 0 
                            ? <Link to={`/product-category/index/${category.id}`}>查看子品类</Link>
                            : null
                        }
                    </td>
                </tr>
            )
        })
        return(
            <div id='page-wrapper'>
                <PageTitle title="品类列表">
                    <div className="page-header-right">
                        <Link to="/product-category/add" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>添加品类</span>
                        </Link>
                    </div>
                </PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        <p>父分类ID: {this.state.parentCategoryId}</p>
                    </div>
                </div>
                <TableList tableHeads={tableHeads}>
                    {ListBody}
                </TableList>
                
            </div>
        )
    }
}

export default CategoryList;