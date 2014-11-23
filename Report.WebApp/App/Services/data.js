(function () {

    'use strict';

    var dataService = function ($resource) {

        // private 

        var _resource;

        var _stateEnum = {
            uninitialized: {},
            loading: {},
            error: {},
            initialized: {}
        };

        var _state = _stateEnum.uninitialized;

        var _load = function (url, isArray) {
            var self = this;
            _state = _stateEnum.loading;
            _resource = $resource(url);

            if (isArray) {
                _resource.query(
                    function (data) {
                        self.data = data;
                        _state = _stateEnum.initialized;
                    },
                    function (error) {
                        _state = _stateEnum.error;
                    });
            }
            else {
                this.data = _resource.get(
                    function (data) {
                        self.data = data;
                        _state = _stateEnum.initialized;
                    },
                    function () {
                        _state = _stateEnum.error;
                    });
            }
        };

        var _save = function (url) {
			_resource.save()
        };

        // public

        this.data = {};

        this.loading = function () {
            return _state === _stateEnum.loading;
        };
        this.error = function () {
            return _state === _stateEnum.error;
        };
        this.initialized = function () {
            return _state === _stateEnum.initialized;
        };

        this.load = function (url, isArray) {
            return _load.call(this, url, isArray);
        };

        this.save = function (url) {
        	return _save.call(this, url);
        };

    }

    angular.module('app.services')
    .service('environmentService', dataService)
    .service('subsystemService', dataService);
})();