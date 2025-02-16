if (toolPaginationShowItems14.getVisible()) {
    paginationBar15.pagination15.take = parseInt(toolPaginationShowItems14.getSelectedKey());
}

paginationBar15.pagination15.index = 0;
paginationBar15.handleModePagination15(); // Fetch data for current mode
paginationBar15.updatePaginationUI15(); // Reflect UI changes
