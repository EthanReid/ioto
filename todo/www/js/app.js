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
            templateUrl: 'views/createCampaign.html',
            controller: 'createCampaignController',
            activetab: 'dashboard'
        })
        .when('/campaigns', {
            templateUrl: 'views/campaigns.html',
            controller: 'campaignsController',
            activetab: 'home'
        })
        .when('/campaign/:id', {
            templateUrl: 'views/campaign.html',
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
        /* Initialize Digits for Web using your application's consumer key that Fabric generated */
        document.getElementById('digits-sdk').onload = function() {
            Digits.init({ consumerKey: 'QySjPEFPolsnBA00M4aIpOi27' });
        };
	}
]);

angular.module('ioto').controller('homeController', ['$scope',
    function ($scope) {
        /* Launch the Login to Digits flow. */
        $scope.login = function onLoginButtonClick(event) {
        Digits.logIn()
            .done(onLogin) /*handle the response*/
            .fail(onLoginFailure);
        }
    }
]);

angular.module('ioto').controller('dashboardController', ['$scope',
    function ($scope) {

    }
]);

angular.module('ioto').controller('createCampaignController', ['$scope',
    function ($scope) {
			Parse.$ = jQuery;

			Parse.initialize("wpvbhNsxxZam6HYa63vmudxBgJrasHXLq7WTxkKH", "WhODpEkC35r18jewjzrpw22KJwxLZJxbGQQcyxST");
			var ProjectInfo = Parse.Object.extend("ProjectPage");
		  var project = new ProjectInfo();

			//TODO: Set up form and do project.set("Stuff")

			project.save(null, {
				success: function(project) {
					// Execute any logic that should take place after the object is saved.
					console.log('New object created with objectId: ' + project.id);
				},
				error: function(project, error) {
					// Execute any logic that should take place if the save fails.
					// error is a Parse.Error with an error code and message.
					console.log('Failed to create new object, with error code: ' + error.message);
				}

			});
    }
]);

angular.module('ioto').controller('campaignController', ['$scope',
    function ($scope) {
			Parse.$ = jQuery;

			Parse.initialize("wpvbhNsxxZam6HYa63vmudxBgJrasHXLq7WTxkKH", "WhODpEkC35r18jewjzrpw22KJwxLZJxbGQQcyxST");
			var ProjectInfo = Parse.Object.extend("ProjectPage");
		  var project = new ProjectInfo();
			//alert('' +project);
			var pTitle = project.get("Title");
			var pDescription = project.get("Description");
			var pTime = project.get("When");
			var pPlace = project.get("Where");
			var pHost = project.get("Contact");
			var pMoney = project.get("MoneyNeeded");
			var pTag = project.get("Tag");

			var title = document.getElementById("Title");
			var description = document.getElementById("description");
			var time = document.getElementById("when");
			var place = document.getElementById("where");
			var host = document.getElementById("who");

    }
		$title.text(pTitle);
]);

angular.module('ioto').controller('campaignsController', ['$scope',
    function ($scope) {

    }
]);
