const binding = oEvent.getParameter("itemsBinding");
 const value = oEvent.getParameter("value");
 
const filter = new sap.ui.model.Filter("STATUS", "Contains", value);

 
binding.filter([filter]);

