$(document).ready(function () {

    var tasklist = document.querySelector('#tasklist');
    var form = document.querySelector('form');
    var task = document.querySelector('#task');



    //Checks the list for status of list and adds/deletes button/text
    function checkList() {
        if (tasklist.innerHTML === '') {
            //adds the empty list text and clears button
            $('#clearBtn').empty();
            $('#emptyText').append(`<h2 class="text-secondary text-center" id="emptyText">ToDo List is empty...</h2>`);
        } else {
            $('#emptyText').empty();
            if ($('#clearBtn').is(':empty')) {
                //adds button and event listener for the clear to clear the list
                $('#clearBtn').append(`<div class="col-4"></div>
                <button type="reset" class="btn btn-danger col-4">Remove all</button>
                <div class="col-4"></div>`)
                document.querySelector('button').addEventListener('click', function (e) {
                    $('#tasklist').empty();
                    store();
                })
            }
        }
    }

    //for adding new items to the task list
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        tasklist.innerHTML += '<li>' + task.value + '</li>';
        store();
        task.value = "";
    }, false)

    //adds the click functioinality to the items
    tasklist.addEventListener('click', function (e) {
        var t = e.target;
        if (t.classList.contains('checked')) {
            t.parentNode.removeChild(t);
        } else {
            t.classList.add('checked');
        }
        store();
    }, false)

    //keeps the tasklist synced with the devices local storage to maintain data between refresh
    function store() {
        checkList();
        window.localStorage.myitems = tasklist.innerHTML;
    }

    //initializes the list when the page loads
    function initialize() {
        var storedValues = window.localStorage.myitems;
        if (!storedValues) {
            //adds the empty list text
            $('#emptyText').append(`<h2 class="text-secondary text-center" id="emptyText">ToDo List is empty...</h2>`);
        }
        else {
            //adds button and event listener for the clear to clear the list
            $('#clearBtn').append(`<div class="col-4"></div>
                <button type="reset" class="btn btn-danger col-4">Remove all</button>
                <div class="col-4"></div>`)
            document.querySelector('button').addEventListener('click', function (e) {
                $('#tasklist').empty();
                store();
            })
            tasklist.innerHTML = storedValues;
        }
    }
    initialize();

});