var paginationBar6 = {
    configuration6: {
        maxNumberOfButtons: 6,
    },
    pagination6: {
        take: 10, // Number of records per page
        index: 1,  // Current page index (starts from 1)
        count: 1,  // Total count of records (to be updated dynamically)
    },

    totalCount6: 0,


    run6: function () {


        var index = parseInt(paginationBar6.pagination6.index, 10);
        var takePagination = parseInt(paginationBar6.pagination6.take, 10);
        var skipPagination = takePagination * (paginationBar6.pagination6.index - 1);
      const url = `/api/serverscript/cabserverside/FlightsPerAirline`;

        

             var fromDate = DatePerAirline.getFrom()
        var toDate = DatePerAirline.getTo()
        var airlineinput = AirlineInput_1.getValue();


    if(!fromDate && !toDate ) 
    { 
        sap.m.MessageToast.show('No date choosen ')
        return;
    }


      if(!airlineinput ) 
    { 
        sap.m.MessageToast.show('No Airline choosen ')
        return;
    }


  // Validate the dates
    if (!(fromDate instanceof Date) || isNaN(fromDate)) {
        console.error("Invalid fromDate. Please check the input.");
        return;
    }

    if (!(toDate instanceof Date) || isNaN(toDate)) {
        console.error("Invalid toDate. Please check the input.");
        return;
    }

    // Format the start date
    const formattedStartDate = fromDate.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "2-digit",
    })
    .split('/')
    .map(part => part.padStart(2, '0'))
    .join('/');

    // Format the end date
    const formattedEndDate = toDate.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "2-digit",
    })
    .split('/')
    .map(part => part.padStart(2, '0'))
    .join('/');

        // Set the flag to indicate API call in progress
        paginationBar6.isApiCalled = true;

     

        $.ajax({
            type: 'POST',
            url: url,
            data: {from:formattedStartDate, to:formattedEndDate,airline:airlineinput, take:takePagination, skip:skipPagination }, // Send `take` and `skip` as query parameters
            success: function (response) {
               console.log("API response:", response.data);

                if (response && Array.isArray(response.data)) {
                    modelTable10.setData(response.data);
                    console.log("Data appended to the table:", response.data);
                } else {
                    console.log("No data returned.");
                }

                paginationBar6.totalCount6 = response.totalCount || 0; // Update global totalCount
                paginationBar6.handlePagination6(paginationBar6.totalCount6);
            },

            
            error: function (error) {
                console.error('Error during API call:', error);
            },
            complete: function () {
                // Reset the flag after the API call
                paginationBar6.isApiCalled = false;
            },
        });
    },

    searchCreateAirport: function() 
    { 
        let search = SearchField1;
        let searchValue = search.getValue();

        // Calculate 'take' and 'skip' for pagination
        var index = parseInt(paginationBar6.pagination6.index, 10); // Current page index
        var take = parseInt(paginationBar6.pagination6.take, 10);  // Number of records per page
        var skip = take * index; // Calculate skip based on current page

      const url = `/api/serverscript/cabserverside/AirportSearch`;

        $.ajax({
            url: url,
            method: 'GET',
              data: {
                countryname: searchValue,
                take: take,
                skip: skip
            },
            success: function (response) {
                console.log('This is the search response', response);

                if (response && Array.isArray(response.data)) {
                    modelTable10.setData(response.data);
                    console.log("Data appended to the table:", response.data);
                } else {
                    console.log("No data returned.");
                }

                paginationBar6.totalCount6 = response.totalCount || 0; // Update global totalCount
                paginationBar6.handlePagination6(paginationBar6.totalCount6);
            },
            error: function (xhr, status, error) {
                console.error('Search failed:', error);
            }
        });
    },

    handlePagination6: function (totalCount6) {
        const take = paginationBar6.pagination6.take;
        console.log('take' ,take)
        const maxIndex = Math.ceil(totalCount6 / take);

      

        // Enable/disable navigation buttons
        toolPaginationFirst6.setEnabled(paginationBar6.pagination6.index > 1);
        toolPaginationPrev6.setEnabled(paginationBar6.pagination6.index > 1);
        toolPaginationNext6.setEnabled(paginationBar6.pagination6.index < maxIndex);
        toolPaginationLast6.setEnabled(paginationBar6.pagination6.index < maxIndex);

        // Clear old pagination buttons
        toolPaginationPages6.destroyItems();

        const maxItems = paginationBar6.configuration6.maxNumberOfButtons;
        const startItem = Math.max(1, paginationBar6.pagination6.index - Math.floor(maxItems / 2));
        const endItem = Math.min(maxIndex, startItem + maxItems - 1);



            
            for (let i = startItem; i <= endItem; i++) {
            toolPaginationPages6.addItem(new sap.m.SegmentedButtonItem({
                text: i.toString(),
                key: i,
                 press: function () {
                     paginationBar6.pagination6.index = i
                        paginationBar6.run6();
                }
            }));
        }

        toolPaginationPages6.setSelectedKey(paginationBar6.pagination6.index);
        toolPaginationTitle6.setNumber(`${paginationBar6.pagination6.index} / ${maxIndex}`);
    },
};

// Initialize and fetch data for the first time
// paginationBar6.run6(true);
// paginationBar2.searchCreateAirport(true)
