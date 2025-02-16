if (toolPaginationShowItems2.getVisible()) {
    paginationBar3.pagination3.take = parseInt(toolPaginationShowItems2.getSelectedKey());
}

paginationBar3.pagination3.index = 0;
paginationBar3.handleModePagination3(); // Fetch data for current mode
paginationBar3.updatePaginationUI3(); // Reflect UI changes
