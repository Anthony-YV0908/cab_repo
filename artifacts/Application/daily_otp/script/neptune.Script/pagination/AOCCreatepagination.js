
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
        paginationBar1.executeFetch4();
    },

    // Search and create origin (reset the index when search is triggered)
    searchCreateAOC: function (keepIndex) {
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
        paginationBar1.executeFetch4();
    },

    // Update pagination UI after index reset or changes
    updatePaginationUI4: function () {
        const take = paginationBar1.pagination1.take;
        const maxIndex = Math.ceil(paginationBar1.totalCount1 / take); // Total pages

        // Ensure index is within bounds
        paginationBar1.pagination1.index = Math.min(paginationBar1.pagination1.index, maxIndex);
        if (paginationBar1.pagination1.index < 1) {
            paginationBar1.pagination1.index = 1;
        }

        // Update button states
        toolPaginationFirst3.setEnabled(paginationBar1.pagination1.index > 1);
        toolPaginationPrev3.setEnabled(paginationBar1.pagination1.index > 1);
        toolPaginationNext3.setEnabled(paginationBar1.pagination1.index < maxIndex);
        toolPaginationLast3.setEnabled(paginationBar1.pagination1.index < maxIndex);

        // Update page numbers
        toolPaginationPages3.destroyItems();

        const maxItems = paginationBar1.configuration1.maxNumberOfButtons;
        const startItem = Math.max(1, paginationBar1.pagination1.index - Math.floor(maxItems / 2));
        const endItem = Math.min(maxIndex, startItem + maxItems - 1);

        for (let i = startItem; i <= endItem; i++) {
            toolPaginationPages3.addItem(new sap.m.SegmentedButtonItem({
                text: i.toString(),
                key: i,
                press: function () {
                    if (paginationBar1.pagination1.index !== i) {
                        paginationBar1.pagination1.index = i; // Update the index
                        paginationBar1.handleModePagination4(); // Fetch data for current mode
                        paginationBar1.updatePaginationUI4(); // Reflect UI changes
                    }
                }
            }));
        }

        // Ensure the correct page is selected in the UI
        toolPaginationPages3.setSelectedKey(paginationBar1.pagination1.index);
        toolPaginationTitle3.setNumber(`${paginationBar1.pagination1.index} / ${maxIndex}`); // Update pagination title
    },

    // Fetch data (shared logic for both modes)
    executeFetch4: function () {
        const index = parseInt(paginationBar1.pagination1.index, 10);
        const take = parseInt(paginationBar1.pagination1.take, 10);
        const skip = take * (index - 1);

        const url = paginationBar1.isSearchMode1
            ? `http://localhost:8080/api/serverscript/cabserverside/AirportCodeSearch`
            : `http://localhost:8080/api/serverscript/cabserverside/Airline`;

        const data = paginationBar1.isSearchMode1
            ? { countryname: SearchField.getValue(), take, skip }
            : { take, skip };

        // AJAX call
        $.ajax({
            url: url,
            method: 'POST',
            data: data,
            success: function (response) {
                console.log('API response:', response);

                if (response && Array.isArray(response.data)) {
                    modelTable18.setData(response.data); // Update table
                    paginationBar1.totalCount1 = response.totalCount || 0; // Update total count
                    // Update pagination UI to reflect the new search results
                    paginationBar1.updatePaginationUI4();
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
    handleModePagination4: function () {
        paginationBar1.executeFetch4();
        paginationBar1.updatePaginationUI4();
    },
};

// Initial call
paginationBar1.run1(true);
