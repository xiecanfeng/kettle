JobLogJobPanel = Ext.extend(Ext.Panel, {
	defaults: {border: false},
	layout: {
        type:'vbox',
        align:'stretch'
    },
	initComponent: function() {
		var graph = getActiveGraph().getGraph(), root = graph.getDefaultParent();
		var jobLogTable = Ext.decode(root.getAttribute('jobLogTable'));
		
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
		wConnection.setValue(jobLogTable.connection);
		
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
			height: 170,
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
				value: jobLogTable.schema
			},{
				xtype:'textfield',
				fieldLabel: '日志表',
				anchor: '-10',
				name: 'table',
				value: jobLogTable.table
			},{
				xtype:'textfield',
				fieldLabel: '日志记录间隔时间(秒)',
				anchor: '-10',
				name: 'interval',
				value: jobLogTable.interval
			},{
				xtype:'textfield',
				fieldLabel: '日志记录过时时间(天)',
				anchor: '-10',
				name: 'timeout_days',
				value: jobLogTable.timeout_days
			},{
				xtype:'textfield',
				fieldLabel: '在内存中保存的日志行数限制',
				anchor: '-10',
				name: 'size_limit_lines',
				value: jobLogTable.size_limit_lines
			}]
		});
		
		var store = new Ext.data.JsonStore({
			fields: ['name'],
			data: []
		}), data = [];
		var cells = graph.getModel().getChildCells(root, true, false);
		for(var j=0; j<cells.length; j++) {
			var cell = cells[j];
			if(cell.isVertex() && cell.isVisible()) {
				data.push({name: cell.getAttribute('label')});
			}
		}
		store.loadData(data);
		
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
				header: '步骤名称', dataIndex: 'subject', width: 100, editor: new Ext.form.ComboBox({
			        store: store,
			        displayField: 'name',
			        valueField: 'name',
			        typeAhead: true,
			        mode: 'local',
			        forceSelection: true,
			        triggerAction: 'all',
			        selectOnFocus:true
			    })
			},{
				id: 'columnDesc', header: '字段描述', dataIndex: 'description', width: 100, editor: new Ext.form.TextField(), renderer: function(v) {
					return decodeURIComponent(v);
				}
			}],
			store: new Ext.data.JsonStore({
				fields: ['name', 'subject', {name: 'subjectAllowed', type: 'boolean'}, 'description', {name: 'enabled', type: 'boolean'}],
				data: jobLogTable.fields
			})
		});
		grid.on('beforeedit', function(e) {
			var rec = e.record;
			if(e.column == 2) {
				if(!rec.get('subjectAllowed')) {
					return false;
				}
			}
			return true;
		});
		
		this.items = [form, grid];
		
		this.getJobLogTable = function(){
			var values = form.getForm().getFieldValues();
			jobLogTable.connection = values.connection;
			jobLogTable.schema = values.schema;
			jobLogTable.table = values.table;
			jobLogTable.size_limit_lines = values.size_limit_lines;
			jobLogTable.interval = values.interval;
			jobLogTable.timeout_days = values.timeout_days;
			
			return jobLogTable;
		};
		
		TransLogTransPanel.superclass.initComponent.call(this);
	}

});

Ext.reg('JobLogJob', JobLogJobPanel);