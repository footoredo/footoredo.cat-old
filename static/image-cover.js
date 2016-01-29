var sync_cover = function(cover, image) {
  cover.style.width = image.width() + "px";
  cover.style.height = image.height() + "px";
  cover.style.top = image.offset().top + "px";
  cover.style.left = image.offset().left + "px";
  return cover;
}

window.onload = function() {
  $("img").each(function() {
    var cover = document.createElement("a"), image = $(this);
    cover.setAttribute("class", "image-cover");
    cover.setAttribute("href", $(this).context.src);
    cover = sync_cover(cover, $(this));
    $(window).resize(function(){cover = sync_cover(cover, image);});
    document.body.appendChild(cover);
    $(cover).mouseover(function() {
      image.addClass("mouseover");
      /*
      var hugecover = document.createElement("div");
      hugecover.setAttribute("class", "hugecover");
      $(hugecover).offset({left:0,top:document.body.scrollTop});
      window.onscroll = function() {
        $(hugecover).offset({left:0,top:document.body.scrollTop});
      }
      
      image.parent().prepend(hugecover);*/
      /*$(".hugecover").animate({"opacity":0.2});*/
    });
    $(cover).mouseout(function() {
      image.removeClass("mouseover");
      /*$(".hugecover").animate({"opacity":0});*/
    });
  });
  
  $(".hugecover").offset({left:0,top:document.body.scrollTop});
  window.onscroll = function() {
    $(".hugecover").offset({left:0,top:document.body.scrollTop});
  }
}
