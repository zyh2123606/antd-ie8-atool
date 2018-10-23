import React from 'react'
import { Router, Route, IndexRoute, Link, IndexRedirect } from 'react-router'
import App from '../views/App'
import NotFound from './not-found'
import PackageMgr from '../views/packageMgr'
import ResourceMgr from '../views/numberCardMgr'
import ApproverMgr from '../views/approver'

const validate = (nextState, replace) => {
    const { query } = nextState.location
    if(!Object.keys(query).length) replace('/')
}
const Routes = ({ history }) => (
    <Router history={history}>
        <Route component={App}>
            <Route onEnter={validate} path="package-mgr" component={PackageMgr} />
            <Route onEnter={validate} path="resource-mgr" component={ResourceMgr} />
            <Route onEnter={validate} path="approver-mgr" component={ApproverMgr} />
        </Route>
        <Route path="*" component={NotFound} />
    </Router>
)
export default Routes
