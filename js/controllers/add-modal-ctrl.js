//模态框：管理员管理--添加
angular.module('starter.controllers').controller('addModalCtrl', function ($uibModalInstance,$scope,managers,items) {
    console.log(items)
    $scope.roleList=items;
    $scope.ok = function () {
        var addInfo={
            username:$scope.managerName,
            password:$scope.managerPwd,
            phone:$scope.managerPhone,
            roleId:$scope.roleObj.id,
            adminId:1
            // ,
            // permissionsId:(function () {
            //     var arr=[];
            //     $scope.roleObj.per.map(function (value) {
            //         arr.push(value.id)
            //     });
            //     return arr;
            // })()
        };
        managers.addManager(addInfo);
        $uibModalInstance.close();

    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
