var app = angular.module('mourantApp', []);


app.controller('MainController', ['$scope','$timeout', function($scope, $timeout) {
	'use strict';

	$scope.newsType = 'news';
	$scope.profileWorksArr = [];
	$scope.profilePublicationsArr = [];
	$scope.profileOverviewOffset = 'col-lg-offset-0';
	$scope.hideItem = '';

	$scope.getNewsType = function(pageName) {
		if(pageName === "News") {
			$scope.newsType = pageName;
		} else {
			$scope.newsType = 'Insight';
		}
	}
	$scope.getProfileWorks = function(pageId) {
		$scope.profileWorksArr.push(pageId);
	}
	$scope.getProfilePublications = function(pageId) {
		$scope.profilePublicationsArr.push(pageId);
	}

	$scope.profileApplyClasses = function() {
		if($scope.profileWorksArr.length > 0 || $scope.profilePublicationsArr.length > 0) {
			$scope.profileOverviewOffset = 'col-lg-offset-0';
		} else {
			$scope.profileOverviewOffset = 'col-lg-offset-3';
			$scope.hideItem = 'hide-item';
		}
	}
	$timeout(function () {
		$scope.profileApplyClasses();
	});
}]);

app.controller('FilterController', ['$scope','$http','$timeout', function($scope, $http, $timeout) {
	'use strict';

	// Featured item filter (News-views,  Work & community) 
	$scope.featuredItemFilter = function(filterPage, pageNumber) {

		$scope.bodyHtml = $('body');
		$scope.page = pageNumber;
		$scope.locationID = $( "#locationId" ).val();
		$scope.serviceID = $( "#serviceId" ).val();
		$scope.sectorID = $( "#sectorId" ).val();
		$scope.contentTypeID = $( "#contentTypeId" ).val();

		$http({
			method: 'GET',
			url: '../_inc/'+filterPage+'-filter.aspx',
			params: {
				page: $scope.page,
				locationId: $scope.locationID,
				serviceId: $scope.serviceID,
				sectorId: $scope.sectorID,
				contentTypeId: $scope.contentTypeID
			}
		})
		.then(function(response) {
			$('.featured-item-container').html(response.data);
			$scope.bodyHtml.animate({ scrollTop: 250 }, 'slow');
			$scope.updateNewsInsightClass();
		});
	}
	$scope.updateNewsInsightClass = function(argument) {
		$('.news-views .featured-item h3').each(function(){
			var newsTypeName = $(this).text();

			if(newsTypeName === 'News') {
				$(this).parents('.featured-item').addClass('news');
			} else {
				$(this).parents('.featured-item').removeClass('news').addClass('insight');
			}
		});
	}

	$scope.newsFilterItem = $('.filter.news select');
	$scope.CommunityFilterItem = $('.filter.community select');
	$scope.workFilterItem = $('.filter.work select');

	$scope.newsFilterItem.on('change', function() {
		$scope.featuredItemFilter('news-views', 1);
	});
	$scope.CommunityFilterItem.on('change', function() {
		$scope.featuredItemFilter('community', 1);
	});
	$scope.workFilterItem.on('change', function() {
		$scope.featuredItemFilter('work', 1);
	});

	$('body.news-views').on('click','.pagination a', function(e) {
		e.preventDefault();
		var pageNo = $(this).data('pageno');

		$scope.featuredItemFilter('news-views', pageNo);
	});

	$('body.community').on('click','.pagination a', function(e) {
		e.preventDefault();
		var pageNo = $(this).data('pageno');

		$scope.featuredItemFilter('community', pageNo);
	});

	$('body.work').on('click','.pagination a', function(e) {
		e.preventDefault();
		var pageNo = $(this).data('pageno');

		$scope.featuredItemFilter('work', pageNo);
	});

	//Events filter
	$scope.eventFilter = function(filterPage) {

		$http({
			method: 'GET',
			url: '../_inc/'+filterPage+'-filter.aspx',
			params : {
				sitePageId: 2570
			}
		})
		.then(function(response) {
			$('.featured-item-container').html(response.data);
		});
	}

	$scope.eventFilterItem = $('#eventId');

	$scope.eventFilterItem.on('change', function() {
		if($(this).val() === "past") {
			console.log($('#eventId').val());
			$scope.eventFilter('past-event');
		} else {
			$scope.eventFilter('upcoming-event');
		}
	});

}]);

