import HttpBase from '../util/httpBase'

/**
 *相关卡包，号考管理接口服务
 *
 * @class NumberMgrService
 * @extends {Ajax}
 */
class NumberMgrService extends HttpBase{
    constructor(){
        super('/platform/')
    }
    //查询卡包列表
    queryPackageList = (data=undefined) => {
        return this.post('query/resourcePackage', data)
    }
    //添加起始号和结束号卡
    addContinuousCardNum = (data=undefined) => {
        return this.post('generate/generateBatchBarCode', data)
    }
    //添加单张号卡
    addSingleCardNum = (data=undefined) => {
        return this.post('generate/generateBarCode', data)
    }
    //查询号卡资源列表
    queryNumRecourceList = (data=undefined) => {
        return this.post('query/resource', data)
    }
    //获取区域信息
    getAreaList = () => {
        return this.get('query/area')
    }
    //添加审批人
    addApprover = (data=undefined) => {
        return this.post('query/addStaff', data)
    }
    //查询审批人列表
    queryApproverList = (data=undefined) => {
        return this.post('query/approver', data)
    }
    //删除审批人
    delApprover = (data=undefined) => {
        return this.post('query/deleteStaff', data)
    }
    //添加资源号卡
    addSingleBarCode = (data=undefined) => {
        return this.post('generate/generateSingleBarCode', data)
    }
    //根据员工编号查询员工信息
    queryEmpInfoByNo = (data=undefined) => {
        return this.post('query/queryStaffInfo', data)
    }
}

export default new NumberMgrService()