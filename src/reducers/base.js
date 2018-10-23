import {CHECK_AUTH, SET_QUERY} from '../constants'

export default (state={hasAuth: false, query: {}}, action) => {
	const {hasAuth=false, query={}, type} = action
	switch(type){
		case CHECK_AUTH:
			state.hasAuth = hasAuth
			break;
        case SET_QUERY:
            state.query = query
            break
		default:
			break
	}
	return { ...state }
}