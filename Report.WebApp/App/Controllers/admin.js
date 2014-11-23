'use strict';

angular.module('app.controllers')
.controller("AdminController", ['$scope', 'reportService', 'environmentService', 'subsystemService', '$resource',
	function ($scope, reportService, environmentService, subsystemService, $resource) {
		$scope.$root.title = 'Administrator';

		$scope.report = reportService;
		$scope.subsystems = subsystemService;

		var environmentUrl = 'http://localhost:63500/api/environments/:id';

		$scope.environments = environmentService;
		$scope.environments.load(environmentUrl);

	}]);
