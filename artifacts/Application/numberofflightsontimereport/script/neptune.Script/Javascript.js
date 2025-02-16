
var tableName = Table15.getId() 
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







// function timeToMinutes(time) {
//     const [hours, minutes] = time.split(":").map(Number);
//     return hours * 60 + minutes;
// }


// function deleteFlight(oEvent) 
// { 

//     const context = oEvent.oSource.getBindingContext();

    
//     const data = context.getObject();

//       const normalizedUrl = `http://localhost:8080/api/entity/daily_otp?where={"id":"${data.id}"}`;

// console.log('this is data ' , data)

//     var isdeleted = data.isDeleted;
    
//         var Jsondata = {
//          isDeleted:1

//         }


//       console.log('json data', Jsondata)
//     // // Perform the DELETE request
//     fetch(normalizedUrl, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body:JSON.stringify(Jsondata)
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`Error! Status: ${response.status}`);
//         }
//         return response.json();
//     })
//     .then(result => {
//         console.log('Delete successful:', result);
//         // Reload the window after successful delete
//         // window.location.reload(); 
//         // deleteFlight(oEvent)
//     })
//     .catch(error => {
//         console.error('Error deleting the flight:', error);
//     });



// }

// function DeleteFlight(oEvent) {
//     const context = oEvent.oSource.getBindingContext();

//     // Get the entire data object bound to this context
//     const data = context.getObject();
    
//     console.log('data:', data);
//     var id = data.id
//     var aoc = data.AOC
//     var atd = data.ActualTimeDeparture
//     var ata = data.ActualTimeofArrival
//     var adultpax = data.AdultPax
//     var airport = data.Airport
//     var dateissued = data.DateIssued
//     var etd = data.EstimatedTimeDeparture
//     var eta = data.EstimatedTimeofArrival
//     var flight = data.FlightDate
//     var flightid = data.FlightId
//     var flightnumber = data.FlightNumber 
//     var infantpax = data.InfantPax
//     var isotparrival = data.IsOTPArrival
//     var otpdeparture = data.OTPDeparture
//     var origin = data.Origin
//     var remarks = data.Remarks
//     var sta = data.STA
//     var std = data.STD
//     var totalpax = data.TotalPax
//     var id_daily = data.id 



//     var isdeleted = data.isDeleted;


//     // console.log('this is deleted' , isDeleted)

//     // Construct the URL with the data.id parameter
//     const normalizedUrl = `http://localhost:8080/api/entity/daily_otp_archive?where={"id":"${data.id}"}`;

//     var Jsondata = {
//          OTPid:id,
//          AOC:aoc,
//          ActualTimeDeparture:atd, 
//          ActualTimeofArrival:ata,
//          AdultPax:adultpax,
//          Airport:airport, 
//          DateIssued:dateissued,
//          EstimatedTimeDeparture:etd , 
//          EstimatedTimeofArrival:eta, 
//          FlightDate:flight,
//         FlightId:flightid, 
//         FlightNumber:flightnumber,
//         InfantPax:infantpax,
//         IsOTPArrival:isotparrival,
//         OTPDeparture:otpdeparture,
//         Origin:origin, 
//         Remarks:remarks,
//         STA:sta, 
//         STD:std, 
//         TotalPax:totalpax,
//         isDeleted:1
//     }

//     console.log('json data', Jsondata)
//     // // Perform the DELETE request
//     fetch(normalizedUrl, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body:JSON.stringify(Jsondata)
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`Error! Status: ${response.status}`);
//         }
//         return response.json();
//     })
//     .then(result => {
//         console.log('Delete successful:', result);
//         // Reload the window after successful delete
//         window.location.reload(); 
//         // deleteFlight(oEvent)
//     })
//     .catch(error => {
//         console.error('Error deleting the flight:', error);
//     });
// }

// let flightData = {}
// function SelectOrigin(oEvent) {
//     try {
//         oEvent.preventDefault();

//         const context = oEvent.oSource.getBindingContext();
//         if (!context) {
//             console.error("No binding context available.");
//             return;
//         }

