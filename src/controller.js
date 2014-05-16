var Cars;
(function (Cars){
	var CarController = (function(){
		function CarController($scope, $http, DataStore){
			this.$scope = $scope;
			this.DataStore = DataStore;

			this.dataInit();
		};

		CarController.prototype.dataInit = function(){
			var me = this;
			this.DataStore.getData().then(function (response){
				me.$scope.carListing = response;
			});
		};
		return CarController;
	})();
	Cars.CarController = CarController;
})(Cars);