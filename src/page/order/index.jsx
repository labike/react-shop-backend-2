/*
 * @Author: labike 
 * @Date: 2018-03-12 21:26:51 
 * @Last Modified by: labike
 * @Last Modified time: 2018-09-07 15:47:10
 */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'utils/pagination/index.jsx';
import TableList from 'utils/table-list/index.jsx';
import Search from './search.jsx';

import ShopUtil from 'utils/shop.jsx';
import Order from 'service/order-service.jsx';

const _shop = new ShopUtil()
const _order = new Order()

class OrderList extends Component{
    constructor(props){
        super(props)
        this.state = {
            list: [],
            pageNum: 1,
            listType: 'list'
        }
    }
    componentDidMount(){
        this.loadOrderList()
    }
    loadOrderList(){
        let listParam = {}
        listParam.listType = this.state.listType
        listParam.pageNum = this.state.pageNum

        if(this.state.listType === 'search'){
            listParam.orderNo = this.state.orderNumber
        }
        _order.getOrderList(listParam).then(res => {
            this.setState(res)
        }, errMsg => {
            this.setState({
                list: []
            })
            _shop.errorTips(errMsg)
        })
    }
    onSearch(orderNumber){
        //console.log(searchType, searchKeyword)
        let listType = orderNumber === '' ? 'list' : 'search'
        this.setState({
            listType: listType,
            pageNum: 1,
            orderNumber: orderNumber
        }, () => {
            this.loadOrderList()
        })
    }
    handleChangePageNum(pageNum){
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadOrderList()
        })
    }
    render(){
        let tableHeads = [
            {name: '订单ID', width: '20%'},
            {name: '收件人', width: '15%'},
            {name: '订单状态', width: '15%'},
            {name: '订单总价', width: '15%'},
            {name: '创建时间', width: '20%'},
            {name: '操作', width: '15%'}
        ]
        return(
            <div id='page-wrapper'>
                <PageTitle title="订单列表" />
                <Search onSearch={(orderNumber) => this.onSearch(orderNumber)} />
                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((order, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <Link to={`/order/detail/${order.orderNo}`}>{order.orderNo}</Link>
                                    </td>
                                    <td>{order.receiverName}</td>
                                    <td>{order.statusDesc}</td>
                                    <td>{order.payment}</td>
                                    <td>{order.createTime}</td>
                                    <td>
                                        <Link to={`/order/detail/${order.orderNo}`}>详情</Link>
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

export default OrderList;