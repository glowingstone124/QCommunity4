async function login() {
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    var autoLoginstat = document.getElementById('check-24');
    const loginHint = document.getElementById('loginHint');
    if (localStorage.getItem('autologin') === 'true') {
        autoLogin();
    }
    
    if (username.value !== '' && password.value !== '') {
        try {
            // 修改为实际的服务器端点
            const url = apiEndpoint + '/forum/login?username=' + username.value + "&password=" + password.value;
            const response = await get(url);

            if (response.code == 0) {
                if (autoLoginstat.checked == true){
                    saveLogin(true);
                }
                showOverlay();
                setTimeout(() => {
                    console.log('LOGIN SUCCESS.');
                    localStorage.setItem("username", username.value);
                    window.location.replace("main.html");
                }, 1000);
            } else {
                username.classList.add('error');
                password.classList.add('error');
                loginHint.innerHTML = "登录失败";
            }
        } catch (error) {
            console.error('Error during login:', error);
            username.classList.add('error');
            password.classList.add('error');
            loginHint.innerHTML = "登录失败";
        }
    } else {
        username.classList.add('error');
        password.classList.add('error');
        loginHint.innerHTML = "用户名或者密码不能为空";
    }
}
const hintList = [
    "QuantumOriginal始于2023年暑假！",
    //"Oregano其实叫牛至，也叫披萨草",
    "服务器api其实是一个开源项目！"
];
let currentIndex = 0;

function freshHint() {
    const hints = document.getElementById("hints");
    hints.style.animation = 'fadeOut 1s';
    setTimeout(() => {
        hints.textContent = "你知道吗? " + hintList[currentIndex];
        currentIndex = (currentIndex + 1) % hintList.length;
        hints.style.animation = 'fadeIn 1s';
    }, 1000);
}
freshHint();
setInterval(freshHint, 10000);

function showOverlay() {
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('overlay').style.animation = 'fadeIn 1s';
}

function hideOverlay() {
    document.getElementById('overlay').style.display = 'none';
}
async function sendConsole(message){
    ipcRenderer.send('sendMsg', message);
    ipcRenderer.on('repl', (event, arg) => {
        //no nothing
    });
}
function autoLogin(){
    window.location.replace("main.html");
}
function saveLogin(operation){
    localStorage.setItem("autologin", operation.toString());
}
``