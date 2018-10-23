import React, {Component} from 'react'
import { Icon, Message, Alert, Upload } from 'antd'
//import Upload from 'rc-upload'

/**
 *上传文件导入号卡
 *
 * @class ExportFile
 * @extends {Component}
 */
const Dragger = Upload.Dragger
class ExportFile extends Component{
    uploadFileProps = {
        name: 'file',
        accept: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        multiple: false,
        data: {
            ...this.props.Base.query
        },
        action: '/import',
        onChange: info => {
            const { file } = info
            if(!file) return
            const { status, response } = file
            if(status === 'done'){
                if(!response) return
                const res = response.split(';')
                if(res[0] !== '0')
                return Message.warning(res[1])
                let data = [], imgUrl='', createTime = '';
                try{
                    data = JSON.parse(res[1])
                    imgUrl = res[2]
                    createTime = res[3]
                }catch(err){
                    console.warning(err)
                }
                const { fillData } = this.props
                const source_ids = []
                data.forEach((item, idx) => {
                    source_ids.push({sourceId: item, createTime: createTime})
                })
                fillData && fillData(source_ids, imgUrl)
                Message.success('操作成功')
            }
        }
    }
    render(){
        return (
            <div style={{paddingBottom: 10}}>
                <Alert message='一次最多只能导入300条数据' type='warning' />
                <div style={{marginTop: 10}}>
                    <Dragger directory={false} {...this.uploadFileProps}>
                        <div style={{padding: '10px 0'}}>
                            <div style={{fontSize: 36, color: '#ccc'}}><Icon type="inbox"/></div>
                            <div style={{fontSize: 12, color: '#999'}}>点击或拖拽进行上传，只能上传excel文件</div>
                        </div>
                    </Dragger>
                </div>
            </div>
        )
    }
}

export default ExportFile