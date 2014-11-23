'use strict';

angular.module('app.directives')
//angular.module('app.directives',[])
.directive('summaryBox', function () {
    return {
        restrict: 'A',
        templateUrl: '/app/views/summarybox.html'
    }
})


.directive('exportSlide',function($state){
    return {
        link: function (scope, elem, attr) {
            var currentCssClass = $state.current.data;
            elem.addClass(currentCssClass);
            scope.$on('$destroy',function(){
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
            var spinner = new Spinner().spin();
            var loadingContainer = element.find('.loading-spinner-container')[0];
            loadingContainer.appendChild(spinner.el);
        }
    };
});




