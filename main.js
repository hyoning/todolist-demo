// 유저가 값을 입력한다
// + 버튼을 클릭하면, 할일이 추가된다.
// delete 버튼을 누르면 할일이 삭제 된다
// check 버튼을 누르면 할일이 끝나면서 밑줄이 간다
// 1. check 버튼 클릭 하는 순간 true false
// 2. true 이면 끝난걸로 간주하고 밑줄
// 3. false 면 안끝난걸로 간주하고 그대로
// 진행 중 끝남 탭을 누르면, 언더바가 이동한다.
// 끝남 탭은, 끝난 아이템만, 진행중 탭은 진행중인 아이템만
// 전체 탭을 누르면 다시 전체 아이템으로 돌아옴.

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");
let tabFirst = document.getElementById("all")
let mode = "all"

let taskList = []
let filterList = []
let list = []

//날짜 데이터 추가
let today = new Date();
let year = today.getFullYear();
let month = ('0' + (today.getMonth() + 1)).slice(-2);
let day = today.getDate();
let currentDate = `${year}.${month}.${day}`;


underLine.style.left=tabFirst.offsetLeft + "px"
underLine.style.width=tabFirst.offsetWidth + "px"

addButton.addEventListener("click", addTask);
taskInput.addEventListener("focus", function(){
    taskInput.value="";
})


for (let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event){
        underLine.style.left=event.currentTarget.offsetLeft + "px"
        underLine.style.width=event.currentTarget.offsetWidth + "px"
        mode = event.target.id;
        render();
    })
}


function addTask(){
    if(taskInput.value == ""){
        alert("할 일을 입력해 주세요!");
        return;
    }
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        date : currentDate,
        isComplete: false,
    }
    taskList.push(task);
    render();
}

function render(){
    let list = []
    if(mode === "all"){
        list = taskList;
    } else if(mode === "ongoing"){
        list = taskList.filter((task) => task.isComplete === false);
    } else if(mode === "done"){
        list = taskList.filter((task) => task.isComplete === true);
    }

    let resultHTML = "";
    for(let i=0; i < list.length; i++){   
            resultHTML+=`<div class="task  ${list[i].isComplete==true?`task-done`:``}">
                            <div class="check-button">
                                <button onClick = "toggleComplete('${list[i].id}')"></button>
                            </div>
                            <div class="task-contain">
                                <div class="task-memo">
                                    ${list[i].taskContent}
                                    <span>${currentDate}</span>    
                                </div>
                                <div class="delete-button"> 
                                    <button onClick = "deleteTask('${list[i].id}')"></button>
                                </div>
                            </div>
                        </div>`;
    }
    document.getElementById('task-board').innerHTML = resultHTML;
}

function toggleComplete(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
}

function deleteTask(id){
    if(confirm("정말 삭제 하시겠습니까?")){
        taskList = taskList.filter(item => item.id != id);
    }
    render();
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}