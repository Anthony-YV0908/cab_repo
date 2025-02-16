
const context = oEvent.oSource.getBindingContext();

// Get Entire Model
const data = context.getObject();


modelSimpleForm8.setData(data)

App.to(ProvinceUpdate)
