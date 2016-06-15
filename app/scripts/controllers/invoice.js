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
				$scope.new_description = $filter('yearMonthReplace')(val,7);
				$scope.description = $filter('yearMonthReplace')(val);
			}, true);
		
		
		$scope.updateDate = function(){
			calendarService.setDate($scope.start_data);
			$scope.description = $filter('yearMonthReplace')($scope.description);
			$scope.new_description = $filter('yearMonthReplace')($scope.description,7);	
		}
		
		$scope.modeUp= function(){
			//todo
			$scope.next_date = calendarService.createNewDate(7);
		}
		
		function init(){
			$scope.selectMode = selectMode;
		}
})
	
	
.filter('yearMonthReplace', function(calendarService) {
  return function(input, mode) {
		
		if(mode === undefined)
			mode = -1;
		
		var out = "";
			if(input != undefined){
				out = input;
				if(input.indexOf('[year]') != -1 && calendarService.available()){
					out = input.replace('[year]',calendarService.nextVaildYear( mode ));
				}
				if(input.indexOf('[month]') != -1 && calendarService.available()){
					out = input.replace('[month]',calendarService.nextVaildMonth( mode ));
				}
		}
  return out;
  };
})