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
	
		this.currentDate = undefined;
		
	
		this.setDate= function(date){
			if(date !== null){
				this.currentDate = new Date(date);
			} else {
				this.currentDate = undefined;
			}
		}
		this.getCurrentDate = function(){
			return this.currentDate;
		}
		this.available= function(){
			return this.currentDate !== undefined;
		}
		
		this.nextVaildYear= function(mode){
			if(mode != -1){
				var temp_date = createNewDate(mode);
				return temp_date.getFullYear();
			} else {
				return this.currentDate.getFullYear();
			}
		}
	
		this.nextVaildMonth= function(mode){
			if(mode != -1){
				var temp_date = this.createNewDate(mode);
				return monthNames[ temp_date.getMonth() ];
			} else {
				return monthNames[ this.currentDate.getMonth() ];
			}
		}
		
		this.createNewDate(mode){
			var output = new Date(this.currentDate.getTime());
			output.setMonth( output.getMonth() + selectMode[mode].month );
			output.setDate( output.getDate() + selectMode[mode].days );
			output.setFullYear( output.getFullYear + selectMode[mode].year );
			return output;
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
				);