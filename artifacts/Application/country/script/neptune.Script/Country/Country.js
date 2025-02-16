async function CreateCountry() 
{ 
    var countrycode = inSimpleForm7CountryCode.getValue()
    var countryname = inSimpleForm7CountryName.getValue()
    var globalregion = inSimpleForm7GlobalRegionCode.getValue()

    const countryData = { 
        Country:countrycode,
        Country_Name:countryname,
        GlobalRegionCode:globalregion,
    }





   
    try {
        // Fetch existing data
        const checkUrl = `http://localhost:8080/api/entity/tbl_country`;
        const checkResponse = await fetch(checkUrl, { method: "GET", headers: { "Content-Type": "application/json" } });

        if (!checkResponse.ok) {
            throw new Error(`Check request failed: ${checkResponse.statusText}`);
        }

        const existingData = await checkResponse.json();

        // Check for duplicates
        const duplicateExists = existingData.some(record =>
            record.Country ===  countryData.Country ||
            record.Country_Name === countryData.Country_Name 
            
        );

        if (duplicateExists === true) {
            sap.m.MessageToast.show("Error: Another airport with the same details already exists!");
            return;
        }

        // If no duplicate found, proceed with insertion
        await submitCountryData(countryData);

    } catch (error) {
        console.error("Error checking existing data:", error.message);
        alert("An error occurred while checking existing data.");
    }



    

   




    
}



async function submitCountryData(countryData) 
{ 

             const url = `http://localhost:8080/api/entity/tbl_country`;

        $.ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json', // Specify JSON format
            data: JSON.stringify(countryData), // Convert object to JSON string
            success: function(response) {
                console.log("Success:", response);
            },
            error: function(xhr, status, error) {
                console.error("Error:", error);
            }
        });
}







async function updateCountry(oEvent) {
    console.log('This is Airport', data);

    let update_countrydata = {
        id: modelSimpleForm6.getData().id,
        CountryCode: inSimpleForm6CountryCode.getValue(), 
        CountryName: inSimpleForm6CountryName.getValue(),
        GlobalRegionCode:inSimpleForm6GlobalRegionCode.getValue() 
    };

    
        await checkDuplicateData(update_countrydata) 
   
    

}


async function checkDuplicateData(update_countrydata) {
    try {
        // **Fetch existing country data**
        const checkUrl = `http://localhost:8080/api/entity/tbl_country`;
        const checkResponse = await fetch(checkUrl, { 
            method: "GET", 
            headers: { "Content-Type": "application/json" } 
        });

        if (!checkResponse.ok) {
            throw new Error(`Error fetching country data: ${checkResponse.statusText}`);
        }

        const existingData = await checkResponse.json();
        console.log("Existing Country Data:", existingData);

        // **Find if the record with the same ID already exists**
        const existingRecord = existingData.find(record => record.id === update_countrydata.id);

        // **Check if there are no changes (allow update if unchanged)**
        if (existingRecord &&
            existingRecord.CountryCode === update_countrydata.CountryCode &&
            existingRecord.CountryName === update_countrydata.CountryName &&
            existingRecord.GlobalRegionCode === update_countrydata.GlobalRegionCode) 
        {
            console.log("No changes detected, but update allowed.");
            updateCountryData(update_countrydata); // Proceed with update
            return;
        }

        // **Check for duplicate records (excluding the current one)**
        const duplicateRecords = existingData.filter(record =>
            record.id !== update_countrydata.id && ( // Exclude the current record
                record.CountryCode === update_countrydata.CountryCode ||
                record.CountryName === update_countrydata.CountryName
            )
        );

        console.log("Duplicate Count:", duplicateRecords.length);

        if (duplicateRecords.length > 0) {
            sap.m.MessageToast.show(`Error: ${duplicateRecords.length} duplicate(s) found!`);
            return; // Stop the update
        }

        // **No duplicates found, proceed with update**
        updateCountryData(update_countrydata);
    } catch (error) {
        console.error("Error checking for duplicate country data:", error);
        alert("An error occurred while checking existing country data.");
    }
}


async function updateCountryData(update_countrydata) 
{ 

    const normalizedUrl = `http://localhost:8080/api/entity/tbl_country`;

    // Log the data to verify the payload
    console.log('Update Data:', update_countrydata);

    $.ajax({
        url: normalizedUrl,
        type: 'POST', // Use PUT for updates
        contentType: 'application/json', // Data is JSON
        data: JSON.stringify(update_countrydata), // Convert object to JSON string
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









function deletecountry(oEvent) 
{ 

      const context = oEvent.oSource.getBindingContext();
      const data = context.getObject();

      const normalizedUrl = `http://localhost:8080/api/entity/country_archive`;
  
        var id = data.id
        var regioncode = data.Country
        var regionname = data.Country_Name 
        var globalregion = data.GlobalRegionCode
       
        isDeleted = 1

        var Jsondata ={
            CountryId:id ,
            RegionCode:regioncode,
            RegionName:regionname,
            GlobalRegionCode:globalregion,
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





function deleteCountry(oEvent) 
{ 

      const context = oEvent.oSource.getBindingContext();
      const data = context.getObject();

      console.log('this is delte airport', data) 

       const normalizedUrl = `http://localhost:8080/api/entity/tbl_country?where={"id":"${data.id}"}`;

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