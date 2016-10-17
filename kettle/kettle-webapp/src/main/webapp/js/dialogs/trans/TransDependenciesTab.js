TransDependenciesTab = Ext.extend(Ext.grid.EditorGridPanel, {
	title: '依赖',
	
	initComponent: function() {
		
		var databaseStore = new Ext.data.JsonStore({
			fields: ['name'],
			url: GetUrl('database/listNames.do')
		});
		
		var wConnection = new Ext.form.ComboBox({
			fieldLabel: '数据库连接',
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
		
		wConnection.on('beforequery', function() {
		    delete wConnection.lastQuery; 
		});
		
		this.tbar = [{
			iconCls: 'add', scope: this, handler: function() {
				var RecordType = this.getStore().recordType;
	            var p = new RecordType({
	                name: '',
	                defa: '',
	                format: ''
	            });
	            this.stopEditing();
	            this.getStore().insert(0, p);
	            this.startEditing(0, 0);
			}
		},{
			iconCls: 'delete', scope: this, handler: function(){
				var selModel = this.getSelectionModel();
				if (selModel.hasSelection()) {
					var selection = selModel.selection.record;
					this.getStore().remove(selection);
               }
			}
		}];
		
		this.columns = [new Ext.grid.RowNumberer(), {
			header: '数据库连接', dataIndex: 'connetion', width: 100, editor: wConnection
		},{
			header: '表', dataIndex: 'table', width: 100, editor: new Ext.form.TextField({
	            allowBlank: false
	        })
		},{
			header: '字段', dataIndex: 'field', width: 100, editor: new Ext.form.TextField({
	            allowBlank: false
	        })
		}];
		
		this.store = new Ext.data.JsonStore({
			fields: ['connetion', 'table', 'field'],
			data: []//Ext.decode(node.getAttribute('parameters') || Ext.encode([]))
		});
		
		TransDependenciesTab.superclass.initComponent.call(this);
	}
	
});