DatabaseParamDialog = Ext.extend(Ext.Window, {
	title: '数据库连接参数',
	width: 800,
	height: 400,
	layout: 'fit',
	modal: true,
	initComponent: function() {
		
		var me = this;
		
		var transParam = new DatabaseParamTab();
		
		var tabPanel = new Ext.TabPanel({
			activeTab: 0,
			plain: true,
			items: [transParam]
		});
		
		this.items = tabPanel;
		this.bbar = ['->', {text: '关闭', handler: function() {
				me.close();
			}}
		];
		DatabaseParamDialog.superclass.initComponent.call(this);
	}
});