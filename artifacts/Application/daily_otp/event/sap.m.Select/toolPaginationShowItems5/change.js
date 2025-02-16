if (toolPaginationShowItems5.getVisible()) {
    paginationBar5.pagination5.take = parseInt(toolPaginationShowItems5.getSelectedKey());
}

paginationBar5.pagination5.index = 0;
paginationBar5.handleModePagination8(); // Fetch data for current mode
paginationBar5.updatePaginationUI8(); // Reflect UI changes
