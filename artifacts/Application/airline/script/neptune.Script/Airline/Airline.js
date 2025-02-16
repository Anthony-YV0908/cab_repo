async function CreateAirline() 
{ 

   

    var code = inSimpleForm3Code.getValue()
    var name = inSimpleForm3Name.getValue()
    var servicetype = inSimpleForm3Service_Type.getValue() 
    var country = inSimpleForm3Country.getValue() 
    var countryname = inSimpleForm3Country_Name.getValue()
    var notes = inSimpleForm3Notes.getValue()
    

    const airlineData = {
        Code:code,
        Name:name,
        Service_Type:servicetype,
        Country:country,
        Country_Name:countryname,
        Notes:notes,
    }





    try {
        // Fetch existing data
        const checkUrl = `http://localhost:8080/api/entity/airportcode`;
        const checkResponse = await fetch(checkUrl, { method: "GET", headers: { "Content-Type": "application/json" } });

        if (!checkResponse.ok) {
            throw new Error(`Check request failed: ${checkResponse.statusText}`);
        }

        const existingData = await checkResponse.json();

        // Check for duplicates
        const duplicateExists = existingData.some(record =>
            record.Code === airlineData.Code ||
            record.Name === airlineData.Name ||
            record.Service_Type === airlineData.Service_Type ||
            record.Country === airlineData.Country ||
            record.Country_Name === airlineData.Country_Name 
        );

        if (duplicateExists === true) {
            sap.m.MessageToast.show("Error: Another airport with the same details already exists!");
            return;
        }

        // If no duplicate found, proceed with insertion
        await submitAirlineData(airlineData);

    } catch (error) {
        console.error("Error checking existing data:", error.message);
        alert("An error occurred while checking existing data.");
    }






    


    
}


async function submitAirlineData(airlineData)
{

    const url = `http://localhost:8080/api/entity/airportcode`;

    $.ajax({
        url: url,
        type: 'POST',
        contentType: 'application/json', // Specify JSON format
        data: JSON.stringify(airlineData), // Convert object to JSON string
        success: function(response) {
            console.log("Success:", response);
        },
        error: function(xhr, status, error) {
            console.error("Error:", error);
        }
    });
}






async function updateAirline(oEvent) {
    console.log('This is Airport', data);




    let airlineData = 
    { 
        id: modelSimpleForm2.getData().id,
        Code: inSimpleForm2Code.getValue(), 
        Name: inSimpleForm2Name.getValue(),
        Country: inSimpleForm2Country.getValue(),
        Country_Name:inSimpleForm2Country_Name.getValue(),
        Notes:inSimpleForm2Notes.getValue(), 

    }

    console.log(airlineData) 

    await checkDuplicateAirlineData(airlineData) 

  
}

async function checkDuplicateAirlineData(airlineData) {
    try {
        const checkUrl = `http://localhost:8080/api/entity/airportcode`;
        const checkResponse = await fetch(checkUrl, { method: "GET", headers: { "Content-Type": "application/json" } });

        if (!checkResponse.ok) {
            throw new Error(`Check request failed: ${checkResponse.statusText}`);
        }

        const existingData = await checkResponse.json();
        console.log("Existing Data:", existingData);

        // Find the existing record with the same ID
        const existingRecord = existingData.find(record => record.id === update_data.id);

        // Check if the new data is identical to the existing data (no changes)
        if (existingRecord &&
            existingRecord.Code === airlineData.Code &&
            existingRecord.Name === airlineData.Name &&
            existingRecord.Country === airlineData.Country &&
            existingRecord.Country_Name === airlineData.Country_Name &&
            existingRecord.Notes === airlineData.Notes) 
        {
            console.log("No changes detected, but update allowed.");
            updateAirlineData(airlineData); // Allow update even if unchanged
            return;
        }

        // **Filter and count duplicate records (excluding the current record)**
        const duplicateRecords = existingData.filter(record =>
            record.id !== airlineData.id && // Exclude the current record
            (
                record.Code === airlineData.Code ||
                record.Name === airlineData.Name
            )
        );

        console.log("Duplicate Count:", duplicateRecords.length);

        if (duplicateRecords.length > 0) {
            sap.m.MessageToast.show(`Error: ${duplicateRecords.length} duplicate(s) found!`);
            return;
        }

        // No duplicates found, proceed with update
        updateAirlineData(airlineData);
    } catch (error) {
        console.error("Error checking for duplicate data:", error);
    }
}



async function updateAirlineData(airlineData) 
{ 
      const normalizedUrl = `http://localhost:8080/api/entity/airportcode`;

    // Log the data to verify the payload
    console.log('Update Data:', airlineData);

    $.ajax({
        url: normalizedUrl,
        type: 'POST', // Use PUT for updates
        contentType: 'application/json', // Data is JSON
        data: JSON.stringify(airlineData), // Convert object to JSON string
        success: function (response) {
            console.log('Update successful', response);
        },
        error: function (xhr, status, error) {
            console.error('Error updating the record:', error);
            console.error('Status:', status);
            console.error('Response:', xhr.responseText);
        }
    });
}





function deleteairline(oEvent) 
{ 

      const context = oEvent.oSource.getBindingContext();
      const data = context.getObject();

      const normalizedUrl = `http://localhost:8080/api/entity/airline_archive`;
  
        var id = data.id
        var code = data.Code
        var name = data.Name 
        var servicetype = data.Service_Type
        var country = data.Country 
        var countryname = data.Country_Name 
        var notes = data.Notes 
    
        
      
       
        isDeleted = 1

        var Jsondata ={
            AirlineId:id ,
            AirlineCode:code,
            AirlineName:name,
            ServiceType:servicetype,
            CountryCode:country,
            CountryName:countryname,
            Notes:notes,
            IsDeleted: 1 
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




function deleteAirline(oEvent) 
{ 

      const context = oEvent.oSource.getBindingContext();
      const data = context.getObject();

      console.log('this is delte airport', data) 

       const normalizedUrl = `http://localhost:8080/api/entity/airportcode?where={"id":"${data.id}"}`;

        var isDeleted = data.isDeleted

        isDeleted = 1

        var Jsondata ={
            isDeleted: 1
        }
       $.ajax({
            url: normalizedUrl,
            type: 'POST', // Use PUT or PATCH for updates
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