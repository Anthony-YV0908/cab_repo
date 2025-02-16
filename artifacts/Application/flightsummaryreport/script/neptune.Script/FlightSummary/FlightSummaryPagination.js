// var paginationBar = {
//     configuration: {
//         maxNumberOfButtons: 6,
//     },
//     pagination: {
//         take: 10, // Number of records per page
//         index: 1,  // Current page index (starts from 1)
//         count: 1,  // Total count of records (to be updated dynamically)
//     },

//     totalCount1: 0,


//     run: function () {


//         var index = parseInt(paginationBar.pagination.index, 10);
//         var takePagination = parseInt(paginationBar.pagination.take, 10);
//         var skipPagination = takePagination * (paginationBar.pagination.index - 1);
//       const url = `http://localhost:8080/api/serverscript/cabserverside/monthly_otp`;


//          var month = PerMonthly.getValue(); 
//          var year = Year.getValue(); 
//         //  var airline = AirlineInput.getValue() 

//         // Set the flag to indicate API call in progress
//         paginationBar.isApiCalled = true;

     

//         $.ajax({
//             type: 'POST',
//             url: url,
//             data: {Month:month,Year:year,  take:takePagination, skip:skipPagination }, // Send `take` and `skip` as query parameters
//             success: function (response) {
//                console.log("API response:", response.data);

//                 if (response && Array.isArray(response.data)) {
//                     modelTable.setData(response.data);
//                     console.log("Data appended to the table:", response.data);
//                 } else {
//                     console.log("No data returned.");
//                 }

//                 paginationBar.totalCount1 = response.totalCount || 0; // Update global totalCount
//                 paginationBar.handlePagination(paginationBar.totalCount1);
//             },

            
//             error: function (error) {
//                 console.error('Error during API call:', error);
//             },
//             complete: function () {
//                 // Reset the flag after the API call
//                 paginationBar.isApiCalled = false;
//             },
//         });
//     },

//     searchAirport: function() 
//     { 
//         let search = SearchField;
//         let searchValue = search.getValue();

//         // Calculate 'take' and 'skip' for pagination
//         var index = parseInt(paginationBar.pagination.index, 10); // Current page index
//         var take = parseInt(paginationBar.pagination.take, 10);  // Number of records per page
//         var skip = take * index; // Calculate skip based on current page

//       const url = `http://localhost:8080/api/serverscript/cabserverside/monthly_otp`;

//         $.ajax({
//             url: url,
//             method: 'POST',
//               data: {
//                 countryname: searchValue,
//                 take: take,
//                 skip: skip
//             },
//             success: function (response) {
//                 console.log('This is the search response', response);

//                 console.log('this is total count',response.totalCount)

//                 if (response && Array.isArray(response.data)) {
//                     modelTable.setData(response.data);
//                     console.log("Data appended to the table:", response.data);
//                 } else {
//                     console.log("No data returned.");
//                 }

//                 paginationBar.totalCount1 = response.totalCount || 0; // Update global totalCount
//                 paginationBar.handlePagination(paginationBar.totalCount1);
//             },
//             error: function (xhr, status, error) {
//                 console.error('Search failed:', error);
//             }
//         });
//     },

//     handlePagination: function (totalCount1) {
//         const take = paginationBar.pagination.take;
//         console.log('take' ,take)
//         const maxIndex = Math.ceil(totalCount1 / take);

      

//         // Enable/disable navigation buttons
//         toolPaginationFirst.setEnabled(paginationBar.pagination.index > 1);
//         toolPaginationPrev.setEnabled(paginationBar.pagination.index > 1);
//         toolPaginationNext.setEnabled(paginationBar.pagination.index < maxIndex);
//         toolPaginationLast.setEnabled(paginationBar.pagination.index < maxIndex);

//         // Clear old pagination buttons
//         toolPaginationPages.destroyItems();

//         const maxItems = paginationBar.configuration.maxNumberOfButtons;
//         const startItem = Math.max(1, paginationBar.pagination.index - Math.floor(maxItems / 2));
//         const endItem = Math.min(maxIndex, startItem + maxItems - 1);

//         for (let i = startItem; i <= endItem; i++) {
//             toolPaginationPages.addItem(new sap.m.SegmentedButtonItem({
//                 text: i.toString(),
//                 key: i,
//                  press: function () {
//                      paginationBar.pagination.index = i;
//                     paginationBar.run();
                  
                   
//                 }
//             }));
//         }

//         toolPaginationPages.setSelectedKey(paginationBar.pagination.index);
//         toolPaginationTitle.setNumber(`${paginationBar.pagination.index} / ${maxIndex}`);
//     },
// };

// // Initialize and fetch data for the first time
// // paginationBar.run(true);



























