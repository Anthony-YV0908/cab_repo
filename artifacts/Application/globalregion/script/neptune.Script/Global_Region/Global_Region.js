async function CreateGlobalRegion() 
{ 
    var globalregioncode = inSimpleForm5GlobalRegionCode.getValue() 
    var globalregionname = inSimpleForm5GlobalRegionName.getValue() 
    

    const globalregionData = { 
        GlobalRegionCode:globalregioncode,
        GlobalRegionName:globalregionname,
      
    }




   
    try {
        // Fetch existing data
        const checkUrl = `http://localhost:8080/api/entity/tbl_globalregion`;


        
        const checkResponse = await fetch(checkUrl, { method: "GET", headers: { "Content-Type": "application/json" } });

        if (!checkResponse.ok) {
            throw new Error(`Check request failed: ${checkResponse.statusText}`);
        }

        const existingData = await checkResponse.json();
        

        // Check for duplicates
        const duplicateExists = existingData.some(record =>
            record.GlobalRegionCode === globalregionData.GlobalRegionCode ||
            record.GlobalRegionName === globalregionData.GlobalRegionName 
            
        );

        if (duplicateExists === true) {
            sap.m.MessageToast.show("Error: Another GlobalRegion with the same details already exists!");
            return;
        }

        // If no duplicate found, proceed with insertion
        await submitGlobalRegionData(globalregionData);

    } catch (error) {
        console.error("Error checking existing data:", error.message);
        alert("An error occurred while checking existing data.");
    }



    

   




    
}



async function submitGlobalRegionData(globalregionData) 
{ 

             const url = `http://localhost:8080/api/entity/tbl_globalregion`;

        $.ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json', // Specify JSON format
            data: JSON.stringify(globalregionData), // Convert object to JSON string
            success: function(response) {
                console.log("Success:", response);
            },
            error: function(xhr, status, error) {
                console.error("Error:", error);
            }
        });
}







async function updateGlobalRegion(oEvent) {
  

    let update_data = {
        id: modelSimpleForm4.getData().id,
        GlobalRegionCode: inSimpleForm4GlobalRegionCode.getValue(),
        GlobalRegionName: inSimpleForm4GlobalRegionName.getValue(),
       
    };

    
        await checkDuplicateDataGlobalRegion(update_data) 
   
    

}



async function checkDuplicateGlobalRegionData(update_data) {
    try {
        // **Fetch existing global region data**
        const checkUrl = `http://localhost:8080/api/entity/tbl_globalregion`;
        const checkResponse = await fetch(checkUrl, { 
            method: "GET", 
            headers: { "Content-Type": "application/json" } 
        });

        if (!checkResponse.ok) {
            throw new Error(`Error fetching global region data: ${checkResponse.statusText}`);
        }

        const existingData = await checkResponse.json();
        console.log("Existing Global Region Data:", existingData);

        // **Find if the record with the same ID already exists**
        const existingRecord = existingData.find(record => record.id === update_data.id);

        // **Check if there are no changes (allow update if unchanged)**
        if (existingRecord &&
            existingRecord.GlobalRegionCode === update_data.GlobalRegionCode &&
            existingRecord.GlobalRegionName === update_data.GlobalRegionName) 
        {
            console.log("No changes detected, but update allowed.");
            updateGlobalRegionData(update_data); // Proceed with update
            return;
        }

        // **Check for duplicate records (excluding the current one)**
        const duplicateRecords = existingData.filter(record =>
            record.id !== update_data.id && ( // Exclude the current record
                record.GlobalRegionCode === update_data.GlobalRegionCode ||
                record.GlobalRegionName === update_data.GlobalRegionName
            )
        );

        console.log("Duplicate Count:", duplicateRecords.length);

        if (duplicateRecords.length > 0) {
            sap.m.MessageToast.show(`Error: ${duplicateRecords.length} duplicate(s) found!`);
            return; // Stop the update
        }

        // **No duplicates found, proceed with update**
        updateGlobalRegionData(update_data);
    } catch (error) {
        console.error("Error checking for duplicate global region data:", error);
        alert("An error occurred while checking existing global region data.");
    }
}


async function updateGlobalRegionData(update_data) 
{ 

    const normalizedUrl = `http://localhost:8080/api/entity/tbl_globalregion`;

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









function deleteGlobalRegion(oEvent) 
{ 

      const context = oEvent.oSource.getBindingContext();
      const data = context.getObject();

      console.log('this is delte airport', data) 

       const normalizedUrl = `http://localhost:8080/api/entity/tbl_globalregion?where={"id":"${data.id}"}`;

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