package org.flhy.scheduler.controller;

import java.io.File;
import java.io.IOException;

import org.flhy.ext.App;
import org.pentaho.di.core.exception.KettleException;
import org.pentaho.di.repository.filerep.KettleFileRepository;
import org.pentaho.di.repository.filerep.KettleFileRepositoryMeta;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

@Controller
@SessionAttributes("app")
public class BaseScController {

	/**
	 * 资源库浏览，生成树结构
	 * 
	 * @throws KettleException 
	 * @throws IOException 
	 */
	@ModelAttribute
	protected @ResponseBody void explorers(ModelMap model) throws KettleException, IOException {
		
		Object object = model.get("app");
		if(object == null){
			App app = new App();
			File paths = new File("samples/repository");
			KettleFileRepositoryMeta meta = new KettleFileRepositoryMeta();
			meta.setBaseDirectory(paths.getAbsolutePath());
			meta.setDescription("default");
			meta.setName("default");
			meta.setReadOnly(false);
			meta.setHidingHiddenFiles(true);
			
			KettleFileRepository rep = new KettleFileRepository();
			rep.init(meta);
			app.initDefault(rep);
			model.addAttribute("app", app);
		}
		
	}
	
}
