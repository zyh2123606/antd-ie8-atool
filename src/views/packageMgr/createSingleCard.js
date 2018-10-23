import React, {Component} from 'react'
import { Form, Row, Col, Input, Button, Message } from 'antd'
import Service from '../../services/resourceService'
import Dayjs from 'dayjs'

const FormItem = Form.Item
/**
 *添加单条号卡
 *
 * @class CreateSingle
 * @extends {Component}
 */
class CreateSingle extends Component{
    state = {isRequest: false}
    continuousSingleHandle = e => {
        e.preventDefault()
        const { form, source } = this.props
        form.validateFields((err, values) => {
            const { single_num } = values
            if(err) return
            let rep_num = source.find(({ sourceId, idx }) => sourceId == single_num)
            if(rep_num) return Message.warning(single_num+'该卡号已经存在')
            this.addSingleNum(single_num)
        })
    }
    //添加单条号卡
    async addSingleNum(single_num){
        const { fillData } = this.props
        const { query } = this.props.Base
        const params = {staffNo : '01', sourceList: [single_num], ...query}
        this.setState({isRequest: true})
        const res = await Service.addSingleCardNum(params)
        this.setState({isRequest: false})
        const { code, data } = res
        if(code !== '0') return Message.warning(res.message)
        const records = {}
        records.sourceId = single_num
        records.createTime = Dayjs().format('YYYY-MM-DD HH:mm:ss')
        fillData && fillData([records], data.imgUrl || '')
    }
    render(){
        const { isRequest } = this.state
        const { getFieldProps } = this.props.form
        const singleNumProps = getFieldProps('single_num', {
            rules: [{ required: true, message: '请输入号卡' }]
        })
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 21 }
        }
        return (
            <Form onSubmit={this.continuousSingleHandle} layout='inline'>
                <Row gutter={16}>
                    <Col span={20}>
                        <FormItem {...formItemLayout} label='卡号' hasFeedback>
                            <Input {...singleNumProps} placeholder="请输入号卡" autosize tyle={{width: '100%'}} />
                        </FormItem>
                    </Col>
                    <Col span={4}>
                        <div style={{marginTop: 2}}>
                            <Button disabled={isRequest} icon='plus' htmlType="submit" type='primary' ghost>添加</Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        )
    }
}

const mainForm = Form.create()(CreateSingle)
export default mainForm