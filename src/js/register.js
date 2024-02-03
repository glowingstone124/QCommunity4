async function reg(){
    var username = document.getElementById('username');
    var uid = document.getElementById('uid');
    var data = "";
    const loginHint = document.getElementById('regHint');
        if (username.value !== '' && uid.value !== '') {
            try {
                const url = 'http://qoriginal.vip:8080/qo/upload/registry?name=' + username.value + "&uid=" + uid.value + "&appname=" + localStorage.getItem("username");
                var data = await post(url, data);
                if (data.code != -1) {
                    togglePopup("notification", "注册成功", 1000)
                } else {
                    username.classList.add('error');
                    uid.classList.add('error');
                    togglePopup("notification","注册失败，请检查：<br> 1.是否存在重复注册？<br> 2.用户名是否合法？",1000);
                }
            } catch (error) {
                console.error('Error during login:', error);
                username.classList.add('error');
                uid.classList.add('error');
                loginHint.innerHTML = "注册失败";
            }
        } else {
            username.classList.add('error');
            uid.classList.add('error');
            togglePopup("notification","QQ和用户名为必填项",1000);
    }
}
