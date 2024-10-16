using my.company as my from '../db/schema';

service empsrv {
  entity Employees as projection on my.Employee;
  
 
  action exportEmployeesAsXML() returns Binary;
}
annotate empsrv.Employees with @odata.draft.enabled;
annotate empsrv.Employees with @(
    UI.LineItem: [
        
        {
            Label: 'firstName',
            Value: firstName
        },
        {
            Label: 'lastName',
            Value: lastName
        },
        {
            Label: 'email',
            Value: email
        },
        {
            Label: 'position',
            Value: position
        }

        
    ],
    UI.FieldGroup #hospital: {
        $Type: 'UI.FieldGroupType',
        Data: [
              
          {
            Label: 'firstName',
            Value: firstName
        },
        {
            Label: 'lastName',
            Value: lastName
        },
        {
            Label: 'email',
            Value: email
        },
        {
            Label: 'position',
            Value: position
        }
        ]
    },
    UI.Facets: [
        {
            $Type: 'UI.ReferenceFacet',
            ID: 'hospitalFacet',
            Label: 'hospital Facets',
            Target: '@UI.FieldGroup#hospital'
        }
        
    ]
);