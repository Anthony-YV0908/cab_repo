if (toolPaginationShowItems.getVisible()) {
    paginationBar8.pagination8.take = parseInt(toolPaginationShowItems.getSelectedKey());
}

paginationBar8.pagination8.index = 0;
paginationBar8.run8(true); 
paginationBar8.handlePagination8();
paginationBar8.dailyDate()