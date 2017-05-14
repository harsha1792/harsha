var app = angular.module('weather-app',[]);

app.controller('weatherController', ['$scope','$http','$filter',function($scope, $http, $filter) {
    $scope.city;
    $scope.dataList = [];

    $http({
 	    method: 'GET',
 	    url: 'http://api.openweathermap.org/data/2.5/forecast?APPID=019a736fd448ec0464f324f3f7063003&units=metric&q=Newcastle,uk&mode=json'
    }).then( function(response) {
           var data = response.data;
           $scope.city = data.city.name;
           $scope.list = data.list;
           getDataList();
           console.log($scope.list);
       });

    function getDataList() {
    	var date = $filter('date')('4/1/17','fullDate');
    	for(var i=0;i<$scope.list.length;i++) {
    		var currentValue = $scope.list[i];
    		var currentValue_date = $filter('date')(new Date(currentValue.dt_txt),'fullDate');
    		var forcastdata = {};
    		if(currentValue_date != date) {
    			date = currentValue_date;
    			forcastdata.Date = currentValue_date;
                forcastdata.Temperature = currentValue.main.temp;
                forcastdata.Humidity = currentValue.main.humidity;
                forcastdata.Maximun_temp = currentValue.main.temp_max;
                forcastdata.Minimun_temp = currentValue.main.temp_min;
                forcastdata.Wind_deg = currentValue.wind.deg;
                forcastdata.Wind_speed = currentValue.wind.speed;
                forcastdata.Description = currentValue.weather[0].description;
                $scope.dataList.push(forcastdata); 
    		}
    	}
    };



}]);