(function() {
  // slider variables
  var sliderContent, sliderIndex, sliderLength, firstClone, firstItem, isAnimating, itemWidth, lastClone, lastItem;

  sliderContent = $(".slider__content");

  sliderIndex = 0;

  sliderLength = sliderContent.children().length;

  isAnimating = false;

  itemWidth = 100 / sliderLength;

  firstItem = $(sliderContent.children()[0]);

  lastItem = $(sliderContent.children()[sliderLength - 1]);

  firstClone = null;

  lastClone = null;

  // Apply the 3D transformations to avoid a white blink when you slide for the first time
  sliderContent.css("width", sliderLength * 100 + "%");

  sliderContent.transition({
    x: `${sliderIndex * -itemWidth}%`
  }, 0);

  $.each(sliderContent.children(), function() {
    return $(this).css("width", itemWidth + "%");
  });


  // Click on the "Previous" button
  $(".nav--left").on("click", function() {
    if (isAnimating) {
      return;
    }
    isAnimating = true;
    sliderIndex--;
    if (sliderIndex === -1) {
      lastItem.prependTo(sliderContent);
      sliderContent.transition({
        x: `${(sliderIndex + 2) * -itemWidth}%`
      }, 0);
      return sliderContent.transition({
        x: `${(sliderIndex + 1) * -itemWidth}%`
      }, 1000, "linear", function() {
        sliderIndex = sliderLength - 1;
        lastItem.appendTo(sliderContent);
        sliderContent.transition({
          x: `${sliderIndex * -itemWidth}%`
        }, 0);
        return isAnimating = false;
      });
    } else {
      return sliderContent.transition({
        x: `${sliderIndex * -itemWidth}%`
      }, 1000, "linear", function() {
        return isAnimating = false;
      });
    }
  });

  // Click on the "Next" button
  $(".nav--right").on("click", function() {
    if (isAnimating) {
      return;
    }
    isAnimating = true;
    sliderIndex++;
    return sliderContent.transition({
      x: `${sliderIndex * -itemWidth}%`
    }, 1000, "linear", function() {
      isAnimating = false;
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
        return;
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
        return sliderContent.transition({
          x: `${sliderIndex * -itemWidth}%`
        }, 0);
      }
    });
  });

}).call(this);
