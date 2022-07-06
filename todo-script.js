let dates = document.querySelectorAll(".date");
const day = new Date().getDate();
const month = new Date().getMonth();
const year = new Date().getFullYear();

dates.forEach((date) => {
  date.innerHTML = day + "/" + month + "/" + year;
});

let filterValue = 'All'
let TASKS = [];

const taskInput = document.querySelector(".create_new_task_body");
const addnewtask = document.querySelector(".add_new_task_btn");
const taskList = document.querySelector(".tasks");

const filters = document.querySelectorAll(".filters_by_state");


filters.forEach(function (filter) {
  filter.addEventListener("click", function () {
    let thisfilter = filter;
    filterValue = filter.innerHTML
    if (filterValue === 'Done') {
      const tasks = TASKS.filter(item => item.isDone)
      renderTasks(tasks);
      addnewtask.onclick = null
    }
    if (filterValue === 'Undone') {
      const tasks = TASKS.filter(item => !item.isDone)
      renderTasks(tasks)
      addnewtask.onclick = createTask;
    }
    if (filterValue === 'All') {
      renderTasks(TASKS)
      addnewtask.onclick = createTask;
    }
    filters.forEach(function (filter) {
      filter.classList.remove("active_filter");
      thisfilter.classList.add("active_filter");


    });
  });

});

const arrows = document.querySelectorAll(".arrow");
arrows.forEach(function (arrow) {
  arrow.addEventListener("click", function () {
    let thisarrow = arrow;

    arrows.forEach(function (arrow) {
      arrow.classList.remove("active_arrow");
      thisarrow.classList.add("active_arrow");
    });
    taskList.classList.toggle("reversed")
  });
});

addnewtask.onclick = createTask;


function renderTasks(array) {
  taskList.innerHTML = ''
  array.map(item => {
    taskList.innerHTML += item.main;
    if (item.isDone === true) {
      document.querySelectorAll(".donebtn").forEach(btn => {
        if (btn.id == item.id) {
          btn.classList.add('done');
        }

      })
    }
  })

  const checkStatus = document.querySelectorAll(".donebtn").forEach(item => {
    item.addEventListener('click', event => {
      item.classList.toggle('done')
      TASKS.forEach((task) => {

        if (item.id == task.id) {
          task.isDone = !task.isDone
        }
      })
    })
  })
}

