ParamDialog = Ext.extend(Ext.Window, {
	title: '参数配置',
	width: 800,
	height: 400,
	layout: 'fit',
	modal: true,
	initComponent: function() {
		
		var me = this;
		
		var transParam = new ParamTab();
		
		var tabPanel = new Ext.TabPanel({
			activeTab: 0,
			plain: true,
			items: [transParam]
		});
		
		this.items = tabPanel;
		this.bbar = ['->', {text: '确定', handler: function() {
				//获取参数表格所有的数据
				var paramDatas = [];
				Ext.each(transParam.getStore().getRange(),function(record){
					paramDatas.push(record.data);
				});
				
				var param = Ext.encode(paramDatas);
				
				//使用ajax去传递数据到后台保存
				Ext.Ajax.request({
	                url: GetUrl('param/save.do'),
	                params: { param:param },
	                method: 'POST',
	                success: function (response, options) {
//	                    Ext.MessageBox.alert('成功', '从服务端获取结果: ' + response.responseText);
	                	me.close();
	                },
	                failure: function (response, options) {
	                    Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
	                }
	            });
				
				
			}}, {text: '取消', handler: function() {
				me.close();
			}}
		];
		ParamDialog.superclass.initComponent.call(this);
	}
});