'use strict';

/**
 * @ngdoc function
 * @name invoiceApp.service.calendarService
 * @description
 * # calendarService
 * Controller of the invoiceApp
 */

angular.module('invoiceApp')
	
	.service('calendarService', function(selectMode, monthNames){
		var self = this;
	
		var currentDate = undefined;
	  var nextDate = undefined;
		var mode = -1;
		
		function update(){
			if( currentDate != undefined && mode != -1){
				nextDate = createNewDate(mode);
			}
		}
	
		function createNewDate(mode){
			return createNextDate(currentDate,mode);			
		}
	
		function createNextDate(date,mode){
			var output = new Date(date.getTime());
			output.setMonth( output.getMonth() + selectMode[mode].month );
			output.setDate( output.getDate() + selectMode[mode].days );
			output.setFullYear( output.getFullYear() + selectMode[mode].year );
			return output;
		}
		
		this.getDateList = function(length){
			var out = undefined; 
			if(length < 20 && mode != -1 && currentDate != undefined){
				var index =0;
				var tempDate = new Date(currentDate.getTime());
				out = new Array();
				var temp_date = currentDate;
				while(index<length){
					var temp_date = createNextDate(temp_date, mode);
					out.push(temp_date);
					index++;
				}
			}
			return out;
		}
	
		this.setDate= function(date){
			if(date !== null){
				currentDate = new Date(date);
			} else {
				currentDate = undefined;
			}
			update();
		}
		this.setMode= function(param){
			mode = param;
			update();
		}
		this.getNextDate = function(){
			return nextDate;
		}
		this.getCurrentDate = function(){
			return currentDate;
		}
		this.available= function(){
			return currentDate !== undefined;
		}
		
		this.getYear= function(mode){
			if(mode != -1){
				return nextDate.getFullYear();
			} else {
				return currentDate.getFullYear();
			}
		}
	
		this.getMonth= function(mode){
			if(mode != -1){
				return monthNames[ nextDate.getMonth() ];
			} else {
				return monthNames[ currentDate.getMonth() ];
			}
		}
		
		this.getCurrentYear= function(){
			return currentDate !== undefined ? currentDate.getFullYear(): "";
		}		
		this.getCurrentMonth= function(){
			return currentDate !== undefined ? monthNames[ currentDate.getMonth() ]: "";
		}
		this.getNewYear= function(){
			return currentDate !== undefined ? nextDate.getFullYear(): "";
		}
		this.getNewMonth= function(){
			return currentDate !== undefined ? monthNames[ nextDate.getMonth() ]: "";
		}
		
	})
	
	.value('selectMode',
				 		[{id:0, name:"weekly",  						days: 7 , month: 0, year:0 },
						 {id:1, name:"every second week",  days: 14, month: 0, year:0 },
						 {id:2, name:"every third week", 	days: 21, month: 0, year:0 },
						 {id:3, name:"monthly",  					days: 0, month: 1, year:0 },
						 {id:4, name:"every second month", days: 0, month: 2, year:0 },
						 {id:5, name:"quarterly",          days: 0, month: 3, year:0 },
						 {id:6, name:"every half year",    days: 0, month: 6, year:0 },
						 {id:7, name:"yearly", 						days: 0, month: 0, year:1 }
						]
		)

	.value('monthNames', ["January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"]
		)
	.filter('replaceFilter', function() {
		return function(input, selector, replacement ) {
			var out = input;

			if(input !== undefined && selector !== undefined && replacement !== undefined && replacement != ""){
				if(input.indexOf(selector) != -1){
					out = input.split(selector).join(replacement);
				}
			}
		return out;
		};
	});