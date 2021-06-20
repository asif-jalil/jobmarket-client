const initialState ={
    chosenPackage: {},
    userData: {}
}

const empSignupReducer = (state=initialState, action)=> {

    switch(action.type){
        case "GET_PACKAGE": {
            const newChosenPackage = {
                ...state,
                chosenPackage: action.payload
            }
            return newChosenPackage;
        }
        case "GET_CREDENTIAL": {
            const newUserData = {
                ...state,
                userData: action.payload
            }
            return newUserData;
        }
        default: {
            return state;
        }
    }

}

export default empSignupReducer;