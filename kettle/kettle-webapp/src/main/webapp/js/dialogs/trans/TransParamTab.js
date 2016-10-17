TransParamTab = Ext.extend(Ext.grid.EditorGridPanel, {
	title: '命名参数',
	
	initComponent: function() {
		
		var graph = getActiveGraph().getGraph(), root = graph.getDefaultParent();
		
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
			header: '命名参数', dataIndex: 'name', width: 100, editor: new Ext.form.TextField({
	            allowBlank: false
	        })
		},{
			header: '默认值', dataIndex: 'default_value', width: 100, editor: new Ext.form.TextField({
	            allowBlank: false
	        })
		},{
			header: '描述', dataIndex: 'description', width: 100, editor: new Ext.form.TextField({
	            allowBlank: false
	        })
		}];
		
		this.store = new Ext.data.JsonStore({
			fields: ['name', 'default_value', 'description'],
			data: Ext.decode(root.getAttribute('parameters') || Ext.encode([]))
		});
		
		TransParamTab.superclass.initComponent.call(this);
	}
	
});