
let name;
let allBooks = []
let wantToReadArr = []
let readArr = []
let readingArr = []
function addToWant(i) {
    // if (allBooks.includes(i)) {
        if(!wantToReadArr.includes(i))
        {
        console.log(allBooks);
        $("#want-to-read-container").append("<li id='wa" + i + "'><img src='images/" + i + ".jpg' width='150' height='200'/><button id='" + i + "'>Remove</button></li>");
        wantToReadArr.push(i)
        var index = allBooks.indexOf(i);
        if (index > -1) {
            allBooks.splice(index, 1);
        }
        fetch('/api/list/want-to-read',{
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json', 'name': name }),
            body: JSON.stringify({ isbn: i })
        })
    }
// }
}
function addToReading(i) {
    console.log('reading array--', readingArr);
    if (!readingArr.includes(i)) {
        $("#reading-container").append("<li id='rd" + i + "'><img src='images/" + i + ".jpg' width='150' height='200'/><button id='" + i + "'>Remove</button></li>");
        readingArr.push(i);
        var index = allBooks.indexOf(i);
        if (index > -1) {
            allBooks.splice(index, 1);
        }
        fetch('/api/list/reading', {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json', 'name': name }),
            body: JSON.stringify({ isbn: i })
        })
    }
}
function addToRead(i) {
    if (!readArr.includes(i)) {
        $("#read-container").append("<li id='r" + i + "'><img src='images/" + i + ".jpg' width='150' height='200'/><button id='" + i + "'>Remove</button></li>");
        readArr.push(i);
        var index = allBooks.indexOf(i);
        if (index > -1) {
            allBooks.splice(index, 1);
        }
        fetch('/api/list/read', {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json', 'name': name }),
            body: JSON.stringify({ isbn: i })
        })
    }
}

//deleting book
function deleteBook(i, list) {
    console.log('id-----', i);
    fetch('/api/list/' + list, {
        method: 'DELETE',
        headers: new Headers({ 'content-type': 'application/json', 'name': name }),
        body: JSON.stringify({ isbn: i })
    })
    if(!allBooks.includes(i)){
    allBooks.push(i);
}
}

function displayWantToRead(name) {
    fetch('/api/list/want-to-read', {
        method: 'GET',
        headers: new Headers({ 'content-type': 'application/json', 'name': name }),
    }).then((res) => res.json())
        .then(data => {
            wantToReadArr = data[0]['want-to-read'];
            for (j in data[0]['want-to-read']) {
                $("#want-to-read-container").append("<li id='wa" + data[0]['want-to-read'][j] + "'><img src='images/" + data[0]['want-to-read'][j] + ".jpg' width='150' height='200'/><button id='" + data[0]['want-to-read'][j] + "'>Remove</button></li>");
                wantToReadArr.push(data[0]['want-to-read'][j]);
                var index = allBooks.indexOf(data[0]['want-to-read'][j]);
                console.log('index----->', index)
                if (index > -1) {
                    allBooks.splice(index, 1);
                }
            }
        })
}
function displayReading(name) {
    fetch('/api/list/reading', {
        method: 'GET',
        headers: new Headers({ 'content-type': 'application/json', 'name': name }),
    }).then((res) => res.json())
        .then(data => {
            readingArr = data[0]['reading'];
            console.log('rrrrrrr---', readingArr);
            for (j in data[0]['reading']) {
                $("#reading-container").append("<li id='rd" + data[0]['reading'][j] + "'><img src='images/" + data[0]['reading'][j] + ".jpg' width='150' height='200'/><button id='" + data[0]['reading'][j] + "'>Remove</button></li>");
               readingArr.push(data[0]['reading'][j]);
                var index = allBooks.indexOf(data[0]['reading'][j]);
                if (index > -1) {
                    allBooks.splice(index, 1);
                }
            }
        })
}
function displayRead(name) {
    fetch('/api/list/read', {
        method: 'GET',
        headers: new Headers({ 'content-type': 'application/json', 'name': name }),
    }).then((res) => res.json())
        .then(data => {
            readArr = data[0]['read'];
            // console.log(data[0]['read']);
            for (j in data[0]['read']) {
                $("#read-container").append("<li id='r" + data[0]['read'][j] + "'><img src='images/" + data[0]['read'][j] + ".jpg' width='150' height='200'/><button id='" + data[0]['read'][j] + "'>Remove</button></li>");
                readArr.push(data[0]['read'][j]);
                var index = allBooks.indexOf(data[0]['read'][j]);
                if (index > -1) {
                    allBooks.splice(index, 1);
                }
            }
        })
}

