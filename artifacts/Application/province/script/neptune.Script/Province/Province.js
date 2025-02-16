







async function CreateProvince() 
{ 
    
    var provincecode = inSimpleForm9ProvinceCode.getValue()
    var provincename = inSimpleForm9ProvinceName.getValue() 
    var regioncode = inSimpleForm9RegionCode.getValue()

    const provinceData = { 
        ProvinceCode:provincecode,
        ProvinceName:provincename,
        RegionCode:regioncode 
      
    }




   
    try {
        // Fetch existing data
        const checkUrl = `http://localhost:8080/api/entity/tbl_province`;
        const checkResponse = await fetch(checkUrl, { method: "GET", headers: { "Content-Type": "application/json" } });

        if (!checkResponse.ok) {
            throw new Error(`Check request failed: ${checkResponse.statusText}`);
        }

        const existingData = await checkResponse.json();

        // Check for duplicates
        const duplicateExists = existingData.some(record =>
            record.ProvinceCode === provinceData.ProvinceCode ||
            record.ProvinceName === provinceData.ProvinceName || 
            record.RegionCode == provinceData.RegionCode
            
        );

        if (duplicateExists === true ) {
            sap.m.MessageToast.show("Error: Another Province with the same details already exists!");
            return;
        }

        // If no duplicate found, proceed with insertion
        await submitProvinceData(provinceData);

    } catch (error) {
        console.error("Error checking existing data:", error.message);
        alert("An error occurred while checking existing data.");
    }



    

   




    
}



async function submitProvinceData(provinceData) 
{ 

             const url = `http://localhost:8080/api/entity/tbl_province`;

        $.ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json', // Specify JSON format
            data: JSON.stringify(provinceData), // Convert object to JSON string
            success: function(response) {
                console.log("Success:", response);
            },
            error: function(xhr, status, error) {
                console.error("Error:", error);
            }
        });
}







async function updateProvince(oEvent) {
  

    let update_data = {
        id: modelSimpleForm8.getData().id,
        ProvinceCode: inSimpleForm8ProvinceCode.getValue(),
        ProvinceName: inSimpleForm8ProvinceName.getValue(),
        RegionCode: inSimpleForm8RegionCode.getValue()
       
    };

    
        await checkDuplicateDataProvince(update_data) 
   
    

}


async function checkDuplicateProvinceData(update_data) {
    try {
        // **Fetch existing province data**
        const checkUrl = `http://localhost:8080/api/entity/tbl_province`;
        const checkResponse = await fetch(checkUrl, { 
            method: "GET", 
            headers: { "Content-Type": "application/json" } 
        });

        if (!checkResponse.ok) {
            throw new Error(`Error fetching province data: ${checkResponse.statusText}`);
        }

        const existingData = await checkResponse.json();
        console.log("Existing Province Data:", existingData);

        // **Find if the record with the same ID already exists**
        const existingRecord = existingData.find(record => record.id === update_data.id);

        // **Check if there are no changes (allow update if unchanged)**
        if (existingRecord &&
            existingRecord.ProvinceCode === update_data.ProvinceCode &&
            existingRecord.ProvinceName === update_data.ProvinceName &&
            existingRecord.RegionCode === update_data.RegionCode) 
        {
            console.log("No changes detected, but update allowed.");
            updateProvinceData(update_data); // Proceed with update
            return;
        }

        // **Check for duplicate records (excluding the current one)**
        const duplicateRecords = existingData.filter(record =>
            record.id !== update_data.id && ( // Exclude the current record
                record.ProvinceCode === update_data.ProvinceCode ||
                record.ProvinceName === update_data.ProvinceName ||
                record.RegionCode === update_data.RegionCode
            )
        );

        console.log("Duplicate Count:", duplicateRecords.length);

        if (duplicateRecords.length > 0) {
            sap.m.MessageToast.show(`Error: ${duplicateRecords.length} duplicate(s) found!`);
            return; // Stop the update
        }

        // **No duplicates found, proceed with update**
        updateProvinceData(update_data);
    } catch (error) {
        console.error("Error checking for duplicate province data:", error);
        alert("An error occurred while checking existing province data.");
    }
}


async function updateProvinceData(update_data) 
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







function deleteProvince(oEvent) 
{ 

      const context = oEvent.oSource.getBindingContext();
      const data = context.getObject();

      console.log('this is delte airport', data) 

       const normalizedUrl = `http://localhost:8080/api/entity/tbl_province?where={"id":"${data.id}"}`;

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