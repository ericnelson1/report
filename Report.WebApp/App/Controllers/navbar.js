'use strict';

angular.module('app.controllers')
.controller("NavbarController", ['$scope', '$location', '$window', 'reportService',
	function ($scope, $location, $window, reportService) {
		$scope.data = reportService;

	}]);
