//检验单位审核
angular.module('starter.controllers').controller('audits',function ($rootScope,$scope,declare,$uibModal, $log) {
    $scope.currentPage =1;//初始当前页
    $scope.maxSize = 100;//最多显示3页其他的用···代替
    $scope.itemsPerPage=2;
    //获取待受理的申报
    var initData=function (data) {
        declare.getApplication(data).then(function (response) {
            console.log('申报',response.data.result.data);
            $scope.auditTextInfo=response.data.result.data;
            $scope.totalItems =response.data.result.total;
        },function (response) {
            console.log('ERROR----declare.getApplication():',response);
        });
    };
    initData('&page='+$scope.currentPage);
    setTimeout(function () {
        return initData('&page='+$scope.currentPage);
    },5000);
    $scope.dates={date:''};
    // this.log=function (text1) {
    //     console.log("输出的内容为： " + text1.st+'--' + text1.en);
    //
    // };
    this.getsearchInfo = function(text1) {
        console.log("输出的内容为： " + text1.st+'--' + text1.en);
        console.log(text1.st.getFullYear()+"-"+(text1.st.getMonth()+1)+"-"+text1.st.getDate());
        console.log(text1.en.getFullYear()+"-"+(text1.en.getMonth()+1)+"-"+text1.en.getDate());
        var startDate=text1.st.getFullYear()+"-"+(text1.st.getMonth()+1)+"-"+text1.st.getDate();
        var endDate=text1.en.getFullYear()+"-"+(text1.en.getMonth()+1)+"-"+text1.en.getDate();
        // var startTime=Date.parse(text1.st)/1000;
        // console.log(startTime);
        setTimeout(function () {
            return initData('&key='+''+'&startDate='+startDate+'&endDate='+endDate);
        },5000);
        console.log("&key="+""+"&startDate="+startDate+"&endDate="+endDate);
    };

    $scope.pageChange=function () {
        console.log(22222)
        initData('&page='+$scope.currentPage);
    }
    $scope.openComponentModal = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var HiItems=arguments[0];
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'templates/modal_box/audit_page_modal/myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            backdrop:'static',
            appendTo: parentElem,
            resolve: {
                items: function () {
                    return HiItems;
                    // return $ctrl.items;
                }
            }
        });

        modalInstance.result.then(function () {
            setTimeout(function () {
                return initData('page='+$scope.currentPage);
            },5000);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    $scope.acceptIt = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var HiItems=arguments[0];
        var modalInstance = $uibModal.open({
            // animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'acceptIt-title',
            ariaDescribedBy: 'acceptIt-body',
            templateUrl: 'templates/modal_box/audit_page_modal/accept-it.html',
            controller: 'acceptCon',
            // controllerAs: '$ctrl',
            size: size,
            backdrop:'static',
            appendTo: parentElem,
            resolve: {
                items: function () {
                    return HiItems;
                }
            }
        });

        modalInstance.result.then(function () {
            setTimeout(function () {
                console.log($scope.currentPage )
                $scope.currentPage =1;
                return initData('page='+$scope.currentPage);
            },5000);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    $scope.detailInfo = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var HiItems=arguments[0];
        var modalInstance = $uibModal.open({
            // animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'detailInfo-title',
            ariaDescribedBy: 'detailInfo-body',
            templateUrl: 'templates/modal_box/audit_page_modal/detail-info.html',
            controller: 'detailInfoCon',
            // controllerAs: '$ctrl',
            size: size,
            backdrop:'static',
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
