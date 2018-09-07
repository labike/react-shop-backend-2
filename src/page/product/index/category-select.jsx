import React, { Component } from 'react';

import ShopUtil from 'utils/shop.jsx';
import Product from 'service/product-service.jsx';

const _shop = new ShopUtil()
const _product = new Product()

import './category-select.scss';

class CategorySelect extends Component{
    constructor(props){
        super(props)
        this.state = {
            firstCategoryList: [],
            firstCategoryId: 0,
            secondCategoryList: [],
            secondCategoryId: 0
        }
    }
    componentDidMount(){
        this.loadFirstCategory()
    }
    componentWillReceiveProps(nextProps){
        let categoryIdChange = this.props.categoryId !== nextProps.categoryId
        let parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId
        if(!categoryIdChange && !parentCategoryIdChange){
            return
        }
        if(nextProps.parentCategoryId === 0){
            this.setState({
                firstCategoryId: nextProps.categoryId,
                secondCategoryId: 0
            })
        }else{
            this.setState({
                firstCategoryId: nextProps.parentCategoryId,
                secondCategoryId: nextProps.categoryId
            }, () => {
                parentCategoryIdChange && this.loadSecondCategory()
            })
        }
    }
    //获取一级分类数据
    loadFirstCategory(){
        _product.getCategoryList().then(res => {
            this.setState({
                firstCategoryList: res
            })
        }, errMsg => {
            _shop.errorTips(errMsg)
        })
    }
    //根据选择的一级分类加载对应的二级分类数据
    loadSecondCategory(){
        _product.getCategoryList(this.state.firstCategoryId).then(res => {
            this.setState({
                secondCategoryList: res
            })
        }, errMsg => {
            _shop.errorTips(errMsg)
        })
    }
    //一级分类选中的值
    handleFirstCategory(e){
        if(this.props.readOnly){
            return
        }
        let newValue = e.target.value || 0
        this.setState({
            firstCategoryId: newValue,
            secondCategoryId: 0,
            secondCategoryList: []
        }, () => {
            this.loadSecondCategory()
            this.onPropsCategoryChange()
        })
    }
    //二级分类选中的值
    handleSecondCategory(e){
        if(this.props.readOnly){
            return
        }
        let newValue = e.target.value || 0
        this.setState({
            secondCategoryId: newValue,
        }, () => {
            this.onPropsCategoryChange()
        })
    }
    onPropsCategoryChange(){
        let categoryChangeAble = typeof this.props.onPropsCategoryChange === 'function'
        if(this.state.secondCategoryId){
            categoryChangeAble && this.props.onPropsCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId)
        }else{
            categoryChangeAble && this.props.onPropsCategoryChange(this.state.firstCategoryId, 0)
        }
    }
    render(){
        return(
            <div className="col-md-10">
                <select 
                    readOnly={this.props.readOnly}
                    value={this.state.firstCategoryId}
                    className="form-control category-select" 
                    onChange={(e) => this.handleFirstCategory(e)}
                >
                    <option value="">请选择一级分类</option>
                    {
                        this.state.firstCategoryList.map((category, index) => {
                            return <option key={index} value={category.id}>{category.name}</option>
                        })
                    }
                </select>
                {
                    this.state.secondCategoryList.length
                    ? (<select 
                        readOnly={this.props.readOnly}
                        value={this.state.secondCategoryId}
                        className="form-control category-select" 
                        onChange={(e) => this.handleSecondCategory(e)}
                    >
                        <option value="">请选择二级分类</option>
                        {
                            this.state.secondCategoryList.map((category, index) => {
                                return <option key={index} value={category.id}>{category.name}</option>
                            })
                        }
                    </select>)
                    : null
                }
            </div>
        )
    }
}

export default CategorySelect