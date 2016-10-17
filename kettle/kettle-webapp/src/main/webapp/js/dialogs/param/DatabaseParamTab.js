DatabaseParamTab = Ext.extend(Ext.grid.EditorGridPanel, {
	title: '参数',
	initComponent: function() {
		var me = this;
		
		this.tbar = [{
			iconCls: 'add', scope: this, handler: function() {
				var databaseDialog = new DatabaseParamDialogAdd();
				databaseDialog.on('create', onDatabaseCreate);
				databaseDialog.show(null, function() {
					databaseDialog.initReposityDatabase(null);
				});
				/*var RecordType = this.getStore().recordType;
	            var p = new RecordType({
	                name: '',
	                defa: '',
	                format: ''
	            });
	            this.stopEditing();
	            this.getStore().insert(0, p);
	            this.startEditing(0, 0);*/
			}
		},{
			iconCls: 'delete', scope: this, handler: function() {
				var selModel = this.getSelectionModel();
				if (selModel.hasSelection()) {
					var selection = selModel.selection.record;
					var name = selection.data.name;
					Ext.Ajax.request({
						url: GetUrl('database/delete.do'),
						method: 'POST',
						params: {"databaseName": name},
						success: function(response) {
							var json = Ext.decode(response.responseText);
							me.getStore().reload();
						}
					});
               }else{
            	   Ext.Msg.alert("警告", "请点击一行进行修改");
               }
			}
		},{
			iconCls: 'edit', scope: this, handler: function() {
				var selModel = this.getSelectionModel();
				if (selModel.hasSelection()) {
					var selection = selModel.selection.record;
					var name = selection.data.name;
					var databaseDialog = new DatabaseParamDialogAdd();
					databaseDialog.on('create', onDatabaseCreate);
					databaseDialog.show(null, function() {
						databaseDialog.initReposityDatabase(name);
					});
               }else{
            	   Ext.Msg.alert("警告", "请点击一行进行修改");
               }
			}
		}];
		
		
		var onDatabaseCreate = function(dialog) {
			dialog.close();
			me.getStore().reload();
		};
		
		
		this.columns = [new Ext.grid.RowNumberer(), {
			header: '名称', dataIndex: 'name', width: 100
		},{
			header: '数据库类型', dataIndex: 'type', width: 100
		},{
			header: 'access', dataIndex: 'access', width: 100,hidden:true
		},{
			header: 'ip地址', dataIndex: 'hostname', width: 100
		},{
			header: '实例名称', dataIndex: 'databaseName', width: 100
		},{
			header: '用户名称', dataIndex: 'username', width: 100
		},{
			header: '密码', dataIndex: 'password', width: 100, hidden:true
		},{
			header: 'streamingResults', dataIndex: 'streamingResults', width: 100, hidden:true
		},{
			header: 'dataTablespace', dataIndex: 'dataTablespace', hidden:true,width: 100
		},{
			header: 'indexTablespace', dataIndex: 'indexTablespace', hidden:true,width: 100
		},{
			header: 'servername', dataIndex: 'servername', width: 100, hidden:true
		},{
			header: 'MSSQLUseIntegratedSecurity', dataIndex: 'MSSQLUseIntegratedSecurity', hidden:true,width: 100
		},{
			header: '端口', dataIndex: 'port', width: 100
		},{
			header: 'extraOptions', dataIndex: 'extraOptions', hidden:true,width: 100
		},{
			header: 'supportBooleanDataType', dataIndex: 'supportBooleanDataType',hidden:true, width: 100
		},{
			header: 'supportTimestampDataType', dataIndex: 'supportTimestampDataType',hidden:true, width: 100
		},{
			header: 'quoteIdentifiersCheck', dataIndex: 'quoteIdentifiersCheck', width: 100,hidden:true
		},{
			header: 'lowerCaseIdentifiersCheck', dataIndex: 'lowerCaseIdentifiersCheck', width: 100,hidden:true
		},{
			header: 'upperCaseIdentifiersCheck', dataIndex: 'upperCaseIdentifiersCheck', width: 100,hidden:true
		},{
			header: 'preserveReservedCaseCheck', dataIndex: 'preserveReservedCaseCheck', width: 100,hidden:true
		},{
			header: 'partitioned', dataIndex: 'partitioned', width: 100,hidden:true
		},{
			header: 'partitionInfo', dataIndex: 'partitionInfo', width: 100,hidden:true
		},{
			header: 'usingConnectionPool', dataIndex: 'usingConnectionPool', width: 100,hidden:true
		},{
			header: 'initialPoolSize', dataIndex: 'initialPoolSize', width: 100,hidden:true
		},{
			header: 'maximumPoolSize', dataIndex: 'maximumPoolSize', width: 100,hidden:true
		},{
			header: 'pool_params', dataIndex: 'pool_params', width: 100,hidden:true
		},{
			header: 'read_only', dataIndex: 'read_only', width: 100,hidden:true
		}];
		
		this.store = new Ext.data.JsonStore({
			fields: ['name', 'type', 'access','hostname','databaseName','username','password','streamingResults','dataTablespace','indexTablespace','servername','MSSQLUseIntegratedSecurity','port','extraOptions','supportBooleanDataType','supportTimestampDataType','quoteIdentifiersCheck','lowerCaseIdentifiersCheck','upperCaseIdentifiersCheck','preserveReservedCaseCheck','partitioned','partitionInfo','usingConnectionPool','initialPoolSize','maximumPoolSize','pool_params','read_only'],
			url:GetUrl('databaseParam/list.do')
//			data:[{"name":"Joe","value":"iii","description":"888"}]
		});
		this.store.load();
		
		/*terminalStore.proxy=new Ext.data.HttpProxy({GetUrl('param/list.do')});
		terminalStore.reload();*/
		
		DatabaseParamTab.superclass.initComponent.call(this);
	}
	
});