//模态框：检验报告--填写报告
angular.module('starter.controllers').controller('reportTextModalCtrl', function ($uibModalInstance, items,accept,$scope,inspectionConclusion,Upload) {
    console.log(items);
    $scope.factoryDate={date:new Date()};
    $scope.nextInspectionDate={date:new Date()};
    $scope.auditDate={date:new Date()};
    $scope.authorizingDate={date:new Date()};
    $scope.issueDate={date:new Date()};
    $scope.upload = function (file) {
        Upload.upload({
            url: 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/conclusion/add',
            data: file
        }).then(function (resp) {
            console.log(22222)
            console.log('Success ' + resp);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        });
    };
    $scope.ok = function () {
        console.log($scope.factoryDate)
        //添加结论
        var addInfo={
            executionId:items,
            code:$scope.conclusionCode,
            deviceInstallAddress:$scope.deviceInstallAddress,
            factoryNumber:$scope.factoryNumber,
            installLicenseCode:$scope.installLicenseCode,
            factory:$scope.factory,
            manufacturingLicenseNumber:$scope.manufacturingLicenseNumber,
            //
            factoryDate:new Date($scope.factoryDate.date).getFullYear()+"-"+new Date($scope.factoryDate.date).getMonth()+"-"+new Date($scope.factoryDate.date).getDate(),
            serviceLife:$scope.serviceLife,
            mountingHeight:$scope.mountingHeight,
            maxSpecifiedWeight:$scope.maxSpecifiedWeight,
            maxLoadMoment:$scope.maxLoadMoment,
            liftingSpeed:$scope.liftingSpeed,
            maxRadius:$scope.maxRadius,
            installRadius:$scope.installRadius,
            derrickingSpeed:$scope.derrickingSpeed,
            gantryTravelingSpeed:$scope.gantryTravelingSpeed,
            attachChannelCount:$scope.attachChannelCount,
            inspectionStandard:$scope.inspectionStandard,
            mainInspectionInstrument:$scope.mainInspectionInstrument,
            inspectionConclusion:$scope.inspectionConclusion,
            remark:$scope.remark,
            //
            nextInspectionDate:new Date($scope.nextInspectionDate.date).getFullYear()+"-"+new Date($scope.nextInspectionDate.date).getMonth()+"-"+new Date($scope.nextInspectionDate.date).getDate(),
            auditOfficer:$scope.auditOfficer,
            //
            auditDate:new Date($scope.auditDate.date).getFullYear()+"-"+new Date($scope.auditDate.date).getMonth()+"-"+new Date($scope.auditDate.date).getDate(),
            authorizingOfficer:$scope.authorizingOfficer,
            //
            authorizingDate:new Date($scope.authorizingDate.date).getFullYear()+"-"+new Date($scope.authorizingDate.date).getMonth()+"-"+new Date($scope.authorizingDate.date).getDate(),
            inspectionUnitCertificate:$scope.inspectionUnitCertificate,
            //
            issueDate:new Date($scope.issueDate.date).getFullYear()+"-"+new Date($scope.issueDate.date).getMonth()+"-"+new Date($scope.issueDate.date).getDate(),
            inspectionReportConclusionPageFile:$scope.inspectionReportConclusionPageFilePath,
            inspectionReportCoverPageFile:$scope.inspectionReportCoverPageFilePath

        };
        $scope.upload(addInfo);
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
