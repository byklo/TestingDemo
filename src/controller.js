var Cars;
(function (Cars){
	var CarController = (function(){
		function CarController($scope, $http, DataStore){
			$scope.tabs = {};

			this.$scope = $scope;
			this.DataStore = DataStore;
			this.dataInit();

			var me = this;

			$scope.reloadData = function(){
				me.dataInit();
			};

			$scope.deleteSelected = function(){
				me.deleteSelected();
			};

			$scope.addNewCar = function(){
				me.addNewCar();
			};
		}

		CarController.prototype.dataInit = function(){
			this.$scope.carListing = this.DataStore.getData();
		};

		CarController.prototype.deleteSelected = function(){
			var tempCars = [];

			for(var x=0; x < this.$scope.carListing.length; x++){
				if(this.$scope.carListing[x].selected !== true){
					tempCars.push(this.$scope.carListing[x]);
				}
			}

			this.$scope.carListing = tempCars;
		};

		// Has validation, should be tested.
		CarController.prototype.addNewCar = function(){
			
			var yearValidation = /^\d{4}$/,
				newYear = this.$scope.tabs.newYear,
				newModel = this.$scope.tabs.newModel;

			if(yearValidation.test(newYear) && newModel && '' != newModel){
				this.$scope.carListing.push({
					year : newYear,
					model : newModel
				});

				this.$scope.tabs.newYear = '';
				this.$scope.tabs.newModel = '';
			}
		};

		CarController.prototype.getByHttp = function(){
			var me = this;
			
			this.DataStore.getDataHttp().then(function (response){
				me.$scope.carListing = response;
			});
		};

		CarController.prototype.didItCall = function(){
			this.DataStore.theFunction();
		};

		return CarController;

	});
	Cars.CarController = CarController();


})(Cars || (Cars={}));

var carApp = angular.module('carApp', ['ui.bootstrap']);
carApp .service    ('Cars.DataStore', ['$http', Cars.DataStore])
	   .controller ('Cars.CarController', ['$scope', '$http', 'Cars.DataStore', Cars.CarController]);