//         const data = context.getObject();
//         if (!data || !data.Code) {
//             console.error("Invalid data or missing 'Code' property.");
//             return;
//         }

//         flightData.originCode = data.Code; // Update shared state
//         console.log("Origin selected:", flightData.originCode);

//         // Update UI
//         inSimpleFormOrigin.setValue(flightData.originCode);

//            setTimeout(() => {
//          App.to(CreatePage);  // Navigate to the CreatePage
//         }, 100); // Ensure CreatePage is ready before calling

      
//     } catch (error) {
//         console.error("Error in SelectOrigin:", error);
//     }
// }

// function SelectAOC(oEvent) {
//     try {
//         oEvent.preventDefault();

//         const context = oEvent.oSource.getBindingContext();
//         if (!context) {
//             console.error("No binding context available.");
//             return;
//         }

//         const data = context.getObject();
//         if (!data || !data.Code) {
//             console.error("Invalid data or missing 'Code' property.");
//             return;
//         }

//         flightData.aocCode = data.Code; // Update shared state
//         console.log("AOC selected:", flightData.aocCode);

//         // Update UI
//         inSimpleFormAOC.setValue( flightData.aocCode);

//           setTimeout(() => {
//          App.to(CreatePage);  // Navigate to the CreatePage
//         }, 100); // Ensure CreatePage is ready before calling
//     } catch (error) {
//         console.error("Error in SelectAOC:", error);
//     }
// }






// let aiportGlobal = null
// function SelectAirport(oEvent) {
//     try {
//         oEvent.preventDefault();
//         // oEvent.stopPropagation();

//         const context = oEvent.oSource.getBindingContext();
//         if (!context) {
//             console.error("No binding context available.");
//             return;
//         }

//         const data = context.getObject();
//         if (!data || !data.Code) {
//             console.error("Invalid data or missing 'Code' property.");
//             return;
//         }

//         App.to(CreatePage);  // Navigate to the CreatePage
//         aiportGlobal = data;  // Store the data globally
//         console.log("Selected Data:", aiportGlobal);
//         inSimpleFormAirport.setValue(aiportGlobal.Code)


//         setTimeout(() => {
//            App.to(CreatePage);  // Navigate to the CreatePage
//         }, 100); // Ensure CreatePage is ready before calling
//     } catch (error) {
//         console.error("Error in SelectAOC:", error);
//     }
// }





// let destinationGlobal = null
// function SelectDestination(oEvent) {
//     try {
//         oEvent.preventDefault();
//         // oEvent.stopPropagation();

//         const context = oEvent.oSource.getBindingContext();
//         if (!context) {
//             console.error("No binding context available.");
//             return;
//         }

//         const data = context.getObject();
//         if (!data || !data.Code) {
//             console.error("Invalid data or missing 'Code' property.");
//             return;
//         }

       
//         destinationGlobal = data;  // Store the data globally
//         console.log("Selected Data:", destinationGlobal);
//         inSimpleFormDestination.setValue(destinationGlobal.Code)


//         setTimeout(() => {
//           App.to(CreatePage);  // Navigate to the CreatePage
//         }, 100); // Ensure CreatePage is ready before calling
//     } catch (error) {
//         console.error("Error in SelectAOC:", error);
//     }
// }





// async function CreateFlight() {

  
//     // Retrieve form values
//     var dateissued = inSimpleFormDateIssued.getValue();
//     var airport = inSimpleFormAirport.getValue();
//     var aoc = inSimpleFormAOC.getValue();
//     var flightid = inSimpleFormFlightId.getValue();
//     var flightdate = inSimpleFormFlightDate.getValue();
//     var destination = inSimpleFormDestination.getValue();
//     var origin = inSimpleFormOrigin.getValue();
//     var std = inSimpleFormSTD.getValue();
//     var sta = inSimpleFormSTA.getValue();
//     var etd = inSimpleFormEstimatedTimeDeparture.getValue().trim();
//     var atd = inSimpleFormActualTimeDeparture.getValue().trim();
//     var eta = inSimpleFormEstimatedTimeofArrival.getValue().trim();
//     var ata = inSimpleFormActualTimeofArrival.getValue().trim();
//     var adult = inSimpleFormAdultPax.getValue();
//     var infant = inSimpleFormInfantPax.getValue();
//     var total = inSimpleFormTotalPax.getValue();
//     var remarks = inSimpleFormRemarks.getValue();

