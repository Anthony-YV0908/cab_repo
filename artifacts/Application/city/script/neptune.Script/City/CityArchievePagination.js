var paginationBar11 = {
    configuration11: {
        maxNumberOfButtons: 6, // Max pagination buttons visible
    },
    pagination11: {
        take: 10, // Items per page
        index: 1, // Current page index
        count: 1, // Total number of pages (calculated)
    },
    totalCount11: 0, // Total number of items
    isSearchMode11: false, // Flag to track search mode

    // Run in default mode
    run11: function () {
        paginationBar11.isSearchMode11 = false; // Disable search mode
        paginationBar11.pagination11.index = 1; // Reset to the first page
        paginationBar11.executeFetch11();
    },

    // Search and create origin (reset the index when search is triggered)
    searchCityArchive: function (keepIndex) {
        const searchValue = SearchField7.getValue().trim(); // Get search value

        if (!searchValue) {
            // If search field is empty, fallback to default mode
            paginationBar11.run11();
            return;
        }

        paginationBar11.isSearchMode11 = true; // Enable search mode

        // Reset to the first page when search is performed
        paginationBar11.pagination11.index = 1; // Reset to the first page

        if (!keepIndex) {
            paginationBar11.pagination11.index = 1; // Ensure the first page is shown when search is done
        }

        // Fetch data for the search and update the UI
        paginationBar11.executeFetch11();
    },

    // Update pagination UI after index reset or changes
    updatePaginationUI11: function () {
        const take = paginationBar11.pagination11.take;
        const maxIndex = Math.ceil(paginationBar11.totalCount11 / take); // Total pages

        // Ensure index is within bounds
        paginationBar11.pagination11.index = Math.min(paginationBar11.pagination11.index, maxIndex);
        if (paginationBar11.pagination11.index < 1) {
            paginationBar11.pagination11.index = 1;
        }

        // Update button states
        toolPaginationFirst10.setEnabled(paginationBar11.pagination11.index > 1);
        toolPaginationPrev10.setEnabled(paginationBar11.pagination11.index > 1);
        toolPaginationNext10.setEnabled(paginationBar11.pagination11.index < maxIndex);
        toolPaginationLast10.setEnabled(paginationBar11.pagination11.index < maxIndex);

        // Update page numbers
        toolPaginationPages10.destroyItems();

        const maxItems = paginationBar11.configuration11.maxNumberOfButtons;
        const startItem = Math.max(1, paginationBar11.pagination11.index - Math.floor(maxItems / 2));
        const endItem = Math.min(maxIndex, startItem + maxItems - 1);

        for (let i = startItem; i <= endItem; i++) {
            toolPaginationPages10.addItem(new sap.m.SegmentedButtonItem({
                text: i.toString(),
                key: i,
                press: function () {
                    if (paginationBar11.pagination11.index !== i) {
                        paginationBar11.pagination11.index = i; // Update the index
                        paginationBar11.handleModePagination11(); // Fetch data for current mode
                        paginationBar11.updatePaginationUI11(); // Reflect UI changes
                    }
                }
            }));
        }

        // Ensure the correct page is selected in the UI
        toolPaginationPages10.setSelectedKey(paginationBar11.pagination11.index);
        toolPaginationTitle10.setNumber(`${paginationBar11.pagination11.index} / ${maxIndex}`); // Update pagination title
    },

    // Fetch data (shared logic for both modes)
    executeFetch11: function () {
        const index = parseInt(paginationBar11.pagination11.index, 10);
        const take = parseInt(paginationBar11.pagination11.take, 10);
        const skip = take * (index - 1);

        const url = paginationBar11.isSearchMode11
            ? `http://localhost:8080/api/serverscript/cabserverside/CitySearchArchive`
            : `http://localhost:8080/api/serverscript/cabserverside/CityArchive`;

        const data = paginationBar11.isSearchMode11
            ? { statename: SearchField7.getValue(), take, skip }
            : { take, skip };

        // AJAX call
        $.ajax({
            url: url,
            method: 'POST',
            data: data,
            success: function (response) {
                console.log('API response:', response);

                if (response && Array.isArray(response.data)) {
                    modelTable10.setData(response.data); // Update table
                    paginationBar11.totalCount11 = response.totalCount || 0; // Update total count
                    // Update pagination UI to reflect the new search results
                    paginationBar11.updatePaginationUI11();
                } else {
                    console.error('Invalid response:', response);
                }
            },
            error: function (xhr, status, error) {
                console.error('API call failed:', error);
            }
        });
    },


    handleModePagination11: function () {
        paginationBar11.executeFetch11();
        paginationBar11.updatePaginationUI11();
    },
};

// Initial call
paginationBar11.run11(true);









 











 
