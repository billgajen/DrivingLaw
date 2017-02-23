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

			// Search toggle
			$('.search-button').on('click', function() {
				$('html, body').scrollTop(0);
				$('.search-modal').show();
			});
			$('.search-popup .close-btn').on('click', function() {
				$('.search-modal').hide();
			});

			// Article share
			$('.share a').not('.share .email a, .share .print a').click(function(){
				window.open(this.href, 'Share', "width=600, height=600");
				return false;
			});

			// Share links popup
			$('.share-icons a.icon').not('.share-icons .jiathis_button_weixin.icon-wechat, .email a.icon').click(function(){
				window.open(this.href, 'Share', "width=600, height=600");
				return false;
			});
			// News & Views H3
			// $('.news-views .featured-item h3').each(function(){
			// 	var title = $(this).text(),
			// 		LowerTitle = title.toLowerCase();

			// 		if(LowerTitle != 'news') {
			// 			LowerTitle = 'insight';
			// 		}
			// 	$(this).parents('.featured-item').addClass(LowerTitle);
			// });

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

			// Hide image tooltip
			$('img').each(function() {
				$(this).removeAttr('title');
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

			//
			$('.news-views .featured-item h3').each(function(){
				var newsTypeName = $(this).text();

				if(newsTypeName === 'News') {
					$(this).parents('.featured-item').addClass('news');
				} else {
					$(this).parents('.featured-item').removeClass('news').addClass('insight');
				}
			});

			// Main Nav show arrow for second level if there's a child
			var menuFirstLevel = $('.isMobile .main-nav ul li'),
				plusElem = $('<span />');

			menuFirstLevel.each(function() {
				if($(this).find('ul').length !== 0) {
					$(this).addClass('parent');
				}
			});
			$('.isMobile .main-nav ul li.parent').append(plusElem);
			$('.isMobile .main-nav ul li.parent span').on('click', function() {
				$(this).siblings('ul').slideToggle();
				$(this).parent().toggleClass('selected');
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
