const context = oEvent.oSource.getBindingContext();

// Get Entire Model
const data = context.getObject();


modelSimpleForm10.setData(data)

App.to(RegionUpdate)
