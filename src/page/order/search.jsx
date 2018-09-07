import React, { Component } from 'react';

class Search extends Component{
    constructor(props){
        super(props)
        this.state = {
            orderNumber: ''
        }
    }
    handleSelect(e){
        let name = e.target.name
        let value = e.target.value.trim()
        this.setState({
            [name]: value
        })
    }
    onSearch(){
        this.props.onSearch(this.state.orderNumber)
    }
    onSearchKeyUp(e){
        if(e.keyCode === 13){
            this.onSearch()
        }
    }
    render(){
        return(
            <div className="row search-wrapper">
                <div className="col-md-12">
                    <div className="form-inline">
                        <div className="form-group">
                            <select className="form-control">
                                <option value="productId">按订单号查询</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input 
                                type="text" 
                                name="orderNumber"
                                className="form-control" 
                                placeholder="请输入订单号" 
                                onKeyUp={(e) => this.onSearchKeyUp(e)}
                                onChange={(e) => this.handleSelect(e)}
                            />
                        </div>
                        <button className="btn btn-primary" onClick={(e) => this.onSearch(e)}>查询</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;