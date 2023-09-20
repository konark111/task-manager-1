// Import required modules
const readline = require('readline');
const fs = require('fs');

// Create an interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Create an empty array to store tasks
let tasks = [];

// Function to display the task list
function displayTasks() {
  console.log('Task List:');
  for (let i = 0; i < tasks.length; i++) {
    console.log(`${i + 1}. ${tasks[i]}`);
  }
}

// Function to add a new task
function addTask(task) {
  tasks.push(task);
  saveTasks();
  console.log('Task added successfully.');
  displayTasks();
}

// Function to remove a task
function removeTask(index) {
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
    saveTasks();
    console.log('Task removed successfully.');
  } else {
    console.log('Invalid task index.');
  }
  displayTasks();
}

// Function to save tasks to a file
function saveTasks() {
  fs.writeFileSync('tasks.json', JSON.stringify(tasks), 'utf-8');
}

// Function to load tasks from a file
function loadTasks() {
  try {
    const data = fs.readFileSync('tasks.json', 'utf-8');
    tasks = JSON.parse(data);
    console.log('Tasks loaded successfully.');
  } catch (error) {
    tasks = [];
    console.log('No saved tasks found.');
  }
}

// Load tasks from the file when the application starts
loadTasks();

// Main menu
function mainMenu() {
  console.log('\nTask Manager');
  console.log('1. View Tasks');
  console.log('2. Add Task');
  console.log('3. Remove Task');
  console.log('4. Exit');

  rl.question('Select an option (1/2/3/4): ', (choice) => {
    switch (choice) {
      case '1':
        displayTasks();
        mainMenu();
        break;
      case '2':
        rl.question('Enter the task: ', (task) => {
          addTask(task);
          mainMenu();
        });
        break;
      case '3':
        rl.question('Enter the task number to remove: ', (index) => {
          removeTask(index - 1);
          mainMenu();
        });
        break;
      case '4':
        console.log('Exiting Task Manager.');
        rl.close();
        break;
      default:
        console.log('Invalid choice. Please select a valid option.');
        mainMenu();
        break;
    }
  });
}

// Start the main menu
mainMenu();
