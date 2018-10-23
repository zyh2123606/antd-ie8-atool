import React, { Component } from 'react'
import { Table, Button, Modal, Message } from 'antd'
import AddWin from './win'
import Styles from './index.less'
import Service from '../../services/resourceService'
import { connect } from 'react-redux'

/**
 *审批人管理
 *
 * @class ApproverMgr
 * @extends {Component}
 */
const confirm = Modal.confirm
class ApproverMgr extends Component{
    state={ winVisible: false, data: [], total: 1, areaData: [], isRequest: false, delRequest: false }
    pageSize = 50
    columns = [
        {dataIndex: 'areaName', title: '区域', key: ''},
        {dataIndex: 'staffName', title: '姓名', key: ''},
        {dataIndex: 'staffId', title: '工号', key: ''},
        {dataIndex: 'phone', title: '手机', key: ''},
        {title: '操作', render: (record) => (
            <a onClick={this.deleteEmp.bind(this, record)} href='javascript:;'>删除</a>
        )}
    ]
    componentDidMount(){
        this.queryApproverList(1, this.pageSize)
    }
    //获取数据
    async queryApproverList(current, pageSize){
        const params = { page: current, size: pageSize }
        const {code, data, message} = await Service.queryApproverList(params)
        if(code !== '0') return Message.warning(message)
        this.setState({data: data.content, total: data.totalElements})
        this.getAreaData()
    }
    async getAreaData(){
        this.setState({isRequest: true})
        const data = await Service.getAreaList() 
        this.setState({isRequest: false})
        this.setState({areaData: data})
    }
    //页码切换
    pageChangeHandle = (current=1, pageSize=this.pageSize) => {
        this.queryApproverList(current, pageSize)
    }
    //pagegeSize切换
    onShowSizeChange = (current, pageSize) => {
        this.queryApproverList(current, pageSize)
    }
    //关闭弹窗
    closeWinHandle = () => {
        this.setState({winVisible: false})
    }
    //打开弹窗
    openWinHandle = () => {
        this.setState({winVisible: true})
    }
    //删除人员
    deleteEmp(emp){
        var that = this
        confirm({
            title: '系统提示',
            content: '您确定删除该审批人吗？',
            onOk: () => {
                that.doDel(emp)
            }
        })
    }
    async doDel(emp){
        const params = { staffId: emp.staffId }
        let { delRequest, data, total } = this.state
        if(delRequest) return
        const {code, message} = await Service.delApprover(params)
        if(code !== '0') return Message.warning(message)
        let idx = data.indexOf(emp)
        data.splice(idx, 1)
        if(total > 1) total -= 1
        this.setState({data, total})
    }
    render(){
        const { winVisible, total, data, areaData, isRequest } = this.state
        return (
            <div className={Styles['wrapper']}>
                <div className={Styles['tool-bar']}>
                    <Button disabled={isRequest} onClick={this.openWinHandle} icon='plus' type='primary'>添加审批人</Button>
                </div>
                <div className={Styles['page-content']}>
                    <Table locale={{emptyText: isRequest?'正在请求数据...':'暂无数据'}}
                        columns={this.columns}
                        pagination={{
                            onChange: this.pageChangeHandle,
                            onShowSizeChange: this.onShowSizeChange,
                            defaultPageSize: this.pageSize,
                            pageSizeOptions: [`${this.pageSize}`,'100','200'],
                            showQuickJumper: true,
                            total: total
                        }}
                        dataSource={data}/>
                </div>
                {/*添加审批人*/}
                <AddWin
                    {...this.props} 
                    visible={winVisible} 
                    callback={this.pageChangeHandle} 
                    close={this.closeWinHandle}
                    data={areaData}/>
            </div>
        )
    }
}

export default connect(state => state)(ApproverMgr)