var notification = document.getElementById('path');
var id = document.getElementById('id')
var btn = document.getElementById('submit')
var nowSel = 0;
switchMode(0)
notification.style.display = 'none';
function showNotification(message) {
    var notification = document.getElementById('path');
    notification.style.display = 'block';
    notification.textContent = message;

    setTimeout(function () {
        notification.style.display = 'none';
    }, 30000);
}

 async function submit(){
    var uploadContentObject = document.getElementById('textarea');
    var text = uploadContentObject.value;
    if (text != ""){
    console.log(text);
    var resp = await post('http://qoriginal.vip:8080/qo/upload/paste', text);
    if (resp.code === 0){
      showNotification('此文本上传成功。位于 ' + resp.dist);
    } else if (resp.code === 599) {
      showNotification('失败')
    }
} else {
    showNotification("不能为空")
}
}
async function getLog() {
    var path = id.value;
    var obj = document.getElementById('textarea');
    var resp = await get('http://qoriginal.vip:8080/qo/paste/' + path);
    if (resp.code == 0) {
        var cleanText = resp.content.split('\\n').join('<br>').trim();
        cleanText = cleanText.trim();
        obj.innerText = cleanText;
    } else {
        obj.innerText = "未找到此文本";
    }
}
function switchMode(mode){
    switch(mode){
        case 0:
            id.style.display = 'none';
            btn.onclick = function(){submit()}
            break;
        case 1:
            id.style.display = 'block'
            btn.onclick = function(){getLog()}
            break;
    }
}