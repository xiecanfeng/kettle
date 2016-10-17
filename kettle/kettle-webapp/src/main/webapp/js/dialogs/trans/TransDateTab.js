TransDateTab = Ext.extend(Ext.form.FormPanel, {
	title: '日期',
	labelWidth: 130,
	bodyStyle: 'padding: 10px 15px',
	defaultType: 'textfield',
	initComponent: function() {
		var graph = getActiveGraph().getGraph(), root = graph.getDefaultParent();
		
		var databaseStore = new Ext.data.JsonStore({
			fields: ['name'],
			url: GetUrl('database/listNames.do')
		});
	
		var wConnection = new Ext.form.ComboBox({
			fieldLabel: '最大日志数据库连接',
			hiddenName: 'max_date_connection',
			displayField: 'name',
			valueField: 'name',
			typeAhead: true,
	        forceSelection: true,
	        triggerAction: 'all',
	        selectOnFocus:true,
	        anchor :'-10',
			store: databaseStore
		});
		wConnection.setValue(root.getAttribute('max_date_connection'));
		
		this.items = [wConnection,{
			fieldLabel: '最大日期表',
			anchor: '-10',
			name: 'max_date_table',
			value: root.getAttribute('max_date_table')
		},{
			fieldLabel: '最大日期字段',
			anchor: '-10',
			name: 'max_date_field',
			value: root.getAttribute('max_date_field')
		},{
			fieldLabel: '最大日期偏移(秒)',
			anchor: '-10',
			name: 'max_date_offset',
			value: root.getAttribute('max_date_offset')
		},{
			fieldLabel: '最大日期区别(秒)',
			anchor: '-10',
			name: 'max_date_diff',
			value: root.getAttribute('max_date_diff')
		}];
		
		TransDateTab.superclass.initComponent.call(this);
	}
	
});