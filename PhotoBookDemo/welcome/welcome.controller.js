(function () {
    'use strict';

    angular
        .module('app')
        .controller('WelcomeController', WelcomeController);

    WelcomeController.$inject = ['UserService', '$rootScope'];

})();
