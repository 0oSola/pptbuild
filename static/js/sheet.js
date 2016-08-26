// JavaScript Document
(function(){
	
	var data1 = [];
	var data2 = [];
	
	//状态值 
	//是否上传数据文件
	var uploadDataSign = 0;
	//是否上传模板文件
	var updatePPTSign = 0;
	var ppt_id = "0";
	
	
	//test数据
	var dataList = [
		["sheet1","sheet2"],
		[
			['', '张三', '李四', '王五'],
			['年龄', 10, 11, 12, 13],
			['收入', 20, 11, 14, 13],
			['身高', 30, 15, 12, 13]
		],
		[
			['', 'test', 'test2', 'test3', 'test4','test5', 'test6', 'test7', 'test8', 'test', 'test2', 'test3', 'test4','test5', 'test6', 'test7', 'test8','test','test', 'test2', 'test3', 'test4','test5', 'test6', 'test7', 'test8','test', 'test2', 'test3', 'test4','test5', 'test6', 'test7', 'test8','test', 'test2', 'test3', 'test4','test5', 'test6', 'test7', 'test8', 'test2', 'test3', 'test4','test5', 'test6', 'test7', 'test1234',],
			['test', 10, 11, 12, 13,10, 11, 12, 13, 10, 11, 12, 13,10, 11, 12, 13, 10, 11, 12, 13,10, 11, 12, 13,20, 11, 14, 13,10, 11, 12, 13,20, 11, 14, 13,10, 11, 12, 13,20, 11, 14, 13,10, 11, 12, 13],
			['test1', 20, 11, 14, 13,10, 11, 12, 13],
			['test2', 10, 11, 12, 13,10, 11, 12, 13],
			['test3', 20, 11, 14, 13,10, 11, 12, 13],
			['test1', 20, 11, 14, 13,10, 11, 12, 13],
			['test2', 10, 11, 12, 13,10, 11, 12, 13],
			['test3', 20, 11, 14, 13,10, 11, 12, 13],
			['test1', 20, 11, 14, 13,10, 11, 12, 13],
			['test2', 10, 11, 12, 13,10, 11, 12, 13],
			['test3', 20, 11, 14, 13,10, 11, 12, 13],
			['test1', 20, 11, 14, 13,10, 11, 12, 13],
			['test2', 10, 11, 12, 13,10, 11, 12, 13],
			['test3', 20, 11, 14, 13,10, 11, 12, 13],
			['test3', 20, 11, 14, 13,10, 11, 12, 13],
			['test1', 20, 11, 14, 13,10, 11, 12, 13],
			['test2', 10, 11, 12, 13,10, 11, 12, 13],
			['test3', 20, 11, 14, 13,10, 11, 12, 13],
			['test1', 20, 11, 14, 13,10, 11, 12, 13],
			['test2', 10, 11, 12, 13,10, 11, 12, 13],
			['test3', 20, 11, 14, 13,10, 11, 12, 13],
			['test1', 20, 11, 14, 13,10, 11, 12, 13],
			['test2', 10, 11, 12, 13,10, 11, 12, 13],
			['test3', 20, 11, 14, 13,10, 11, 12, 13],
			['test3', 20, 11, 14, 13,10, 11, 12, 13],
			['test1', 20, 11, 14, 13,10, 11, 12, 13],
			['test2', 10, 11, 12, 13,10, 11, 12, 13],
			['test3', 20, 11, 14, 13,10, 11, 12, 13],
			['test1', 20, 11, 14, 13,10, 11, 12, 13],
			['test2', 10, 11, 12, 13,10, 11, 12, 13],
			['test3', 20, 11, 14, 13,10, 11, 12, 13],
			['test1', 20, 11, 14, 13,10, 11, 12, 13],
			['test2', 10, 11, 12, 13,10, 11, 12, 13],
			['test3', 20, 11, 14, 13,10, 11, 12, 13],
			['test4', 10, 11, 12, 13,10, 11, 12, 13]
		]
	]
	//end test
	
	//表格实体类
	var hot;
	//被选中的列
	var ColNum = 0;
	//被选中的行
	var RowNum = 0;
	var selectCR = [];
	var dataValue = [];
	var x_name = [];
	var y_name = "";
	var chartname = [];
	
	var chartNum = 0;
	
	//sheet列表
	var sheetList = [];
	var sheetName = "";
	
	//svg列表
	var svgList = [];
	
	//步骤
	var now_step = 1; 
	
	$(function(){

		$(".yd-modal").animate({top:"-100%"},800);
				
		// Translated
		var drEvent = $('.dropify-fr').dropify({
			messages: {
				'default': '点击或拖拽文件到这里',
				'replace': '点击或拖拽文件到这里来替换文件',
				'remove':  '移除文件',
				'error':   '对不起，你上传的文件太大了'
			}
		});
	
		drEvent.on('dropify.beforeClear', function(event, element){
			var targetId = element.input[0].id;
			if(targetId=="sheetData"){
				uploadDataSign=0;
			}else{
				ppt_id="0";
			}
		});
	
		drEvent.on('dropify.afterClear', function(event, element){});
		
		$('.content-box').jQueryTab({
			initialTab: 0,
			tabInTransition: 'slideRightIn',
			tabOutTransition: 'slideRightOut',
			cookieName: 'step-list'
		});
		
		
		$("#step"+now_step+"-col").trigger("click");
		$(".tab_content").css("display","none");
		$("#step1").css("display","block");
		
		clickHandler.stepHandler();
		clickHandler.bulidChart();
		clickHandler.modalChartBuild();
		
		clickHandler.uploadExcel();
		clickHandler.uploadPPT();
		clickHandler.buildPPT();
	})
	
	

	
	var DataHandler = {
		//解析sheet数据
		analysisData:function(data){
			var sheetNameList = "";
			$(".sheet-tabs").html("");
			$(".sheet-tabs-content").html("");
			$.each(data,function(index,array){
				if(index==0){
					sheetNameList = array;
				}else{
					var eleNum = index;
					var htmltab = '';
					var html = '';
					htmltab = '<li class="tab-item"><a id="sheet-tab'+eleNum+'" data-index="'+index+'">'+sheetNameList[index-1]+'</a><span class="wb"></span></li>';
					html = '<div class="shelltab_content" id="layoutsheet'+eleNum+'" ><div id="sheet'+eleNum+'" class="shell_content"></div></div>';
	
					$(".sheet-tabs").append(htmltab);
					$(".sheet-tabs-content").append(html);
					
					$("#sheet-tab"+eleNum).on("click",function(){
						var idx = $(this).attr("data-index");
						$(".tab-item").removeClass("tab-active");
						$(this).parent().addClass("tab-active");
						$(".shelltab_content").css("display","none");
						$("#layoutsheet"+eleNum).css("display","block");
						sheetName = "sheet"+eleNum;
						if(hot!=null){
							$(".shell_content").mCustomScrollbar("destroy");
							hot.destroy();
						}
						hot = bulidSheet("sheet"+eleNum,array);
					})
				}
				
			});

			$(".shelltab_content").css("display","none");
			$("#layoutsheet1").css("display","block");
			
		}
	}
	
	var ajaxHandler = {
		
		//上传svg到后台
		uploadSvg:function(){
			$('body').waitMe({
				effect: "bounce",
				text: '正在上传图表...',
				bg: 'rgba(0,0,0,0.7)',
				color:'#000',
				sizeW:'',
				sizeH:'',
				source: 'img.svg'
			});
			
			//test
			/*var testData = '{"error_code":0,"ppt_url":"http://123.ppt","ppt_name":"test.ppt"}';
			var dataJson = JSON.parse(testData);
			
			if(dataJson.error_code==0){
				var url = dataJson.ppt_url;
				var ppt_name = dataJson.ppt_name;
				$("#downloadPPT").attr("download",ppt_name);
				$("#downloadPPT").attr("href",url);
				clickHandler.modalDownloadPPT();
			}else{
			  var notification = new NotificationFx({
				  message : '<p>'+dataJson.error_messge+'</p>',
				  layout : 'growl',
				  effect : 'genie',
				  type : 'notice', // notice, warning or error
				  ttl : 1000,
				  onClose : function() {
				  }
			  });
	
			  notification.show();
			}*/
			//end test
			var isTransparent = $("#isTransparent").prop("checked");
			$.ajax({
				url:"/uploadSvg",
				type:"POST",
				data:{
					ppt_id:ppt_id,
					svg_list:svgList,
					isTransparent:isTransparent
				},
				error: function(){
					var notification = new NotificationFx({
						message : '<p>连接不上服务器，请重试</p>',
						layout : 'growl',
						effect : 'genie',
						type : 'notice', // notice, warning or error
						ttl : 1000,
						onClose : function() {
						}
					});
		
					notification.show();
				},
				timeout:30000,
				success: function(data){
					var dataJson = JSON.parse(data);
					if(dataJson.error_code==0){
						var url = dataJson.ppt_url;
						var ppt_name = dataJson.ppt_name;
						$("#downloadPPT").attr("download",ppt_name);
						$("#downloadPPT").attr("href",url);
						clickHandler.modalDownloadPPT();
					}else{
					  var notification = new NotificationFx({
						  message : '<p>'+dataJson.error_messge+'</p>',
						  layout : 'growl',
						  effect : 'genie',
						  type : 'notice', // notice, warning or error
						  ttl : 1000,
						  onClose : function() {
						  }
					  });
			
					  notification.show();
					}
				}
			})
			
			setTimeout("$('body').waitMe('hide')",0);
		}

	}
	
	var clickHandler = {
		//行列选择
		choiceHL:function(sheetName){
			$("#"+sheetName).find(".relative").off("click");
			$("#"+sheetName).find(".relative").on("click",function(){
				
				if(ColNum>0){
					if($(this).children().hasClass("rowHeader")){
						ColNum = 0;
						$(".relative").removeClass("select");
						$(".relative").children().removeClass("select");
					}
				}else if(RowNum>0){
					if($(this).children().hasClass("colHeader")){
						RowNum = 0;
						$(".relative").removeClass("select");
						$(".relative").children().removeClass("select");
					}
				}
				
				if($(this).hasClass("select")){
					$(this).removeClass("select");
					$(this).children().removeClass("select");
					if($(this).children().hasClass("colHeader")){
						ColNum--;
					}else if($(this).children().hasClass("rowHeader")){
						RowNum--;
					}
				}else{
					$(this).addClass("select");
					$(this).children().addClass("select");
					if($(this).children().hasClass("colHeader")){
						ColNum++;
					}else if($(this).children().hasClass("rowHeader")){
						RowNum++;
					}
				}
			})
		},
		
		//步骤跳转
		stepHandler:function(){
			$("#step-left").on("click",function(){
				if(now_step>1){
					now_step--;
					$("#step"+now_step+"-col").trigger("click");
					$(".tab_content").css("display","none");
					$("#step"+now_step).css("display","block");
					if(now_step==1){
						$("#step-left").animate({opacity:"0"},"slow");
						//$("#step-left").css("display","none");
					}
					if(now_step<3){
						$("#step-right").css("display","inline-block");	
						$("#step-right").animate({opacity:"1"},"slow");	
					}
					if(now_step==1){
						$(".step-2").animate({opacity:"0"},"fast");
						$(".step-2").animate({left:"0px"},"slow");
						$(".page-box").text("1/3");
					}
					if(now_step==2){
						$(".step-3").animate({opacity:"0"},"fast");
						$(".step-3").animate({left:"0px"},"slow");
						$(".page-box").text("2/3");
						
					}
					
				}
			})
			
			$("#step-right").on("click",function(){
				if(now_step<3){
					//检测是否上传文件
					if(now_step==1){
						if(uploadDataSign==0){
							
							var notification = new NotificationFx({
								message : '<p>检测到你没有上传文件，请先上传excel</p>',
								layout : 'growl',
								effect : 'genie',
								type : 'notice', 
								ttl : 1000,
								onClose : function() {
								}
							});
				
							notification.show();
							
							clickHandler.modalFileBuild(msg);
							return;
						}
					}else if(now_step==2){
						if($(".chart-list-box").html()==""){
							var notification = new NotificationFx({
								message : '<p>请至少生成一张图表再继续下一步</p>',
								layout : 'growl',
								effect : 'genie',
								type : 'notice', 
								ttl : 1000,
								onClose : function() {
								}
							});
				
							notification.show();
							return;
						}
						
					}
					
					now_step++;
					$("#step"+now_step+"-col").trigger("click");
					$(".tab_content").css("display","none");
					$("#step"+now_step).css("display","inline-block");
					if(now_step==3){
						$("#step-right").animate({opacity:"0"},"slow");
						$("#step-right").css("display","none");
					}
					if(now_step==2){
						$("#sheet-tab1").trigger("click");
					}
					if(now_step>1){
						$("#step-left").animate({opacity:"1"},"slow");
						//$("#step-left").css("display","inline-block");	
					}
					
					if(now_step==2){
						$(".step-2").animate({opacity:"1"},"fast");
						$(".step-2").animate({left:"60px"},"slow");
						$(".page-box").text("2/3");
					}
					if(now_step==3){
						$(".step-3").animate({opacity:"1"},"fast");
						$(".step-3").animate({left:"200px"},"slow");
						$(".page-box").text("3/3");
						
					}
					
				}
			})
		},
		//图表弹出层
		modalChartBuild:function(){
			$("#buildChart").on("click",function(){
				if(hot.getSelected()==null){
					var notification = new NotificationFx({
						message : '<p>请选择要生成图表的数据</p>',
						layout : 'growl',
						effect : 'genie',
						type : 'notice', 
						ttl : 1000,
						onClose : function() {
						}
					});
		
					notification.show();
					
					return;
				}
				
				$(".module-zz").css("display","block");
				$("#chart-modal").addClass("modal-active");
			})
			$("#closemodalChart").on("click",function(){
				$(".module-zz").css("display","none");
				$("#chart-modal").removeClass("modal-active");
			})
		},
		
		//删除图表
		modalChartDelete:function(ele){
			$("#"+ele).parent().find(".delete-chart").on("click",function(){
				$(".module-zz").css("display","block");
				$("#delete-modal").addClass("modal-active");
				$("#SureDeleteChart").on("click",function(){
					$("#"+ele).parent().remove();
					$(".module-zz").css("display","none");
					$("#delete-modal").removeClass("modal-active");
				})
				
			})
			
			$("#delete-modal").find(".closeModal").off("click");
			$("#delete-modal").find(".closeModal").on("click",function(){
				$(".module-zz").css("display","none");
				$("#delete-modal").removeClass("modal-active");
			})
			
		},
		
		
		//上传弹出层
		modalFileBuild:function(msg){
			$("#text-msg").text(msg);
			$(".module-zz").css("display","block");
			$("#file-modal").addClass("modal-active");
			$("#closemodalFile").off("click");
			$("#closemodalFile").on("click",function(){
				$(".module-zz").css("display","none");
				$("#file-modal").removeClass("modal-active");
			})
		},
		//下载弹出层
		modalDownloadPPT:function(){
			$(".module-zz").css("display","block");
			$("#dwPPT-modal").addClass("modal-active");
			$("#dwPPT-modal").find(".closeModal").off("click");
			$("#dwPPT-modal").find(".closeModal").on("click",function(){
				$(".module-zz").css("display","none");
				$("#dwPPT-modal").removeClass("modal-active");
			})
		},
		
		
		//图表生成
		bulidChart:function(){
			$(".chart-build").on("click",function(){
				
				getValue(sheetName);
				var html = '<div class="chart-result"><span class="delete-chart fa fa-times"></span><div id="chart_'+chartNum+'" class="chart-result-item"></div><div class="upload-chart-item" id="upload_chart_'+chartNum+'"></div></div>';
				
				$(".chart-list-box").append(html);
				target_id = "chart_"+chartNum;
				uploadtarget_id = "upload_chart_"+chartNum;
				addChart(target_id,$(this).attr("data-type"),dataValue,x_name,y_name,chartname);
				addChart(uploadtarget_id,$(this).attr("data-type"),dataValue,x_name,y_name,chartname);
				clickHandler.modalChartDelete('chart_'+chartNum);
				chartNum++;
				if(chartNum>1){
					$(".chart-list-box").mCustomScrollbar("destroy");
				}				
				$(".chart-list-box").mCustomScrollbar({
					scrollbarPosition:"inside",
					axis:"yx" // 水平和垂直同时存在的滚动条
				});	
				$(".chart-list-box").resizable();
				$(".module-zz").css("display","none");
				$("#chart-modal").removeClass("modal-active");
				
			})
		},
		
		
		//上传Excel
		uploadExcel:function(){
			$("#upload-data").on("click",function(){
			 
				uploadFile();
				//test
				//uploadDataSign=1;
				//DataHandler.analysisData(dataList);
				//test
			})
		},
		
		//上传PPT
		uploadPPT:function(){
			$("#uploadPPT").on("click",function(){
				uploadPPT();
			})
		},
		
		//生成PPT
		buildPPT:function(){
			$("#buildPPT").on("click",function(){
				clickHandler.getSVGChart();
				
			})
		},
		
		//获取所有svg
		getSVGChart:function(){
			svgList="";
			$(".upload-chart-item").each(function(index, element) {
				svgList+=$(element).find(".highcharts-container").html()+"::";
            });
			svgList = svgList.substring(0,svgList.length-2);
			ajaxHandler.uploadSvg();
		}
	};
	
	
	//创建数据表
	function bulidSheet(sheetName,data){
		var container = document.getElementById(sheetName),
		  	selectFirst = document.getElementById('selectFirst'),
		  	showSelect = document.getElementById('showSelect'),
            maxed = false,
            resizeTimeout,
            availableWidth,
            availableHeight;
	
		
		var sheetHot = new Handsontable(container, {
/*		  startRows: 15,
		  startCols: 16,*/
		  rowHeaders: true,
		  colHeaders: true,
		  /*minSpareCols: 1,*/
		  minSpareRows: 1,
		  contextMenu: false,
		  outsideClickDeselects: false,
		  fillHandle: false,
		  /*fixedRowsTop: 2,*/
		});
		
		sheetHot.loadData(data);
		sheetHot.updateSettings({
			cells: function (row, col, prop) {
			  var cellProperties = {};
			  cellProperties.editor = false;
			  return cellProperties;
			}
	  	})
		
		//表格点击事件
		Handsontable.hooks.add( 'afterSelection', function( row, column ) {
			clickHandler.choiceHL(sheetName);
			$('.dragdealer.vertical').hide(); //hides the vertical scroll bar
    		$('.dragdealer.horizontal').hide(); //hides the horizontal scroll bar
			
			var current_td = this.getCell( row, column );
			if($(current_td).hasClass("current")){
				$(".relative").removeClass("select");
				$(".relative").children().removeClass("select");
				ColNum = 0;
				RowNum = 0;
			}
			if(row==0||column==0){
			}else{
				$(".relative").removeClass("select");
				$(".relative").children().removeClass("select");
				ColNum = 0;
				RowNum = 0;
			}
			
		});
		
		function calculateSize() {
          var offset;

          if (maxed) {
            offset = Handsontable.Dom.offset(container);
            availableWidth = Handsontable.Dom.innerWidth(document.body) - offset.left + window.scrollX;
            availableHeight = Handsontable.Dom.innerHeight(document.body) - offset.top + window.scrollY;

            container.style.width = availableWidth + 'px';
            container.style.height = availableHeight + 'px';
          }
        }

        Handsontable.Dom.addEvent(window, 'resize', calculateSize);

		
		
		/*Handsontable.Dom.addEvent(selectFirst, 'click', function () {
		  hot.selectCell(0,0);
		});
		Handsontable.Dom.addEvent(showSelect, 'click', function () {
			getValue(sheetName);
		});	*/
		
		
		clickHandler.choiceHL(sheetName);
		

		$("#"+sheetName).mCustomScrollbar({
			scrollbarPosition:"inside",
			axis:"yx" // 水平和垂直同时存在的滚动条
		});		

		return sheetHot;
		
	}
	//添加图表
	function addChart(target_id,chartType,chart_data,x_name,y_name,chartname){
		if(chartType == "area"){
			chartEg = areaChart(chart_data,x_name,y_name,chartname,target_id);
		}else if(chartType == "bar"){
			chartEg = barChart(chart_data,x_name,y_name,chartname,target_id);
		}else if(chartType == "column"){
			chartEg = column2Chart(chart_data,x_name,y_name,chartname,target_id);
		}else if(chartType == "pie"){
			if(x_name.length!=0){
				chartEg = pieChart(chart_data,x_name,chartname,target_id);
			}else{
				chartEg = pieChart(chart_data,chartname,x_name,target_id);
			}
			
		}
	}
	
	//获取选择的值
	function getValue(container){
		selectCR = [];
		x_name = [];
		y_name = [];
		x_data = [];
		dataValue = [];
		chartname = [];

		var totalCol = hot.countCols();
   		var totalRow = hot.countRows();
		
		
		//列检查
		if(ColNum>0){
			$("#"+container).find(".ht_clone_top").find(".colHeader").each(function(index, element) {
				if($(element).hasClass("select")){
					selectCR.push(index-1);
				}
			});
			
			
			for(var i=0;i<selectCR.length;i++){
				if(selectCR[i]==0){
					var x_originData = hot.getData(1,0,totalRow,0);
					var x_listData = [];
					$.each(x_originData,function(index,ele){
						if(ele[0]!=null){
							x_name.push(ele[0]);	
						}
					})
				}else{

					var originData = hot.getData(0,selectCR[i],totalRow,selectCR[i])
					var listData = [];
					$.each(originData,function(index,ele){
						if(ele[0]!=null){
							if(index==0){
								chartname.push(ele[0]);
							}else{
								listData.push(ele[0]);
							}
							
						}					
					});
					dataValue.push(listData);
				}
				
			}
			
		}else if(RowNum>0){              //行检查
		
			$("#"+container).find(".ht_clone_left").find(".rowHeader").each(function(index, element) {
			   if($(element).hasClass("select")){
					selectCR.push(index-1);
				}
			});
			for(var i=0;i<selectCR.length;i++){
				var originData = hot.getData(selectCR[i],0,selectCR[i],totalCol);
				$.each(originData,function(index,array){
					var listData = [];
					$.each(array,function(idx,ele){
						if(ele!=null){
							if(checkNum(parseInt(ele))){
								listData.push(parseInt(ele));
							}else{
								chartname.push(ele);
							}
						}
					});
					dataValue.push(listData);
				});
			}
			
		}else{
			selectCR = hot.getSelected();
			//hot.getSelectedRange();
			//getData(row1,col1,row2,col2)
			var startRow = selectCR[0];
			var startCol = selectCR[1];
			if(selectCR[1]==0){
				var chartList = hot.getData(selectCR[0],0,selectCR[2],0);
				
				startCol++;
				for(var i = 0; i < chartList.length; i++) {
					if(chartList[i]!="")
						chartname.push(chartList[i][0]);
				}
			}

			if(selectCR[0]==0){
				var x_nameList = hot.getData(0,selectCR[1],0,selectCR[3]);
				$.each(x_nameList[0],function(index,ele){
					if(ele!=""&&ele!=null){
						x_name.push(ele);
					}
					
				});
				startRow++;
			}
			dataValue = hot.getData(startRow,startCol,selectCR[2],selectCR[3]);
		}
		
		console.log(dataValue);
		console.log(x_name);
/*		console.log("ColNum:"+ColNum);
		console.log("RowNum:"+RowNum);
		
		console.log(selectCR);
		
		console.log(hot.getSelectedRange());*/
		
		
	}
	
	//类型判断
	function checkNum(input){
		
		var re = /^[0-9]+.?[0-9]*$/;        
		if (re.test(input))  
		{   
			return true;  
		}else{
			return false;
		} 
	}
	
	
	//上传excel
	function uploadFile(){
	  
	  var formData = new FormData($("#frmUploadFile")[0]);
	  
	  var filepath=$("input[name='sheetData']").val();
	  var extStart=filepath.lastIndexOf(".");
	  var ext=filepath.substring(extStart,filepath.length).toUpperCase();

	  if(ext!=".XLS"&&ext!=".XLSX"){
		  
		var notification = new NotificationFx({
			message : '<p>上传文件限于xls,xlsx格式</p>',
			layout : 'growl',
			effect : 'genie',
			type : 'notice', // notice, warning or error
			ttl : 1000,
			onClose : function() {
			}
		});

		notification.show();
		return false;
	  }
	  
	  $('body').waitMe({
		effect: "bounce",
		text: '正在上传...',
		bg: 'rgba(0,0,0,0.7)',
		color:'#000',
		sizeW:'',
		sizeH:'',
		source: 'img.svg'
	  });


	  //form表单 
	  //name:sheetData
	  $.ajax({
		url: '/uploadExcel',
		type: 'POST',
		data: formData,
		async: false,
		cache: false,
		contentType: false,
		processData: false,
		timeout:30000,
		success: function(data){
		  var dataJson = JSON.parse(data);
		  //{"sheetList":[[[],[]]]}
		  if(dataJson.error_code==0){
			dataList = JSON.parse(data).sheetList;
		    console.log('excelUploader upload success, data:', data);
			uploadDataSign=1;
			DataHandler.analysisData(dataList);
			var notification = new NotificationFx({
				message : '<p>上传成功</p>',
				layout : 'growl',
				effect : 'genie',
				type : 'error', // notice, warning or error
				ttl : 1000,
				onClose : function() {
				}
			});

			notification.show();
			
		  }else{
			  var notification = new NotificationFx({
				message : '<p>'+dataJson.error_messge+'</p>',
				layout : 'growl',
				effect : 'genie',
				type : 'error', // notice, warning or error
				ttl : 1000,
				onClose : function() {
				}
			});
	
			notification.show();
		  }
		},
		error: function(){
			var notification = new NotificationFx({
				message : '<p>连接不上服务器，请重试</p>',
				layout : 'growl',
				effect : 'genie',
				type : 'error', // notice, warning or error
				ttl : 1000,
				onClose : function() {
				}
			});

			notification.show();
		}
	  });
	  setTimeout("$('body').waitMe('hide')",1000);
	}
	
	//上传PPT
	function uploadPPT(){
	  var formData = new FormData($("#frmUploadPPT")[0]);
	  var filepath=$("input[name='PPTtpl']").val();
	  var extStart=filepath.lastIndexOf(".");
	  var ext=filepath.substring(extStart,filepath.length).toUpperCase();
	  
	  if(ext!=".PPT"&&ext!=".PPTX"){
		var notification = new NotificationFx({
			message : '<p>上传文件限于PPT,PPTX格式</p>',
			layout : 'growl',
			effect : 'genie',
			type : 'notice', // notice, warning or error
			ttl : 1000,
			onClose : function() {
			}
		});

		notification.show();
		return false;
	  }
	  
	  $('body').waitMe({
		effect: "bounce",
		text: '正在上传...',
		bg: 'rgba(0,0,0,0.7)',
		color:'#000',
		sizeW:'',
		sizeH:'',
		source: 'img.svg'
	  });

	   //name:PPTtpl
	  $.ajax({
		url: '/uploadPPT',
		type: 'POST',
		data: formData,
		async: false,
		cache: false,
		contentType: false,
		processData: false,
		timeout:30000,
		success: function(data){
		  var dataJson = JSON.parse(data);
		  //{"ppt_id":""}
		  if(dataJson.error_code==0){
			ppt_id = dataJson.ppt_id;
			//ajaxHandler.uploadSvg();
		    console.log('pptUploader upload success, data:', data);
			var notification = new NotificationFx({
				message : '<p>上传成功</p>',
				layout : 'growl',
				effect : 'genie',
				type : 'error', // notice, warning or error
				ttl : 1000,
				onClose : function() {
				}
			});

			notification.show();
		  }else{
			  var notification = new NotificationFx({
				  message : '<p>'+dataJson.error_messge+'</p>',
				  layout : 'growl',
				  effect : 'genie',
				  type : 'notice', // notice, warning or error
				  ttl : 1000,
				  onClose : function() {
				  }
			  });
	
			  notification.show();
		  }
		},
		error: function(){
			var notification = new NotificationFx({
				message : '<p>连接不上服务器，请重试</p>',
				layout : 'growl',
				effect : 'genie',
				type : 'notice', // notice, warning or error
				ttl : 1000,
				onClose : function() {
				}
			});

			notification.show();
		}
	  });
	  setTimeout("$('body').waitMe('hide')",1000);
	}
	
	
	
})();