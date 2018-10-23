import React, { Component } from 'react'
import { Modal, Table, Alert, Message, Form, Button, Input, Row, Col } from 'antd'
import Dayjs from 'dayjs'
import './index.less'
import Service from '../../services/resourceService'

/**
 *添加单个资源号卡
 *
 * @class CreateNumWin
 * @extends {Component}
 */
const FormItem = Form.Item
class CreateNumWin extends Component{
    state={ dataSource: [], imgUrl: '', isRequest: false }
    columns = [
        {title: '资源ID', dataIndex: 'sourceId', key: 'sourceId'},
        {title: '创建日期', flex: 1, dataIndex: 'createTime', key: 'createTime'}
    ]
    //关闭
    winClose(){
        const { onClose, form } = this.props
        form.resetFields()
        onClose && onClose()
        this.setState({dataSource: [], imgUrl: ''})
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { form, callback } = this.props
        form.validateFields((err, values) => {
            if(err) return
            const { card_num } = values
            this.doAdd(card_num)
        })
    }
    async doAdd(card_num){
       const { dataSource } = this.state
        const { callback } = this.props
        if(dataSource.length){
            let rep_num = dataSource.find(({ sourceId, idx }) => sourceId == card_num)
            if(rep_num) return Message.warning(card_num+'该卡号已经存在')
        }
        const { query } = this.props.Base
        const params = {sourceId: card_num, sourceType: 'card', ...query}
        this.setState({isRequest: true})
        const { code, data, message } = await Service.addSingleBarCode(params)
        this.setState({isRequest: false})
        if(code !== '0') return Message.warning(message)
        const record = {
            key: Dayjs().format('YYYY-MM-DD h:mm:ss'),
            sourceId: card_num,
            createTime: Dayjs().format('YYYY-MM-DD h:mm:ss')
        }
        this.setState({dataSource: [...dataSource, record], imgUrl: data})
        callback && callback()
    }
    render(){
        const { dataSource, imgUrl, isRequest } = this.state
        const { form:{ getFieldProps }, visible } = this.props
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 20}
        }
        return (
            <Modal 
                title='添加号卡' 
                visible={visible}
                onCancel={this.winClose.bind(this)}
                footer={<Button onClick={this.winClose.bind(this)}>关闭</Button>}>
                <Form>
                    <Row gutter={16}>
                        <Col span={18}>
                            <FormItem label='卡号：' hasFeedback {...formItemLayout}>
                                <Input {...getFieldProps('card_num',{rules: [{required: true, message: '请输入号卡'}]})} placeholder='请输入卡号'></Input>
                            </FormItem>
                        </Col>
                        <Col span={6} style={{marginTop: 2}}>
                            <Button disabled={isRequest} onClick={this.handleSubmit} type='primary' icon='plus'>添加</Button>
                        </Col>
                    </Row>
                </Form>
                <div>卡包二维码</div>
                <div className='img-code-panel'>
                    {imgUrl?<img alt='' src={imgUrl} />:null}
                </div>
                <div style={{marginTop: 10}}>
                    <Alert message='号卡信息' type='info' style={{border: 'none', borderRadius: 0}} />
                    <Table size='small'
                        style={{marginTop: 5}} 
                        locale={{emptyText: '暂无数据'}} 
                        columns={this.columns} 
                        dataSource={dataSource}
                        pagination={{
                            defaultCurrent: 1,
                            total: dataSource.length,
                            defaultPageSize: 20
                        }}/>
                </div>
            </Modal>
        )
    }
}
const mainForm = Form.create()(CreateNumWin)
export default mainForm