//检验单位检验准备-------详情模态框controller
angular.module('starter.controllers').controller('trParticularCtrl', function (trParticular,$scope,items,$uibModalInstance) {
    trParticular.reportParticular(items).then(function (reportParticularInfo) {
        $scope.eiaInfo = reportParticularInfo.data.result.data;
        console.log($scope.eiaInfo)
    });
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
