import { type as actionsDocument } from '../actions/actionsDocument'
const defaultState = "";

function reducer(state = defaultState, { type, payload }) {
    switch (type) {
        case actionsDocument:
            return payload
        default:
            return state
    }
}
export default reducer