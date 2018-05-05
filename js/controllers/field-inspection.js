//现场检验
angular.module('starter.controllers').controller('field-inspection',function ($scope,siteInspection,declare,$uibModal, $log) {
    var fieldInspection=function () {
        siteInspection.getCheckList()
            .then(function (response) {
                $scope.fieldINfo=response.data.result.data;
                console.log('现场',response.data.result.data);
            },function (response) {
                console.log('ERROR----fieldInspection=function ():',response);
            });
    };
    fieldInspection();


    //现场检测--编辑
    $scope.fieldModal=function (size,parentSelector) {
        var parentElem=parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var HiItems=arguments[0];
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'fieldModal-title',
            ariaDescribedBy: 'fieldModal-body',
            templateUrl: 'fieldModal.html',
            controller: 'checkDetailInfoCon',
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
    //现场检验--详情
    $scope.fieldTextModal=function (size,parentSelector) {
        var parentElem=parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var HiItems=arguments[0];
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'fieldTextModal-title',
            ariaDescribedBy: 'fieldTextModal-body',
            templateUrl: 'fieldTextModal.html',
            controller: 'checkDetailInfoCon',
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
