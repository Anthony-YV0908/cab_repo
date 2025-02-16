
const context = oEvent.oSource.getBindingContext();

// Get Entire Model
const data = context.getObject();


modelSimpleForm15.setData(data)

App.to(StateUpdate)
