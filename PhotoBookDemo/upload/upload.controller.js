(function () {
    'use strict';

    angular
        .module('app')
        .controller('UploadController', UploadController);

    HomeController.$inject = ['UserService', '$rootScope','$http', '$scope','upload'];    

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#foto').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#imgInp").change(function(){
        readURL(this);
    });

})();

