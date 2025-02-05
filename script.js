posts_list = 3

for (let i=1; i<posts_list+1; i++) {
    console.log(i);
    let h1 = document.createElement('h1');
    readName(i,1).then(name => {
        h1.textContent = name;
    });
    document.getElementById('container').appendChild(h1);
    let h3 = document.createElement('h3')
    readName(i,2).then(desc => {
        h3.textContent = desc;
    });
    document.getElementById('container').appendChild(h3)
    let blank = document.createElement('h3');
    blank.textContent = '‎';
    document.getElementById('container').appendChild(blank);
}

function readName(number, thingToGet) {
    return fetch('./posts/' + number + '.json')
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