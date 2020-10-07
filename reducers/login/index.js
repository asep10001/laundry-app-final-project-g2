const initialState = {
    isLoggedin: false
}


const AuthReducer=(state = initialState, action)=>{
        switch (action.type) {
            case 'PRESSED':
                return {
                    isLoggedin: !state.isLoggedin
                }
            default:
                return state
        }
}

export default AuthReducer