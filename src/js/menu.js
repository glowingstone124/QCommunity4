const menu = document.getElementById("menu");
const menucontentDefault = `
    <div class="menucontent">
    <img src="assets/home.svg"><a href="main.html">主页</a>
    </div>
    <div class="menucontent">
    <img src="assets/account.svg"><a href="bind.html">注册/查询</a>
    </div>
    <div class="menucontent">
    <img src="assets/settings.svg"><a href="settings.html">设置</a>
    </div>
    <div class="menucontent">
    <img src="assets/chat.svg"><a href="msglist.html">消息列表</a>
    </div>
`;
const menucontentSmall = `
    <div class="menucontent">
    <a href="main.html"><img src="assets/home.svg"></a>
    </div>
    <div class="menucontent">
    <a href="bind.html"><img src="assets/account.svg"></a>
    </div>
    <div class="menucontent">
    <a href="settings.html"><img src="assets/settings.svg"></a>
    </div>
    <div class="menucontent">
    <a href="msglist.html"><img src="assets/chat.svg"></a>
</div>
`;
reportWindowSize();
window.onresize = reportWindowSize;
menu.style.flex = 1;
function reportWindowSize() {
    if (window.innerWidth < 1300){
        menu.innerHTML = menucontentSmall
    } else {
        menu.innerHTML = menucontentDefault
    }
}
