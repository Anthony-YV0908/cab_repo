if (toolPaginationShowItems7.getVisible()) {
    paginationBar4.pagination4.take = parseInt(toolPaginationShowItems7.getSelectedKey());
}

paginationBar4.pagination4.index = 0;
paginationBar4.handleModePagination4(); // Fetch data for current mode
paginationBar4.updatePaginationUI4(); // Reflect UI changes
