const mainSettingMenu = document.getElementById("settingsmenu");
const mainSettingContent = document.getElementById('settingscontent');
const accountDiv = document.getElementById('account');
const aboutDiv = document.getElementById('about');
const aboutText = document.getElementById('aboutText');
const accountText = document.getElementById('accountText');
var nowselected = undefined;
var ver;
var verjson;
var userimgurl;
const username = localStorage.getItem("username");
async function getVer(){
    verjson = await get("http://qoriginal.vip:8080/");
    ver = verjson.build
}
async function updateAcc(){
    var userimgurljson = await get("http://qoriginal.vip:8080/qo/download/avatar?name=" + username);
    userimgurl = userimgurljson.url;
    document.getElementById("users").innerHTML = `
    <strong class="MC2086"><img id="useravatar" class="standyardavatar">作为 ${username} 登录</strong>
    `;
    document.getElementById("useravatar").src = userimgurl;
}
function clearLogin(){
    localStorage.setItem('autologin', false);
    window.location.replace('index.html');
}
getVer();
accountDiv.addEventListener('click', () => {
    nowselected = 0;
    addSelect();
});

aboutDiv.addEventListener('click', () => {
    nowselected = 1;
    addSelect();
});

function addSelect() {
    accountDiv.classList.remove("selected");
    aboutDiv.classList.remove("selected");

    switch (nowselected) {
        case 0:
            accountDiv.classList.add("selected");
            mainSettingContent.innerHTML = `
            <p id="users"><strong class="MC2086"><img src="" id="useravatar"></strong></p>
            <a href="#" class="button2" onclick="logoff()">注销登录</a>
          </label></h2>
            `
            updateAcc();
            break;
        case 1:
            aboutDiv.classList.add("selected");
            mainSettingContent.innerHTML = `
            <h1>关于QCommunity</h1>
            <p>QCommunity 是一个可以与任何基于QAPI3后端通讯的前端项目，专为QOriginal打造。</p>
            <p>QCommunity <br>  程序&设计  glowingstone124</p>
            <p> <a href="https://github.com/glowingstone124/QAPI3" target="_blank">QAPI3</a>是一个基于Springboot的开源后端项目，用于管理Minecraft服务器 <br> 致谢： <br> <strong class="MC2086"><img src="https://crafatar.com/avatars/854b1d1db7a7469085efb4536a06c2de">MineCreeper2086</strong> <br>               api早期结构设计&开发者</p>
            <p id="ver">QAPI build: undefined</p>
            `
            document.getElementById("ver").innerText = "QAPI build:" + ver
            break;
        default:
    }
}
function freshSettings(){
    if (nowselected == undefined){

    }
}
function logoff(){
    localStorage.setItem('autologin', false);
    window.location.replace('index.html');
}