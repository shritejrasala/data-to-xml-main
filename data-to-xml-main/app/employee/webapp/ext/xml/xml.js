sap.ui.define([
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/m/Dialog",
    "sap/m/Text",
    "sap/m/Button"
], function (MessageToast, MessageBox, Dialog, Text, Button) {
    'use strict';

    return {
        xml: function (oEvent) {
            
            var oStatusText = new Text({ text: "Starting to download XML..." });
            var oDialog = new Dialog({
                title: "Processing",
                content: [oStatusText],
                beginButton: new Button({
                    text: "Cancel",
                    press: function () {
                        oDialog.close();
                    }
                })
            });

            oDialog.open();

            
            function updateStatus(message, closeDialog = false) {
                oStatusText.setText(message);
                if (closeDialog) {
                    oDialog.close();
                    MessageBox.success("Download Successful");
                }
            }

            
            function handleDownloadResponse(responseXML) {
                
                var oBlob = new Blob([responseXML], { type: "application/xml" });
                var sUrl = URL.createObjectURL(oBlob);

                
                var oLink = document.createElement("a");
                oLink.href = sUrl;
                oLink.download = "employees.xml"; 
                document.body.appendChild(oLink); 
                oLink.click();
                document.body.removeChild(oLink); 

                
                URL.revokeObjectURL(sUrl);
                updateStatus("Download completed successfully.", true);
            }

            
            $.ajax({
                url: "/odata/v4/empsrv/exportEmployeesAsXML", 
                type: "POST",
                contentType: "application/json",
                success: function (response) {
                    handleDownloadResponse(response); 
                },
                error: function () {
                    updateStatus("Error downloading the XML file.", true);
                }
            });
        }
    };
});
