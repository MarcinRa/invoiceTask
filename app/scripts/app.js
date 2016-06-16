'use strict';

/**
 * @ngdoc overview
 * @name invoiceApp
 * @description
 * # invoiceApp
 *
 * Main module of the application.
 */
angular
  .module('invoiceApp', [
    'ngRoute',
		'ngAnimate',
		'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
			.when('/invoice/', {
        templateUrl: 'views/invoice.html',
        controller: 'InvoiceCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
