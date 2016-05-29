// empty record array for employee objects
var record = [];
// defines salary total var - global so not affected by deletimg an employee
var salTotal = 0;

// function to grab input data and assign to local vars, create object and push to record array, then call function to list employee
var createEmployee = function() {   //grab input data and assign to local vars
  var empFirstName = document.getElementById('firstNameIn').value;
  var empLastName = document.getElementById('lastNameIn').value;
  var empIdNumber = document.getElementById('empIdIn').value;
  var empJobTitle = document.getElementById('jobTitleIn').value;
  var empAnnualSalary = Number(document.getElementById('annualSalaryIn').value);   // set to number format to get currency formatting applied
  var empMonthlySalary = empAnnualSalary / 12;   //calculates an employee's monthly salary and assigns to var

  var newEmployee = {    //create object populated with local var employee data
    'firstName': empFirstName,
    'lastName': empLastName,
    'empId': empIdNumber,
    'jobTitle': empJobTitle,
    'annSal': empAnnualSalary,
    'monthSal': empMonthlySalary
  };
  record.push(newEmployee);     //push employee object to record array
  //console.log(newEmployee.firstName);
  document.getElementById('firstNameIn').value = '';   // clears values in input boxes
  document.getElementById('lastNameIn').value = '';
  document.getElementById('empIdIn').value = '';
  document.getElementById('jobTitleIn').value = '';
  document.getElementById('annualSalaryIn').value = '';
  salTotal += empMonthlySalary;  // adds employee's monthly salary to salTotal var
  listEmployee();    //calls function to output employee data
};
var listEmployee = function(){       //function to output employee data
  document.getElementById('outputEmp').innerHTML = '';  // sets div content to empty
  for( i = 0; i < record.length; i++ ){   //loops through record array and pulls employee datat to display
    var annSalDol = record[i].annSal.toLocaleString('USD', {style: 'currency', currency: 'USD', minimumFractionDigits: 0}); // sets as currency - this one doesn't work ???
    var monthSalDol = record[i].monthSal.toLocaleString('USD', {style: 'currency', currency: 'USD'});   // sets as currency - this one works
    var empLine = 'Employee: <b>' + record[i].firstName + ' ' + record[i].lastName + '</b>  ID Num: <b>' + record[i].empId + '</b>  Job Title: <b>' + record[i].jobTitle + '</b>  Annual Salary: <b>' + annSalDol + '</b>  Monthly Salary: <b>' + monthSalDol + '</b>';  // concatenates and assigns employee data to var
    document.getElementById('outputEmp').innerHTML += '<p>' + empLine + '</p>';  // displays employee data
  }
};
var listMonthSalCost = function(){     //function to total all employees' monthly salaries
    document.getElementById('outputSal').innerHTML = '';  // sets div value to empty string
    var salTotDol = salTotal.toLocaleString('USD', {style: 'currency', currency: 'USD'});  // assigns currency format
    document.getElementById('outputSal').innerHTML += '<p><b>' + salTotDol + '</b></p>';  // assigns total monthly salary to outal var
};
var delEmp = function(){  // function to delete an employee
  var delEmpId = document.getElementById('deleteEmpIdIn').value;   // assigns input value to var
  var message = "";  // creates message var
    for(j = 0; j < record.length; j++){   // searches for the input employee number
          if(delEmpId === record[j].empId){   // if employee number matches input
              salTotal -= record[j].monthSal;   // NEW total monthly salary is reduced by that employee's monthly salary value
              record[j] = undefined;    // assign undefined to that employee record
              record = record.filter(Boolean);  // removes the undefined employee from the record array so subsequent use of this function doesn't bomb when it hits an employee number that's undefined
              document.getElementById('message').innerHTML = '<b>Employee Number ' + delEmpId + ' has been deleted and Monthly Salary Total Cost has been adjusted.</b>';  // REVISED message to user that employee has been deleted and total monthly salary has been updated
              listMonthSalCost();  // calls function to display new value of total monthly salary cost
              document.getElementById('deleteEmpIdIn').value = '';  // clears value from input box
              return;  // exits function
          } else {   // if input number does  not match any employee number in record array
            var empNotFound = '<b>Employee Not Found!</b>';  // creates var with not found message
            document.getElementById('message').innerHTML = empNotFound;  // sets div to display message
            document.getElementById('deleteEmpIdIn').value = '';  // clears value from input box
          }
    }
};
