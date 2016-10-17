package org.flhy.ext.utils;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class PropertiesUtils {

	public static void main(String[] args) {
		Properties prop = new Properties();
		InputStream in = PropertiesUtils.class.getResourceAsStream("/database.properties");
		try {
			//加载输入流
			prop.load(in);
			String trim = prop.getProperty("username").trim();
			System.out.println(trim);
			/*wgserver = prop.getProperty("wgserver").trim();
			tableauUser = prop.getProperty("tableauUser").trim();*/
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 获取配置文件中的数据连接
	 * @param name 名称
	 * @return 返回名称对应的值
	 */
	public static String getCon(String name){
		String value = null;
		Properties prop = new Properties();
		InputStream in = PropertiesUtils.class.getResourceAsStream("/database.properties");
		try {
			//加载输入流
			prop.load(in);
			value = prop.getProperty(name).trim();
			/*wgserver = prop.getProperty("wgserver").trim();
			tableauUser = prop.getProperty("tableauUser").trim();*/
		} catch (IOException e) {
			e.printStackTrace();
		}
		return value;
	}
}