//    if (!dateissued) { 
//     inSimpleFormDateIssued.setValueState("Error");
//     return;
//     // sap.m.MessageToast.show("No Date Issued data"); 
//     // return; 
// }

// if (inSimpleFormAirport.getValue() === "") { 
  
//     inSimpleFormAirport.setValueState("Error")
//     return;

  
// }
// if (inSimpleFormAOC.getValue() === "") { 
//     inSimpleFormAOC.setValueState("Error")
//     return;
// }
// if (inSimpleFormFlightId.getValue() === "") { 
//     inSimpleFormFlightId.setValueState("Error");
//     return;
// }


// if (!flightdate) { 
//     inSimpleFormFlightDate.setValueState("Error")
//     return;
// }
// if (!origin) { 
//     inSimpleFormOrigin.setValueState("Error")
//     return;
// }
// if (!destination) { 
//    inSimpleFormDestination.setValueState("Error")
//    return;
// }
// // if (!std) { 
// //    inSimpleFormSTD.setValueState("Error")
// // }
// // if (!sta) { 
// //     inSimpleFormSTA.setValue
// // }
//     // Validate time inputs
//     const etdMinutes = timeToMinutes(etd);
//     const atdMinutes = timeToMinutes(atd);
//     const etaMinutes = timeToMinutes(eta);
//     const ataMinutes = timeToMinutes(ata);

//     if (atdMinutes < etdMinutes) {
//         sap.m.MessageToast.show("Actual Time Departure (ATD) cannot be earlier than Estimated Time Departure (ETD).");

//         return;
//     }

//     if (ataMinutes < etaMinutes) {
//         sap.m.MessageToast.show("Actual Time of Arrival (ATA) cannot be earlier than Estimated Time of Arrival (ETA).");
//         return;
//     }


//     if(!adult)
//     {
//         inSimpleFormAdultPax.setValueState("Error")
//         return
//     }

//     if(!infant) 
//     { 
//         inSimpleFormInfantPax.setValueState("Error")
//         return

//     }

//     if(!totalpax)
//     {
//         inSimpleFormTotalPax.setValueState("Error")
//         return;
//     }
//     if(!remarks)
//     {
//         inSimpleFormRemarks.setValueState("Error")
//         return
//     }
//     const differenceDeparture = atdMinutes - etdMinutes;
//     const differenceArrival = ataMinutes - etaMinutes;

//     const isotpdeparture = differenceDeparture > 15 ? 1 : 0;
//     const otpdeparture = differenceDeparture;
//     const delayeddeparture = differenceDeparture;

//     const isotparrival = differenceArrival > 15 ? 1 : 0;
//     const otparrival = differenceArrival;
//     const delayedarrival = differenceArrival;

//     setTimeout(async () => {
//         try {
//             const apiUrl = `http://localhost:8080/api/entity/airportcode?where={"Code":"${aoc}"}`;
//             const response = await fetch(apiUrl);

//             if (!response.ok) {
//                 throw new Error("Failed to fetch service type data.");
//             }

//             const data = await response.json();
//             if (data.length === 0) {
//                 throw new Error("No matching data found for the AOC code.");
//             }

//             const carrier = data[0].Service_Type;

//             // Create payload
//             const flightData = {
//                 DateIssued: dateissued,
//                 Airport: airport,
//                 FlightId: flightid,
//                 AOC: aoc,
//                 Carrier: carrier,
//                 FlightDate: flightdate,
//                 Origin: origin,
//                 Destination: destination,
//                 STD: std,
//                 STA: sta,
//                 EstimatedTimeDeparture: etd,
//                 ActualTimeDeparture: atd,
//                 EstimatedTimeofArrival: eta,
//                 ActualTimeofArrival: ata,
//                 AdultPax: adult,
//                 InfantPax: infant,
//                 TotalPax: total,
//                 Remarks: remarks,
//                 IsOTPDeparture: isotpdeparture,
//                 OTPDeparture: otpdeparture,
//                 IsOTPArrival: isotparrival,
//                 OTPArrival: otparrival,
//             };

