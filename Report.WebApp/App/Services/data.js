(function () {

    'use strict';

    var dataService = function ($resource, $log) {
    	
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
                    	$log.error('dataservice load error: \nurl' + self.url + error);
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
                    	$log.error('dataservice get error: \nurl' + self.url + error);
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
					$log.error('dataservice add error: \nurl' + self.url + error);
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
					$log.error('dataservice delete error: \nurl' + self.url + error);
				});
    	};
    };

    angular.module('app.services')
    .service('itemService', ['$resource', '$log', dataService])
    .service('widgetService', ['$resource', '$log', dataService]);
})();