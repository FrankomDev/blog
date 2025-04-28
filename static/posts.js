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
    button.textContent = 'Edit';
    ahref.appendChild(button);

    let delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = function() { confirmDel(i); };
    document.getElementById('container').appendChild(delBtn);
    
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

//function confirmDel(file) {
 //   if (confirm('Are you sure you want to delete '+file+'?')){
   //     console.log('zaakceptowane');
   // }else {
     //   console.log('odrzucone');
    //}
//}

function confirmDel(file) {
    let popup = prompt('Are you sure you want to delete '+file+'.json?', 'Password');
    if (popup != null){
        fetch('./delPost', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              postFile: file,
              passwd: popup
            })
          })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    }
}
