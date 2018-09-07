/*
 * @Author: labike 
 * @Date: 2018-03-12 21:26:51 
 * @Last Modified by: labike
 * @Last Modified time: 2018-09-04 19:50:28
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'utils/pagination/index.jsx';
import TableList from 'utils/table-list/index.jsx';
import Search from './search.jsx';

import ShopUtil from 'utils/shop.jsx';
import Product from 'service/product-service.jsx';

import './index.scss';

const _shop = new ShopUtil()
const _product = new Product()

class ProductList extends Component{
    constructor(props){
        super(props)
        this.state = {
            list: [],
            pageNum: 1,
            listType: 'list'
        }
    }
    componentDidMount(){
        this.loadProductList()
    }
    loadProductList(){
        let listParam = {}
        listParam.listType = this.state.listType
        listParam.pageNum = this.state.pageNum

        if(this.state.listType === 'search'){
            listParam.searchType = this.state.searchType
            listParam.keyword = this.state.searchKeyword
        }
        _product.getProductList(listParam).then(res => {
            this.setState(res)
        }, errMsg => {
            this.setState({
                list: []
            })
            _shop.errorTips(errMsg)
        })
    }
    onSearch(searchType, searchKeyword){
        //console.log(searchType, searchKeyword)
        let listType = searchKeyword === '' ? 'list' : 'search'
        this.setState({
            listType: listType,
            pageNum: 1,
            searchType: searchType,
            searchKeyword: searchKeyword
        }, () => {
            this.loadProductList()
        })
    }
    handleChangePageNum(pageNum){
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadProductList()
        })
    }
    handleProductStatus(e, productId, currentStatus){
        let newStatus = currentStatus === 1 ? 2 : 1
        let tips = currentStatus === 1 ? '确定要下架该商品吗?' : '确定要上架该商品吗?'
        if(window.confirm(tips)){
            _product.setProductStatus({
                productId: productId,
                status: newStatus
            }).then(res => {
                _shop.successTips(res)
                this.loadProductList()
            }, errMsg => {
                _shop.errorTips(errMsg)
            })
        }
    }
    render(){
        let tableHeads = [
            {name: '商品ID', width: '10%'},
            {name: '商品名称', width: '50%'},
            {name: '商品价格', width: '10%'},
            {name: '商品状态', width: '15%'},
            {name: '操作', width: '15%'}
        ]
        return(
            <div id='page-wrapper'>
                <PageTitle title="商品列表">
                    <div className="page-header-right">
                        <Link to="/product/save" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>添加商品</span>
                        </Link>
                    </div>
                </PageTitle>
                <Search onSearch={(searchType, searchKeyword) => this.onSearch(searchType, searchKeyword)} />
                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((product, index) => {
                            return (
                                <tr key={index}>
                                    <td>{product.id}</td>
                                    <td>
                                        <p>{product.name}</p>
                                        <p>{product.subtitle}</p>
                                    </td>
                                    <td>{product.price}</td>
                                    <td>
                                        <p>
                                            {
                                                product.status === 1 ? '在售' : '已下架'
                                            }
                                        </p>
                                        <button 
                                            className="btn btn-warning btn-xs"
                                            onClick={(e) => this.handleProductStatus(e, product.id, product.status)}
                                        >
                                            {product.status === 1 ? '下架' : '上架'}
                                        </button>  
                                    </td>
                                    <td>
                                        <Link className="handle" to={`/product/detail/${product.id}`}>详情</Link>
                                        <Link className="handle" to={`/product/save/${product.id}`}>编辑</Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </TableList>
                <Pagination 
                    current={this.state.pageNum} 
                    total={this.state.total} 
                    onChange={(pageNum) => this.handleChangePageNum(pageNum)}
                /> 
            </div>
        )
    }
}

export default ProductList;