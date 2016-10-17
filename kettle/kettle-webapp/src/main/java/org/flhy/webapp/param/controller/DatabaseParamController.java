package org.flhy.webapp.param.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.flhy.ext.App;
import org.flhy.ext.core.database.DatabaseCodec;
import org.flhy.ext.param.CommonParam;
import org.flhy.ext.utils.JSONArray;
import org.flhy.ext.utils.JSONObject;
import org.flhy.ext.utils.JsonUtils;
import org.flhy.webapp.repository.controller.BaseController;
import org.pentaho.di.core.database.DatabaseMeta;
import org.pentaho.di.core.exception.KettleException;
import org.pentaho.di.repository.Repository;
import org.pentaho.di.repository.kdr.KettleDatabaseRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

@Controller
@RequestMapping(value = "/databaseParam")
@SessionAttributes("app")
public class DatabaseParamController extends BaseController{

	/**
	 * 该方法返回所有的资源库信息
	 * 
	 * @throws KettleException 
	 * @throws IOException 
	 */
	@ResponseBody
	@RequestMapping(method = RequestMethod.GET, value = "/list")
	protected  List list(ModelMap model) throws KettleException, IOException {
		
		App app = (App) model.get("app");
		Repository repository = app.getRepository();
		
		String simpleName = repository.getClass().getSimpleName();
		if("KettleDatabaseRepository".equals(simpleName)){
			KettleDatabaseRepository kRepository = (KettleDatabaseRepository)repository;
			List<DatabaseMeta> databases = kRepository.getDatabases();
			ArrayList<JSONObject> list = new ArrayList<JSONObject>();
			for (DatabaseMeta database : databases) {
				JSONObject encode = DatabaseCodec.encode(database);
				list.add(encode);
			}
//			String databaseList = list.toString();
//			JsonUtils.responseXml(databaseList);
			return list;
		}
		return null;
	}
	
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, value = "/save")
	protected Map<String,Object> deleteInfo(String param){
		try {
			JSONArray fromObject = JSONArray.fromObject(param);
			CommonParam commonParam = new CommonParam();
			commonParam.editParam(fromObject);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} 
		return null;
	}
}
