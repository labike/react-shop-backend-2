import React, { Component } from 'react'

import PageTitle from 'component/page-title/index.jsx';
import CategorySelect from './category-select.jsx';

import ShopUtil from 'utils/shop.jsx';
import Product from 'service/product-service.jsx';
import NewFileUpload from 'utils/file-upload/index.jsx';
import Editor from 'utils/editor/index.jsx';

const _shop = new ShopUtil()
const _product = new Product()

import './save.scss'

class ProductDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: this.props.match.params.pid,
            name: '',
            subtitle: '',
            categoryId: 0,
            parentCategoryId: 0,
            subImages: [],
            price: '',
            stock: '',
            detail: '',
            status: 1 //1表示待售
        }
    }
    componentDidMount(){
        this.loadProduct()
    }
    loadProduct(){
        //有id编辑, 表单回填
        if(this.state.id){
            _product.getProduct(this.state.id).then(res => {
                let newImages = res.subImages.split(',')
                res.subImages = newImages.map((imgUri) => {
                    return {
                        uri: imgUri,
                        url: res.imageHost + imgUri
                    }
                })
                this.setState(res)
            }, errMsg => {
                _shop.errorTips(errMsg)
            })
        }
    }
    
    //获取编辑器输入值
    handleEditorValue(value){
        //console.log(value)
        this.setState({
            detail: value
        })
    }
    render(){
        return(
            <div id="page-wrapper">
                <PageTitle title="添加商品" />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {this.state.name}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {this.state.subtitle}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品分类</label>
                        <CategorySelect 
                            readOnly
                            categoryId={this.state.categoryId}
                            parentCategoryId={this.state.parentCategoryId}
                        />
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-5">
                            <div className="input-group">
                                <input 
                                    readOnly
                                    type="number"
                                    className="form-control" 
                                    value={this.state.price} 
                                />
                                <span className="input-group-addon">元</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品库存</label>
                        <div className="col-md-5">
                            <div className="input-group">
                                <input 
                                    readOnly
                                    type="number"
                                    className="form-control" 
                                    value={this.state.stock} 
                                />
                                <span className="input-group-addon">件</span>
                            </div> 
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品图片</label>
                        <div className="col-md-10">
                            {
                                this.state.subImages.length
                                ? (
                                    this.state.subImages.map((image, index) => {
                                        return (
                                            <div className="img-box" key={index}>
                                                <img className="img-size" src={image.url} alt="图片" />
                                            </div>
                                        )
                                    })
                                )
                                : (
                                    <div>暂无图片</div>
                                )
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-10 simditor-body" dangerouslySetInnerHTML={{ __html: this.state.detail }}></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductDetail