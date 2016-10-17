JobSetTab = Ext.extend(Ext.form.FormPanel, {
	title: '设置',
	bodyStyle: 'padding: 15px',
	defaultType: 'textfield',
	labelWidth: 90,
	
	initComponent: function() {
		var graph = getActiveGraph().getGraph(), root = graph.getDefaultParent();
		
		this.items = [{
			fieldLabel: '传递batch ID?',
			anchor: '-10',
			xtype: 'checkbox',
			name:'is_batchId_passed',
			checked: 'Y' == root.getAttribute('is_batchId_passed'),
		},{
			fieldLabel: '共享对象文件',
			anchor: '-10',
			allowBlank: false,
			name: 'shared_object_file',
			value: root.getAttribute('shared_object_file')
		}];
		
		JobSetTab.superclass.initComponent.call(this);
	}
});