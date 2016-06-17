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
			
			if($filter('date')($scope.start_date,'dd.MM.yy') === undefined){
				$scope.formatError = true;	
			} else {
				$scope.formatError = false;
				
				calendarService.setDate($scope.start_date);
				updateNextDate();
			
				$scope.current_description = yearMonthReplace($scope.description);
				if($scope.frequency)
					$scope.new_description = yearMonthReplace($scope.description,$scope.frequency.id);
				else
					$scope.new_description = $scope.description;
				}
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
			$scope.start_date = new Date();
			calendarService.setDate($scope.start_date);
			$scope.altInputFormats = ['M!/d!/yyyy'];
			$scope.formatError = false;
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
		}		
	
		// datepicker configuration

		$scope.dateOptions = {
			formatYear: 'yy',
			maxDate: new Date(2020, 1, 10),
			minDate: new Date(2016, 1, 10),
			startingDay: 1
		};

		$scope.today = function() {
			$scope.start_date = new Date();
		};


		$scope.open = function() {
			$scope.popup.opened = true;
		};

		$scope.format = 'dd.MM.yy';

		$scope.popup = {
			opened: false
		};
	})


	.controller('InvoiceSecondCtrl', function($scope,$filter,selectMode,calendarService) {
		init();
	
		$scope.updateDate = function(){
			
			if($filter('date')($scope.start_date,'dd.MM.yy') === undefined){
				$scope.formatError = true;	
			} else {
				$scope.formatError = false;
				
				calendarService.setDate($scope.start_date);
				updateNextDate();
			}
		}
		
		$scope.updateFrequency = function(){
			calendarService.setMode($scope.frequency.id);
			updateNextDate();
		}
		
		function updateNextDate(){
			var temp_date = calendarService.getNextDate();
			$scope.curr_year = calendarService.getCurrentYear();
			$scope.curr_month = calendarService.getCurrentMonth();
			
			if(temp_date !== undefined){
				
				$scope.new_year = calendarService.getNewYear();
				$scope.new_month = calendarService.getNewMonth();
				
				$scope.next_date = $filter('date')(temp_date,'dd.MM.yy');
				$scope.dates_list = calendarService.getDateList(10);
			}
		}
		
		function init(){
			$scope.selectMode = selectMode;
			$scope.start_date = new Date();
			calendarService.setDate($scope.start_date);
			updateNextDate();
			$scope.altInputFormats = ['M!/d!/yyyy'];
			$scope.formatError = false;
		}
	
		// datepicker configuration

		$scope.dateOptions = {
			formatYear: 'yy',
			maxDate: new Date(2020, 1, 10),
			minDate: new Date(2016, 1, 10),
			startingDay: 1
		};

		$scope.today = function() {
			$scope.start_date = new Date();
		};


		$scope.open = function() {
			$scope.popup.opened = true;
		};

		$scope.format = 'dd.MM.yy';

		$scope.popup = {
			opened: false
		};
	});