(function() {
  // slider variables
  var sliderContent, sliderIndex, sliderLength, firstClone, firstItem, isAnimating, itemWidth, lastClone, lastItem;

  sliderContent = $(".slider__content");

  sliderIndex = 0;

  sliderLength = sliderContent.children().length;

  itemWidth = 100 / sliderLength;

  firstItem = $(sliderContent.children()[0]);

  lastItem = $(sliderContent.children()[sliderLength - 1]);

  firstClone = null;

  // Apply the 3D transformations to avoid a white blink when you slide for the first time
  sliderContent.css("width", sliderLength * 100 + "%");

  sliderContent.transition({
    x: `${sliderIndex * -itemWidth}%`
  }, 0);

  $.each(sliderContent.children(), function() {
    return $(this).css("width", itemWidth + "%");
  });

  function animateSlider() {
    sliderIndex++;
    return sliderContent.transition({
      x: `${sliderIndex * -itemWidth}%`
    }, 15000, "linear", function() {
      if (firstClone) {
        sliderIndex = 0;
        sliderContent.transition({
          x: `${sliderIndex * -itemWidth}%`
        }, 0);
        firstClone.remove();
        firstClone = null;
        sliderLength = sliderContent.children().length;
        itemWidth = 100 / sliderLength;
        sliderContent.css("width", sliderLength * 100 + "%");
        $.each(sliderContent.children(), function() {
          return $(this).css("width", itemWidth + "%");
        });
        return animateSlider();
      }
      if (sliderIndex === sliderLength - 1) {
        sliderLength++;
        itemWidth = 100 / sliderLength;
        firstClone = firstItem.clone();
        firstClone.addClass("clone");
        firstClone.appendTo(sliderContent);
        sliderContent.css("width", sliderLength * 100 + "%");
        $.each(sliderContent.children(), function() {
          return $(this).css("width", itemWidth + "%");
        });
        sliderContent.transition({
          x: `${sliderIndex * -itemWidth}%`
        }, 0);
        return animateSlider();
      }
      animateSlider();
    });
  };

  // while(true){
  animateSlider();
  // }

}).call(this);
