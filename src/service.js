var Cars;
(function (Cars){
	var DataStore = (function(){
		function DataStore($http){
			this.$http = $http;
		}

		DataStore.prototype.getData = function(){
			var cars = [{ year : 1984, model : 'Porsche 930'},
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
			];
			return cars;
		};
		return DataStore;
	})();
	Cars.DataStore = DataStore;
})(Cars || (Cars={}));