'use strict';

angular.module('app.controllers')
.controller("WidgetController", ['$scope', 'widgetService', '$modal',
	function ($scope, widgetService, $modal) {
		$scope.$root.title = 'Widget';

		var systemUrl = 'http://localhost:63500/api/widgets/:id';

		$scope.widgets = widgetService;
		$scope.widgets.load(systemUrl);

		$scope.items = ['item1', 'item2', 'item3'];

		$scope.new = function () {
			$scope.new = true;
			$scope.widget = { name: '', age: '' };
		};

		$scope.edit = function (widget) {
			$scope.new = false;
			$scope.widget = widget;
		};

		var modal = function() {
			var modalInstance = $modal.open({
				templateUrl: 'app/views/widget-detail.html',
				controller: 'ModalInstanceCtrl',
				size: null, // 'lg', 'sm'
				resolve: {
					items: function () {
						return $scope.items;
					}
				}
			});

			modalInstance.result.then(
				function (selectedItem) {
					$scope.selected = selectedItem;
				},
				function () {
					//$log.info('Modal dismissed at: ' + new Date());
				});
		};

		$scope.editEvent = function (event) {
			$scope.opts = ['on', 'off'];

		};

	}])

.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

	$scope.items = items;
	$scope.selected = {
		item: $scope.items[0]
	};

	$scope.ok = function () {
		$modalInstance.close($scope.selected.item);
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});
