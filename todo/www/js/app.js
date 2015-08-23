angular.module('ioto', [
	'ionic',
    'ngRoute'
]);

angular.module('ioto').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
        .when('/dashboard/:id', {
            templateUrl: 'views/dashboard.html',
            controller: 'dashboardController',
            activetab: 'dashboard',
            resolve: {
                'user': [ '$route',
                function($route) {
                    return {
                        id: $route.current.params.id
                    };
                    // return userFactory.getUser($route.current.params.id)
                    // .then(function(res){
                    //     return res.data;
                    // })
                    // .catch(function(error){
                    //     return null;
                    // });
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
            controller: 'campaignController',
            activetab: 'dashboard',
            resolve: {
                'campaign': [ '$route',
                function($route) {
                    return {
                        id: $route.current.params.id
                    };
                    // return campaignFactory.getCampaign($route.current.params.id)
                    // .then(function(res){
                    //     return res.data;
                    // })
                    // .catch(function(error){
                    //     return null;
                    // });
                }
            ]}
        })
        .when('/', {
          templateUrl: 'views/home.html',
          controller: 'homeController',
          activetab: 'home'
        })
	}
]);

angular.module('ioto').factory('iotoFactory',
	function () {

	}
);

angular.module('ioto').controller('indexController', ['$scope', '$timeout', '$ionicModal', '$ionicSideMenuDelegate',
	function ($scope, $timeout, $ionicModal, $ionicSideMenuDelegate) {



	}
]);

angular.module('ioto').controller('homeController', ['$scope',
    function ($scope) {

    }
]);

angular.module('ioto').controller('dashboardController', ['$scope',
    function ($scope) {

    }
]);

angular.module('ioto').controller('createCampaignController', ['$scope',
    function ($scope) {

    }
]);

angular.module('ioto').controller('campaignController', ['$scope',
    function ($scope) {
			alert('Something happened');
			Parse.$ = jQuery;

			Parse.initialize("wpvbhNsxxZam6HYa63vmudxBgJrasHXLq7WTxkKH", "WhODpEkC35r18jewjzrpw22KJwxLZJxbGQQcyxST");
			var ProjectInfo = Parse.Object.extend("ProjectPage");
		  var project = new ProjectInfo();

			project.save(null, {
		    success: function(project) {
		      // Execute any logic that should take place after the object is saved.
		      alert('New object created with objectId: ' + campainObject.id);
		    },
		    error: function(project, error) {
		      // Execute any logic that should take place if the save fails.
		      // error is a Parse.Error with an error code and message.
		      alert('Failed to create new object, with error code: ' + error.message);
		    }
		  });
    }
]);

angular.module('ioto').controller('campaignsController', ['$scope',
    function ($scope) {

    }
]);
