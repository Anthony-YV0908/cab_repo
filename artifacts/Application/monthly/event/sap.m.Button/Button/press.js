Monthly()

if (sap.n) {
    sap.n.Planet9.function({
        id: "AuditLog",
        method: "Save",
        data: {
            dateStart: Date.now(),
            dateEnd: Date.now(),
            changedBy: "System",
            content: JSON.stringify({ name: "daily_otp" }),
            objectKey: "a0f827c3-4991-4861-b5ff-2a89db5cf58e",
            objectName: "Button",
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

if (sap.n) {
    sap.n.Planet9.function({
        id: "AuditLog",
        method: "Save",
        data: {
            dateStart: Date.now(),
            dateEnd: Date.now(),
            changedBy: "System",
            content: JSON.stringify({ name: "daily_otp" }),
            objectKey: "a0f827c3-4991-4861-b5ff-2a89db5cf58e",
            objectName: "Button",
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