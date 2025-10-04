const taskinput = document.getElementById("taskinput");
const addtask = document.getElementById("addtask");
const tasklist = document.getElementById("tasklist");

let editTask = null; // will store the <p> element being edited

const addTodo = (e) => {
    e.preventDefault();
    const inputText = taskinput.value.trim();

    if(inputText === ''){
        alert("Add a task to the To-Do list!");
        return;
    }

    // If we are editing a task
    if(addtask.textContent === "Edit" && editTask){
        const oldTasktext = editTask.innerText;
        editTask.innerText = inputText; // update the text
        editLocaltasks(oldTasktext, inputText);
        addtask.textContent = "+";      // reset button text
        taskinput.value = "";           // clear input
        editTask = null;                // reset reference
        return;                         // stop creating new li
    }

    // Otherwise, create a new task
    const li = document.createElement("li");

    // Task text
    const p = document.createElement("p");
    p.innerText = inputText;
    li.appendChild(p);

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    li.appendChild(editBtn);

    // Remove button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Remove";
    li.appendChild(deleteBtn);

    tasklist.appendChild(li);
    taskinput.value = ""; // clear input

    saveLocaltasks(inputText);
}

// Handle clicks on Edit or Remove buttons(update)
const updateTaskli = (e) => {
    if(e.target.innerText === "Remove"){
       e.target.parentElement.remove(); // remove the li
       deleteLocaltasks(e.target.parentElement);
    }

    if(e.target.innerText === "Edit"){
       taskinput.value = e.target.previousElementSibling.innerText; // put text in input
       taskinput.focus();
       addtask.textContent = "Edit";   // change add button to Edit
       editTask = e.target.previousElementSibling; // store <p> element
    }
}

//Function to save local tasks
const saveLocaltasks = (Task) => {
    let Tasks;
    if(localStorage.getItem("Tasks") === null){
        Tasks = [];
    }
    else{
       Tasks = JSON.parse(localStorage.getItem("Tasks"));
    }
    // Tasks = JSON.parse(localStorage.getItem("Tasks")) || [];
    Tasks.push(Task);
    localStorage.setItem("Tasks", JSON.stringify(Tasks)); // ✅ stringify to save
}

//Function to get/read local tasks
const getLocaltasks = () => {
    let Tasks;
    if(localStorage.getItem("Tasks") === null){
        Tasks = [];
    }
    else{
       Tasks = JSON.parse(localStorage.getItem("Tasks"));
       Tasks.forEach(Task => {
           const li = document.createElement("li");

            // Task text
            const p = document.createElement("p");
            p.innerText = Task;
            li.appendChild(p);

            // Edit button
            const editBtn = document.createElement("button");
            editBtn.innerText = "Edit";
            li.appendChild(editBtn);
        
            // Remove button
            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Remove";
            li.appendChild(deleteBtn);

            tasklist.appendChild(li);
       });
    }
}

//Function to delete local tasks
const deleteLocaltasks = (Task) => {
    let Tasks;
    if(localStorage.getItem("Tasks") === null){
        Tasks = [];
    }
    else{
       Tasks = JSON.parse(localStorage.getItem("Tasks"));
    }
    let taskText = Task.children[0].innerHTML;
    let taskIndex = Tasks.indexOf(taskText);
    Tasks.splice(taskIndex,1);
    localStorage.setItem("Tasks", JSON.stringify(Tasks))
    // console.log(taskIndex);
}

const editLocaltasks = (oldTasktext, inputText) => {
    let Tasks = JSON.parse(localStorage.getItem("Tasks"));
    let taskIndex = Tasks.indexOf(oldTasktext);
    if(taskIndex !== -1){
        Tasks[taskIndex] = inputText
        localStorage.setItem("Tasks", JSON.stringify(Tasks));
    }    
}

document.addEventListener('DOMContentLoaded', getLocaltasks)
addtask.addEventListener('click', addTodo);
tasklist.addEventListener('click', updateTaskli);

