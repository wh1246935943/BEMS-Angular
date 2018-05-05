//检验单位检验准备
angular.module('starter.controllers').controller('test-ready',function ($scope,accept,$uibModal,$log,$rootScope) {
    // $scope.currentPage =1;//初始当前页
    // $scope.maxSize = 100;//最多显示3页其他的用···代替
    // $scope.itemsPerPage=2;
    // //获取列表数组
    // var initData=function (data) {
    //     accept.getToBeAssigned(data).then(function (exaPrepare) {
    //         console.log('申报',exaPrepare.data.result.data);
    //         $scope.AssignedTextInfo=exaPrepare.data.result.data;
    //         $scope.totalItems =$scope.AssignedTextInfo.length;
    //         console.log($scope.totalItems)
    //     },function (exaPrepare) {
    //         console.log('ERROR----accept.getToBeAssigned():',exaPrepare);
    //     });
    // };
    // initData('&');
    // setTimeout(function () {
    //     return initData('&');
    // },50);
    //页面数据填充

    $rootScope.tRreacquire = function () {
        return accept.getToBeAssigned().then(function (exaPrepare) {
            $scope.testReadyArray = exaPrepare.data.result.data;
        });
    };
    $rootScope.tRreacquire();

    //检验单位检验准备--------模态框人员指派
    $scope.openTestReadyDesignate = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalId=arguments[0];
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'testReady-title',
            ariaDescribedBy: 'testReady-body',
            templateUrl: 'myTestReady.html',
            controller: 'trMdAssignCtrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function () {
                    return modalId;
                }
            }
        });
        modalInstance.result.then(function () {
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    //检验单位检验准备--------模态框详情功能开始
    $scope.openTestReadyParticular = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var particularsVar=arguments[0];
        console.log(particularsVar);
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'testReadyParticular-title',
            ariaDescribedBy: 'testReadyParticular-body',
            templateUrl: 'myTestReadyParticular.html',
            controller: 'trParticularCtrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function () {
                    return particularsVar;
                }
            }
        });
        modalInstance.result.then(function () {
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

});
