export const getPackage = (payload)=> {
    return {
        type: "GET_PACKAGE",
        payload
    }
}

export const getCredential = (payload) => {
    return {
        type: "GET_CREDENTIAL",
        payload
    }
}