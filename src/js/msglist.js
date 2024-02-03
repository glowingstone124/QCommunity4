var container = document.getElementById('msgFather');
var lastMsgList = [];

async function getMsgList() {
    var msgresult = await get('http://qoriginal.vip:8080/qo/msglist/download');
    var msgArr = msgresult.messages;

    if (!arraysAreEqual(msgArr, lastMsgList)) {
        updateMsgList(msgArr);
        lastMsgList = msgArr;
    }
}

function updateMsgList(msgArr) {
    container.innerHTML = '';

    if (!msgArr.length) {
        displayNoMessages();
    } else {
        displayMessages(msgArr);
    }
}

function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}

function displayNoMessages() {
    var divElement = createMessageDiv("暂时没有消息~");
    container.appendChild(divElement);
}

function displayMessages(msgArr) {
    for (var i = 0; i < msgArr.length; i++) {
        var divElement = createMessageDiv(msgArr[i]);
        container.appendChild(divElement);
    }
}

function createMessageDiv(message) {
    var divElement = document.createElement('div');
    divElement.classList.add('msgdiv');

    var pElement = document.createElement('p');
    pElement.innerText = message;

    divElement.appendChild(pElement);
    return divElement;
}

setInterval(getMsgList, 1000);
getMsgList();
