import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SilderBar } from '../../components'
import Styles from './index.less'
import { setPageQuery } from '../../actions/base'

class App extends Component{
    componentWillMount(){
        const { query } = this.props.location
        this.props.dispatch(setPageQuery(query))
    }
    render(){
        const { children } = this.props
        return (
            <div className={Styles.container}>
                <SilderBar {...this.props} />
                <div className={Styles.content}>{children}</div>
            </div>
        )
    }
}

export default connect(state => state)(App)