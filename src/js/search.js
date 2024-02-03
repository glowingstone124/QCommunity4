async function s() {
    var sea = document.getElementById('sear');
    var apiEndpoint = localStorage.getItem("api")
    const loginHint = document.getElementById('searchHint');
    if (sea.value !== '') {
        try {
            const url = apiEndpoint + '/qo/download/registry?name=' + sea.value;
            var response = await get(url);
            if (response.code == 0) {
                loginHint.textContent = "玩家qq号：" + response.qq;
            } else {
                loginHint.textContent = "玩家不存在";
            }
        } catch (error) {
            sea.classList.add('error');
            loginHint.innerHTML = "注册失败";
        }
    } else {
        sea.classList.add('error');
        loginHint.innerHTML = "username为必填项";
    }
}
