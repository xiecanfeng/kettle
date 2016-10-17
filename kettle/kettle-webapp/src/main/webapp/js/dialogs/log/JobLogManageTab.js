JobLogManageTab = Ext.extend(Ext.Panel, {
	title: '作业日志',
	layout: 'fit',
	initComponent: function() {
		
		var jobLogJobStore = new Ext.data.JsonStore({
			fields: ['idJob', 'channelId', 'jobName', 'status', 'linesRead', 'linesWritten', 'linesUpdated', 'linesInput', 
			         'linesOutput', 'linesRejected', 'errors', 'startDate', 'enDate', 'logDate', 'depDate', 'replayDate', 'logField'],
			proxy: new Ext.data.HttpProxy({
				url: GetUrl('log/getJobLog.do'),
				method: 'POST'
			}),
			root:'rows',
			totalProperty: 'total'
		});
		
		var jobLogEntryStore = new Ext.data.JsonStore({
			fields: ['idBatch', 'channelId', 'logData', 'transName', 'setpName', 'linesRead', 'linesWritten', 'linesUpdated', 'linesInput', 
			         'linesOutput', 'linesRejected', 'errors', 'result', 'nrResultRows', 'nrResultFiles'],
			proxy: new Ext.data.HttpProxy({
				url: GetUrl('log/getJobLogEntry.do'),
				method: 'POST'
			}),
			root:'rows',
			totalProperty: 'total'
		});
		
		var jobLogChannelStore = new Ext.data.JsonStore({
			fields: ['idBatch', 'channelId', 'logData', 'loggingObjectType', 'objectName', 'objectCopy', 'repositoryDirectory', 'fileName', 'objectId', 
			         'objectRevision', 'parentChannelId', 'rootChannelId'],
			proxy: new Ext.data.HttpProxy({
				url: GetUrl('log/getJobLogChannel.do'),
				method: 'POST'
			}),
			root:'rows',
			totalProperty: 'total'
		});
		
		var tabPanel = new Ext.TabPanel({
			activeTab: 0,
			plain: true,
			items: [{
				title: '作业',
				xtype: 'grid',
				columns: [{
					header: 'ID_JOB', dataIndex: 'idJob', width: 80, sortable: true
				}, {
					header: 'CHANNEL_ID', dataIndex: 'channelId', width: 150
				}, {
					header: 'JOBNAME', dataIndex: 'jobName', width: 100, sortable: true
				}, {
					header: 'STATUS', dataIndex: 'status', width: 80
				}, {
					header: 'LINES_READ', dataIndex: 'linesRead', width: 80
				}, {
					header: 'LINES_WRITTEN', dataIndex: 'linesWritten', width: 80
				}, {
					header: 'LINES_UPDATED', dataIndex: 'linesUpdated', width: 80
				}, {
					header: 'LINES_INPUT', dataIndex: 'linesInput', width: 80
				}, {
					header: 'LINES_OUTPUT', dataIndex: 'linesOutput', width: 80
				}, {
					header: 'LINES_REJECTED', dataIndex: 'linesRejected', width: 80
				}, {
					header: 'ERRORS', dataIndex: 'errors', width: 80
				}, {
					header: 'STARTDATE', dataIndex: 'startDate', width: 150, sortable: true
				}, {
					header: 'ENDDATE', dataIndex: 'enDate', width: 150, sortable: true
				}, {
					header: 'LOGDATE', dataIndex: 'logDate', width: 150, sortable: true
				}, {
					header: 'DEPDATE', dataIndex: 'depDate', width: 150, sortable: true
				}, {
					header: 'REPLAYDATE', dataIndex: 'replayDate', width: 150, sortable: true
				}, {
					header: 'LOG_FIELD', dataIndex: 'logField', width: 300
				}],
				store: jobLogJobStore,
				bbar: new Ext.PagingToolbar({
		            store: jobLogJobStore,  
		            pageSize: 15,
		            displayInfo: true,  
		            dock: 'bottom',
		            displayMsg: '显示第{0}条到{1}条记录,共{2}条记录',  
		            emptyMsg: "没有记录",  
		            beforePageText: '第',
                    afterPageText: '页/共{0}页'
				})
			}, {
				title: '作业项',
				xtype: 'grid',
				columns: [{
					header: 'ID_BATCH', dataIndex: 'idBatch', width: 80, sortable: true
				}, {
					header: 'CHANNEL_ID', dataIndex: 'channelId', width: 150
				}, {
					header: 'LOG_DATE', dataIndex: 'logData', width: 100, sortable: true
				}, {
					header: 'TRANSNAME', dataIndex: 'transName', width: 80, sortable: true
				}, {
					header: 'STEPNAME', dataIndex: 'setpName', width: 80, sortable: true
				}, {
					header: 'LINES_READ', dataIndex: 'linesRead', width: 80
				}, {
					header: 'LINES_WRITTEN', dataIndex: 'linesWritten', width: 80
				}, {
					header: 'LINES_UPDATED', dataIndex: 'linesUpdated', width: 80
				}, {
					header: 'LINES_INPUT', dataIndex: 'linesInput', width: 80
				}, {
					header: 'LINES_OUTPUT', dataIndex: 'linesOutput', width: 80
				}, {
					header: 'LINES_REJECTED', dataIndex: 'linesRejected', width: 80
				}, {
					header: 'ERRORS', dataIndex: 'errors', width: 150
				}, {
					header: 'RESULT', dataIndex: 'result', width: 150,
				}, {
					header: 'NR_RESULT_ROWS', dataIndex: 'nrResultRows', width: 150
				}, {
					header: 'NR_RESULT_FILES', dataIndex: 'nrResultFiles', width: 150
				}],
				store: jobLogEntryStore,
				bbar: new Ext.PagingToolbar({
		            store: jobLogEntryStore,  
		            pageSize: 15,
		            displayInfo: true,  
		            dock: 'bottom',
		            displayMsg: '显示第{0}条到{1}条记录,共{2}条记录',  
		            emptyMsg: "没有记录",  
		            beforePageText: '第',
                    afterPageText: '页/共{0}页'
				})
			}, {
				title: '日志通道',
				xtype: 'grid',
				columns: [{
					header: 'ID_BATCH', dataIndex: 'idBatch', width: 80, sortable: true
				}, {
					header: 'CHANNEL_ID', dataIndex: 'channelId', width: 150
				}, {
					header: 'LOG_DATE', dataIndex: 'logData', width: 100, sortable: true
				}, {
					header: 'LOGGING_OBJECT_TYPE', dataIndex: 'loggingObjectType', width: 80, sortable: true
				}, {
					header: 'OBJECT_NAME', dataIndex: 'objectName', width: 80, sortable: true
				}, {
					header: 'OBJECT_COPY', dataIndex: 'objectCopy', width: 80
				}, {
					header: 'REPOSITORY_DIRECTORY', dataIndex: 'repositoryDirectory', width: 80
				}, {
					header: 'FILENAME', dataIndex: 'fileName', width: 80
				}, {
					header: 'OBJECT_ID', dataIndex: 'objectId', width: 80
				}, {
					header: 'OBJECT_REVISION', dataIndex: 'objectRevision', width: 80
				}, {
					header: 'PARENT_CHANNEL_ID', dataIndex: 'parentChannelId', width: 80
				}, {
					header: 'ROOT_CHANNEL_ID', dataIndex: 'rootChannelId', width: 150
				}],
				store: jobLogChannelStore,
				bbar: new Ext.PagingToolbar({
		            store: jobLogChannelStore,  
		            pageSize: 15,
		            displayInfo: true,  
		            dock: 'bottom',
		            displayMsg: '显示第{0}条到{1}条记录,共{2}条记录',  
		            emptyMsg: "没有记录",  
		            beforePageText: '第',
                    afterPageText: '页/共{0}页'
				})
			}]
		});
		this.items = tabPanel;
		
		jobLogJobStore.load({params:{start:0, limit:15}});
		jobLogEntryStore.load({params:{start:0, limit:15}});
		jobLogChannelStore.load({params:{start:0, limit:15}});
		
		JobLogManageTab.superclass.initComponent.call(this);
	}
});