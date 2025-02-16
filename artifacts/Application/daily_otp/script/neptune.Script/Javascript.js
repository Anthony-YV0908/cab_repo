var tableName = Table.getId() 


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


// function exportToPDF(tableName) {
//     try {
//         var oTable = sap.ui.getCore().byId("Table"); // Ensure this is the correct table ID
//         if (!oTable) {
//             throw new Error("Table not found. Please check the ID.");
//         }

//         var aColumns = oTable.getColumns();
//         var lastColumnIndex = aColumns.length - 1;

//         if (lastColumnIndex >= 0) {
//             var lastColumn = aColumns[lastColumnIndex];

//             // Temporarily hide the last column
//             lastColumn.setVisible(false);
//         }

//         // Perform the export
//         $(tableName).tableExport({
//             type: "pdf",
//             jspdf: {
//                 orientation: "p",
//                 margins: { left: 50, top: 10 },
//                 autotable: false,
//             },
//         });

//         sap.m.MessageToast.show("Export File generated.");

//         // Restore the column visibility after export
//         setTimeout(function () {
//             if (lastColumnIndex >= 0) {
//                 aColumns[lastColumnIndex].setVisible(true);
//             }
//         }, 500); // Small delay to ensure PDF generation completes

//     } catch (error) {
//         console.error(error);
//         sap.m.MessageToast.show("Error: " + error.message);
//     }
// }
function exportToExcel(tableName) {
    try {
        console.log(tableName) 
        var oTable = sap.ui.getCore().byId("Table"); // Ensure this is the correct table ID
        if (!oTable) {
            throw new Error("Table not found. Please check the ID.");
        }

        var aColumns = oTable.getColumns();
        var lastColumnIndex = aColumns.length - 1;
        var lastColumn = null;

        if (lastColumnIndex >= 0) {
            lastColumn = aColumns[lastColumnIndex];

            // Temporarily hide the last column
            lastColumn.setVisible(false);
        }

        // Export the table
        $(tableName).tableExport({ 
            type: "excel",
            mso: { fileFormat: "xlsx", worksheetName: ["Table 1", "Table 2", "Table 3"] },
        });

        // Restore the column visibility after exporting
        if (lastColumn) {
            setTimeout(() => {
                lastColumn.setVisible(true);
            }, 1000);
        }

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

// // JSON format
// function exportToJSON(tableName) {
//     try {
//         $(tableName).tableExport({ type: "json" });
//         sap.m.MessageToast.show("Export File generated.");
//     } catch (error) {
//         console.error(error);
//         sap.m.MessageToast.show("Add a Table Name (ID)");
//     }
// }







function deleteFlight(oEvent) 
{ 

    const context = oEvent.oSource.getBindingContext();

    
    const data = context.getObject();

      const normalizedUrl = `/api/entity/daily_otp?where={"id":"${data.id}"}`;

console.log('this is data ' , data)

    var isdeleted = data.isDeleted;
    
        var Jsondata = {
         isDeleted:1

        }


      console.log('json data', Jsondata)
    // // Perform the DELETE request
    fetch(normalizedUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(Jsondata)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(result => {
        console.log('Delete successful:', result);
        // Reload the window after successful delete
        // window.location.reload(); 
        // deleteFlight(oEvent)
    })
    .catch(error => {
        console.error('Error deleting the flight:', error);
    });



}

function DeleteFlight(oEvent) {
    const context = oEvent.oSource.getBindingContext();

    // Get the entire data object bound to this context
    const data = context.getObject();
    
    console.log('data:', data);
    var id = data.id
    var aoc = data.AOC
    var atd = data.ActualTimeDeparture
    var ata = data.ActualTimeofArrival
    var adultpax = data.AdultPax
    var airport = data.Airport
    var dateissued = data.DateIssued
    var etd = data.EstimatedTimeDeparture
    var eta = data.EstimatedTimeofArrival
    var flight = data.FlightDate
    var flightid = data.FlightId
    var flightnumber = data.FlightNumber 
    var infantpax = data.InfantPax
    var isotparrival = data.IsOTPArrival
    var otpdeparture = data.OTPDeparture
    var origin = data.Origin
    var remarks = data.Remarks
    var sta = data.STA
    var std = data.STD
    var totalpax = data.TotalPax
    var remarks = data.Remarks 
    var isdelayeddeparture = data.IsDelayedDeparture
    var isdelayedarrival = data.IsDelayedArrival
    var iscancelleddeparture = data.IsCancelledDeparture 
    var iscancelledarrival = data.IsCancellledArrival
    var id_daily = data.id 



    var isdeleted = data.isDeleted;


    // console.log('this is deleted' , isDeleted)

    // Construct the URL with the data.id parameter
    const normalizedUrl = `http://localhost:8080/api/entity/daily_otp_archive?where={"id":"${data.id}"}`;

    var Jsondata = {
         OTPid:id,
         AOC:aoc,
         ActualTimeDeparture:atd, 
         ActualTimeofArrival:ata,
         AdultPax:adultpax,
         Airport:airport, 
         DateIssued:dateissued,
         EstimatedTimeDeparture:etd , 
         EstimatedTimeofArrival:eta, 
         FlightDate:flight,
        FlightId:flightid, 
        FlightNumber:flightnumber,
        InfantPax:infantpax,
        IsOTPArrival:isotparrival,
        OTPDeparture:otpdeparture,
        Origin:origin, 
        Remarks:remarks,
        STA:sta, 
        STD:std, 
        TotalPax:totalpax,
        Remarks:remarks,
        IsDelayedDeparture:isdelayeddeparture,
        IsDelayedArrival:isdelayedarrival,
        IsCancelledDeparture:iscancelleddeparture,
        IsCancellledArrival:iscancelledarrival,
        isDeleted:1
    }

    console.log('json data', Jsondata)
    // // Perform the DELETE request
    fetch(normalizedUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(Jsondata)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(result => {
        console.log('Delete successful:', result);
        // Reload the window after successful delete
        window.location.reload(); 
        // deleteFlight(oEvent)
    })
    .catch(error => {
        console.error('Error deleting the flight:', error);
    });
}

let flightData = {}
function SelectOrigin(oEvent) {
    try {
        oEvent.preventDefault();

        const context = oEvent.oSource.getBindingContext();
        if (!context) {
            console.error("No binding context available.");
            return;
        }

        const data = context.getObject();
        if (!data || !data.Code) {
            console.error("Invalid data or missing 'Code' property.");
            return;
        }

        flightData.originCode = data.Code; // Update shared state
        console.log("Origin selected:", flightData.originCode);

        // Update UI
        inSimpleFormOrigin.setValue(flightData.originCode);

           setTimeout(() => {
         App.to(CreatePage);  // Navigate to the CreatePage
        }, 100); // Ensure CreatePage is ready before calling

      
    } catch (error) {
        console.error("Error in SelectOrigin:", error);
    }
}

function SelectAOC(oEvent) {
    try {
        oEvent.preventDefault();

        const context = oEvent.oSource.getBindingContext();
        if (!context) {
            console.error("No binding context available.");
            return;
        }

        const data = context.getObject();
        if (!data || !data.Code) {
            console.error("Invalid data or missing 'Code' property.");
            return;
        }

        flightData.aocCode = data.Code; // Update shared state
        console.log("AOC selected:", flightData.aocCode);

        // Update UI
        inSimpleFormAOC.setValue( flightData.aocCode);

          setTimeout(() => {
         App.to(CreatePage);  // Navigate to the CreatePage
        }, 100); // Ensure CreatePage is ready before calling
    } catch (error) {
        console.error("Error in SelectAOC:", error);
    }
}






let aiportGlobal = null
function SelectAirport(oEvent) {
    try {
        oEvent.preventDefault();
        // oEvent.stopPropagation();

        const context = oEvent.oSource.getBindingContext();
        if (!context) {
            console.error("No binding context available.");
            return;
        }

        const data = context.getObject();
        if (!data || !data.Code) {
            console.error("Invalid data or missing 'Code' property.");
            return;
        }

        App.to(CreatePage);  // Navigate to the CreatePage
        aiportGlobal = data;  // Store the data globally
        console.log("Selected Data:", aiportGlobal);
        inSimpleFormAirport.setValue(aiportGlobal.Code)


        setTimeout(() => {
           App.to(CreatePage);  // Navigate to the CreatePage
        }, 100); // Ensure CreatePage is ready before calling
    } catch (error) {
        console.error("Error in SelectAOC:", error);
    }
}





let destinationGlobal = null
function SelectDestination(oEvent) {
    try {
        oEvent.preventDefault();
        // oEvent.stopPropagation();

        const context = oEvent.oSource.getBindingContext();
        if (!context) {
            console.error("No binding context available.");
            return;
        }

        const data = context.getObject();
        if (!data || !data.Code) {
            console.error("Invalid data or missing 'Code' property.");
            return;
        }

       
        destinationGlobal = data;  // Store the data globally
        console.log("Selected Data:", destinationGlobal);
        inSimpleFormDestination.setValue(destinationGlobal.Code)


        setTimeout(() => {
          App.to(CreatePage);  // Navigate to the CreatePage
        }, 100); // Ensure CreatePage is ready before calling
    } catch (error) {
        console.error("Error in SelectAOC:", error);
    }
}



function formatDateForDatabase(dateString) {
    const date = new Date(dateString);
    if (isNaN(date)) {
        return null; // Handle invalid date
    }
    return date.toISOString().slice(0, 19).replace('T', ' '); // Format as YYYY-MM-DD HH:mm:ss
}

function getTimePart(formattedValue) {
    // Split the string by whitespace
    var parts = formattedValue.split(/\s+/);

    // Check if the last part exists and is in the correct position
    if (parts.length > 2) {
        return parts[parts.length - 1]; // Extract the last part (time)
    } else {
        return null; // Return null if the format is incorrect
    }
}

function timeToMinutes(timestamp) {
    const date = new Date(timestamp); // Create a Date object from the timestamp
    const hours = date.getHours(); // Get the hours from the Date object
    const minutes = date.getMinutes(); // Get the minutes from the Date object
    return hours * 60 + minutes; // Return the total minutes
}


function createTimestampWithCurrentDate(inputTime) {
    // Get the current date
    const currentDate = new Date();
    

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(currentDate.getDate()).padStart(2, '0');

  
    const formattedDate = `${year}-${month}-${day}`;
    
  
    const formattedTime = inputTime.split('Z')[0]; 
    
  
    return `${formattedDate}T${formattedTime}`;
}



async function CreateFlight() {

var dateissued = inSimpleFormDateIssued.getValue();
var flightdate = inSimpleFormFlightDate.getValue();



    var airport = inSimpleFormAirport.getValue();
    var aoc = inSimpleFormAOC.getValue();
    var flightid = inSimpleFormFlightId.getValue();
   
    var flightnumber = inSimpleFormFlightNumber.getValue() 
    var destination = inSimpleFormDestination.getValue();
    var origin = inSimpleFormOrigin.getValue();
    var std = inSimpleFormSTD.getValue();
    var sta = inSimpleFormSTA.getValue();
    var etdFormatted = EstimatedTimeDeparture.getValue();
    var atdFormatted = ActualTimeDeparture.getValue();
    var etaFormatted = EstimatedTimeofArrival.getValue();
    var ataFormatted = ActualTimeofArrival.getValue();

    console.log(etdFormatted)
    console.log(atdFormatted)
    console.log(etaFormatted)
    console.log(ataFormatted)
    var etd = createTimestampWithCurrentDate(etdFormatted);
    var atd = createTimestampWithCurrentDate(atdFormatted);
    var eta = createTimestampWithCurrentDate(etaFormatted);
    var ata = createTimestampWithCurrentDate(ataFormatted);


    // Validate time inputs
    const etdMinutes = timeToMinutes(etdFormatted);
    const atdMinutes = timeToMinutes(atdFormatted);
    const etaMinutes = timeToMinutes(etaFormatted);
    const ataMinutes = timeToMinutes(ataFormatted);

    // console.log(etd, eta ,ata) 


    var adult = inSimpleFormAdultPax.getValue();
    var infant = inSimpleFormInfantPax.getValue();
    var total = inSimpleFormTotalPax.getValue();
    var remarks = inSimpleFormRemarks.getValue();

 
        console.log('this is etd' , etd) 
   if (!dateissued) { 
    inSimpleFormDateIssued.setValueState("Error");
    return;
    // sap.m.MessageToast.show("No Date Issued data"); 
    // return; 
}

if (inSimpleFormAirport.getValue() === "") { 
  
    inSimpleFormAirport.setValueState("Error")
    return;

  
}

if(inSimpleFormFlightNumber.getValue() === "" ) 
{ 
    inSimpleFormFlightNumber.setValueState("Error") 
}
if (inSimpleFormAOC.getValue() === "") { 
    inSimpleFormAOC.setValueState("Error")
    return;
}
if (inSimpleFormFlightId.getValue() === "") { 
    inSimpleFormFlightId.setValueState("Error");
    return;
}


if (!flightdate) { 
    inSimpleFormFlightDate.setValueState("Error")
    return;
}
if (!origin) { 
    inSimpleFormOrigin.setValueState("Error")
    return;
}
if (!destination) { 
   inSimpleFormDestination.setValueState("Error")
   return;
}


if (origin.toUpperCase() === destination.toUpperCase()) {
    sap.m.MessageToast.show("Origin and destination airports are the same.");
    return;
}


    if (atdMinutes < etdMinutes) {
        sap.m.MessageToast.show("Actual Time Departure (ATD) cannot be earlier than Estimated Time Departure (ETD).");

        return;
    }

    if (ataMinutes < etaMinutes) {
        sap.m.MessageToast.show("Actual Time of Arrival (ATA) cannot be earlier than Estimated Time of Arrival (ETA).");
        return;
    }


    if(!adult)
    {
        inSimpleFormAdultPax.setValueState("Error")
        return
    }

    if(!infant) 
    { 
        inSimpleFormInfantPax.setValueState("Error")
        return

    }

    if(!total)
    {
        inSimpleFormTotalPax.setValueState("Error")
        return;
    }
    if(!remarks)
    {
        inSimpleFormRemarks.setValueState("Error")
        return
    }
    const differenceDeparture = atdMinutes - etdMinutes;
    const differenceArrival = ataMinutes - etaMinutes;

    const isotpdeparture = differenceDeparture >= 15 ? 0 : 1;
    const otpdeparture = differenceDeparture;
    const delayeddeparture = differenceDeparture >= 15 ? 1 : 0;
 
    const isotparrival = differenceArrival >= 15 ? 0 : 1;
    const otparrival = differenceArrival;
    const delayedarrival = differenceArrival >= 15 ? 1 : 0;

    setTimeout(async () => {
        try {
            const apiUrl = `http://localhost:8080/api/entity/airportcode?where={"Code":"${aoc}"}`;
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error("Failed to fetch service type data.");
            }

            const data = await response.json();
            if (data.length === 0) {
                throw new Error("No matching data found for the AOC code.");
            }

            const carrier = data[0].Service_Type;

            // Create payload
            const flightData = {
                DateIssued: dateissued,
                Airport: airport,
                FlightId: flightid,
                AOC: aoc,
                Carrier: carrier,
                FlightDate: flightdate,
                FlightNumber:flightnumber,
                Origin: origin,
                Destination: destination,
                STD: std,
                STA: sta,
                EstimatedTimeDeparture: etd,
                ActualTimeDeparture: atd,
                EstimatedTimeofArrival: eta,
                ActualTimeofArrival: ata,
                AdultPax: adult,
                InfantPax: infant,
                TotalPax: total,
                Remarks: remarks,
                IsOTPDeparture: isotpdeparture,
                OTPDeparture: otpdeparture,
                IsOTPArrival: isotparrival,
                OTPArrival: otparrival,
                IsDelayedDeparture:delayeddeparture,
                IsDelayedArrival:delayedarrival,
                IsCancelledDeparture:0,
                IsCancellledArrival:0
                
            };

           try {
        const checkUrl = `http://localhost:8080/api/entity/daily_otp?where={"FlightId":"${encodeURIComponent(flightid)}","FlightNumber":"${encodeURIComponent(flightnumber)}"}`;
            const checkResponse = await fetch(checkUrl, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!checkResponse.ok) {
                throw new Error(`Check request failed: ${checkResponse.statusText}`);
            }

            const existingData = await checkResponse.json();

            if (existingData && existingData.length > 1) {
                sap.m.MessageToast.show("A flight ID and number is already taken.");
                return; // Stop further execution
            }
        } catch (error) {
            console.error("Error checking existing data:", error.message);
            sap.m.MessageToast.show("An error occurred while checking existing data.");
            return; // Stop further execution
        }

            console.log("Flight Data prepared:", flightData);

            // Submit flight data
            const createResponse = await fetch("http://localhost:8080/api/entity/daily_otp", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(flightData),
            });

            if (!createResponse.ok) {
                const errData = await createResponse.json();
                throw new Error(`Request failed: ${errData.message || createResponse.statusText}`);
            }

            const result = await createResponse.json();
            sap.m.MessageToast.show("Flight created successfully.");
            setTimeout(() => {
                App.to(Page)
                // window.location.reload(); 
            }, 1000);
            console.log("Success:", result);
        } catch (error) {
            console.error("Error:", error);
            sap.m.MessageToast.show(`Error creating flight: ${error.message}`);
        }
    }, 2000);
}








let updateflightData = {}
function UpdateSelectOrigin(oEvent) {
    try {
        oEvent.preventDefault();

        const context = oEvent.oSource.getBindingContext();
        if (!context) {
            console.error("No binding context available.");
            return;
        }

        const data = context.getObject();
        if (!data || !data.Code) {
            console.error("Invalid data or missing 'Code' property.");
            return;
        }

        updateflightData.originCode = data.Code; // Update shared state
        console.log("Origin selected:", updateflightData.originCode);

        // Update UI
        inEditSimpleFormOrigin.setValue(updateflightData.originCode);
       
       setTimeout(() => {
           App.to(EditPage);  // Navigate to the CreatePage
        }, 100); // Ensure CreatePage is ready before calling
    } catch (error) {
        console.error("Error in SelectOrigin:", error);
    }
}

function UpdateSelectAOC(oEvent) {
    try {
        oEvent.preventDefault();

        const context = oEvent.oSource.getBindingContext();
        if (!context) {
            console.error("No binding context available.");
            return;
        }

        const data = context.getObject();
        if (!data || !data.Code) {
            console.error("Invalid data or missing 'Code' property.");
            return;
        }
        App.to(EditPage);  // Navigate to the CreatePage
        updateflightData.aocCode = data.Code; // Update shared state
        console.log("AOC selected:", updateflightData.aocCode);

        // Update UI
        inEditSimpleFormAOC.setValue(updateflightData.aocCode);

          setTimeout(() => {
         App.to(EditPage);  // Navigate to the CreatePage
        }, 100); // Ensure CreatePage is ready before calling
    } catch (error) {
        console.error("Error in SelectAOC:", error);
    }
}






let updateaiportGlobal = null
function UpdateSelectAirport(oEvent) {
    try {
        oEvent.preventDefault();
        // oEvent.stopPropagation();

        const context = oEvent.oSource.getBindingContext();
        if (!context) {
            console.error("No binding context available.");
            return;
        }

        const data = context.getObject();
        if (!data || !data.Code) {
            console.error("Invalid data or missing 'Code' property.");
            return;
        }


        updateaiportGlobal = data;  // Store the data globally
        console.log("Selected Data:", updateaiportGlobal);
       inEditSimpleFormAirport.setValue(updateaiportGlobal.Code)


        setTimeout(() => {
           App.to(EditPage);  // Navigate to the CreatePage
        }, 100); // Ensure CreatePage is ready before calling
    } catch (error) {
        console.error("Error in SelectAOC:", error);
    }
}





let updatedestinationGlobal = null
function UpdateSelectDestination(oEvent) {
    try {
        oEvent.preventDefault();
        // oEvent.stopPropagation();

        const context = oEvent.oSource.getBindingContext();
        if (!context) {
            console.error("No binding context available.");
            return;
        }

        const data = context.getObject();
        if (!data || !data.Code) {
            console.error("Invalid data or missing 'Code' property.");
            return;
        }

       
        updatedestinationGlobal = data;  // Store the data globally
        console.log("Selected Data:", updatedestinationGlobal);
       inEditSimpleFormDestination.setValue(updatedestinationGlobal.Code)

    setTimeout(() => {
           App.to(EditPage);  // Navigate to the CreatePage
        }, 100); // Ensure CreatePage is ready before calling
    } catch (error) {
        console.error("Error in SelectAOC:", error);
    }
}




function formatToPST(dateString) {
    // Parse the input date string into a Date object (it will be in UTC)
    const date = new Date(dateString);

    // Convert to Philippine Standard Time (GMT +8) and format it to show time only
    const options = {
        timeZone: 'Asia/Manila',  // Set to Philippine Standard Time
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,  // 24-hour format
    };

    // Create a formatter to convert it to the desired format
    const formatter = new Intl.DateTimeFormat('en-US', options);

    // Format and return the time
    return formatter.format(date);
}

// Utility function to format a date
function formatDate(dateString) {
    // Parse the input date string into a Date object
    const date = new Date(dateString);

    // Format the date to 'MMM dd, yyyy'
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
}

function formatFligtdate(dateString) 
{ 
    const date = new Date(dateString);

    return date.toLocaleDateString('en-Us' , { 
        month:'short', 
        day:'numeric',
        year:'numeric '
    })
}

// Example usage in UpdateDateIssue function
// function UpdateDateIssue(rawDateIssued) {
//     const formattedDateIssued = formatDate(rawDateIssued); // Use the utility function
//     inEditSimpleFormDateIssued.setValue(formattedDateIssued); // Update the form field
// }


function UpdateFlightDate(rawFlightDate) 
{ 
    const formattedFlightDate = formatDate(rawFlightDate)
    inEditSimpleFormFlightDate.setValue

}




function UpdateDateIssue(data) { 
    if (!data || !data.DateIssued) {
        console.error("DateIssued is missing or invalid:", data);
        return;
    }

    console.log("Raw DateIssued:", data.DateIssued);

    // Parse the date safely
    const dateissue = new Date(data.DateIssued);
    const flightdate = new Date(data.FlightDate);

    if (isNaN(dateissue.getTime()) || isNaN(flightdate.getTime())) {
        console.error("Invalid date format received:", data.DateIssued, data.FlightDate);
        return;
    }

    // Format the date to YYYY-MM-DD
    const formattedDate = dateissue.toISOString().split('T')[0];
    const formattedFlightDate = flightdate.toISOString().split('T')[0];

    console.log('Formatted Date:', formattedDate);
    console.log('Formatted Flight Date:', formattedFlightDate);

    // // Set the formatted date in the field
    inEditSimpleFormDateIssued.setValue(formattedDate);
    inEditSimpleFormFlightDate.setValue(formattedFlightDate); 
}


function UpdateTime(oEvent) {   
    const context = oEvent.oSource.getBindingContext();
    const data = context.getObject();

    // Helper function to safely parse and format date to HH:mm
    const parseDate = (dateString) => {
        if (!dateString || isNaN(new Date(dateString).getTime())) {
            return ""; // Return empty string if invalid
        }
        const date = new Date(dateString);
        const hours = date.getHours().toString().padStart(2, '0'); // Ensure 2 digits
        const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure 2 digits
        return `${hours}:${minutes}`;
    };

    // Parse times safely and format them as HH:mm
    const etdtime = parseDate(data.EstimatedTimeDeparture);
    const atdtime = parseDate(data.ActualTimeDeparture);
    const etatime = parseDate(data.EstimatedTimeofArrival);
    const atatime = parseDate(data.ActualTimeofArrival);

    console.log(etdtime);
    console.log(atdtime);
    console.log(etatime);
    console.log(atatime);

    // Update form fields with formatted times
    EditEstimatedTimeDeparture.setValue(etdtime);
    EditActualTimeofDeparture.setValue(atdtime);
    EditEstimatedTimeofArrival.setValue(etatime);
    EditActualTimeofArrival.setValue(atatime);
}


async function UpdateFlight(oEvent) {
    let update_data = {};

//  UpdateDateIssue(modelEditSimpleForm.getData()); 

var dateissued = inEditSimpleFormDateIssued.getValue();
var flightdate = inEditSimpleFormFlightDate.getValue();

// Convert string to Date object
const dateObjectIssued = new Date(dateissued);
const dateObjectFlight = new Date(flightdate);

// Ensure it's a valid date before formatting
if (isNaN(dateObjectIssued.getTime()) || isNaN(dateObjectFlight.getTime())) {
    console.error("Invalid date format:", dateissued, flightdate);
} else {
    const formatDate = (dateObj) => {
    const yyyy = dateObj.getFullYear();
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const dd = String(dateObj.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`; // Removed time part
};

    // Assign formatted values
    update_data.DateIssued = formatDate(dateObjectIssued);
    update_data.FlightDate = formatDate(dateObjectFlight);

    console.log("Updated Flight Data:", update_data);
}


    

    update_data.id = modelEditSimpleForm.getData().id;
   
    var id = update_data.id
    console.log(id)
     


console.log(update_data.Airport)
    var airport = update_data.Airport = inEditSimpleFormAirport.getValue();
    var flightid = update_data.FlightId = inEditSimpleFormFlightId.getValue();
    var flightnumber = update_data.FlightNumber = inEditSimpleFormFlightNumber.getValue();
    var aoc = update_data.AOC = inEditSimpleFormAOC.getValue();
    // var flightdate = update_data.FlightDate =inEditSimpleFormFlightDate.getValue() 
    // var dateissued = update_data.DateIssued = inEditSimpleFormDateIssued.getValue() 
    var origin = update_data.Origin = inEditSimpleFormOrigin.getValue();


    var destination = update_data.Destination = inEditSimpleFormDestination.getValue();
    var std = update_data.STD = inEditSimpleFormSTD.getValue();
    var etdFormatted = update_data.EstimatedTimeDeparture = EditEstimatedTimeDeparture.getValue();
    var atdFormatted = update_data.ActualTimeDeparture = EditActualTimeofDeparture.getValue();
    var sta = update_data.STA = inEditSimpleFormSTA.getValue();
    var etaFormatted = update_data.EstimatedTimeofArrival =  EditEstimatedTimeofArrival.getValue();
    var ataFormatted = update_data.ActualTimeofArrival =  EditActualTimeofArrival.getValue();
    var formattedetd  = update_data.EstimatedTimeDeparture = createTimestampWithCurrentDate(etdFormatted)
    var formattedatd = update_data.ActualTimeDeparture = createTimestampWithCurrentDate(atdFormatted) 
    var formattedeta = update_data.EstimatedTimeofArrival = createTimestampWithCurrentDate(etaFormatted) 
    var formattedata = update_data.ActualTimeofArrival = createTimestampWithCurrentDate(ataFormatted) 
    var adultpax = update_data.AdultPax = inEditSimpleFormAdultPax.getValue();
    var infantpax = update_data.InfantPax = inEditSimpleFormInfantPax.getValue();
    var totalpax = update_data.TotalPax = inEditSimpleFormTotalPax.getValue();
    var remarks = update_data.Remarks = inEditSimpleFormRemarks.getValue();

    update_data.IsDelayedDeparture = inEditSimpleFormisDelayedDeparture.getValue() 
    update_data.IsDelayedArrival = inEditSimpleFormIsDelayedArrival.getValue();
    update_data.IsOTPDeparture = inEditSimpleFormIsOTPDeparture.getValue();
    update_data.OTPDeparture = inEditSimpleFormOTPDeparture.getValue();
    update_data.IsOTPArrival = inEditSimpleFormIsOTPArrival.getValue();
    update_data.OTPArrival = inEditSimpleFormOTPArrival.getValue();
    update_data.IsCancelledDeparture = 0 
    update_data.IsCancelledArrival = 0 
    // var etd = getTimePart(formattedetd);
    // var atd = getTimePart(formattedatd);
    // var eta = getTimePart(formattedeta);
    // var ata = getTimePart(formattedata);

    const etdMinutes = timeToMinutes(formattedetd);
    const atdMinutes = timeToMinutes(formattedatd);
    const etaMinutes = timeToMinutes(formattedeta);
    const ataMinutes = timeToMinutes(formattedata);

    console.log(etdMinutes)
    console.log(atdMinutes)
    console.log(etaMinutes)
    console.log(ataMinutes)

    // Track original flightid and flightnumber for comparison
    const originalFlightId =  modelEditSimpleForm.getData().FlightId
    const originalFlightNumber = modelEditSimpleForm.getData().FlightNumber

    console.log(originalFlightId)
    console.log(originalFlightNumber) 

   
    if (!dateissued) {
        inEditSimpleFormDateIssued.setValueState("Error");
        return;
    }

    if (!airport) {
        inEditSimpleFormAirport.setValueState("Error");
        return;
    }

    if (!flightid) {
        inEditSimpleFormFlightId.setValueState("Error");
        return;
    }

    if (!aoc) {
        inEditSimpleFormAOC.setValueState("Error");
        return;
    }

    if (!flightdate) {
        inEditSimpleFormFlightDate.setValueState("Error");
        return;
    }

    if (!origin) {
        inEditSimpleFormOrigin.setValueState("Error");
        return;
    }

    if (!destination) {
        inEditSimpleFormDestination.setValueState("Error");
        return;
    }


    if (origin.toUpperCase() === destination.toUpperCase()) {
    sap.m.MessageToast.show("Origin and destination airports are the same.");
    }

    if (!adultpax) {
        inEditSimpleFormAdultPax.setValueState("Error");
        return;
    }

    if (!infantpax) {
        inEditSimpleFormInfantPax.setValueState("Error");
        return;
    }

    if (!totalpax) {
        inEditSimpleFormTotalPax.setValueState("Error");
        return;
    }

    // Validate ATD against ETD
    if (atdMinutes < etdMinutes) {
        sap.m.MessageToast.show("Actual Time Departure (ATD) cannot be earlier than Estimated Time Departure (ETD).");
        return; 
    }

    // Validate ATA against ETA
    if (ataMinutes < etaMinutes) {
        sap.m.MessageToast.show("Actual Time of Arrival (ATA) cannot be earlier than Estimated Time of Arrival (ETA).");
        return; // Stop execution if invalid time
    }

  
    // Process OTP and delays
    const differenceDeparture = atdMinutes - etdMinutes;
    const differenceArrival = ataMinutes - etaMinutes;

    if (differenceDeparture >= 15) {
        console.log("The departure is late.");
        update_data.IsOTPDeparture = 0;
        update_data.OTPDeparture = differenceDeparture;
        update_data.IsDelayedDeparture = 1;
    } else {
        console.log("The departure is on time.");
        update_data.IsOTPDeparture = 1;
        update_data.OTPDeparture = differenceDeparture;
        update_data.IsDelayedDeparture = 0;
    }

    if (differenceArrival >= 15) {
        console.log("The arrival is late.");
        update_data.IsOTPArrival = 0;
        update_data.OTPArrival = differenceArrival;
        update_data.IsDelayedArrival = 1;
    } else {
        console.log("The arrival is on time.");
        update_data.IsOTPArrival = 1;
        update_data.OTPArrival = differenceArrival;
        update_data.IsDelayedArrival = 0;


    }
// Convert to strings for consistent comparison
const currentFlightId = String(flightid).trim();
const currentFlightNumber = String(flightnumber).trim();
const originalId = String(originalFlightId).trim();
const originalNumber = String(originalFlightNumber).trim();

// Check for duplicate flight id and number only if both have changed
if (currentFlightId !== originalId || currentFlightNumber !== originalNumber) {
    try {
        const checkUrl = `http://localhost:8080/api/serverscript/cabserverside/dailyotpvalidation`;

        // Using a promise to wait for the AJAX call to complete
        const checkDuplicate = new Promise((resolve, reject) => {
            $.ajax({
                url: checkUrl,
                method: 'POST',
                data: { flightid: currentFlightId, flightnumber: currentFlightNumber },
                success: function (response) {
                    console.log('API response:', response);
                    if (response > 0) {
                        sap.m.MessageToast.show('There is the same data in flight number and flight id');
                        reject('Duplicate found');
                    } else {
                        resolve(); // Resolve if no duplicates
                    }
                },
                error: function (xhr, status, error) {
                    console.error('API call failed:', error);
                    reject('API call failed');
                }
            });
        });

        // Wait for the duplicate check to complete before proceeding
        await checkDuplicate;
    } catch (error) {
        console.error("Error checking existing data:", error);
        sap.m.MessageToast.show("An error occurred while checking existing data.");
        return; // Stop execution if an error occurs
    }
}

const options = { 
    data: update_data, 
};

try {
    const createResponse = await fetch(`http://localhost:8080/api/entity/daily_otp?where={"id":"${id}"}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(options.data)
    });

    const statusCode = createResponse.status;
    const responseData = await createResponse.json(); // Convert response to JSON

    // Pass response data and status to showToast
    showToast({
        status: statusCode,
        details: responseData.details || 'Update was successful',
        error: responseData.error || 'An error occurred',
        message: responseData.message || 'Unexpected response',
    });

    if (statusCode !== 200) {
        throw new Error(`Error! Status: ${statusCode}`);
    }

    console.log('Successfully Updated', responseData);

} catch (error) {
    console.error('Error in Updating Flight', error);

    // Show error toast if the fetch fails
    showToast({
        status: 500,
        error: error.message,
    });
}




}





var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:/cockpit.html/settings-system', true);
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var response = JSON.parse(xhr.responseText);
    // Process the response from the system settings port
    console.log('this', response);
  }
};
xhr.send();




