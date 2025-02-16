
const context = oEvent.oSource.getBindingContext();

// Get Entire Model
const data = context.getObject();


modelSimpleForm1.setData(data)

App.to(AirportUpdate)
