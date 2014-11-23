'use strict';

angular.module('app.controllers')
.controller("AdminController", ['$scope', 'reportService', 'environmentService', 'subsystemService', '$resource',
	function ($scope, reportService, environmentService, subsystemService, $resource) {
		$scope.$root.title = 'Administrator';

		$scope.report = reportService;
		//$scope.environments = environmentService;
		$scope.subsystems = subsystemService;

		var environmentUrl = 'http://localhost:63500/api/environments/:id';
		//$scope.environments.load(environmentUrl, true);

		var Entry = $resource(environmentUrl);

		$scope.addEnvironment = function (environment) {
			$scope.entry = new Entry(); //You can instantiate resource class

			$scope.entry.name = environment.name;

			$scope.entry.$save(function (data) {
				$scope.environments.push(data);
				$scope.environment.name = '';
			},
			function (err) {
			});
		};
		
		$scope.deleteEnvironment = function (environment) {
			environment.$delete({ id: environment.id },
				function () {
					$scope.environments.splice($scope.environments.indexOf(environment), 1);
				},
				function () {

				}
				);
			
		};
		//var entry = Entry.get({ id: $scope.id }, function () {
		//	console.log(entry);
		//}); // get() returns a single entry

		$scope.environments = Entry.query(); //query() returns all the entries




	}]);
