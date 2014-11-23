'use strict';

angular.module('app', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ngResource', 'app.controllers', 'app.services', 'app.directives'])

    // Gets executed during the provider registrations and configuration phase. Only providers and constants can be
    // injected here. This is to prevent accidental instantiation of services before they have been fully configured.
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

        // UI States, URL Routing & Mapping. For more info see: https://github.com/angular-ui/ui-router
        // ------------------------------------------------------------------------------------------------------------
        //'app.filters', 'app.services', 'app.directives',


        $stateProvider
            //.state('home', {
            //    url: '/',
            //    templateUrl: '/views/index',
            //    controller: 'HomeCtrl'
            //})
            .state('export', {
                url: '',
                abstract: true,
                templateUrl: ''
            })
			.state('item', {
				url: '/item',
				templateUrl: 'app/views/item.html',
				controller: 'ItemController',
				data: 'slideLeft'
			})
			.state('widget', {
				url: '/widget',
				templateUrl: 'app/views/widget.html',
				controller: 'WidgetController',
				data: 'slideLeft'
			})
			.state('projects', {
			    url: '/projects',
			    templateUrl: 'app/views/projects.html',
			    controller: 'ProjectController',
			    data: 'slideLeft'
			})
			.state('usergroups', { 
				url: '/usergroups',
				templateUrl: 'app/views/usergroups.html',
				controller: 'UserGroupController',
				data: 'slideRight'
			})
			.state('documents', {
				url: '/documents',
				templateUrl: 'app/views/documents.html',
				controller: 'DocumentsController',
				data: 'slideLeft'
			})
			.state('summary', {
				url: '/summary',
				templateUrl: 'app/views/summary.html',
				controller: 'SummaryController',
				data: 'slideRight'
			})
    	//.state('otherwise', {
            //	url: '*path',
            //    templateUrl: '/404.html'
            //	//controller: 'Error404Ctrl'
            //});

        // This gets rid of the hash symbol in the url
        //$locationProvider.html5Mode(true);
        //$urlRouterProvider.otherwise('/');

    }])



    // Gets executed after the injector is created and are used to kickstart the application. Only instances and constants
    // can be injected here. This is to prevent further system configuration during application run time.
    .run(['$templateCache', '$rootScope', '$state', '$stateParams', function ($templateCache, $rootScope, $state, $stateParams) {

        $state.go('item');
        
    	// <ui-view> contains a pre-rendered template for the current view
    	// caching it will prevent a round-trip to a server at the first page load
    	//var view = angular.element('#ui-view');
    	//$templateCache.put(view.data('tmpl-url'), view.html());

    	//// Allows to retrieve UI Router state information from inside templates
    	$rootScope.$state = $state;
    	$rootScope.$stateParams = $stateParams;

    	//$rootScope.$on('$stateChangeSuccess', function (event, toState) {

    	//    // Sets the layout name, which can be used to display different layouts (header, footer etc.)
    	//    // based on which page the user is located
    	//    $rootScope.layout = toState.layout;
    	//});

    	$(window).resize(function () {
			// get viewport width
    		var viewport = $(window).width();
    		var width;
    		if (viewport > 768-15) {
				width = $(".sidebar").width() + 69;
    		}
    		else {
    			width = 15;
    		}
    		$(".header-wrapper").css({ "left": width });
    	});

    	$rootScope.$on('$viewContentLoaded', function () { $(window).resize(); });

  }]);