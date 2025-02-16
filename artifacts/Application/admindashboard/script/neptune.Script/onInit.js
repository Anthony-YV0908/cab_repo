
var tableName 
// PDF format
function exportToPDF(tableName) {
    try {
        $(tableName).tableExport({
            type: "pdf",
            jspdf: { orientation: "p", margins: { left: 50, top: 10 }, autotable: false },
        });
        sap.m.MessageToast.show("Export File generated.");
    } catch (error) {
        console.error(error);
        sap.m.MessageToast.show("Add a Table Name (ID)");
    }
}

// Excel format
function exportToExcel(tableName) {
    try {
        $(tableName).tableExport({ 
            type: "excel",
            mso: { fileFormat: "xlsx", worksheetName: ["Table 1", "Table 2", "Table 3"] },
        });
        sap.m.MessageToast.show("Export File generated.");
    } catch (error) {
        console.error(error);
        sap.m.MessageToast.show("Add a Table Name (ID)");
    }
}

// CSV format
function exportToCSV(tableName) {
    try {
        $(tableName).tableExport({ type: "csv" });
        sap.m.MessageToast.show("Export File generated.");
    } catch (error) {
        console.error(error);
        sap.m.MessageToast.show("Add a Table Name (ID)");
    }
}
// if (sap.n) {
//     sap.n.Shell.attachBeforeDisplay(function(startParams) {
//         const userId = AppCache.userInfo.id; // Assuming you have the user ID from the AppCache
 
//         var apiUrl = '/api/serverscript/getuserrole/Send'; // Your API URL
 
//         fetch(apiUrl, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ UserId: userId }) // Send UserId in the request body
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log('Data successfully received:', data); // Log the response data
 
//             if (data && data.data) {
//                 // Handle the data received from the backend (groupedResult)
//                 console.log('Processed data:', data.data);
 
//                 // Iterate over each user and their ParentModules
//                 data.data.forEach(user => {
//                     user.ParentModules.forEach(module => {
//                         if (module.ParentName === "References" && module.isActive === 1) {
//                             oReferences.setVisible(true);
//                         }else if(AppCache.userInfo.username === "admin"){
//                             oReferences.setVisible(true);
//                         }
 
//                         if (module.ParentName === "Transaction" && module.isActive === 1) {
//                             oTransaction.setVisible(true);
 
//                         }else if(AppCache.userInfo.username === "admin"){
//                             oTransaction.setVisible(true);
//                         }
 
//                         if (module.ParentName === "Reports" && module.isActive === 1) {
//                             oReports.setVisible(true);
 
//                         }else if(AppCache.userInfo.username === "admin"){
//                             oReports.setVisible(true);
//                         }
 
//                         if (module.ParentName === "UserMaintenance" && module.isActive === 1) {
//                             oUserMaintenance.setVisible(true);
 
//                         }else if(AppCache.userInfo.username === "admin"){
//                             oUserMaintenance.setVisible(true);
//                         }
 
//                         if (module.ParentName === "Utilities" && module.isActive === 1) {
//                             oUtilities.setVisible(true);
 
//                         }else if(AppCache.userInfo.username === "admin"){
//                             oUtilities.setVisible(true);
//                         }
//                     });
//                 });
//             } else {
//                 console.error('No data found:', data.message);
//             }
//         })
//         .catch(error => {
//             console.error('Error in sending data:', error);
//         });
//     });
// }
 
 
// if (sap.n) {
//     sap.n.Shell.attachBeforeDisplay(function(startParams) {
//        oAdminDashboard.setVisible(true);
//        oReferences.setVisible(true);
//        oTransaction.setVisible(true);
//        oReports.setVisible(true);
//        oUserMaintenance.setVisible(true);
//        oUtilities.setVisible(true);
//     });
// }
 
 
 
 
// if (sap.n) {
//     sap.n.Shell.attachBeforeDisplay(function(startParams) {
//         const userId = AppCache.userInfo.id; // Get the user ID from AppCache
 
//         var apiUrl = '/api/serverscript/getuserrole/Send'; // Your API URL
//         // console.log(userId);
//         fetch(apiUrl, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ UserId: userId }) // Send UserId in the request body
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log('Data successfully received:', data); // Log the response data
 
//             if (data && data.data) {
//                 // Handle the data received from the backend (groupedResult)
//                 console.log('Processed data:', data.data);
 
//                 // Iterate over each user and their ParentModules
//                 data.data.forEach(user => {
//                     user.ParentModules.forEach(module => {
//                         if (module.isActive === 1) {
//                             if (module.ParentName === "References" || AppCache.userInfo.username === "admin") {
//                                 oReferences.setVisible(true);
//                             }
//                             if (module.ParentName === "Transaction" || AppCache.userInfo.username === "admin") {
//                                 oTransaction.setVisible(true);
//                             }
//                             if (module.ParentName === "Reports" || AppCache.userInfo.username === "admin") {
//                                 oReports.setVisible(true);
//                             }
//                             if (module.ParentName === "UserMaintenance" || AppCache.userInfo.username === "admin") {
//                                 oUserMaintenance.setVisible(true);
//                             }
//                             if (module.ParentName === "Utilities" || AppCache.userInfo.username === "admin") {
//                                 oUtilities.setVisible(true);
//                             }
//                         }
//                     });
//                 });
//             } else {
//                 console.error('No data found:', data.message);
//             }
//         })
//         .catch(error => {
//             console.error('Error in sending data:', error);
//         });
//     });
 
// }


if (sap.n) {
    sap.n.Shell.attachBeforeDisplay(function(startParams) {
        const userId = AppCache.userInfo.id; // Get the user ID from AppCache
        
        var apiUrl = '/api/serverscript/getuserrole/Send'; // Your API URL
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ UserId: userId }) // Send UserId in the request body
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data && data.data) {
                console.log('Processed data:', data.data);

                // Iterate over each user and their ParentModules
                data.data.forEach(user => {
                    user.ParentModules.forEach(module => {
                        if (module.isActive === 1) {
                            if (module.ParentName === "References" || AppCache.userInfo.username === "admin") {
                                oReferences.setVisible(true);
                            }
                            if (module.ParentName === "Transaction" || AppCache.userInfo.username === "admin") {
                                oTransaction.setVisible(true);
                            }
                            if (module.ParentName === "Reports" || AppCache.userInfo.username === "admin") {
                                oReports.setVisible(true);
                            }
                            if (module.ParentName === "UserMaintenance" || AppCache.userInfo.username === "admin") {
                                oUserMaintenance.setVisible(true);
                            }
                            if (module.ParentName === "Utilities" || AppCache.userInfo.username === "admin") {
                                oUtilities.setVisible(true);
                            }

                              if (module.ParentName === "Archive" || AppCache.userInfo.username === "admin") {
                                oArchive.setVisible(true);
                            }
                        }
                    });
                });
            } else {
                console.error('No data found:', data.message);
                console.log('No roles or permissions found for the specified user');
            }
        })
        .catch(error => {
            console.error('Error in sending data:', error);
            console.log('There was an error fetching the data.');
        });
    });
}
