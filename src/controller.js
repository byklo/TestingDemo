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

		CarController.prototype.addNewCar = function(){
			this.$scope.carListing.push({
				year : this.$scope.tabs.newYear,
				model : this.$scope.tabs.newModel
			});

			this.$scope.tabs.newYear = '';
			this.$scope.tabs.newModel = '';
		};

		return CarController;

	});
	Cars.CarController = CarController();


})(Cars || (Cars={}));

var carApp = angular.module('carApp', ['ui.bootstrap']);
carApp .service    ('Cars.DataStore', ['$http', Cars.DataStore])
	   .controller ('Cars.CarController', ['$scope', '$http', 'Cars.DataStore', Cars.CarController]);