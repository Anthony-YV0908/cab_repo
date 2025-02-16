var paginationBar9 = {
    configuration9: {
        maxNumberOfButtons: 6,
    },
    pagination9: {
        take: 10, // Number of records per page
        index: 1,  // Current page index (starts from 1)
        count: 1,  // Total count of records (to be updated dynamically)
    },

    totalCount9: 0,


    run9: function () {


        var index = parseInt(paginationBar9.pagination9.index, 10);
        var takePagination = parseInt(paginationBar9.pagination9.take, 10);
        var skipPagination = takePagination * (paginationBar9.pagination9.index - 1);
      const url = `/api/serverscript/cabserverside/PerDay`;


              var perday = PerDayFlight.getValue()


              if(!perday) 
              { 
                sap.m.MessageToast.show("No day is choosen ")
                   return;
              }

  
                // Convert the selected date string into a Date object
            // const dateObj = new Date(perday);



        //   const formattedStartDate = perday.toLocaleDateString("en-US", {
        //     month: "numeric",
        //     day: "numeric",
        //     year: "2-digit",
        // })
        // .split('/')
        // .map(part => part.padStart(2, '0'))
        // .join('/');

        // Set the flag to indicate API call in progress
        paginationBar9.isApiCalled = true;

     

        $.ajax({
            type: 'POST',
            url: url,
            data: {day:perday, take:takePagination, skip:skipPagination }, // Send `take` and `skip` as query parameters
            success: function (response) {
               console.log("API response:", response.data);

                if (response && Array.isArray(response.data)) {
                    modelTable7.setData(response.data);
                    console.log("Data appended to the table:", response.data);
                } else {
                    console.log("No data returned.");
                }

                paginationBar9.totalCount9 = response.totalCount || 0; // Update global totalCount
                paginationBar9.handlePagination9(paginationBar9.totalCount9);
            },

            
            error: function (error) {
                console.error('Error during API call:', error);
            },
            complete: function () {
                // Reset the flag after the API call
                paginationBar9.isApiCalled = false;
            },
        });
    },

    searchCreateAirport: function() 
    { 
        let search = SearchField1;
        let searchValue = search.getValue();

        // Calculate 'take' and 'skip' for pagination
        var index = parseInt(paginationBar9.pagination9.index, 10); // Current page index
        var take = parseInt(paginationBar9.pagination9.take, 10);  // Number of records per page
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
                    modelTable7.setData(response.data);
                    console.log("Data appended to the table:", response.data);
                } else {
                    console.log("No data returned.");
                }

                paginationBar9.totalCount9 = response.totalCount || 0; // Update global totalCount
                paginationBa9.handlePagination9(paginationBar9.totalCount9);
            },
            error: function (xhr, status, error) {
                console.error('Search failed:', error);
            }
        });
    },

    handlePagination9: function (totalCount9) {
        const take = paginationBar9.pagination9.take;
        console.log('take' ,take)
        const maxIndex = Math.ceil(totalCount9 / take);

      

        // Enable/disable navigation buttons
        toolPaginationFirst9.setEnabled(paginationBar9.pagination9.index > 1);
        toolPaginationPrev9.setEnabled(paginationBar9.pagination9.index > 1);
        toolPaginationNext9.setEnabled(paginationBar9.pagination9.index < maxIndex);
        toolPaginationLast9.setEnabled(paginationBar9.pagination9.index < maxIndex);

        // Clear old pagination buttons
        toolPaginationPages9.destroyItems();

        const maxItems = paginationBar9.configuration9.maxNumberOfButtons;
        const startItem = Math.max(1, paginationBar9.pagination9.index - Math.floor(maxItems / 2));
        const endItem = Math.min(maxIndex, startItem + maxItems - 1);



            
            for (let i = startItem; i <= endItem; i++) {
            toolPaginationPages9.addItem(new sap.m.SegmentedButtonItem({
                text: i.toString(),
                key: i,
                 press: function () {
                     paginationBar9.pagination9.index = i
                        paginationBar9.run9();
                }
            }));
        }

        toolPaginationPages9.setSelectedKey(paginationBar9.pagination9.index);
        toolPaginationTitle9.setNumber(`${paginationBar9.pagination9.index} / ${maxIndex}`);
    },
};

// Initialize and fetch data for the first time
// paginationBar9.run9(true);
// paginationBar2.searchCreateAirport(true)
