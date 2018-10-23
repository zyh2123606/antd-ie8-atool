import React, {Component} from 'react'
import { Modal,Table, Alert, Button, Tabs } from 'antd'
import ExportFile from './exportCardFile'
import CreateSingle from './createSingleCard'
import CreateContinuous from './createContinuousCard'
import Styles from './index.less'

const TabPane = Tabs.TabPane
class CreateWin extends Component {
    state = {
        imgUrl: '',
        dataSource: [],
        currentTab: '1'
    }
    columns = [
        {title: '资源ID', dataIndex: 'sourceId', key: 'sourceId'},
        {title: '创建日期', flex: 1, dataIndex: 'createTime', key: 'createTime'}
    ]
    //关闭创建弹窗
    closeHandle() {
        const { onClose } = this.props
        onClose && onClose()
        this.setState({dataSource: [], imgUrl: ''})
    }
    //数据填充
    fillData = (records=[], imgUrl) => {
        const { callback } = this.props
        const { dataSource } = this.state
        this.setState({dataSource: [...dataSource, ...records], imgUrl})
        callback && callback()
    }
    //tab切换
    tabHandleChange = currentTab => {
        this.setState({currentTab})
    }
    render() {
        const { dataSource, currentTab, imgUrl } = this.state
        const { visible } = this.props
        return (
        <Modal
            width={700}
            onCancel={this.closeHandle.bind(this)}
            style={{top: 30, padding: 0}}
            visible={visible}
            title='新建卡包'
            footer={
                <Button onClick={this.closeHandle.bind(this)}>关闭</Button>
            }>
            {visible?<Tabs onChange={this.tabHandleChange} activeKey={currentTab}>
                <TabPane tab='添加单张卡号' key='1'>
                    <CreateSingle {...this.props} fillData={this.fillData} source={dataSource} />
                </TabPane>
                <TabPane tab='添加连续卡号' key='2'>
                    <CreateContinuous {...this.props} fillData={this.fillData} source={dataSource}/>
                </TabPane>
                <TabPane tab='导入卡号文件' key='3'>
                    <ExportFile {...this.props} fillData={this.fillData} />
                </TabPane>
            </Tabs>:null}
            <Alert message='卡包信息' type='info' style={{border: 'none', borderRadius: 0}} />
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
            <div style={{marginTop: 10}}> 
                <Alert message='生成卡包二维码' type='info' />
            </div>
            <div className={Styles['img-code-panel']}>
                {imgUrl?<img alt='' src={imgUrl} />:<div>添加卡号后自动生成</div>}
            </div>
        </Modal>
        )
    }
}
export default CreateWin
