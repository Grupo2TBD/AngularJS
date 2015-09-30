(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);


    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', { controller: 'HomeController', templateUrl: 'home/home.view.html', controllerAs: 'vm'})
            .when('/login', { controller: 'LoginController', templateUrl: 'login/login.view.html', controllerAs: 'vm'})
            .when('/register', { controller: 'RegisterController', templateUrl: 'register/register.view.html', controllerAs: 'vm'})
            .when('/welcome', { controller: 'WelcomeController', templateUrl: 'welcome/welcome.view.html', controllerAs: 'vm'})
            .when('/step1', { controller: 'WelcomeController', templateUrl: 'welcome/welcome.view.html', controllerAs: 'vm'})
            .when('/step2', { controller: 'WelcomeController', templateUrl: 'welcome/welcome.view.html', controllerAs: 'vm'})
            .when('/step3', { controller: 'WelcomeController', templateUrl: 'welcome/welcome.view.html', controllerAs: 'vm'})
            .when('/step4', { controller: 'WelcomeController', templateUrl: 'welcome/welcome.view.html', controllerAs: 'vm'})
            .when('/step5', { controller: 'WelcomeController', templateUrl: 'welcome/welcome.view.html', controllerAs: 'vm'})
            .when('/profile', { controller: 'HomeController', templateUrl: 'profile.view.html', controllerAs: 'vm'})
            .when('/edit', { controller: 'HomeController', templateUrl: 'edit.view.html', controllerAs: 'vm'})
            .when('/upload', { controller: 'UploadController', templateUrl: 'upload/upload.view.html'})
            .when('/world', { templateUrl: 'world/world.view.html'})
            .when('/cameraRoll', { controller: 'HomeController', templateUrl: 'cameraRoll.view.html', controllerAs: 'vm'})
            .when('/albums', { controller: 'HomeController', templateUrl: 'album.view.html'})
            .when('/albumUser', { controller: 'HomeController', templateUrl: 'albumUser.view.html', controllerAs: 'hc'})
            .otherwise({ redirectTo: '/' });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

})();


