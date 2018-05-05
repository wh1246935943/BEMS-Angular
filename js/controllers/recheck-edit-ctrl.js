//模态框：检验报告复检--编辑
angular.module('starter.controllers').controller('recheckEditCtrl', function ($uibModalInstance, items,$scope,checkoutRes,Upload) {
    console.log(items);
    checkoutRes.getRecheckDetaiAll(items).then(function (response) {
        $scope.recheckDetailInfo=response.data.result.data;
        console.log('复检详情',response.data.result.data);
        $scope.conclusionCode=$scope.recheckDetailInfo.conclusion.code;
        $scope.deviceInstallAddress=$scope.recheckDetailInfo.conclusion.deviceInstallAddress;
        $scope.factoryNumber=$scope.recheckDetailInfo.conclusion.factoryNumber;
        $scope.installLicenseCode=$scope.recheckDetailInfo.conclusion.installLicenseCode;
        $scope.factory=$scope.recheckDetailInfo.conclusion.factory;
        $scope.manufacturingLicenseNumber=$scope.recheckDetailInfo.conclusion.manufacturingLicenseNumber;
        //
        $scope.factoryDate={date:$scope.recheckDetailInfo.conclusion.factoryDate};
        $scope.serviceLife=$scope.recheckDetailInfo.conclusion.serviceLife;
        $scope.mountingHeight=$scope.recheckDetailInfo.conclusion.mountingHeight;
        $scope.maxSpecifiedWeight=$scope.recheckDetailInfo.conclusion.maxSpecifiedWeight;
        $scope.maxLoadMoment=$scope.recheckDetailInfo.conclusion.maxLoadMoment;
        $scope.liftingSpeed=$scope.recheckDetailInfo.conclusion.liftingSpeed;
        $scope.maxRadius=$scope.recheckDetailInfo.conclusion.maxRadius;
        $scope.installRadius=$scope.recheckDetailInfo.conclusion.installRadius;
        $scope.derrickingSpeed=$scope.recheckDetailInfo.conclusion.derrickingSpeed;
        $scope.gantryTravelingSpeed=$scope.recheckDetailInfo.conclusion.gantryTravelingSpeed;
        $scope.attachChannelCount=$scope.recheckDetailInfo.conclusion.attachChannelCount;
        $scope.inspectionStandard=$scope.recheckDetailInfo.conclusion.inspectionStandard;
        $scope.mainInspectionInstrument=$scope.recheckDetailInfo.conclusion.mainInspectionInstrument;
        $scope.inspectionConclusion=$scope.recheckDetailInfo.conclusion.inspectionConclusion;
        $scope.remark=$scope.recheckDetailInfo.conclusion.remark;
        //
        $scope.nextInspectionDate={date:$scope.recheckDetailInfo.conclusion.nextInspectionDate};
        $scope.auditOfficer=$scope.recheckDetailInfo.conclusion.auditOfficer;
        //
        $scope.auditDate={date:$scope.recheckDetailInfo.conclusion.auditDate};
        $scope.authorizingOfficer=$scope.recheckDetailInfo.conclusion.authorizingOfficer;
        //
        $scope.authorizingDate={date:$scope.recheckDetailInfo.conclusion.authorizingDate};
        $scope.inspectionUnitCertificate=$scope.recheckDetailInfo.conclusion.inspectionUnitCertificate;
        //
        $scope.issueDate={date:$scope.recheckDetailInfo.conclusion.issueDate};
        $scope.inspectionReportCoverPageFilePath=$scope.recheckDetailInfo.conclusion.inspectionReportCoverPageFilePath;
        $scope.inspectionReportConclusionPageFilePath=$scope.recheckDetailInfo.conclusion.inspectionReportConclusionPageFilePath;

    },function (response) {
        console.log('ERROR----checkoutRes.getRecheckDetailList():',response);
    });
    // upload on file select or drop
    $scope.upload = function (file) {
        Upload.upload({
            url: 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/conclusion/update',
            data: file
        }).then(function (resp) {
            console.log(22222)
            console.log('Success ' + resp);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        });
    };

    $scope.ok = function () {
        console.log($scope.factoryDate.date)
        var updateInfo={
            id:items,
            code:$scope.recheckDetailInfo.conclusion.code,
            deviceInstallAddress:$scope.recheckDetailInfo.conclusion.deviceInstallAddress,
            factoryNumber:$scope.recheckDetailInfo.conclusion.factoryNumber,
            installLicenseCode:$scope.recheckDetailInfo.conclusion.installLicenseCode,
            factory:$scope.recheckDetailInfo.conclusion.factory,
            manufacturingLicenseNumber:$scope.recheckDetailInfo.conclusion.manufacturingLicenseNumber,
            //
            factoryDate:new Date($scope.factoryDate.date).getFullYear()+"-"+new Date($scope.factoryDate.date).getMonth()+"-"+new Date($scope.factoryDate.date).getDate(),
            serviceLife:$scope.recheckDetailInfo.conclusion.serviceLife,
            mountingHeight:$scope.recheckDetailInfo.conclusion.mountingHeight,
            maxSpecifiedWeight:$scope.recheckDetailInfo.conclusion.maxSpecifiedWeight,
            maxLoadMoment:$scope.recheckDetailInfo.conclusion.maxLoadMoment,
            liftingSpeed:$scope.recheckDetailInfo.conclusion.liftingSpeed,
            maxRadius:$scope.recheckDetailInfo.conclusion.maxRadius,
            installRadius:$scope.recheckDetailInfo.conclusion.installRadius,
            derrickingSpeed:$scope.recheckDetailInfo.conclusion.derrickingSpeed,
            gantryTravelingSpeed:$scope.recheckDetailInfo.conclusion.gantryTravelingSpeed,
            attachChannelCount:$scope.recheckDetailInfo.conclusion.attachChannelCount,
            inspectionStandard:$scope.recheckDetailInfo.conclusion.inspectionStandard,
            mainInspectionInstrument:$scope.recheckDetailInfo.conclusion.mainInspectionInstrument,
            inspectionConclusion:$scope.recheckDetailInfo.conclusion.inspectionConclusion,
            remark:$scope.recheckDetailInfo.conclusion.remark,
            //
            nextInspectionDate:new Date($scope.nextInspectionDate.date).getFullYear()+"-"+new Date($scope.nextInspectionDate.date).getMonth()+"-"+new Date($scope.nextInspectionDate.date).getDate(),
            auditOfficer:$scope.recheckDetailInfo.conclusion.auditOfficer,
            //
            auditDate:new Date($scope.auditDate.date).getFullYear()+"-"+new Date($scope.auditDate.date).getMonth()+"-"+new Date($scope.auditDate.date).getDate(),
            authorizingOfficer:$scope.recheckDetailInfo.conclusion.authorizingOfficer,
            //
            // authorizingDate:$scope.recheckDetailInfo.conclusion.authorizingDate,
            authorizingDate:new Date($scope.authorizingDate.date).getFullYear()+"-"+new Date($scope.authorizingDate.date).getMonth()+"-"+new Date($scope.authorizingDate.date).getDate(),
            inspectionUnitCertificate:$scope.recheckDetailInfo.conclusion.inspectionUnitCertificate,
            //
            issueDate:new Date($scope.issueDate.date).getFullYear()+"-"+new Date($scope.issueDate.date).getMonth()+"-"+new Date($scope.issueDate.date).getDate(),
            inspectionReportCoverPageFilePath:$scope.recheckDetailInfo.conclusion.inspectionReportCoverPageFilePath,
            inspectionReportConclusionPageFilePath:$scope.recheckDetailInfo.conclusion.inspectionReportConclusionPageFilePath

        }
        $scope.upload(updateInfo);
        $uibModalInstance.close();

    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
