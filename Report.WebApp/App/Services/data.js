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

    };

    var dataService2 = function ($resource) {
    	
    	var self = this;

    	self.initialized = false;

    	self.init = function (url) {
    		self.url = url;
    		self.resource = $resource(url);
    		self.initialized = true;
    	};

    	self.inprogress = false;
    	self.error = false;

    	self.load = function (url) {
    		if (!self.initialized) {
    			self.init(url);
    		}

    		self.inprogress = true;

    		self.resource.query(
                    function (data) {
                    	self.items = data;
                    	self.inprogress = false;
                    },
                    function (error) {
                    	self.inprogress = false;
                    	self.error = true;
                    });
    	};

    	self.get = function (url) {
    		if (!self.initialized) {
    			self.init(url);
    		}

    		self.inprogress = true;

    		self.resource.get(
                    function (data) {
                    	self.items = data;
                    	self.inprogress = false;
                    },
                    function (error) {
                    	self.inprogress = false;
                    	self.error = true;
                    });

    	};

    	self.add = function (item) {
    		var Entry = self.resource;
    		var entry = new Entry();
    		$.extend(entry, item);

    		self.inprogress = true;

    		entry.$save(
				function (data) {
					self.items.push(data);
					self.inprogress = false;
	    		},
				function (error) {
					self.error = true;
					self.inprogress = false;
				});
    	};

    	self.delete = function (item) {

    		self.inprogress = true;

    		item.$delete({ id: item.id },
				function () {
					self.items.splice(self.items.indexOf(item), 1);
					self.inprogress = false;
				},
				function (error) {
					self.error = true;
					self.inprogress = false;
				});
    	};
    };

    angular.module('app.services')
    .service('itemService', dataService2)
    .service('widgetService', dataService2);
})();