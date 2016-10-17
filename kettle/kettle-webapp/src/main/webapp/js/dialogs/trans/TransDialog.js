TransDialog = Ext.extend(Ext.Window, {
	title: '转换属性',
	width: 900,
	height: 600,
	closeAction: 'close',
	layout: 'fit',
	modal: true,
	bodyStyle: 'padding: 5px;',
	
	initComponent: function() {
		var me = this, graph = getActiveGraph().getGraph(), root = graph.getDefaultParent();
		
		var transForm = new TransTab();
		var transParam = new TransParamTab();
		var transLog = new TransLogTab();
		var transDate = new TransDateTab();
		var transDependencies = new TransDependenciesTab();
		var transMisc = new TransMiscTab();
		var transMonitoring = new TransMonitoringTab();
		
		var tabPanel = new Ext.TabPanel({
			activeTab: 0,
			plain: true,
			items: [transForm, transParam, transLog, transDate, transDependencies, transMisc, transMonitoring]
		});
		
		this.items = tabPanel;
		this.bbar = ['->', {text: '确定', handler: function() {
				
				var formData = transForm.getForm().getFieldValues();
			
				var paramDatas = [];
				Ext.each(transParam.getStore().getRange(),function(record){
					paramDatas.push(record.data);
				});
				var paramJson = Ext.encode(paramDatas); 

				var paramData = {parameters:paramJson};
				
				var dateData = transDate.getForm().getFieldValues();
				
				var logData = transLog.getValues();
				
				var miscData = transMisc.getForm().getFieldValues();
				if(miscData.feedback_shown){
					miscData.feedback_shown = 'Y';
				}else{
					miscData.feedback_shown = 'N';
				}
				if(miscData.unique_connections){
					miscData.unique_connections = 'Y';
				}else{
					miscData.unique_connections = 'N';
				}
				if(miscData.using_thread_priorities){
					miscData.using_thread_priorities = 'Y';
				}else{
					miscData.using_thread_priorities = 'N';
				}
				
				var monitoring = transMonitoring.getForm().getFieldValues();
				if(monitoring.capture_step_performance){
					monitoring.capture_step_performance = 'Y';
				}else{
					monitoring.capture_step_performance = 'N';
				}
				
				var datas = [formData,paramData,dateData,logData,miscData,monitoring];
				
				graph.getModel().beginUpdate();
		        try
		        {
		        	Ext.each(datas,function(data){
		        		for(var name in data) {
							var edit = new mxCellAttributeChange(root, name, data[name]);
			            	graph.getModel().execute(edit);
						}
					});
		        } finally
		        {
		            graph.getModel().endUpdate();
		        }
				me.close();
			}}, {text:'SQL',handler: function(){
				/*Ext.Ajax.request({
					url: GetUrl('trans/engineXml.do'),
					params: {graphXml: me.toXml()},
					method: 'POST',
					success: function(response) {
						var dialog = new TransSqlDialog();
						dialog.show(null, function() {
							dialog.initData(response.responseText);
						});
					}
				});*/
			}},{text: '取消', handler: function() {
				me.close();
			}}
		];
		
		TransDialog.superclass.initComponent.call(this);
	}
});