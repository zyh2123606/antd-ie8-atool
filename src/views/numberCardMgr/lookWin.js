import { Component } from 'react'
import Block from 'fs-flex'
import { Modal, Button, Card } from 'antd'

/**
 *资源查看
 *
 * @class LookWin
 * @extends {Component}
 */
class LookWin extends Component{
    openPrintPage(){
        const { dispatch, data } = this.props;
        const params = {pathname: '/print'};
        dispatch({type: 'base/setData', data, params});
    }
    render(){
        const { data: {sourcePackageId, imgUrl, sourceCreator, updateTime}, visible, onClose } = this.props
        return (
            <Modal
                title='资源包查看'
                style={{ top: 30 }}
                width={600}
                onCancel={onClose}
                visible={visible}
                footer={
                    <Button onClick={onClose}>关闭</Button>
                }>
                <Card loading={false} bordered={false} bodyStyle={{padding: '10px 0'}}>
                    <Block wf>
                        <Block w={110} j='e'>资源包编号：</Block>
                        <Block f={1}>{sourcePackageId || '无'}</Block>
                    </Block>
                    <Block mt={10} wf>
                        <Block w={110} j='e'>资源包二维码：</Block>
                        {imgUrl?<Block p={10} style={{border: '#eee solid 1px', borderRadius: 4}}>
                            <Block w={300}><img alt='' src={imgUrl} style={{width: '100%',height:'auto', display: 'block'}}/></Block>
                        </Block>:'无卡包二维码'}
                    </Block>
                    <Block wf mt={10}>
                        <Block wf f={1}>
                            <Block w={110} j='e'>创建人：</Block>
                            <Block>{sourceCreator || '无'}</Block>
                        </Block>
                        <Block wf f={1}>
                            <Block w={110} j='e'>创建日期：</Block>
                            <Block>{updateTime}</Block>
                        </Block>
                    </Block>
                </Card>
            </Modal>
        )
    }
}

export default LookWin