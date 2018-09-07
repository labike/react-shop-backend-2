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

class ProductSave extends Component{
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
                res.defaultDetail = res.detail
                this.setState(res)
            }, errMsg => {
                _shop.errorTips(errMsg)
            })
        }
    }
    handleChangeName(e){
        let name = e.target.name
        let value = e.target.value.trim()
        this.setState({
            [name]: value
        })
    }
    //二级菜单选中值
    onPropsCategoryChange(categoryId, parentCategoryId){
        this.setState({
            categoryId: categoryId,
            parentCategoryId: parentCategoryId
        })
        //console.log('categoryId is:', categoryId)
        //console.log('parentCategoryId is:', parentCategoryId)
    }
    //上传成功处理
    onUploadSuccess(res){
        let subImages = this.state.subImages
        subImages.push(res)
        this.setState({
            subImages: subImages
        })
    }
    //上传失败处理
    onUplaodError(errMsg){
        _shop.errorTips(errMsg)
    }
    //删除图片
    hadnleDeleteImg(e){
        let index = parseInt(e.target.getAttribute('index'))
        let subImages = this.state.subImages
        subImages.splice(index, 1)
        this.setState({
            subImages: subImages
        })
    }
    //获取编辑器输入值
    handleEditorValue(value){
        //console.log(value)
        this.setState({
            detail: value
        })
    }
    getSubImages(){
        return this.state.subImages.map((image) => image.uri).join(',')
    }
    handleSubmit(){
        let product = {
            name: this.state.name,
            subtitle: this.state.subtitle,
            categoryId: parseInt(this.state.categoryId),
            subImages: this.getSubImages(),
            detail: this.state.detail,
            price: parseFloat(this.state.price),
            stock: parseInt(this.state.stock),
            status: this.state.status
        }
        let checkProductResult = _product.checkProduct(product)
        if(this.state.id){
            product.id = this.state.id
        }
        if(checkProductResult.status){
            _product.saveProduct(product).then(res => {
                _shop.successTips(res)
                this.props.history.push('/product/index')
            }, errMsg => {
                _shop.errorTips(errMsg)
            })
        }else{
            _shop.errorTips(checkProductResult.msg)
        }
        //console.log(product)
    }
    render(){
        return(
            <div id="page-wrapper">
                <PageTitle title={this.state.id ? '编辑商品' : '添加商品'} />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-5">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="请输入商品名称"
                                name="name" 
                                value={this.state.name}
                                onChange={(e) => this.handleChangeName(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-5">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="请输入商品描述" 
                                name="subtitle" 
                                value={this.state.subtitle}
                                onChange={(e) => this.handleChangeName(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品分类</label>
                        <CategorySelect 
                            categoryId={this.state.categoryId}
                            parentCategoryId={this.state.parentCategoryId}
                            onPropsCategoryChange={
                                (categoryId, parentCategoryId) => this.onPropsCategoryChange(categoryId, parentCategoryId)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-5">
                            <div className="input-group">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="请输入商品价格" 
                                    name="price" 
                                    value={this.state.price}
                                    onChange={(e) => this.handleChangeName(e)}
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
                                    type="number" 
                                    className="form-control" 
                                    placeholder="请输入商品库存" 
                                    name="stock" 
                                    value={this.state.stock}
                                    onChange={(e) => this.handleChangeName(e)}
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
                                                <i 
                                                    className="fa fa-close" 
                                                    index={index} 
                                                    onClick={(e) => this.hadnleDeleteImg(e)}
                                                >
                                                </i>
                                            </div>
                                        )
                                    })
                                )
                                : (
                                    <div>请上传图片</div>
                                )
                            }
                        </div>
                        <div className="col-md-10 col-md-offset-2 upload-file-box">
                            <NewFileUpload 
                                onSuccess={(res) => this.onUploadSuccess(res)} 
                                onError={(errMsg) => this.onUploadError(errMsg)} 
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-10">
                            <Editor 
                                detail={this.state.detail}
                                defaultDetail={this.state.defaultDetail}
                                onValueChange={(value) => this.handleEditorValue(value)}
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
        )
    }
}

export default ProductSave