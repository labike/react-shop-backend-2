import React, { Component } from 'react'

import Simditor from 'simditor'

import 'simditor/styles/simditor.css'
import './index.scss'

class Editor extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.loadEditor()
    }
    componentWillReceiveProps(nextProps){
        if(this.props.defaultDetail !== nextProps.defaultDetail){
            this.simditor.setValue(nextProps.defaultDetail)
        }   
    }
    //加载编辑器
    loadEditor(){
        let ele = this.refs['textarea']
        this.simditor = new Simditor({
            textarea: $(ele),
            defaultValue: this.props.placeholder || '请输入内容',
            upload: {
                url: '/manage/product/richtext_img_upload.do',
                defaultImage: '',
                fileKey: 'upload_file'
            }
        })
        this.bindEditorEvent()
    }
    //监听编辑器事件
    bindEditorEvent(){
        this.simditor.on('valuechanged', e => {
            this.props.onValueChange(this.simditor.getValue())
        })
    }
    render(){
        return(
            <div className="editor">
                <textarea ref="textarea"></textarea>
            </div>
        )
    }
}

export default Editor