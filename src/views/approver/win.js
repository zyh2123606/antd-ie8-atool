import React, { Component } from 'react'
import { Modal, Form, Row, Col, Select, Input, Button, Message } from 'antd'
import Service from '../../services/resourceService'

/**
 * 添加审批人
 */
const FormItem = Form.Item
const { Option } = Select
const InputGroup = Input.Group
class AddWin extends Component{
    state = {isRequest: false}
    //添加
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields(async(err, params) => {
            if(err) return
            const { callback } = this.props
            const { query } = this.props.Base
            this.setState({isRequest: true})
            const {code, data, message} = await Service.addApprover({...params, ...query})
            this.setState({isRequest: false})
            if(code !== '0') return Message.warning(message)
            callback && callback()
        })
    }
    //关闭
    winClose = () => {
        const { close, form } = this.props
        form.resetFields()
        close && close()
    }
    searchEmpInfo = e => {
        e.preventDefault()
        const { form } = this.props
        form.validateFields(async(err, values) => {
            if(err) return false
            const { areaCode, staffId } = values
            if(staffId.toString().trim() === '') return Message.warning('请输入工号')
            const params = { areaCode, staffId }
            this.setState({isRequest: true})
            const {code, data, message} = await Service.queryEmpInfoByNo(params)
            this.setState({isRequest: false})
            if(code !== '0') return Message.warning(message)
            const { staffName='', phone='' } = data || {}
            form.setFieldsValue({staffName, phone})
        })
    }
    areaHandleChange = areaCode => {
        const { form } = this.props
        form.setFieldsValue({areaCode, staffId: '', staffName: '', phone: ''})
    }
    render(){
        const { form:{ getFieldProps }, visible, data } = this.props
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 20}
        }
        const { isRequest } = this.state
        return (
            <Modal title='添加审批人' 
                visible={visible}
                onCancel={this.winClose}
                footer={
                    <div>
                        <Button onClick={this.winClose}>关闭</Button>
                        <Button disabled={isRequest} onClick={this.handleSubmit} type='primary'>保存</Button>
                    </div>
                }>
                <Form>
                    <FormItem label='区域：' {...formItemLayout}>
                        <Select {...getFieldProps('areaCode', {
                            rules: [{required: true, message: '请选择区域'}]
                        })} onChange={this.areaHandleChange} placeholder='请选择区域'>
                            {data.map(({areaCode, areaName}, idx) => (
                                <Option key={idx} value={areaCode}>{areaName}</Option>
                            ))}
                        </Select>
                    </FormItem>
                    <InputGroup>
                        <FormItem {...formItemLayout} label='工号：' style={{marginLeft: 15}}>
                            <Input style={{borderRadius: 5}} {...getFieldProps('staffId', {
                                rules: [{required: true, message: '请输入工号'}]
                            })} placeholder='请输入工号'></Input>
                        </FormItem>
                        <div style={{display: 'table-cell', width: '1%', verticalAlign: 'top'}}>
                            <Button style={{margin: '2px 0 0 10px'}} type="primary" onClick={this.searchEmpInfo}>查询</Button>
                        </div>
                    </InputGroup>
                    <FormItem label='姓名：' {...formItemLayout}>
                        <Input {...getFieldProps('staffName', {rules:[{required: false}]})} disabled placeholder='输入工号获取'></Input>         
                    </FormItem>
                    <FormItem label='手机：' {...formItemLayout}>
                        <Input {...getFieldProps('phone', {rules: [
                            {required: false}
                        ]})} disabled placeholder='输入工号获取'></Input>
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}
const MainForm = Form.create()(AddWin)
export default MainForm