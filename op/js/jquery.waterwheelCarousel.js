/*!
 * Waterwheel Carousel
 * Version 2.3.0
 * http://www.bkosborne.com
 *
 * Copyright 2011-2013 Brian Osborne
 * Dual licensed under GPLv3 or MIT
 * Copies of the licenses have been distributed
 * with this plugin.
 *
 * Plugin written by Brian Osborne
 * for use with the jQuery JavaScript Framework
 * http://www.jquery.com
 */
;(function ($) {
  'use strict';

  $.fn.waterwheelCarousel = function (startingOptions) {

    // Adds support for intializing multiple carousels from the same selector group
    if (this.length > 1) {
      this.each(function() {
        $(this).waterwheelCarousel(startingOptions);
      });
      return this; // allow chaining
    }

    var carousel = this;
    var options = {};
    var data = {};

    function initializeCarouselData() {
      data = {
        itemsContainer:         $(carousel),
        totalItems:             $(carousel).find('img').length,
        containerWidth:         $(carousel).width(),
        containerHeight:        $(carousel).height(),
        currentCenterItem:      null,
        previousCenterItem:     null,
        items:                  [],
        calculations:           [],
        carouselRotationsLeft:  0,
        currentlyMoving:        false,
        itemsAnimating:         0,
        currentSpeed:           options.speed,
        intervalTimer:          null,
        currentDirection:       'forward',
        leftItemsCount:         0,
        rightItemsCount:        0,
        performingSetup:        true
      };
      data.itemsContainer.find('img').removeClass(options.activeClassName);
    }

    /**
     * This function will set the autoplay for the carousel to
     * automatically rotate it given the time in the options
     * Can clear the autoplay by passing in true
     */
    function autoPlay(stop) {
      // clear timer
      clearTimeout(data.autoPlayTimer);
      // as long as no stop command, and autoplay isn't zeroed...
      if (!stop && options.autoPlay !== 0) {
        // set timer...
        data.autoPlayTimer = setTimeout(function () {
          // to move the carousl in either direction...
          if (options.autoPlay > 0) {
            moveOnce('forward');
          } else {
            moveOnce('backward');
          }
        }, Math.abs(options.autoPlay));
      }
    }

    /**
     * This function will preload all the images in the carousel before
     * calling the passed in callback function. This is only used so we can
     * properly determine the width and height of the items. This is not needed
     * if a user instead manually specifies that information.
     */
    function preload(callback) {
      if (options.preloadImages === false) {
        callback();
        return;
      }

      var $imageElements = data.itemsContainer.find('img'), loadedImages = 0, totalImages = $imageElements.length;

      $imageElements.each(function () {
        $(this).bind('load', function () {
          // Add to number of images loaded and see if they are all done yet
          loadedImages += 1;
          if (loadedImages === totalImages) {
            // All done, perform callback
            callback();
            return;
          }
        });
        // May need to manually reset the src to get the load event to fire
        // http://stackoverflow.com/questions/7137737/ie9-problems-with-jquery-load-event-not-firing
        $(this).attr('src', $(this).attr('src'));

        // If browser has cached the images, it may not call trigger a load. Detect this and do it ourselves
        if (this.complete) {
          $(this).trigger('load');
        }
      });
    }

    /**
     * Makes a record of the original width and height of all the items in the carousel.
     * If we re-intialize the carousel, these values can be used to re-establish their
     * original dimensions.
     */
    function setOriginalItemDimensions() {
      data.itemsContainer.find('img').each(function () {
        if ($(this).data('original_width') == undefined || options.forcedImageWidth > 0) {
          $(this).data('original_width', $(this).width());
        }
        if ($(this).data('original_height') == undefined || options.forcedImageHeight > 0) {
          $(this).data('original_height', $(this).height());
        }
      });
    }

    /**
     * Users can pass in a specific width and height that should be applied to every image.
     * While this option can be used in conjunction with the image preloader, the intended
     * use case is for when the preloader is turned off and the images don't have defined
     * dimensions in CSS. The carousel needs dimensions one way or another to work properly.
     */
    function forceImageDimensionsIfEnabled() {
      if (options.forcedImageWidth && options.forcedImageHeight) {
        data.itemsContainer.find('img').each(function () {
          $(this).width(options.forcedImageWidth);
          $(this).height(options.forcedImageHeight);
        });
      }
    }

    /**
     * For each "visible" item slot (# of flanking items plus the middle),
     * we pre-calculate all of the properties that the item should possess while
     * occupying that slot. This saves us some time during the actual animation.
     */
    function preCalculatePositionProperties() {
      // The 0 index is the center item in the carousel
      var $firstItem = data.itemsContainer.find('img:first');

      data.calculations[0] = {
        distance: 0,
        offset:   0,
        opacity:  1
      }

      // Then, for each number of flanking items (plus one more, see below), we
      // perform the calcations based on our user options
      var horizonOffset = options.horizonOffset;
      var separation = options.separation;
      for (var i = 1; i <= options.flankingItems + 2; i++) {
        if (i > 1) {
          horizonOffset *= options.horizonOffsetMultiplier;
          separation *= options.separationMultiplier;
        }
        data.calculations[i] = {
          distance: data.calculations[i-1].distance + separation,
          offset:   data.calculations[i-1].offset + horizonOffset,
          opacity:  data.calculations[i-1].opacity * options.opacityMultiplier
        }
      }
      // We performed 1 extra set of calculations above so that the items that
      // are moving out of sight (based on # of flanking items) gracefully animate there
      // However, we need them to animate to hidden, so we set the opacity to 0 for
      // that last item
      if (options.edgeFadeEnabled) {
        data.calculations[options.flankingItems+1].opacity = 0;
      } else {
        data.calculations[options.flankingItems+1] = {
          distance: 0,
          offset: 0,
          opacity: 0
        }
      }
    }

    /**
     * Here we prep the carousel and its items, like setting default CSS
     * attributes. All items start in the middle position by default
     * and will "fan out" from there during the first animation
     */
    function setupCarousel() {
      // Fill in a data array with jQuery objects of all the images
      data.items = data.itemsContainer.find('img');
      for (var i = 0; i < data.totalItems; i++) {
        data.items[i] = $(data.items[i]);
      }

      // May need to set the horizon if it was set to auto
      if (options.horizon === 0) {
        if (options.orientation === 'horizontal') {
          options.horizon = data.containerHeight / 2;
        } else {
          options.horizon = data.containerWidth / 2;
        }
      }

      // Default all the items to the center position
      data.itemsContainer
        .css('position','relative')
        .find('img')
          .each(function () {
            // Figure out where the top and left positions for center should be
            var centerPosLeft, centerPosTop;
            if (options.orientation === 'horizontal') {
              centerPosLeft = (data.containerWidth / 2) - ($(this).data('original_width') / 2);
              centerPosTop = options.horizon - ($(this).data('original_height') / 2);
            } else {
              centerPosLeft = options.horizon - ($(this).data('original_width') / 2);
              centerPosTop = (data.containerHeight / 2) - ($(this).data('original_height') / 2);
            }
            $(this)
              // Apply positioning and layering to the images
              .css({
                'left': centerPosLeft,
                'top': centerPosTop,
                'visibility': 'visible',
                'position': 'absolute',
                'z-index': 0,
                'opacity': 0
              })
              // Give each image a data object so it remembers specific data about
              // it's original form
              .data({
                top:             centerPosTop,
                left:            centerPosLeft,
                oldPosition:     0,
                currentPosition: 0,
                depth:           0,
                opacity:         0
              })
              // The image has been setup... Now we can show it
              .show();
          });
    }

    /**
     * All the items to the left and right of the center item need to be
     * animated to their starting positions. This function will
     * figure out what items go where and will animate them there
     */
    function setupStarterRotation() {
      options.startingItem = (options.startingItem === 0) ? Math.round(data.totalItems / 2) : options.startingItem;

      data.rightItemsCount = Math.ceil((data.totalItems-1) / 2);
      data.leftItemsCount = Math.floor((data.totalItems-1) / 2);

      // We are in effect rotating the carousel, so we need to set that
      data.carouselRotationsLeft = 1;

      // Center item
      moveItem(data.items[options.startingItem-1], 0);
      data.items[options.startingItem-1].css('opacity', 1);

      // All the items to the right of center
      var itemIndex = options.startingItem - 1;
      for (var pos = 1; pos <= data.rightItemsCount; pos++) {
        (itemIndex < data.totalItems - 1) ? itemIndex += 1 : itemIndex = 0;

        data.items[itemIndex].css('opacity', 1);
        moveItem(data.items[itemIndex], pos);
      }

      // All items to left of center
      var itemIndex = options.startingItem - 1;
      for (var pos = -1; pos >= data.leftItemsCount*-1; pos--) {
        (itemIndex > 0) ? itemIndex -= 1 : itemIndex = data.totalItems - 1;

        data.items[itemIndex].css('opacity', 1);
        moveItem(data.items[itemIndex], pos);
      }
    }

    /**
     * Given the item and position, this function will calculate the new data
     * for the item. One the calculations are done, it will store that data in
     * the items data object
     */
    function performCalculations($item, newPosition) {
      var newDistanceFromCenter = Math.abs(newPosition);

      // Distance to the center
      if (newDistanceFromCenter < options.flankingItems + 1) {
        var calculations = data.calculations[newDistanceFromCenter];
      } else {
        var calculations = data.calculations[options.flankingItems + 1];
      }

      var distanceFactor = Math.pow(options.sizeMultiplier, newDistanceFromCenter)
      var newWidth = distanceFactor * $item.data('original_width');
      var newHeight = distanceFactor * $item.data('original_height');
      var widthDifference = Math.abs($item.width() - newWidth);
      var heightDifference = Math.abs($item.height() - newHeight);

      var newOffset = calculations.offset
      var newDistance = calculations.distance;
      if (newPosition < 0) {
        newDistance *= -1;
      }

      if (options.orientation == 'horizontal') {
        var center = data.containerWidth / 2;
        var newLeft = center + newDistance - (newWidth / 2);
        var newTop = options.horizon - newOffset - (newHeight / 2);
      } else {
        var center = data.containerHeight / 2;
        var newLeft = options.horizon - newOffset - (newWidth / 2);
        var newTop = center + newDistance - (newHeight / 2);
      }

      var newOpacity;
      if (newPosition === 0) {
        newOpacity = 1;
      } else {
        newOpacity = calculations.opacity;
      }

      // Depth will be reverse distance from center
      var newDepth = options.flankingItems + 2 - newDistanceFromCenter;

      $item.data('width',newWidth);
      $item.data('height',newHeight);
      $item.data('top',newTop);
      $item.data('left',newLeft);
      $item.data('oldPosition',$item.data('currentPosition'));
      $item.data('depth',newDepth);
      $item.data('opacity',newOpacity);
    }

    function moveItem($item, newPosition) {
      // Only want to physically move the item if it is within the boundaries
      // or in the first position just outside either boundary
      if (Math.abs(newPosition) <= options.flankingItems + 1) {
        performCalculations($item, newPosition);

        data.itemsAnimating++;

        $item
          .css('z-index',$item.data().depth)
          // Animate the items to their new position values
          .animate({
            left:    $item.data().left,
            width:   $item.data().width,
            height:  $item.data().height,
            top:     $item.data().top,
            opacity: $item.data().opacity
          }, data.currentSpeed, options.animationEasing, function () {
            // Animation for the item has completed, call method
            itemAnimationComplete($item, newPosition);
          });

      } else {
        $item.data('currentPosition', newPosition)
        // Move the item to the 'hidden' position if hasn't been moved yet
        // This is for the intitial setup
        if ($item.data('oldPosition') === 0) {
          $item.css({
            'left':    $item.data().left,
            'width':   $item.data().width,
            'height':  $item.data().height,
            'top':     $item.data().top,
            'opacity': $item.data().opacity,
            'z-index': $item.data().depth
          });
        }
      }

    }

    /**
     * This function is called once an item has finished animating to its
     * given position. Several different statements are executed here, such as
     * dealing with the animation queue
     */
    function itemAnimationComplete($item, newPosition) {
      data.itemsAnimating--;

      $item.data('currentPosition', newPosition);

      // Keep track of what items came and left the center position,
      // so we can fire callbacks when all the rotations are completed
      if (newPosition === 0) {
        data.currentCenterItem = $item;
      }

      // all items have finished their rotation, lets clean up
      if (data.itemsAnimating === 0) {
        data.carouselRotationsLeft -= 1;
        data.currentlyMoving = false;

        // If there are still rotations left in the queue, rotate the carousel again
        // we pass in zero because we don't want to add any additional rotations
        if (data.carouselRotationsLeft > 0) {
          rotateCarousel(0);
        // Otherwise there are no more rotations and...
        } else {
          // Reset the speed of the carousel to original
          data.currentSpeed = options.speed;

          data.currentCenterItem.addClass(options.activeClassName);

          if (data.performingSetup === false) {
            options.movedToCenter(data.currentCenterItem);
            options.movedFromCenter(data.previousCenterItem);
          }

          data.performingSetup = false;
          // reset & initate the autoPlay
          autoPlay();
        }
      }
    }

    /**
     * Function called to rotate the carousel the given number of rotations
     * in the given direciton. Will check to make sure the carousel should
     * be able to move, and then adjust speed and move items
     */
    function rotateCarousel(rotations) {
      // Check to see that a rotation is allowed
      if (data.currentlyMoving === false) {

        // Remove active class from the center item while we rotate
        data.currentCenterItem.removeClass(options.activeClassName);

        data.currentlyMoving = true;
        data.itemsAnimating = 0;
        data.carouselRotationsLeft += rotations;
        
        if (options.quickerForFurther === true) {
          // Figure out how fast the carousel should rotate
          if (rotations > 1) {
            data.currentSpeed = options.speed / rotations;
          }
          // Assure the speed is above the minimum to avoid weird results
          data.currentSpeed = (data.currentSpeed < 100) ? 100 : data.currentSpeed;
        }

        // Iterate thru each item and move it
        for (var i = 0; i < data.totalItems; i++) {
          var $item = $(data.items[i]);
          var currentPosition = $item.data('currentPosition');

          var newPosition;
          if (data.currentDirection == 'forward') {
            newPosition = currentPosition - 1;
          } else {
            newPosition = currentPosition + 1;
          }
          // We keep both sides as even as possible to allow circular rotation to work.
          // We will "wrap" the item arround to the other side by negating its current position
          var flankingAllowance = (newPosition > 0) ? data.rightItemsCount : data.leftItemsCount;
          if (Math.abs(newPosition) > flankingAllowance) {
            newPosition = currentPosition * -1;
            // If there's an uneven number of "flanking" items, we need to compenstate for that
            // when we have an item switch sides. The right side will always have 1 more in that case
            if (data.totalItems % 2 == 0) {
              newPosition += 1;
            } 
          }

          moveItem($item, newPosition);
        }
      }
    }

    /**
     * The event handler when an image within the carousel is clicked
     * This function will rotate the carousel the correct number of rotations
     * to get the clicked item to the center, or will fire the custom event
     * the user passed in if the center item is clicked
     */
    $(this).find('img').bind("click", function () {
      var itemPosition = $(this).data().currentPosition;

      if (options.imageNav == false) {
        return;
      }
      // Don't allow hidden items to be clicked
      if (Math.abs(itemPosition) >= options.flankingItems + 1) {
        return;
      }
      // Do nothing if the carousel is already moving
      if (data.currentlyMoving) {
        return;
      }

      data.previousCenterItem = data.currentCenterItem;

      // Remove autoplay
      autoPlay(true);
      options.autoPlay = 0;
      
      var rotations = Math.abs(itemPosition);
      if (itemPosition == 0) {
        options.clickedCenter($(this));
      } else {
        // Fire the 'moving' callbacks
        options.movingFromCenter(data.currentCenterItem);
        options.movingToCenter($(this));
        if (itemPosition < 0) {
          data.currentDirection = 'backward';
          rotateCarousel(rotations);
        } else if (itemPosition > 0) {
          data.currentDirection = 'forward';
          rotateCarousel(rotations);
        }
      }
    });


    /**
     * The user may choose to wrap the images is link tags. If they do this, we need to
     * make sure that they aren't active for certain situations
     */
    $(this).find('a').bind("click", function (event) {
      var isCenter = $(this).find('img').data('currentPosition') == 0;
      // should we disable the links?
      if (options.linkHandling === 1 || // turn off all links
          (options.linkHandling === 2 && !isCenter)) // turn off all links except center
      {
        event.preventDefault();
        return false;
      }
    });

    function nextItemFromCenter() {
      var $next = data.currentCenterItem.next();
      if ($next.length <= 0) {
        $next = data.currentCenterItem.parent().children().first();
      }
      return $next;
    }

    function prevItemFromCenter() {
      var $prev = data.currentCenterItem.prev();
      if ($prev.length <= 0) {
        $prev = data.currentCenterItem.parent().children().last();
      }
      return $prev;
    }

    /**
     * Intiate a move of the carousel in either direction. Takes care of firing
     * the 'moving' callbacks
     */
    function moveOnce(direction) {
      if (data.currentlyMoving === false) {
        data.previousCenterItem = data.currentCenterItem;

        options.movingFromCenter(data.currentCenterItem);
        if (direction == 'backward') {
          options.movingToCenter(prevItemFromCenter());
          data.currentDirection = 'backward';
        } else if (direction == 'forward') {
          options.movingToCenter(nextItemFromCenter());
          data.currentDirection = 'forward';
        }
      }

      rotateCarousel(1);
    }
    
    /**
     * Navigation with arrow keys
     */
    $(document).keydown(function(e) {
      if (options.keyboardNav) {
        // arrow left or up
        if ((e.which === 37 && options.orientation == 'horizontal') || (e.which === 38 && options.orientation == 'vertical')) {
          autoPlay(true);
          options.autoPlay = 0;
          moveOnce('backward');
        // arrow right or down
        } else if ((e.which === 39 && options.orientation == 'horizontal') || (e.which === 40 && options.orientation == 'vertical')) {
          autoPlay(true);
          options.autoPlay = 0;
          moveOnce('forward');
        }
        // should we override the normal functionality for the arrow keys?
        if (options.keyboardNavOverride && (
            (options.orientation == 'horizontal' && (e.which === 37 || e.which === 39)) ||
            (options.orientation == 'vertical' && (e.which === 38 || e.which === 40))
          )) {
          e.preventDefault();
          return false;
        }
      }
    });

    /**
     * Public API methods
     */
    this.reload = function (newOptions) {
      if (typeof newOptions === "object") {
        var combineDefaultWith = newOptions;
      } else {
        var combineDefaultWith = {};
      }
      options = $.extend({}, $.fn.waterwheelCarousel.defaults, newOptions);

      initializeCarouselData();
      data.itemsContainer.find('img').hide();
      forceImageDimensionsIfEnabled();

      preload(function () {
        setOriginalItemDimensions();
        preCalculatePositionProperties();
        setupCarousel();
        setupStarterRotation();
      });
    }
    
    this.next = function() {
      autoPlay(true);
      options.autoPlay = 0;

      moveOnce('forward');
    }
    this.prev = function () {
      autoPlay(true);
      options.autoPlay = 0;

      moveOnce('backward');
    }

    this.reload(startingOptions);

    return this;
  };

  $.fn.waterwheelCarousel.defaults = {
    // number tweeks to change apperance
    startingItem:               1,   // item to place in the center of the carousel. Set to 0 for auto
    separation:                 175, // distance between items in carousel
    separationMultiplier:       0.6, // multipled by separation distance to increase/decrease distance for each additional item
    horizonOffset:              0,   // offset each item from the "horizon" by this amount (causes arching)
    horizonOffsetMultiplier:    1,   // multipled by horizon offset to increase/decrease offset for each additional item
    sizeMultiplier:             0.7, // determines how drastically the size of each item changes
    opacityMultiplier:          0.8, // determines how drastically the opacity of each item changes
    horizon:                    0,   // how "far in" the horizontal/vertical horizon should be set from the container wall. 0 for auto
    flankingItems:              3,   // the number of items visible on either side of the center                  

    // animation
    speed:                      300,      // speed in milliseconds it will take to rotate from one to the next
    animationEasing:            'linear', // the easing effect to use when animating
    quickerForFurther:          true,     // set to true to make animations faster when clicking an item that is far away from the center
    edgeFadeEnabled:            false,    // when true, items fade off into nothingness when reaching the edge. false to have them move behind the center image
    
    // misc
    linkHandling:               2,                 // 1 to disable all (used for facebox), 2 to disable all but center (to link images out)
    autoPlay:                   0,                 // indicate the speed in milliseconds to wait before autorotating. 0 to turn off. Can be negative
    orientation:                'horizontal',      // indicate if the carousel should be 'horizontal' or 'vertical'
    activeClassName:            'carousel-center', // the name of the class given to the current item in the center
    keyboardNav:                false,             // set to true to move the carousel with the arrow keys
    keyboardNavOverride:        true,              // set to true to override the normal functionality of the arrow keys (prevents scrolling)
    imageNav:                   true,              // clicking a non-center image will rotate that image to the center

    // preloader
    preloadImages:              true,  // disable/enable the image preloader. 
    forcedImageWidth:           0,     // specify width of all images; otherwise the carousel tries to calculate it
    forcedImageHeight:          0,     // specify height of all images; otherwise the carousel tries to calculate it

    // callback functions
    movingToCenter:             $.noop, // fired when an item is about to move to the center position
    movedToCenter:              $.noop, // fired when an item has finished moving to the center
    clickedCenter:              $.noop, // fired when the center item has been clicked
    movingFromCenter:           $.noop, // fired when an item is about to leave the center position
    movedFromCenter:            $.noop  // fired when an item has finished moving from the center
  };

})(jQuery);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJqcXVlcnkud2F0ZXJ3aGVlbENhcm91c2VsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogV2F0ZXJ3aGVlbCBDYXJvdXNlbFxuICogVmVyc2lvbiAyLjMuMFxuICogaHR0cDovL3d3dy5ia29zYm9ybmUuY29tXG4gKlxuICogQ29weXJpZ2h0IDIwMTEtMjAxMyBCcmlhbiBPc2Jvcm5lXG4gKiBEdWFsIGxpY2Vuc2VkIHVuZGVyIEdQTHYzIG9yIE1JVFxuICogQ29waWVzIG9mIHRoZSBsaWNlbnNlcyBoYXZlIGJlZW4gZGlzdHJpYnV0ZWRcbiAqIHdpdGggdGhpcyBwbHVnaW4uXG4gKlxuICogUGx1Z2luIHdyaXR0ZW4gYnkgQnJpYW4gT3Nib3JuZVxuICogZm9yIHVzZSB3aXRoIHRoZSBqUXVlcnkgSmF2YVNjcmlwdCBGcmFtZXdvcmtcbiAqIGh0dHA6Ly93d3cuanF1ZXJ5LmNvbVxuICovXG47KGZ1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAkLmZuLndhdGVyd2hlZWxDYXJvdXNlbCA9IGZ1bmN0aW9uIChzdGFydGluZ09wdGlvbnMpIHtcblxuICAgIC8vIEFkZHMgc3VwcG9ydCBmb3IgaW50aWFsaXppbmcgbXVsdGlwbGUgY2Fyb3VzZWxzIGZyb20gdGhlIHNhbWUgc2VsZWN0b3IgZ3JvdXBcbiAgICBpZiAodGhpcy5sZW5ndGggPiAxKSB7XG4gICAgICB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykud2F0ZXJ3aGVlbENhcm91c2VsKHN0YXJ0aW5nT3B0aW9ucyk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzOyAvLyBhbGxvdyBjaGFpbmluZ1xuICAgIH1cblxuICAgIHZhciBjYXJvdXNlbCA9IHRoaXM7XG4gICAgdmFyIG9wdGlvbnMgPSB7fTtcbiAgICB2YXIgZGF0YSA9IHt9O1xuXG4gICAgZnVuY3Rpb24gaW5pdGlhbGl6ZUNhcm91c2VsRGF0YSgpIHtcbiAgICAgIGRhdGEgPSB7XG4gICAgICAgIGl0ZW1zQ29udGFpbmVyOiAgICAgICAgICQoY2Fyb3VzZWwpLFxuICAgICAgICB0b3RhbEl0ZW1zOiAgICAgICAgICAgICAkKGNhcm91c2VsKS5maW5kKCdpbWcnKS5sZW5ndGgsXG4gICAgICAgIGNvbnRhaW5lcldpZHRoOiAgICAgICAgICQoY2Fyb3VzZWwpLndpZHRoKCksXG4gICAgICAgIGNvbnRhaW5lckhlaWdodDogICAgICAgICQoY2Fyb3VzZWwpLmhlaWdodCgpLFxuICAgICAgICBjdXJyZW50Q2VudGVySXRlbTogICAgICBudWxsLFxuICAgICAgICBwcmV2aW91c0NlbnRlckl0ZW06ICAgICBudWxsLFxuICAgICAgICBpdGVtczogICAgICAgICAgICAgICAgICBbXSxcbiAgICAgICAgY2FsY3VsYXRpb25zOiAgICAgICAgICAgW10sXG4gICAgICAgIGNhcm91c2VsUm90YXRpb25zTGVmdDogIDAsXG4gICAgICAgIGN1cnJlbnRseU1vdmluZzogICAgICAgIGZhbHNlLFxuICAgICAgICBpdGVtc0FuaW1hdGluZzogICAgICAgICAwLFxuICAgICAgICBjdXJyZW50U3BlZWQ6ICAgICAgICAgICBvcHRpb25zLnNwZWVkLFxuICAgICAgICBpbnRlcnZhbFRpbWVyOiAgICAgICAgICBudWxsLFxuICAgICAgICBjdXJyZW50RGlyZWN0aW9uOiAgICAgICAnZm9yd2FyZCcsXG4gICAgICAgIGxlZnRJdGVtc0NvdW50OiAgICAgICAgIDAsXG4gICAgICAgIHJpZ2h0SXRlbXNDb3VudDogICAgICAgIDAsXG4gICAgICAgIHBlcmZvcm1pbmdTZXR1cDogICAgICAgIHRydWVcbiAgICAgIH07XG4gICAgICBkYXRhLml0ZW1zQ29udGFpbmVyLmZpbmQoJ2ltZycpLnJlbW92ZUNsYXNzKG9wdGlvbnMuYWN0aXZlQ2xhc3NOYW1lKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHdpbGwgc2V0IHRoZSBhdXRvcGxheSBmb3IgdGhlIGNhcm91c2VsIHRvXG4gICAgICogYXV0b21hdGljYWxseSByb3RhdGUgaXQgZ2l2ZW4gdGhlIHRpbWUgaW4gdGhlIG9wdGlvbnNcbiAgICAgKiBDYW4gY2xlYXIgdGhlIGF1dG9wbGF5IGJ5IHBhc3NpbmcgaW4gdHJ1ZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGF1dG9QbGF5KHN0b3ApIHtcbiAgICAgIC8vIGNsZWFyIHRpbWVyXG4gICAgICBjbGVhclRpbWVvdXQoZGF0YS5hdXRvUGxheVRpbWVyKTtcbiAgICAgIC8vIGFzIGxvbmcgYXMgbm8gc3RvcCBjb21tYW5kLCBhbmQgYXV0b3BsYXkgaXNuJ3QgemVyb2VkLi4uXG4gICAgICBpZiAoIXN0b3AgJiYgb3B0aW9ucy5hdXRvUGxheSAhPT0gMCkge1xuICAgICAgICAvLyBzZXQgdGltZXIuLi5cbiAgICAgICAgZGF0YS5hdXRvUGxheVRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gdG8gbW92ZSB0aGUgY2Fyb3VzbCBpbiBlaXRoZXIgZGlyZWN0aW9uLi4uXG4gICAgICAgICAgaWYgKG9wdGlvbnMuYXV0b1BsYXkgPiAwKSB7XG4gICAgICAgICAgICBtb3ZlT25jZSgnZm9yd2FyZCcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb3ZlT25jZSgnYmFja3dhcmQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIE1hdGguYWJzKG9wdGlvbnMuYXV0b1BsYXkpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHdpbGwgcHJlbG9hZCBhbGwgdGhlIGltYWdlcyBpbiB0aGUgY2Fyb3VzZWwgYmVmb3JlXG4gICAgICogY2FsbGluZyB0aGUgcGFzc2VkIGluIGNhbGxiYWNrIGZ1bmN0aW9uLiBUaGlzIGlzIG9ubHkgdXNlZCBzbyB3ZSBjYW5cbiAgICAgKiBwcm9wZXJseSBkZXRlcm1pbmUgdGhlIHdpZHRoIGFuZCBoZWlnaHQgb2YgdGhlIGl0ZW1zLiBUaGlzIGlzIG5vdCBuZWVkZWRcbiAgICAgKiBpZiBhIHVzZXIgaW5zdGVhZCBtYW51YWxseSBzcGVjaWZpZXMgdGhhdCBpbmZvcm1hdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBwcmVsb2FkKGNhbGxiYWNrKSB7XG4gICAgICBpZiAob3B0aW9ucy5wcmVsb2FkSW1hZ2VzID09PSBmYWxzZSkge1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciAkaW1hZ2VFbGVtZW50cyA9IGRhdGEuaXRlbXNDb250YWluZXIuZmluZCgnaW1nJyksIGxvYWRlZEltYWdlcyA9IDAsIHRvdGFsSW1hZ2VzID0gJGltYWdlRWxlbWVudHMubGVuZ3RoO1xuXG4gICAgICAkaW1hZ2VFbGVtZW50cy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS5iaW5kKCdsb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIC8vIEFkZCB0byBudW1iZXIgb2YgaW1hZ2VzIGxvYWRlZCBhbmQgc2VlIGlmIHRoZXkgYXJlIGFsbCBkb25lIHlldFxuICAgICAgICAgIGxvYWRlZEltYWdlcyArPSAxO1xuICAgICAgICAgIGlmIChsb2FkZWRJbWFnZXMgPT09IHRvdGFsSW1hZ2VzKSB7XG4gICAgICAgICAgICAvLyBBbGwgZG9uZSwgcGVyZm9ybSBjYWxsYmFja1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBNYXkgbmVlZCB0byBtYW51YWxseSByZXNldCB0aGUgc3JjIHRvIGdldCB0aGUgbG9hZCBldmVudCB0byBmaXJlXG4gICAgICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNzEzNzczNy9pZTktcHJvYmxlbXMtd2l0aC1qcXVlcnktbG9hZC1ldmVudC1ub3QtZmlyaW5nXG4gICAgICAgICQodGhpcykuYXR0cignc3JjJywgJCh0aGlzKS5hdHRyKCdzcmMnKSk7XG5cbiAgICAgICAgLy8gSWYgYnJvd3NlciBoYXMgY2FjaGVkIHRoZSBpbWFnZXMsIGl0IG1heSBub3QgY2FsbCB0cmlnZ2VyIGEgbG9hZC4gRGV0ZWN0IHRoaXMgYW5kIGRvIGl0IG91cnNlbHZlc1xuICAgICAgICBpZiAodGhpcy5jb21wbGV0ZSkge1xuICAgICAgICAgICQodGhpcykudHJpZ2dlcignbG9hZCcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYWtlcyBhIHJlY29yZCBvZiB0aGUgb3JpZ2luYWwgd2lkdGggYW5kIGhlaWdodCBvZiBhbGwgdGhlIGl0ZW1zIGluIHRoZSBjYXJvdXNlbC5cbiAgICAgKiBJZiB3ZSByZS1pbnRpYWxpemUgdGhlIGNhcm91c2VsLCB0aGVzZSB2YWx1ZXMgY2FuIGJlIHVzZWQgdG8gcmUtZXN0YWJsaXNoIHRoZWlyXG4gICAgICogb3JpZ2luYWwgZGltZW5zaW9ucy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzZXRPcmlnaW5hbEl0ZW1EaW1lbnNpb25zKCkge1xuICAgICAgZGF0YS5pdGVtc0NvbnRhaW5lci5maW5kKCdpbWcnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCQodGhpcykuZGF0YSgnb3JpZ2luYWxfd2lkdGgnKSA9PSB1bmRlZmluZWQgfHwgb3B0aW9ucy5mb3JjZWRJbWFnZVdpZHRoID4gMCkge1xuICAgICAgICAgICQodGhpcykuZGF0YSgnb3JpZ2luYWxfd2lkdGgnLCAkKHRoaXMpLndpZHRoKCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgkKHRoaXMpLmRhdGEoJ29yaWdpbmFsX2hlaWdodCcpID09IHVuZGVmaW5lZCB8fCBvcHRpb25zLmZvcmNlZEltYWdlSGVpZ2h0ID4gMCkge1xuICAgICAgICAgICQodGhpcykuZGF0YSgnb3JpZ2luYWxfaGVpZ2h0JywgJCh0aGlzKS5oZWlnaHQoKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVzZXJzIGNhbiBwYXNzIGluIGEgc3BlY2lmaWMgd2lkdGggYW5kIGhlaWdodCB0aGF0IHNob3VsZCBiZSBhcHBsaWVkIHRvIGV2ZXJ5IGltYWdlLlxuICAgICAqIFdoaWxlIHRoaXMgb3B0aW9uIGNhbiBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggdGhlIGltYWdlIHByZWxvYWRlciwgdGhlIGludGVuZGVkXG4gICAgICogdXNlIGNhc2UgaXMgZm9yIHdoZW4gdGhlIHByZWxvYWRlciBpcyB0dXJuZWQgb2ZmIGFuZCB0aGUgaW1hZ2VzIGRvbid0IGhhdmUgZGVmaW5lZFxuICAgICAqIGRpbWVuc2lvbnMgaW4gQ1NTLiBUaGUgY2Fyb3VzZWwgbmVlZHMgZGltZW5zaW9ucyBvbmUgd2F5IG9yIGFub3RoZXIgdG8gd29yayBwcm9wZXJseS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBmb3JjZUltYWdlRGltZW5zaW9uc0lmRW5hYmxlZCgpIHtcbiAgICAgIGlmIChvcHRpb25zLmZvcmNlZEltYWdlV2lkdGggJiYgb3B0aW9ucy5mb3JjZWRJbWFnZUhlaWdodCkge1xuICAgICAgICBkYXRhLml0ZW1zQ29udGFpbmVyLmZpbmQoJ2ltZycpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICQodGhpcykud2lkdGgob3B0aW9ucy5mb3JjZWRJbWFnZVdpZHRoKTtcbiAgICAgICAgICAkKHRoaXMpLmhlaWdodChvcHRpb25zLmZvcmNlZEltYWdlSGVpZ2h0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRm9yIGVhY2ggXCJ2aXNpYmxlXCIgaXRlbSBzbG90ICgjIG9mIGZsYW5raW5nIGl0ZW1zIHBsdXMgdGhlIG1pZGRsZSksXG4gICAgICogd2UgcHJlLWNhbGN1bGF0ZSBhbGwgb2YgdGhlIHByb3BlcnRpZXMgdGhhdCB0aGUgaXRlbSBzaG91bGQgcG9zc2VzcyB3aGlsZVxuICAgICAqIG9jY3VweWluZyB0aGF0IHNsb3QuIFRoaXMgc2F2ZXMgdXMgc29tZSB0aW1lIGR1cmluZyB0aGUgYWN0dWFsIGFuaW1hdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBwcmVDYWxjdWxhdGVQb3NpdGlvblByb3BlcnRpZXMoKSB7XG4gICAgICAvLyBUaGUgMCBpbmRleCBpcyB0aGUgY2VudGVyIGl0ZW0gaW4gdGhlIGNhcm91c2VsXG4gICAgICB2YXIgJGZpcnN0SXRlbSA9IGRhdGEuaXRlbXNDb250YWluZXIuZmluZCgnaW1nOmZpcnN0Jyk7XG5cbiAgICAgIGRhdGEuY2FsY3VsYXRpb25zWzBdID0ge1xuICAgICAgICBkaXN0YW5jZTogMCxcbiAgICAgICAgb2Zmc2V0OiAgIDAsXG4gICAgICAgIG9wYWNpdHk6ICAxXG4gICAgICB9XG5cbiAgICAgIC8vIFRoZW4sIGZvciBlYWNoIG51bWJlciBvZiBmbGFua2luZyBpdGVtcyAocGx1cyBvbmUgbW9yZSwgc2VlIGJlbG93KSwgd2VcbiAgICAgIC8vIHBlcmZvcm0gdGhlIGNhbGNhdGlvbnMgYmFzZWQgb24gb3VyIHVzZXIgb3B0aW9uc1xuICAgICAgdmFyIGhvcml6b25PZmZzZXQgPSBvcHRpb25zLmhvcml6b25PZmZzZXQ7XG4gICAgICB2YXIgc2VwYXJhdGlvbiA9IG9wdGlvbnMuc2VwYXJhdGlvbjtcbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IG9wdGlvbnMuZmxhbmtpbmdJdGVtcyArIDI7IGkrKykge1xuICAgICAgICBpZiAoaSA+IDEpIHtcbiAgICAgICAgICBob3Jpem9uT2Zmc2V0ICo9IG9wdGlvbnMuaG9yaXpvbk9mZnNldE11bHRpcGxpZXI7XG4gICAgICAgICAgc2VwYXJhdGlvbiAqPSBvcHRpb25zLnNlcGFyYXRpb25NdWx0aXBsaWVyO1xuICAgICAgICB9XG4gICAgICAgIGRhdGEuY2FsY3VsYXRpb25zW2ldID0ge1xuICAgICAgICAgIGRpc3RhbmNlOiBkYXRhLmNhbGN1bGF0aW9uc1tpLTFdLmRpc3RhbmNlICsgc2VwYXJhdGlvbixcbiAgICAgICAgICBvZmZzZXQ6ICAgZGF0YS5jYWxjdWxhdGlvbnNbaS0xXS5vZmZzZXQgKyBob3Jpem9uT2Zmc2V0LFxuICAgICAgICAgIG9wYWNpdHk6ICBkYXRhLmNhbGN1bGF0aW9uc1tpLTFdLm9wYWNpdHkgKiBvcHRpb25zLm9wYWNpdHlNdWx0aXBsaWVyXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIFdlIHBlcmZvcm1lZCAxIGV4dHJhIHNldCBvZiBjYWxjdWxhdGlvbnMgYWJvdmUgc28gdGhhdCB0aGUgaXRlbXMgdGhhdFxuICAgICAgLy8gYXJlIG1vdmluZyBvdXQgb2Ygc2lnaHQgKGJhc2VkIG9uICMgb2YgZmxhbmtpbmcgaXRlbXMpIGdyYWNlZnVsbHkgYW5pbWF0ZSB0aGVyZVxuICAgICAgLy8gSG93ZXZlciwgd2UgbmVlZCB0aGVtIHRvIGFuaW1hdGUgdG8gaGlkZGVuLCBzbyB3ZSBzZXQgdGhlIG9wYWNpdHkgdG8gMCBmb3JcbiAgICAgIC8vIHRoYXQgbGFzdCBpdGVtXG4gICAgICBpZiAob3B0aW9ucy5lZGdlRmFkZUVuYWJsZWQpIHtcbiAgICAgICAgZGF0YS5jYWxjdWxhdGlvbnNbb3B0aW9ucy5mbGFua2luZ0l0ZW1zKzFdLm9wYWNpdHkgPSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF0YS5jYWxjdWxhdGlvbnNbb3B0aW9ucy5mbGFua2luZ0l0ZW1zKzFdID0ge1xuICAgICAgICAgIGRpc3RhbmNlOiAwLFxuICAgICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIZXJlIHdlIHByZXAgdGhlIGNhcm91c2VsIGFuZCBpdHMgaXRlbXMsIGxpa2Ugc2V0dGluZyBkZWZhdWx0IENTU1xuICAgICAqIGF0dHJpYnV0ZXMuIEFsbCBpdGVtcyBzdGFydCBpbiB0aGUgbWlkZGxlIHBvc2l0aW9uIGJ5IGRlZmF1bHRcbiAgICAgKiBhbmQgd2lsbCBcImZhbiBvdXRcIiBmcm9tIHRoZXJlIGR1cmluZyB0aGUgZmlyc3QgYW5pbWF0aW9uXG4gICAgICovXG4gICAgZnVuY3Rpb24gc2V0dXBDYXJvdXNlbCgpIHtcbiAgICAgIC8vIEZpbGwgaW4gYSBkYXRhIGFycmF5IHdpdGggalF1ZXJ5IG9iamVjdHMgb2YgYWxsIHRoZSBpbWFnZXNcbiAgICAgIGRhdGEuaXRlbXMgPSBkYXRhLml0ZW1zQ29udGFpbmVyLmZpbmQoJ2ltZycpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLnRvdGFsSXRlbXM7IGkrKykge1xuICAgICAgICBkYXRhLml0ZW1zW2ldID0gJChkYXRhLml0ZW1zW2ldKTtcbiAgICAgIH1cblxuICAgICAgLy8gTWF5IG5lZWQgdG8gc2V0IHRoZSBob3Jpem9uIGlmIGl0IHdhcyBzZXQgdG8gYXV0b1xuICAgICAgaWYgKG9wdGlvbnMuaG9yaXpvbiA9PT0gMCkge1xuICAgICAgICBpZiAob3B0aW9ucy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgb3B0aW9ucy5ob3Jpem9uID0gZGF0YS5jb250YWluZXJIZWlnaHQgLyAyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9wdGlvbnMuaG9yaXpvbiA9IGRhdGEuY29udGFpbmVyV2lkdGggLyAyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIERlZmF1bHQgYWxsIHRoZSBpdGVtcyB0byB0aGUgY2VudGVyIHBvc2l0aW9uXG4gICAgICBkYXRhLml0ZW1zQ29udGFpbmVyXG4gICAgICAgIC5jc3MoJ3Bvc2l0aW9uJywncmVsYXRpdmUnKVxuICAgICAgICAuZmluZCgnaW1nJylcbiAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBGaWd1cmUgb3V0IHdoZXJlIHRoZSB0b3AgYW5kIGxlZnQgcG9zaXRpb25zIGZvciBjZW50ZXIgc2hvdWxkIGJlXG4gICAgICAgICAgICB2YXIgY2VudGVyUG9zTGVmdCwgY2VudGVyUG9zVG9wO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgICBjZW50ZXJQb3NMZWZ0ID0gKGRhdGEuY29udGFpbmVyV2lkdGggLyAyKSAtICgkKHRoaXMpLmRhdGEoJ29yaWdpbmFsX3dpZHRoJykgLyAyKTtcbiAgICAgICAgICAgICAgY2VudGVyUG9zVG9wID0gb3B0aW9ucy5ob3Jpem9uIC0gKCQodGhpcykuZGF0YSgnb3JpZ2luYWxfaGVpZ2h0JykgLyAyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNlbnRlclBvc0xlZnQgPSBvcHRpb25zLmhvcml6b24gLSAoJCh0aGlzKS5kYXRhKCdvcmlnaW5hbF93aWR0aCcpIC8gMik7XG4gICAgICAgICAgICAgIGNlbnRlclBvc1RvcCA9IChkYXRhLmNvbnRhaW5lckhlaWdodCAvIDIpIC0gKCQodGhpcykuZGF0YSgnb3JpZ2luYWxfaGVpZ2h0JykgLyAyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgLy8gQXBwbHkgcG9zaXRpb25pbmcgYW5kIGxheWVyaW5nIHRvIHRoZSBpbWFnZXNcbiAgICAgICAgICAgICAgLmNzcyh7XG4gICAgICAgICAgICAgICAgJ2xlZnQnOiBjZW50ZXJQb3NMZWZ0LFxuICAgICAgICAgICAgICAgICd0b3AnOiBjZW50ZXJQb3NUb3AsXG4gICAgICAgICAgICAgICAgJ3Zpc2liaWxpdHknOiAndmlzaWJsZScsXG4gICAgICAgICAgICAgICAgJ3Bvc2l0aW9uJzogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICAnei1pbmRleCc6IDAsXG4gICAgICAgICAgICAgICAgJ29wYWNpdHknOiAwXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC8vIEdpdmUgZWFjaCBpbWFnZSBhIGRhdGEgb2JqZWN0IHNvIGl0IHJlbWVtYmVycyBzcGVjaWZpYyBkYXRhIGFib3V0XG4gICAgICAgICAgICAgIC8vIGl0J3Mgb3JpZ2luYWwgZm9ybVxuICAgICAgICAgICAgICAuZGF0YSh7XG4gICAgICAgICAgICAgICAgdG9wOiAgICAgICAgICAgICBjZW50ZXJQb3NUb3AsXG4gICAgICAgICAgICAgICAgbGVmdDogICAgICAgICAgICBjZW50ZXJQb3NMZWZ0LFxuICAgICAgICAgICAgICAgIG9sZFBvc2l0aW9uOiAgICAgMCxcbiAgICAgICAgICAgICAgICBjdXJyZW50UG9zaXRpb246IDAsXG4gICAgICAgICAgICAgICAgZGVwdGg6ICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIG9wYWNpdHk6ICAgICAgICAgMFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAvLyBUaGUgaW1hZ2UgaGFzIGJlZW4gc2V0dXAuLi4gTm93IHdlIGNhbiBzaG93IGl0XG4gICAgICAgICAgICAgIC5zaG93KCk7XG4gICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWxsIHRoZSBpdGVtcyB0byB0aGUgbGVmdCBhbmQgcmlnaHQgb2YgdGhlIGNlbnRlciBpdGVtIG5lZWQgdG8gYmVcbiAgICAgKiBhbmltYXRlZCB0byB0aGVpciBzdGFydGluZyBwb3NpdGlvbnMuIFRoaXMgZnVuY3Rpb24gd2lsbFxuICAgICAqIGZpZ3VyZSBvdXQgd2hhdCBpdGVtcyBnbyB3aGVyZSBhbmQgd2lsbCBhbmltYXRlIHRoZW0gdGhlcmVcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzZXR1cFN0YXJ0ZXJSb3RhdGlvbigpIHtcbiAgICAgIG9wdGlvbnMuc3RhcnRpbmdJdGVtID0gKG9wdGlvbnMuc3RhcnRpbmdJdGVtID09PSAwKSA/IE1hdGgucm91bmQoZGF0YS50b3RhbEl0ZW1zIC8gMikgOiBvcHRpb25zLnN0YXJ0aW5nSXRlbTtcblxuICAgICAgZGF0YS5yaWdodEl0ZW1zQ291bnQgPSBNYXRoLmNlaWwoKGRhdGEudG90YWxJdGVtcy0xKSAvIDIpO1xuICAgICAgZGF0YS5sZWZ0SXRlbXNDb3VudCA9IE1hdGguZmxvb3IoKGRhdGEudG90YWxJdGVtcy0xKSAvIDIpO1xuXG4gICAgICAvLyBXZSBhcmUgaW4gZWZmZWN0IHJvdGF0aW5nIHRoZSBjYXJvdXNlbCwgc28gd2UgbmVlZCB0byBzZXQgdGhhdFxuICAgICAgZGF0YS5jYXJvdXNlbFJvdGF0aW9uc0xlZnQgPSAxO1xuXG4gICAgICAvLyBDZW50ZXIgaXRlbVxuICAgICAgbW92ZUl0ZW0oZGF0YS5pdGVtc1tvcHRpb25zLnN0YXJ0aW5nSXRlbS0xXSwgMCk7XG4gICAgICBkYXRhLml0ZW1zW29wdGlvbnMuc3RhcnRpbmdJdGVtLTFdLmNzcygnb3BhY2l0eScsIDEpO1xuXG4gICAgICAvLyBBbGwgdGhlIGl0ZW1zIHRvIHRoZSByaWdodCBvZiBjZW50ZXJcbiAgICAgIHZhciBpdGVtSW5kZXggPSBvcHRpb25zLnN0YXJ0aW5nSXRlbSAtIDE7XG4gICAgICBmb3IgKHZhciBwb3MgPSAxOyBwb3MgPD0gZGF0YS5yaWdodEl0ZW1zQ291bnQ7IHBvcysrKSB7XG4gICAgICAgIChpdGVtSW5kZXggPCBkYXRhLnRvdGFsSXRlbXMgLSAxKSA/IGl0ZW1JbmRleCArPSAxIDogaXRlbUluZGV4ID0gMDtcblxuICAgICAgICBkYXRhLml0ZW1zW2l0ZW1JbmRleF0uY3NzKCdvcGFjaXR5JywgMSk7XG4gICAgICAgIG1vdmVJdGVtKGRhdGEuaXRlbXNbaXRlbUluZGV4XSwgcG9zKTtcbiAgICAgIH1cblxuICAgICAgLy8gQWxsIGl0ZW1zIHRvIGxlZnQgb2YgY2VudGVyXG4gICAgICB2YXIgaXRlbUluZGV4ID0gb3B0aW9ucy5zdGFydGluZ0l0ZW0gLSAxO1xuICAgICAgZm9yICh2YXIgcG9zID0gLTE7IHBvcyA+PSBkYXRhLmxlZnRJdGVtc0NvdW50Ki0xOyBwb3MtLSkge1xuICAgICAgICAoaXRlbUluZGV4ID4gMCkgPyBpdGVtSW5kZXggLT0gMSA6IGl0ZW1JbmRleCA9IGRhdGEudG90YWxJdGVtcyAtIDE7XG5cbiAgICAgICAgZGF0YS5pdGVtc1tpdGVtSW5kZXhdLmNzcygnb3BhY2l0eScsIDEpO1xuICAgICAgICBtb3ZlSXRlbShkYXRhLml0ZW1zW2l0ZW1JbmRleF0sIHBvcyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2l2ZW4gdGhlIGl0ZW0gYW5kIHBvc2l0aW9uLCB0aGlzIGZ1bmN0aW9uIHdpbGwgY2FsY3VsYXRlIHRoZSBuZXcgZGF0YVxuICAgICAqIGZvciB0aGUgaXRlbS4gT25lIHRoZSBjYWxjdWxhdGlvbnMgYXJlIGRvbmUsIGl0IHdpbGwgc3RvcmUgdGhhdCBkYXRhIGluXG4gICAgICogdGhlIGl0ZW1zIGRhdGEgb2JqZWN0XG4gICAgICovXG4gICAgZnVuY3Rpb24gcGVyZm9ybUNhbGN1bGF0aW9ucygkaXRlbSwgbmV3UG9zaXRpb24pIHtcbiAgICAgIHZhciBuZXdEaXN0YW5jZUZyb21DZW50ZXIgPSBNYXRoLmFicyhuZXdQb3NpdGlvbik7XG5cbiAgICAgIC8vIERpc3RhbmNlIHRvIHRoZSBjZW50ZXJcbiAgICAgIGlmIChuZXdEaXN0YW5jZUZyb21DZW50ZXIgPCBvcHRpb25zLmZsYW5raW5nSXRlbXMgKyAxKSB7XG4gICAgICAgIHZhciBjYWxjdWxhdGlvbnMgPSBkYXRhLmNhbGN1bGF0aW9uc1tuZXdEaXN0YW5jZUZyb21DZW50ZXJdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGNhbGN1bGF0aW9ucyA9IGRhdGEuY2FsY3VsYXRpb25zW29wdGlvbnMuZmxhbmtpbmdJdGVtcyArIDFdO1xuICAgICAgfVxuXG4gICAgICB2YXIgZGlzdGFuY2VGYWN0b3IgPSBNYXRoLnBvdyhvcHRpb25zLnNpemVNdWx0aXBsaWVyLCBuZXdEaXN0YW5jZUZyb21DZW50ZXIpXG4gICAgICB2YXIgbmV3V2lkdGggPSBkaXN0YW5jZUZhY3RvciAqICRpdGVtLmRhdGEoJ29yaWdpbmFsX3dpZHRoJyk7XG4gICAgICB2YXIgbmV3SGVpZ2h0ID0gZGlzdGFuY2VGYWN0b3IgKiAkaXRlbS5kYXRhKCdvcmlnaW5hbF9oZWlnaHQnKTtcbiAgICAgIHZhciB3aWR0aERpZmZlcmVuY2UgPSBNYXRoLmFicygkaXRlbS53aWR0aCgpIC0gbmV3V2lkdGgpO1xuICAgICAgdmFyIGhlaWdodERpZmZlcmVuY2UgPSBNYXRoLmFicygkaXRlbS5oZWlnaHQoKSAtIG5ld0hlaWdodCk7XG5cbiAgICAgIHZhciBuZXdPZmZzZXQgPSBjYWxjdWxhdGlvbnMub2Zmc2V0XG4gICAgICB2YXIgbmV3RGlzdGFuY2UgPSBjYWxjdWxhdGlvbnMuZGlzdGFuY2U7XG4gICAgICBpZiAobmV3UG9zaXRpb24gPCAwKSB7XG4gICAgICAgIG5ld0Rpc3RhbmNlICo9IC0xO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy5vcmllbnRhdGlvbiA9PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgdmFyIGNlbnRlciA9IGRhdGEuY29udGFpbmVyV2lkdGggLyAyO1xuICAgICAgICB2YXIgbmV3TGVmdCA9IGNlbnRlciArIG5ld0Rpc3RhbmNlIC0gKG5ld1dpZHRoIC8gMik7XG4gICAgICAgIHZhciBuZXdUb3AgPSBvcHRpb25zLmhvcml6b24gLSBuZXdPZmZzZXQgLSAobmV3SGVpZ2h0IC8gMik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgY2VudGVyID0gZGF0YS5jb250YWluZXJIZWlnaHQgLyAyO1xuICAgICAgICB2YXIgbmV3TGVmdCA9IG9wdGlvbnMuaG9yaXpvbiAtIG5ld09mZnNldCAtIChuZXdXaWR0aCAvIDIpO1xuICAgICAgICB2YXIgbmV3VG9wID0gY2VudGVyICsgbmV3RGlzdGFuY2UgLSAobmV3SGVpZ2h0IC8gMik7XG4gICAgICB9XG5cbiAgICAgIHZhciBuZXdPcGFjaXR5O1xuICAgICAgaWYgKG5ld1Bvc2l0aW9uID09PSAwKSB7XG4gICAgICAgIG5ld09wYWNpdHkgPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3T3BhY2l0eSA9IGNhbGN1bGF0aW9ucy5vcGFjaXR5O1xuICAgICAgfVxuXG4gICAgICAvLyBEZXB0aCB3aWxsIGJlIHJldmVyc2UgZGlzdGFuY2UgZnJvbSBjZW50ZXJcbiAgICAgIHZhciBuZXdEZXB0aCA9IG9wdGlvbnMuZmxhbmtpbmdJdGVtcyArIDIgLSBuZXdEaXN0YW5jZUZyb21DZW50ZXI7XG5cbiAgICAgICRpdGVtLmRhdGEoJ3dpZHRoJyxuZXdXaWR0aCk7XG4gICAgICAkaXRlbS5kYXRhKCdoZWlnaHQnLG5ld0hlaWdodCk7XG4gICAgICAkaXRlbS5kYXRhKCd0b3AnLG5ld1RvcCk7XG4gICAgICAkaXRlbS5kYXRhKCdsZWZ0JyxuZXdMZWZ0KTtcbiAgICAgICRpdGVtLmRhdGEoJ29sZFBvc2l0aW9uJywkaXRlbS5kYXRhKCdjdXJyZW50UG9zaXRpb24nKSk7XG4gICAgICAkaXRlbS5kYXRhKCdkZXB0aCcsbmV3RGVwdGgpO1xuICAgICAgJGl0ZW0uZGF0YSgnb3BhY2l0eScsbmV3T3BhY2l0eSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW92ZUl0ZW0oJGl0ZW0sIG5ld1Bvc2l0aW9uKSB7XG4gICAgICAvLyBPbmx5IHdhbnQgdG8gcGh5c2ljYWxseSBtb3ZlIHRoZSBpdGVtIGlmIGl0IGlzIHdpdGhpbiB0aGUgYm91bmRhcmllc1xuICAgICAgLy8gb3IgaW4gdGhlIGZpcnN0IHBvc2l0aW9uIGp1c3Qgb3V0c2lkZSBlaXRoZXIgYm91bmRhcnlcbiAgICAgIGlmIChNYXRoLmFicyhuZXdQb3NpdGlvbikgPD0gb3B0aW9ucy5mbGFua2luZ0l0ZW1zICsgMSkge1xuICAgICAgICBwZXJmb3JtQ2FsY3VsYXRpb25zKCRpdGVtLCBuZXdQb3NpdGlvbik7XG5cbiAgICAgICAgZGF0YS5pdGVtc0FuaW1hdGluZysrO1xuXG4gICAgICAgICRpdGVtXG4gICAgICAgICAgLmNzcygnei1pbmRleCcsJGl0ZW0uZGF0YSgpLmRlcHRoKVxuICAgICAgICAgIC8vIEFuaW1hdGUgdGhlIGl0ZW1zIHRvIHRoZWlyIG5ldyBwb3NpdGlvbiB2YWx1ZXNcbiAgICAgICAgICAuYW5pbWF0ZSh7XG4gICAgICAgICAgICBsZWZ0OiAgICAkaXRlbS5kYXRhKCkubGVmdCxcbiAgICAgICAgICAgIHdpZHRoOiAgICRpdGVtLmRhdGEoKS53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogICRpdGVtLmRhdGEoKS5oZWlnaHQsXG4gICAgICAgICAgICB0b3A6ICAgICAkaXRlbS5kYXRhKCkudG9wLFxuICAgICAgICAgICAgb3BhY2l0eTogJGl0ZW0uZGF0YSgpLm9wYWNpdHlcbiAgICAgICAgICB9LCBkYXRhLmN1cnJlbnRTcGVlZCwgb3B0aW9ucy5hbmltYXRpb25FYXNpbmcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIEFuaW1hdGlvbiBmb3IgdGhlIGl0ZW0gaGFzIGNvbXBsZXRlZCwgY2FsbCBtZXRob2RcbiAgICAgICAgICAgIGl0ZW1BbmltYXRpb25Db21wbGV0ZSgkaXRlbSwgbmV3UG9zaXRpb24pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkaXRlbS5kYXRhKCdjdXJyZW50UG9zaXRpb24nLCBuZXdQb3NpdGlvbilcbiAgICAgICAgLy8gTW92ZSB0aGUgaXRlbSB0byB0aGUgJ2hpZGRlbicgcG9zaXRpb24gaWYgaGFzbid0IGJlZW4gbW92ZWQgeWV0XG4gICAgICAgIC8vIFRoaXMgaXMgZm9yIHRoZSBpbnRpdGlhbCBzZXR1cFxuICAgICAgICBpZiAoJGl0ZW0uZGF0YSgnb2xkUG9zaXRpb24nKSA9PT0gMCkge1xuICAgICAgICAgICRpdGVtLmNzcyh7XG4gICAgICAgICAgICAnbGVmdCc6ICAgICRpdGVtLmRhdGEoKS5sZWZ0LFxuICAgICAgICAgICAgJ3dpZHRoJzogICAkaXRlbS5kYXRhKCkud2lkdGgsXG4gICAgICAgICAgICAnaGVpZ2h0JzogICRpdGVtLmRhdGEoKS5oZWlnaHQsXG4gICAgICAgICAgICAndG9wJzogICAgICRpdGVtLmRhdGEoKS50b3AsXG4gICAgICAgICAgICAnb3BhY2l0eSc6ICRpdGVtLmRhdGEoKS5vcGFjaXR5LFxuICAgICAgICAgICAgJ3otaW5kZXgnOiAkaXRlbS5kYXRhKCkuZGVwdGhcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgb25jZSBhbiBpdGVtIGhhcyBmaW5pc2hlZCBhbmltYXRpbmcgdG8gaXRzXG4gICAgICogZ2l2ZW4gcG9zaXRpb24uIFNldmVyYWwgZGlmZmVyZW50IHN0YXRlbWVudHMgYXJlIGV4ZWN1dGVkIGhlcmUsIHN1Y2ggYXNcbiAgICAgKiBkZWFsaW5nIHdpdGggdGhlIGFuaW1hdGlvbiBxdWV1ZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGl0ZW1BbmltYXRpb25Db21wbGV0ZSgkaXRlbSwgbmV3UG9zaXRpb24pIHtcbiAgICAgIGRhdGEuaXRlbXNBbmltYXRpbmctLTtcblxuICAgICAgJGl0ZW0uZGF0YSgnY3VycmVudFBvc2l0aW9uJywgbmV3UG9zaXRpb24pO1xuXG4gICAgICAvLyBLZWVwIHRyYWNrIG9mIHdoYXQgaXRlbXMgY2FtZSBhbmQgbGVmdCB0aGUgY2VudGVyIHBvc2l0aW9uLFxuICAgICAgLy8gc28gd2UgY2FuIGZpcmUgY2FsbGJhY2tzIHdoZW4gYWxsIHRoZSByb3RhdGlvbnMgYXJlIGNvbXBsZXRlZFxuICAgICAgaWYgKG5ld1Bvc2l0aW9uID09PSAwKSB7XG4gICAgICAgIGRhdGEuY3VycmVudENlbnRlckl0ZW0gPSAkaXRlbTtcbiAgICAgIH1cblxuICAgICAgLy8gYWxsIGl0ZW1zIGhhdmUgZmluaXNoZWQgdGhlaXIgcm90YXRpb24sIGxldHMgY2xlYW4gdXBcbiAgICAgIGlmIChkYXRhLml0ZW1zQW5pbWF0aW5nID09PSAwKSB7XG4gICAgICAgIGRhdGEuY2Fyb3VzZWxSb3RhdGlvbnNMZWZ0IC09IDE7XG4gICAgICAgIGRhdGEuY3VycmVudGx5TW92aW5nID0gZmFsc2U7XG5cbiAgICAgICAgLy8gSWYgdGhlcmUgYXJlIHN0aWxsIHJvdGF0aW9ucyBsZWZ0IGluIHRoZSBxdWV1ZSwgcm90YXRlIHRoZSBjYXJvdXNlbCBhZ2FpblxuICAgICAgICAvLyB3ZSBwYXNzIGluIHplcm8gYmVjYXVzZSB3ZSBkb24ndCB3YW50IHRvIGFkZCBhbnkgYWRkaXRpb25hbCByb3RhdGlvbnNcbiAgICAgICAgaWYgKGRhdGEuY2Fyb3VzZWxSb3RhdGlvbnNMZWZ0ID4gMCkge1xuICAgICAgICAgIHJvdGF0ZUNhcm91c2VsKDApO1xuICAgICAgICAvLyBPdGhlcndpc2UgdGhlcmUgYXJlIG5vIG1vcmUgcm90YXRpb25zIGFuZC4uLlxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFJlc2V0IHRoZSBzcGVlZCBvZiB0aGUgY2Fyb3VzZWwgdG8gb3JpZ2luYWxcbiAgICAgICAgICBkYXRhLmN1cnJlbnRTcGVlZCA9IG9wdGlvbnMuc3BlZWQ7XG5cbiAgICAgICAgICBkYXRhLmN1cnJlbnRDZW50ZXJJdGVtLmFkZENsYXNzKG9wdGlvbnMuYWN0aXZlQ2xhc3NOYW1lKTtcblxuICAgICAgICAgIGlmIChkYXRhLnBlcmZvcm1pbmdTZXR1cCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIG9wdGlvbnMubW92ZWRUb0NlbnRlcihkYXRhLmN1cnJlbnRDZW50ZXJJdGVtKTtcbiAgICAgICAgICAgIG9wdGlvbnMubW92ZWRGcm9tQ2VudGVyKGRhdGEucHJldmlvdXNDZW50ZXJJdGVtKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkYXRhLnBlcmZvcm1pbmdTZXR1cCA9IGZhbHNlO1xuICAgICAgICAgIC8vIHJlc2V0ICYgaW5pdGF0ZSB0aGUgYXV0b1BsYXlcbiAgICAgICAgICBhdXRvUGxheSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gY2FsbGVkIHRvIHJvdGF0ZSB0aGUgY2Fyb3VzZWwgdGhlIGdpdmVuIG51bWJlciBvZiByb3RhdGlvbnNcbiAgICAgKiBpbiB0aGUgZ2l2ZW4gZGlyZWNpdG9uLiBXaWxsIGNoZWNrIHRvIG1ha2Ugc3VyZSB0aGUgY2Fyb3VzZWwgc2hvdWxkXG4gICAgICogYmUgYWJsZSB0byBtb3ZlLCBhbmQgdGhlbiBhZGp1c3Qgc3BlZWQgYW5kIG1vdmUgaXRlbXNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiByb3RhdGVDYXJvdXNlbChyb3RhdGlvbnMpIHtcbiAgICAgIC8vIENoZWNrIHRvIHNlZSB0aGF0IGEgcm90YXRpb24gaXMgYWxsb3dlZFxuICAgICAgaWYgKGRhdGEuY3VycmVudGx5TW92aW5nID09PSBmYWxzZSkge1xuXG4gICAgICAgIC8vIFJlbW92ZSBhY3RpdmUgY2xhc3MgZnJvbSB0aGUgY2VudGVyIGl0ZW0gd2hpbGUgd2Ugcm90YXRlXG4gICAgICAgIGRhdGEuY3VycmVudENlbnRlckl0ZW0ucmVtb3ZlQ2xhc3Mob3B0aW9ucy5hY3RpdmVDbGFzc05hbWUpO1xuXG4gICAgICAgIGRhdGEuY3VycmVudGx5TW92aW5nID0gdHJ1ZTtcbiAgICAgICAgZGF0YS5pdGVtc0FuaW1hdGluZyA9IDA7XG4gICAgICAgIGRhdGEuY2Fyb3VzZWxSb3RhdGlvbnNMZWZ0ICs9IHJvdGF0aW9ucztcbiAgICAgICAgXG4gICAgICAgIGlmIChvcHRpb25zLnF1aWNrZXJGb3JGdXJ0aGVyID09PSB0cnVlKSB7XG4gICAgICAgICAgLy8gRmlndXJlIG91dCBob3cgZmFzdCB0aGUgY2Fyb3VzZWwgc2hvdWxkIHJvdGF0ZVxuICAgICAgICAgIGlmIChyb3RhdGlvbnMgPiAxKSB7XG4gICAgICAgICAgICBkYXRhLmN1cnJlbnRTcGVlZCA9IG9wdGlvbnMuc3BlZWQgLyByb3RhdGlvbnM7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEFzc3VyZSB0aGUgc3BlZWQgaXMgYWJvdmUgdGhlIG1pbmltdW0gdG8gYXZvaWQgd2VpcmQgcmVzdWx0c1xuICAgICAgICAgIGRhdGEuY3VycmVudFNwZWVkID0gKGRhdGEuY3VycmVudFNwZWVkIDwgMTAwKSA/IDEwMCA6IGRhdGEuY3VycmVudFNwZWVkO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSXRlcmF0ZSB0aHJ1IGVhY2ggaXRlbSBhbmQgbW92ZSBpdFxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEudG90YWxJdGVtczsgaSsrKSB7XG4gICAgICAgICAgdmFyICRpdGVtID0gJChkYXRhLml0ZW1zW2ldKTtcbiAgICAgICAgICB2YXIgY3VycmVudFBvc2l0aW9uID0gJGl0ZW0uZGF0YSgnY3VycmVudFBvc2l0aW9uJyk7XG5cbiAgICAgICAgICB2YXIgbmV3UG9zaXRpb247XG4gICAgICAgICAgaWYgKGRhdGEuY3VycmVudERpcmVjdGlvbiA9PSAnZm9yd2FyZCcpIHtcbiAgICAgICAgICAgIG5ld1Bvc2l0aW9uID0gY3VycmVudFBvc2l0aW9uIC0gMTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3UG9zaXRpb24gPSBjdXJyZW50UG9zaXRpb24gKyAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBXZSBrZWVwIGJvdGggc2lkZXMgYXMgZXZlbiBhcyBwb3NzaWJsZSB0byBhbGxvdyBjaXJjdWxhciByb3RhdGlvbiB0byB3b3JrLlxuICAgICAgICAgIC8vIFdlIHdpbGwgXCJ3cmFwXCIgdGhlIGl0ZW0gYXJyb3VuZCB0byB0aGUgb3RoZXIgc2lkZSBieSBuZWdhdGluZyBpdHMgY3VycmVudCBwb3NpdGlvblxuICAgICAgICAgIHZhciBmbGFua2luZ0FsbG93YW5jZSA9IChuZXdQb3NpdGlvbiA+IDApID8gZGF0YS5yaWdodEl0ZW1zQ291bnQgOiBkYXRhLmxlZnRJdGVtc0NvdW50O1xuICAgICAgICAgIGlmIChNYXRoLmFicyhuZXdQb3NpdGlvbikgPiBmbGFua2luZ0FsbG93YW5jZSkge1xuICAgICAgICAgICAgbmV3UG9zaXRpb24gPSBjdXJyZW50UG9zaXRpb24gKiAtMTtcbiAgICAgICAgICAgIC8vIElmIHRoZXJlJ3MgYW4gdW5ldmVuIG51bWJlciBvZiBcImZsYW5raW5nXCIgaXRlbXMsIHdlIG5lZWQgdG8gY29tcGVuc3RhdGUgZm9yIHRoYXRcbiAgICAgICAgICAgIC8vIHdoZW4gd2UgaGF2ZSBhbiBpdGVtIHN3aXRjaCBzaWRlcy4gVGhlIHJpZ2h0IHNpZGUgd2lsbCBhbHdheXMgaGF2ZSAxIG1vcmUgaW4gdGhhdCBjYXNlXG4gICAgICAgICAgICBpZiAoZGF0YS50b3RhbEl0ZW1zICUgMiA9PSAwKSB7XG4gICAgICAgICAgICAgIG5ld1Bvc2l0aW9uICs9IDE7XG4gICAgICAgICAgICB9IFxuICAgICAgICAgIH1cblxuICAgICAgICAgIG1vdmVJdGVtKCRpdGVtLCBuZXdQb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZXZlbnQgaGFuZGxlciB3aGVuIGFuIGltYWdlIHdpdGhpbiB0aGUgY2Fyb3VzZWwgaXMgY2xpY2tlZFxuICAgICAqIFRoaXMgZnVuY3Rpb24gd2lsbCByb3RhdGUgdGhlIGNhcm91c2VsIHRoZSBjb3JyZWN0IG51bWJlciBvZiByb3RhdGlvbnNcbiAgICAgKiB0byBnZXQgdGhlIGNsaWNrZWQgaXRlbSB0byB0aGUgY2VudGVyLCBvciB3aWxsIGZpcmUgdGhlIGN1c3RvbSBldmVudFxuICAgICAqIHRoZSB1c2VyIHBhc3NlZCBpbiBpZiB0aGUgY2VudGVyIGl0ZW0gaXMgY2xpY2tlZFxuICAgICAqL1xuICAgICQodGhpcykuZmluZCgnaW1nJykuYmluZChcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBpdGVtUG9zaXRpb24gPSAkKHRoaXMpLmRhdGEoKS5jdXJyZW50UG9zaXRpb247XG5cbiAgICAgIGlmIChvcHRpb25zLmltYWdlTmF2ID09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIERvbid0IGFsbG93IGhpZGRlbiBpdGVtcyB0byBiZSBjbGlja2VkXG4gICAgICBpZiAoTWF0aC5hYnMoaXRlbVBvc2l0aW9uKSA+PSBvcHRpb25zLmZsYW5raW5nSXRlbXMgKyAxKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIERvIG5vdGhpbmcgaWYgdGhlIGNhcm91c2VsIGlzIGFscmVhZHkgbW92aW5nXG4gICAgICBpZiAoZGF0YS5jdXJyZW50bHlNb3ZpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBkYXRhLnByZXZpb3VzQ2VudGVySXRlbSA9IGRhdGEuY3VycmVudENlbnRlckl0ZW07XG5cbiAgICAgIC8vIFJlbW92ZSBhdXRvcGxheVxuICAgICAgYXV0b1BsYXkodHJ1ZSk7XG4gICAgICBvcHRpb25zLmF1dG9QbGF5ID0gMDtcbiAgICAgIFxuICAgICAgdmFyIHJvdGF0aW9ucyA9IE1hdGguYWJzKGl0ZW1Qb3NpdGlvbik7XG4gICAgICBpZiAoaXRlbVBvc2l0aW9uID09IDApIHtcbiAgICAgICAgb3B0aW9ucy5jbGlja2VkQ2VudGVyKCQodGhpcykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRmlyZSB0aGUgJ21vdmluZycgY2FsbGJhY2tzXG4gICAgICAgIG9wdGlvbnMubW92aW5nRnJvbUNlbnRlcihkYXRhLmN1cnJlbnRDZW50ZXJJdGVtKTtcbiAgICAgICAgb3B0aW9ucy5tb3ZpbmdUb0NlbnRlcigkKHRoaXMpKTtcbiAgICAgICAgaWYgKGl0ZW1Qb3NpdGlvbiA8IDApIHtcbiAgICAgICAgICBkYXRhLmN1cnJlbnREaXJlY3Rpb24gPSAnYmFja3dhcmQnO1xuICAgICAgICAgIHJvdGF0ZUNhcm91c2VsKHJvdGF0aW9ucyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXRlbVBvc2l0aW9uID4gMCkge1xuICAgICAgICAgIGRhdGEuY3VycmVudERpcmVjdGlvbiA9ICdmb3J3YXJkJztcbiAgICAgICAgICByb3RhdGVDYXJvdXNlbChyb3RhdGlvbnMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cblxuICAgIC8qKlxuICAgICAqIFRoZSB1c2VyIG1heSBjaG9vc2UgdG8gd3JhcCB0aGUgaW1hZ2VzIGlzIGxpbmsgdGFncy4gSWYgdGhleSBkbyB0aGlzLCB3ZSBuZWVkIHRvXG4gICAgICogbWFrZSBzdXJlIHRoYXQgdGhleSBhcmVuJ3QgYWN0aXZlIGZvciBjZXJ0YWluIHNpdHVhdGlvbnNcbiAgICAgKi9cbiAgICAkKHRoaXMpLmZpbmQoJ2EnKS5iaW5kKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICB2YXIgaXNDZW50ZXIgPSAkKHRoaXMpLmZpbmQoJ2ltZycpLmRhdGEoJ2N1cnJlbnRQb3NpdGlvbicpID09IDA7XG4gICAgICAvLyBzaG91bGQgd2UgZGlzYWJsZSB0aGUgbGlua3M/XG4gICAgICBpZiAob3B0aW9ucy5saW5rSGFuZGxpbmcgPT09IDEgfHwgLy8gdHVybiBvZmYgYWxsIGxpbmtzXG4gICAgICAgICAgKG9wdGlvbnMubGlua0hhbmRsaW5nID09PSAyICYmICFpc0NlbnRlcikpIC8vIHR1cm4gb2ZmIGFsbCBsaW5rcyBleGNlcHQgY2VudGVyXG4gICAgICB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIG5leHRJdGVtRnJvbUNlbnRlcigpIHtcbiAgICAgIHZhciAkbmV4dCA9IGRhdGEuY3VycmVudENlbnRlckl0ZW0ubmV4dCgpO1xuICAgICAgaWYgKCRuZXh0Lmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICRuZXh0ID0gZGF0YS5jdXJyZW50Q2VudGVySXRlbS5wYXJlbnQoKS5jaGlsZHJlbigpLmZpcnN0KCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gJG5leHQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJldkl0ZW1Gcm9tQ2VudGVyKCkge1xuICAgICAgdmFyICRwcmV2ID0gZGF0YS5jdXJyZW50Q2VudGVySXRlbS5wcmV2KCk7XG4gICAgICBpZiAoJHByZXYubGVuZ3RoIDw9IDApIHtcbiAgICAgICAgJHByZXYgPSBkYXRhLmN1cnJlbnRDZW50ZXJJdGVtLnBhcmVudCgpLmNoaWxkcmVuKCkubGFzdCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuICRwcmV2O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEludGlhdGUgYSBtb3ZlIG9mIHRoZSBjYXJvdXNlbCBpbiBlaXRoZXIgZGlyZWN0aW9uLiBUYWtlcyBjYXJlIG9mIGZpcmluZ1xuICAgICAqIHRoZSAnbW92aW5nJyBjYWxsYmFja3NcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBtb3ZlT25jZShkaXJlY3Rpb24pIHtcbiAgICAgIGlmIChkYXRhLmN1cnJlbnRseU1vdmluZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgZGF0YS5wcmV2aW91c0NlbnRlckl0ZW0gPSBkYXRhLmN1cnJlbnRDZW50ZXJJdGVtO1xuXG4gICAgICAgIG9wdGlvbnMubW92aW5nRnJvbUNlbnRlcihkYXRhLmN1cnJlbnRDZW50ZXJJdGVtKTtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PSAnYmFja3dhcmQnKSB7XG4gICAgICAgICAgb3B0aW9ucy5tb3ZpbmdUb0NlbnRlcihwcmV2SXRlbUZyb21DZW50ZXIoKSk7XG4gICAgICAgICAgZGF0YS5jdXJyZW50RGlyZWN0aW9uID0gJ2JhY2t3YXJkJztcbiAgICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT0gJ2ZvcndhcmQnKSB7XG4gICAgICAgICAgb3B0aW9ucy5tb3ZpbmdUb0NlbnRlcihuZXh0SXRlbUZyb21DZW50ZXIoKSk7XG4gICAgICAgICAgZGF0YS5jdXJyZW50RGlyZWN0aW9uID0gJ2ZvcndhcmQnO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJvdGF0ZUNhcm91c2VsKDEpO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBOYXZpZ2F0aW9uIHdpdGggYXJyb3cga2V5c1xuICAgICAqL1xuICAgICQoZG9jdW1lbnQpLmtleWRvd24oZnVuY3Rpb24oZSkge1xuICAgICAgaWYgKG9wdGlvbnMua2V5Ym9hcmROYXYpIHtcbiAgICAgICAgLy8gYXJyb3cgbGVmdCBvciB1cFxuICAgICAgICBpZiAoKGUud2hpY2ggPT09IDM3ICYmIG9wdGlvbnMub3JpZW50YXRpb24gPT0gJ2hvcml6b250YWwnKSB8fCAoZS53aGljaCA9PT0gMzggJiYgb3B0aW9ucy5vcmllbnRhdGlvbiA9PSAndmVydGljYWwnKSkge1xuICAgICAgICAgIGF1dG9QbGF5KHRydWUpO1xuICAgICAgICAgIG9wdGlvbnMuYXV0b1BsYXkgPSAwO1xuICAgICAgICAgIG1vdmVPbmNlKCdiYWNrd2FyZCcpO1xuICAgICAgICAvLyBhcnJvdyByaWdodCBvciBkb3duXG4gICAgICAgIH0gZWxzZSBpZiAoKGUud2hpY2ggPT09IDM5ICYmIG9wdGlvbnMub3JpZW50YXRpb24gPT0gJ2hvcml6b250YWwnKSB8fCAoZS53aGljaCA9PT0gNDAgJiYgb3B0aW9ucy5vcmllbnRhdGlvbiA9PSAndmVydGljYWwnKSkge1xuICAgICAgICAgIGF1dG9QbGF5KHRydWUpO1xuICAgICAgICAgIG9wdGlvbnMuYXV0b1BsYXkgPSAwO1xuICAgICAgICAgIG1vdmVPbmNlKCdmb3J3YXJkJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc2hvdWxkIHdlIG92ZXJyaWRlIHRoZSBub3JtYWwgZnVuY3Rpb25hbGl0eSBmb3IgdGhlIGFycm93IGtleXM/XG4gICAgICAgIGlmIChvcHRpb25zLmtleWJvYXJkTmF2T3ZlcnJpZGUgJiYgKFxuICAgICAgICAgICAgKG9wdGlvbnMub3JpZW50YXRpb24gPT0gJ2hvcml6b250YWwnICYmIChlLndoaWNoID09PSAzNyB8fCBlLndoaWNoID09PSAzOSkpIHx8XG4gICAgICAgICAgICAob3B0aW9ucy5vcmllbnRhdGlvbiA9PSAndmVydGljYWwnICYmIChlLndoaWNoID09PSAzOCB8fCBlLndoaWNoID09PSA0MCkpXG4gICAgICAgICAgKSkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFB1YmxpYyBBUEkgbWV0aG9kc1xuICAgICAqL1xuICAgIHRoaXMucmVsb2FkID0gZnVuY3Rpb24gKG5ld09wdGlvbnMpIHtcbiAgICAgIGlmICh0eXBlb2YgbmV3T3B0aW9ucyA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICB2YXIgY29tYmluZURlZmF1bHRXaXRoID0gbmV3T3B0aW9ucztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBjb21iaW5lRGVmYXVsdFdpdGggPSB7fTtcbiAgICAgIH1cbiAgICAgIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgJC5mbi53YXRlcndoZWVsQ2Fyb3VzZWwuZGVmYXVsdHMsIG5ld09wdGlvbnMpO1xuXG4gICAgICBpbml0aWFsaXplQ2Fyb3VzZWxEYXRhKCk7XG4gICAgICBkYXRhLml0ZW1zQ29udGFpbmVyLmZpbmQoJ2ltZycpLmhpZGUoKTtcbiAgICAgIGZvcmNlSW1hZ2VEaW1lbnNpb25zSWZFbmFibGVkKCk7XG5cbiAgICAgIHByZWxvYWQoZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXRPcmlnaW5hbEl0ZW1EaW1lbnNpb25zKCk7XG4gICAgICAgIHByZUNhbGN1bGF0ZVBvc2l0aW9uUHJvcGVydGllcygpO1xuICAgICAgICBzZXR1cENhcm91c2VsKCk7XG4gICAgICAgIHNldHVwU3RhcnRlclJvdGF0aW9uKCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgdGhpcy5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICBhdXRvUGxheSh0cnVlKTtcbiAgICAgIG9wdGlvbnMuYXV0b1BsYXkgPSAwO1xuXG4gICAgICBtb3ZlT25jZSgnZm9yd2FyZCcpO1xuICAgIH1cbiAgICB0aGlzLnByZXYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBhdXRvUGxheSh0cnVlKTtcbiAgICAgIG9wdGlvbnMuYXV0b1BsYXkgPSAwO1xuXG4gICAgICBtb3ZlT25jZSgnYmFja3dhcmQnKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbG9hZChzdGFydGluZ09wdGlvbnMpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgJC5mbi53YXRlcndoZWVsQ2Fyb3VzZWwuZGVmYXVsdHMgPSB7XG4gICAgLy8gbnVtYmVyIHR3ZWVrcyB0byBjaGFuZ2UgYXBwZXJhbmNlXG4gICAgc3RhcnRpbmdJdGVtOiAgICAgICAgICAgICAgIDEsICAgLy8gaXRlbSB0byBwbGFjZSBpbiB0aGUgY2VudGVyIG9mIHRoZSBjYXJvdXNlbC4gU2V0IHRvIDAgZm9yIGF1dG9cbiAgICBzZXBhcmF0aW9uOiAgICAgICAgICAgICAgICAgMTc1LCAvLyBkaXN0YW5jZSBiZXR3ZWVuIGl0ZW1zIGluIGNhcm91c2VsXG4gICAgc2VwYXJhdGlvbk11bHRpcGxpZXI6ICAgICAgIDAuNiwgLy8gbXVsdGlwbGVkIGJ5IHNlcGFyYXRpb24gZGlzdGFuY2UgdG8gaW5jcmVhc2UvZGVjcmVhc2UgZGlzdGFuY2UgZm9yIGVhY2ggYWRkaXRpb25hbCBpdGVtXG4gICAgaG9yaXpvbk9mZnNldDogICAgICAgICAgICAgIDAsICAgLy8gb2Zmc2V0IGVhY2ggaXRlbSBmcm9tIHRoZSBcImhvcml6b25cIiBieSB0aGlzIGFtb3VudCAoY2F1c2VzIGFyY2hpbmcpXG4gICAgaG9yaXpvbk9mZnNldE11bHRpcGxpZXI6ICAgIDEsICAgLy8gbXVsdGlwbGVkIGJ5IGhvcml6b24gb2Zmc2V0IHRvIGluY3JlYXNlL2RlY3JlYXNlIG9mZnNldCBmb3IgZWFjaCBhZGRpdGlvbmFsIGl0ZW1cbiAgICBzaXplTXVsdGlwbGllcjogICAgICAgICAgICAgMC43LCAvLyBkZXRlcm1pbmVzIGhvdyBkcmFzdGljYWxseSB0aGUgc2l6ZSBvZiBlYWNoIGl0ZW0gY2hhbmdlc1xuICAgIG9wYWNpdHlNdWx0aXBsaWVyOiAgICAgICAgICAwLjgsIC8vIGRldGVybWluZXMgaG93IGRyYXN0aWNhbGx5IHRoZSBvcGFjaXR5IG9mIGVhY2ggaXRlbSBjaGFuZ2VzXG4gICAgaG9yaXpvbjogICAgICAgICAgICAgICAgICAgIDAsICAgLy8gaG93IFwiZmFyIGluXCIgdGhlIGhvcml6b250YWwvdmVydGljYWwgaG9yaXpvbiBzaG91bGQgYmUgc2V0IGZyb20gdGhlIGNvbnRhaW5lciB3YWxsLiAwIGZvciBhdXRvXG4gICAgZmxhbmtpbmdJdGVtczogICAgICAgICAgICAgIDMsICAgLy8gdGhlIG51bWJlciBvZiBpdGVtcyB2aXNpYmxlIG9uIGVpdGhlciBzaWRlIG9mIHRoZSBjZW50ZXIgICAgICAgICAgICAgICAgICBcblxuICAgIC8vIGFuaW1hdGlvblxuICAgIHNwZWVkOiAgICAgICAgICAgICAgICAgICAgICAzMDAsICAgICAgLy8gc3BlZWQgaW4gbWlsbGlzZWNvbmRzIGl0IHdpbGwgdGFrZSB0byByb3RhdGUgZnJvbSBvbmUgdG8gdGhlIG5leHRcbiAgICBhbmltYXRpb25FYXNpbmc6ICAgICAgICAgICAgJ2xpbmVhcicsIC8vIHRoZSBlYXNpbmcgZWZmZWN0IHRvIHVzZSB3aGVuIGFuaW1hdGluZ1xuICAgIHF1aWNrZXJGb3JGdXJ0aGVyOiAgICAgICAgICB0cnVlLCAgICAgLy8gc2V0IHRvIHRydWUgdG8gbWFrZSBhbmltYXRpb25zIGZhc3RlciB3aGVuIGNsaWNraW5nIGFuIGl0ZW0gdGhhdCBpcyBmYXIgYXdheSBmcm9tIHRoZSBjZW50ZXJcbiAgICBlZGdlRmFkZUVuYWJsZWQ6ICAgICAgICAgICAgZmFsc2UsICAgIC8vIHdoZW4gdHJ1ZSwgaXRlbXMgZmFkZSBvZmYgaW50byBub3RoaW5nbmVzcyB3aGVuIHJlYWNoaW5nIHRoZSBlZGdlLiBmYWxzZSB0byBoYXZlIHRoZW0gbW92ZSBiZWhpbmQgdGhlIGNlbnRlciBpbWFnZVxuICAgIFxuICAgIC8vIG1pc2NcbiAgICBsaW5rSGFuZGxpbmc6ICAgICAgICAgICAgICAgMiwgICAgICAgICAgICAgICAgIC8vIDEgdG8gZGlzYWJsZSBhbGwgKHVzZWQgZm9yIGZhY2Vib3gpLCAyIHRvIGRpc2FibGUgYWxsIGJ1dCBjZW50ZXIgKHRvIGxpbmsgaW1hZ2VzIG91dClcbiAgICBhdXRvUGxheTogICAgICAgICAgICAgICAgICAgMCwgICAgICAgICAgICAgICAgIC8vIGluZGljYXRlIHRoZSBzcGVlZCBpbiBtaWxsaXNlY29uZHMgdG8gd2FpdCBiZWZvcmUgYXV0b3JvdGF0aW5nLiAwIHRvIHR1cm4gb2ZmLiBDYW4gYmUgbmVnYXRpdmVcbiAgICBvcmllbnRhdGlvbjogICAgICAgICAgICAgICAgJ2hvcml6b250YWwnLCAgICAgIC8vIGluZGljYXRlIGlmIHRoZSBjYXJvdXNlbCBzaG91bGQgYmUgJ2hvcml6b250YWwnIG9yICd2ZXJ0aWNhbCdcbiAgICBhY3RpdmVDbGFzc05hbWU6ICAgICAgICAgICAgJ2Nhcm91c2VsLWNlbnRlcicsIC8vIHRoZSBuYW1lIG9mIHRoZSBjbGFzcyBnaXZlbiB0byB0aGUgY3VycmVudCBpdGVtIGluIHRoZSBjZW50ZXJcbiAgICBrZXlib2FyZE5hdjogICAgICAgICAgICAgICAgZmFsc2UsICAgICAgICAgICAgIC8vIHNldCB0byB0cnVlIHRvIG1vdmUgdGhlIGNhcm91c2VsIHdpdGggdGhlIGFycm93IGtleXNcbiAgICBrZXlib2FyZE5hdk92ZXJyaWRlOiAgICAgICAgdHJ1ZSwgICAgICAgICAgICAgIC8vIHNldCB0byB0cnVlIHRvIG92ZXJyaWRlIHRoZSBub3JtYWwgZnVuY3Rpb25hbGl0eSBvZiB0aGUgYXJyb3cga2V5cyAocHJldmVudHMgc2Nyb2xsaW5nKVxuICAgIGltYWdlTmF2OiAgICAgICAgICAgICAgICAgICB0cnVlLCAgICAgICAgICAgICAgLy8gY2xpY2tpbmcgYSBub24tY2VudGVyIGltYWdlIHdpbGwgcm90YXRlIHRoYXQgaW1hZ2UgdG8gdGhlIGNlbnRlclxuXG4gICAgLy8gcHJlbG9hZGVyXG4gICAgcHJlbG9hZEltYWdlczogICAgICAgICAgICAgIHRydWUsICAvLyBkaXNhYmxlL2VuYWJsZSB0aGUgaW1hZ2UgcHJlbG9hZGVyLiBcbiAgICBmb3JjZWRJbWFnZVdpZHRoOiAgICAgICAgICAgMCwgICAgIC8vIHNwZWNpZnkgd2lkdGggb2YgYWxsIGltYWdlczsgb3RoZXJ3aXNlIHRoZSBjYXJvdXNlbCB0cmllcyB0byBjYWxjdWxhdGUgaXRcbiAgICBmb3JjZWRJbWFnZUhlaWdodDogICAgICAgICAgMCwgICAgIC8vIHNwZWNpZnkgaGVpZ2h0IG9mIGFsbCBpbWFnZXM7IG90aGVyd2lzZSB0aGUgY2Fyb3VzZWwgdHJpZXMgdG8gY2FsY3VsYXRlIGl0XG5cbiAgICAvLyBjYWxsYmFjayBmdW5jdGlvbnNcbiAgICBtb3ZpbmdUb0NlbnRlcjogICAgICAgICAgICAgJC5ub29wLCAvLyBmaXJlZCB3aGVuIGFuIGl0ZW0gaXMgYWJvdXQgdG8gbW92ZSB0byB0aGUgY2VudGVyIHBvc2l0aW9uXG4gICAgbW92ZWRUb0NlbnRlcjogICAgICAgICAgICAgICQubm9vcCwgLy8gZmlyZWQgd2hlbiBhbiBpdGVtIGhhcyBmaW5pc2hlZCBtb3ZpbmcgdG8gdGhlIGNlbnRlclxuICAgIGNsaWNrZWRDZW50ZXI6ICAgICAgICAgICAgICAkLm5vb3AsIC8vIGZpcmVkIHdoZW4gdGhlIGNlbnRlciBpdGVtIGhhcyBiZWVuIGNsaWNrZWRcbiAgICBtb3ZpbmdGcm9tQ2VudGVyOiAgICAgICAgICAgJC5ub29wLCAvLyBmaXJlZCB3aGVuIGFuIGl0ZW0gaXMgYWJvdXQgdG8gbGVhdmUgdGhlIGNlbnRlciBwb3NpdGlvblxuICAgIG1vdmVkRnJvbUNlbnRlcjogICAgICAgICAgICAkLm5vb3AgIC8vIGZpcmVkIHdoZW4gYW4gaXRlbSBoYXMgZmluaXNoZWQgbW92aW5nIGZyb20gdGhlIGNlbnRlclxuICB9O1xuXG59KShqUXVlcnkpO1xuIl0sImZpbGUiOiJqcXVlcnkud2F0ZXJ3aGVlbENhcm91c2VsLmpzIn0=
