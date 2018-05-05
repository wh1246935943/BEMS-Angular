angular.module('starter.controllers', ['myServices']);



angular.module('starter.controllers').controller('DatepickerPopupDemoCtrl', function ($scope) {
    $scope.today = function() {
        $scope.dt = new Date();
        $scope.dt1 = new Date();

    };
    $scope.today();

    $scope.clear = function() {
        $scope.dt = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function() {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
        {
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'partially'
        }
    ];

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }

    function searchFor() {
        console.log($scope.dt)
    }
});
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

//模态框：角色管理--添加
angular.module('starter.controllers').controller('addEditCtrl', function ($uibModalInstance,$scope,rolesIn,items) {
    console.log(items)
    //权限列表
    rolesIn.getRolesList().then(function (response) {
            $scope.rushAdd=response.data.result.data;
            console.log('编辑',response.data.result.data);
        },function (response) {
            console.log('ERROR----getRolesList=function ():',response);
        }
    );
    $scope.roleList=items;
    $scope.ok = function () {
        var idCon=[];
        $scope.rushAdd.map(function (value) {
            console.log(value.id);
            if(value.createTime){
                idCon.push(value.id);
            }

        });
        var addInfo= {
            name: $scope.userName,
            permissionsId: idCon,
            adminId: 1
        }
        console.log($scope.ppp,'----')
        //添加角色
        rolesIn.getAddRoles(addInfo).then(function (response) {
                console.log(response)
            },function (response) {
                console.log('ERROR----getAddRoles=function ():',response);
            }
        );
        $uibModalInstance.close();

    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

//模态框：管理员管理--添加
angular.module('starter.controllers').controller('addModalCtrl', function ($uibModalInstance,$scope,managers,items) {
    console.log(items)
    $scope.roleList=items;
    $scope.ok = function () {
        var addInfo={
            username:$scope.managerName,
            password:$scope.managerPwd,
            phone:$scope.managerPhone,
            roleId:$scope.roleObj.id,
            adminId:1
            // ,
            // permissionsId:(function () {
            //     var arr=[];
            //     $scope.roleObj.per.map(function (value) {
            //         arr.push(value.id)
            //     });
            //     return arr;
            // })()
        };
        managers.addManager(addInfo);
        $uibModalInstance.close();

    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

//模态框：检验报告复检--添加复检报告
angular.module('starter.controllers').controller('addRepCtrl', function ($uibModalInstance, items,$scope,Upload) {
    console.log(items)
    $scope.roleList=items[0];
    $scope.recheckDate={date:new Date()};
    $scope.issueDate={date:new Date()};
    $scope.nextIssueDate={date:new Date()};
    $scope.maintenanceDate={date:new Date()};
    $scope.upload = function (file) {
        Upload.upload({
            url: 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/recheck-conclusion/add',
            data: file
        }).then(function (resp) {
            console.log(22222)
            console.log('Success ' + resp);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        });
    };
    $scope.ok = function () {
        var addInfo={
            conclusionId:$scope.conclusionId,
            code:$scope.usingUnit,
            installAddress:$scope.installAddress,
            recheckDate:new Date($scope.recheckDate.date).getFullYear()+"-"+new Date($scope.recheckDate.date).getMonth()+"-"+new Date($scope.recheckDate.date).getDate(),
            recheckConclusion:$scope.recheckConclusion,
            inspectionUnitCertificateCode:$scope.inspectionUnitCertificateCode,
            issueDate:new Date($scope.issueDate.date).getFullYear()+"-"+new Date($scope.issueDate.date).getMonth()+"-"+new Date($scope.issueDate.date).getDate(),
            nextIssueDate:new Date($scope.nextIssueDate.date).getFullYear()+"-"+new Date($scope.nextIssueDate.date).getMonth()+"-"+new Date($scope.nextIssueDate.date).getDate(),
            remark:$scope.remark,
            firstInspectionDisqualifiedReason:$scope.firstInspectionDisqualifiedReason,
            recheckResult:$scope.recheckResult,
            maintenanceStaff:$scope.maintenanceStaff,
            maintenanceDate:new Date($scope.maintenanceDate.date).getFullYear()+"-"+new Date($scope.maintenanceDate.date).getMonth()+"-"+new Date($scope.maintenanceDate.date).getDate(),
            recheckReportConclusionPageFile:$scope.recheckReportConclusionPageFile,
            usingUnit:items
        };
        console.log(addInfo)
        $scope.upload(addInfo);
        $uibModalInstance.close();

    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

//管理员管理
angular.module('starter.controllers').controller("admin-management",function ($scope,$uibModal,$log,managers,rolesIn) {
    $scope.currentPage =1;//初始当前页
    $scope.maxSize = 100;//最多显示3页其他的用···代替
    $scope.itemsPerPage=6;
    //获取管理员列表
    var initData=function () {
        managers.getManagerList().then(function (response) {
            console.log('管理员列表',response.data.result.data);
            $scope.managerListInfo=response.data.result.data;
            $scope.totalItems=$scope.managerListInfo.length;
        },function (response) {
            console.log('ERROR----managers.getManagerList():',response);
        });
    };
    initData();
    //获取角色列表
    var getRoleList=function () {
        rolesIn.getAllRoles().then(function (response) {
            console.log('管理员角色列表',response.data.result.data);
            $scope.roleListInfo=response.data.result.data;
        },function (response) {
            console.log('ERROR----rolesIn.getAllRoles():',response);
        })
    };
    getRoleList();
    //管理员管理－－编辑
    $scope.editModal=function (size,parentSelector) {
        var parentElem=parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var idInfo=arguments[0];
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'editModal-title',
            ariaDescribedBy: 'editModal-body',
            templateUrl: 'templates/modal_box/admin_management_page_modal/edit-modal.html',
            controller: 'editModalCtrl',
            backdrop:'static',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function () {
                    return [$scope.roleListInfo,idInfo];
                }
            }
        });
        modalInstance.result.then(function () {
            setTimeout(initData,5000);

        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    //管理员管理－－添加
    $scope.addModal=function (size,parentSelector) {
        var parentElem=parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'editModal-title',
            ariaDescribedBy: 'editModal-body',
            templateUrl: 'templates/modal_box/admin_management_page_modal/add-modal.html',
            controller: 'addModalCtrl',
            backdrop:'static',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function () {
                    return $scope.roleListInfo;
                }
            }
        });
        modalInstance.result.then(function () {
            setTimeout(initData,5000);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    //管理员管理－－删除

    $scope.deleteManager=function (idInfo) {
        swal({
                title: "确认删除？",
                text: "确认要删除角色!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "是",
                cancelButtonText: "否",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm){
                if (isConfirm) {
                    managers.delManager({
                        id:idInfo,
                        adminId:1
                    })
                    setTimeout(initData,5000);
                    swal("OK!", "删除成功.", "success");
                } else {
                    swal("ERROR", "删除失败", "error");
                }
            });
    }
});

//设备报检申请
angular.module('starter.controllers').controller('applyInfo',function ($rootScope,$scope,$state,proInfoManage,company,equipmentInfo,declare,Upload) {
    //显示工程列表

    proInfoManage.showProList().then(function (response) {
        $scope.ownedProject=response.data.result.data;
        // console.log($scope.ownedProject);

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
        console.log(response);

    },function (response) {
        console.log('ERROR----equipmentInfo.getAllEquip():',response);

    });
    $scope.equipName={selected:''};
    $scope.getNews=function(arr){
        $scope.arr=arr.applicationMaterials;
        console.log($scope.arr);

    }
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
    $scope.submitMyForm=function () {
        $scope.applyTextInfo={
            iprCode:$scope.recorderNumber,
            deviceCode:$scope.deviceNumber,
            deviceName:$scope.deviceName,
            specification:$scope.modelNumber,
            projectId:$scope.brand,
            declarant:$scope.declarant,
            applicationCompanyId:$scope.companyName,
            deviceTypeId:$scope.equipName.selected.id,
            adminId:1
        };
        console.log($scope.arr)
        declare.deviceAppAdd($scope.applyTextInfo);
        for(var i=0;i<$scope.arr.length;i++){
            var addInfo={
                applicationId:$scope.equipName.selected.id,
                applicationMaterialId:$scope.arr[i].id,
                materialFile:$scope.arr[i].file
            };
            console.log(addInfo,'----picture')
            $scope.upload(addInfo);
        }

        //跳转检验单位审核页面
        $state.go('temp.audit');
    }




});

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

//安全检验合格证
angular.module('starter.controllers').controller('certificateCtrl',function (certificate,$scope,$uibModal,$log) {
    $scope.currentPage =1;//初始当前页
    $scope.maxSize = 100;//最多显示3页其他的用···代替
    $scope.itemsPerPage=2;

    var initData=function (data) {
        certificate.certificateInfo(data).then(function (certificatePar) {
            $scope.certificateArray = certificatePar.data.result.data;
            $scope.totalItems =certificatePar.data.result.total;

            console.log($scope.certificateArray)
            console.log($scope.totalItems)
        });
    };
    initData('&page='+$scope.currentPage);
    setTimeout(function () {
        return initData('&page='+$scope.currentPage);
    },5000);
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
    //安全检验合格证——打印弹框开始
    $scope.certificatePrint = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var certificatePrintVar = arguments[0];
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'CertificatePrint-title',
            ariaDescribedBy: 'CertificatePrint-body',
            templateUrl: 'myCertificatePrint.html',
            controller: 'certificatePrintModalCtrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function () {
                    return certificatePrintVar;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    //检验报告复检——打印弹框结束

    //    安全检验合格证——详情弹框开始
    $scope.certificateParticulars = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var certificateParticularsVar = arguments[0];
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'CertificateParticulars-title',
            ariaDescribedBy: 'CertificateParticulars-body',
            templateUrl: 'myCertificateParticulars.html',
            controller: 'certificateParticularsModalCtrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function () {
                    return certificateParticularsVar;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    //    检验报告复检——详情弹框结束
});

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

//安全检验合格证------打印模态框controller
angular.module('starter.controllers').controller('certificatePrintModalCtrl', function (certificatePrintModal,$scope,items,$uibModalInstance) {
    certificatePrintModal.certificatePrintInfo(items).then(function (certificatePrintPar) {
        $scope.printPic = certificatePrintPar.data.result.data.application.project;
        console.log($scope.printPic);
        console.log(items);
    });
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.print = function () {
        var newwindow = window.open("","aaaaaa");
        bdhtml=window.document.body.innerHTML;
        sprnstr="<!--startprint-->";
        eprnstr="<!--endprint-->";
        prnhtml=bdhtml.substr(bdhtml.indexOf(sprnstr)+17);
        prnhtml=prnhtml.substring(0,prnhtml.indexOf(eprnstr));
        newwindow.document.body.innerHTML=prnhtml;
        newwindow.window.print();

    };

});
    
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

//模态框：检验单位审核--详情
angular.module('starter.controllers').controller('detailInfoCon', function ($uibModalInstance, items,$scope,declare) {
    // var $ctrl = this;
    // $ctrl.items = items;
    console.log(items);

    //获取申报详情
    declare.getApplicationDetail(items).then(function (response) {
        console.log(response.data.result.data,'lllllllllll')
        $scope.info=response.data.result.data;
        $scope.recorderNumber=$scope.info.iprCode;
        $scope.deviceNumber=$scope.info.deviceCode;
        $scope.deviceName=$scope.info.deviceName;
        $scope.modelNumber=$scope.info.specification;
        $scope.brand=$scope.info.project.name;
        $scope.declarant=$scope.info.declarant;
        $scope.companyName=$scope.info.applicationCompany.name;
        $scope.equipName=$scope.info.deviceType.name;

    },function (response) {
        console.log('ERROR----declare.getApplicationDetail():',response);
    });
    // $ctrl.selected = {
    //     item: $ctrl.items[0]
    // };

    // $ctrl.ok = function () {
    //     // console.log($ctrl)
    //     $uibModalInstance.close($ctrl.selected.item);
    // };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

//模态框：管理员管理--编辑
angular.module('starter.controllers').controller('editModalCtrl', function ($uibModalInstance, items,$scope,managers) {
    console.log(items)
    $scope.roleList=items[0];
    $scope.ok = function () {
        var editInfo={
            id:items[1],
            password:$scope.managerPwd,
            phone:$scope.managerPhone,
            roleId:$scope.roleObj.id,
            adminId:1
        };
        managers.editManager(editInfo);
        $uibModalInstance.close();

    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

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

//登录页面
angular.module('starter.controllers').controller('login',function ($rootScope,$state,$scope,managers) {
    $rootScope.userInfo={name:'',password:''};
    $scope.jumpToTempPage=function () {
        managers.managerLogin({username:$rootScope.userInfo.name,password:$rootScope.userInfo.password})
            .then(function (response) {
                console.log(response);
                $rootScope.userInfo=response.data.result.data.id;
                console.log( $rootScope.userInfo)

            },function (response) {
                console.log(response)

            })
    }
});



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

//模态框：检验报告复检--详情
angular.module('starter.controllers').controller('recheckDetailCtrl', function ($uibModalInstance, items,$scope,checkoutRes) {
    console.log(items)
    checkoutRes.getRecheckDetaiAll(items).then(function (response) {
        $scope.recheckDetailInfo=response.data.result.data;
        console.log('复检详情',response.data.result.data);
    },function (response) {
        console.log('ERROR----checkoutRes.getRecheckDetailList():',response);
    });
    //TabsDemoCtrl－－START
    $scope.tabs = [
        { title:'Dynamic Title 1', content:'Dynamic content 1' },
        { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
    ];

    $scope.alertMe = function() {
        setTimeout(function() {
            $window.alert('You\'ve selected the alert tab!');
        });
    };

    $scope.model = {
        name: 'Tabs'
    };
    //TabsDemoCtrl－－END

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

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

//检验报告复检
angular.module('starter.controllers').controller('recheck',function ($scope,$uibModal,$log,checkoutRes) {
    $scope.currentPage =1;//初始当前页
    $scope.maxSize = 100;//最多显示3页其他的用···代替
    $scope.itemsPerPage=2;
    var initData=function () {
        checkoutRes.getRecheckList().then(function (response) {
            $scope.recheckList=response.data.result.data;
            $scope.totalItems =$scope.recheckList.length;
            console.log('复检报告',response.data.result.data);
        },function (response) {
            console.log('ERROR----checkoutRes.getRecheckList():',response);
        });
    };
    initData();

    //    检验报告复检——编辑弹框开始
    $scope.recheckCompile = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var idInfo=arguments[0];
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'recheck-title',
            ariaDescribedBy: 'recheck-body',
            templateUrl: 'myRecheckCompile.html',
            controller: 'recheckEditCtrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function () {
                    return idInfo;
                }
            }
        });

        modalInstance.result.then(function () {
            setTimeout(initData,5000);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    //    检验报告复检——添加复检报告弹框开始
    $scope.recheckAddReport = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var idInfo=arguments[0];
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'recheckAdd-title',
            ariaDescribedBy: 'recheckAdd-body',
            templateUrl: 'myRecheckAdd.html',
            controller: 'addRepCtrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function () {
                    return idInfo;
                }
            }
        });

        modalInstance.result.then(function () {
            setTimeout(initData,5000);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    //    检验报告复检——详情弹框开始
    $scope.recheckParticulars = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var idInfo=arguments[0];
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'recheckParticulars-title',
            ariaDescribedBy: 'recheckParticulars-body',
            templateUrl: 'myRecheckParticulars.html',
            controller: 'recheckDetailCtrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function () {
                    return idInfo;
                }
            }
        });

        modalInstance.result.then(function () {
            setTimeout(initData,5000);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

});

//模态框：检验报告--编辑
angular.module('starter.controllers').controller('reportModalCtrl', function ($uibModalInstance, items,accept,inspectionReport,$scope,Upload) {
    console.log(items);
    $scope.fileCon=[];
    inspectionReport.getReportList(items).then(function (response) {
        $scope.info=response.data.result.data;
        for(var i=0;i<$scope.info.reportMaterialFiles.length;i++){
            $scope.fileCon.push([]);
            for(var value in $scope.info.reportMaterialFiles[i]){
                if(value!="name" && $scope.info.reportMaterialFiles[i][value]){
                    $scope.fileCon[i].push({
                        url:$scope.info.reportMaterialFiles[i][value]
                    })
                }
            }
        }
        console.log($scope.fileCon)
    },function (response) {
        console.log('ERROR----declare.getPending():',response);

    });
    // upload on file select or drop
    $scope.upload = function (files) {
        Upload.upload({
            url: 'http://bigbug.tech:8080/device-api-dev/api/device-inspection/report-material/upload',
            data: files
        }).then(function (resp) {
            console.log('Success ' + resp);
        }, function (resp) {
            console.log('Error Upload: ' + resp.status);
        });
    };
    $scope.ok = function () {
        console.log($scope.fileCon,'3333');
        //编辑提交
        for(var j=0;j<$scope.fileCon.length;j++){
            for(var i=0;i<$scope.fileCon[j].length;i++){
                if($scope.fileCon[j][i].url.name){
                    console.log($scope.fileCon[j][i].url,'........');
                    var updateInfo={
                        executionId:items,
                        reportMaterialId:j+1,
                        materialFile:$scope.fileCon[j][i].url,
                        position:i+1
                    };
                    console.log($scope.fileCon[j][i].url,'===');
                    $scope.upload(updateInfo);
                    $uibModalInstance.close();
                }

            }
        }

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

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

//模态框：检验报告--详情
angular.module('starter.controllers').controller('reportTextTwoModalCtrl', function ($uibModalInstance, items,accept,siteInspection,$scope) {
    console.log(items)
    siteInspection.getSceneDetailAll(items).then(function (response) {
            $scope.recheckDetailInfo=response.data.result.data;
            console.log('报检',response.data.result.data);
        },function (response) {
            console.log('ERROR----siteInspection.getSceneDetailAll():',response);
        }
    );
    $scope.ok = function () {
        // console.log($ctrl)
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

//模态框：角色管理--编辑
angular.module('starter.controllers').controller('roleEditCtrl', function ($uibModalInstance,$scope,rolesIn,items) {
    console.log(items)
    rolesIn.getRolesList().then(function (response) {
            $scope.rushAdd=response.data.result.data;
            console.log('编辑',response.data.result.data);
        },function (response) {
            console.log('ERROR----getRolesList=function ():',response);
        }
    );

    $scope.roleList=items;
    $scope.ok = function () {
        console.log($scope.rushAdd);
        var idCon=[];
        $scope.rushAdd.map(function (value) {
            console.log(value.id);
            if(value.createTime){
                idCon.push(value.id);
            }
        });

        console.log(idCon);
        var data={
            name:items.name,
            permissionsId:idCon,
            id:items.id,
            adminId:1
        };
        console.log(data.permissionsld)

        rolesIn.getRushRoles(data).then(function (response) {
                $scope.rushAdd=response.data.result.data;
                console.log('更新',response.data.result.data);
            },function (response) {
                console.log('ERROR----getRushRoles=function ():',response);
            }
        );
        $uibModalInstance.close();

    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

//角色管理
angular.module('starter.controllers').controller('roleManagement',function ($scope,$uibModal,$log,rolesIn) {
    var initDete=function(){
        rolesIn.getAllRoles().then(function (response) {
                $scope.roleAll=response.data.result.data;
                console.log('角色',response.data.result.data);
            },function (response) {
                console.log('ERROR----getApplication=function ():',response);
            }
        )
    }
    initDete()
    //角色删除
    $scope.delete=function (idInfo) {
        swal({
                title: "确认删除？",
                text: "确认要删除角色!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "是",
                cancelButtonText: "否",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm){
                if (isConfirm) {
                    rolesIn.getDeleteRoles({
                        id:idInfo,
                        adminId:1
                    }).then(function () {
                        console.log(123)
                    })
                    setTimeout(initDete,5000);
                    swal("OK!", "删除成功.", "success");
                } else {
                    swal("ERROR", "删除失败", "error");
                }
            });
    }
    //角色编辑
    $scope.roleModal=function (size,parentSelector,$scope) {
        var parentElem=parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var HiItems=arguments[0];
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'roleModal-title',
            ariaDescribedBy: 'roleModal-body',
            templateUrl: 'roleModal.html',
            controller: 'addEditCtrl',
            backdrop:'static',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function () {
                    return HiItems;
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    //角色添加
    $scope.addRolesModal=function (size,parentSelector,$scope) {
        var parentElem=parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var HiItems=arguments[0];
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'addModal-title',
            ariaDescribedBy: 'addModal-body',
            templateUrl: 'roleModal.html',
            controller: 'addEditCtrl',
            backdrop:'static',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function () {
                    return HiItems;
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

});

//模板页面
angular.module('starter.controllers').controller('tempCon',function ($scope) {
    // $scope.brandList=[];
    $.getScript('lib/jquery-1.11.1.min.js');
    $.getScript('lib/simplify/simplify.js');

});
//检验单位检验准备
angular.module('starter.controllers').controller('test-ready',function ($scope,accept,$uibModal,$log,$rootScope) {
    // $scope.currentPage =1;//初始当前页
    // $scope.maxSize = 100;//最多显示3页其他的用···代替
    // $scope.itemsPerPage=2;
    // //获取列表数组
    // var initData=function (data) {
    //     accept.getToBeAssigned(data).then(function (exaPrepare) {
    //         console.log('申报',exaPrepare.data.result.data);
    //         $scope.AssignedTextInfo=exaPrepare.data.result.data;
    //         $scope.totalItems =$scope.AssignedTextInfo.length;
    //         console.log($scope.totalItems)
    //     },function (exaPrepare) {
    //         console.log('ERROR----accept.getToBeAssigned():',exaPrepare);
    //     });
    // };
    // initData('&');
    // setTimeout(function () {
    //     return initData('&');
    // },50);
    //页面数据填充

    $rootScope.tRreacquire = function () {
        return accept.getToBeAssigned().then(function (exaPrepare) {
            $scope.testReadyArray = exaPrepare.data.result.data;
        });
    };
    $rootScope.tRreacquire();

    //检验单位检验准备--------模态框人员指派
    $scope.openTestReadyDesignate = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalId=arguments[0];
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'testReady-title',
            ariaDescribedBy: 'testReady-body',
            templateUrl: 'myTestReady.html',
            controller: 'trMdAssignCtrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function () {
                    return modalId;
                }
            }
        });
        modalInstance.result.then(function () {
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    //检验单位检验准备--------模态框详情功能开始
    $scope.openTestReadyParticular = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var particularsVar=arguments[0];
        console.log(particularsVar);
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'testReadyParticular-title',
            ariaDescribedBy: 'testReadyParticular-body',
            templateUrl: 'myTestReadyParticular.html',
            controller: 'trParticularCtrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function () {
                    return particularsVar;
                }
            }
        });
        modalInstance.result.then(function () {
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

});

//检验单位检验准备-------人员指派模态框controller
angular.module('starter.controllers').controller('trMdAssignCtrl', function (AllCheckoutPersonnel,trMdAssign,sendInfoFty,$scope,items,$uibModalInstance,$rootScope) {
    trMdAssign.ipAssign(items).then(function (personnelAssign) {
        $scope.accNumber = personnelAssign.data.result.data;
        console.log($scope.accNumber)
    });
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    AllCheckoutPersonnel.GetAllCheckoutPersonnel().then(function (CheckoutPersonnel) {
        $scope.Personnel = CheckoutPersonnel.data.result.data;
        console.log($scope.Personnel)
    });

    $scope.doAccept = function () {
        sendInfoFty.sendInfo({
            acceptId:items,
            inspectorId:$scope.Personnel.q.id,
            adminId:1
        }).then(function (sendInfoPar) {
            $scope.ssss = sendInfoPar;
            console.log($scope.ssss);
            $uibModalInstance.dismiss('cancel');
            $rootScope.tRreacquire();
        });
        console.log($scope.Personnel.q.id)
    };


});

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
