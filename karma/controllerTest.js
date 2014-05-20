describe('Car Controller: ', function(){
	var $rootScope,
		$scope,
		$http,
		$httpBackend,
		$q,
		deferred,
		fakeService,
		createController;

	beforeEach(function(){

		// create custom injector loading angular, angularMocks and our module
		var injector = angular.injector(['ng', 'ngMock', 'carApp']);

		// inject dependencies
		$rootScope = injector.get('$rootScope');
		$scope = $rootScope.$new();

		$http = injector.get('$http');
		$httpBackend = injector.get('$httpBackend');

		$q = injector.get('$q');

		// create a mock service
		fakeService = {
			getData : function(){
				return [{ year : 2000, model : 'test1'},
						{ year : 2001, model : 'test2'}];
			},

			// this function mocks an http GET call. it creates a mock promise object
			getDataHttp : function(){
				deferred = $q.defer();
				deferred.resolve([{ year : 2000, model : 'http1'},
								  { year : 2001, model : 'http2'}			  
				]);
				return deferred.promise;
			},

			// create a spy
			theFunction : jasmine.createSpy('fakeService.theFunction')
		};

		// function to create controller
		createController = function(){
			return new Cars.CarController(
				$scope,
				$http,
				fakeService
			);
		};
	});

	it('should be defined.', function(){
		expect(Cars.CarController).toBeDefined();
	});

	it('should be successfully instantiated.', function(){
		var controller = createController();
		expect(controller).toBeDefined();
	});

	it('check construction - should have $scope and a service.', function(){
		var controller = createController();

		expect(controller.$scope).toBe($scope);
		expect(controller.DataStore).toBe(fakeService);
	});

	it('check construction - dataInit should be called on instantiation.', function(){
		var controller = createController();

		expect(controller.$scope.carListing).toEqual(
			[{ year : 2000, model : 'test1'},
			 { year : 2001, model : 'test2'}]
		);
	});

	it('check construction - $scope should have reloadData, deleteSelected, addNewCar functions.', function(){
		var controller = createController();

		expect($scope.reloadData).toBeDefined();
		expect($scope.deleteSelected).toBeDefined();
		expect($scope.addNewCar).toBeDefined();
	});

	it('test dataInit function.', function(){
		var controller = createController();

		controller.$scope.carListing = [];

		controller.dataInit();

		expect(controller.$scope.carListing).toEqual(
			[{ year : 2000, model : 'test1'},
			 { year : 2001, model : 'test2'}]
		);
	});

	it('test deleteSelected function.', function(){
		var controller = createController();

		controller.$scope.carListing[1].selected = true;

		controller.deleteSelected();

		expect(controller.$scope.carListing).toEqual(
			[{ year : 2000, model : 'test1'}]
		);
	});

	it('test addNewCar function.', function(){
		var controller = createController();

		controller.$scope.tabs.newYear = 2002;
		controller.$scope.tabs.newModel = 'test3';

		controller.addNewCar();

		expect(controller.$scope.carListing).toEqual(
			[{ year : 2000, model : 'test1'},
			 { year : 2001, model : 'test2'},
			 { year : 2002, model : 'test3'}]
		);

		expect(controller.$scope.tabs.newYear).toEqual('');
		expect(controller.$scope.tabs.newModel).toEqual('');
	});

	it('test getByHttp function.', function(){
		var controller = createController();

		controller.getByHttp();

		// needs to be called for promises to be resolved
		$scope.$apply();

		expect(controller.$scope.carListing).toEqual(
			[{ year : 2000, model : 'http1'},
			 { year : 2001, model : 'http2'}]
		);
	});

	it('test didItCall function.', function(){
		var controller = createController();

		controller.didItCall();

		expect(fakeService.theFunction).toHaveBeenCalled();
		expect(fakeService.theFunction.callCount).toEqual(1);
	});

});