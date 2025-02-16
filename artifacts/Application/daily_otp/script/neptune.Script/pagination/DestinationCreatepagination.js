

var paginationBar3 = {
    configuration3: {
        maxNumberOfButtons: 6, // Max pagination buttons visible
    },
    pagination3: {
        take: 10, // Items per page
        index: 1, // Current page index
        count: 1, // Total number of pages (calculated)
    },
    totalCount3: 0, // Total number of items
    isSearchMode3: false, // Flag to track search mode

    // Run in default mode
    run3: function () {
        paginationBar3.isSearchMode3 = false; // Disable search mode
        paginationBar3.pagination3.index = 1; // Reset to the first page
        paginationBar3.executeFetch1();
    },

    // Search and create origin (reset the index when search is triggered)
    searchCreateDestination: function (keepIndex) {
        const searchValue = SearchField3.getValue().trim(); // Get search value

        if (!searchValue) {
            // If search field is empty, fallback to default mode
            paginationBar3.run3();
            return;
        }

        paginationBar3.isSearchMode3 = true; // Enable search mode

        // Reset to the first page when search is performed
        paginationBar3.pagination3.index = 1; // Reset to the first page

        if (!keepIndex) {
            paginationBar3.pagination3.index = 1; // Ensure the first page is shown when search is done
        }

        // Fetch data for the search and update the UI
        paginationBar3.executeFetch1();
    },

    // Update pagination UI after index reset or changes
    updatePaginationUI2: function () {
        const take = paginationBar3.pagination3.take;
        const maxIndex = Math.ceil(paginationBar3.totalCount3 / take); // Total pages

        // Ensure index is within bounds
        paginationBar3.pagination3.index = Math.min(paginationBar3.pagination3.index, maxIndex);
        if (paginationBar3.pagination3.index < 1) {
            paginationBar3.pagination3.index = 1;
        }

        // Update button states
        toolPaginationFirst4.setEnabled(paginationBar3.pagination3.index > 1);
        toolPaginationPrev4.setEnabled(paginationBar3.pagination3.index > 1);
        toolPaginationNext4.setEnabled(paginationBar3.pagination3.index < maxIndex);
        toolPaginationLast4.setEnabled(paginationBar3.pagination3.index < maxIndex);

        // Update page numbers
        toolPaginationPages4.destroyItems();

        const maxItems = paginationBar3.configuration3.maxNumberOfButtons;
        const startItem = Math.max(1, paginationBar3.pagination3.index - Math.floor(maxItems / 2));
        const endItem = Math.min(maxIndex, startItem + maxItems - 1);

        for (let i = startItem; i <= endItem; i++) {
            toolPaginationPages4.addItem(new sap.m.SegmentedButtonItem({
                text: i.toString(),
                key: i,
                press: function () {
                    if (paginationBar3.pagination3.index !== i) {
                        paginationBar3.pagination3.index = i; // Update the index
                        paginationBar3.handleModePagination2(); // Fetch data for current mode
                        paginationBar3.updatePaginationUI2(); // Reflect UI changes
                    }
                }
            }));
        }

        // Ensure the correct page is selected in the UI
        toolPaginationPages4.setSelectedKey(paginationBar3.pagination3.index);
        toolPaginationTitle4.setNumber(`${paginationBar3.pagination3.index} / ${maxIndex}`); // Update pagination title
    },

    // Fetch data (shared logic for both modes)
executeFetch1: function () {
    const index = parseInt(paginationBar3.pagination3.index, 10);
    const take = parseInt(paginationBar3.pagination3.take, 10);
    const skip = take * (index - 1);

    const url = paginationBar3.isSearchMode3
        ? `http://localhost:8080/api/serverscript/cabserverside/AirportSearch`
        : `http://localhost:8080/api/serverscript/cabserverside/Airport`;

    const data = paginationBar3.isSearchMode3
        ? { countryname: SearchField3.getValue(), take, skip }
        : { take, skip };

  
        // AJAX call
        $.ajax({
            url: url,
            method: 'POST',
            data: data,
            success: function (response) {
                console.log('API response:', response);

                if (response && Array.isArray(response.data)) {
                    modelTable21.setData(response.data); // Update table
                    paginationBar3.totalCount3 = response.totalCount || 0; // Update total count
                    // Update pagination UI to reflect the new search results
                    paginationBar3.updatePaginationUI2();
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
    handleModePagination2: function () {
        paginationBar3.executeFetch1();
        paginationBar3.updatePaginationUI2();
    },
};

// Initial call
paginationBar3.run3(true);

