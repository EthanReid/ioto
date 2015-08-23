angular.module('ioto', [
	'ionic'
]);

angular.module('ioto').factory('iotoFactory',
	function () {
		
	}
);

angular.module('owm').config(['$routeProvider', '$httpProvider',
    function ($routeProvider, $httpProvider) {
        $httpProvider.interceptors.push('httpInterceptorFactory');

        $routeProvider
        .when('/dashboard/:id', {
            templateUrl: 'views/dashboard.html',
            controller: 'dashboardController',
            activetab: 'dashboard',
            resolve: {
                'user': [ '$route', 'userFactory',
                function($route, userFactory) {
                    return userFactory.getUser($route.current.params.id)
                    .then(function(res){
                        return res.data;
                    })
                    .catch(function(error){
                        return null;
                    });
                }
            ]}
        })
        .when('/dashboard/create-campaign', {
            templateUrl: 'views/create-campaign.html',
            controller: 'createCampaignController',
            activetab: 'dashboard'
        })
        .when('/campaigns', {
            templateUrl: 'views/campaigns.html',
            controller: 'campaignsController',
            activetab: 'home'
        })
        .when('/campaign/:id', {
            templateUrl: 'views/create-campaign.html',
            controller: 'createCampaignController',
            activetab: 'dashboard',
            resolve: {
                'campaign': [ '$route', 'campaignFactory',
                function($route, campaignFactory) {
                    return campaignFactory.getCampaign($route.current.params.id)
                    .then(function(res){
                        return res.data;
                    })
                    .catch(function(error){
                        return null;
                    });
                }
            ]}
        })
        .when('/', {
          templateUrl: 'views/home.html',
          controller: 'homeController',
          activetab: 'home'
        })
        .otherwise('/');
	}
]);

angular.module('ioto').controller('indexController', ['$scope', '$timeout', '$ionicModal', '$ionicSideMenuDelegate',
	function ($scope, $timeout, $ionicModal, $ionicSideMenuDelegate) {



	}
]);
