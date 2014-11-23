'use strict';

angular.module('app.services', [])
.service('reportService', function ($rootScope) {
	this.projectsUrl = 'http://localhost:62500/api/reports';

	this.selectProject = function (project) {
		this.selectedProject = project;
		$rootScope.$broadcast('selectedProject');
	};

	this.selectFolder = function (folder) {
		this.selectedFolder = folder;
	};

	this.selectUserGroup = function (usergroup) {
		this.selectedUserGroup = usergroup;
		$rootScope.$broadcast('selectedUserGroup');
	};
});



