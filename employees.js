const employees = [
  { id: 1, name: 'moe'},
  { id: 2, name: 'larry', managerId: 1},
  { id: 4, name: 'shep', managerId: 2},
  { id: 3, name: 'curly', managerId: 1},
  { id: 5, name: 'groucho', managerId: 3},
  { id: 6, name: 'harpo', managerId: 5},
  { id: 8, name: 'shep Jr.', managerId: 4},
  { id: 99, name: 'lucy', managerId: 1}
];

const findEmployeeByName = (name, employees) => {
  let result = {};
  employees.forEach((employeeObj) => {
    if (employeeObj.name === name) result = employeeObj;
  });
  return result;
};

//console.log(findEmployeeByName('moe', employees))

const findManagerFor = (employeeObj, employees) => {
  const managerId = employeeObj.managerId;
  let result = {};
  employees.forEach((employeeObj) => {
    if (employeeObj.id === managerId) result = employeeObj;
  });
  return result;
};

//console.log(findManagerFor(findEmployeeByName('shep Jr.', employees), employees));

const findCoworkersFor = (employeeObj, employees) => {
  const managerId = employeeObj.managerId;
  const employeeName = employeeObj.name;
  let result = [];
  employees.forEach((employeeObj) => {
    if (employeeObj.managerId === managerId & employeeObj.name !== employeeName) result.push(employeeObj);
  });
  return result;
};

//console.log(findCoworkersFor(findEmployeeByName('larry', employees), employees));

const findManagementChainForEmployee = (employeeObj, employees, managerObj=[]) => {
  const managerId = employeeObj.managerId;
  if (managerId) {
    const currManagerObj = findManagerFor(employeeObj, employees);
    managerObj.push(currManagerObj);
    findManagementChainForEmployee(currManagerObj, employees, managerObj);
  };
  const result = managerObj.slice().reverse();
  return result;
};

//console.log(findManagementChainForEmployee(findEmployeeByName('moe', employees), employees));
//console.log(findManagementChainForEmployee(findEmployeeByName('shep Jr.', employees), employees));
/*
[ { id: 1, name: 'moe' },
  { id: 2, name: 'larry', managerId: 1 },
  { id: 4, name: 'shep', managerId: 2 }]
*/


const idToIndex = employees.reduce((acc, el, i) => {
  acc[el.id] = i;
  return acc
}, {});

console.log(idToIndex)


let root;

const generateManagementTree = (employees) => {
  employees.forEach((employee) => {
    //identify root element
    if (!employee.managerId) {
      root = employee;
      return;
    };

    //locate root in data
    const managerEl = employees[idToIndex[employee.managerId]];

    //add current employee
    managerEl['reports'] = [...(managerEl['reports'] || []), employee]

  });

  return root;
};


//given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.
console.log(JSON.stringify(generateManagementTree(employees), null, 2));
/*
{
  "id": 1,
  "name": "moe",
  "reports": [
    {
      "id": 2,
      "name": "larry",
      "managerId": 1,
      "reports": [
        {
          "id": 4,
          "name": "shep",
          "managerId": 2,
          "reports": [
            {
              "id": 8,
              "name": "shep Jr.",
              "managerId": 4,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "name": "curly",
      "managerId": 1,
      "reports": [
        {
          "id": 5,
          "name": "groucho",
          "managerId": 3,
          "reports": [
            {
              "id": 6,
              "name": "harpo",
              "managerId": 5,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 99,
      "name": "lucy",
      "managerId": 1,
      "reports": []
    }
  ]
}
*/
