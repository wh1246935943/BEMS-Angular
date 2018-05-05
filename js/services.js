angular.module('myServices',[])
    //受理
    .factory('accept',function ($http,$q) {
        return{
            //处理 POST
            dispose:function (data) {
                var dataGet=$q.defer();
                $http({
                    method:"POST",
                    data:data,
                    url:"http://bigbug.tech:8080/device-api-dev/api/device-inspection/accept/process",
                    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function(obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function (response) {
                    dataGet.resolve(response);
                    console.log(response)
                }, function (response) {
                    dataGet.reject(response);
                    console.log('ERROR:受理--处理', response)

                });
                return dataGet.promise;
            },
            //------检验单位检验准备开始 GET------
            getToBeAssigned:function () {
                var dataGet = $q.defer();
                $http({
                    method:"GET",
                    url:"http://bigbug.tech:8080/device-api-dev/api/device-inspection/accept/wait-assign?page=1&count=3"
                }).then(function (exaPrepare) {
                    dataGet.resolve(exaPrepare);
                    console.log(exaPrepare)
                }, function (exaPrepare) {
                    dataGet.reject(exaPrepare);
                    console.log('Error:检验单位复检准备',exaPrepare)
                });
                return dataGet.promise;

            }
            //------检验单位检验准备结束------
        }
    })

    //工程信息管理
    .factory('proInfoManage',function ($http,$q) {
        return{
            //显示工程列表 GET
            showProList:function () {
                var dataGet=$q.defer();
                $http({
                    method:"GET",
                    url:"http://bigbug.tech:8080/device-api-dev/api/project/show?page=1&count=10&adminId=1",
                }).then(function (response) {
                    dataGet.resolve(response);
                    console.log(response)
                }, function (response) {
                    dataGet.reject(response);
                    console.log('ERROR:工程信息管理--显示工程列表', response)

                });
                return dataGet.promise;

            }
        }
    })
    //执行
    .factory('execution',function ($http,$q) {
        return{
            //获取待结论的执行 GET
            getPList:function () {
                var dataGet=$q.defer();
                $http({
                    method:"GET",
                    url:"http://bigbug.tech:8080/device-api-dev/api/device-inspection/execution/wait-conclude?page=1&count=20",
                }).then(function (response) {
                    dataGet.resolve(response);
                    console.log(response)
                }, function (response) {
                    dataGet.reject(response);
                    console.log('ERROR:执行--获取待结论的执行', response)

                });
                return dataGet.promise;

            },
            //获取执行详情所有内容 GET
            getDetailAll:function (data) {
                var dataGet=$q.defer();
                $http({
                    method:"GET",
                    url:"http://bigbug.tech:8080/device-api-dev/api/device-inspection/execution/detail-all?id="+data,
                }).then(function (response) {
                    dataGet.resolve(response);
                    console.log(response)
                }, function (response) {
                    dataGet.reject(response);
                    console.log('ERROR:执行--获取执行详情所有内容', response)

                });
                return dataGet.promise;

            }
        }
    })
    //报检结论
    .factory('inspectionConclusion',function ($http,$q) {
        return {
            //添加结论 POST
            addConclusion:function (data) {
                var dataGet=$q.defer();
                $http({
                    method:'POST',
                    data:data,
                    url:"http://bigbug.tech:8080/device-api-dev/api/device-inspection/conclusion/add",
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function (response) {
                    dataGet.resolve(response);
                    console.log(response);
                },function (response) {
                    dataGet.reject(response);
                    console.log('ERROR:报检结论--添加结论', response);
                });
                return dataGet.promise;
            }
        }
    })
    //现场检验
    .factory('siteInspection',function ($http,$q) {
        return{
            //获取现场检验列表 GET
            getCheckList:function () {
                var dataGet=$q.defer();
                $http({
                    method:"GET",
                    url:"http://bigbug.tech:8080/device-api-dev/api/device-inspection/execution/all?page=1&count=10&status=1&adminId=1",
                }).then(function (response) {
                    dataGet.resolve(response);
                    console.log(response)
                },function (response) {
                    dataGet.reject(response);
                    console.log('ERROR:现场检验--获取现场检验列表',response)

                });
                return dataGet.promise;

            },
            // 获取现场模态框 GET
            getSceneDetailAll:function (data) {
                var dataGet=$q.defer();
                $http({
                    method: "GET",
                    url: "http://bigbug.tech:8080/device-api-dev/api/device-inspection/execution/detail-all?id=" + data
                }).then(function (response) {
                    dataGet.resolve(response);
                    console.log(response)
                }, function (response) {
                    dataGet.reject(response);
                    console.log('ERROR:模态框--获取现场模态框', response)

                });
                return dataGet.promise;
            },
            //获取现场模态框需要的图片
            getSceneDetaiPic:function (data) {
                var dataGet=$q.defer();
                $http({
                    method: "GET",
                    url: "http://bigbug.tech:8080/device-api-dev/api/device-inspection/report-material/detail?executionId=" + data
                }).then(function (response) {
                    dataGet.resolve(response);
                    console.log(response)
                }, function (response) {
                    dataGet.reject(response);
                    console.log('ERROR:模态框--获取现场模态框材料中检验所需图片', response)

                });
                return dataGet.promise;
            },
            //现场检验报告材料上传
            sendSceneDetaiInfo:function (data) {
                var dataSend = $q.defer();
                $http({
                    method:'POST',
                    data:data,
                    url:'http://bigbug.tech:8080/device-api-dev/api/device-inspection/report-material/upload',
                    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function(obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function (response) {
                    dataSend.resolve(response);
                    console.log(response)
                }, function (response) {
                    dataSend.reject(response);
                    console.log('ERROR:现场检验报告信息上传',response)

                });
                return dataSend.promise;
            }
        }

    })
    //检验报告
    .factory('inspectionReport',function ($http,$q) {
        return{
            //获取检验报告详情 GET
            getReportList:function (data) {
                var dataGet=$q.defer();
                $http({
                    type:"GET",
                    url:"http://bigbug.tech:8080/device-api-dev/api/device-inspection/execution/detail?id="+data,
                }).then(function (response) {
                    dataGet.resolve(response);
                    console.log(response)
                },function (response) {
                    dataGet.reject(response);
                    console.log('ERROR:检验报告--获取检验报告详情',response)

                });
                return dataGet.promise;
            }
        }
    })
    //公司
    .factory('company',function ($http,$q) {
        return{
            //获取所有公司 GET
            getAllComp:function () {
                var dataGet=$q.defer();
                $http({
                    method: "GET",
                    url: "http://bigbug.tech:8080/device-api-dev/api/company/show?page=1&count=20&companyType=1"
                }).then(function (response) {
                    dataGet.resolve(response);
                    console.log(response)
                }, function (response) {
                    dataGet.reject(response);
                    console.log('ERROR:公司--获取所有公司',response)

                });
                return dataGet.promise;

            }

        }
    })
    //报检结论复检
    .factory('checkoutRes',function ($http,$q) {
        return {
            //获取复检列表 GET
            getRecheckList:function () {
                var dataGet=$q.defer();
                $http({
                    method:'GET',
                    url:"http://bigbug.tech:8080/device-api-dev/api/device-inspection/recheck-conclusion/show"
                }).then(function (response) {
                    dataGet.resolve(response);
                },function (response) {
                    dataGet.reject(response);
                    console.log('ERROR:报检结论复检--获取复检列表', response)
                });
                return dataGet.promise;
            },
            //获取复检结论详情 GET
            getRecheckDetailList:function (data) {
                var dataGet=$q.defer();
                $http({
                    method:'GET',
                    url:"http://bigbug.tech:8080/device-api-dev/api/device-inspection/recheck-conclusion/detail?id="+data
                }).then(function (response) {
                    dataGet.resolve(response);
                },function (response) {
                    dataGet.reject(response);
                    console.log('ERROR:报检结论复检--获取复检结论详情', response)
                });
                return dataGet.promise;
            },
            //获取复检结论详情及所有信息　GET
            getRecheckDetaiAll:function (data) {
                var dataGet=$q.defer();
                $http({
                    method:'GET',
                    url:"http://bigbug.tech:8080/device-api-dev/api/device-inspection/recheck-conclusion/detail-all?id="+data
                }).then(function (response) {
                    dataGet.resolve(response);
                },function (response) {
                    dataGet.reject(response);
                    console.log('ERROR:报检结论复检--获取复检结论详情及所有信息', response)
                });
                return dataGet.promise;
            },
            //添加复检 POST
            addCheck:function (data) {
                var dataGet=$q.defer();
                $http({
                    method: "POST",
                    data: data,
                    url: "http://bigbug.tech:8080/device-api-dev/api/device-inspection/recheck-conclusion/add",
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function (response) {
                    dataGet.resolve(response);
                    console.log(response)
                }, function (response) {
                    dataGet.reject(response);
                    console.log('ERROR:报检结论复检--添加复检', response)

                });
                return dataGet.promise;
            }
        }
    })
    //申报
    .factory('declare',function ($http,$q) {
        return{
            //设备报检申请 POST
            deviceAppAdd:function (textInfo) {
                var dataGet=$q.defer();
                $http({
                    method: "POST",
                    data: textInfo,
                    url: "http://bigbug.tech:8080/device-api-dev/api/device-inspection/application/add",
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function (response) {
                    dataGet.resolve(response);
                    console.log(response)
                }, function (response) {
                    dataGet.reject(response);
                    console.log('ERROR:申报--设备报检申请', response)

                });
                return dataGet.promise;

            },
            //获取待受理的申报 GET
            getApplication:function (data) {
                var dataGet=$q.defer();
                $http({
                    method: "GET",
                    url: "http://bigbug.tech:8080/device-api-dev/api/device-inspection/application/wait-accept?count=2&"+data,
                }).then(function (response) {
                    dataGet.resolve(response);
                    console.log(response)
                }, function (response) {
                    dataGet.reject(response);
                    console.log('ERROR:申报--获取待受理的申报', response)

                });
                return dataGet.promise;

            },
            //获取申报详情 GET
            getApplicationDetail:function (data) {
                var dataGet=$q.defer();
                $http({
                    method: "GET",
                    url: "http://bigbug.tech:8080/device-api-dev/api/device-inspection/application/detail?id=" + data
                }).then(function (response) {
                    dataGet.resolve(response);
                    console.log(response)
                }, function (response) {
                    dataGet.reject(response);
                    console.log('ERROR:申报--获取申报详情', response)

                });
                return dataGet.promise;

            },
            //获取申报详情all GET
            getApplicationAll:function (data) {
                var dataGet=$q.defer();
                $http({
                    method: "GET",
                    url: "http://bigbug.tech:8080/device-api-dev/api/device-inspection/application/detail-all?id=" + data
                }).then(function (response) {
                    dataGet.resolve(response);
                    console.log(response)
                }, function (response) {
                    dataGet.reject(response);
                    console.log('ERROR:申报--获取申报详情all', response)

                });
                return dataGet.promise;

            },
            //获取待已受理的申报 GET
            getPending:function (data) {
                var dataGet=$q.defer();
                $http({
                    method: "GET",
                    url: "http://bigbug.tech:8080/device-api-dev/api/device-inspection/application/accepted?page=1&count=20&adminId=1"
                }).then(function (response) {
                    dataGet.resolve(response);
                    console.log(response)
                }, function (response) {
                    dataGet.reject(response);
                    console.log('ERROR:申报--获取待已受理的申报', response)

                });
                return dataGet.promise;

            },
            //修改待受理申报信息 POST
            eidtPending:function (data) {
                var dataGet=$q.defer();
                $http({
                    method:"POST",
                    data:data,
                    url:"http://bigbug.tech:8080/device-api-dev/api/device-inspection/application/update",
                    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function(obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function (response) {
                    dataGet.resolve(response);
                    console.log(response)
                }, function (response) {
                    dataGet.reject(response);
                    console.log('ERROR:申报--修改待受理申报信息', response)

                });
                return dataGet.promise;

            }

        }
    })

    //管理员
    .factory('managers',function ($http,$q,$state) {
        return {
            //管理员登录 POST
            managerLogin: function (loginObj) {
                var dataGet = $q.defer();
                $http({
                    method: "POST",
                    data: loginObj,
                    url: "http://bigbug.tech:8080/device-api-dev/api/admin/auth",
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function (response) {
                    dataGet.resolve(response);
                    if(response.data.success){
                        $state.go('temp.apply-info');

                    }
                    console.log(response)
                }, function (response) {
                    dataGet.reject(response);
                    // $state.go('temp.apply-info');
                    console.log('ERROR:管理员--管理员登录', response)

                })
                return dataGet.promise;

            },
            //获取管理员列表 GET
            getManagerList:function () {
                var dataGet=$q.defer();
                $http({
                    method:"GET",
                    url:"http://bigbug.tech:8080/device-api-dev/api/admin/show?page=1&count=10&adminId=1",
                }).then(function (response) {
                    dataGet.resolve(response);
                    console.log(response)
                },function (response) {
                    dataGet.reject(response);
                    console.log('ERROR:管理员--获取管理员列表',response)

                });
                return dataGet.promise;

            },
            //添加系统管理员 POST
            addManager:function (data) {
                var dataGet=$q.defer();
                $http({
                    method:"POST",
                    data:data,
                    url:"http://bigbug.tech:8080/device-api-dev/api/admin/add",
                    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function(obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function (response) {
                    dataGet.resolve(response);
                    console.log(response)
                }, function (response) {
                    dataGet.reject(response);
                    console.log('ERROR:管理员--添加系统管理员', response)

                });
                return dataGet.promise;

            },
            //修改管理员信息 POST
            editManager:function (data) {
                var dataGet=$q.defer();
                $http({
                    method:"POST",
                    data:data,
                    url:"http://bigbug.tech:8080/device-api-dev/api/admin/update",
                    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function(obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function (response) {
                    dataGet.resolve(response);
                    console.log(response)
                },function (response) {
                    dataGet.reject(response);
                    console.log('ERROR:管理员--修改系统管理员',response)

                });
                return dataGet.promise;

            },
            //删除管理员 POST
            delManager:function (data) {
                var dataGet=$q.defer();
                $http({
                    method:"POST",
                    data:data,
                    url:"http://bigbug.tech:8080/device-api-dev/api/admin/remove",
                    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function(obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function (response) {
                    dataGet.resolve(response);
                    console.log(response)
                },function (response) {
                    dataGet.reject(response);
                    console.log('ERROR:管理员--删除管理员',response)

                });
                return dataGet.promise;

            }

        }
    })

    //角色
    .factory('rolesIn',function ($http,$q,$state) {
        return{
            //获取所有角色 GET
            getAllRoles:function () {
                var dataGet=$q.defer();
                $http({
                    method: "GET",
                    url: "http://bigbug.tech:8080/device-api-dev/api/role/all?adminId=1"
                }).then(function (response) {
                    dataGet.resolve(response);
                    console.log(response)
                }, function (response) {
                    dataGet.reject(response);
                    console.log('ERROR:角色--获取所有角色',response)

                });
                return dataGet.promise;

            },
           //角色list
            getRolesList:function (data) {
                var dataGet=$q.defer();
                $http({
                    method: "GET",
                    data:data,
                    url: "http://bigbug.tech:8080/device-api-dev/api/permission/all?adminId=1",
                }).then(function (response) {
                    dataGet.resolve(response);
                    console.log(response)
                }, function (response) {
                    dataGet.reject(response);
                    console.log('ERROR:角色--角色列表',response)

                });
                return dataGet.promise;

            },
            //更新角色
            getRushRoles:function (data) {
                var dataGet=$q.defer();
                $http({
                    method: "POST",
                    data:data,
                    url: "http://bigbug.tech:8080/device-api-dev/api/role/update",
                    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function(obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function (response) {
                    dataGet.resolve(response);
                    console.log(response)
                }, function (response) {
                    dataGet.reject(response);
                    console.log('ERROR:角色--更新角色',response)

                });
                return dataGet.promise;

            },
            //添加角色
            getAddRoles:function (data) {
                var dataGet=$q.defer();
                $http({
                    method: "POST",
                    data:data,
                    url: "http://bigbug.tech:8080/device-api-dev/api/role/add",
                    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function(obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function (response) {
                    dataGet.resolve(response);
                    console.log(response)
                }, function (response) {
                    dataGet.reject(response);
                    console.log('ERROR:角色--添加角色',response)

                });
                return dataGet.promise;

            },

            //删除角色
            getDeleteRoles:function (data) {
                var dataGet=$q.defer();
                $http({
                    method: "POST",
                    data:data,
                    url: "http://bigbug.tech:8080/device-api-dev/api/role/remove",
                    headers:{'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function(obj) {
                        var str = [];
                        for (var s in obj) {
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                        }
                        return str.join("&");
                    }
                }).then(function (response) {
                    dataGet.resolve(response);
                    console.log(response)
                }, function (response) {
                    dataGet.reject(response);
                    console.log('ERROR:角色--删除角色',response)

                });
                return dataGet.promise;

            }
        }
    })

    //设备类型
    .factory('equipmentInfo',function ($http,$q) {
        return{
            //获取所有的设备类型 GET
            getAllEquip:function () {
                var dataGet=$q.defer();
                $http({
                    method: "GET",
                    url: "http://bigbug.tech:8080/device-api-dev/api/device-inspection/device-type/show"
                }).then(function (response) {
                    dataGet.resolve(response);
                    console.log(response)
                }, function (response) {
                    dataGet.reject(response);
                    console.log('ERROR:设备类型--获取所有的设备类型',response)

                });
                return dataGet.promise;

            }

        }
    })

    //检验单位检验准备-----检验人员指派数据回填开始
    .factory('trMdAssign',function ($http,$q) {
        return{
            ipAssign:function (data) {
                var dataGet = $q.defer();
                $http({
                    method:'GET',
                    url:'http://bigbug.tech:8080/device-api-dev/api/device-inspection/accept/detail?id='+data
                }).then(function (personnelAssign) {
                    dataGet.resolve(personnelAssign);
                    console.log(personnelAssign)
                },function (personnelAssign) {
                    dataGet.reject(personnelAssign);
                    console.log('Error:人员指派',personnelAssign)
                });
                return dataGet.promise
            }
        }
    })
    //检验单位检验准备-----检验人员指派数据回填结束




    //检验单位检验准备-----检验人员指派开始
    .factory('sendInfoFty',function ($http,$q) {
        return{
            sendInfo:function (data) {
                var dataPost = $q.defer();
                $http({
                    method:'POST',
                    url:'http://bigbug.tech:8080/device-api-dev/api/device-inspection/accept/assign',
                    data:data,
                    headers:{'Content-Type':'application/x-www-form-urlencoded'},
                    transformRequest:function (obj) {
                        var str = [];
                        for(var s in obj){
                            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]))
                        }
                        return str.join("&");
                    }
                }).then(function (sendInfoPar) {
                    dataPost.resolve(sendInfoPar);
                    console.log(sendInfoPar)
                },function (sendInfoPar) {
                    dataPost.reject(sendInfoPar);
                    console.log('Error:指派',sendInfoPar)
                });
                return dataPost.promise
            }
        }
    })

    //检验单位检验准备-----检验人员指派结束

    //检验单位检验准备-----报告详情开始
    .factory('trParticular',function ($http,$q) {
        return{
            reportParticular:function (data) {
                var dataGet = $q.defer();
                $http({
                    method:'GET',
                    url:'http://bigbug.tech:8080/device-api-dev/api/device-inspection/accept/detail-all?id='+data
                }).then(function (reportParticularInfo) {
                    dataGet.resolve(reportParticularInfo);
                    console.log(reportParticularInfo)
                },function (reportParticularInfo) {
                    dataGet.reject(reportParticularInfo);
                    console.log('Error:申报详情',reportParticularInfo)
                });
                return dataGet.promise;
            }
        }
    })
    //检验单位检验准备-----报告详情结束


    //安全检验合格证----开始
    .factory('certificate',function ($http,$q) {
        return{
            certificateInfo:function (data) {
                var dataGet = $q.defer();
                $http({
                    method:'GET',
                    url:'http://www.bigbug.tech:8080/device-api-dev/api/device-inspection/recheck-conclusion/show?&count=2&adminId=1&'+data
                }).then(function (certificatePar) {
                    dataGet.resolve(certificatePar);
                    console.log(certificatePar)
                },function (certificatePar) {
                    dataGet.reject(certificatePar);
                    console.log('Error:安全检验合格证页面数据：',certificatePar)
                });
                return dataGet.promise;
            }
        }
    })
    //安全检验合格证----结束

    //安全检验合格证------打印模态框开始
    .factory('certificatePrintModal',function ($http,$q) {
        return{
            certificatePrintInfo:function (data) {
                var dataGet = $q.defer();
                $http({
                    method:'GET',
                    url:'http://www.bigbug.tech:8080/device-api-dev/api/device-inspection/recheck-conclusion/detail-all?id=6&adminId=1'+data
                }).then(function (certificatePrintPar) {
                    dataGet.resolve(certificatePrintPar);
                    console.log(certificatePrintPar)
                },function (certificatePrintPar) {
                    dataGet.reject(certificatePrintPar);
                    console.log('Error:安全检验合格证打印模态框：',certificatePrintPar)
                });
                return dataGet.promise;
            }
        }
    })
    //安全检验合格证------打印模态框结束

    //安全检验合格证------详情模态框开始
    .factory('certificateParticularsModal',function ($http,$q) {
        return{
            certificateParticularsInfo:function (data) {
                var dataGet = $q.defer();
                $http({
                    method:'GET',
                    url:'http://www.bigbug.tech:8080/device-api-dev/api/device-inspection/recheck-conclusion/detail-all?id=6&adminId=1'+data
                }).then(function (certificateParticularsPar) {
                    dataGet.resolve(certificateParticularsPar);
                    console.log(certificateParticularsPar);
                },function (certificateParticularsPar) {
                    dataGet.reject(certificateParticularsPar);
                    console.log('Error:安全检验合格证详情模态框：',certificateParticularsPar)
                });
                return dataGet.promise;
            }
        }
    })
    //安全检验合格证------详情模态框结束


    //检验单位检验准备------获取人员指派模态框检验人员开始
    .factory('AllCheckoutPersonnel',function ($http,$q) {
        return{
            GetAllCheckoutPersonnel:function () {
                var dataGet = $q.defer();
                $http({
                    method:'GET',
                    url:'http://bigbug.tech:8080/device-api-dev/api/user/show?page=1&count=20&jobType=1'
                }).then(function (CheckoutPersonnel) {
                    dataGet.resolve(CheckoutPersonnel);
                    console.log(CheckoutPersonnel)
                },function (CheckoutPersonnel) {
                    dataGet.reject(CheckoutPersonnel);
                    console.log('Error:获取人员指派模态框检验人员：',CheckoutPersonnel)
                });
                return dataGet.promise
            }
        }
    })
    //检验单位检验准备------获取人员指派模态框检验人员结束




    //获取管理员列表function
    .factory('getInfo',function ($q,rolesIn) {
        var dataInfo={
            data:{},
            cb:function(){}
        }
        rolesIn.getAllRoles().then(function (response) {
            dataInfo.data=response;
            dataInfo.cb();
        },function (response) {
            dataInfo=response;
        });
        return dataInfo
    })