//             console.log("Flight Data prepared:", flightData);

//             // Submit flight data
//             const createResponse = await fetch("http://localhost:8080/api/entity/daily_otp", {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(flightData),
//             });

//             if (!createResponse.ok) {
//                 const errData = await createResponse.json();
//                 throw new Error(`Request failed: ${errData.message || createResponse.statusText}`);
//             }

//             const result = await createResponse.json();
//             sap.m.MessageToast.show("Flight created successfully.");
//             setTimeout(() => {
//                 App.to(Page)
//             }, 1000);
//             console.log("Success:", result);
//         } catch (error) {
//             console.error("Error:", error);
//             sap.m.MessageToast.show(`Error creating flight: ${error.message}`);
//         }
//     }, 2000);
// }








// let updateflightData = {}
// function UpdateSelectOrigin(oEvent) {
//     try {
//         oEvent.preventDefault();

//         const context = oEvent.oSource.getBindingContext();
//         if (!context) {
//             console.error("No binding context available.");
//             return;
//         }

//         const data = context.getObject();
//         if (!data || !data.Code) {
//             console.error("Invalid data or missing 'Code' property.");
//             return;
//         }

//         updateflightData.originCode = data.Code; // Update shared state
//         console.log("Origin selected:", updateflightData.originCode);

//         // Update UI
//         inEditSimpleFormOrigin.setValue(updateflightData.originCode);
       
//        setTimeout(() => {
//            App.to(EditPage);  // Navigate to the CreatePage
//         }, 100); // Ensure CreatePage is ready before calling
//     } catch (error) {
//         console.error("Error in SelectOrigin:", error);
//     }
// }

// function UpdateSelectAOC(oEvent) {
//     try {
//         oEvent.preventDefault();

//         const context = oEvent.oSource.getBindingContext();
//         if (!context) {
//             console.error("No binding context available.");
//             return;
//         }

//         const data = context.getObject();
//         if (!data || !data.Code) {
//             console.error("Invalid data or missing 'Code' property.");
//             return;
//         }
//         App.to(EditPage);  // Navigate to the CreatePage
//         updateflightData.aocCode = data.Code; // Update shared state
//         console.log("AOC selected:", updateflightData.aocCode);

//         // Update UI
//         inEditSimpleFormAOC.setValue(updateflightData.aocCode);

//           setTimeout(() => {
//          App.to(EditPage);  // Navigate to the CreatePage
//         }, 100); // Ensure CreatePage is ready before calling
//     } catch (error) {
//         console.error("Error in SelectAOC:", error);
//     }
// }






// let updateaiportGlobal = null
// function UpdateSelectAirport(oEvent) {
//     try {
//         oEvent.preventDefault();
//         // oEvent.stopPropagation();

//         const context = oEvent.oSource.getBindingContext();
//         if (!context) {
//             console.error("No binding context available.");
//             return;
//         }

//         const data = context.getObject();
//         if (!data || !data.Code) {
//             console.error("Invalid data or missing 'Code' property.");
//             return;
//         }


//         updateaiportGlobal = data;  // Store the data globally
//         console.log("Selected Data:", updateaiportGlobal);
//        inEditSimpleFormAirport.setValue(updateaiportGlobal.Code)


//         setTimeout(() => {
//            App.to(EditPage);  // Navigate to the CreatePage
//         }, 100); // Ensure CreatePage is ready before calling
//     } catch (error) {
//         console.error("Error in SelectAOC:", error);
//     }
// }





// let updatedestinationGlobal = null
// function UpdateSelectDestination(oEvent) {
//     try {
//         oEvent.preventDefault();
//         // oEvent.stopPropagation();

//         const context = oEvent.oSource.getBindingContext();
//         if (!context) {
//             console.error("No binding context available.");
//             return;
//         }

