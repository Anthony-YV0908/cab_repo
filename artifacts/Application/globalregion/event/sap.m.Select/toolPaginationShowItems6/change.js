if (toolPaginationShowItems6.getVisible()) {
    paginationBar7.pagination7.take = parseInt(toolPaginationShowItems6.getSelectedKey());
}

paginationBar7.pagination7.index = 0;
paginationBar7.handleModePagination7(); // Fetch data for current mode
paginationBar7.updatePaginationUI7(); // Reflect UI changes
