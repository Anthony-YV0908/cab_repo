
const context = oEvent.oSource.getBindingContext();

// Get Entire Model
const data = context.getObject();



console.log(data) 
UpdateDateIssue(data) 
modelEditSimpleForm.setData(data)

App.to(EditPage)
