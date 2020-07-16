const { prompt } = require('inquirer'); 

const db = require('./db'); 

promptLoad(); 

async function promptLoad() {
    const {choice} = await prompt([
        {
            type: 'list', 
            name: 'choice',
            message: 'Please select what you would like to do.',
            choices: [
                {
                    name: 'View Employees',
                    value: 'VIEW_EMPLOYEES'
                },
                {
                    name: 'View By Department',
                    value: 'VIEW_BY_DEPT'
                },
                {
                    name: 'Add An Employee',
                    value: 'ADD_E'
                },
                {
                    name: 'Remove An Employee',
                    value: 'REMOVE_E'
                },
                {
                    name: 'Update Role',
                    value: 'UPDATE_ROLE'
                },
                {
                    name: 'View All Roles',
                    value: 'VIEW_ALL_ROLES'
                },
                {
                    name: 'Add A Department',
                    value: 'ADD_DEPT'
                },
                {
                    name: 'Add A Role',
                    role: 'ADD_ROLE'
                },
                {
                    name: 'Quit Application',
                    value: 'QUIT'
                }
            ]
        }
    ])
}; 

switch (choice) {
    case 'VIEW_EMPLOYEES':
        return viewAll();
    case 'VIEW_BY_DEPT':
        return viewByDept(); 
    case 'ADD_E':
        return addEmployee();
    case 'REMOVE_E':
        return removeEmployee(); 
    case 'VIEW_ALL_ROLES':
        return viewRoles();
    case 'VIEW_DEPTS':
        return viewDepts(); 
    case 'ADD_DEPT':
        return addDept();
    case 'ADD_ROLE':
        return addRole();
    case 'UPDATE_ROLE':
        return updateRole(); 
    default:
        return quit(); 
}

async function viewAll() {
    const employees = await db.findEmployees();
    console.log('\n');
    console.table(employees); 
    promptLoad(); 
}
async function viewByDept(){
    const depts = await db.findDepartments(); 
    const deptChoice = depts.map(({id,name}) => ({
        name: name,
        value: id
    }));
    const {deptId} = await prompt([
        {
            type: 'list',
            name: 'deptId',
            message: 'Please choose the department you would like to view.',
            choices: deptChoice
        }
    ]);
    const employees = await db.findEmployeesByDept(deptId);
    console.log('\n');
    console.table(employees);
    promptLoad(); 
}; 

async function addRole(){
    const depts = await db.findDepartments();
    const deptChoice = depts.map(({id,name}) => ({
        name: name, 
        value: id
    }));
    const role = await prompt([
        {
            name: 'name',
            message: 'Please put the name of the role.'
        },
        {
            type: 'list',
            name: 'deptId',
            message: 'Please choose what department this role is in.',
            choices: deptChoice
        }
    ]);
    await db.roleCreation(role); 
    console.log(`Added ${role.name}.`)

    promptLoad(); 
}

async function updateRole(){
    const employees = await db.findEmployees();
    const employeeChoice = employees.map(({id,first_name, last_name}) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));
    const {employeeId} = await prompt([
        {
            type: 'list',
            name: 'employeeId',
            message: 'Enter the ID of the employee you would like to change the role of.',
            choices: employeeChoice
        }
    ]);
    const roles = await db.findRoles();
    const roleChoice = roles.map(({id, name}) => ({
        name: name,
        value: id
    }));
    const {roleId} = await prompt ([
        {
            type:'list',
            name: 'roleId',
            message: 'Please select the role you would like to assign.',
            choices: roleChoice
        }
    ]);
    await db.updateRole(employeeId, roleId); 
    console.log('Successfully updated.');
    promptLoad(); 
}

async function viewRoles() {
    const roles = await db.findRoles();
    console.log('\n');
    console.table(roles);
    promptLoad(); 
}

async function removeRole(){
    const roles = await db.findRoles();
    const roleChoice = roles.map(({id, title}))
}