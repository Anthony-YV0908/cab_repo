if (toolPaginationShowItems3.getVisible()) {
    paginationBar3.pagination3.take = parseInt(toolPaginationShowItems3.getSelectedKey());
}

paginationBar3.pagination3.index = 0;
paginationBar3.run3(true); 
paginationBar3.handlePagination3();