//         const data = context.getObject();
//         if (!data || !data.Code) {
//             console.error("Invalid data or missing 'Code' property.");
//             return;
//         }

       
//         updatedestinationGlobal = data;  // Store the data globally
//         console.log("Selected Data:", updatedestinationGlobal);
//        inEditSimpleFormDestination.setValue(updatedestinationGlobal.Code)

//     setTimeout(() => {
//            App.to(EditPage);  // Navigate to the CreatePage
//         }, 100); // Ensure CreatePage is ready before calling
//     } catch (error) {
//         console.error("Error in SelectAOC:", error);
//     }
// }

// function UpdateFlight() {

  
//     let update_data = {}

//     update_data.id = modelEditSimpleForm.getData().id


  
//     var dateissued = update_data.DateIssued = inEditSimpleFormDateIssued.getValue()
//     var airport = update_data.Airport = inEditSimpleFormAirport.getValue()
//     var flightid = update_data.FlightId = inEditSimpleFormFlightId.getValue()
//     var aoc = update_data.AOC = inEditSimpleFormAOC.getValue()
//     // var carrier = update_data.carrier = 
//     var flightdate = update_data.FlightDate = inEditSimpleFormFlightDate.getValue()
//     var origin = update_data.Origin = inEditSimpleFormOrigin.getValue()
//     var destination = update_data.Destination = inEditSimpleFormDestination.getValue()
//     var std = update_data.STD = inEditSimpleFormSTD.getValue()
//     var etd = update_data.EstimatedTimeDeparture = inEditSimpleFormEstimatedTimeDeparture.getValue()
//     var atd = update_data.ActualTimeDeparture = inEditSimpleFormActualTimeDeparture.getValue()
//     var sta = update_data.STA = inEditSimpleFormSTA.getValue()
//     var eta = update_data.EstimatedTimeofArrival = inEditSimpleFormEstimatedTimeofArrival.getValue()
//     var ata = update_data.ActualTimeofArrival = inEditSimpleFormActualTimeofArrival.getValue()
//     var adultpax = update_data.AdultPax = inEditSimpleFormAdultPax.getValue()
//     var infantpax = update_data.InfantPax = inEditSimpleFormInfantPax.getValue()
//     var totalpax = update_data.TotalPax = inEditSimpleFormTotalPax.getValue()
//     var remarks = update_data.Remarks = inEditSimpleFormRemarks.getValue()
//     // update_data.DelayedArrival = inEditSimpleFormIsDelayedArrival.getValue() 
//     // update_data.CancelledDeparture = inEditSimpleFormIsCancelledDeparture.getValue()
//   update_data.IsOTPDeparture = inEditSimpleFormIsOTPDeparture.getValue()
//    update_data.OTPDeparture = inEditSimpleFormOTPDeparture.getValue()
//     update_data.IsOTPArrival = inEditSimpleFormIsOTPArrival.getValue()
//      update_data.OTPArrival = inEditSimpleFormOTPArrival.getValue()
//     // update_data.RecorcedInFlightCancel = inEditSimpleFormRecordedInFlightCancel.getValue()
//     // update_data.RecordedInFlightDelay = inEditSimpleFormRecordedInFlightDelay.getValue()
    


//     const etdMinutes = timeToMinutes(etd);
//     const atdMinutes = timeToMinutes(atd);

//     const etaMinutes = timeToMinutes(eta);
//     const ataMinutes = timeToMinutes(ata);

// if(!dateissued)
// {
//     inEditSimpleFormDateIssued.setValueState("Error")
//     return;
// }

// if(!airport)
// {
//     inEditSimpleFormAirport.setValueState("Error")
//     return
// }


// if(!flightid){
//     inEditSimpleFormFlightId.setValueState("Error")
//     return;

// }

// if(!aoc)
// {
//     inEditSimpleFormAOC.setValueState("Error")
//     return;
// }

// if(!flightdate)
// {
//     inEditSimpleFormFlightDate.setValueState("Error")
//     return;
// }

// if(!origin)
// {
//     inEditSimpleFormOrigin.setValueState("Error")
//     return;

