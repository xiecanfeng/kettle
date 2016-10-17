JobLogTab = Ext.extend(Ext.Panel, {
	title: '日志',
	layout: 'border',
	initComponent: function() {
		
		var content = new Ext.Panel({
			region: 'center',
			defaults: {border: false},
			layout: 'card',
			activeItem: 0,
			deferredRender: false,
			items: [{
				xtype: 'JobLogJob'
			},{
				xtype: 'JobLogEntry'
			},{
				xtype: 'JobLogChannel'
			}]
		});
		
		var listBox = new ListBox({
			region: 'west',
			width: 150,
			store: new Ext.data.JsonStore({
				fields: ['value','text'],
				data: [{value: 0, text: '作业'}, 
				       {value: 1, text: '作业项'}, 
				       {value: 2, text: '日志通道'}]
			}),
			value: 0
		});
		
		this.items = [listBox, content];
		
		this.getValues = function(){
			var jobLogTable = content.items.items[0].getJobLogTable();
			var entryLogTable = content.items.items[1].getEntryLogTable();
			var channelLogTable = content.items.items[2].getChannelLogTable();
			return {
				jobLogTable:Ext.encode(jobLogTable),
				entryLogTable:Ext.encode(entryLogTable),
				channelLogTable:Ext.encode(channelLogTable)
			};
		};
		
		TransLogTab.superclass.initComponent.call(this);
		
		listBox.on('valueChange', function(v) {
			setTimeout(function() {
				content.getLayout().setActiveItem(parseInt(v));
			}, 50);
		});
	}
});