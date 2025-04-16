getNum = document.getElementById('isHidden').innerText;
posts_list = parseFloat(getNum);
mikuHidden = false;

for (let i=1; i<posts_list+1; i++) {
    console.log(i);
    let filename = document.createElement('p');
    filename.className = 'h2 text-light';
    filename.textContent = i+'.json';
    document.getElementById('container').appendChild(filename);
    let h2title = document.createElement('p');
    h2title.className = 'h2 text-light';
    readName(i,1).then(name => {
        h2title.textContent = name;
    });
    document.getElementById('container').appendChild(h2title);
    let ahref = document.createElement('a');
    ahref.href = '/edit?blog='+i;
    document.getElementById('container').appendChild(ahref);
    let button = document.createElement('button');
    button.className = 'login';
    button.textContent = 'Edit';
    ahref.appendChild(button);
    let line = document.createElement('hr');
    line.style = 'width: 20%; height: 2px; background-color: white; border: none; opacity: 1; margin: auto;';
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

function hideMiku() {
    if(mikuHidden==false){
        btn = document.getElementById('hide');
        miku = document.getElementById('miku');
        miku.className = 'isHidden';
        mikuHidden = true;
        btn.textContent = 'Show Miku'
    }else{
        btn = document.getElementById('hide');
        miku = document.getElementById('miku');
        miku.className = 'isVisible';
        mikuHidden = false;
        btn.textContent = 'Hide Miku'
    }
    
}