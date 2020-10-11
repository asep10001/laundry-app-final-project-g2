const initialState = {
    isReady: false
}


const ReadyReducer=(state = initialState, action)=>{
        switch (action.type) {
            case 'PRESSED_READY':
                return {
                    isReady: !state.isReady
                }
            default:
                return state
        }
}

export default ReadyReducer