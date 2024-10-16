const cds = require('@sap/cds');
const axios = require('axios'); 

module.exports = async function () {
    this.on('exportEmployeesAsXML', async (req) => {
        
            
            const response = await axios.get('http://localhost:4004/odata/v4/empsrv/Employees');
            const employees = response.data.value;
console.log(employees);
            if (!employees || employees.length === 0) {
                return req.error(404, "No employees found");
            }
           
            const xmlData = convertToXML(employees);
            console.log(xmlData);
          // req.res.setHeader('Content-Type', 'application/xml');
           // req.res.setHeader('Content-Disposition', 'attachment; filename=employees.xml');
            req.res.send(xmlData); 
        
    });
};

// Function to convert employees to XML format
function convertToXML(employees) {
    let xml = '<?xml version="1.0" encoding="UTF-8"?><Employees>';
    employees.forEach(emp => {
        xml += `<Employee>`;
        xml += `<ID>${emp.ID || ''}</ID>`;
        xml += `<Email>${emp.email || ''}</Email>`;
        xml += `<FirstName>${emp.firstName || ''}</FirstName>`;
        xml += `<LastName>${emp.lastName || ''}</LastName>`;
        xml += `<Position>${emp.position || ''}</Position>`;
        xml += `</Employee>`;
    });
    xml += '</Employees>';
    return xml;
}
