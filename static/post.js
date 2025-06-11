const queryParams = new URLSearchParams(window.location.search);

const blogValue = queryParams.get('blog');
const titleElement = document.getElementById('title');
const descriptionElement = document.getElementById('description');
const dateElement = document.getElementById('date');
const containsElement = document.getElementById('contains');

if (blogValue) {
    readJson(blogValue);
}else {
    console.log('no value');
}

function insertData(title, desc, date, contains){
    titleElement.innerText = title;
    descriptionElement.innerText = desc;
    dateElement.innerText = date;
    containsElement.innerHTML = marked.parse(contains);
}

function readJson(number) {
    return fetch('/static/posts/' + number + '.json')
        .then(response => response.json()) 
        .then(data => {
            insertData(data.name, data.description, data.date, data.contains); 
        })
        .catch(error => {
            console.error('Error reading the JSON file:', error);
            return null; 
        });
}