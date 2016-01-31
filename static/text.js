var latin = function(char) {
  return char.charCodeAt(0) < 8192;
}

var han = function(char) {
  return char.charCodeAt(0) >= 19968 && char.charCodeAt(0) <= 40869;
}

var process = function(str) {
  var ret = "";
  for (var i = 0; i < str.length - 1; i++) {
    ret += str[i];
    if (han(str[i]) && latin(str[i+1]) || han(str[i+1]) && latin(str[i]))
      ret += " "
  }
  ret += str[str.length - 1]
  return ret;
}

var sync_marker = function(marker, combine) {
  marker.style.fontSize = combine.css("font-size")
  marker.style.top = combine.offset().top + "px";
  marker.style.left = (combine.offset().left - parseInt(marker.style.fontSize) - 2) + "px";
  return marker;
}

window.addEventListener("load", function() {
  $(".blog").find("*:not(:has(*))").each(function() {
    if ($(this).text())
      $(this).text(process($(this).text()));
  });
  
  $("h2,h3").each(function() {
    var marker = document.createElement("div"), combine = $(this);
    marker.setAttribute("class", "marker");
    marker.innerText = "#";
    marker = sync_marker(marker, combine);
    document.body.appendChild(marker);
    $(window).resize(function(){marker=sync_marker(marker,combine);});
    $(marker).click(function(){
      $('html, body').animate({
        scrollTop: $(marker).offset().top
      })
    });
  });
});
