


async function CreateRegion() 
{ 
    var regioncode = inSimpleForm11RegionCode.getValue() 
    var regionname = inSimpleForm11RegionName.getValue() 
    

    const regionData = { 
        RegionCode:regioncode,
        RegionName:regionname,
      
    }




   
    try {
        // Fetch existing data
        const checkUrl = `http://localhost:8080/api/entity/tbl_region`;
        const checkResponse = await fetch(checkUrl, { method: "GET", headers: { "Content-Type": "application/json" } });

        if (!checkResponse.ok) {
            throw new Error(`Check request failed: ${checkResponse.statusText}`);
        }

        const existingData = await checkResponse.json();

        // Check for duplicates
        const duplicateExists = existingData.some(record =>
            record.RegionCode === regionData.RegionCode ||
            record.RegionName === regionData.RegionName 
            
        );

        if (duplicateExists === true) {
            sap.m.MessageToast.show("Error: Another Region with the same details already exists!");
            return;
        }

        // If no duplicate found, proceed with insertion
        await submitRegionData(regionData);

    } catch (error) {
        console.error("Error checking existing data:", error.message);
        alert("An error occurred while checking existing data.");
    }



    

   




    
}



async function submitRegionData(regionData) 
{ 

             const url = `http://localhost:8080/api/entity/tbl_region`;

        $.ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json', // Specify JSON format
            data: JSON.stringify(regionData), // Convert object to JSON string
            success: function(response) {
                console.log("Success:", response);
            },
            error: function(xhr, status, error) {
                console.error("Error:", error);
            }
        });
}







async function updateRegion(oEvent) {
  

    let update_data = {
        id: modelSimpleForm10.getData().id,
        RegionCode: inSimpleForm10RegionCode.getValue(),
        RegionName: inSimpleForm10RegionName.getValue(),
       
    };

    
        await checkDuplicateData(update_data) 
   
    

}



async function checkDuplicateRegionData(update_data) {
    try {
        // **Fetch existing region data**
        const checkUrl = `http://localhost:8080/api/entity/tbl_region`;
        const checkResponse = await fetch(checkUrl, { 
            method: "GET", 
            headers: { "Content-Type": "application/json" } 
        });

        if (!checkResponse.ok) {
            throw new Error(`Error fetching region data: ${checkResponse.statusText}`);
        }

        const existingData = await checkResponse.json();
        console.log("Existing Region Data:", existingData);

        // **Find if the record with the same ID already exists**
        const existingRecord = existingData.find(record => record.id === update_data.id);

        // **Check if there are no changes (allow update if unchanged)**
        if (existingRecord &&
            existingRecord.RegionCode === update_data.RegionCode &&
            existingRecord.RegionName === update_data.RegionName) 
        {
            console.log("No changes detected, but update allowed.");
            updateRegionData(update_data); // Proceed with update
            return;
        }

        // **Check for duplicate records (excluding the current one)**
        const duplicateRecords = existingData.filter(record =>
            record.id !== update_data.id && ( // Exclude the current record
                record.RegionCode === update_data.RegionCode ||
                record.RegionName === update_data.RegionName
            )
        );

        console.log("Duplicate Count:", duplicateRecords.length);

        if (duplicateRecords.length > 0) {
            sap.m.MessageToast.show(`Error: ${duplicateRecords.length} duplicate(s) found!`);
            return; // Stop the update
        }

        // **No duplicates found, proceed with update**
        updateRegionData(update_data);
    } catch (error) {
        console.error("Error checking for duplicate region data:", error);
        alert("An error occurred while checking existing region data.");
    }
}



async function updateRegionData(update_data) 
{ 

    const normalizedUrl = `http://localhost:8080/api/entity/tbl_region`;

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





function deleteRegion(oEvent) 
{ 

      const context = oEvent.oSource.getBindingContext();
      const data = context.getObject();

      console.log('this is delte airport', data) 

       const normalizedUrl = `http://localhost:8080/api/entity/tbl_region?where={"id":"${data.id}"}`;

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