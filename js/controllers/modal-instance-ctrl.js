//模态框：检验单位审核--编辑
angular.module('starter.controllers').controller('ModalInstanceCtrl', function ($uibModalInstance, items,$scope,proInfoManage,company,equipmentInfo,declare,Upload) {
    // var $ctrl = this;
    // $ctrl.items = items;
    console.log(items,'-------------------');

    //显示工程列表
    proInfoManage.showProList().then(function (response) {
        $scope.ownedProject=response.data.result.data;
        console.log($scope.ownedProject);

    },function (response) {
        console.log('ERROR----proInfoManage.showProList():',response);

    });
    //获取所有公司
    company.getAllComp().then(function (response) {
        $scope.equipCompanyName=response.data.result.data;
        console.log(response.data.result.data);

    },function (response) {
        console.log('ERROR----company.getAllComp():',response);

    });
    // 获取所有的设备类型
    equipmentInfo.getAllEquip().then(function (response) {
        $scope.equipmentType=response.data.result.data;
        console.log(response,'ssssssss');

    },function (response) {
        console.log('ERROR----equipmentInfo.getAllEquip():',response);

    });
    $scope.equipName={selected:''};
    $scope.getNews=function(arr){
        $scope.arr=arr.applicationMaterials;
        console.log($scope.arr);

    }
    $scope.myFiles=[]
    $scope.upload = function (file) {
        Upload.upload({
            url: 'http://www.bigbug.tech:8080/device-api-dev/api/device-inspection/application-material/upload',
            data: file
        }).then(function (resp) {
            console.log(22222)
            console.log('Success ' + resp);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        });
    };
    //获取申报详情
    declare.getApplicationDetail(items).then(function (response) {
        console.log(response.data.result.data,'lllllllllll')
        $scope.info=response.data.result.data;
        $scope.recorderNumber=$scope.info.iprCode;
        $scope.deviceNumber=$scope.info.deviceCode;
        $scope.deviceName=$scope.info.deviceName;
        $scope.modelNumber=$scope.info.specification;
        $scope.brand=$scope.info.project;
        $scope.declarant=$scope.info.declarant;
        $scope.companyName=$scope.info.applicationCompany;
        $scope.equipName=$scope.info.deviceType;

    },function (response) {
        console.log('ERROR----declare.getApplicationDetail():',response);
    });


    //     $ctrl.selected = {
    //     item: $ctrl.items[0]
    // };
    $scope.submitMyForm= function () {
        // console.log($ctrl)
        console.log($scope.myFiles,'====');
        $scope.applyTextInfo={
            id:items,
            iprCode:$scope.recorderNumber,
            deviceCode:$scope.deviceNumber,
            deviceName:$scope.deviceName,
            specification:$scope.modelNumber,
            projectId:$scope.brand.id,
            declarant:$scope.declarant,
            applicationCompanyId:$scope.companyName.id,
            deviceTypeId:$scope.info.deviceType.id,
            adminId:1
        };
        console.log($scope.applyTextInfo);
        declare.eidtPending($scope.applyTextInfo);

        for(var i=0;i<$scope.myFiles.length;i++){
            var addInfo={
                applicationId:$scope.info.deviceType.id,
                applicationMaterialId:$scope.info.deviceType.applicationMaterials[i].id,
                materialFile:$scope.myFiles[i]
            };
            console.log(addInfo,'----picture');
            $scope.upload(addInfo);
        }
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };


});
