const generateListItem = (name, amount, unit) => {
    return '<li class="list-group-item border-red mt-2">' + name + '<span class="badge red-scheme ml-1"><span id="itemAmount">' + amount + '</span><span class="ml-1" id="itemUnit">' + unit + '</span></span><div class="my-1 dark-red-text"><span class="edit"><i class="fas fa-edit"></i></span><i class="ml-2 fas fa-ban mx-2 remove"></i></div></li>';
}

export { generateListItem };