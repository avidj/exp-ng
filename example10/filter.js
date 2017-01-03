var numberArray = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
console.log("Number array: ", numberArray);

var filteredNumberArray = numberArray.filter(function ( value ) {
   return value > 5;
});
console.log("filteredNumberArray: ", filteredNumberArray);

function above5Filter(value) {
    return value > 5;
}
filteredNumberArray = numberArray.filter(above5Filter);
console.log("filteredNumberArray: ", filteredNumberArray);

var shoppingList = [
    "Milk", "Donuts", "Cookies"
];
console.log("shoppingList: ", shoppingList);

var searchValue = "ilk";
function containsFilter(value) {
    return value.indexOf(searchValue) !== -1;
}
var searchedShoppingList = shoppingList.filter(containsFilter);
console.log(searchedShoppingList);