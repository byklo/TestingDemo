describe('Service: ', function(){
	var $http,
		$httpBackend,
		createService;

	beforeEach(function(){
		var injector = angular.injector(['ng', 'ngMock', 'carApp']);

		$http = injector.get('$http');
		$httpBackend = injector.get('$httpBackend');

		createService = function(){
			return new Cars.DataStore($http);
		};
	});

	it('should be defined.', function(){
		expect(Cars.DataStore).toBeDefined();
	});

	it('should be successfully instantiated.', function(){
		var service = createService();
		expect(service).toBeDefined();
	});

	it('should have an $http.', function(){
		var service = createService();
		expect(service.$http).toBe($http);
	});

	it('test getData function.', function(){
		var service = createService();
		expect(service.getData()).toEqual(
			[{ year : 1984, model : 'Porsche 930'},
			 { year : 2012, model : 'Acura TL'},
			 { year : 1965, model : 'Ford Mustang'},
			 { year : 1920, model : 'Ford Model T'},
			 { year : 1994, model : 'Honda NSX'},
			 { year : 2010, model : 'Toyota Corolla'},
			 { year : 2005, model : 'BMW M3'},
			 { year : 3005, model : 'Gambino'},
			 { year : 2009, model : 'Audi R8'},
			 { year : 2006, model : 'BMW 330CI'},
			 { year : 1971, model : 'Datsun 240z'},
			 { year : 2000, model : 'Some Car'},
			 { year : 2000, model : 'Some Car'},
			 { year : 2000, model : 'Some Car'},
			 { year : 2000, model : 'Some Car'},
			 { year : 2000, model : 'Some Car'},
			 { year : 2000, model : 'Some Car'},
			 { year : 2000, model : 'Some Car'},
			 { year : 2000, model : 'Some Car'},
			 { year : 2000, model : 'Some Car'},
			 { year : 2000, model : 'Some Car'},
			 { year : 2000, model : 'Some Car'},
			 { year : 2000, model : 'Some Car'}
			]
		);
	});

	it('test getDataHttp function.', function(){
		var service = createService();

		// sets up a GET expectation as well as a corresponding response
		$httpBackend.expectGET('api/cars').respond('success');

		var testOutput = '';

		service.getDataHttp().then(function (response){
			testOutput = response;
		});

		// required after making any http call
		$httpBackend.flush();

		expect(testOutput).toEqual('success');
	});

});