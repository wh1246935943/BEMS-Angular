//安全检验合格证------详情模态框controller
angular.module('starter.controllers').controller('certificateParticularsModalCtrl',function (certificateParticularsModal,$scope,items,$uibModalInstance) {
    certificateParticularsModal.certificateParticularsInfo(items).then(function (certificateParticularsPar) {
        $scope.ParticularsTxt = certificateParticularsPar.data.result.data;
        console.log($scope.ParticularsTxt);
    });
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
