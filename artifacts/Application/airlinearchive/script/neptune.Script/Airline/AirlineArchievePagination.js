





var paginationBar12 = {
    configuration12: {
        maxNumberOfButtons: 6, // Max pagination buttons visible
    },
    pagination12: {
        take: 10, // Items per page
        index: 1, // Current page index
        count: 1, // Total number of pages (calculated)
    },
    totalCount12: 0, // Total number of items
    isSearchMode12: false, // Flag to track search mode

    // Run in default mode
    run12: function () {
        paginationBar12.isSearchMode12 = false; // Disable search mode
        paginationBar12.pagination12.index = 1; // Reset to the first page
        paginationBar12.executeFetch12();
    },

    // Search and create origin (reset the index when search is triggered)
    searchAirlineArchive: function (keepIndex) {
        const searchValue = SearchField15.getValue().trim(); // Get search value

        if (!searchValue) {
            // If search field is empty, fallback to default mode
            paginationBar12.run12();
            return;
        }

        paginationBar12.isSearchMode12 = true; // Enable search mode

        // Reset to the first page when search is performed
        paginationBar12.pagination12.index = 1; // Reset to the first page

        if (!keepIndex) {
            paginationBar12.pagination12.index = 1; // Ensure the first page is shown when search is done
        }

        // Fetch data for the search and update the UI
        paginationBar12.executeFetch12();
    },

    // Update pagination UI after index reset or changes
    updatePaginationUI12: function () {
        const take = paginationBar12.pagination12.take;
        const maxIndex = Math.ceil(paginationBar12.totalCount12 / take); // Total pages

        // Ensure index is within bounds
        paginationBar12.pagination12.index = Math.min(paginationBar12.pagination12.index, maxIndex);
        if (paginationBar12.pagination12.index < 1) {
            paginationBar12.pagination12.index = 1;
        }

        // Update button states
        toolPaginationFirst15.setEnabled(paginationBar12.pagination12.index > 1);
        toolPaginationPrev15.setEnabled(paginationBar12.pagination12.index > 1);
        toolPaginationNext15.setEnabled(paginationBar12.pagination12.index < maxIndex);
        toolPaginationLast15.setEnabled(paginationBar12.pagination12.index < maxIndex);

        // Update page numbers
        toolPaginationPages15.destroyItems();

        const maxItems = paginationBar12.configuration12.maxNumberOfButtons;
        const startItem = Math.max(1, paginationBar12.pagination12.index - Math.floor(maxItems / 2));
        const endItem = Math.min(maxIndex, startItem + maxItems - 1);

        for (let i = startItem; i <= endItem; i++) {
            toolPaginationPages15.addItem(new sap.m.SegmentedButtonItem({
                text: i.toString(),
                key: i,
                press: function () {
                    if (paginationBar12.pagination12.index !== i) {
                        paginationBar12.pagination12.index = i; // Update the index
                        paginationBar12.handleModePagination12(); // Fetch data for current mode
                        paginationBar12.updatePaginationUI12(); // Reflect UI changes
                    }
                }
            }));
        }

        // Ensure the correct page is selected in the UI
        toolPaginationPages15.setSelectedKey(paginationBar12.pagination12.index);
        toolPaginationTitle15.setNumber(`${paginationBar12.pagination12.index} / ${maxIndex}`); // Update pagination title
    },

    // Fetch data (shared logic for both modes)
    executeFetch12: function () {
        const index = parseInt(paginationBar12.pagination12.index, 10);
        const take = parseInt(paginationBar12.pagination12.take, 10);
        const skip = take * (index - 1);

        const url = paginationBar12.isSearchMode12
            ? `http://localhost:8080/api/serverscript/cabserverside/AirlineSearchArchive`
            : `http://localhost:8080/api/serverscript/cabserverside/AirlineArchive`;

        const data = paginationBar12.isSearchMode12
            ? { countryname: SearchField15.getValue(), take, skip }
            : { take, skip };

        // AJAX call
        $.ajax({
            url: url,
            method: 'POST',
            data: data,
            success: function (response) {
                console.log('API response:', response);

                if (response && Array.isArray(response.data)) {
                    modelTable15.setData(response.data); // Update table
                    paginationBar12.totalCount12 = response.totalCount || 0; // Update total count
                    // Update pagination UI to reflect the new search results
                    paginationBar12.updatePaginationUI12();
                } else {
                    console.error('Invalid response:', response);
                }
            },
            error: function (xhr, status, error) {
                console.error('API call failed:', error);
            }
        });
    },


    handleModePagination12: function () {
        paginationBar12.executeFetch12();
        paginationBar12.updatePaginationUI12();
    },
};

// Initial call
paginationBar12.run12(true);









 












 

