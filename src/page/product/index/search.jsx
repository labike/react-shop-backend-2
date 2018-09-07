import React, { Component } from 'react';

class Search extends Component{
    constructor(props){
        super(props)
        this.state = {
            searchType: 'productId',
            searchKeyword: ''
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
        let type = this.state.searchType
        let keywords = this.state.searchKeyword
        this.props.onSearch(type, keywords)
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
                            <select 
                                className="form-control" 
                                name="searchType"
                                onKeyUp={(e) => this.onSearchKeyUp(e)}
                                onChange={(e) => this.handleSelect(e)}
                            >
                                <option value="productId">按商品ID查询</option>
                                <option value="productName">按商品名称查询</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input 
                                type="text" 
                                name="searchKeyword"
                                className="form-control" 
                                placeholder="关键词" 
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