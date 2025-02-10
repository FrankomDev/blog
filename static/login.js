const queryParams = new URLSearchParams(window.location.search);

const isError = queryParams.get('error');

if (isError==1) {
    window.alert('Wrong password!')
}else {
    console.log('no value')
}
