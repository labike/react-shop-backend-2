/*
 * @Author: labike 
 * @Date: 2018-03-12 21:26:51 
 * @Last Modified by: labike
 * @Last Modified time: 2018-09-04 15:33:29
 */

import React, { Component } from 'react';

import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'utils/pagination/index.jsx';
import TableList from 'utils/table-list/index.jsx';

import ShopUtil from 'utils/shop.jsx';
import User from 'service/user-service.jsx';

const _shop = new ShopUtil()
const _user = new User()

class UserList extends Component{
    constructor(props){
        super(props)
        this.state = {
            list: [],
            pageNum: 1
        }
    }
    componentDidMount(){
        this.loadUserList()
    }
    loadUserList(){
        _user.getUserList(this.state.pageNum).then(res => {
            this.setState(res)
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
    render(){
        let tableHeads = [
            {name: '用户ID', width: '15%'},
            {name: '用户名', width: '20%'},
            {name: '用户邮箱', width: '20%'},
            {name: '用户电话', width: '20%'},
            {name: '注册时间', width: '25%'},
        ]
        let ListBody = this.state.list.map((user, index) => {
            return (
                <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{new Date(user.createTime).toLocaleString()}</td>
                </tr>
            )
        })
        return(
            <div id='page-wrapper'>
                <PageTitle title="用户列表" />
                <TableList tableHeads={tableHeads}>
                    {ListBody}
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

export default UserList;