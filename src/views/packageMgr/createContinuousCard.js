import React, {Component} from 'react'
import { Form, Row, Col, Spin, Input, Button, Message } from 'antd'
import Dayjs from 'dayjs'
import Service from '../../services/resourceService'

/**
 *添加连续号卡
 *
 * @class CreateContinuous
 * @extends {Component}
 */
const FormItem = Form.Item
class CreateContinuous extends Component{
    state = {isRequest: false}
    //添加连续卡号
    continuousHandle = e => {
        e.preventDefault()
        const { form } = this.props
        form.validateFields((err, values) => {
            this.doAdd(err, values)
        })
    }
    //执行操作
    async doAdd(err, values){
        const { fillData, source, dispatch } = this.props
        if(err) return
        const { idStart, idEnd } = values
        if(idStart === '' || idStart == null || isNaN(idStart)) return Message.warning('请输入正确的开始卡号')
        if(idEnd === '' || idStart == null || isNaN(idEnd)) return Message.warning('请输入正确的结束卡号')
        let _starL = Number(idStart.substr(idStart.length - 4, idStart.length))
        let _endL = Number(idEnd.substr(idEnd.length - 4, idEnd.length))
        if(_starL > _endL) return Message.warning('开始卡号不能大于结束卡号')
        if(_endL - _starL > 300) return Message.warning('一次最多只能添加300条')
        //执行添加操作
        const { query } = this.props.Base
        const params = {idStart, idEnd, ...query}
        this.setState({isRequest: true})
        const res = await Service.addContinuousCardNum(params)
        this.setState({isRequest: false})
        const { code, data } = res
        if(code !== '0') return Message.warning(res.message)
        //页面展示
        let nums = []
        let _numFix = idStart.substr(0, idStart.length - 4)
        for(let i=_starL; i<=_endL; i++){
            let _rec = {}
            let _sourId = _numFix+i
            let oldNum = source.find(({sourceId, idx}) => sourceId == _sourId)
            if(oldNum){
                Message.warning(`卡号${_sourId}重复`)
                continue
            }
            _rec.sourceId = _sourId
            _rec.createTime = Dayjs().format('YYYY-MM-DD HH:mm:ss')
            nums.push(_rec)
        }
        fillData && fillData(nums, data || '')
    }
    render(){
        const { isRequest } = this.state
        const { getFieldProps } = this.props.form
        const idStartProps = getFieldProps('idStart', {
            rules: [{ required: true, message: '请输入开始卡号' }]
        })
        const idEndProps = getFieldProps('idEnd', {
            rules: [{ required: true, message: '请输入结束卡号' }]
        })
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 17 }
        }
        return (
            <Form onSubmit={this.continuousHandle}>
                <Row gutter={16}>
                    <Col span={10}>
                        <FormItem {...formItemLayout} label='开始卡号' hasFeedback>
                            <Input {...idStartProps} placeholder='请输入开始卡号' />
                        </FormItem>
                    </Col>
                    <Col span={10}>
                        <FormItem {...formItemLayout} label='结束卡号' hasFeedback>
                            <Input {...idEndProps} placeholder='请输入开始卡号' />
                        </FormItem>
                    </Col>
                    <Col span={4}>
                        <div style={{marginTop: 2}}>
                            <Button disabled={isRequest} icon='plus' type='primary' htmlType="submit">添加</Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        )
    }
}

const mainForm = Form.create()(CreateContinuous)
export default mainForm