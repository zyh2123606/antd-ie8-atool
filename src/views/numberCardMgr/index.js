import React, { Component } from 'react'
import Styles from './index.less'
import { Table, Button, Message, Icon } from 'antd'
import Service from '../../services/resourceService'
import Search from './search'
import { connect } from 'react-redux'

/**
 *号卡管理
 *
 * @class NumberCardMgr
 * @extends {Component}
 */
class NumberCardMgr extends Component{
    state={
        winData: {},
        total: 1,
        currentPage: 1,
        isRequest: false,
        data: []
    }
    pageSize = 50
    columns = [
        {title: '资源Id', dataIndex: 'sourceId', key: 'id'},
        {title: '所属资源包Id', dataIndex: 'sourcePackageId', key: 'sourcePackageId'},
        {title: '资源类型', dataIndex: 'sourceType', key: 'sourceType'},
        {title: '资源状态', dataIndex: 'sourceStatus', key: 'sourceStatus', render: status => this.status[status]},
        {title: '资源所属员工', dataIndex: 'sourceOwnerName', key: 'sourceOwnerName'},
        {title: '资源所属渠道', dataIndex: 'sourceChannel', key: 'sourceChannel'},
        {title: '资源条码', dataIndex: 'imgUrl', key: 'imgUrl', render: imgUrl => <div style={{width: 200}}>{imgUrl}</div> || '无'},
        {title: '创建日期', dataIndex: 'updateTime', key: 'updateTime'},
        {title: '创建人', dataIndex: 'sourceCreator', key: 'sourceCreator', render: value => value || '无'}
    ]
    status = {
        '01': '空闲', 
        '02': '待审核', 
        '03': '锁定', 
        '04': '已写卡', 
        ':05': '预配', 
        '06': '预配套包', 
        '07': '预开', 
        '08': '占用未激活',
        '09': '占用', 
        '10': '报损占用',
        '11': '冷冻',
        '12': '在库冷冻',
        '13': '报废',
        '15': '报废出库'
    }
    componentDidMount(){
        this.getData(1, this.pageSize)
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
        const { mainForm } = this.refs
        const values = mainForm.getForm().getFieldsValue()
        const params = { page: current, size: pageSize, ...values }
        this.setState({isRequest: true})
        const res = await Service.queryNumRecourceList(params)
        const { code, data, message } = res
        if(code !== '0') return Message.warning(message)
        this.setState({
            data: data.content || [],
            total: data.totalElements || 1,
            isRequest: false
        })
        this.setState({currentPage: current})
    }
    render(){
        const {createVisible, winData, currentPage, data, total, isRequest} = this.state
        return (
            <div className={Styles['wrapper']}>
                <div className={Styles['tool-bar']}>
                    <Search {...this.props} callback={this.pageChangeHandle} loadData={this.getData.bind(this)} ref='mainForm' pageSize={this.pageSize}/>
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
            </div>
        )
    }
}

export default connect(state => state)(NumberCardMgr)