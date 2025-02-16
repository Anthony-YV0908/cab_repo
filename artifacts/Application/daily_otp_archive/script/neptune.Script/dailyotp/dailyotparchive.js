








var paginationBar17 = {
    configuration17: {
        maxNumberOfButtons: 6, // Max pagination buttons visible
    },
    pagination17: {
        take: 10, // Items per page
        index: 1, // Current page index
        count: 1, // Total number of pages (calculated)
    },
    totalCount17: 0, // Total number of items
    isSearchMode17: false, // Flag to track search mode

    // Run in default mode
    run17: function () {
        paginationBar17.isSearchMode17 = false; // Disable search mode
        paginationBar17.pagination17.index = 1; // Reset to the first page
        paginationBar17.executeFetch17();
    },

    // Search and create origin (reset the index when search is triggered)
    searchProvinceArchive: function (keepIndex) {
        const searchValue = SearchField9.getValue().trim(); // Get search value

        if (!searchValue) {
            // If search field is empty, fallback to default mode
            paginationBar17.run17();
            return;
        }

        paginationBar17.isSearchMode17 = true; // Enable search mode

        // Reset to the first page when search is performed
        paginationBar17.pagination17.index = 1; // Reset to the first page

        if (!keepIndex) {
            paginationBar17.pagination17.index = 1; // Ensure the first page is shown when search is done
        }

        // Fetch data for the search and update the UI
        paginationBar17.executeFetch17();
    },

    // Update pagination UI after index reset or changes
    updatePaginationUI17: function () {
        const take = paginationBar17.pagination17.take;
        const maxIndex = Math.ceil(paginationBar17.totalCount17 / take); // Total pages

        // Ensure index is within bounds
        paginationBar17.pagination17.index = Math.min(paginationBar17.pagination17.index, maxIndex);
        if (paginationBar17.pagination17.index < 1) {
            paginationBar17.pagination17.index = 1;
        }

        // Update button states
        toolPaginationFirst16.setEnabled(paginationBar17.pagination17.index > 1);
        toolPaginationPrev16.setEnabled(paginationBar17.pagination17.index > 1);
        toolPaginationNext16.setEnabled(paginationBar17.pagination17.index < maxIndex);
        toolPaginationLast16.setEnabled(paginationBar17.pagination17.index < maxIndex);

        // Update page numbers
        toolPaginationPages16.destroyItems();

        const maxItems = paginationBar17.configuration17.maxNumberOfButtons;
        const startItem = Math.max(1, paginationBar17.pagination17.index - Math.floor(maxItems / 2));
        const endItem = Math.min(maxIndex, startItem + maxItems - 1);

        for (let i = startItem; i <= endItem; i++) {
            toolPaginationPages16.addItem(new sap.m.SegmentedButtonItem({
                text: i.toString(),
                key: i,
                press: function () {
                    if (paginationBar17.pagination17.index !== i) {
                        paginationBar17.pagination17.index = i; // Update the index
                        paginationBar17.handleModePagination17(); // Fetch data for current mode
                        paginationBar17.updatePaginationUI17(); // Reflect UI changes
                    }
                }
            }));
        }

        // Ensure the correct page is selected in the UI
        toolPaginationPages16.setSelectedKey(paginationBar17.pagination17.index);
        toolPaginationTitle16.setNumber(`${paginationBar17.pagination17.index} / ${maxIndex}`); // Update pagination title
    },

    // Fetch data (shared logic for both modes)
    executeFetch17: function () {
        const index = parseInt(paginationBar17.pagination17.index, 10);
        const take = parseInt(paginationBar17.pagination17.take, 10);
        const skip = take * (index - 1);

        const url = paginationBar17.isSearchMode17
             ? `http://localhost:8080/api/serverscript/cabserverside/ProvinceSearchArchive`
            : `http://localhost:8080/api/serverscript/cabserverside/DailyOTPArchive`;

        const data = paginationBar17.isSearchMode17
            ? { countryname: SearchField9.getValue(), take, skip }
            : { take, skip };

        // AJAX call
        $.ajax({
            url: url,
            method: 'POST',
            data: data,
            success: function (response) {
                console.log('API response:', response);

                if (response && Array.isArray(response.data)) {
                    modelTable16.setData(response.data); // Update table
                    paginationBar17.totalCount17 = response.totalCount || 0; // Update total count
                    // Update pagination UI to reflect the new search results
                    paginationBar17.updatePaginationUI17();
                } else {
                    console.error('Invalid response:', response);
                }
            },
            error: function (xhr, status, error) {
                console.error('API call failed:', error);
            }
        });
    },


    handleModePagination17: function () {
        paginationBar17.executeFetch17();
        paginationBar17.updatePaginationUI17();
    },
};

// Initial call
paginationBar17.run17(true);









 








 

