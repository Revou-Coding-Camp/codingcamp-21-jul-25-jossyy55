console.log("Script loaded successfully");

// Define the tasks array first
const tasks = [];

function addTask() {
    // Logic to add a new task
    const taskInput = document.getElementById("Todo-input");
    const dateInput = document.getElementById("date-input");

    // Check if task input is empty
    if (taskInput.value === "" || dateInput.value === "") {
        alert("Task and date cannot be empty");
        return;
    } else {
        // Push the new task to tasks array
        tasks.push({ 
            task: taskInput.value,
            date: dateInput.value,
            id: Date.now() // Add unique ID for deletion
        });
        
        // Clear inputs
        taskInput.value = "";
        dateInput.value = "";
        
        // Render updated tasks
        rendertasks();
        
        // Log after pushing
        console.log("Task added:", taskInput.value, "Due date:", dateInput.value);
        console.log(tasks);
    }
}

function deleteTask(id) {
    // Remove task with matching id
    const index = tasks.findIndex(task => task.id === id);
    if (index > -1) {
        tasks.splice(index, 1);
        rendertasks();
    }
}

function removeAllTasks(){
    // Fix syntax error and make it work with const
    while(tasks.length > 0) {
        tasks.pop();
    }
    rendertasks(); // Fix syntax error
}

// Add missing editTask function
function editTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        const newTask = prompt("Edit task:", task.task);
        const newDate = prompt("Edit date:", task.date);
        
        if (newTask && newDate) {
            task.task = newTask;
            task.date = newDate;
            rendertasks();
        }
    }
}

function filtertask() {
    const searchInput = document.getElementById("search-input");
    const filteredTasks = tasks.filter(task => 
        task.task.toLowerCase().includes(searchInput.value.toLowerCase())
    );
    rendertasks(filteredTasks);
}

function rendertasks(tasksToRender = tasks) {
    // Logic to Render tasks
    const tasklist = document.getElementById("todo-list");
    tasklist.innerHTML = "";

    tasksToRender.forEach(task => {
        const li = document.createElement("li");
        li.className = "to-do-item flex justify-between items-center bg-white p-4 mb-2";
        li.innerHTML = `
            <span>${task.task} - ${task.date}</span>
            <div>
                <button onclick="editTask(${task.id})" class="px-[10px] py-[2px] bg-green-500 text-white rounded-md">Edit</button>
                <button onclick="deleteTask(${task.id})" class="px-[10px] py-[2px] bg-red-500 text-white rounded-md">Delete</button>
            </div>
        `;
        tasklist.appendChild(li);
    });
}

function changeBackground(color) {
    document.body.style.backgroundColor = color;
}