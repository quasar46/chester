(function ($) {

	$.fn.menuAim = function (opts) {
		// Initialize menu-aim for all elements in jQuery collection
		this.each(function () {
			init.call(this, opts);
		});

		return this;
	};

	function init(opts) {
		var $menu = $(this),
			activeRow = null,
			mouseLocs = [],
			lastDelayLoc = null,
			timeoutId = null,
			options = $.extend({
				rowSelector: "> li",
				submenuSelector: "*",
				submenuDirection: "right",
				tolerance: 75,  // bigger = more forgivey when entering submenu
				enter: $.noop,
				exit: $.noop,
				activate: $.noop,
				deactivate: $.noop,
				exitMenu: $.noop
			}, opts);

		var MOUSE_LOCS_TRACKED = 3,  // number of past mouse locations to track
			DELAY = 300;  // ms delay when user appears to be entering submenu

		/**
		 * Keep track of the last few locations of the mouse.
		 */
		var mousemoveDocument = function (e) {
			mouseLocs.push({ x: e.pageX, y: e.pageY });

			if (mouseLocs.length > MOUSE_LOCS_TRACKED) {
				mouseLocs.shift();
			}
		};

		/**
		 * Cancel possible row activations when leaving the menu entirely
		 */
		var mouseleaveMenu = function () {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}

			// If exitMenu is supplied and returns true, deactivate the
			// currently active row on menu exit.
			if (options.exitMenu(this)) {
				if (activeRow) {
					options.deactivate(activeRow);
				}

				activeRow = null;
			}
		};

		/**
		 * Trigger a possible row activation whenever entering a new row.
		 */
		var mouseenterRow = function () {
			if (timeoutId) {
				// Cancel any previous activation delays
				clearTimeout(timeoutId);
			}

			options.enter(this);
			possiblyActivate(this);
		},
			mouseleaveRow = function () {
				options.exit(this);
			};

		/*
		 * Immediately activate a row if the user clicks on it.
		 */
		var clickRow = function () {
			activate(this);
		};

		/**
		 * Activate a menu row.
		 */
		var activate = function (row) {
			if (row == activeRow) {
				return;
			}

			if (activeRow) {
				options.deactivate(activeRow);
			}

			options.activate(row);
			activeRow = row;
		};

		/**
		 * Possibly activate a menu row. If mouse movement indicates that we
		 * shouldn't activate yet because user may be trying to enter
		 * a submenu's content, then delay and check again later.
		 */
		var possiblyActivate = function (row) {
			var delay = activationDelay();

			if (delay) {
				timeoutId = setTimeout(function () {
					possiblyActivate(row);
				}, delay);
			} else {
				activate(row);
			}
		};

		/**
		 * Return the amount of time that should be used as a delay before the
		 * currently hovered row is activated.
		 *
		 * Returns 0 if the activation should happen immediately. Otherwise,
		 * returns the number of milliseconds that should be delayed before
		 * checking again to see if the row should be activated.
		 */
		var activationDelay = function () {
			if (!activeRow || !$(activeRow).is(options.submenuSelector)) {
				// If there is no other submenu row already active, then
				// go ahead and activate immediately.
				return 0;
			}

			var offset = $menu.offset(),
				upperLeft = {
					x: offset.left,
					y: offset.top - options.tolerance
				},
				upperRight = {
					x: offset.left + $menu.outerWidth(),
					y: upperLeft.y
				},
				lowerLeft = {
					x: offset.left,
					y: offset.top + $menu.outerHeight() + options.tolerance
				},
				lowerRight = {
					x: offset.left + $menu.outerWidth(),
					y: lowerLeft.y
				},
				loc = mouseLocs[mouseLocs.length - 1],
				prevLoc = mouseLocs[0];

			if (!loc) {
				return 0;
			}

			if (!prevLoc) {
				prevLoc = loc;
			}

			if (prevLoc.x < offset.left || prevLoc.x > lowerRight.x ||
				prevLoc.y < offset.top || prevLoc.y > lowerRight.y) {
				// If the previous mouse location was outside of the entire
				// menu's bounds, immediately activate.
				return 0;
			}

			if (lastDelayLoc &&
				loc.x == lastDelayLoc.x && loc.y == lastDelayLoc.y) {
				// If the mouse hasn't moved since the last time we checked
				// for activation status, immediately activate.
				return 0;
			}

			// Detect if the user is moving towards the currently activated
			// submenu.
			//
			// If the mouse is heading relatively clearly towards
			// the submenu's content, we should wait and give the user more
			// time before activating a new row. If the mouse is heading
			// elsewhere, we can immediately activate a new row.
			//
			// We detect this by calculating the slope formed between the
			// current mouse location and the upper/lower right points of
			// the menu. We do the same for the previous mouse location.
			// If the current mouse location's slopes are
			// increasing/decreasing appropriately compared to the
			// previous's, we know the user is moving toward the submenu.
			//
			// Note that since the y-axis increases as the cursor moves
			// down the screen, we are looking for the slope between the
			// cursor and the upper right corner to decrease over time, not
			// increase (somewhat counterintuitively).
			function slope(a, b) {
				return (b.y - a.y) / (b.x - a.x);
			};

			var decreasingCorner = upperRight,
				increasingCorner = lowerRight;

			// Our expectations for decreasing or increasing slope values
			// depends on which direction the submenu opens relative to the
			// main menu. By default, if the menu opens on the right, we
			// expect the slope between the cursor and the upper right
			// corner to decrease over time, as explained above. If the
			// submenu opens in a different direction, we change our slope
			// expectations.
			if (options.submenuDirection == "left") {
				decreasingCorner = lowerLeft;
				increasingCorner = upperLeft;
			} else if (options.submenuDirection == "below") {
				decreasingCorner = lowerRight;
				increasingCorner = lowerLeft;
			} else if (options.submenuDirection == "above") {
				decreasingCorner = upperLeft;
				increasingCorner = upperRight;
			}

			var decreasingSlope = slope(loc, decreasingCorner),
				increasingSlope = slope(loc, increasingCorner),
				prevDecreasingSlope = slope(prevLoc, decreasingCorner),
				prevIncreasingSlope = slope(prevLoc, increasingCorner);

			if (decreasingSlope < prevDecreasingSlope &&
				increasingSlope > prevIncreasingSlope) {
				// Mouse is moving from previous location towards the
				// currently activated submenu. Delay before activating a
				// new menu row, because user may be moving into submenu.
				lastDelayLoc = loc;
				return DELAY;
			}

			lastDelayLoc = null;
			return 0;
		};

		/**
		 * Hook up initial menu events
		 */
		$menu
			.mouseleave(mouseleaveMenu)
			.find(options.rowSelector)
			.mouseenter(mouseenterRow)
			.mouseleave(mouseleaveRow)
			.click(clickRow);

		$(document).mousemove(mousemoveDocument);

	};
})(jQuery);