// }

// if(!destination)
// {
//     inEditSimpleFormDestination.setValueState("Error")
//     return;

// }

// if(!adultpax)
// {
//     inEditSimpleFormAdultPax.setValueState("Error")
//     return;
// }

// if(!infantpax)
// {
//     inEditSimpleFormInfantPax.setValueState("Error")
//     return;
// }

// if(!totalpax)
// {
//     inEditSimpleFormTotalPax.setValueState("Error")
//     return;
// }
//     // Validate ATD against ETD
// if (atdMinutes < etdMinutes) {

//     sap.m.MessageToast.show("Actual Time Departure (ATD) cannot be earlier than Estimated Time Departure (ETD).")
//     return; // Stop execution if invalid time
// }

// // Validate ATA against ETA
// if (ataMinutes < etaMinutes) {
//     sap.m.MessageToast.show("Actual Time of Arrival (ATA) cannot be earlier than Estimated Time of Arrival (ETA).")

//     return; // Stop execution if invalid time
// }


//     const differenceDeparture = atdMinutes - etdMinutes;

//     const differenceArrival = ataMinutes - etaMinutes ;


// console.log('departure', differenceDeparture)

// console.log('arrival ' , differenceArrival)

// // Update `update_data` with OTP values for departure
// if (differenceDeparture > 15) {
//     console.log("The departure is late.");
//     update_data.IsOTPDeparture = 1;
//     update_data.OTPDeparture = differenceDeparture;
//     return;
// } else {
//     console.log("The departure is on time.");
//     update_data.IsOTPDeparture = 0;
//     update_data.OTPDeparture = differenceDeparture;

// }

// // Update `update_data` with OTP values for arrival
// if (differenceArrival > 15) {
//     console.log("The arrival is late.");
//     update_data.IsOTPArrival = 1;
//     update_data.OTPArrival = differenceArrival;
// } else {
//     console.log("The arrival is on time.");
//     update_data.IsOTPArrival = 0;
//     update_data.OTPArrival = differenceArrival;
// }

//     var options = { 
//         data:update_data, 
//     }

//     apiUpdateFlight(options)
   
// }


// function DailyOTP() {
 
//   const selectedDate = DatePicker.getValue();


//   const dateObj = new Date(selectedDate);

 
//   const formattedDate = dateObj.toLocaleDateString("en-US", {
//     month: "numeric",
//     day: "numeric",
//     year: "2-digit"
//   }).split('/').map(part => part.padStart(2, '0')).join('/');

//   console.log(formattedDate);

 
//   const options = { data: { "monthly": formattedDate } };
//   console.log(selectedDate);
//   apiDailyOTP(options);
 
// }



// Report 1 
function OnTimeFlights() {

     const url = `http://localhost:8080/api/serverscript/cabserverside/OnTimeFlight`;
    console.log('Pressed');
    var fromDate = OnTimeArrival.getFrom();
    var toDate = OnTimeArrival.getTo();
    
    // Format the start date
    const formattedStartDate = fromDate.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "2-digit"
    }).split('/').map(part => part.padStart(2, '0')).join('/');
    
    // Format the end date
    const formattedEndDate = toDate.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "2-digit"
    }).split('/').map(part => part.padStart(2, '0')).join('/');
    
    // Log the formatted dates to the console
    console.log(formattedStartDate); // Output: 11/01/24
    console.log(formattedEndDate); // Output: 11/30/24
    



      $.ajax({ 
        url: url,
        type: 'POST',
        data: {from:formattedStartDate, to:formattedEndDate},
        // contentType: 'application/json', // If the backend expects JSON data
        success: function(response) { 
            console.log('Daily OTP:', response);
           
            if (response && Array.isArray(response.FlightsOnTime)) {
                modelTable15.setData(response.FlightsOnTime);
                console.log("Data appended to the table:", response.FlightsOnTime);
            } else {
                console.log("No data returned.");
            }
        },
        error: function(xhr, status, error) {
            console.error('Error during API call:', status, error, xhr.responseText);
        }
    });
}

