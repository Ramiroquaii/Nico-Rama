const socket = io();

const btnLogin = document.querySelector("#btn-login");
btnLogin.addEventListener("click", loginUser);


function loginUser(event) {
    event.preventDefault();
    const user = { user: document.getElementById('user').value };
    socket.emit('login-user', user);
}

socket.on('user-error', error => {
    alert(error);
});

socket.on('reload', obj => {
    btnLogin.removeEventListener("click", loginUser);
    
    const object = JSON.parse(obj);
    console.log(object);
    document.getElementById('mainHTML').innerHTML = object.html;
    mainLoadedAfterLogin();
    document.getElementById('wellcomeUserName').innerHTML = `Bienvenido ${object.user}`;

    socket.emit('loadProductos', '__');
});


socket.on('redirect', function(destination) {
    window.location.href = destination;
});