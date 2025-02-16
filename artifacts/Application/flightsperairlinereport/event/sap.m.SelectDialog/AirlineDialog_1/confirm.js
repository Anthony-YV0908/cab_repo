// Single Select
var selectedItem = oEvent.getParameter("selectedItem");
console.log(selectedItem);
var context = selectedItem.getBindingContext();
var value = context.getProperty("Code");

// Update Inputfield
AirlineInput_1.setValue(value);