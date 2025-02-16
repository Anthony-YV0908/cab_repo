
// Single Select
var selectedItem = oEvent.getParameter("selectedItem");
console.log(selectedItem);
var context = selectedItem.getBindingContext();
var value = context.getProperty("Code");

// Update Inputfield
DestinationInput_2.setValue(value);