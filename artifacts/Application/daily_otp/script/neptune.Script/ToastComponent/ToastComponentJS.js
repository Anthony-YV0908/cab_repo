// Define modelPage with setData method
 const modelEditPage = {
     oData: {},
     setData(data) {
         this.oData = data; // Update the oData with new data
     },
 
};

 // Example Data
 modelEditPage.setData({
    offsetY: 40,
    offsetX: 15,
    gap: 5,
    // width: 300,
    timing: "ease",
    duration: 1,
    dimOld: true,
    position: "top-right",
    // title: "My Title",
    // content: "My notification content",
    // style: "success",
    dismissAfter: 2,
    closeButton: true,
 
});

 // Toast Instance
const toasts = new Toasts();
let isToastVisible = false;

function showToast(responseData) {
    // Set New Options to override Toast Instance
    toasts.options.offsetY = modelEditPage.oData.offsetY;
    toasts.options.offsetX = modelEditPage.oData.offsetX;
    toasts.options.gap = modelEditPage.oData.gap;
    toasts.options.width = modelEditPage.oData.width;
    toasts.options.timing = modelEditPage.oData.timing;
    toasts.options.duration = modelEditPage.oData.duration + "s";
    toasts.options.dimOld = modelEditPage.oData.dimOld;
    toasts.options.position = modelEditPage.oData.position;

    // Default toast style, title, and content
    let toastStyle;
    let title;
    let content;

    // Determine style, title, and content based on status and data
    if (responseData.status === 200) {
        // Success Response
        toastStyle = 'success';
        title = "Successfuly Updated Data "
        content = responseData.details;
    } else if (responseData.status === 500) {
        // Error Response
        toastStyle = 'error';
        title = "Error in the update "
        content = responseData.error;
    } else {
        // Unexpected response
        toastStyle = 'info';
        title = "Unexpected Response";
        content = responseData.message;
    }

    if (!isToastVisible) {
        isToastVisible = true;

        // Show the toast message
        toasts.push({
            title: title,
            content: content,
            style: toastStyle,  // Dynamically set based on status or error
            dismissAfter: modelEditPage.oData.dismissAfter + "s",  // Duration from the modelEditPage options
            closeButton: modelEditPage.oData.closeButton,  // Close button setting
        });

        // Reset the flag after the toast duration
        setTimeout(() => {
            isToastVisible = false;
        }, parseInt(modelEditPage.oData.duration) * 1000); // Duration in seconds
    }
}


     