module.exports = {
    login: googleLogin,
    logout: logout
};

function googleLogin(){
    let a = document.createElement("a");
    a.href = "/auth/google";
    a.dispatchEvent(new MouseEvent("click", {bubbles: true, cancelable: true, view: window}));
}

function logout(){
    const xmlRequest = new XMLHttpRequest();
    xmlRequest.onload = function(){};
    xmlRequest.open("post", "/logout");
    xmlRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlRequest.send();
    location.reload();
}