var itemNumber = window.location.hash.match(/^#item-(\d+)/);
if (itemNumber) {
    $("#carousel-inititatives").carousel();
    $("#carousel-inititatives").carousel(itemNumber[1] - 1);
}