//模态框：检验单位审核--受理
angular.module('starter.controllers').controller('acceptCon', function ($uibModalInstance, items,accept,declare,$scope) {
    console.log(items)
    declare.getApplicationDetail(items).then(function (response) {
        $scope.info=response.data.result.data;
        $scope.recorderNumber=$scope.info.iprCode;
        $scope.deviceNumber=$scope.info.deviceCode;
        $scope.brand=$scope.info.project.name;
        $scope.declarant=$scope.info.declarant;
        $scope.companyName=$scope.info.applicationCompany.name;
    },function (response) {
        console.log('ERROR----declare.getPending():',response);

    });
    $scope.submitMyForm = function () {
        //受理
        accept.dispose({
            applicationId:items,
            result:1,
            adminId:1
        });
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
