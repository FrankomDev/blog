getNum = document.getElementById('isHidden').innerText;
posts_list = parseFloat(getNum);

for (let i=1; i<posts_list+1; i++) {
    console.log(i);
    let h1 = document.createElement('p');
    readName(i,1).then(name => {
        h1.textContent = name;
    });
    h1.onclick = function () {
        window.location.href= "./post?blog="+i;
    };
    h1.className = 'h1 text-center text-light';
    h1.style.cursor = "pointer";
    document.getElementById('container').appendChild(h1);
    let h3 = document.createElement('p')
    readName(i,2).then(desc => {
        h3.textContent = desc;
    });
    h3.className = 'h5 text-center text-light';
    document.getElementById('container').appendChild(h3)
    let blank = document.createElement('br');
    document.getElementById('container').appendChild(blank);
    let blank2 = document.createElement('br');
    document.getElementById('container').appendChild(blank2);
}

function readName(number, thingToGet) {
    return fetch('/static/posts/' + number + '.json')
        .then(response => response.json()) 
        .then(data => {
            if (thingToGet == 1){
                return data.name; 
            }else if (thingToGet == 2){
                return data.description
            }
            
        })
        .catch(error => {
            console.error('Error reading the JSON file:', error);
            return null; 
        });
}