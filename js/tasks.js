window.ToDoList ={
    API_BASE_URL:"http://localhost:8081/tasks",
    getTasks: function () {
        $.ajax({
            url: ToDoList.API_BASE_URL,
            method: "GET"
        }).done(function (response) {
            console.log(response);
            ToDoList.displayTasks(JSON.parse(response));
        })
    },
    createTasks: function () {
        let descriptionValue=$("#description-field").val();
        let deadlineValue=$("#deadline-field").val();
        let requestBody={
            description: descriptionValue,
            deadline: deadlineValue
        };
        $.ajax({
            url: ToDoList.API_BASE_URL,
            method: "POST",
            //also known as MIME type
            contentType: "application/json",
            data: JSON.stringify(requestBody)
        }).done(function (requestBody) {
            ToDoList.getTasks();
        })

    },
    getTaskRow: function (task) {
        // spread operator( ... )
        let formattedDeadline = new Date(...task.deadline).toLocaleDateString("ro");
        //ternary operator
        let checkedAttribute = task.done ? " checked" : "";
        // same result as using if else statements
        return `<tr>
            <td> ${task.description} </td>
            <td> ${formattedDeadline} </td>
            <td><input type="checkbox" data-id=${task.id} class="mark-done" ${checkedAttribute}/></td>
            <td><a href="#" data-id="${task.id}" class="delete-task"> <i class="fas fa-trash-alt"></i>
            </a> </td>
        </tr>`
    },
    displayTasks: function (tasks) {
        // weak-typed (javascript) vs strong-typed (java)
        var tableBody = '';
        tasks.forEach(task => tableBody+=ToDoList.getTaskRow(task));
        $("#tasks-table tbody").html(tableBody);
    },
    bindEvents:function () {
        //capturing Submit-form event for function binding
        $("#new-task-form").submit(function (event) {
            event.preventDefault();
            ToDoList.createTasks();
        })
    }
};
//from api
ToDoList.getTasks();
ToDoList.bindEvents();