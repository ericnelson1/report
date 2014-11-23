'use strict';

angular.module('app.controllers')
.controller("ProjectController", ['$scope', '$state', '$timeout', '$location', '$window', 'reportService',
	function ($scope, $state, $timeout, $location, $window, reportService) {
		$scope.$root.title = 'Project';
/*
		$scope.projects = projectService;
		projectService.load(reportService.projectsUrl, true);

		$scope.getImage = function (project) {
			if (project.ApplicationType === 1) {
				return 'assets/images/Relativity.gif';
			}
			else { 
				return 'assets/images/Edr.gif';
			}
		};

		$scope.selectedProject = reportService.selectedProject;
		$scope.selected = !!$scope.selectedProject;

		$scope.select = function (project) {
			$scope.selectedProject = project;
			$scope.selected = true;
		};

		$scope.isSelected = function (project) {
			return (angular.equals($scope.selectedProject, project));
		};

		$scope.next = function () {
			var project = $scope.selectedProject;
			reportService.selectProject(project);
			configService.load(project.ConfigUrl);
			
			var nextState;
			if (project.ApplicationType === 1) {
				nextState = 'savedsearches';
			}
			else {
				nextState = 'usergroups';
			}
			$state.go(nextState);
		};
*/
	}]);