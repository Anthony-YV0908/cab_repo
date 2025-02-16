

if (sap.n) {
    sap.n.Planet9.function({
        id: "AuditLog",
        method: "Save",
        data: {
            dateStart: Date.now(),
            dateEnd: Date.now(),
            changedBy: "System",
            content: JSON.stringify({ name: "daily_otp" }),
            objectKey: "7801b561-60d2-43b2-cbf0-87619ca46660",
            objectName: "inSimpleFormFlightId",
            objectType: "sap.m.Input",
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