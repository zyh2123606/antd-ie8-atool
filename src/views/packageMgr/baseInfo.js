import React, { Component } from 'react'
import { Row, Col } from 'antd'
import Styles from './index.less'

/**
 *卡包基础信息
 *
 * @class BaseInfo
 * @extends {Component}
 */
class BaseInfo extends Component{
    render(){
        const { sourcePackageId, imgUrl, sourceCreator, createTime, sourceIds } = this.props.data
        let _sourceIds = sourceIds.replace('[','').replace(']','').split(',');
        return (
            <Row gutter={16}>
                <Col span={4}>卡包编号：</Col>
                <Col span={20}>{sourcePackageId}</Col>
                <Col span={4}>卡包二维码：</Col>
                <Col span={20}>
                    <div className={Styles['img-code-panel']}>
                        {imgUrl?<img alt='' src={imgUrl} />:<div>无卡包二维码</div>}
                    </div>
                </Col>
                <Col style={{marginTop: 5}} span={4}>第一张卡号：</Col>
                <Col style={{marginTop: 5}} span={8}>{_sourceIds[0]}</Col>
                <Col style={{marginTop: 5}} span={5}>最后一张卡号：</Col>
                <Col style={{marginTop: 5}} span={7}>{_sourceIds[1] || '无'}</Col>
                <Col span={4}>创建人：</Col>
                <Col span={8}>{sourceCreator || '无'}</Col>
                <Col span={5}>创建日期：</Col>
                <Col span={7}>{createTime}</Col>
            </Row>
        )
    }
}

export default BaseInfo