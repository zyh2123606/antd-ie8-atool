import React, { Component } from 'react'
import { Modal, Button } from 'antd'
import BaseInfo from './baseInfo'
import PackageNumDetail from './packageNumDetail'

/**
 *查看卡包信息
 *
 * @class PackagePreview
 * @extends {Component}
 */
class PackagePreview extends Component{
    //打印
    openPrintPage(){
        const { dispatch, data } = this.props;
        const params = {pathname: '/print'};
        dispatch({type: 'base/setData', data, params});
    }
    render(){
        const { data, onClose, visible } = this.props
        return (
            <Modal
                title='卡包查看'
                style={{ top: 30 }}
                width={600}
                onCancel={onClose}
                visible={visible}
                footer={
                    <Button onClick={onClose}>关闭</Button>
                }>
                <BaseInfo data={data}/>
                <div style={{marginTop: 10}}>
                    <PackageNumDetail data={data.sourceIds || []} createTime={data.createTime} type='look' />
                </div>
            </Modal>
        )
    }
}

export default PackagePreview
