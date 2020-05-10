const storageRead = () => {
    
    if (JSON.parse(localStorage.getItem('pageState')) === null) {
        let pageState = {
            totalItems: 0,
            pieces: 0,
            grams: 0,
            vegetables: [],
            fruits: [],
            dairy: [],
            bread: [],
            hygiene: []
        }
        return pageState;
    } else {
        return JSON.parse(localStorage.getItem('pageState'));
    }
}

export { storageRead };