//模态框：角色管理--编辑
angular.module('starter.controllers').controller('roleEditCtrl', function ($uibModalInstance,$scope,rolesIn,items) {
    console.log(items)
    rolesIn.getRolesList().then(function (response) {
            $scope.rushAdd=response.data.result.data;
            console.log('编辑',response.data.result.data);
        },function (response) {
            console.log('ERROR----getRolesList=function ():',response);
        }
    );

    $scope.roleList=items;
    $scope.ok = function () {
        console.log($scope.rushAdd);
        var idCon=[];
        $scope.rushAdd.map(function (value) {
            console.log(value.id);
            if(value.createTime){
                idCon.push(value.id);
            }
        });

        console.log(idCon);
        var data={
            name:items.name,
            permissionsId:idCon,
            id:items.id,
            adminId:1
        };
        console.log(data.permissionsld)

        rolesIn.getRushRoles(data).then(function (response) {
                $scope.rushAdd=response.data.result.data;
                console.log('更新',response.data.result.data);
            },function (response) {
                console.log('ERROR----getRushRoles=function ():',response);
            }
        );
        $uibModalInstance.close();

    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