function createTask() {
  const id = new Date().getTime();
  const newTask = {
    isDone: false,
    id: id,
    main: `
        <li class="task_body" id=${id}>
        <div class="right_side side">
            <button id=${id} class='donebtn'}><svg width="16" height="12" viewBox="0 0 16 12" fill="black" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.0661 1.06319L15.0661 1.06322L15.0709 1.068C15.2697 1.26177 15.2697 1.56824 15.0709 1.762L15.0709 1.76197L15.0664 1.76645L5.87645 10.9564C5.68171 11.1512 5.36829 11.1512 5.17355 10.9564L0.933553 6.71645C0.8874 6.67029 0.85079 6.6155 0.825812 6.5552C0.800835 6.4949 0.787979 6.43027 0.787979 6.365C0.787979 6.23318 0.840344 6.10676 0.933553 6.01355C1.02676 5.92034 1.15318 5.86798 1.285 5.86798C1.41682 5.86798 1.54324 5.92034 1.63645 6.01355L5.17645 9.55355L5.53021 9.90732L5.88376 9.55335L14.3638 1.06335L14.3639 1.06319C14.41 1.01703 14.4647 0.9804 14.525 0.95541C14.5852 0.93042 14.6498 0.917557 14.715 0.917557C14.7802 0.917557 14.8448 0.93042 14.905 0.95541C14.9653 0.9804 15.02 1.01703 15.0661 1.06319Z" stroke="black"/>
                </svg>
                </button>
        <p class="tasktxt">${taskInput.value}</p>
        </div>
        <div class="left_side side">
            <p class="date">${day + "/" + month + "/" + year}</p>
        <button class="delete_task"><svg width="15" height="18" viewBox="0 0 15 18" fill="black" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.26571 2.72727H5.23973C5.16106 2.40477 5.15361 2.06766 5.21795 1.74168C5.28229 1.4157 5.41671 1.10946 5.61097 0.846349C5.80522 0.583238 6.05416 0.370209 6.33878 0.223528C6.6234 0.0768474 6.93618 0.000392317 7.25324 0C7.57021 0.000558308 7.88287 0.0771353 8.16736 0.223888C8.45185 0.37064 8.70066 0.583689 8.89479 0.846779C9.08893 1.10987 9.22326 1.41605 9.28754 1.74195C9.35182 2.06785 9.34436 2.40486 9.26571 2.72727V2.72727Z" fill="black"/>
            <path d="M1.53896 3.81818C1.26341 3.81818 0.999148 3.70325 0.804305 3.49866C0.609462 3.29408 0.5 3.0166 0.5 2.72727C0.5 2.43795 0.609462 2.16047 0.804305 1.95589C0.999148 1.7513 1.26341 1.63637 1.53896 1.63637H12.9675C13.2431 1.63637 13.5073 1.7513 13.7022 1.95589C13.897 2.16047 14.0065 2.43795 14.0065 2.72727C14.0065 3.0166 13.897 3.29408 13.7022 3.49866C13.5073 3.70325 13.2431 3.81818 12.9675 3.81818H1.53896Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9286 18C12.2041 18 12.4684 17.8851 12.6632 17.6805C12.8581 17.4759 12.9675 17.1984 12.9675 16.9091V5.45455C12.9675 5.16522 12.8581 4.88774 12.6632 4.68316C12.4684 4.47857 12.2041 4.36364 11.9286 4.36364H2.57792C2.30237 4.36364 2.0381 4.47857 1.84326 4.68316C1.64842 4.88774 1.53896 5.16522 1.53896 5.45455V16.9091C1.53896 17.1984 1.64842 17.4759 1.84326 17.6805C2.0381 17.8851 2.30237 18 2.57792 18H11.9286ZM9.85065 7.09091C9.85065 6.94625 9.90538 6.80751 10.0028 6.70521C10.1002 6.60292 10.2324 6.54545 10.3701 6.54545C10.5079 6.54545 10.64 6.60292 10.7375 6.70521C10.8349 6.80751 10.8896 6.94625 10.8896 7.09091V14.7273C10.8896 14.8719 10.8349 15.0107 10.7375 15.113C10.64 15.2153 10.5079 15.2727 10.3701 15.2727C10.2324 15.2727 10.1002 15.2153 10.0028 15.113C9.90538 15.0107 9.85065 14.8719 9.85065 14.7273V7.09091ZM7.25324 6.54545C7.11547 6.54545 6.98333 6.60292 6.88591 6.70521C6.78849 6.80751 6.73376 6.94625 6.73376 7.09091V14.7273C6.73376 14.8719 6.78849 15.0107 6.88591 15.113C6.98333 15.2153 7.11547 15.2727 7.25324 15.2727C7.39102 15.2727 7.52315 15.2153 7.62057 15.113C7.71799 15.0107 7.77272 14.8719 7.77272 14.7273V7.09091C7.77272 6.94625 7.71799 6.80751 7.62057 6.70521C7.52315 6.60292 7.39102 6.54545 7.25324 6.54545ZM3.61688 7.09091C3.61688 6.94625 3.67161 6.80751 3.76903 6.70521C3.86645 6.60292 3.99858 6.54545 4.13636 6.54545C4.27413 6.54545 4.40627 6.60292 4.50369 6.70521C4.60111 6.80751 4.65584 6.94625 4.65584 7.09091V14.7273C4.65584 14.8719 4.60111 15.0107 4.50369 15.113C4.40627 15.2153 4.27413 15.2727 4.13636 15.2727C3.99858 15.2727 3.86645 15.2153 3.76903 15.113C3.67161 15.0107 3.61688 14.8719 3.61688 14.7273V7.09091Z"/>
            </svg></button>
        </div>  
    </li>
        `,

  }
  TASKS.push(newTask);
  if( TASKS.length> 5) {
    return TASKS
  }
  renderTasks(TASKS);

  deleteTask();
  paginationToDo();

  return TASKS
}

function deleteTask() {
  const close = document.getElementsByClassName("delete_task");
  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let task = close[i].parentElement.parentElement;
      task.remove();
      for (let j = 0; j < TASKS.length; j++) {
        if (i === j) {
          TASKS.splice(i, 1)
        }
      }
    };
  };
}

function paginationToDo() {
  let pages = document.querySelectorAll('#pagination li');
  let notesOnPage = 5;

  for (let page of pages) {
    page.addEventListener("click", function () {

      let active = document.querySelector("#pagination li.active_page");
      active.classList.remove('active_page')

      this.classList.add("active_page")
      let pageNum = +this.innerHTML;
      let start = (pageNum - 1) * notesOnPage;
      let end = start + notesOnPage
      let notes = TASKS.slice(start, end);
      taskList.innerHTML = "";
      for (let note of notes) {
        let li = document.createElement('li');
        li.innerHTML = note.main
        taskList.appendChild(li);
      }
      deleteTask()
    });
  }
}

clearBtn = document.getElementById('clean');
clearBtn.addEventListener('click', clearList => {
  taskList.innerHTML = "";
  TASKS = []
})