//search function
function searchBook() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("search-book");
    filter = input.value.toUpperCase();
    ul = document.getElementById("bks");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}


$(document).ready(function () {
    $('#want-to-read-popup').hide();
    document.getElementById('signup-btn').addEventListener('click', signup);
    document.getElementById('login-btn').addEventListener('click', login);
    $('#want-to-read-container').on('click', 'button', function () {
        let id = $(this).attr("id");
        let isbn = parseInt(id);
        let list = 'want-to-read';
        deleteBook(isbn, list);
        let bid = "wa" + $(this).attr("id");
        $(`#${bid}`).remove()

    })

    $('#reading-container').on('click', 'button', function () {
        let id = $(this).attr("id");
        let isbn = parseInt(id);
        console.log("isbn type", typeof isbn);
        let list = 'reading';
        deleteBook(isbn, list);
        let bid = "rd" + $(this).attr("id");
        console.log("remove id", bid);
        $(`#${bid}`).remove()

    })
    $('#read-container').on('click', 'button', function () {

        let id = $(this).attr("id");
        let isbn = parseInt(id);
        console.log("isbn type", typeof isbn);
        let list = 'read';
        deleteBook(isbn, list);
        let bid = "r" + $(this).attr("id");
        console.log("remove id", bid);
        $(`#${bid}`).remove()

    })
    $('.logout-button').click(function () {
        $('.book-logo').show();
        $(".all-books").hide();
        allBooks = allBooks.splice(0, allBooks.length)
        wantToReadArr = wantToReadArr.splice(0, wantToReadArr.length)
        readArr = readArr.splice(0, readArr.length)
        readingArr = readingArr.splice(0, readingArr.length)
        let allList = document.getElementById('book-list-container').querySelectorAll('li');
        allList.forEach(item => {
            item.remove();
        })

    })
})


function signup(event) {
    event.preventDefault()
    name = document.getElementById('username').value;
    document.getElementById('username').value = "";
    fetch('/signup', {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({ name: name })
    }).then((res) => res.json())
        .then((data) => {
            $('.book-logo').hide();
            $(".all-books").show();
            getBooks(data)
        }
        )
        .catch((err) => {
            alert(err);
        }
        )
}

function login(event) {
    // debugger;
    event.preventDefault()
    name = document.getElementById('loginuser').value;
    fetch('/login', {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({ name: name })
    }).then((res) => res.json())
        .then((data) => {

            $('.book-logo').hide();
            $(".all-books").show();
            getBooks(data)
        }
        )
        .catch((err) => console.log(err))
}
// displaying all books here

function getBooks(name) {
    fetch('/api/books', {
        method: 'GET',
        headers: new Headers({ 'content-type': 'application/json', 'name': name })
    }).then((res) => res.json())
        .then(data => {
            for (let i in data) {
                allBooks.push(parseInt(data[i]['isbn']))
                $('.bks').append("<li><a href='#'><img src='images/" + data[i].isbn + ".jpg' width='150' height='200'/><button onclick='addToWant(" + data[i].isbn + ")' id='want" + data[i].isbn + "'>want-to-read</button><button onclick='addToReading(" + data[i].isbn + ")' id='reading" + data[i].isbn + "'>reading</button><button onclick='addToRead(" + data[i].isbn + ")' id='read" + data[i].isbn + "'>read</button> " + data[i].title + " </a></li>");
            }
            document.getElementById('user').innerHTML = name;
        })
    console.log('all books----', allBooks)
    displayWantToRead(name)
    displayReading(name)
    displayRead(name)
}