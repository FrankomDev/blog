getNum = document.getElementById('isHidden').innerText;
posts_list = parseFloat(getNum);


for (let i=posts_list; i>0; i--) {
    fetch('/static/posts/' + i + '.json')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            insertElement(i,data.name,data.description)
        })
}


function insertElement(i,name,desc){
    //console.log(i);
    let h1 = document.createElement('p');
    h1.textContent = name;  
    h1.onclick = function () {
        window.location.href= "./post?blog="+i;
    };
    h1.className = 'h1 text-center text-light';
    h1.style.cursor = "pointer";
    document.getElementById('container').appendChild(h1);
    let h3 = document.createElement('p') 
    h3.textContent = desc;
    h3.className = 'h5 text-center text-light';
    document.getElementById('container').appendChild(h3)
    let blank = document.createElement('br');
    document.getElementById('container').appendChild(blank);
    let blank2 = document.createElement('br');
    document.getElementById('container').appendChild(blank2);
}