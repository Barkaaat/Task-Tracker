
# Task Manager

Solution for the [task-tracker](https://roadmap.sh/projects/task-tracker) challenge from [roadmap.sh](https://roadmap.sh/).

A simple **Task Manager** command-line application built with Node.js that allows users to list, add, update, and delete tasks. The application stores tasks in a `tasks.json` file, and each task contains details like an ID, description, status, and timestamps for when it was created and last updated.

## Features
- **List tasks**: View all tasks, tasks that are done, tasks not done, or tasks that are in progress.
- **Add tasks**: Add a new task with a description and status.
- **Update tasks**: Modify the description or status of existing tasks.
- **Delete tasks**: Remove a task from the list.
- **Persist tasks**: Tasks are stored in a JSON file (`tasks.json`).

## Dependencies
This project relies on the following Node.js libraries:
- [**inquirer**](https://www.npmjs.com/package/inquirer) for user input prompts.
- [**chalk**](https://www.npmjs.com/package/chalk) for colorful console output.
- [**nanospinner**](https://www.npmjs.com/package/nanospinner) for loading spinners.
- [**chalk-animation**](https://www.npmjs.com/package/chalk-animation) for animated console output.
- [**figlet**](https://www.npmjs.com/package/figlet) for ASCII text rendering.
- [**gradient-string**](https://www.npmjs.com/package/gradient-string) for gradient text.

## Prerequisites
Make sure you have the following installed:
- **Node.js** (v12.0.0 or higher)
- **npm** or **yarn** for installing dependencies

## Installation
1. Clone the repository to your local machine:
   ```bash
   git clone <repository-url>
   cd task-manager
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Ensure the `tasks.json` file exists:
   If it doesn't exist, the program will automatically create an empty one on startup.

## Usage
To start the Task Manager, run the following command:
```bash
./task-manager
```
The Task Manager will display a welcome message and then prompt you with the following actions:

### Available Actions
1. **List tasks**: 
   - View all tasks or filter tasks by status (Done, Not done, In progress).
2. **Add task**: 
   - Add a new task by providing a description and selecting a status.
3. **Update task**: 
   - Update the description or status of a task by specifying its ID.
4. **Delete task**: 
   - Delete a task by its ID.
5. **Exit**: 
   - Exit the application.

### Adding a Task
1. Choose the "Add task" option.
2. Enter a task description.
3. Choose the task status (Done, Not done, In progress).

### Listing Tasks
1. Choose "List tasks" to display all tasks.
2. You can filter tasks based on their status:
   - Done
   - Not done
   - In progress

### Updating a Task
1. Choose the "Update task" option.
2. Enter the task ID to update.
3. Modify the task description or status.

### Deleting a Task
1. Choose the "Delete task" option.
2. Enter the task ID to delete.

### Exiting the Application
1. Choose "Exit" to close the Task Manager.

## Example

When the application runs, the user will be prompted to select actions and enter data:

```bash
? Choose action (Use arrow keys)
❯ List tasks
  Add task
  Update task
  Delete task
  Exit
```

The tasks will be displayed in a formatted list with colored output, like this:

```bash
---------------------------------------------
ID:              1
Description:     Buy groceries
Status:          In progress
CreatedAt:       Mon, 02 Oct 2024 14:23:44 GMT
UpdatedAt:       Mon, 02 Oct 2024 14:23:44 GMT
---------------------------------------------
```

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.
