getNum = document.getElementById('isHidden').innerText;
posts_list = parseFloat(getNum);

for (let i=1; i<posts_list+1; i++) {
    console.log(i);
    let filename = document.createElement('h2');
    filename.textContent = i+'.json';
    document.getElementById('container').appendChild(filename);
    let h2title = document.createElement('h2');
    readName(i,1).then(name => {
        h2title.textContent = name;
    });
    document.getElementById('container').appendChild(h2title);
    let button = document.createElement('button');
    button.className = 'login';
    button.textContent = 'Edit';
    document.getElementById('container').appendChild(button);
    let line = document.createElement('hr');
    line.id = 'line'
    document.getElementById('container').appendChild(line);
}

function readName(number) {
    return fetch('/static/posts/' + number + '.json')
        .then(response => response.json()) 
        .then(data => {
            return data.name; 
        })
        .catch(error => {
            console.error('Error reading the JSON file:', error);
            return null; 
        });
}