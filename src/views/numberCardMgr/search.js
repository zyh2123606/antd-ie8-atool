import React, { Component } from 'react'
import { Form, Input, Select, Button, Row, Col } from 'antd'
import AddWin from './addWin'
import Styles from './index.less'

const { Option } = Select
const FormItem = Form.Item
class Search extends Component{
    state = {createVisible: false}
    //搜索
    handleSearch = (e) => {
        this.getData()
    }
    //清除查询条件
    resetSearch = (e) => {
        const { form } = this.props
        form.resetFields()
        this.getData()
    }
    getData(){
        const { loadData, pageSize } = this.props
        loadData && loadData(1, pageSize)
    }
    //打开新建号卡
    openAddWinHandle = e => {
        this.setState({createVisible: true})
    }
    //关闭创建
    closeAddWinHandle = e => {
        this.setState({createVisible: false})
    }
    render(){
        const { createVisible } = this.state
        const { getFieldProps } = this.props.form
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 17 }
        }
        return (
            <Form layout="inline">
                <div className={Styles['sear-item']}>
                    <span className={Styles['inp-txt']}>姓名</span>
                    <span className={Styles['inp-panel']}><Input {...getFieldProps('sourceOwnerName')} placeholder="所属员工姓名"/></span>
                </div>
                <div className={Styles['sear-item']}>
                    <span className={Styles['inp-txt']}>资源编号</span>
                    <span className={Styles['inp-panel']}><Input {...getFieldProps('sourceId')} placeholder="资源编号(可模糊查询)"/></span>
                </div>
                <div className={Styles['sear-item']}>
                    <span className={Styles['inp-txt']}>所属资源包编号</span>
                    <span className={Styles['inp-panel']}><Input {...getFieldProps('sourcePackageId')} placeholder="所属资源包编号(可模糊查询)"/></span>
                </div>
                <div className={Styles['sear-item']}>
                    <span className={Styles['inp-txt']}>资源类型</span>
                    <span className={Styles['inp-panel']}>
                        <Select style={{width: 150}} {...getFieldProps('sourceType')} placeholder="请资源类型">
                            <Option value="">全部</Option>
                            <Option value="bluetooth">蓝牙阅读器</Option>
                            <Option value="card">号卡</Option>
                        </Select>
                    </span>
                </div>
                <div className={Styles['sear-item']}>
                    <span className={Styles['inp-panel']}>
                        <Button type='primary' icon='search' onClick={this.handleSearch}>搜索</Button>
                    </span>
                    <span style={{margin: '0 5px'}} className={Styles['inp-panel']}>
                        <Button type='primary' onClick={this.resetSearch} icon='reload' ghost>重置</Button>
                    </span>
                    <span className={Styles['inp-panel']}>
                        <Button icon='plus' type='primary' onClick={this.openAddWinHandle} ghost>添加号卡</Button>
                    </span>
                </div>
                <AddWin {...this.props} visible={createVisible} callback={this.props.callback} onClose={this.closeAddWinHandle} />
            </Form>
        )
    }
}

const mainForm = Form.create()(Search)
export default mainForm