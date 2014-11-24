'use strict';

angular.module('app.directives')
//angular.module('app.directives',[])
.directive('summaryBox', function () {
	return {
		restrict: 'A',
		templateUrl: '/app/views/summarybox.html'
	}
})


.directive('exportSlide', function ($state) {
	return {
		link: function (scope, elem, attr) {
			var currentCssClass = $state.current.data;
			elem.addClass(currentCssClass);
			scope.$on('$destroy', function () {
				elem.removeClass(currentCssClass);
				elem.addClass($state.current.data);
			})
		}
	}
})

.directive('loadingSpinner', function () {
	return {
		restrict: 'A',
		replace: true,
		transclude: true,
		scope: {
			loading: '=loadingSpinner'
		},
		templateUrl: 'app/views/loading.html',
		link: function (scope, element, attrs) {
			var spinner = new Spinner({ length: 5, width: 2, radius: 3, top: '22px', left: '90%' }).spin();
			var loadingContainer = element.find('.loading-spinner-container')[0];
			loadingContainer.appendChild(spinner.el);
		}
	};
})
.directive('showErrors', function () {
	return {
		restrict: 'A',
		require: '^form',
		link: function (scope, el, attrs, formCtrl) {
			// find the text box element, which has the 'name' attribute
			var inputEl = el[0].querySelector("[name]");
			// convert the native text box element to an angular element
			var inputNgEl = angular.element(inputEl);
			// get the name on the text box so we know the property to check
			// on the form controller
			var inputName = inputNgEl.attr('name');

			// only apply the has-error class after the user leaves the text box
			inputNgEl.bind('blur', function () {
				el.toggleClass('has-error', formCtrl[inputName].$invalid);
			});

			scope.$on('show-errors-check-validity', function () {
				el.toggleClass('has-error', formCtrl[inputName].$invalid);
			});


		}
	}
});
