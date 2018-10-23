import React, { Component } from 'react'

class NotFound extends Component{
    render(){
        return (
            <div style={{marginTop: 50}}>
                <div style={{
                    fontSize: 36,
                    color: '#666',
                    textAlign: 'center'
                }}>404</div>
                <div style={{
                    fontSize: 20,
                    color: '#ccc',
                    textAlign: 'center'
                }}>您访问的页面不存在，请确认</div>
            </div>
        )
    }
}

export default NotFound