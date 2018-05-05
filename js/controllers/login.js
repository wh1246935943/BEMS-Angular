//登录页面
angular.module('starter.controllers').controller('login',function ($rootScope,$state,$scope,managers) {
    $rootScope.userInfo={name:'',password:''};
    $scope.jumpToTempPage=function () {
        managers.managerLogin({username:$rootScope.userInfo.name,password:$rootScope.userInfo.password})
            .then(function (response) {
                console.log(response);
                $rootScope.userInfo=response.data.result.data.id;
                console.log( $rootScope.userInfo)

            },function (response) {
                console.log(response)

            })
    }
});


