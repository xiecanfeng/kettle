TransMiscTab = Ext.extend(Ext.form.FormPanel, {
	title: '杂项',
	labelWidth: 180,
	bodyStyle: 'padding: 10px 15px',
	defaultType: 'textfield',
	initComponent: function() {
		var graph = getActiveGraph().getGraph(), root = graph.getDefaultParent();
		
		this.items = [{
			fieldLabel: '记录集合里的记录数',
			anchor: '-10',
			name:'size_rowset',
			value: root.getAttribute('size_rowset')
		},{
			fieldLabel: '转换时是否在日志中记录反馈行?',
			xtype: 'checkbox',
			name:'feedback_shown',
			checked: 'Y' == root.getAttribute('feedback_shown'),
			anchor: '-10'
		},{
			fieldLabel: '每个反馈行的处理记录数',
			anchor: '-10',
			name:'feedback_size',
			value: root.getAttribute('feedback_size')
		},{
			fieldLabel: '使用唯一连接',
			xtype: 'checkbox',
			name:'unique_connections',
			checked: 'Y' == root.getAttribute('unique_connections'),
			anchor: '-10'
		},{
			fieldLabel: '共享对象文件',
			anchor: '-10',
			name:'shared_objects_file',
			value: root.getAttribute('shared_objects_file')
		},{
			fieldLabel: '管理线程优先级',
			xtype: 'checkbox',
			name:'using_thread_priorities',
			checked: 'Y' == root.getAttribute('using_thread_priorities'),
			anchor: '-10'
		},{
			fieldLabel: '转换引擎类型',
			anchor: '-10',
			name:'trans_type',
			value: root.getAttribute('trans_type')
		}];
		
		TransMiscTab.superclass.initComponent.call(this);
	}
	
});