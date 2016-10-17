package org.flhy.webapp.repository.controller;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.flhy.ext.App;
import org.flhy.ext.utils.JSONObject;
import org.flhy.ext.utils.JsonUtils;
import org.flhy.webapp.utils.DefaultDatabase;
import org.pentaho.di.core.database.Database;
import org.pentaho.di.core.database.DatabaseMeta;
import org.pentaho.di.core.exception.KettleException;
import org.pentaho.di.core.logging.LoggingObjectInterface;
import org.pentaho.di.core.logging.LoggingObjectType;
import org.pentaho.di.core.logging.SimpleLoggingObject;
import org.pentaho.di.repository.Repository;
import org.pentaho.di.repository.kdr.KettleDatabaseRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/log")
public class LogController extends BaseController{

	/**
	 * 获取转换日志
	 * @throws IOException
	 * @throws KettleException
	 */
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, value = "/getTransLog")
	protected void getTransLog(int start, int limit,ModelMap model) throws IOException, KettleException {
		
		StringBuffer sql = new StringBuffer("SELECT * FROM (SELECT T.*, ROWNUM RN FROM (SELECT ID_BATCH,CHANNEL_ID,TRANSNAME,STATUS,LINES_READ,LINES_WRITTEN,LINES_UPDATED,LINES_INPUT,");
		sql.append("LINES_OUTPUT,LINES_REJECTED,ERRORS,STARTDATE,ENDDATE,LOGDATE,DEPDATE,REPLAYDATE,LOG_FIELD FROM TRANS_LOG ORDER BY ID_BATCH) T ");
		sql.append("WHERE ROWNUM <= "+(start+limit)+") WHERE RN > "+(start)+"");
		
		String totalSql = "SELECT COUNT(*) FROM TRANS_LOG";
		
		App app = (App) model.get("app");
		Repository repository = app.getRepository();
		
//		Repository repository = App.getInstance().getRepository();
		
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		
		JSONObject result = new JSONObject();
		
		DatabaseMeta connection = new DatabaseMeta();
		if(repository.isConnected()){
			KettleDatabaseRepository kdr = (KettleDatabaseRepository)repository;
			connection = kdr.getDatabase().getDatabaseMeta();
		}else{
			connection = DefaultDatabase.getDefaultDataBase();
		}
		Database db = new Database(loggingObject, connection); 
		
		try {
			db.connect();
			
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				
			List<Object[]> rows = db.getRows(sql.toString(),10000);
			
			List<Object[]> totalRows = db.getRows(totalSql, 100);
			
			String total = totalRows.get(0)[0].toString();
			
			for(Object[] row : rows){

				Map<String, Object> map = new HashMap<String, Object>();
				map.put("idBatch", row[0]);
				map.put("channelId", row[1]);
				map.put("transName", row[2]);
				map.put("status", row[3]);
				map.put("linesRead", row[4]);
				map.put("linesWritten", row[5]);
				map.put("linesUpdated", row[6]);
				map.put("linesInput", row[7]);
				map.put("linesOutput", row[8]);
				map.put("linesRejected", row[9]);
				map.put("errors", row[10]);
				map.put("startDate", row[11] == null?"":sdf.format(row[11]));
				map.put("enDate", row[12] == null?"":sdf.format(row[12]));
				map.put("depDate", row[13] == null?"":sdf.format(row[13]));
				map.put("logDate", row[14] == null?"":sdf.format(row[14]));
				map.put("replayDate", row[15] == null?"":sdf.format(row[15]));
				map.put("logField", row[16]);
				
				list.add(map);
			}
			result.put("rows", list);
			result.put("total", total);
		} finally {
			db.disconnect();
		}
		
		JsonUtils.response(result);
	}
	
	/**
	 * 获取步骤日志
	 * @throws IOException
	 * @throws KettleException
	 */
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, value = "/getTransLogStep")
	protected void getTransLogStep(int start, int limit,ModelMap model) throws IOException, KettleException {
		
		StringBuffer sql = new StringBuffer("SELECT * FROM (SELECT T.*, ROWNUM RN FROM (SELECT ID_BATCH,CHANNEL_ID,LOG_DATE,TRANSNAME,STEPNAME,STEP_COPY,");
		sql.append("LINES_READ,LINES_WRITTEN,LINES_UPDATED,LINES_INPUT,LINES_OUTPUT,LINES_REJECTED,ERRORS FROM TRANS_STEP_LOG ORDER BY ID_BATCH) T ");
		sql.append("WHERE ROWNUM <= "+(start+limit)+") WHERE RN > "+(start)+"");
		
		String totalSql = "SELECT COUNT(*) FROM TRANS_STEP_LOG";
		
		App app = (App)model.get("app");
		Repository repository = app.getRepository();
		
//		Repository repository = App.getInstance().getRepository();
		
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		
		JSONObject result = new JSONObject();
		
		DatabaseMeta connection = new DatabaseMeta();
		if(repository.isConnected()){
			KettleDatabaseRepository kdr = (KettleDatabaseRepository)repository;
			connection = kdr.getDatabase().getDatabaseMeta();
		}else{
			connection = DefaultDatabase.getDefaultDataBase();
		}
		Database db = new Database(loggingObject, connection); 
		
		try {
			db.connect();
			
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				
			List<Object[]> rows = db.getRows(sql.toString(),10000);
			
			List<Object[]> totalRows = db.getRows(totalSql, 100);
			
			String total = totalRows.get(0)[0].toString();
			
			for(Object[] row : rows){

				Map<String, Object> map = new HashMap<String, Object>();
				map.put("idBatch", row[0]);
				map.put("channelId", row[1]);
				map.put("logDate", row[2]== null?"":sdf.format(row[2]));
				map.put("transName", row[3]);
				map.put("stepName", row[4]);
				map.put("stepCopy", row[5]);
				map.put("linesRead", row[6]);
				map.put("linesWritten", row[7]);
				map.put("linesUpdated", row[8]);
				map.put("linesInput", row[9]);
				map.put("linesOutput", row[10]);
				map.put("linesRejected", row[11]);
				map.put("errors", row[12]);
				
				list.add(map);
			}
			result.put("rows", list);
			result.put("total", total);
		} finally {
			db.disconnect();
		}
		
		JsonUtils.response(result);
	}
	
	/**
	 * 获取步骤日志
	 * @throws IOException
	 * @throws KettleException
	 */
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, value = "/getTransLogRunning")
	protected void getTransLogRunning(int start, int limit, ModelMap model) throws IOException, KettleException {
		
		StringBuffer sql = new StringBuffer("SELECT * FROM (SELECT T.*, ROWNUM RN FROM (SELECT ID_BATCH,SEQ_NR,LOGDATE,TRANSNAME,STEPNAME,STEP_COPY,");
		sql.append("LINES_READ,LINES_WRITTEN,LINES_UPDATED,LINES_INPUT,LINES_OUTPUT,LINES_REJECTED,ERRORS,INPUT_BUFFER_ROWS,OUTPUT_BUFFER_ROWS FROM TRANS_PERFORMANCE_LOG ORDER BY ID_BATCH) T ");
		sql.append("WHERE ROWNUM <= "+(start+limit)+") WHERE RN > "+(start)+"");
		
		String totalSql = "SELECT COUNT(*) FROM TRANS_PERFORMANCE_LOG";
		
		App app = (App) model.get("app");
		Repository repository = app.getRepository();
		
//		Repository repository = App.getInstance().getRepository();
		
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		
		JSONObject result = new JSONObject();
		
		DatabaseMeta connection = new DatabaseMeta();
		if(repository.isConnected()){
			KettleDatabaseRepository kdr = (KettleDatabaseRepository)repository;
			connection = kdr.getDatabase().getDatabaseMeta();
		}else{
			connection = DefaultDatabase.getDefaultDataBase();
		}
		Database db = new Database(loggingObject, connection); 
		
		try {
			db.connect();
			
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				
			List<Object[]> rows = db.getRows(sql.toString(),10000);
			
			List<Object[]> totalRows = db.getRows(totalSql, 100);
			
			String total = totalRows.get(0)[0].toString();
			
			for(Object[] row : rows){

				Map<String, Object> map = new HashMap<String, Object>();
				map.put("idBatch", row[0]);
				map.put("seqNr", row[1]);
				map.put("logDate", row[2]== null?"":sdf.format(row[2]));
				map.put("transName", row[3]);
				map.put("stepName", row[4]);
				map.put("stepCopy", row[5]);
				map.put("linesRead", row[6]);
				map.put("linesWritten", row[7]);
				map.put("linesUpdated", row[8]);
				map.put("linesInput", row[9]);
				map.put("linesOutput", row[10]);
				map.put("linesRejected", row[11]);
				map.put("errors", row[12]);
				map.put("inputBufferRows", row[13]);
				map.put("outputBufferRows", row[14]);
				
				list.add(map);
			}
			result.put("rows", list);
			result.put("total", total);
		} finally {
			db.disconnect();
		}
		
		JsonUtils.response(result);
	}
	
	/**
	 * 获取日志通道
	 * @throws IOException
	 * @throws KettleException
	 */
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, value = "/getTransLogChannel")
	protected void getTransLogChannel(int start, int limit,ModelMap model) throws IOException, KettleException {
		
		StringBuffer sql = new StringBuffer("SELECT * FROM (SELECT T.*, ROWNUM RN FROM (SELECT ID_BATCH,CHANNEL_ID,LOG_DATE,LOGGING_OBJECT_TYPE,OBJECT_NAME,OBJECT_COPY,");
		sql.append("REPOSITORY_DIRECTORY,FILENAME,OBJECT_ID,OBJECT_REVISION,PARENT_CHANNEL_ID,ROOT_CHANNEL_ID FROM TRANS_CHANNEL_LOG ORDER BY ID_BATCH) T ");
		sql.append("WHERE ROWNUM <= "+(start+limit)+") WHERE RN > "+(start)+"");
		
		String totalSql = "SELECT COUNT(*) FROM TRANS_CHANNEL_LOG";
		
		App app = (App) model.get("app");
		Repository repository = app.getRepository();
		
//		Repository repository = App.getInstance().getRepository();
		
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		
		JSONObject result = new JSONObject();
		
		DatabaseMeta connection = new DatabaseMeta();
		if(repository.isConnected()){
			KettleDatabaseRepository kdr = (KettleDatabaseRepository)repository;
			connection = kdr.getDatabase().getDatabaseMeta();
		}else{
			connection = DefaultDatabase.getDefaultDataBase();
		}
		Database db = new Database(loggingObject, connection); 
		
		try {
			db.connect();
			
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				
			List<Object[]> rows = db.getRows(sql.toString(),10000);
			
			List<Object[]> totalRows = db.getRows(totalSql, 100);
			
			String total = totalRows.get(0)[0].toString();
			
			for(Object[] row : rows){

				Map<String, Object> map = new HashMap<String, Object>();
				map.put("idBatch", row[0]);
				map.put("channelId", row[1]);
				map.put("logDate", row[2]== null?"":sdf.format(row[2]));
				map.put("loggingObjectType", row[3]);
				map.put("objectName", row[4]);
				map.put("objectCopy", row[5]);
				map.put("repositoryDirectory", row[6]);
				map.put("fileName", row[7]);
				map.put("objectId", row[8]);
				map.put("objectRevision", row[9]);
				map.put("parentChannelId", row[10]);
				map.put("rootChannelId", row[11]);
				
				list.add(map);
			}
			result.put("rows", list);
			result.put("total", total);
		} finally {
			db.disconnect();
		}
		
		JsonUtils.response(result);
	}
	
	/**
	 * 获取Metrics
	 * @throws IOException
	 * @throws KettleException
	 */
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, value = "/getTransLogMetrics")
	protected void getTransLogMetrics(int start, int limit, ModelMap model) throws IOException, KettleException {
		
		StringBuffer sql = new StringBuffer("SELECT * FROM (SELECT T.*, ROWNUM RN FROM (SELECT ID_BATCH,CHANNEL_ID,LOG_DATE,METRICS_DATE,METRICS_CODE,METRICS_DESCRIPTION,");
		sql.append("METRICS_SUBJECT,METRICS_TYPE,METRICS_VALUE FROM TRANS_METRICS_LOG ORDER BY ID_BATCH) T ");
		sql.append("WHERE ROWNUM <= "+(start+limit)+") WHERE RN > "+(start)+"");
		
		String totalSql = "SELECT COUNT(*) FROM TRANS_METRICS_LOG";
		
		App app = (App) model.get("app");
		Repository repository = app.getRepository();
		
//		Repository repository = App.getInstance().getRepository();
		
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		
		JSONObject result = new JSONObject();
		
		DatabaseMeta connection = new DatabaseMeta();
		if(repository.isConnected()){
			KettleDatabaseRepository kdr = (KettleDatabaseRepository)repository;
			connection = kdr.getDatabase().getDatabaseMeta();
		}else{
			connection = DefaultDatabase.getDefaultDataBase();
		}
		Database db = new Database(loggingObject, connection); 
		
		try {
			db.connect();
			
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				
			List<Object[]> rows = db.getRows(sql.toString(),10000);
			
			List<Object[]> totalRows = db.getRows(totalSql, 100);
			
			String total = totalRows.get(0)[0].toString();
			
			for(Object[] row : rows){

				Map<String, Object> map = new HashMap<String, Object>();
				map.put("idBatch", row[0]);
				map.put("channelId", row[1]);
				map.put("logDate", row[2]== null?"":sdf.format(row[2]));
				map.put("metricsDate", row[3]== null?"":sdf.format(row[3]));
				map.put("metricsCode", row[4]);
				map.put("metricsDescription", row[5]);
				map.put("metricsSubject", row[6]);
				map.put("metricsType", row[7]);
				map.put("metricsVale", row[8]);
				
				list.add(map);
			}
			result.put("rows", list);
			result.put("total", total);
		} finally {
			db.disconnect();
		}
		
		JsonUtils.response(result);
	}
	
	/**
	 * 获取作业日志
	 * @throws IOException
	 * @throws KettleException
	 */
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, value = "/getJobLog")
	protected void getJobLog(int start, int limit,ModelMap model) throws IOException, KettleException {
		
		StringBuffer sql = new StringBuffer("SELECT * FROM (SELECT T.*, ROWNUM RN FROM (SELECT ID_JOB,CHANNEL_ID,JOBNAME,STATUS,LINES_READ,LINES_WRITTEN,");
		sql.append("LINES_UPDATED,LINES_INPUT,LINES_OUTPUT,LINES_REJECTED,ERRORS,STARTDATE,ENDDATE,LOGDATE,DEPDATE,REPLAYDATE,LOG_FIELD FROM JOB_LOG ORDER BY ID_JOB) T ");
		sql.append("WHERE ROWNUM <= "+(start+limit)+") WHERE RN > "+(start)+"");
		
		String totalSql = "SELECT COUNT(*) FROM JOB_LOG";
		
		App app = (App) model.get("app");
		Repository repository = app.getRepository();
		
//		Repository repository = App.getInstance().getRepository();
		
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		
		JSONObject result = new JSONObject();
		
		DatabaseMeta connection = new DatabaseMeta();
		if(repository.isConnected()){
			KettleDatabaseRepository kdr = (KettleDatabaseRepository)repository;
			connection = kdr.getDatabase().getDatabaseMeta();
		}else{
			connection = DefaultDatabase.getDefaultDataBase();
		}
		Database db = new Database(loggingObject, connection); 
		
		try {
			db.connect();
			
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				
			List<Object[]> rows = db.getRows(sql.toString(),10000);
			
			List<Object[]> totalRows = db.getRows(totalSql, 100);
			
			String total = totalRows.get(0)[0].toString();
			
			for(Object[] row : rows){

				Map<String, Object> map = new HashMap<String, Object>();
				map.put("idJob", row[0]);
				map.put("channelId", row[1]);
				map.put("jobName", row[2]);
				map.put("status", row[3]);
				map.put("linesRead", row[4]);
				map.put("linesWritten", row[5]);
				map.put("linesUpdated", row[6]);
				map.put("linesInput", row[7]);
				map.put("linesOutput", row[8]);
				map.put("linesRejected", row[9]);
				map.put("errors", row[10]);
				map.put("startDate", row[11] == null?"":sdf.format(row[11]));
				map.put("enDate", row[12] == null?"":sdf.format(row[12]));
				map.put("depDate", row[13] == null?"":sdf.format(row[13]));
				map.put("logDate", row[14] == null?"":sdf.format(row[14]));
				map.put("replayDate", row[15] == null?"":sdf.format(row[15]));
				map.put("logField", row[16]);
				
				list.add(map);
			}
			result.put("rows", list);
			result.put("total", total);
		} finally {
			db.disconnect();
		}
		
		JsonUtils.response(result);
	}
	
	/**
	 * 获取作业项
	 * @throws IOException
	 * @throws KettleException
	 */
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, value = "/getJobLogChannel")
	protected void getJobLogChannel(int start, int limit,ModelMap model) throws IOException, KettleException {
		
		StringBuffer sql = new StringBuffer("SELECT * FROM (SELECT T.*, ROWNUM RN FROM (SELECT ID_BATCH,CHANNEL_ID,LOG_DATE,LOGGING_OBJECT_TYPE,OBJECT_NAME,OBJECT_COPY,");
		sql.append("REPOSITORY_DIRECTORY,FILENAME,OBJECT_ID,OBJECT_REVISION,PARENT_CHANNEL_ID,ROOT_CHANNEL_ID FROM JOB_CHANNEL_LOG ORDER BY ID_BATCH) T ");
		sql.append("WHERE ROWNUM <= "+(start+limit)+") WHERE RN > "+(start)+"");
		
		String totalSql = "SELECT COUNT(*) FROM JOB_CHANNEL_LOG";
		
		App app = (App) model.get("app");
		Repository repository = app.getRepository();
		
//		Repository repository = App.getInstance().getRepository();
		
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		
		JSONObject result = new JSONObject();
		
		DatabaseMeta connection = new DatabaseMeta();
		if(repository.isConnected()){
			KettleDatabaseRepository kdr = (KettleDatabaseRepository)repository;
			connection = kdr.getDatabase().getDatabaseMeta();
		}else{
			connection = DefaultDatabase.getDefaultDataBase();
		}
		Database db = new Database(loggingObject, connection); 
		
		try {
			db.connect();
			
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				
			List<Object[]> rows = db.getRows(sql.toString(),10000);
			
			List<Object[]> totalRows = db.getRows(totalSql, 100);
			
			String total = totalRows.get(0)[0].toString();
			
			for(Object[] row : rows){

				Map<String, Object> map = new HashMap<String, Object>();
				map.put("idBatch", row[0]);
				map.put("channelId", row[1]);
				map.put("logData", row[2] == null?"":sdf.format(row[2]));
				map.put("loggingObjectType", row[3]);
				map.put("objectName", row[4]);
				map.put("objectCopy", row[5]);
				map.put("repositoryDirectory", row[6]);
				map.put("fileName", row[7]);
				map.put("objectId", row[8]);
				map.put("objectRevision", row[9]);
				map.put("parentChannelId", row[10]);
				map.put("rootChannelId", row[11]);
				
				list.add(map);
			}
			result.put("rows", list);
			result.put("total", total);
		} finally {
			db.disconnect();
		}
		
		JsonUtils.response(result);
	}
	
	/**
	 * 获取日志通道
	 * @throws IOException
	 * @throws KettleException
	 */
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, value = "/getJobLogEntry")
	protected void getJobLogEntry(int start, int limit,ModelMap model) throws IOException, KettleException {
		
		StringBuffer sql = new StringBuffer("SELECT * FROM (SELECT T.*, ROWNUM RN FROM (SELECT ID_BATCH,CHANNEL_ID,LOG_DATE,TRANSNAME,STEPNAME,LINES_READ,");
		sql.append("LINES_WRITTEN,LINES_UPDATED,LINES_INPUT,LINES_OUTPUT,LINES_REJECTED,ERRORS,RESULT,NR_RESULT_ROWS,NR_RESULT_FILES FROM JOB_ENTRY_LOG ORDER BY ID_BATCH) T ");
		sql.append("WHERE ROWNUM <= "+(start+limit)+") WHERE RN > "+(start)+"");
		
		String totalSql = "SELECT COUNT(*) FROM JOB_ENTRY_LOG";
		
		App app = (App) model.get("app");
		Repository repository = app.getRepository();
		
//		Repository repository = App.getInstance().getRepository();
		
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		
		JSONObject result = new JSONObject();
		
		DatabaseMeta connection = new DatabaseMeta();
		if(repository.isConnected()){
			KettleDatabaseRepository kdr = (KettleDatabaseRepository)repository;
			connection = kdr.getDatabase().getDatabaseMeta();
		}else{
			connection = DefaultDatabase.getDefaultDataBase();
		}
		Database db = new Database(loggingObject, connection); 
		
		try {
			db.connect();
			
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				
			List<Object[]> rows = db.getRows(sql.toString(),10000);
			
			List<Object[]> totalRows = db.getRows(totalSql, 100);
			
			String total = totalRows.get(0)[0].toString();
			
			for(Object[] row : rows){

				Map<String, Object> map = new HashMap<String, Object>();
				map.put("idBatch", row[0]);
				map.put("channelId", row[1]);
				map.put("logData", row[2] == null?"":sdf.format(row[2]));
				map.put("transName", row[3]);
				map.put("setpName", row[4]);
				map.put("linesRead", row[5]);
				map.put("linesWritten", row[6]);
				map.put("linesUpdated", row[7]);
				map.put("linesInput", row[8]);
				map.put("linesOutput", row[9]);
				map.put("linesRejected", row[10]);
				map.put("errors", row[11]);
				map.put("result", row[12]);
				map.put("nrResultRows", row[13]);
				map.put("nrResultFiles", row[14]);
				
				list.add(map);
			}
			result.put("rows", list);
			result.put("total", total);
		} finally {
			db.disconnect();
		}
		
		JsonUtils.response(result);
	}
	
	public static final LoggingObjectInterface loggingObject = new SimpleLoggingObject("LogController", LoggingObjectType.DATABASE, null );
}
