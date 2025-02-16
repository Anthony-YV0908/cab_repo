
const context = oEvent.oSource.getBindingContext();

// Get Entire Model
const data = context.getObject();


modelSimpleForm1.setData(data)

App.to(MonthlyCreate)

if (sap.n) {
    sap.n.Planet9.function({
        id: "AuditLog",
        method: "Save",
        data: {
            dateStart: Date.now(),
            dateEnd: Date.now(),
            changedBy: "System",
            content: JSON.stringify({ name: "otpreport" }),
            objectKey: "e93b146d-fde9-47b2-f903-f8ede9914b00",
            objectName: "Button21",
            objectType: "sap.m.Button",
            action: "Interaction"
        },
        success: function(data) {
            // Handle success
        },
        error: function(data) {
            // Handle error
        }
    });
};