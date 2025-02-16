var paginationBar7 = {
    configuration7: {
        maxNumberOfButtons: 6,
    },
    pagination7: {
        take: 10, // Number of records per page
        index: 1,  // Current page index (starts from 1)
        count: 1,  // Total count of records (to be updated dynamically)
    },

    totalCount7: 0,


    run7: function () {


        var index = parseInt(paginationBar7.pagination7.index, 10);
        var takePagination = parseInt(paginationBar7.pagination7.take, 10);
        var skipPagination = takePagination * (paginationBar7.pagination7.index - 1);
      const url = `/api/serverscript/cabserverside/FlightsPerRoute`;



             var fromDate = DatePerRoute.getFrom();
            var toDate = DatePerRoute.getTo();
            var originInput = OriginInput_2.getValue(); 
            var destinationInput = DestinationInput_2.getValue();



    if(!fromDate && !toDate ) 
    { 
        sap.m.MessageToast.show('No date choosen ')
        
        return;
    }


    if(!originInput) 
    { 
         sap.m.MessageToast.show('No Origin choosen ')
        return;
    }

    if(!destinationInput) 
    { 
         sap.m.MessageToast.show('No Destination choosen ')
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
        paginationBar2.isApiCalled = true;

     

        $.ajax({
            type: 'POST',
            url: url,
            data: {from:formattedStartDate, to:formattedEndDate, origin:originInput, destination:destinationInput, take:takePagination, skip:skipPagination }, // Send `take` and `skip` as query parameters
            success: function (response) {
               console.log("API response:", response.data);

                if (response && Array.isArray(response.data)) {
                    modelTable9.setData(response.data);
                    console.log("Data appended to the table:", response.data);
                } else {
                    console.log("No data returned.");
                }

                paginationBar7.totalCount7 = response.totalCount || 0; // Update global totalCount
                paginationBar7.handlePagination7(paginationBar7.totalCount7);
            },

            
            error: function (error) {
                console.error('Error during API call:', error);
            },
            complete: function () {
                // Reset the flag after the API call
                paginationBar7.isApiCalled = false;
            },
        });
    },

    searchCreateAirport: function() 
    { 
        let search = SearchField1;
        let searchValue = search.getValue();

        // Calculate 'take' and 'skip' for pagination
        var index = parseInt(paginationBar7.pagination7.index, 10); // Current page index
        var take = parseInt(paginationBar7.pagination7.take, 10);  // Number of records per page
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
                    modelTable9.setData(response.data);
                    console.log("Data appended to the table:", response.data);
                } else {
                    console.log("No data returned.");
                }

                paginationBar7.totalCount7 = response.totalCount || 0; // Update global totalCount
                paginationBar7.handlePagination7(paginationBar7.totalCount7);
            },
            error: function (xhr, status, error) {
                console.error('Search failed:', error);
            }
        });
    },

    handlePagination7: function (totalCount7) {
        const take = paginationBar7.pagination7.take;
        console.log('take' ,take)
        const maxIndex = Math.ceil(totalCount7 / take);

      

        // Enable/disable navigation buttons
        toolPaginationFirst7.setEnabled(paginationBar7.pagination7.index > 1);
        toolPaginationPrev7.setEnabled(paginationBar7.pagination7.index > 1);
        toolPaginationNext7.setEnabled(paginationBar7.pagination7.index < maxIndex);
        toolPaginationLast7.setEnabled(paginationBar7.pagination7.index < maxIndex);

        // Clear old pagination buttons
        toolPaginationPages7.destroyItems();

        const maxItems = paginationBar7.configuration7.maxNumberOfButtons;
        const startItem = Math.max(1, paginationBar7.pagination7.index - Math.floor(maxItems / 2));
        const endItem = Math.min(maxIndex, startItem + maxItems - 1);



            
            for (let i = startItem; i <= endItem; i++) {
            toolPaginationPages7.addItem(new sap.m.SegmentedButtonItem({
                text: i.toString(),
                key: i,
                 press: function () {
                     paginationBar7.pagination7.index = i
                        paginationBar7.run7();
                }
            }));
        }

        toolPaginationPages7.setSelectedKey(paginationBar7.pagination7.index);
        toolPaginationTitle7.setNumber(`${paginationBar7.pagination7.index} / ${maxIndex}`);
    },
};

// Initialize and fetch data for the first time
// paginationBar7.run7(true);
// paginationBar2.searchCreateAirport(true)
