
const context = oEvent.oSource.getBindingContext();

// Get Entire Model
const data = context.getObject();


modelSimpleForm4.setData(data)

App.to(GlobalRegionUpdate)
