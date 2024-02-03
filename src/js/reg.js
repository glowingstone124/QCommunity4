async function reg() {
    var username = document.getElementById('username');
    var apiEndpoint = localStorage.getItem("api")
    var password = document.getElementById('password');
    const loginHint = document.getElementById('loginHint');
    const tokenInstance = new token();
    if (username.value !== '' && password.value !== '') {
        try {
            const url = apiEndpoint + '/forum/register?username=' + username.value + "&password=" + password.value + "&token=" + tokenInstance.token(username.value, 1700435);
            ;

            const response = await get(url);

            if (response.code == 0) {
                loginHint.innerHTML = "注册成功";
            } else {
                username.classList.add('error');
                password.classList.add('error');
                loginHint.innerHTML = "注册失败";
            }
        } catch (error) {
            console.error('Error during login:', error);
            username.classList.add('error');
            password.classList.add('error');
            loginHint.innerHTML = "注册失败";
        }
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
    hints.textContent = "你知道吗? " + hintList[currentIndex];
    currentIndex = (currentIndex + 1) % hintList.length;
}
freshHint();
setInterval(freshHint, 10000);

