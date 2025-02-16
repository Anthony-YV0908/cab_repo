var binding = oEvent.getParameter("itemsBinding");
var value = oEvent.getParameter("value");
var filter = new sap.ui.model.Filter("Code", sap.ui.model.FilterOperator.Contains, value);
binding.filter([filter]);
