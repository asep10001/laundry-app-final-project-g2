const initialState = {
    cabang: []
}


const Cabang=(state = initialState, action)=>{
        switch (action.type) {
            case 'ADD_CABANG':
                return {
                    cabang: action.payload
                }
            default:
                return state
        }
}

export default Cabang