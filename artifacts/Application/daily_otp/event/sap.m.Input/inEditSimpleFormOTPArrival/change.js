

if (sap.n) {
    sap.n.Planet9.function({
        id: "AuditLog",
        method: "Save",
        data: {
            dateStart: Date.now(),
            dateEnd: Date.now(),
            changedBy: "System",
            content: JSON.stringify({ name: "daily_otp" }),
            objectKey: "f60aadae-6fe6-450c-a2c4-5a7c51e93c73",
            objectName: "inEditSimpleFormOTPArrival",
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