var paginationBar1 = {
    configuration1: {
        maxNumberOfButtons: 6, // Max pagination buttons visible
    },
    pagination1: {
        take: 10, // Items per page
        index: 1, // Current page index
        count: 1, // Total number of pages (calculated)
    },
    totalCount1: 0, // Total number of items
    isSearchMode1: false, // Flag to track search mode

    // Run in default mode
    run1: function () {
        paginationBar1.isSearchMode1 = false; // Disable search mode
        paginationBar1.pagination1.index = 1; // Reset to the first page
        paginationBar1.executeFetch1();
    },

    // Search and create origin (reset the index when search is triggered)
    searchAirport: function (keepIndex) {
        const searchValue = SearchField.getValue().trim(); // Get search value

        if (!searchValue) {
            // If search field is empty, fallback to default mode
            paginationBar1.run1();
            return;
        }

        paginationBar1.isSearchMode1 = true; // Enable search mode

        // Reset to the first page when search is performed
        paginationBar1.pagination1.index = 1; // Reset to the first page

        if (!keepIndex) {
            paginationBar1.pagination1.index = 1; // Ensure the first page is shown when search is done
        }

        // Fetch data for the search and update the UI
        paginationBar1.executeFetch1();
    },

    // Update pagination UI after index reset or changes
    updatePaginationUI1: function () {
        const take = paginationBar1.pagination1.take;
        const maxIndex = Math.ceil(paginationBar1.totalCount1 / take); // Total pages

        // Ensure index is within bounds
        paginationBar1.pagination1.index = Math.min(paginationBar1.pagination1.index, maxIndex);
        if (paginationBar1.pagination1.index < 1) {
            paginationBar1.pagination1.index = 1;
        }

        // Update button states
        toolPaginationFirst.setEnabled(paginationBar1.pagination1.index > 1);
        toolPaginationPrev.setEnabled(paginationBar1.pagination1.index > 1);
        toolPaginationNext.setEnabled(paginationBar1.pagination1.index < maxIndex);
        toolPaginationLast.setEnabled(paginationBar1.pagination1.index < maxIndex);

        // Update page numbers
        toolPaginationPages.destroyItems();

        const maxItems = paginationBar1.configuration1.maxNumberOfButtons;
        const startItem = Math.max(1, paginationBar1.pagination1.index - Math.floor(maxItems / 2));
        const endItem = Math.min(maxIndex, startItem + maxItems - 1);

        for (let i = startItem; i <= endItem; i++) {
            toolPaginationPages.addItem(new sap.m.SegmentedButtonItem({
                text: i.toString(),
                key: i,
                press: function () {
                    if (paginationBar1.pagination1.index !== i) {
                        paginationBar1.pagination1.index = i; // Update the index
                        paginationBar1.handleModePagination1(); // Fetch data for current mode
                        paginationBar1.updatePaginationUI1(); // Reflect UI changes
                    }
                }
            }));
        }

        // Ensure the correct page is selected in the UI
        toolPaginationPages.setSelectedKey(paginationBar1.pagination1.index);
        toolPaginationTitle.setNumber(`${paginationBar1.pagination1.index} / ${maxIndex}`); // Update pagination title
    },

    // Fetch data (shared logic for both modes)
    executeFetch1: function () {
        const index = parseInt(paginationBar1.pagination1.index, 10);
        const take = parseInt(paginationBar1.pagination1.take, 10);
        const skip = take * (index - 1);

            var month = PerMonthly.getValue(); 
            var year = Year.getValue(); 

        const url = paginationBar1.isSearchMode1
            ? `http://localhost:8080/api/serverscript/cabserverside/MonthlyOTPSearch`
            : `http://localhost:8080/api/serverscript/cabserverside/monthly_otp`;

        const data = paginationBar1.isSearchMode1
            ? { take, skip }
            : {Month:month,Year:year,  take, skip };

        console.log('data flight summary', data) 

        // AJAX call
        $.ajax({
            url: url,
            method: 'POST',
            data: data,
            success: function (response) {
                console.log('API response:', response);

                if (response && Array.isArray(response.data)) {
                    modelTable.setData(response.data); // Update table
                    paginationBar1.totalCount1 = response.totalCount || 0; // Update total count
                    // Update pagination UI to reflect the new search results
                    paginationBar1.updatePaginationUI1();
                } else {
                    console.error('Invalid response:', response);
                }
            },
            error: function (xhr, status, error) {
                console.error('API call failed:', error);
            }
        });
    },

    // Handle pagination logic based on mode
    handleModePagination1: function () {
        paginationBar1.executeFetch1();
        paginationBar1.updatePaginationUI1();
    },
};

// Initial call
paginationBar1.run1(true);








