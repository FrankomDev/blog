const queryParams = new URLSearchParams(window.location.search);
const blogValue = queryParams.get('blog');

title = document.getElementById('title_input');
desc = document.getElementById('description_input');
date = document.getElementById('date_input');
content = document.getElementById('content_input');

const numberBlog = document.getElementById('getNum');
numberBlog.value = blogValue;

if (blogValue) {
    readJson(blogValue,1).then(name => {
        title.value = name;
    });
    readJson(blogValue,2).then(name => {
        desc.value = name;
    });
    readJson(blogValue,3).then(name => {
        date.value = name;
    });
    readJson(blogValue,4).then(name => {
        content.value = name;
    });
}else {
    console.log('no value')
}

function readJson(number, thingToGet) {
    return fetch('/static/posts/' + number + '.json')
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