app.controller('SearchController', ['$scope','$http','$location', function($scope, $http, $location) {
	'use strict';

	$scope.searchType = 'all';

	$scope.SetSearchType = function(type) {
		$scope.searchType = type;
	}

	//All Search
	$scope.allSearchCount = 0;
	$scope.allPage = 1;
	
	$scope.SetAllSearchCount = function(searchCount) {
		$scope.allSearchCount = searchCount;
	}
	
	//People search
	$scope.peopleSearchCount = 0;
	$scope.peoplePage = 1;

	$scope.SetPeopleSearchCount = function(searchCount) {
		$scope.peopleSearchCount = searchCount;
	}

	//Service Search
	$scope.serviceSearchCount = 0;
	$scope.servicePage = 1;
	
	$scope.SetServiceSearchCount = function(searchCount) {
		$scope.serviceSearchCount = searchCount;
	}

	//Service Search
	$scope.sectorSearchCount = 0;
	$scope.sectorPage = 1;
	
	$scope.SetSectorSearchCount = function(searchCount) {
		$scope.sectorSearchCount = searchCount;
	}

	//News Views Search
	$scope.newsViewsCount = 0;
	$scope.newsViewsPage = 1;
	
	$scope.SetNewsViewsCount = function(searchCount) {
		$scope.newsViewsCount = searchCount;
	}
	// Search results pagination

	$scope.searchValue = '';
	$scope.SetSearchValue = function(searchValue) {
		$scope.searchValue = searchValue;
	}

	$scope.searchFilterPeople = function(pageNumber,fileName,container) {

		$scope.page = pageNumber;

		$http({
			method: 'GET',
			url: '../_inc/'+fileName+'-results.aspx',
			params: {
				sitePageId: 2851,
				page: $scope.page,
				searchValue: $scope.searchValue
			}
		})
		.then(function(response) {
			container.html(response.data);
			$scope.bodyHtml.animate({ scrollTop: 0 }, 'slow');
		});
	}

	$scope.bodyHtml = $('body');
	$scope.allContainer = $('.results-container.all');
	$scope.peopleContainer = $('.results-container.people');
	$scope.serviceContainer = $('.results-container.service');
	$scope.sectorContainer = $('.results-container.sector');
	$scope.newsViewsContainer = $('.results-container.news-views');

	$scope.bodyHtml.on('click','.results-container.all .pagination a', function(e) {
		e.preventDefault();
		var pageNo = $(this).data('pageno');

		$scope.searchFilterPeople(pageNo,'all-search',$scope.allContainer);
	});

	$scope.bodyHtml.on('click','.results-container.people .pagination a', function(e) {
		e.preventDefault();
		var pageNo = $(this).data('pageno');

		$scope.searchFilterPeople(pageNo,'profile-search',$scope.peopleContainer);
	});

	$scope.bodyHtml.on('click','.results-container.service .pagination a', function(e) {
		e.preventDefault();
		var pageNo = $(this).data('pageno');

		$scope.searchFilterPeople(pageNo,'service-search',$scope.serviceContainer);
	});

	$scope.bodyHtml.on('click','.results-container.sector .pagination a', function(e) {
		e.preventDefault();
		var pageNo = $(this).data('pageno');

		$scope.searchFilterPeople(pageNo,'sector-search',$scope.sectorContainer);
	});

	$scope.bodyHtml.on('click','.results-container.news-views .pagination a', function(e) {
		e.preventDefault();
		var pageNo = $(this).data('pageno');

		$scope.searchFilterPeople(pageNo,'news-views-search',$scope.newsViewsContainer);
	});
}]);

