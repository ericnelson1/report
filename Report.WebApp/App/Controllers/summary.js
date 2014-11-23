'use strict';

angular.module('app.controllers')
.controller("SummaryController", ['$scope', 'reportService',
	function ($scope, reportService) {
		$scope.$root.title = 'Summary';

		$scope.export = reportService;


	}]);
