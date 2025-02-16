



var paginationBar5 = {
    configuration5: {
        maxNumberOfButtons: 6, // Max pagination buttons visible
    },
    pagination5: {
        take: 10, // Items per page
        index: 1, // Current page index
        count: 1, // Total number of pages (calculated)
    },
    totalCount5: 0, // Total number of items
    isSearchMode7: false, // Flag to track search mode

    // Run in default mode
    run5: function () {
        paginationBar5.isSearchMode7 = false; // Disable search mode
        paginationBar5.pagination5.index = 1; // Reset to the first page
        paginationBar5.executeFetch8();
    },

    // Search and create origin (reset the index when search is triggered)
    searchEditAOC: function (keepIndex) {
        const searchValue = SearchField4.getValue().trim(); // Get search value

        if (!searchValue) {
            // If search field is empty, fallback to default mode
            paginationBar5.run5();
            return;
        }

        paginationBar5.isSearchMode7 = true; // Enable search mode

        // Reset to the first page when search is performed
        paginationBar5.pagination5.index = 1; // Reset to the first page

        if (!keepIndex) {
            paginationBar5.pagination5.index = 1; // Ensure the first page is shown when search is done
        }

        // Fetch data for the search and update the UI
        paginationBar5.executeFetch8();
    },

    // Update pagination UI after index reset or changes
    updatePaginationUI8: function () {
        const take = paginationBar5.pagination5.take;
        const maxIndex = Math.ceil(paginationBar5.totalCount5 / take); // Total pages

        // Ensure index is within bounds
        paginationBar5.pagination5.index = Math.min(paginationBar5.pagination5.index, maxIndex);
        if (paginationBar5.pagination5.index < 1) {
            paginationBar5.pagination5.index = 1;
        }

        // Update button states
        toolPaginationFirst5.setEnabled(paginationBar5.pagination5.index > 1);
        toolPaginationPrev5.setEnabled(paginationBar5.pagination5.index > 1);
        toolPaginationNext5.setEnabled(paginationBar5.pagination5.index < maxIndex);
        toolPaginationLast5.setEnabled(paginationBar5.pagination5.index < maxIndex);

        // Update page numbers
        toolPaginationPages5.destroyItems();

        const maxItems = paginationBar5.configuration5.maxNumberOfButtons;
        const startItem = Math.max(1, paginationBar5.pagination5.index - Math.floor(maxItems / 2));
        const endItem = Math.min(maxIndex, startItem + maxItems - 1);

        for (let i = startItem; i <= endItem; i++) {
            toolPaginationPages5.addItem(new sap.m.SegmentedButtonItem({
                text: i.toString(),
                key: i,
                press: function () {
                    if (paginationBar5.pagination5.index !== i) {
                        paginationBar5.pagination5.index = i; // Update the index
                        paginationBar5.handleModePagination8(); // Fetch data for current mode
                        paginationBar5.updatePaginationUI8(); // Reflect UI changes
                    }
                }
            }));
        }

        // Ensure the correct page is selected in the UI
        toolPaginationPages5.setSelectedKey(paginationBar5.pagination5.index);
        toolPaginationTitle5.setNumber(`${paginationBar5.pagination5.index} / ${maxIndex}`); // Update pagination title
    },

    // Fetch data (shared logic for both modes)
    executeFetch8: function () {
        const index = parseInt(paginationBar5.pagination5.index, 10);
        const take = parseInt(paginationBar5.pagination5.take, 10);
        const skip = take * (index - 1);

        const url = paginationBar5.isSearchMode7
            ? `http://localhost:8080/api/serverscript/cabserverside/AirportCodeSearch`
            : `http://localhost:8080/api/serverscript/cabserverside/Airline`;
        const data = paginationBar5.isSearchMode7
            ? { countryname: SearchField4.getValue(), take, skip }
            : { take, skip };

        // AJAX call
        $.ajax({
            url: url,
            method: 'POST',
            data: data,
            success: function (response) {
                console.log('API response:', response);

                if (response && Array.isArray(response.data)) {
                    modelTable22.setData(response.data); // Update table
                    paginationBar5.totalCount5 = response.totalCount || 0; // Update total count
                    // Update pagination UI to reflect the new search results
                    paginationBar5.updatePaginationUI8();
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
    handleModePagination8: function () {
        paginationBar5.executeFetch8();
        paginationBar5.updatePaginationUI8();
    },
};

// Initial call
paginationBar5.run5(true);







