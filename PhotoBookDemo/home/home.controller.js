(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope','$http', '$scope'];
    function HomeController(UserService, $rootScope, $http, $scope) {

  

        //función para filtro random usado en ng-repeat
        $scope.random = function(){
            return 0.5 - Math.random();
        };  

        //función para obtener información de un json... no funciona
        $scope.obtener = function(){
            $http.get('fotos.json')
            .success(function(response) {$scope.user = response;})
                
        }

        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;

        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
            loadAllImages();
        }

        function loadAllImages(){
            $http.get('http://localhost:8080/FinalPPB/fotoService/getAll')
                .success(function(jsonObj){
                    $scope.fotosUser = jsonObj;
                });

        }

        function loadImagesUser(Id){
            $http.get('http://localhost:8080/FinalPPB/fotoService/getById/' + Id)
                .success(function(jsonObj){
                    $scope.fotoUser = jsonObj;
                });

        }

        function loadCurrentUser() {
            $http.get('http://localhost:8080/FinalPPB/login/getByAlias/' + $rootScope.globals.currentUser.username)
                .success(function (jsonObj) {
                   //vm.user.firstName=jsonObj.nombreRealUsuario;
                    $scope.response = jsonObj;
                    loadImagesUser(jsonObj.idUser);
                    loadAlbums(jsonObj.idUser);
                });

            

        }

        function cargarAlbumUsuario(idAlbum){
            $http.get('http://localhost:8080/FinalPPB/album/getByIdAlbum/' + idAlbum)
                .success(function (jsonObj){
                    $scope.fotosAlbum = jsonObj;
                });

        }    

        $scope.go = function loadSingleAlbum(idAlbum){
            $http.get('http://localhost:8080/FinalPPB/album/getAlbum/' + Id)
                .success(function(jsonObj){
                    $scope.loadSingleAlbum = jsonObj;
                    cargarAlbumUsuario(idAlbum);
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    $scope.todos = users.data;
                });
        }

        function loadAlbums(Id){
            $http.get('http://localhost:8080/FinalPPB/album/getById/' + Id)
                .success(function(jsonObj){
                    $scope.albums = jsonObj;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
    }
})();
