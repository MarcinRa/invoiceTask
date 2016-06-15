'use strict';

/**
 * @ngdoc function
 * @name invoiceApp.controller:InvoiceCtrl
 * @description
 * # InvoiceCtrl
 * Controller of the invoiceApp
 */
angular.module('invoiceApp')
	.controller('InvoiceCtrl', function($scope,$filter,selectMode,calendarService){
		
		init();
	
		$scope.$watch('description', function(val) {
				$scope.current_description = yearMonthReplace(val);
				if($scope.frequency)
					$scope.new_description = yearMonthReplace(val, $scope.frequency.id);
				else
					$scope.new_description = $scope.description;
			}, true);
		
		$scope.updateDate = function(){
			calendarService.setDate($scope.start_data);
			updateNextDate();
			
			$scope.current_description = yearMonthReplace($scope.description);
			if($scope.frequency)
				$scope.new_description = yearMonthReplace($scope.description,$scope.frequency.id);
			else
				$scope.new_description = $scope.description;
		}
		
		$scope.updateFrequency = function(){
			calendarService.setMode($scope.frequency.id);
			updateNextDate();
			if($scope.frequency)
					$scope.new_description = yearMonthReplace($scope.description, $scope.frequency.id);
			else
				$scope.new_description = $scope.description;
		}
		
		function updateNextDate(){
			var temp_date = calendarService.getNextDate()
			if(temp_date !== undefined){
				$scope.next_date = $filter('date')(temp_date,'dd.MM.yy');
				$scope.dates_list = calendarService.getDateList(10);
			}
		}
		
		function init(){
			$scope.selectMode = selectMode;
		}
	
	 function yearMonthReplace(input, mode) {
  		if(mode === undefined)
				mode = -1;
		 
			if(input != undefined){
				if(input.indexOf('[year]') != -1 && calendarService.available()){
					input = input.split('[year]').join(calendarService.getYear( mode ));
				}
				if(input.indexOf('[month]') != -1 && calendarService.available()){
						input = input.split('[month]').join(calendarService.getMonth( mode ));
				}
			}
		return input;
		};
	
		
});