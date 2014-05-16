var Cars;
(function (Cars){
	var DataStore = (function{
		function DataStore($http){
			this.$http = $http;
		};

		DataStore.prototype.getData = function(){
			var cars = [{ year : 1984, model : 'Porsche 930'},
						{ year : 2012, model : 'Acura TL'},
						{ year : 1965, model : 'Ford Mustang'},
						{ year : 1920, model : 'Ford Model T'},
						{ year : 1994, model : 'Honda NSX'},
						{ year : 2010, model : 'Toyota Corolla'},
						{ year : 2005, model : 'BMW M3'}
			];
			return cars;
		};
		return DataStore;
	})();
	Cars.DataStore = DataStore;
})(Cars);