const updatePage = (obj) => {
    let keys = Object.keys(obj);
    let values = Object.values(obj);

    keys.map((key, i) => {
        if (Array.isArray(values[i])) {
            $('#' + key + ' > ul').append(values[i]);
        }
    })
}

export {
    updatePage
};