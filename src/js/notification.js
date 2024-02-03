/**
 * 切换指定 ID 的元素的显示和隐藏状态
 * @param {string} id - 元素的 ID
 * @param {string} content - 要显示在弹出框中的内容
 * @param {number} duration - 自动关闭的等待时间（毫秒）
 */
function togglePopup(id, content, duration) {
    const popup = document.getElementById(id);
    if (popup) {
        popup.classList.toggle('show');
        if (content) {
            popup.innerHTML = "<h2>" + content + "</h2>";
        }
        if (duration) {
            setTimeout(function () {
                popup.classList.remove('show');
            }, duration);
        }
    }
}
