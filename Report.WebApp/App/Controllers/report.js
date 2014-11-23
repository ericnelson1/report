'use strict';

angular.module('app.controllers', [])
.controller("ReportController", ['$scope', '$location', 
	function ($scope, $location) {
		$scope.$root.title = 'Report';

		$scope.navOptions = [
			{ key: 'item', display: 'Items', show: true },
			{ key: 'widget', display: 'Widgets', show: true },
			{ key: 'projects', display: 'Projects', show: false },
			{ key: 'usergroups', display: 'User Groups', show: false }, 
			{ key: 'documents', display: 'Documents', show: false }, 
			{ key: 'summary', display: 'Summary', show: false }
		];

		var showNavOptions = function (event, args) {
			$scope.navOptions.forEach(function (navOption) {
				var show = false;

				var relativity = (reportService.selectedProject.ApplicationType === 1);
				var edr = (reportService.selectedProject.ApplicationType === 0);
				var usergroup = (!!reportService.selectedUserGroup);

				switch (navOption.key) {
					case 'projects':
						show = true;
						break;
					case 'usergroups':
						show = edr;
						break;
					case 'documents':
						show = (edr && usergroup);
						break;
					case 'summary':
					case 'status':
						show = true;
						break;
				};
				navOption.show = show;
			});
		};

		$scope.$on("selectedProject", showNavOptions);
		$scope.$on("selectedUserGroup", showNavOptions);

	}])
    // Path: /error/404
    .controller('Error404Ctrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
    	$scope.$root.title = 'Error 404: Page Not Found';
    	$scope.$on('$viewContentLoaded', function () {
    		$window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
    	});
    }]);

