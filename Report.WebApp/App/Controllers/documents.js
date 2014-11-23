'use strict';

angular.module('app.controllers')
.controller("DocumentController", ['$scope', '$state', '$timeout', '$location', '$window', 'reportService', 'documentService',
	function ($scope, $state, $timeout, $location, $window, reportService, documentService) {
		$scope.$root.title = 'Document';

		/*$scope.folders = documentService;
		documentService.load(reportService.selectedProject.FolderUrl, true);

		$scope.selectedFolder = reportService.selectedFolder;
		$scope.selected = !!$scope.selectedFolder;

		$scope.select = function (folder) {
			$scope.selectedFolder = folder;
			$scope.selected = true;
		};

		$scope.isSelected = function (folder) {
			return angular.equals($scope.selectedFolder, folder);
		};
        */

		$scope.next = function () {
			//reportService.selectFolder($scope.selectedFolder);
			$state.go('summary');
		};

		$scope.back = function () {
			$state.go('usergroups');
		};

		$scope.treeOptions = {
		    nodeChildren: "children",
		    dirSelectable: true,
		    injectClasses: {
		        ul: "a1",
		        li: "a2",
		        liSelected: "a7",
		        iExpanded: "a3",
		        iCollapsed: "a4",
		        iLeaf: "a5",
		        label: "a6",
		        labelSelected: "a8"
		    }
		};
	   

		$scope.dataForDocument = [
               {
                   "ArtifactId": 1, "Name": "Fact Witnesses", "children": [
                       { "ArtifactId": 2, "Name": "My Searches", "children": [] },
                       {
                           "ArtifactId": 3, "Name": "Production Quality Check", "children": [
                            { "ArtifactId": 9, "Name": "Radio communications", "children": [] },
                            { "ArtifactId": 10, "Name": "Thermoelectric generators", "children": [] }
                           ]
                       }
                   ]
               },
               { "ArtifactId": 4, "Name": "Responsive Email", "children": [] },
               {
                   "ArtifactId": 5, "Name": "Pioneer 10", "children": [
                       {
                           "ArtifactId": 6, "Name": "Cosmos", "children": [
                              { "ArtifactId": 7, "Name": "Cape Canaveral", "children": [] },
                              { "ArtifactId": 8, "Name": "Jupiter", "children": [] }
                           ]
                       },
                   ]
               },
                { "ArtifactId": 11, "Name": "Goddard", "children": [] },
                { "ArtifactId": 12, "Name": "Deep Space Network", "children": [] },
		];

		$scope.showSelected = function (sel) {
		    $scope.selected = sel.label;
		};

		$scope.opt1 = {
		    nodeChildren: "children",
		    dirSelectable: true
		};


	}]);

