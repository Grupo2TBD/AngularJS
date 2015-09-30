﻿(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService', 'AuthenticationService','$http'];
    function RegisterController(UserService, $location, $rootScope, FlashService, AuthenticationService, $http) {
        var vm = this;

        vm.register = register;


        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function register() {
      //     vm.dataLoading = true;
 /*          var $ = jQuery.noConflict();
           var usuario = {
                    aliasUser: vm.user.username,
                    passUser: vm.user.password,
                    nombreRealUser: vm.user.firstName,
                    apellidoUser: vm.user.lastName,
                    sexoUser: vm.user.gender,
                    fechaCumpleanosUser: vm.user.date,
                    emailUser: vm.user.email
                };

            var json = JSON.stringify(usuario); 

            $.ajax( {
                cache: false,
                crossDomain: true,
                dataType: "json",
                url: "http://localhost:8080/PPB/registro/create",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: json,
                success: function( jsonObj ) {
                    if(jsonObj.message){
                        AuthenticationService.SetCredentials(vm.username, vm.password);
                        $location.path('/welcome');
                    }else{

                    }
                }
            } );

*/

            var usuario = {
                aliasUser: vm.user.username,
                passUser: vm.user.password,
                nombreRealUser: vm.user.firstName,
                apellidoUser: vm.user.lastName,
                sexoUser: vm.user.gender,
                fechaCumpleanosUser: vm.user.date,
                emailUser: vm.user.email
            };

            var json = JSON.stringify(usuario); 
            vm.dataLoading = true;
            $http.post("http://localhost:8080/FinalPPB/registro/create",json)
                .success(function (response) {
                    if (response.message) {
                        //FlashService.Success('Registration successful', true); 
                        AuthenticationService.SetCredentials(vm.username, vm.password);
                        $location.path('/welcome');
                    } else {
                        FlashService.Error(response.message);
                        vm.dataLoading = false;

                    }
                });

        }
    }

})();
