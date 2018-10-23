import React, { Component } from 'react'
import { Menu, Icon } from 'antd'

const MenuItem = Menu.Item
class MenuView extends Component{
    state = { currentKey: '/' }
    meuns = [
        {title: '资源包管理', url: '/resource-mgr', icon: 'credit-card'},
        {title: '资源管理', url: '/resource-mgr/createCard', icon: 'appstore-o'},
        {title: '设置审批人', url: '/resource-mgr/approver-mgr', icon: 'solution'}
    ]
    componentDidMount(){
        const { pathname } = this.props.location
        this.setState({ currentKey: pathname })
    }
    //点击meun跳转
    menuHandle = e => {
        const { history } = this.props
        const { key } = e
        const { currentKey } = this.state
        if(currentKey === key) return
        this.setState({ currentKey: key }, () =>{
            history.push(key)
        })
    } 
    render(){
        const { currentKey } = this.state
        return (
            <Menu onClick={this.menuHandle.bind(undefined)} selectedKeys={[currentKey]} style={{width: '100%'}} mode='horizontal'>
                {this.meuns.map(({ title, url, icon }, idx) => (
                    <MenuItem key={url}><Icon type={icon} />{title}</MenuItem>
                ))}
            </Menu>
        )
    }
}

export default MenuView