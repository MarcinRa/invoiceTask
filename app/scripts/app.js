'use strict';

/**
 * @ngdoc overview
 * @name dynpApp
 * @description
 * # dynpApp
 *
 * Main module of the application.
 */
angular
  .module('invoiceApp', [
    'ngRoute'
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
