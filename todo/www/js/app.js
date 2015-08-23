angular.module('ioto', [
  'ionic',
  'ngRoute'
]);

angular.module('ioto').config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/dashboard/:id', {
        templateUrl: 'views/dashboard.html',
        controller: 'dashboardController',
        activetab: 'dashboard',
        resolve: {
          'userId': ['$route',
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
          ]
        }
      })
      .when('/create-campaign', {
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
                'campaignId': [ '$route',
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
  function() {

  }
);

angular.module('ioto').controller('indexController', ['$scope', '$timeout',
  function ($scope, $timeout) {
      /* Initialize Digits for Web using your application's consumer key that Fabric generated */
      Digits.init({ consumerKey: 'QySjPEFPolsnBA00M4aIpOi27' });
	}
]);

angular.module('ioto').controller('homeController', ['$scope',
    function ($scope) {
        /* Launch the Login to Digits flow. */
        $scope.login = function () {
            Digits.logIn()
            .done(function (loginResponse) {
                /*handle the response*/
                console.log('Digits login succeeded.');
                var oAuthHeaders = parseOAuthHeaders(loginResponse.oauth_echo_headers);
                console.log(oAuthHeaders);
                //setDigitsButton('Signing In…');
                $.ajax({
                    type: 'POST',
                    url: '/digits',
                    data: oAuthHeaders,
                    success: function (res) {
                        console.log(res);
                        
                    }
                });
            })
            .fail(function () {
                /*handle the error*/
            });
        }

        /**
        * Parse OAuth Echo Headers:
        * 'X-Verify-Credentials-Authorization'
        * 'X-Auth-Service-Provider'
        */
        function parseOAuthHeaders(oAuthEchoHeaders) {
            var credentials = oAuthEchoHeaders['X-Verify-Credentials-Authorization'];
            var apiUrl = oAuthEchoHeaders['X-Auth-Service-Provider'];

            return {
                apiUrl: apiUrl,
                credentials: credentials
            };
        }
    }

]);

angular.module('ioto').controller('dashboardController', ['$scope', '$timeout', 'userId', '$location',
      function($scope, $timeout, userId, $location) {
        Parse.$ = jQuery;

        Parse.initialize("wpvbhNsxxZam6HYa63vmudxBgJrasHXLq7WTxkKH", "WhODpEkC35r18jewjzrpw22KJwxLZJxbGQQcyxST");
        var CampaignInfo = Parse.Object.extend("ProjectPage");
        var query = new Parse.Query(CampaignInfo);

				console.log(userId);
				console.log(userId.id);
        query.equalTo('userId', userId.id)
						 .find({
          success: function(campaigns) {
						console.log(campaigns);
						$timeout(function() {
							$scope.campaigns = campaigns;
							$scope.goToEvent = function() {
								$location.path('/campaign/' + campaigns.objectId);
							}
            });
          },
          error: function(object, error) {
            console.log(object, error);
          }
        });

      }

    ]);


    angular.module('ioto').controller('createCampaignController', ['$scope', '$location',
      function($scope, $location) {
        Parse.$ = jQuery;

        Parse.initialize("wpvbhNsxxZam6HYa63vmudxBgJrasHXLq7WTxkKH", "WhODpEkC35r18jewjzrpw22KJwxLZJxbGQQcyxST");
        var ProjectInfo = Parse.Object.extend("ProjectPage");
        var project = new ProjectInfo();


        //	project.set("Tag", );
        $scope.submit = function() {
          var userName = document.getElementById("userId").value;
					var Title = document.getElementById("Title").value;
          var Name = document.getElementById("name").value;
          var theDate = document.getElementById("date").value;
          var description = document.getElementById("description").value;
          var Where = document.getElementById("place").value;
          var Money = parseInt(document.getElementById("money").value);

          console.log(Name);
          project.set("title", Title);
          project.set("description", description);
          project.set("when", theDate);
          project.set("where", Where);
          project.set("contact", Name);
          project.set("moneyNeeded", Money);
          project.set("userId", userName);
          project.save(null, {
            success: function(project) {
              // Execute any logic that should take place after the object is saved.
              //alert('New object created with objectId: ' + project.id);
							$location.path('/campaign/' + project.id);
            },
            error: function(project, error) {
              // Execute any logic that should take place if the save fails.
              // error is a Parse.Error with an error code and message.
              console.log('Failed to create new object, with error code: ' + error.message);
            }

          });
        }
      }
    ]);

    angular.module('ioto').controller('campaignController', ['$scope', '$timeout', 'campaignId',
      function($scope, $timeout, campaignId) {
        console.log(campaignId);
        $scope.campaign = {

        };
        Parse.$ = jQuery;

        Parse.initialize("wpvbhNsxxZam6HYa63vmudxBgJrasHXLq7WTxkKH", "WhODpEkC35r18jewjzrpw22KJwxLZJxbGQQcyxST");
        var CampaignInfo = Parse.Object.extend("ProjectPage");
        var query = new Parse.Query(CampaignInfo);
        query.get(campaignId.id, {
          success: function(campaign) {
            $timeout(function() {
              $scope.campaign = {
                title: campaign.get("title"),
                description: campaign.get("description"),
                time: campaign.get("when"),
                place: campaign.get("where"),
                host: campaign.get("contact"),
                money: campaign.get("moneyNeeded"),
                tag: campaign.get("tag")
              }

            });
          },
          error: function(object, error) {
            console.log(object, error);
          }
        });

        console.log(SimplifyCommerce);
        SimplifyCommerce.hostedPayments(
            function(response) {
                // response handler
            },
            {
                color: "#12B830"
            }
        );

      }

    ]);

    angular.module('ioto').controller('campaignsController', ['$scope', '$timeout',
      function($scope, $timeout) {

        $scope.campaigns = [];
        Parse.$ = jQuery;

        Parse.initialize("wpvbhNsxxZam6HYa63vmudxBgJrasHXLq7WTxkKH", "WhODpEkC35r18jewjzrpw22KJwxLZJxbGQQcyxST");
        var CampaignInfo = Parse.Object.extend("ProjectPage");
        var query = new Parse.Query(CampaignInfo);
        query.find({
          success: function(campaigns) {
            $timeout(function() {
              $scope.campaigns = campaigns;

              console.log($scope.campaigns);

            });
          },
          error: function(object, error) {
            console.log(object, error);
          }
        });

      }
    ]);