jQuery(document).ready(function ($) {
	//open/close mega-navigation
	$('.cd-dropdown-trigger').on('click', function (event) {
		event.preventDefault();
		toggleNav();
	});

	//close meganavigation
	$('.cd-dropdown .cd-close').on('click', function (event) {
		event.preventDefault();
		toggleNav();
	});

	if (window.innerWidth < 1210) {
		$('.has-children').children('a').on('click', function (e) {
			e.preventDefault()
		})
	}

	$('.menu > a[href^="#"]').on('click', function () {
		$('body').removeClass('hidden')
		$('.menu').removeClass('active')
		$('.burger').removeClass('active')
	})

	//on mobile - open submenu
	$('.has-children').children('a').on('click', function (event) {
		//prevent default clicking on direct children of .has-children 
		// event.preventDefault();
		var selected = $(this);
		selected.next('ul').removeClass('is-hidden').end().parent('.has-children').parent('ul').addClass('move-out');
	});

	//on desktop - differentiate between a user trying to hover over a dropdown item vs trying to navigate into a submenu's contents
	var submenuDirection = (!$('.cd-dropdown-wrapper').hasClass('open-to-left')) ? 'right' : 'left';
	$('.cd-dropdown-content').menuAim({
		activate: function (row) {
			$(row).children().addClass('is-active').removeClass('fade-out');
			if ($('.cd-dropdown-content .fade-in').length == 0) $(row).children('ul').addClass('fade-in');
		},
		deactivate: function (row) {
			$(row).children().removeClass('is-active');
			if ($('li.has-children:hover').length == 0 || $('li.has-children:hover').is($(row))) {
				$('.cd-dropdown-content').find('.fade-in').removeClass('fade-in');
				$(row).children('ul').addClass('fade-out')
			}
		},
		exitMenu: function () {
			$('.cd-dropdown-content').find('.is-active').removeClass('is-active');
			return true;
		},
		submenuDirection: submenuDirection,
	});

	//submenu items - go back link
	$('.go-back').on('click', function () {
		var selected = $(this),
			visibleNav = $(this).parent('ul').parent('.has-children').parent('ul');
		selected.parent('ul').addClass('is-hidden').parent('.has-children').parent('ul').removeClass('move-out');
	});

	function toggleNav() {
		var navIsVisible = (!$('.cd-dropdown').hasClass('dropdown-is-active')) ? true : false;
		$('.cd-dropdown').toggleClass('dropdown-is-active', navIsVisible);
		$('.cd-dropdown-trigger').toggleClass('dropdown-is-active', navIsVisible);
		if (!navIsVisible) {
			$('.cd-dropdown').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
				$('.has-children ul').addClass('is-hidden');
				$('.move-out').removeClass('move-out');
				$('.is-active').removeClass('is-active');
			});
		}
	}
});