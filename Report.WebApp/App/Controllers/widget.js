'use strict';

angular.module('app.controllers')
.controller("WidgetController", ['$scope', 'widgetService', '$modal', '$log',
	function ($scope, widgetService, $modal, $log) {
		$scope.$root.title = 'Widget';

		var systemUrl = 'http://localhost:63500/api/widgets/:id';

		$scope.widgets = widgetService;
		$scope.widgets.load(systemUrl);

		$scope.create = function () {
			$scope.new = true;
			$scope.widget = { name: '', age: '', color: ''};
			modal();
		};

		$scope.edit = function (widget) {
			$scope.new = false;
			$scope.widget = widget;
			modal();
		};

		var modal = function() {
			var modalInstance = $modal.open({
				templateUrl: 'app/views/widget-detail.html',
				controller: 'ModalInstanceCtrl',
				size: null, // 'lg', 'sm'
				resolve: {
					widgetScope: function () {
						return $scope;
					}
				}
			});

			modalInstance.result.then(
				function () {
				},
				function () {
					$log.info('Modal dismissed');
				});
		};
	}])

.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'widgetScope',
	function ($scope, $modalInstance, widgetScope) {

		$scope.new = widgetScope.new;
		$scope.widget = widgetScope.widget;

		$scope.ok = function () {
			// causes the show-errors directive to show the fields with validation errors
			$scope.$broadcast('show-errors-check-validity');
			if ($scope.widgetForm.$invalid) { return; }
			// add the item (todo: edit/update mode)
			widgetScope.widgets.add($scope.widget);
			$modalInstance.close($scope.widget);
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
}]);
