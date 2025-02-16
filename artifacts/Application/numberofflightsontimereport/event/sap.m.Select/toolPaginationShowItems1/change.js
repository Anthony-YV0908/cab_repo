if (toolPaginationShowItems1.getVisible()) {
    paginationBar1.pagination1.take = parseInt(toolPaginationShowItems1.getSelectedKey());
}

paginationBar1.pagination1.index = 0;
paginationBar1.run1(true); 
paginationBar1.handlePagination1();