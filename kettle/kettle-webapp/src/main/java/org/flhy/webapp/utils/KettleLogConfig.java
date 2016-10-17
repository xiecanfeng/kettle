/**
 * 
 */
package org.flhy.webapp.utils;

import java.util.ArrayList;
import java.util.List;

import org.pentaho.di.core.database.DatabaseMeta;
import org.pentaho.di.core.logging.ChannelLogTable;
import org.pentaho.di.core.logging.JobEntryLogTable;
import org.pentaho.di.core.logging.JobLogTable;
import org.pentaho.di.core.logging.MetricsLogTable;
import org.pentaho.di.core.logging.PerformanceLogTable;
import org.pentaho.di.core.logging.StepLogTable;
import org.pentaho.di.core.logging.TransLogTable;
import org.pentaho.di.job.JobMeta;
import org.pentaho.di.trans.TransMeta;

/**
 * @ClassName KettleLogConfig
 * @Package org.flhy.webapp.utils
 * @Description TODO
 * @author cjw
 * @copyRight 续日科技 solar
 * @Date 2016年9月28日
 * @Version V1.0.0
 *
 */
public class KettleLogConfig {

	/**
	 * 转换日志配置
	 * @param databaseMeta
	 * @return
	 */
	public static TransMeta getTransMeta(DatabaseMeta databaseMeta){

		TransMeta transMeta = new TransMeta();

		List<DatabaseMeta> databaseMetas = new ArrayList<DatabaseMeta>();
		databaseMetas.add(databaseMeta);
		transMeta.setDatabases(databaseMetas);
		
		String connName = databaseMeta.getDisplayName();
		
		TransLogTable transLogTable = transMeta.getTransLogTable();
		transLogTable.setConnectionName(connName);
	    transLogTable.setTableName("trans_log");
	    transMeta.setTransLogTable(transLogTable);
	
	    StepLogTable stepLogTable = transMeta.getStepLogTable();
	    stepLogTable.setConnectionName(connName);
	    stepLogTable.setTableName("trans_step_log");
	    transMeta.setStepLogTable(stepLogTable);
	    
	    PerformanceLogTable performanceLogTable = transMeta.getPerformanceLogTable();
	    performanceLogTable.setConnectionName(connName);
	    performanceLogTable.setTableName("trans_performance_log");
	    transMeta.setPerformanceLogTable(performanceLogTable);
	    
	    ChannelLogTable channelLogTable = transMeta.getChannelLogTable();
	    channelLogTable.setConnectionName(connName);
	    channelLogTable.setTableName("trans_channel_log");
	    transMeta.setChannelLogTable(channelLogTable);
	    
	    MetricsLogTable metricsLogTable = transMeta.getMetricsLogTable();
	    metricsLogTable.setConnectionName(connName);
	    metricsLogTable.setTableName("trans_metrics_log");
	    transMeta.setMetricsLogTable(metricsLogTable);
	    
	    return transMeta;
	}
	
	/**
	 * 作业日志配置
	 * @param databaseMeta
	 * @return 
	 */
	public static JobMeta getJobMeta(DatabaseMeta databaseMeta){

		JobMeta jobMeta = new JobMeta();

		List<DatabaseMeta> databaseMetas = new ArrayList<DatabaseMeta>();
		databaseMetas.add(databaseMeta);
		jobMeta.setDatabases(databaseMetas);
		
		String connName = databaseMeta.getDisplayName();
		
		JobLogTable jobLogTable = jobMeta.getJobLogTable();
		jobLogTable.setConnectionName(connName);
	    jobLogTable.setTableName("job_log");
	    jobMeta.setJobLogTable(jobLogTable);
	    
	    ChannelLogTable channelLogTable = jobMeta.getChannelLogTable();
	    channelLogTable.setConnectionName(connName);
	    channelLogTable.setTableName("job_channel_log");
	    jobMeta.setChannelLogTable(channelLogTable);
	
	    JobEntryLogTable jobEntryLogTable = jobMeta.getJobEntryLogTable();
	    jobEntryLogTable.setConnectionName(connName);
	    jobEntryLogTable.setTableName("job_entry_Log");
	    jobMeta.setJobEntryLogTable(jobEntryLogTable);
	    
	    return jobMeta;
	}
}
