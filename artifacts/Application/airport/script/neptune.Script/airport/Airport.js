async function CreateAirport() { 
    // Retrieve input field values
    var code = inSimpleFormCode.getValue();
    var metro = inSimpleFormIATA_Metro.getValue();
    var name = inSimpleFormName.getValue();
    var city = inSimpleFormCity.getValue();
    var state = inSimpleFormState.getValue();
    var statename = inSimpleFormState_Name.getValue();
    var latitude = inSimpleFormLatitude.getValue();
    var longtitude = inSimpleFormLongitude.getValue();
    var country = inSimpleFormCountry.getValue();
    var countryname = inSimpleFormCountry_Name.getValue();
    var globalregion = inSimpleFormGlobal_Region.getValue();
    var wac = inSimpleFormWAC.getValue();
    var notes = inSimpleFormNotes.getValue();
    var map = inSimpleFormMap.getValue();

    // Check for missing values
    switch (true) {
        case !code: return sap.m.MessageToast.show("Code is required.");
        case !metro: return sap.m.MessageToast.show("IATA Metro is required.");
        case !name: return sap.m.MessageToast.show("Name is required.");
        case !city: return sap.m.MessageToast.show("City is required.");
        case !state: return sap.m.MessageToast.show("State is required.");
        case !statename: return sap.m.MessageToast.show("State Name is required.");
        case !latitude: return sap.m.MessageToast.show("Latitude is required.");
        case !longtitude: return sap.m.MessageToast.show("Longitude is required.");
        case !country: return sap.m.MessageToast.show("Country is required.");
        case !countryname: return sap.m.MessageToast.show("Country Name is required.");
        case !globalregion: return sap.m.MessageToast.show("Global Region is required.");
        case !wac: return sap.m.MessageToast.show("WAC is required.");
        case !notes: return sap.m.MessageToast.show("Notes are required.");
        case !map: return sap.m.MessageToast.show("Map is required.");
        default: break;
    }

    // Create payload
    const airportData = {
        Code: code,
        IATA_Metro: metro,
        Name: name,
        City: city,
        State: state,
        State_Name: statename,
        Latitude: latitude,
        Longitude: longtitude,
        Country: country,
        Country_Name: countryname,
        Global_Region: globalregion,
        WAC: wac,
        Notes: notes,
        Map: map,
    };

    try {
        // Fetch existing data
        const checkUrl = `http://localhost:8080/api/entity/airport`;
        const checkResponse = await fetch(checkUrl, { method: "GET", headers: { "Content-Type": "application/json" } });

        if (!checkResponse.ok) {
            throw new Error(`Check request failed: ${checkResponse.statusText}`);
        }

        const existingData = await checkResponse.json();

        // Check for duplicates
        const duplicateExists = existingData.some(record =>
            record.Code === airportData.Code ||
            record.IATA_Metro === airportData.IATA_Metro ||
            record.Name === airportData.Name ||
            record.City === airportData.City ||
            record.State === airportData.State ||
            record.State_Name === airportData.State_Name ||
            record.Country === airportData.Country ||
            record.Country_Name === airportData.Country_Name
        );

        if (duplicateExists === true) {
            sap.m.MessageToast.show("Error: Another airport with the same details already exists!");
            return;
        }

        // If no duplicate found, proceed with insertion
        await submitAirportData(airportData);

    } catch (error) {
        console.error("Error checking existing data:", error.message);
        alert("An error occurred while checking existing data.");
    }
}

