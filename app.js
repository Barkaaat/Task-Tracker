#!/usr/bin/env node

import fs, { readFile, readFileSync } from 'fs';
import chalk from 'chalk';
import inquirer from 'inquirer';
import animation from 'chalk-animation';
import figlet from 'figlet';
import gradient from 'gradient-string';
import nanospinner, { createSpinner } from 'nanospinner';

function start () {
    const spinner = createSpinner(
        chalk.yellowBright('Task Manager Start...')
    ).start();

    setTimeout((r) => {
        spinner.success({
            text: chalk.green('Welcome To Task Manager')
        });

        if (!fs.existsSync('tasks.json')) {
            fs.appendFile('tasks.json', JSON.stringify([]), (err) => {
                if (err) console.log(err);
            });
        }
        
        main();
    }, 3000);
}

function main () {
    inquirer
        .prompt([{
            type: 'list',
            name: 'action',
            message: 'Choose action',
            choices: [
                'List tasks',
                'Add task',
                'Update task',
                'Delete task',
                'Exit',
            ],
        }])
        .then((choice) => {
            if (choice.action === 'List tasks') {
                listTasks();
            } else if (choice.action === 'Add task') {
                addTask();
            } else if (choice.action === 'Update task') {
                updateTask();
            } else if (choice.action === 'Delete task') {
                deleteTask();
            } else {
                return exit();
            }
        });
}

function display(s) {
    let data;
    try {
        data = JSON.parse(readFileSync('tasks.json', 'utf8'));
    } catch(err) {
        console.log(err);
        return;
    }

    let cnt = 0;
    for (let i of data) {
        if (!s || s.length == 14 || i.status == s.substr(15)) {
            cnt++;
            console.log(chalk.white('-').repeat(45));
            console.log(chalk.cyan('ID:')+`              ${chalk.dim.cyanBright(i.id)}`);
            console.log(chalk.cyan('Description:')+`     ${chalk.dim.cyanBright(i.description)}`);

            if (i.status == 'Done') console.log(chalk.cyan('Status:')+`          ${chalk.greenBright(i.status)}`);
            if (i.status == 'Not done') console.log(chalk.cyan('Status:')+`          ${chalk.redBright(i.status)}`);
            if (i.status == 'In progress') console.log(chalk.cyan('Status:')+`          ${chalk.gray(i.status)}`);

            console.log(chalk.cyan('CreatedAt:')+`       ${chalk.dim.cyanBright(i.createdAt)}`);
            console.log(chalk.cyan('UpdatedAt:')+`       ${chalk.dim.cyanBright(i.updatedAt)}`);
        }
    }
    if (!cnt) {
        console.log(chalk.red('No Tasks'));
    } else {
        console.log(chalk.white('-').repeat(45));
        console.log(`${chalk.yellow(cnt+ ' Task'+(cnt > 1? 's':''))}`);
        console.log(chalk.white('-').repeat(7));
    }

    return data;
}

function listTasks() {
    inquirer
        .prompt([{
            type: 'list',
            name: 'action',
            message: 'Choose Action',
            choices: [
                'List all tasks',
                'List tasks are Done',
                'List tasks are Not done',
                'List tasks are In progress',
                'Exit',
            ]
        }])
        .then((choice) => {
            if (choice.action === 'Exit') {
                return exit();
            }

            display(choice.action);
            main();
        });
}

function addTask() {
    inquirer
        .prompt([{
            type: 'input',
            name: 'discription',
            message: 'Enter your task',
            validate(discription) {
                if (!discription) {
                    return 'Enter valid task';
                }
                return true;
            }
        }, {
            type: 'list',
            name: 'status',
            message: 'Chosse task status',
            choices: [
                'Done',
                'Not done',
                'In progress',
            ],
        }])
        .then(answers => {
            let data;
            try {
                data = JSON.parse(readFileSync('tasks.json', 'utf8'));
            } catch (err) {
                console.log(err);
                return;
            }
            
            let task = {
                id: data.length + 1,
                description: answers.discription,
                status: answers.status,
                createdAt: `${new Date().toUTCString()}`,
                updatedAt: `${new Date().toUTCString()}`,
            };
            
            data.push(task);
            fs.writeFileSync('tasks.json', JSON.stringify(data));
            console.log(chalk.green('Task is added successfully'));
            
            main();
        });
}
    
function updateTask() {
    let data = display();
    
    if (!data.length) {
        main();
    } else {
        inquirer
            .prompt([{
                type: 'input',
                name: 'id',
                message: 'Enter task id',
                validate(id) {
                    if (id < 1 || id > data.length) {
                        return 'Enter valid id';
                    }
                    return true;
                },
            }, {
                type: 'input',
                name: 'discription',
                message: 'update task',
                default(answers) {
                    return data[answers.id-1].description;
                }
            }, {
                type: 'list',
                name: 'status',
                message: 'update task status',
                choices: [
                    'Done',
                    'Not done',
                    'In progress',
                ],
            }])
            .then(answers => {
                data[answers.id-1].discription = answers.discription;
                data[answers.id-1].status = answers.status;
                data[answers.id-1].updatedAt = new Date().toUTCString();

                fs.writeFileSync('tasks.json', JSON.stringify(data));
                console.log(chalk.green('Task is updated successfully!'));

                main();
            });
    }
}

function deleteTask() {
    let data = display();
    
    if (!data.length) {
        main();
    } else {
        inquirer
            .prompt([{
                type: 'input',
                name: 'id',
                message: 'Enter task id',
                default() {
                    return '-1';
                },
                validate(id) {
                    if ((id < 1 || id > data.length) && id != -1) {
                        return 'Enter valid id';
                    }
                    return true;
                },
            }])
            .then(answers => {
                if (~answers.id) {
                    data.splice(answers.id-1, 1);
                    let cnt = 1;
                    for (let i of data) {
                        i.id = cnt++;
                    }

                    fs.writeFileSync('tasks.json', JSON.stringify(data));
                    console.log(chalk.green('Task is deleted successfully!'));
                } else {
                    console.log(chalk.yellow('No tasks is deleted'));
                }

                main();
            });
    }
}

function exit() {
    const spinner = createSpinner(
        chalk.redBright('Closing Task Manager...')
    ).start();

    setTimeout((r) => {
        spinner.success({
            text: chalk.green('Task Manager Is Closed')
        });
    }, 3000);
}

start();