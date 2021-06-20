const initialState = {
    loadJobs: [],
}

const jobReducer = (state=initialState, action)=> {
    
    switch (action.type){
        case "LOAD_JOBS": {
            const newJobs = {
                ...state,
                loadJobs: action.payload
            }
            return newJobs
        }
        default: {
            return state;
        }
    }

}

export default jobReducer