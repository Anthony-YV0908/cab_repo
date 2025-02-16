if (toolPaginationShowItems6.getVisible()) {
    paginationBar4.pagination4.take = parseInt(toolPaginationShowItems6.getSelectedKey());
}

paginationBar4.pagination4.index = 0;
paginationBar4.handleModePagination7(); // Fetch data for current mode
paginationBar4.updatePaginationUI7(); // Reflect UI changes
