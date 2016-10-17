package org.flhy.webapp.param.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.flhy.ext.param.CommonParam;
import org.flhy.ext.utils.JSONArray;
import org.flhy.ext.utils.JSONObject;
import org.flhy.webapp.repository.controller.BaseController;
import org.pentaho.di.core.exception.KettleException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

@Controller
@RequestMapping(value = "/param")
@SessionAttributes("app")
public class ParamController extends BaseController{

	/**
	 * 该方法返回所有的资源库信息
	 * 
	 * @throws KettleException 
	 * @throws IOException 
	 */
	@ResponseBody
	@RequestMapping(method = RequestMethod.GET, value = "/list")
	protected  List list() throws KettleException, IOException {
		CommonParam commonParam = new CommonParam();
		List<Map<String, String>> param = commonParam.getParam();
		return param;
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
