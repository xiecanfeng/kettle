TransLogRunningPanel = Ext.extend(Ext.Panel, {
	defaults: {border: false},
	layout: {
        type:'vbox',
        align:'stretch'
    },
	initComponent: function() {
		var graph = getActiveGraph().getGraph(), root = graph.getDefaultParent();
		var performanceLogTable = Ext.decode(root.getAttribute('performanceLogTable'));
		
		var databaseStore = new Ext.data.JsonStore({
			fields: ['name'],
			url: GetUrl('database/listNames.do')
		});
		
		var wConnection = new Ext.form.ComboBox({
			fieldLabel: '日志数据库连接',
			displayField: 'name',
			valueField: 'name',
			hiddenName: 'connection',
			typeAhead: true,
	        forceSelection: true,
	        triggerAction: 'all',
	        selectOnFocus:true,
	        anchor :"98%",
			store: databaseStore
		});
		wConnection.setValue(performanceLogTable.connection);
		
		var onDatabaseCreate = function(dialog) {
			Ext.Ajax.request({
				url: GetUrl('database/create.do'),
				method: 'POST',
				params: {databaseInfo: Ext.encode(dialog.getValue())},
				success: function(response) {
					var json = Ext.decode(response.responseText);
					if(!json.success) {
						Ext.Msg.alert('系统提示', json.message);
					} else {
						dialog.close();
						databaseStore.load();
						wConnection.setValue(json.message);
					}
				}
			});
		};
		
		wConnection.on('beforequery', function() {
		    delete wConnection.lastQuery; 
		});
		
		var form = new Ext.form.FormPanel({
			bodyStyle: 'padding: 10px 15px',
			height: 150,
			//defaultType: 'textfield',
			labelWidth: 160,
			items: [{
				anchor: '-10',
				layout : "column",
				border: false,
				items : [{
						columnWidth: .9,
						layout: 'form',
						border:false,
						items: [wConnection]
					},{
						columnWidth: .1,
						xtype : "button",
						text: '新建...',
						handler: function() {
						var databaseDialog = new DatabaseDialog();
						databaseDialog.on('create', onDatabaseCreate);
						databaseDialog.show(null, function() {
							databaseDialog.initReposityDatabase(null);
						});
					}
				}]
			},{
				xtype:'textfield',
				fieldLabel: '日志表模式',
				anchor: '-10',
				name: 'schema',
				value: performanceLogTable.schema
			},{
				xtype:'textfield',
				fieldLabel: '日志表',
				anchor: '-10',
				name: 'table',
				value: performanceLogTable.table
			},{
				xtype:'textfield',
				fieldLabel: '日志记录间隔时间(秒)',
				anchor: '-10',
				name: 'interval',
				value: performanceLogTable.interval
			},{
				xtype:'textfield',
				fieldLabel: '日志记录过时时间(天)',
				anchor: '-10',
				name: 'timeout_days',
				value: performanceLogTable.timeout_days
			}]
		});
		
		var grid = new Ext.grid.EditorGridPanel({
			title: '日志字段',
			flex: 1,
			autoExpandColumn: 'columnDesc',
			columns: [{
				header: '启用', dataIndex: 'enabled', width: 60
			},{
				header: '字段名称', dataIndex: 'name', width: 100, editor: new Ext.form.TextField({
	                allowBlank: false
	            })
			},{
				id: 'columnDesc', header: '字段描述', dataIndex: 'description', width: 100, editor: new Ext.form.TextField(), renderer: function(v) {
					return decodeURIComponent(v);
				}
			}],
			store: new Ext.data.JsonStore({
				fields: ['name', 'description', {name: 'enabled', type: 'boolean'}],
				data: performanceLogTable.fields
			})
		});
		
		this.items = [form, grid];
		
		this.getPerformanceLogTable = function(){
			var values = form.getForm().getFieldValues();
			performanceLogTable.connection = values.connection;
			performanceLogTable.schema = values.schema;
			performanceLogTable.table = values.table;
			performanceLogTable.interval = values.interval;
			performanceLogTable.timeout_days = values.timeout_days;
			
			return performanceLogTable;
		};
		
		TransLogRunningPanel.superclass.initComponent.call(this);
	}

});

Ext.reg('TransLogRunning', TransLogRunningPanel);