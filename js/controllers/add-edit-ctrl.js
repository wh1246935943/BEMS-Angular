//模态框：角色管理--添加
angular.module('starter.controllers').controller('addEditCtrl', function ($uibModalInstance,$scope,rolesIn,items) {
    console.log(items)
    //权限列表
    rolesIn.getRolesList().then(function (response) {
            $scope.rushAdd=response.data.result.data;
            console.log('编辑',response.data.result.data);
        },function (response) {
            console.log('ERROR----getRolesList=function ():',response);
        }
    );
    $scope.roleList=items;
    $scope.ok = function () {
        var idCon=[];
        $scope.rushAdd.map(function (value) {
            console.log(value.id);
            if(value.createTime){
                idCon.push(value.id);
            }

        });
        var addInfo= {
            name: $scope.userName,
            permissionsId: idCon,
            adminId: 1
        }
        console.log($scope.ppp,'----')
        //添加角色
        rolesIn.getAddRoles(addInfo).then(function (response) {
                console.log(response)
            },function (response) {
                console.log('ERROR----getAddRoles=function ():',response);
            }
        );
        $uibModalInstance.close();

    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
