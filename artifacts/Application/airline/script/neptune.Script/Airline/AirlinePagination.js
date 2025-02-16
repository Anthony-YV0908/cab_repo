









var paginationBar4 = {
    configuration4: {
        maxNumberOfButtons: 6, // Max pagination buttons visible
    },
    pagination4: {
        take: 10, // Items per page
        index: 1, // Current page index
        count: 1, // Total number of pages (calculated)
    },
    totalCount4: 0, // Total number of items
    isSearchMode4: false, // Flag to track search mode

    // Run in default mode
    run4: function () {
        paginationBar4.isSearchMode4 = false; // Disable search mode
        paginationBar4.pagination4.index = 1; // Reset to the first page
        paginationBar4.executeFetch4();
    },

    // Search and create origin (reset the index when search is triggered)
    searchAirline: function (keepIndex) {
        const searchValue = SearchField14.getValue().trim(); // Get search value

        if (!searchValue) {
            // If search field is empty, fallback to default mode
            paginationBar4.run4();
            return;
        }

        paginationBar4.isSearchMode4 = true; // Enable search mode

        // Reset to the first page when search is performed
        paginationBar4.pagination4.index = 1; // Reset to the first page

        if (!keepIndex) {
            paginationBar4.pagination4.index = 1; // Ensure the first page is shown when search is done
        }

        // Fetch data for the search and update the UI
        paginationBar4.executeFetch4();
    },

    // Update pagination UI after index reset or changes
    updatePaginationUI4: function () {
        const take = paginationBar4.pagination4.take;
        const maxIndex = Math.ceil(paginationBar4.totalCount4 / take); // Total pages

        // Ensure index is within bounds
        paginationBar4.pagination4.index = Math.min(paginationBar4.pagination4.index, maxIndex);
        if (paginationBar4.pagination4.index < 1) {
            paginationBar4.pagination4.index = 1;
        }

        // Update button states
        toolPaginationFirst7.setEnabled(paginationBar4.pagination4.index > 1);
        toolPaginationPrev7.setEnabled(paginationBar4.pagination4.index > 1);
        toolPaginationNext7.setEnabled(paginationBar4.pagination4.index < maxIndex);
        toolPaginationLast7.setEnabled(paginationBar4.pagination4.index < maxIndex);

        // Update page numbers
        toolPaginationPages7.destroyItems();

        const maxItems = paginationBar4.configuration4.maxNumberOfButtons;
        const startItem = Math.max(1, paginationBar4.pagination4.index - Math.floor(maxItems / 2));
        const endItem = Math.min(maxIndex, startItem + maxItems - 1);

        for (let i = startItem; i <= endItem; i++) {
            toolPaginationPages7.addItem(new sap.m.SegmentedButtonItem({
                text: i.toString(),
                key: i,
                press: function () {
                    if (paginationBar4.pagination4.index !== i) {
                        paginationBar4.pagination4.index = i; // Update the index
                        paginationBar4.handleModePagination4(); // Fetch data for current mode
                        paginationBar4.updatePaginationUI4(); // Reflect UI changes
                    }
                }
            }));
        }

        // Ensure the correct page is selected in the UI
        toolPaginationPages7.setSelectedKey(paginationBar4.pagination4.index);
        toolPaginationTitle7.setNumber(`${paginationBar4.pagination4.index} / ${maxIndex}`); // Update pagination title
    },

    // Fetch data (shared logic for both modes)
    executeFetch4: function () {
        const index = parseInt(paginationBar4.pagination4.index, 10);
        const take = parseInt(paginationBar4.pagination4.take, 10);
        const skip = take * (index - 1);

        const url = paginationBar4.isSearchMode4
            ? `http://localhost:8080/api/serverscript/cabserverside/AirlineSearch`
            : `http://localhost:8080/api/serverscript/cabserverside/Airline`;

        const data = paginationBar4.isSearchMode4
            ? { countryname: SearchField14.getValue(), take, skip }
            : { take, skip };

        // AJAX call
        $.ajax({
            url: url,
            method: 'POST',
            data: data,
            success: function (response) {
                console.log('API response:', response);

                if (response && Array.isArray(response.data)) {
                    modelTable5.setData(response.data); // Update table
                    paginationBar4.totalCount4 = response.totalCount || 0; // Update total count
                    // Update pagination UI to reflect the new search results
                    paginationBar4.updatePaginationUI4();
                } else {
                    console.error('Invalid response:', response);
                }
            },
            error: function (xhr, status, error) {
                console.error('API call failed:', error);
            }
        });
    },


    handleModePagination4: function () {
        paginationBar4.executeFetch4();
        paginationBar4.updatePaginationUI4();
    },
};

// Initial call
paginationBar4.run4(true);









 





