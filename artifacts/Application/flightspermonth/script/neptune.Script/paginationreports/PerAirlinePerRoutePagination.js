var paginationBar5 = {
    configuration5: {
        maxNumberOfButtons: 6,
    },
    pagination5: {
        take: 10, // Number of records per page
        index: 1,  // Current page index (starts from 1)
        count: 1,  // Total count of records (to be updated dynamically)
    },

    totalCount5: 0,


    run5: function () {


        var index = parseInt(paginationBar5.pagination5.index, 10);
        var takePagination = parseInt(paginationBar5.pagination5.take, 10);
        var skipPagination = takePagination * (paginationBar5.pagination5.index - 1);
      const url = `/api/serverscript/cabserverside/FlightsPerAirlinePerRoute`;



             var fromDate = AirlineRoute.getFrom() 
    var toDate = AirlineRoute.getTo() 

    var airLine = AirlineInput.getValue()
    var destination = DestinationInput_1.getValue() 
    var origin = OriginInput_1.getValue()



    if(!fromDate && !toDate ) 
    { 
        sap.m.MessageToast.show('No date choosen ')
        return;
    }


    if(!airLine ) 
    { 
        sap.m.MessageToast.show('No airline choosen ')
        return;
    }



    if(!destination ) 
    { 
        sap.m.MessageToast.show('No destination choosen ')
        return;
    }


    if(!origin ) 
    { 
        sap.m.MessageToast.show('No origin choosen ')
        return;
    }

    // var destination = Destination_1.getValue() 
    // var origin = Origin_1.getValue() 

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
        paginationBar5.isApiCalled = true;

     

        $.ajax({
            type: 'POST',
            url: url,
            data: {from:formattedStartDate, to:formattedEndDate, airline:airLine,destination:destination,origin:origin ,take:takePagination, skip:skipPagination }, // Send `take` and `skip` as query parameters
            success: function (response) {
               console.log("API response:", response.data);

                if (response && Array.isArray(response.data)) {
                    modelTable11.setData(response.data);
                    console.log("Data appended to the table:", response.data);
                } else {
                    console.log("No data returned.");
                }

                paginationBar5.totalCount5 = response.totalCount || 0; // Update global totalCount
                paginationBar5.handlePagination5(paginationBar5.totalCount5);
            },

            
            error: function (error) {
                console.error('Error during API call:', error);
            },
            complete: function () {
                // Reset the flag after the API call
                paginationBar5.isApiCalled = false;
            },
        });
    },

    searchCreateAirport: function() 
    { 
        let search = SearchField1;
        let searchValue = search.getValue();

        // Calculate 'take' and 'skip' for pagination
        var index = parseInt(paginationBar5.pagination5.index, 10); // Current page index
        var take = parseInt(paginationBar5.pagination5.take, 10);  // Number of records per page
        var skip = take * index; // Calculate skip based on current page

      const url = `/api/serverscript/cabserverside/FlightsPerAirlinePerRoute`;

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
                    modelTable11.setData(response.data);
                    console.log("Data appended to the table:", response.data);
                } else {
                    console.log("No data returned.");
                }

                paginationBar5.totalCount5 = response.totalCount || 0; // Update global totalCount
                paginationBar5.handlePagination5(paginationBar5.totalCount5);
            },
            error: function (xhr, status, error) {
                console.error('Search failed:', error);
            }
        });
    },

    handlePagination5: function (totalCount5) {
        const take = paginationBar5.pagination5.take;
        console.log('take' ,take)
        const maxIndex = Math.ceil(totalCount5 / take);

      

        // Enable/disable navigation buttons
        toolPaginationFirst5.setEnabled(paginationBar5.pagination5.index > 1);
        toolPaginationPrev2.setEnabled(paginationBar5.pagination5.index > 1);
        toolPaginationNext5.setEnabled(paginationBar5.pagination5.index < maxIndex);
        toolPaginationLast5.setEnabled(paginationBar5.pagination5.index < maxIndex);

        // Clear old pagination buttons
        toolPaginationPages5.destroyItems();

        const maxItems = paginationBar5.configuration5.maxNumberOfButtons;
        const startItem = Math.max(1, paginationBar5.pagination5.index - Math.floor(maxItems / 2));
        const endItem = Math.min(maxIndex, startItem + maxItems - 1);



            
            for (let i = startItem; i <= endItem; i++) {
            toolPaginationPages5.addItem(new sap.m.SegmentedButtonItem({
                text: i.toString(),
                key: i,
                 press: function () {
                     paginationBar5.pagination5.index = i
                        paginationBar5.run2();
                }
            }));
        }

        toolPaginationPages5.setSelectedKey(paginationBar5.pagination5.index);
        toolPaginationTitle5.setNumber(`${paginationBar5.pagination5.index} / ${maxIndex}`);
    },
};

// Initialize and fetch data for the first time
// paginationBar5.run5(true);
// paginationBar2.searchCreateAirport(true)
