import React, { Component } from 'react'

import PageTitle from 'component/page-title/index.jsx';
import TableList from 'utils/table-list/index.jsx'

import ShopUtil from 'utils/shop.jsx';
import Order from 'service/order-service.jsx';

import './order.scss';

const _shop = new ShopUtil()
const _order = new Order()

class OrderDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            orderNumber: this.props.match.params.orderNumber,
            orderInfo: {}
        }
    }
    componentDidMount(){
        this.loadOrderDetail()
    }
    loadOrderDetail(){
        _order.getOrderDetail(this.state.orderNumber).then(res => {
            this.setState({
                orderInfo: res
            })
        }, errMsg => {
            _shop.errorTips(errMsg)
        })
    }
    hadnleSendGoods(e){
        if(window.confirm('是否已经发货?')){
            _order.sendGoods(this.state.orderNumber).then(res => {
                _shop.successTips('发货成功')
                this.loadOrderDetail()
            }, errMsg => {
                _shop.errorTips(errMsg)
            })
        }
    }
    render(){
        let info = this.state.orderInfo.shippingVo || {}
        let orderList = this.state.orderInfo.orderItemVoList || []
        let tableHeads = [
            {name: '商品图片', width: '20%'},
            {name: '商品信息', width: '15%'},
            {name: '单价', width: '15%'},
            {name: '数量', width: '15%'},
            {name: '合计', width: '20%'}
        ]
        return(
            <div id="page-wrapper">
                <PageTitle title="订单详情" />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单号</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {this.state.orderInfo.orderNo}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">创建时间</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {this.state.orderInfo.createTime}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">收件人</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {info.receiverName}，
                                {info.receiverProvince}
                                {info.receiverCity}
                                {info.receiverMobile || info.receiverPhone}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单状态</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {this.state.orderInfo.statusDesc}
                                {
                                    this.state.orderInfo.status === 20
                                    ? <button 
                                        className="btn btn-default btn-sm btn-send-goods" 
                                        onClick={(e) => this.hadnleSendGoods(e)}
                                    >去发货</button>
                                    : null
                                }
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">支付方式</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {this.state.orderInfo.paymentTypeDesc}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单金额</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {this.state.orderInfo.payment}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品列表</label>
                        <div className="col-md-10">
                            <TableList tableHeads={tableHeads}>
                                {
                                    orderList.map((order, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <img 
                                                        className="order-img"
                                                        src={`${this.state.orderInfo.imageHost}${order.productImage}`} 
                                                        alt="图片"
                                                    />
                                                </td>
                                                <td>{order.productName}</td>
                                                <td>
                                                    <span>&yen;</span>
                                                    {order.currentUnitPrice}
                                                </td>
                                                <td>{order.quantity}</td>
                                                <td>
                                                    <span>&yen;</span> 
                                                    {order.totalPrice}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </TableList>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderDetail