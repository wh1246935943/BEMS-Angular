//角色管理
angular.module('starter.controllers').controller('roleManagement',function ($scope,$uibModal,$log,rolesIn) {
    var initDete=function(){
        rolesIn.getAllRoles().then(function (response) {
                $scope.roleAll=response.data.result.data;
                console.log('角色',response.data.result.data);
            },function (response) {
                console.log('ERROR----getApplication=function ():',response);
            }
        )
    }
    initDete()
    //角色删除
    $scope.delete=function (idInfo) {
        swal({
                title: "确认删除？",
                text: "确认要删除角色!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "是",
                cancelButtonText: "否",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm){
                if (isConfirm) {
                    rolesIn.getDeleteRoles({
                        id:idInfo,
                        adminId:1
                    }).then(function () {
                        console.log(123)
                    })
                    setTimeout(initDete,5000);
                    swal("OK!", "删除成功.", "success");
                } else {
                    swal("ERROR", "删除失败", "error");
                }
            });
    }
    //角色编辑
    $scope.roleModal=function (size,parentSelector,$scope) {
        var parentElem=parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var HiItems=arguments[0];
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'roleModal-title',
            ariaDescribedBy: 'roleModal-body',
            templateUrl: 'roleModal.html',
            controller: 'addEditCtrl',
            backdrop:'static',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function () {
                    return HiItems;
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    //角色添加
    $scope.addRolesModal=function (size,parentSelector,$scope) {
        var parentElem=parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var HiItems=arguments[0];
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'addModal-title',
            ariaDescribedBy: 'addModal-body',
            templateUrl: 'roleModal.html',
            controller: 'addEditCtrl',
            backdrop:'static',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function () {
                    return HiItems;
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

});
