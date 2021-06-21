export function loadJobs() {
    return (dispatch) => {
        fetch("https://pure-inlet-61267.herokuapp.com/approvedJobs")
            .then(res => res.json())
            .then(data => dispatch({
                type: "LOAD_JOBS",
                payload: data.reverse()
            }))
    }
}