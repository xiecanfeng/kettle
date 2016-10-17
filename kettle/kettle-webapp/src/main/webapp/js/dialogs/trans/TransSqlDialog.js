TransSqlDialog =  Ext.extend(Ext.Window, {
	title: '简单SQL编辑器',
	width: 1000,
	height: 500,
	closeAction: 'close',
	layout: 'fit',
	
	initComponent: function() {
		var textArea = this.items = new Ext.form.TextArea();
		this.initData = function(v) {
			textArea.setValue(v);
		};
		
		TextAreaDialog.superclass.initComponent.call(this);
	}
});
