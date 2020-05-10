const storageUpdate = (obj) => {
    localStorage.setItem('pageState', JSON.stringify(obj));
}

export { storageUpdate };