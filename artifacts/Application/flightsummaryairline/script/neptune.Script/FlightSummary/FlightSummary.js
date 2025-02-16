var tableName = Table1.getId() 

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



