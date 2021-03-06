
import React, { Component } from 'react';

class TableList extends Component{
    constructor(props){
        super(props)
        this.state = {
            isFirstLoading: true
        }
    }
    componentWillReceiveProps(){
        this.setState({
            isFirstLoading: false
        })
    }
    render(){
        let tableHeader = this.props.tableHeads.map((tableHead, index) => {
            if(typeof tableHead === 'object'){
                return <th key={index} width={tableHead.width}>{tableHead.name}</th>
            }else if(typeof tableHead === 'string'){
                return <th key={index}>{tableHead}</th>
            }
        })
        let listBody = this.props.children
        let listInfo = (
            <tr>
                <td colSpan={this.props.tableHeads.length} className="text-center">
                    {this.state.isfirstLoading ? "正在加载中..." : "没有找到相应结果~~~"}
                </td>
            </tr>
        )
        let tableBody = listBody.length > 0 ? listBody : listInfo
        return(
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                {tableHeader}
                            </tr>
                        </thead>
                        <tbody>
                            {tableBody}
                        </tbody>
                    </table>
                </div>   
            </div>
        )
    }
}

export default TableList