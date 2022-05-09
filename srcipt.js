// getting required elements
const inputBox = document.querySelector(".inputField input")
const addBtn = document.querySelector(".inputField button")
const todoList = document.querySelector(".to-do_list")
const deleteAll = document.querySelector(".footer button")

inputBox.onkeyup = () => {
    let userData = inputBox.value; // getting user entered value
    if (userData.trim() != 0) { // if entered value aren't only spaces
        addBtn.classList.add("active"); // active the add button
    }
    else {
        addBtn.classList.remove("active"); // remove the add button
    }
}

// if add button is clicked
addBtn.onclick = () => {
    let userData = inputBox.value; // getting entered value
    let getLocalStorage = localStorage.getItem("New To-Do"); //getting the local storage
    if (getLocalStorage == null) {
        listArr = [] //creating blank array
    }
    else {
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(userData);
    localStorage.setItem("New To-Do", JSON.stringify(listArr)); //converting json object into string
    showTasks();
}

function showTasks() {
    let getLocalStorage = localStorage.getItem("New To-Do"); //getting the local storage
    console.log(getLocalStorage);
    if (getLocalStorage == null) {
        listArr = [] //creating blank array
    }
    else {
        listArr = JSON.parse(getLocalStorage);
    }
    const pendingNum = document.querySelector(".PendingNum");
    pendingNum.textContent = listArr.length;
    let newTask = '';
    listArr.forEach((element, index) => {
        newTask += ` <li>${element}<span onclick = "deleteTask(${index});"><i class="fa fa-trash" aria-hidden="true"></i></span></li>`
        console.log(index);
        console.log(element);
    });
    todoList.innerHTML = newTask; //adding new li tag in html
    inputBox.value = ""; //once the task is added leave the input box empty
}

// deleting the tasks
function deleteTask(index) {
    let getLocalStorageData = localStorage.getItem("New To-Do");
    let task = JSON.parse(getLocalStorageData);
    // console.log(getLocalStorageData);
    // console.log(task);
    task.splice(index,1); //delete or remove the li
    console.log(task);
    localStorage.setItem("New To-Do", JSON.stringify(task));
    showTasks(); //call the showTasks function
}

deleteAll.onclick = () =>{
listArr = [];
localStorage.setItem("New To-Do", JSON.stringify(listArr));
showTasks(); //call the showTasks function
}
