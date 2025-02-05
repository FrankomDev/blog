const queryParams = new URLSearchParams(window.location.search);

const blogValue = queryParams.get('blog');
const titleElement = document.getElementById('title');
const descriptionElement = document.getElementById('description');
const dateElement = document.getElementById('date');
const containsElement = document.getElementById('contains');

if (blogValue) {
    console.log(titleElement)
    readJson(blogValue,1).then(name => {
        titleElement.innerText = name;
    });
    readJson(blogValue,2).then(name => {
        descriptionElement.innerText = name;
    });
    readJson(blogValue,3).then(name => {
        dateElement.innerText = name;
    });
    readJson(blogValue,4).then(name => {
        containsElement.innerText = name;
    });
}else {
    console.log('no value')
}


function readJson(number, thingToGet) {
    return fetch('./posts/' + number + '.json')
        .then(response => response.json()) 
        .then(data => {
            if (thingToGet == 1){
                return data.name; 
            }else if (thingToGet == 2){
                return data.description
            }else if (thingToGet == 3){
                return data.date
            }else if (thingToGet == 4){
                return data.contains
            }
            
        })
        .catch(error => {
            console.error('Error reading the JSON file:', error);
            return null; 
        });
}