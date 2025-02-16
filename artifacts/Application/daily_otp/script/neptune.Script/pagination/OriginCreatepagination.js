var paginationBar = {
    configuration: {
        maxNumberOfButtons: 6, // Max pagination buttons visible
    },
    pagination: {
        take: 10, // Items per page
        index: 1, // Current page index
        count: 1, // Total number of pages (calculated)
    },
    totalCount: 0, // Total number of items
    isSearchMode: false, // Flag to track search mode

    // Run in default mode
    run1: function () {
        paginationBar.isSearchMode = false; // Disable search mode
        paginationBar.pagination.index = 1; // Reset to the first page
        paginationBar.executeFetch();
    },

    // Search and create origin (reset the index when search is triggered)
    searchCreateOrigin: function (keepIndex) {
        const searchValue = SearchField2.getValue().trim(); // Get search value

        if (!searchValue) {
            // If search field is empty, fallback to default mode
            paginationBar.run1();
            return;
        }

        paginationBar.isSearchMode = true; // Enable search mode

        // Reset to the first page when search is performed
        paginationBar.pagination.index = 1; // Reset to the first page

        if (!keepIndex) {
            paginationBar.pagination.index = 1; // Ensure the first page is shown when search is done
        }

        // Fetch data for the search and update the UI
        paginationBar.executeFetch();
    },

    // Update pagination UI after index reset or changes
    updatePaginationUI1: function () {
        const take = paginationBar.pagination.take;
        const maxIndex = Math.ceil(paginationBar.totalCount / take); // Total pages

        // Ensure index is within bounds
        paginationBar.pagination.index = Math.min(paginationBar.pagination.index, maxIndex);
        if (paginationBar.pagination.index < 1) {
            paginationBar.pagination.index = 1;
        }

        // Update button states
        toolPaginationFirst1.setEnabled(paginationBar.pagination.index > 1);
        toolPaginationPrev1.setEnabled(paginationBar.pagination.index > 1);
        toolPaginationNext1.setEnabled(paginationBar.pagination.index < maxIndex);
        toolPaginationLast1.setEnabled(paginationBar.pagination.index < maxIndex);

        // Update page numbers
        toolPaginationPages1.destroyItems();

        const maxItems = paginationBar.configuration.maxNumberOfButtons;
        const startItem = Math.max(1, paginationBar.pagination.index - Math.floor(maxItems / 2));
        const endItem = Math.min(maxIndex, startItem + maxItems - 1);

        for (let i = startItem; i <= endItem; i++) {
            toolPaginationPages1.addItem(new sap.m.SegmentedButtonItem({
                text: i.toString(),
                key: i,
                press: function () {
                    if (paginationBar.pagination.index !== i) {
                        paginationBar.pagination.index = i; // Update the index
                        paginationBar.handleModePagination1(); // Fetch data for current mode
                        paginationBar.updatePaginationUI1(); // Reflect UI changes
                    }
                }
            }));
        }

        // Ensure the correct page is selected in the UI
        toolPaginationPages1.setSelectedKey(paginationBar.pagination.index);
        toolPaginationTitle1.setNumber(`${paginationBar.pagination.index} / ${maxIndex}`); // Update pagination title
    },

    // Fetch data (shared logic for both modes)
    executeFetch: function () {
        const index = parseInt(paginationBar.pagination.index, 10);
        const take = parseInt(paginationBar.pagination.take, 10);
        const skip = take * (index - 1);

        const url = paginationBar.isSearchMode
            ? `http://localhost:8080/api/serverscript/cabserverside/AirportSearch`
            : `http://localhost:8080/api/serverscript/cabserverside/Airport`;

        const data = paginationBar.isSearchMode
            ? { countryname: SearchField2.getValue(), take, skip }
            : { take, skip };

        // AJAX call
        $.ajax({
            url: url,
            method: 'POST',
            data: data,
            success: function (response) {
                console.log('API response:', response);

                if (response && Array.isArray(response.data)) {
                    modelTable20.setData(response.data); // Update table
                    paginationBar.totalCount = response.totalCount || 0; // Update total count
                    // Update pagination UI to reflect the new search results
                    paginationBar.updatePaginationUI1();
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
        paginationBar.executeFetch();
        paginationBar.updatePaginationUI1();
    },
};

// Initial call
paginationBar.run1(true);
