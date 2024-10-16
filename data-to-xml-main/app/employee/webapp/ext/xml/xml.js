sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/ui/core/HTML"
], function (MessageToast, JSONModel, Dialog, Button, HTML) {
    'use strict';

    return {
        xml: async function(oBindingContext, aSelectedContexts) {
            console.log(aSelectedContexts);
            
            let mParameters = {
                contexts: aSelectedContexts[0],
                label: 'Confirm',
                invocationGrouping: true
            };

            try {
                
                let result = await this.editFlow.invokeAction('empsrv.exportEmployeesAsXML', mParameters);
                let base64PDF = result.getObject().value;  

                
                let binary = atob(base64PDF);
                let len = binary.length;
                let buffer = new Uint8Array(len);
                for (let i = 0; i < len; i++) {
                    buffer[i] = binary.charCodeAt(i);
                }
                let blob = new Blob([buffer], { type: 'application/pdf' });

                
                let pdfUrl = URL.createObjectURL(blob);

                
                let oHTML = new HTML({
                    content: `<iframe src="${pdfUrl}" width="600px" height="500px" style="border: none;"></iframe>`
                });

                
                let oDialog = new Dialog({
                    title: 'Employee PDF',
                    contentWidth: "600px",  
                    contentHeight: "500px", 
                    content: [oHTML],
                    beginButton: new Button({
                        text: 'Download PDF',
                        press: function () {
                            
                            let a = document.createElement('a');
                            a.href = pdfUrl;
                            a.download = 'Employee.pdf'; 
                            a.click();  
                        }
                    }),
                    endButton: new Button({
                        text: 'Close',
                        press: function () {
                            oDialog.close();
                        }
                    }),
                    afterClose: function () {
                        oDialog.destroy();
                    }
                });

                oDialog.open();  

            } catch (error) {
                console.error("Error occurred during XML export:", error);
                MessageToast.show("Failed to export XML.");
            }
        }
    };
});