// Function to submit data
async function submitAirportData(airportData) {
    try {
        const insertUrl = `http://localhost:8080/api/entity/airport`;

        const response = await fetch(insertUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(airportData), // Convert object to JSON string
        });

        if (!response.ok) {
            throw new Error(`Insert request failed: ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log("Success:", responseData);
        sap.m.MessageToast.show("Airport data successfully added.");
        
    } catch (error) {
        console.error("Error inserting data:", error.message);
        alert("An error occurred while inserting the data.");
    }
}




function deleteairport(oEvent) 
{ 

      const context = oEvent.oSource.getBindingContext();
      const data = context.getObject();

      const normalizedUrl = `http://localhost:8080/api/entity/airport_archive`;
  
        var id = data.id
        var code = data.Code
        var metro = data.IATA_Metro
        var name = data.Name 
        var city = data.City
        var state = data.State
        var statename = data.State_Name
        var latitude = data.Latitude
        var longitude = data.Longitude
        var globalregion = data.Global_Region
        var wac = data.WAC
        var country = data.Country 
        var countryname = data.Country_Name 
        var notes = data.Notes 
        var map = data.Maps
    
        
      
       
        isDeleted = 1

        var Jsondata ={
            AirportId:id ,
            Code:code,
            IATA_Metro:metro,
            Name:name,
            City:city,
            State:state,
            State_Name:statename, 
            Latitude:latitude,
            Longitude:longitude, 
            Country:country,
            Country_Name:countryname,
            Global_Region:globalregion,
            WAC:wac,
            Notes:notes,
            Map:map,
            isDeleted: 1 
        }
       $.ajax({
            url: normalizedUrl,
            type: 'PUT', // Use PUT or PATCH for updates
            contentType: 'application/json', // Set the content type to JSON
            data: JSON.stringify(Jsondata), // Send the updated data as JSON
            success: function (response) {
                console.log('deleted successful:', response);
                // Optionally reload the page or perform other actions
                // window.location.reload();
            },
            error: function (xhr, status, error) {
                console.error('Error updating the record:', error);
                console.error('Status:', status);
            }
        });
}




async function updateAirport(oEvent) {
    console.log(oEvent);
    console.log("This is Airport", data);

    let update_airportdata = {
        id: modelSimpleForm1.getData().id,
        Code: inSimpleForm1Code.getValue(),
        IATA_Metro: inSimpleForm1IATA_Metro.getValue(),
        Country: inSimpleForm1Country.getValue(),
        City: inSimpleForm1City.getValue(),
        Country_Name: inSimpleForm1Country_Name.getValue(),
        Global_Region: inSimpleForm1Global_Region.getValue(),
        Latitude: inSimpleForm1Latitude.getValue(),
        Longitude: inSimpleForm1Longitude.getValue(),
        Map: inSimpleForm1Map.getValue(),
        Name: inSimpleForm1Name.getValue(),
        State: inSimpleForm1State.getValue(),
        State_Name: inSimpleForm1State_Name.getValue(),
        Notes: inSimpleForm1Notes.getValue(),
        WAC: inSimpleForm1WAC.getValue(),
    };

    // Check if the airport data already exists with the same Code, Name, or other fields
    await checkDuplicateAirportData(update_airportdata);
}
async function checkDuplicateAirportData(update_airportdata) {
    try {
        const checkUrl = `http://localhost:8080/api/entity/airport`;
        const checkResponse = await fetch(checkUrl, { method: "GET", headers: { "Content-Type": "application/json" } });

        if (!checkResponse.ok) {
            throw new Error(`Check request failed: ${checkResponse.statusText}`);
        }

        const existingData = await checkResponse.json();
        console.log("Existing Data:", existingData);

        // Find the existing record with the same ID
        const existingRecord = existingData.find(record => record.id === update_airportdata.id);

        // Check if the new data is identical to the existing data (no changes)
        if (existingRecord &&
            existingRecord.Code === update_airportdata.Code &&
            existingRecord.Name === update_airportdata.Name &&
            existingRecord.Country === update_airportdata.Country &&
            existingRecord.Country_Name === update_airportdata.Country_Name &&
            existingRecord.Notes === update_airportdata.Notes) 
        {
            console.log("No changes detected, but update allowed.");
            updateAirlineData(update_airportdata); // Allow update even if unchanged
            return;
        }

        // **Filter and count duplicate records (excluding the current record)**
        const duplicateRecords = existingData.filter(record =>
            record.id !== update_airportdata.id && // Exclude the current record
            (
                record.Code === update_airportdata.Code ||
                record.Name === update_airportdata.Name
            )
        );

        console.log("Duplicate Count:", duplicateRecords.length);

        if (duplicateRecords.length > 0) {
            sap.m.MessageToast.show(`Error: ${duplicateRecords.length} duplicate(s) found!`);
            return;
        }

        // No duplicates found, proceed with update
        updateAirportData(update_airportdata);
    } catch (error) {
        console.error("Error checking for duplicate data:", error);
    }
}


function updateAirportData(update_airportdata) {
    const updateUrl = `http://localhost:8080/api/entity/airport`;

    console.log("Update Data:", update_airportdata);

    $.ajax({
        url: updateUrl,
        type: "POST", // Change to 'PUT' if your API expects updates via PUT
        contentType: "application/json",
        data: JSON.stringify(update_airportdata),
        success: function (response) {
            console.log("Update successful", response);
        },
        error: function (xhr, status, error) {
            console.error("Error updating the record:", error);
            console.error("Status:", status);
            console.error("Response:", xhr.responseText);
        },
    });
}


function deleteAirport(oEvent) 
{ 

      const context = oEvent.oSource.getBindingContext();
      const data = context.getObject();

      console.log('this is delte airport', data) 

       const normalizedUrl = `http://localhost:8080/api/entity/airport?where={"id":"${data.id}"}`;

        var isDeleted = data.isDeleted

        isDeleted = 1

        var Jsondata ={
            isDeleted: 1
        }
       $.ajax({
            url: normalizedUrl,
            type: 'PUT', // Use PUT or PATCH for updates
            contentType: 'application/json', // Set the content type to JSON
            data: JSON.stringify(Jsondata), // Send the updated data as JSON
            success: function (response) {
                console.log('deleted successful:', response);
                // Optionally reload the page or perform other actions
                // window.location.reload();
            },
            error: function (xhr, status, error) {
                console.error('Error updating the record:', error);
                console.error('Status:', status);
            }
        });
}


