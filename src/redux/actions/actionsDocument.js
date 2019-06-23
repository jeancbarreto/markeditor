export const type="actionsDocument"
const actionsDocument = value =>{
    return {
        type    : type,
        payload : value
    }
}
export default actionsDocument