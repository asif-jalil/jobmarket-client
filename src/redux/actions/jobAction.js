export function loadJobs() {
    return (dispatch) => {
        fetch("http://localhost:5000/approvedJobs")
            .then(res => res.json())
            .then(data => dispatch({
                type: "LOAD_JOBS",
                payload: data
            }))
    }
}