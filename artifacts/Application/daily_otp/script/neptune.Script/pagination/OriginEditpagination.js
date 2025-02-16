



var paginationBar6 = {
    configuration6: {
        maxNumberOfButtons: 6, // Max pagination buttons visible
    },
    pagination6: {
        take: 10, // Items per page
        index: 1, // Current page index
        count: 1, // Total number of pages (calculated)
    },
    totalCount6: 0, // Total number of items
    isSearchMode4: false, // Flag to track search mode

    // Run in default mode
    run6: function () {
        paginationBar6.isSearchMode4 = false; // Disable search mode
        paginationBar6.pagination6.index = 1; // Reset to the first page
        paginationBar6.executeFetch5();
    },

    // Search and create origin (reset the index when search is triggered)
    searchEditOrigin: function (keepIndex) {
        const searchValue = SearchField6.getValue().trim(); // Get search value

        if (!searchValue) {
            // If search field is empty, fallback to default mode
            paginationBar6.run6();
            return;
        }

        paginationBar6.isSearchMode4 = true; // Enable search mode

        // Reset to the first page when search is performed
        paginationBar6.pagination6.index = 1; // Reset to the first page

        if (!keepIndex) {
            paginationBar6.pagination6.index = 1; // Ensure the first page is shown when search is done
        }

        // Fetch data for the search and update the UI
        paginationBar6.executeFetch5();
    },

    // Update pagination UI after index reset or changes
    updatePaginationUI5: function () {
        const take = paginationBar6.pagination6.take;
        const maxIndex = Math.ceil(paginationBar6.totalCount6 / take); // Total pages

        // Ensure index is within bounds
        paginationBar6.pagination6.index = Math.min(paginationBar6.pagination6.index, maxIndex);
        if (paginationBar6.pagination6.index < 1) {
            paginationBar6.pagination6.index = 1;
        }

        // Update button states
        toolPaginationFirst7.setEnabled(paginationBar6.pagination6.index > 1);
        toolPaginationPrev7.setEnabled(paginationBar6.pagination6.index > 1);
        toolPaginationNext7.setEnabled(paginationBar6.pagination6.index < maxIndex);
        toolPaginationLast7.setEnabled(paginationBar6.pagination6.index < maxIndex);

        // Update page numbers
        toolPaginationPages7.destroyItems();

        const maxItems = paginationBar6.configuration6.maxNumberOfButtons;
        const startItem = Math.max(1, paginationBar6.pagination6.index - Math.floor(maxItems / 2));
        const endItem = Math.min(maxIndex, startItem + maxItems - 1);

        for (let i = startItem; i <= endItem; i++) {
            toolPaginationPages7.addItem(new sap.m.SegmentedButtonItem({
                text: i.toString(),
                key: i,
                press: function () {
                    if (paginationBar6.pagination6.index !== i) {
                        paginationBar6.pagination6.index = i; // Update the index
                        paginationBar6.handleModePagination5(); // Fetch data for current mode
                        paginationBar6.updatePaginationUI5(); // Reflect UI changes
                    }
                }
            }));
        }

        // Ensure the correct page is selected in the UI
        toolPaginationPages7.setSelectedKey(paginationBar6.pagination6.index);
        toolPaginationTitle7.setNumber(`${paginationBar6.pagination6.index} / ${maxIndex}`); // Update pagination title
    },

    // Fetch data (shared logic for both modes)
    executeFetch5: function () {
        const index = parseInt(paginationBar6.pagination6.index, 10);
        const take = parseInt(paginationBar6.pagination6.take, 10);
        const skip = take * (index - 1);

        const url = paginationBar6.isSearchMode4
            ? `http://localhost:8080/api/serverscript/cabserverside/AirportSearch`
            : `http://localhost:8080/api/serverscript/cabserverside/Airport`;

        const data = paginationBar6.isSearchMode4
            ? { countryname: SearchField6.getValue(), take, skip }
            : { take, skip };

        // AJAX call
        $.ajax({
            url: url,
            method: 'POST',
            data: data,
            success: function (response) {
                console.log('API response:', response);

                if (response && Array.isArray(response.data)) {
                    modelTable24.setData(response.data); // Update table
                    paginationBar6.totalCount6 = response.totalCount || 0; // Update total count
                    // Update pagination UI to reflect the new search results
                    paginationBar6.updatePaginationUI5();
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
    handleModePagination5: function () {
        paginationBar6.executeFetch5();
        paginationBar6.updatePaginationUI5();
    },
};

// Initial call
paginationBar6.run6(true);

