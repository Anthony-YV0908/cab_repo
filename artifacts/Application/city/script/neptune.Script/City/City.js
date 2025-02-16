
async function CreateCity() 
{ 
    var citycode = inSimpleForm13CityCode.getValue() 
    var cityname = inSimpleForm13CityName.getValue() 
    

    const cityData = { 
        CityCode:citycode,
        CityName:cityname,
      
    }




   
    try {
        // Fetch existing data
        const checkUrl = `http://localhost:8080/api/entity/tbl_city`;
        const checkResponse = await fetch(checkUrl, { method: "GET", headers: { "Content-Type": "application/json" } });

        if (!checkResponse.ok) {
            throw new Error(`Check request failed: ${checkResponse.statusText}`);
        }

        const existingData = await checkResponse.json();

        // Check for duplicates
        const duplicateExists = existingData.some(record =>
            record.CityCode === cityData.CityCode ||
            record.CityName === cityData.CityName 
            
        );

        if (duplicateExists === true) {
            sap.m.MessageToast.show("Error: Another City with the same details already exists!");
            return;
        }

        // If no duplicate found, proceed with insertion
        await submitCityData(cityData);

    } catch (error) {
        console.error("Error checking existing data:", error.message);
        alert("An error occurred while checking existing data.");
    }



    

   




    
}



async function submitCityData(cityData) 
{ 

             const url = `http://localhost:8080/api/entity/tbl_city`;

        $.ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json', // Specify JSON format
            data: JSON.stringify(cityData), // Convert object to JSON string
            success: function(response) {
                console.log("Success:", response);
            },
            error: function(xhr, status, error) {
                console.error("Error:", error);
            }
        });
}







async function updateCity(oEvent) {
    console.log('This is Airport', data);

    let update_data = {
        id: modelSimpleForm12.getData().id,
        CityCode: inSimpleForm12CityCode.getValue(),
        CityName: inSimpleForm12CityName.getValue(),
       
    };

    
        await checkDuplicateDataCity(update_data) 
   
    

}


async function checkDuplicateDataCity(update_data) {
    try {
        // **Fetch existing city data**
        const checkUrl = `http://localhost:8080/api/entity/tbl_city`;
        const checkResponse = await fetch(checkUrl, { 
            method: "GET", 
            headers: { "Content-Type": "application/json" } 
        });

        if (!checkResponse.ok) {
            throw new Error(`Error fetching city data: ${checkResponse.statusText}`);
        }

        const existingData = await checkResponse.json();
        console.log("Existing Data:", existingData);

        // **Find if the record with the same ID already exists**
        const existingRecord = existingData.find(record => record.id === update_data.id);

        // **Check if there are no changes (allow update if unchanged)**
        if (existingRecord &&
            existingRecord.CityCode === update_data.CityCode &&
            existingRecord.CityName === update_data.CityName) 
        {
            console.log("No changes detected, but update allowed.");
            updateCityData(update_data); // Proceed with update
            return;
        }

        // **Check for duplicate records (excluding the current one)**
        const duplicateRecords = existingData.filter(record =>
            record.id !== update_data.id && ( // Exclude the current record
                record.CityCode === update_data.CityCode ||
                record.CityName === update_data.CityName
            )
        );

        console.log("Duplicate Count:", duplicateRecords.length);

        if (duplicateRecords.length > 0) {
            sap.m.MessageToast.show(`Error: ${duplicateRecords.length} duplicate(s) found!`);
            return; // Stop the update
        }

        // **No duplicates found, proceed with update**
        updateCityData(update_data);
    } catch (error) {
        console.error("Error checking for duplicate city data:", error);
        alert("An error occurred while checking existing city data.");
    }
}


async function updateCityData(update_data) 
{ 

    const normalizedUrl = `http://localhost:8080/api/entity/tbl_city`;

    // Log the data to verify the payload
    console.log('Update Data:', update_data);

    $.ajax({
        url: normalizedUrl,
        type: 'POST', // Use PUT for updates
        contentType: 'application/json', // Data is JSON
        data: JSON.stringify(update_data), // Convert object to JSON string
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







function deletecity(oEvent) 
{ 

      const context = oEvent.oSource.getBindingContext();
      const data = context.getObject();

      const normalizedUrl = `http://localhost:8080/api/entity/city_archive`;
  
        var id = data.id
        var citycode = data.CityCode
        var cityname = data.CityName 
      
       
        isDeleted = 1

        var Jsondata ={
            CityId:id ,
            CityCode:citycode,
            CityName:cityname,
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





function deleteCity(oEvent) 
{ 

      const context = oEvent.oSource.getBindingContext();
      const data = context.getObject();

      console.log('this is delte airport', data) 

       const normalizedUrl = `http://localhost:8080/api/entity/tbl_city?where={"id":"${data.id}"}`;

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