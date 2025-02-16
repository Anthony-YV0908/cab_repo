

if (sap.n) {
    sap.n.Planet9.function({
        id: "AuditLog",
        method: "Save",
        data: {
            dateStart: Date.now(),
            dateEnd: Date.now(),
            changedBy: "System",
            content: JSON.stringify({ name: "daily_otp" }),
            objectKey: "a6bfad28-2339-4380-a0c5-44fb3604a43c",
            objectName: "inSimpleFormAOC",
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