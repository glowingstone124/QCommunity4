const greeting = document.getElementById("greeting");
const serverStatus = document.getElementById('showsrvstat');
var apiEndpoint = localStorage.getItem("api")
var currentDate = new Date();
var dayOfWeekIndex = currentDate.getDay();
var monthAbbreviations = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
var dayOfWeekNames = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];
var year = currentDate.getFullYear();
var dayOfWeekName = dayOfWeekNames[dayOfWeekIndex];
var monthIndex = currentDate.getMonth();
var monthAbbreviation = monthAbbreviations[monthIndex];
var day = currentDate.getDate().toString().padStart(2, '0');
var dayOfWeekInfo = `<p>${dayOfWeekName}</p>`;
var formattedDate = `<h1>NONE</h1>`;
const appver = 5;
function checkCurrentTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    if (hours < 12) {
        return "上午好，";
    } else if (hours < 18) {
        return "下午好，";
    } else if( hours == 12){
        return "中午好,";
    }else {
        return "晚上好，";
    }
}

async function getUpdate(){
    const version = await get(apiEndpoint + "/app/latest");
    if (version.version > appver){
        const updateWindow = document.getElementById("update");
        updateWindow.style.display = 'block';
        updateWindow.innerHTML = "<h1 style=\"color:black\">您的Oregano APP需要更新！当前版本：" + appver +"最新构建：" + version.version + "</h1>"
    }
}
getUpdate();
switch(day){
    case 1:
        formattedDate = `<h1>${monthAbbreviation}.<br> ${day}st</h1>`;
        break;
    case 2:
        formattedDate = `<h1>${monthAbbreviation}.<br> ${day}nd</h1>`;
        break;
    case 3:
        formattedDate = `<h1>${monthAbbreviation}.<br> ${day}rd</h1>`;
        break;
    default:
        formattedDate = `<h1>${monthAbbreviation}.<br> ${day}th</h1>`;
        break;
}
greeting.innerText = checkCurrentTime() + "\n" + localStorage.getItem("username");
serverStatus.classList.add("off")
async function syncServer(){
    try {
      const serverStat = await get(apiEndpoint + "/qo/alive/download");
      if (serverStat.stat == 1) {
        serverStatus.classList.replace('on', 'off');
        serverStatus.textContent = "关闭";
      } else {
        serverStatus.classList.replace('off', 'on');
        serverStatus.textContent = "在线";
      }
    } catch (error) {
        serverStatus.classList.replace('on', 'off');
        document.getElementById('status').style.backgroundColor = "rgb(38,42,39)";
        serverStatus.textContent = "无法访问api";
    }
  }
async function getBind(){
    const bindapi = await get(apiEndpoint + "/qo/download/link?name=" + localStorage.getItem('username'));
    if (bindapi.code == 0){
        var name = bindapi.message;
    } else {
        var name = "你似乎还没有绑定";
    }
    document.getElementById('bind').textContent = name;
}
async function getEco(){
    var eco;
    const ecoapi = await get(apiEndpoint + "/qo/download/registry?name=" + localStorage.getItem('username'));
    if (ecoapi.code == 0){
        eco = ecoapi.economy;
    } else {
        eco = "该版本不支持Economy特性";
    }
    document.getElementById('eco').textContent = eco;
}
async function getFirstLogin(){
    var hint = document.getElementById('firstLogin');
    const loginapi = await get(apiEndpoint + "/api/isFirstLogin?name=" + localStorage.getItem('username'));
    if (loginapi.first == true){
        hint.style.display = 'block';
        openPopup();
    } else {
        hint.style.display = 'none';
    }
}
function openPopup() {
    document.getElementById("popup").style.display = "block";
}
function closePopup() {
    var popup = document.getElementById("popup");
    popup.classList.add("closing");
    setTimeout(function() {
        popup.style.display = "none";
        popup.classList.remove("closing");
    }, 500);
}
getFirstLogin();
getBind();
getEco();
syncServer();
setInterval(() => {
    syncServer();
} ,1000);
document.getElementById("formattedDate").innerHTML = formattedDate;
document.getElementById("weekinf").innerHTML = dayOfWeekInfo;