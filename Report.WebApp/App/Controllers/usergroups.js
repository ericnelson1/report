'use strict';

angular.module('app.controllers')
.controller("UserGroupController", ['$scope', '$state', '$timeout', '$location', '$window',  
	function ($scope, $state, $timeout, $location, $window) {
		$scope.$root.title = 'User Group';
/*
		$scope.usergroups = userGroupService;
		userGroupService.load(reportService.selectedProject.UserGroupUrl, true);

		$scope.selectedUserGroup = reportService.selectedUserGroup;
		$scope.selected = !!$scope.selectedUserGroup;

		$scope.select = function (usergroup) {
			$scope.selectedUserGroup = usergroup;
			$scope.selected = true;
		};

		$scope.isSelected = function (usergroup) {
			return angular.equals($scope.selectedUserGroup, usergroup);
		};

		$scope.next = function () {
			reportService.selectUserGroup($scope.selectedUserGroup);
			$state.go('documents');
		};

		$scope.back = function () {
			$state.go('projects');
		};
*/
	}]);

