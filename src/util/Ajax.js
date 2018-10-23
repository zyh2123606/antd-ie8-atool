/**
 * @description ajax数据请求
 * @create date 2016-05-04
 * @author zyh
 */
'use strict';
class DoAjax{
	constructor(params) {
		this.GLOBAL_XHR = null;
		//初始化配置
		this.config = {
			//请求地址
			url:'',
			//参数
			data:{},
			dataType: 'JSON',
			//超时时间15秒
			timeout:15000,
			//请求的类型
			type:'post',
			//是否异步
			async:true
		};
		this._extendParams(params,this.config);
		this._initXMLHttp(xhr => {
			try{
				if(xhr == null){
					throw new Error('No XHR object available');
					return
				}
				this.GLOBAL_XHR = xhr;
			}catch(err){
				throw new Error(err)
			}
		});
	};

	//Post请求
	post(url,data) {
		this.GLOBAL_XHR.open('POST', url, true);
		this.GLOBAL_XHR.setRequestHeader("Content-Type","application/json;charset=UTF-8");
		this.GLOBAL_XHR.send(JSON.stringify(data));
		return new Promise((resolve, reject) => {
			this._ajaxRequest(resolve, reject);
		})
	};

	//Get请求
	get(url,data) {
		let params = this._groupParams(data);
		this.GLOBAL_XHR.open('GET',url + '?' + params,true);
		this.GLOBAL_XHR.setRequestHeader("Content-Type","text/plain");
		this.GLOBAL_XHR.send(null);
		return new Promise((resolve, reject) => {
			this._ajaxRequest(resolve, reject);
		})
	};

	//执行ajax请求
	_ajaxRequest(resolve, reject) {
		let isTimeOut = false;
		let timeOutFlag = null;
		//绑定onreadystatechange处理器
		this.GLOBAL_XHR.onreadystatechange = () => {
			if(this.GLOBAL_XHR.readyState == 4 && !isTimeOut){
				clearTimeout(timeOutFlag);
				if(this.GLOBAL_XHR.status == 200){
					try{
						let result = JSON.parse(this.GLOBAL_XHR.responseText);
						resolve(result);
					}catch(err){
						throw new Error('返回的数据不是json格式');
						reject();
					}
				}else{
					throw new Error('请求出错');
					reject();
				}
			}
		}
		//超时检测
		timeOutFlag = setTimeout(()=>{
			isTimeOut = true;
			clearTimeout(timeOutFlag);
			reject()
		},this.config.timeout);
	};

	//参数合并
	_extendParams(params,source) {
		for(var key in params){
			if(params[key]){
				source[key] = params[key];
			}
		}
	};

	//初始化检测XMLHttpRequest
	_initXMLHttp(callback) {
		let XHR = null;
		if(window.XMLHttpRequest){
			XHR = new XMLHttpRequest();
		}else{
			if(window.ActiveXObject){
				if(arguments.callee.activeXString != 'string'){
					let msHttp = ['MSXML2.XMLHTTP.6.0','MSXML2.XMLHTTP.3.0','MSXML2.XMLHTTP'];
					msHttp.map((msx)=>{
						try{
							new ActiveXObject(msx);
							arguments.callee.activeXString = msx;
						}catch(ex){
							throw new Error('ActiveXObjext not found');
						}
					})
					XHR = new ActiveXObject(arguments.callee.activeXString);
				}
			}
		}
		callback(XHR);
	};

	//参数组合
	_groupParams(params) {
		let paramStr = [];
		for(var p in params){
			paramStr.push(encodeURIComponent(p) + '=' + encodeURIComponent(params[p]));
		}
		return paramStr.join('&');
	};
}

export default DoAjax;