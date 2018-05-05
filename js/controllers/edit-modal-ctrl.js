//模态框：管理员管理--编辑
angular.module('starter.controllers').controller('editModalCtrl', function ($uibModalInstance, items,$scope,managers) {
    console.log(items)
    $scope.roleList=items[0];
    $scope.ok = function () {
        var editInfo={
            id:items[1],
            password:$scope.managerPwd,
            phone:$scope.managerPhone,
            roleId:$scope.roleObj.id,
            adminId:1
        };
        managers.editManager(editInfo);
        $uibModalInstance.close();

    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
