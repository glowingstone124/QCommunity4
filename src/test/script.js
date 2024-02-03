var windowElement = document.getElementById("myWindow");
var headerElement = document.getElementById("myHeader");
var offsetX, offsetY;
headerElement.onmousedown = function(e) {
  offsetX = e.clientX - windowElement.getBoundingClientRect().left;
  offsetY = e.clientY - windowElement.getBoundingClientRect().top;
  document.onmousemove = function(e) {
    var x = e.clientX - offsetX;
    var y = e.clientY - offsetY;
    windowElement.style.left = x + "px";
    windowElement.style.top = y + "px";
  };

  document.onmouseup = function() {
    document.onmousemove = null;
    document.onmouseup = null;
  };
};
function closeWindow() {
  windowElement.style.display = "none";
}
