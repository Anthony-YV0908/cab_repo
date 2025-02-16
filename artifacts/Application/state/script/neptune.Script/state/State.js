







async function CreateState() 
{ 
    var statecode = inSimpleForm14StateCode.getValue() 
    var statename = inSimpleForm14StateName.getValue() 
    var countrycode = inSimpleForm14CountryCode.getValue() 


    const stateData = { 
        StateCode:statecode,
        StateName:statename,
        CountryCode:countrycode,
    }




   
    try {
        // Fetch existing data
        const checkUrl = `http://localhost:8080/api/entity/tbl_state`;
        const checkResponse = await fetch(checkUrl, { method: "GET", headers: { "Content-Type": "application/json" } });

        if (!checkResponse.ok) {
            throw new Error(`Check request failed: ${checkResponse.statusText}`);
        }

        const existingData = await checkResponse.json();

        // Check for duplicates
        const duplicateExists = existingData.some(record =>
            record.StateCode === stateData.StateCode ||
            record.StateName === stateData.StateName 
            
        );


        

        if (duplicateExists === true) {
            sap.m.MessageToast.show("Error: Another State with the same details already exists!");
            return;
        }

        // If no duplicate found, proceed with insertion
        await submitStateData(stateData);

    } catch (error) {
        console.error("Error checking existing data:", error.message);
        alert("An error occurred while checking existing data.");
    }



    

   




    
}

async function submitStateData(stateData) {
    try {
        const url = `http://localhost:8080/api/entity/tbl_state`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(stateData),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        console.log("Success:", await response.json());
    } catch (error) {
        console.error("Error submitting data:", error.message);
    }
}





async function updateState(oEvent) {
    console.log('This is Airport', data);

    let update_data = {
        id: modelSimpleForm15.getData().id,
        StateCode: inSimpleForm15StateCode.getValue(),
        StateName: inSimpleForm15StateName.getValue(),
        CountryCode:inSimpleForm15CountryCode.getValue() 
    };

    
        await checkDuplicateData(update_data) 
   
    

}


async function checkDuplicateData(update_data) {
    try {
        // **Fetch existing state data**
        const checkUrl = `http://localhost:8080/api/entity/tbl_state`;
        const checkResponse = await fetch(checkUrl, { 
            method: "GET", 
            headers: { "Content-Type": "application/json" }
        });

        if (!checkResponse.ok) {
            throw new Error(`Error fetching state data: ${checkResponse.statusText}`);
        }

        const existingData = await checkResponse.json();
        console.log("Existing Data:", existingData);

        // **Find if the record with the same ID already exists**
        const existingRecord = existingData.find(record => record.id === update_data.id);

        // **Check if there are no changes (allow update if unchanged)**
        if (existingRecord &&
            existingRecord.StateCode === update_data.StateCode &&
            existingRecord.StateName === update_data.StateName &&
            existingRecord.CountryCode === update_data.CountryCode) 
        {
            console.log("No changes detected, but update allowed.");
            updateStateData(update_data); // Proceed with update
            return;
        }

        // **Check for duplicate records (excluding the current one)**
        const duplicateRecords = existingData.filter(record =>
            record.id !== update_data.id && ( // Exclude the current record
                record.StateCode === update_data.StateCode ||
                record.StateName === update_data.StateName
            )
        );

        console.log("Duplicate Count:", duplicateRecords.length);

        if (duplicateRecords.length > 0) {
            sap.m.MessageToast.show(`Error: ${duplicateRecords.length} duplicate(s) found!`);
            return; // Stop the update
        }

        // **No duplicates found, proceed with update**
        updateStateData(update_data);
    } catch (error) {
        console.error("Error checking for duplicate data:", error);
    }
}



async function updateStateData(update_data) 
{ 

    const normalizedUrl = `http://localhost:8080/api/entity/tbl_state`;

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












function deletestate(oEvent) 
{ 

      const context = oEvent.oSource.getBindingContext();
      const data = context.getObject();

      const normalizedUrl = `http://localhost:8080/api/entity/state_archive`;
  
        var id = data.id
        var statecode = data.StateCode
        var statename = data.StateName 
        var countrycode = data.CountryCode 
        
        isDeleted = 1

        var Jsondata ={
            StateId:id ,
            StateCode:statecode,
            StateName:statename,
            CountryCode:countrycode,
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




function deleteState(oEvent) 
{ 

      const context = oEvent.oSource.getBindingContext();
      const data = context.getObject();

      console.log('this is delte airport', data) 

       const normalizedUrl = `http://localhost:8080/api/entity/tbl_state?where={"id":"${data.id}"}`;

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