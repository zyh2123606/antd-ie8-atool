import React, { Component, PropTypes } from 'react'
import Service from '../../services/resourceService'
import { Table, Icon, Button, Message } from 'antd'
import AddWin from './addWin'
import LookWin from './lookWin'
import Styles from './index.less'
import { connect } from 'react-redux'

class PackageMgr extends Component{
    constructor(props){
        super(props)
    }
    state={
        winVisible: false, 
        lookWinVisible: false, 
        winData: {},
        data: [],
        total: 1,
        isRequest: false
    }
    pageSize = 50
    columns = [
        {title: '包id', dataIndex: 'sourcePackageId', key: 'sourcePackageId'},
        {title: '号卡数', dataIndex: 'sourceIds', key: 'sourceIds', render: record => {
                return record.split(',').length
            }
        },
        {title: '卡渠道', dataIndex: 'sourceChannel', key: 'sourceChannel'},
        {title: '是否可用', dataIndex: 'alive', key: 'alive', render: alive => (
            <div fc={alive?'#5cb85c':'#333'}>{alive?'可用':'不可用'}</div>
        )},
        {title: '创建日期', dataIndex: 'createTime', key: 'createTime'},
        {title: '所有人', dataIndex: 'sourceOwnerName', key: 'sourceCreator', render: name => name?name:'无'},
        {
          title: '操作', key: 'action', flexed: 'right', render: record => (
                <a href='javascript:;' onClick={this.lookHandle.bind(this, record)}><Icon type='eye-o'/>查看</a>
            )
        }
    ]
    componentDidMount() {
        this.getData(1, this.pageSize)
    }
    //关闭添加弹窗
    closeAddWinHandle = () => {
        this.setState({winVisible: false})
    }
    //打开添加弹窗
    openAddWinHandle = () => {
        this.setState({winVisible: true})
    }
    //关闭查看弹窗
    closeLookWinHandle = () => {
        this.setState({lookWinVisible: false})
    }
    //打开查看弹窗
    openLookWinHandle = () => {
        this.setState({lookWinVisible: true})
    }
    //查看卡包
    lookHandle(record){
        this.setState({winData: record, lookWinVisible: true})
    }
    //页码切换
    pageChangeHandle = (current=1, pageSize=this.pageSize) => {
        this.getData(current, pageSize)
    }
    //pagegeSize切换
    onShowSizeChange = (current, pageSize) => {
        this.getData(current, pageSize)
    }
    //获取数据
    async getData(current, pageSize){
        this.setState({isRequest: true})
        const res = await Service.queryPackageList({page: current, size: pageSize})
        const { code, data, message } = res
        if(code !== '0') return Message.warning(message)
        this.setState({
            data: data.content || [],
            total: data.totalElements || 1,
            isRequest: false
        })
    }
    render(){
        const { data, total, winVisible, winData, lookWinVisible, isRequest } = this.state
        return (
            <div className={Styles['wrapper']}>
                <div className={Styles['tool-bar']}>
                    <Button onClick={this.openAddWinHandle} icon='plus' type='primary'>添加卡包</Button>
                </div>
                <div className={Styles['page-content']}>
                    <Table locale={{emptyText: isRequest?'正在请求数据...':'暂无数据'}}
                        columns={this.columns}
                        dataSource={data}
                        pagination={{
                            onChange: this.pageChangeHandle,
                            onShowSizeChange: this.onShowSizeChange,
                            defaultPageSize: this.pageSize,
                            pageSizeOptions: [`${this.pageSize}`,'100','200'],
                            showQuickJumper: true,
                            total: total
                        }}/>
                </div>
                {/*新建卡包*/}
                <AddWin {...this.props} visible={winVisible} callback={this.pageChangeHandle} onClose={this.closeAddWinHandle} />
                {/*查看卡包*/}
                <LookWin visible={lookWinVisible} onClose={this.closeLookWinHandle} data={winData} />
            </div>
        )
    }
}

export default connect(state => state)(PackageMgr)