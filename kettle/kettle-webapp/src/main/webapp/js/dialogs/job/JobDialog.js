JobDialog = Ext.extend(Ext.Window, {
	title: '作业属性',
	width: 900,
	height: 600,
	closeAction: 'close',
	layout: 'fit',
	modal: true,
	bodyStyle: 'padding: 5px;',
	
	initComponent: function() {
		var me = this, graph = getActiveGraph().getGraph(), root = graph.getDefaultParent();
		
		var jobForm = new JobTab();
		var jobParam = new JobParamTab();
		var jobSet = new JobSetTab();
		var jobLog = new JobLogTab();
		
		var tabPanel = new Ext.TabPanel({
			activeTab: 0,
			plain: true,
			items: [jobForm, jobParam, jobSet, jobLog]
		});
		
		this.items = tabPanel;
		this.bbar = ['->', {text: '确定', handler: function() {
				
				var jobData = jobForm.getForm().getFieldValues();
				
				var paramDatas = [];
				Ext.each(jobParam.getStore().getRange(),function(record){
					paramDatas.push(record.data);
				});
				var paramJson = Ext.encode(paramDatas); 

				var paramData = {parameters:paramJson};
				
				var setData = jobSet.getForm().getFieldValues();
				if(setData.is_batchId_passed){
					setData.is_batchId_passed = 'Y';
				}else{
					setData.is_batchId_passed = 'N';
				}
				
				var logData = jobLog.getValues();
				
				var datas = [jobData,paramData,setData,logData];
			
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
			}},{text: '取消', handler: function() {
				me.close();
			}}
		];
		
		JobDialog.superclass.initComponent.call(this);
	}
});