TransLogManageTab = Ext.extend(Ext.Panel, {
	title: '转换日志',
	layout: 'fit',
	initComponent: function() {
		
		var transLogTransStore = new Ext.data.JsonStore({
			fields: ['idBatch', 'channelId', 'transName', 'status', 'linesRead', 'linesWritten', 'linesUpdated', 'linesInput', 
			         'linesOutput', 'linesRejected', 'errors', 'startDate', 'enDate', 'logDate', 'depDate', 'replayDate', 'logField'],
			proxy: new Ext.data.HttpProxy({
				url: GetUrl('log/getTransLog.do'),
				method: 'POST'
			}),
			root:'rows',
			totalProperty: 'total'
		});
		
		var transLogStepStore = new Ext.data.JsonStore({
			fields: ['idBatch', 'channelId', 'logDate', 'transName', 'stepName', 'stepCopy', 'linesRead', 'linesWritten', 
			         'linesUpdated', 'linesInput', 'linesOutput', 'linesRejected', 'errors'],
			proxy: new Ext.data.HttpProxy({
				url: GetUrl('log/getTransLogStep.do'),
				method: 'POST'
			}),
			root:'rows',
			totalProperty: 'total'
		});
		
		var transLogRunningStore = new Ext.data.JsonStore({
			fields: ['idBatch', 'seqNr', 'logDate', 'transName', 'stepName', 'stepCopy', 'linesRead', 'linesWritten', 
			         'linesUpdated', 'linesInput', 'linesOutput', 'linesRejected', 'errors', 'inputBufferRows', 'outputBufferRows'],
			proxy: new Ext.data.HttpProxy({
				url: GetUrl('log/getTransLogRunning.do'),
				method: 'POST'
			}),
			root:'rows',
			totalProperty: 'total'
		});
		
		var transLogChannelStore = new Ext.data.JsonStore({
			fields: ['idBatch', 'channelId', 'logDate', 'loggingObjectType', 'objectName', 'objectCopy', 'repositoryDirectory', 'fileName', 
			         'objectId', 'objectRevision', 'parentChannelId', 'rootChannelId'],
			proxy: new Ext.data.HttpProxy({
				url: GetUrl('log/getTransLogChannel.do'),
				method: 'POST'
			}),
			root:'rows',
			totalProperty: 'total'
		});
		
		var transLogMetricsStore = new Ext.data.JsonStore({
			fields: ['idBatch', 'channelId', 'logDate', 'metricsDate', 'metricsCode', 'metricsDescription', 'metricsSubject', 'metricsType', 'metricsVale'],
			proxy: new Ext.data.HttpProxy({
				url: GetUrl('log/getTransLogMetrics.do'),
				method: 'POST'
			}),
			root:'rows',
			totalProperty: 'total'
		});
				
		var tabPanel = new Ext.TabPanel({
			activeTab: 0,
			plain: true,
			items: [{
				title: '转换',
				xtype: 'grid',
				columns: [{
					header: 'ID_BATCH', dataIndex: 'idBatch', width: 80, sortable: true
				}, {
					header: 'CHANNEL_ID', dataIndex: 'channelId', width: 150
				}, {
					header: 'TRANSNAME', dataIndex: 'transName', width: 100, sortable: true
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
				store: transLogTransStore,
				bbar: new Ext.PagingToolbar({
		            store: transLogTransStore,  
		            pageSize: 15,
		            displayInfo: true,  
		            dock: 'bottom',
		            displayMsg: '显示第{0}条到{1}条记录,共{2}条记录',  
		            emptyMsg: "没有记录",  
		            beforePageText: '第',
                    afterPageText: '页/共{0}页'
				})
			}, {
				title: '步骤',
				xtype: 'grid',
				columns: [{
					header: 'ID_BATCH', dataIndex: 'idBatch', width: 80, sortable: true
				}, {
					header: 'CHANNEL_ID', dataIndex: 'channelId', width: 150
				}, {
					header: 'LOG_DATE', dataIndex: 'logDate', width: 100, sortable: true
				}, {
					header: 'TRANSNAME', dataIndex: 'transName', width: 80, sortable: true
				}, {
					header: 'STEPNAME', dataIndex: 'stepName', width: 80, sortable: true
				}, {
					header: 'STEP_COPY', dataIndex: 'stepCopy', width: 80
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
					header: 'LINES_REJECTED', dataIndex: 'linesRejected', width: 150, 
				}, {
					header: 'ERRORS', dataIndex: 'errors', width: 150,
				}],
				store: transLogStepStore,
				bbar: new Ext.PagingToolbar({
		            store: transLogStepStore,  
		            pageSize: 15,
		            displayInfo: true,  
		            dock: 'bottom',
		            displayMsg: '显示第{0}条到{1}条记录,共{2}条记录',  
		            emptyMsg: "没有记录",  
		            beforePageText: '第',
                    afterPageText: '页/共{0}页'
				})
			}, {
				title: '运行',
				xtype: 'grid',
				columns: [{
					header: 'ID_BATCH', dataIndex: 'idBatch', width: 80, sortable: true
				}, {
					header: 'SEQ_NR', dataIndex: 'seqNr', width: 150
				}, {
					header: 'LOGDATE', dataIndex: 'logDate', width: 100, sortable: true
				}, {
					header: 'TRANSNAME', dataIndex: 'transName', width: 80, sortable: true
				}, {
					header: 'STEPNAME', dataIndex: 'stepName', width: 80, sortable: true
				}, {
					header: 'STEP_COPY', dataIndex: 'stepCopy', width: 80
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
					header: 'LINES_REJECTED', dataIndex: 'linesRejected', width: 150, 
				}, {
					header: 'ERRORS', dataIndex: 'errors', width: 150,
				}, {
					header: 'INPUT_BUFFER_ROWS', dataIndex: 'inputBufferRows', width: 150,
				}, {
					header: 'OUTPUT_BUFFER_ROWS', dataIndex: 'outputBufferRows', width: 150,
				}],
				store: transLogRunningStore,
				bbar: new Ext.PagingToolbar({
		            store: transLogRunningStore,  
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
					header: 'LOG_DATE', dataIndex: 'logDate', width: 100, sortable: true
				}, {
					header: 'LOGGING_OBJECT_TYPE', dataIndex: 'loggingObjectType', width: 80, sortable: true
				}, {
					header: 'OBJECT_NAME', dataIndex: 'objectName', width: 80, sortable: true
				}, {
					header: 'OBJECT_COPY', dataIndex: 'objectCopy', width: 80, sortable: true
				}, {
					header: 'REPOSITORY_DIRECTORY', dataIndex: 'repositoryDirectory', width: 80
				}, {
					header: 'FILENAME', dataIndex: 'fileName', width: 80, sortable: true
				}, {
					header: 'OBJECT_ID', dataIndex: 'objectId', width: 80
				}, {
					header: 'OBJECT_REVISION', dataIndex: 'objectRevision', width: 80
				}, {
					header: 'PARENT_CHANNEL_ID', dataIndex: 'parentChannelId', width: 80
				}, {
					header: 'ROOT_CHANNEL_ID', dataIndex: 'rootChannelId', width: 150, 
				}],
				store: transLogChannelStore,
				bbar: new Ext.PagingToolbar({
		            store: transLogChannelStore,  
		            pageSize: 15,
		            displayInfo: true,  
		            dock: 'bottom',
		            displayMsg: '显示第{0}条到{1}条记录,共{2}条记录',  
		            emptyMsg: "没有记录",  
		            beforePageText: '第',
                    afterPageText: '页/共{0}页'
				})
			}, {
				title: 'Metrice',
				xtype: 'grid',
				columns: [{
					header: 'ID_BATCH', dataIndex: 'idBatch', width: 80, sortable: true
				}, {
					header: 'CHANNEL_ID', dataIndex: 'channelId', width: 150
				}, {
					header: 'LOG_DATE', dataIndex: 'logDate', width: 100, sortable: true
				}, {
					header: 'METRICS_DATE', dataIndex: 'metricsDate', width: 80, sortable: true
				}, {
					header: 'METRICS_CODE', dataIndex: 'metricsCode', width: 80, sortable: true
				}, {
					header: 'METRICS_DESCRIPTION', dataIndex: 'metricsDescription', width: 80
				}, {
					header: 'METRICS_SUBJECT', dataIndex: 'metricsSubject', width: 80
				}, {
					header: 'METRICS_TYPE', dataIndex: 'metricsType', width: 80
				}, {
					header: 'METRICS_VALUE', dataIndex: 'metricsVale', width: 80
				}],
				store: transLogMetricsStore,
				bbar: new Ext.PagingToolbar({
		            store: transLogMetricsStore,  
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
		
		transLogTransStore.load({params:{start:0, limit:15}});
		transLogStepStore.load({params:{start:0, limit:15}});
		transLogRunningStore.load({params:{start:0, limit:15}});
		transLogChannelStore.load({params:{start:0, limit:15}});
		transLogMetricsStore.load({params:{start:0, limit:15}});
		
		TransLogManageTab.superclass.initComponent.call(this);
	}
});