//管理员管理
angular.module('starter.controllers').controller("admin-management",function ($scope,$uibModal,$log,managers,rolesIn) {
    $scope.currentPage =1;//初始当前页
    $scope.maxSize = 100;//最多显示3页其他的用···代替
    $scope.itemsPerPage=6;
    //获取管理员列表
    var initData=function () {
        managers.getManagerList().then(function (response) {
            console.log('管理员列表',response.data.result.data);
            $scope.managerListInfo=response.data.result.data;
            $scope.totalItems=$scope.managerListInfo.length;
        },function (response) {
            console.log('ERROR----managers.getManagerList():',response);
        });
    };
    initData();
    //获取角色列表
    var getRoleList=function () {
        rolesIn.getAllRoles().then(function (response) {
            console.log('管理员角色列表',response.data.result.data);
            $scope.roleListInfo=response.data.result.data;
        },function (response) {
            console.log('ERROR----rolesIn.getAllRoles():',response);
        })
    };
    getRoleList();
    //管理员管理－－编辑
    $scope.editModal=function (size,parentSelector) {
        var parentElem=parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var idInfo=arguments[0];
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'editModal-title',
            ariaDescribedBy: 'editModal-body',
            templateUrl: 'templates/modal_box/admin_management_page_modal/edit-modal.html',
            controller: 'editModalCtrl',
            backdrop:'static',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function () {
                    return [$scope.roleListInfo,idInfo];
                }
            }
        });
        modalInstance.result.then(function () {
            setTimeout(initData,5000);

        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    //管理员管理－－添加
    $scope.addModal=function (size,parentSelector) {
        var parentElem=parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'editModal-title',
            ariaDescribedBy: 'editModal-body',
            templateUrl: 'templates/modal_box/admin_management_page_modal/add-modal.html',
            controller: 'addModalCtrl',
            backdrop:'static',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function () {
                    return $scope.roleListInfo;
                }
            }
        });
        modalInstance.result.then(function () {
            setTimeout(initData,5000);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    //管理员管理－－删除

    $scope.deleteManager=function (idInfo) {
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
                    managers.delManager({
                        id:idInfo,
                        adminId:1
                    })
                    setTimeout(initData,5000);
                    swal("OK!", "删除成功.", "success");
                } else {
                    swal("ERROR", "删除失败", "error");
                }
            });
    }
});
