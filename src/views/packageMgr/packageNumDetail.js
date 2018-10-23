import React, { Component } from 'react'
import { Table } from 'antd'

/**
 *卡包号卡列表
 *
 * @class PackageDetailTable
 * @extends {Component}
 */
class PackageDetailTable extends Component{
    columns = [
        {title: '资源ID',  dataIndex: 'sourceId',key: 'sourceId'},
        {title: '创建日期', dataIndex: 'createTime', key: 'createTime'}
    ]
    render(){
        const { data, createTime } = this.props
        let dataList = data.replace('[','').replace(']','').split(',').map((sourceId)=>{
            return {'sourceId':sourceId, createTime}
          });
        return (
          <div mt={10}>
                <Table size='small' locale={{emptyText: '暂无数据'}} 
                    columns={this.columns} 
                    dataSource={dataList} 
                    pagination={false}/>
          </div>
        )
    }
}
export default PackageDetailTable
