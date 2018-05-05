//检验报告
angular.module('starter.controllers').controller('inspection-report',function ($scope,execution,$uibModal,$log) {
    var initData=function () {
        execution.getPList()
            .then(function (response) {
                $scope.recheckList=response.data.result.data;
                console.log('报告',response.data.result.data);
            },function (response) {
                console.log('ERROR----inspectionReport=function ():',response);
            });
    };
    initData()

    $scope.reportModal=function (size,parentSelector) {
        var parentElem=parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var HiItems=arguments[0];
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'reportModal-title',
            ariaDescribedBy: 'reportModal-body',
            templateUrl: 'reportModal.html',
            controller: 'reportModalCtrl',
            backdrop:'static',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function () {
                    return HiItems;
                }
            }
        });
        modalInstance.result.then(function () {
            setTimeout(initData,5000);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.reportTextModal=function (size,parentSelector) {
        var parentElem=parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var HiItems=arguments[0];
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'reportTextModal-title',
            ariaDescribedBy: 'reportTextModal-body',
            templateUrl: 'reportTextModal.html',
            controller: 'reportTextModalCtrl',
            backdrop:'static',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function () {
                    return HiItems;
                }
            }
        });
        modalInstance.result.then(function () {
            setTimeout(initData,5000);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.reportTextTwoModal=function (size,parentSelector) {
        var parentElem=parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var HiItems=arguments[0];
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'reportTextTwoModal-title',
            ariaDescribedBy: 'reportTextTwoModal-body',
            templateUrl: 'reportTextTwoModal.html',
            controller: 'reportTextTwoModalCtrl',
            backdrop:'static',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function () {
                    return HiItems;
                }
            }
        });
        modalInstance.result.then(function () {
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

});
