//检验报告复检
angular.module('starter.controllers').controller('recheck',function ($scope,$uibModal,$log,checkoutRes) {
    $scope.currentPage =1;//初始当前页
    $scope.maxSize = 100;//最多显示3页其他的用···代替
    $scope.itemsPerPage=2;
    var initData=function () {
        checkoutRes.getRecheckList().then(function (response) {
            $scope.recheckList=response.data.result.data;
            $scope.totalItems =$scope.recheckList.length;
            console.log('复检报告',response.data.result.data);
        },function (response) {
            console.log('ERROR----checkoutRes.getRecheckList():',response);
        });
    };
    initData();

    //    检验报告复检——编辑弹框开始
    $scope.recheckCompile = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var idInfo=arguments[0];
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'recheck-title',
            ariaDescribedBy: 'recheck-body',
            templateUrl: 'myRecheckCompile.html',
            controller: 'recheckEditCtrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function () {
                    return idInfo;
                }
            }
        });

        modalInstance.result.then(function () {
            setTimeout(initData,5000);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    //    检验报告复检——添加复检报告弹框开始
    $scope.recheckAddReport = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var idInfo=arguments[0];
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'recheckAdd-title',
            ariaDescribedBy: 'recheckAdd-body',
            templateUrl: 'myRecheckAdd.html',
            controller: 'addRepCtrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function () {
                    return idInfo;
                }
            }
        });

        modalInstance.result.then(function () {
            setTimeout(initData,5000);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    //    检验报告复检——详情弹框开始
    $scope.recheckParticulars = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var idInfo=arguments[0];
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'recheckParticulars-title',
            ariaDescribedBy: 'recheckParticulars-body',
            templateUrl: 'myRecheckParticulars.html',
            controller: 'recheckDetailCtrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function () {
                    return idInfo;
                }
            }
        });

        modalInstance.result.then(function () {
            setTimeout(initData,5000);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

});
