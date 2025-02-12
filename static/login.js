const queryParams = new URLSearchParams(window.location.search);

const isError = queryParams.get('error');
errorBlock = document.getElementById('wrongpass');

if (isError==1) {
    // window.alert('Wrong password!')
    errorBlock.style.display = "block"
}else {
    console.log('no value')
}
