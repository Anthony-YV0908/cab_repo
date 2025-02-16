if (toolPaginationShowItems3.getVisible()) {
    paginationBar6.pagination6.take = parseInt(toolPaginationShowItems3.getSelectedKey());
}

paginationBar6.pagination6.index = 0;
paginationBar6.handleModePagination6(); // Fetch data for current mode
paginationBar6.updatePaginationUI6(); // Reflect UI changes
