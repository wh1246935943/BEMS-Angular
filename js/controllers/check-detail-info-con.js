//模态框：现场检验--详情
angular.module('starter.controllers').controller('checkDetailInfoCon', function ($uibModalInstance, items,$scope,siteInspection) {
    //获取现场详情
    siteInspection.getSceneDetailAll(items).then(function (response) {
            $scope.recheckDetailInfo=response.data.result.data;
            $scope.recheckDetailInfoPic=response.data.result.data.application.materialFiles;
            console.log('报检',response.data.result.data);
            console.log($scope.recheckDetailInfoPic)
        },function (response) {
            console.log('ERROR----siteInspection.getSceneDetailAll():',response);
        }
    );
    $scope.ok = function () {
        $uibModalInstance.close();
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    siteInspection.getSceneDetaiPic(items).then(function (response) {
            $scope.recheckDetailPic=response.data.result.data;
            console.log($scope.recheckDetailPic);
        },function (response) {
            console.log('ERROR----siteInspection.recheckDetailPic():',response);
        }
    );
    //现场检验信息上传
    $scope.uPlocaleInfo = function () {
        siteInspection.sendSceneDetaiInfo({
            reportMaterialId: 1,
            executionId: items,
            materialFile: 1,
            position: 1
        }).then(function (sendInfoPar) {
            $scope.upSendInfoPar = sendInfoPar;
            console.log($scope.upSendInfoPar);
            $uibModalInstance.dismiss('cancel');
            ok()
        })
    }

});
