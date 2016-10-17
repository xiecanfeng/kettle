LogManageDialog = Ext.extend(Ext.Window, {
	title: '日志监控',
	width: 1000,
	height: 600,
	layout: 'fit',
	modal: true,
	initComponent: function() {
		
		var transLogManage = new TransLogManageTab();
		var jobLogManageTab = new JobLogManageTab();
		
		var tabPanel = new Ext.TabPanel({
			activeTab: 0,
			plain: true,
			items: [transLogManage, jobLogManageTab]
		});
		this.items = tabPanel;

		LogManageDialog.superclass.initComponent.call(this);
	}
});