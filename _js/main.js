$(function(){
	var Module = (function () {
		var html = $('html'),
			isMobile;

		// On load/resize, toggle a class between mobile/desktop mode
		var deviceClass = function () { //-------Public Method
			if ($(window).width() < 751 && !(new RegExp('MSIE [78]')).exec(navigator.userAgent)) {
				if (!html.hasClass('isMobile')) {
					html.addClass('isMobile').removeClass('isDesktop');
					isMobile = true;
				}
			} else {
				if (!html.hasClass('isDesktop')) {
					html.addClass('isDesktop').removeClass('isMobile');
					isMobile = false;
				}
			}
		};

		var general = function () { //-------Public Method

			// Mobile menu
			var mainNav = $('.main-nav');

			$('.isMobile .icon-burger').on('click', function() {
				$('.header-items').slideToggle();
			});

			$('.isDesktop .icon-burger, .isDesktop .top-links, .isDesktop .black').hover(function() {
				$('.top-links, .black').toggle();
				$('.isDesktop .icon-burger').toggleClass('clicked');
			});

			// Article share
			$('.share a').not('.share .email a, .share .print a').click(function(){
				window.open(this.href, 'Share', "width=600, height=600");
				return false;
			});

			$('.share a').each(function() {
				var _href = $(this).attr('href'),
				currentLoc = window.location.href,
				title = encodeURIComponent($('h1').text());

				if ($(this).parent().hasClass('twitter')) {
					$(this).attr('href', _href + currentLoc + '&text=' + title + ':' + '&url=' + currentLoc +  '&via=Mourant');
				} else if ($(this).parent().hasClass('linkedin')) {
					$(this).attr('href', _href  + currentLoc +'&title='+ title);
				} else {
					$(this).attr("href", _href + currentLoc);
				}
			});
			
			// Navigation
			var address = (window.location.href.split(/[\#\?]/)[0].split('/').slice(3));

			$.each($('div.vx_menu a'), function() {
				var location = this.href.split('/').slice(3);

				// if the location and address are the same
				// if the beginning folder is the same and there is no second page
				if (address[0] !== '' && (location.join('/') == address.join('/') || (location[0] == address[0] && !location[1]))) {
					var active_elements = $(this).parents().filter('li').addClass('selected');
				} else if (address[0] === '') {
					$(this).parents().filter('li.first').addClass('selected');
				}
			});

			// Sticky Header 
			$(window).scroll(function(){
				if ($(window).scrollTop() > 40) {
					$('.isDesktop header').addClass('sticky');
					//$('.isDesktop .wrapper').css('padding-top', '90');
				} else {
					$('.isDesktop header').removeClass('sticky');
					//$('.isDesktop .wrapper').css('padding-top', '18');
				}
			});

			// Reset form
			$(".reset a").click(function(e) {
				e.preventDefault();
				$('#profile-search-form')[0].reset();
			});

			//Pre-select based on query string value
			function getParameterByName(name, url) {
				if (!url) {
				  url = window.location.href;
				}
				name = name.replace(/[\[\]]/g, "\\$&");
				var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
					results = regex.exec(url);
				if (!results) return null;
				if (!results[2]) return '';
				return decodeURIComponent(results[2].replace(/\+/g, " "));
			}

			var locationId = getParameterByName('VxForm_Office');

			$('#contact-form-location').val(locationId);

			// Google reCaptcha
			$('form').submit(function() {
				if (grecaptcha.getResponse().length === 0) {
					alert('The reCaptcha form was not completed.  Please try again.');
					return false;
				} else {
					return true;
				}
			});

		};

		return {
			deviceClass: deviceClass,
			general: general
		};

	})();

	//------- Calling Public Methods
	Module.deviceClass();
	Module.general();

	$(window).resize(function () {
		var html = $('html');

		Module.deviceClass();
		$('.isDesktop .main-nav').show();
	});

});
