const initialState = {
    orders: []
}


const Orders=(state = initialState, action)=>{
        switch (action.type) {
            case 'ADD_ORDERS':
                // alert(JSON.stringify(action.payload))
                return {
                    orders: action.payload
                }
            default:
                return state
        }
}

export default Orders