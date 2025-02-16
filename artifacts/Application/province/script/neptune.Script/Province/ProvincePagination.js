
var paginationBar8 = {
    configuration8: {
        maxNumberOfButtons: 6, // Max pagination buttons visible
    },
    pagination8: {
        take: 10, // Items per page
        index: 1, // Current page index
        count: 1, // Total number of pages (calculated)
    },
    totalCount8: 0, // Total number of items
    isSearchMode8: false, // Flag to track search mode

    // Run in default mode
    run8: function () {
        paginationBar8.isSearchMode8 = false; // Disable search mode
        paginationBar8.pagination8.index = 1; // Reset to the first page
        paginationBar8.executeFetch8();
    },

    // Search and create origin (reset the index when search is triggered)
    searchProvince: function (keepIndex) {
        const searchValue = SearchField8.getValue().trim(); // Get search value

        if (!searchValue) {
            // If search field is empty, fallback to default mode
            paginationBar8.run8();
            return;
        }

        paginationBar8.isSearchMode8 = true; // Enable search mode

        // Reset to the first page when search is performed
        paginationBar8.pagination8.index = 1; // Reset to the first page

        if (!keepIndex) {
            paginationBar8.pagination8.index = 1; // Ensure the first page is shown when search is done
        }

        // Fetch data for the search and update the UI
        paginationBar8.executeFetch8();
    },

    // Update pagination UI after index reset or changes
    updatePaginationUI8: function () {
        const take = paginationBar8.pagination8.take;
        const maxIndex = Math.ceil(paginationBar8.totalCount8 / take); // Total pages

        // Ensure index is within bounds
        paginationBar8.pagination8.index = Math.min(paginationBar8.pagination8.index, maxIndex);
        if (paginationBar8.pagination8.index < 1) {
            paginationBar8.pagination8.index = 1;
        }

        // Update button states
        toolPaginationFirst4.setEnabled(paginationBar8.pagination8.index > 1);
        toolPaginationPrev4.setEnabled(paginationBar8.pagination8.index > 1);
        toolPaginationNext4.setEnabled(paginationBar8.pagination8.index < maxIndex);
        toolPaginationLast4.setEnabled(paginationBar8.pagination8.index < maxIndex);

        // Update page numbers
        toolPaginationPages4.destroyItems();

        const maxItems = paginationBar8.configuration8.maxNumberOfButtons;
        const startItem = Math.max(1, paginationBar8.pagination8.index - Math.floor(maxItems / 2));
        const endItem = Math.min(maxIndex, startItem + maxItems - 1);

        for (let i = startItem; i <= endItem; i++) {
            toolPaginationPages4.addItem(new sap.m.SegmentedButtonItem({
                text: i.toString(),
                key: i,
                press: function () {
                    if (paginationBar8.pagination8.index !== i) {
                        paginationBar8.pagination8.index = i; // Update the index
                        paginationBar8.handleModePagination8(); // Fetch data for current mode
                        paginationBar8.updatePaginationUI8(); // Reflect UI changes
                    }
                }
            }));
        }

        // Ensure the correct page is selected in the UI
        toolPaginationPages4.setSelectedKey(paginationBar8.pagination8.index);
        toolPaginationTitle4.setNumber(`${paginationBar8.pagination8.index} / ${maxIndex}`); // Update pagination title
    },

    // Fetch data (shared logic for both modes)
    executeFetch8: function () {
        const index = parseInt(paginationBar8.pagination8.index, 10);
        const take = parseInt(paginationBar8.pagination8.take, 10);
        const skip = take * (index - 1);

        const url = paginationBar8.isSearchMode8
            ? `http://localhost:8080/api/serverscript/cabserverside/ProvincialSearch  `
            : `http://localhost:8080/api/serverscript/cabserverside/Province`;

        const data = paginationBar8.isSearchMode8
            ? { provincename: SearchField8.getValue(), take, skip }
            : { take, skip };

        // AJAX call
        $.ajax({
            url: url,
            method: 'POST',
            data: data,
            success: function (response) {
                console.log('API response:', response);

                if (response && Array.isArray(response.data)) {
                    modelTable3.setData(response.data); // Update table
                    paginationBar8.totalCount8 = response.totalCount || 0; // Update total count
                    // Update pagination UI to reflect the new search results
                    paginationBar8.updatePaginationUI8();
                } else {
                    console.error('Invalid response:', response);
                }
            },
            error: function (xhr, status, error) {
                console.error('API call failed:', error);
            }
        });
    },


    handleModePagination8: function () {
        paginationBar8.executeFetch8();
        paginationBar8.updatePaginationUI8();
    },
};

// Initial call
paginationBar8.run8(true);









 












 








