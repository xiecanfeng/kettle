package org.flhy.ext.param;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.flhy.ext.utils.JSONArray;
import org.flhy.ext.utils.PropertiesUtils;

public class CommonParam {

	/**
	 * 获取所有的参数
	 * @return
	 */
	public List<Map<String, String>> getParam(){
		List<Map<String, String>> list = new ArrayList<Map<String, String>>();
		
		//获取配置文件里面的数据库连接
		String driver = PropertiesUtils.getCon("driver_class");
		String url = PropertiesUtils.getCon("url");
		String username = PropertiesUtils.getCon("username");
		String password = PropertiesUtils.getCon("password");
		String sql = "select name,value,description from COMMON_PARAMS";
		try
		{
			Class.forName(driver);//加载驱动程序，此处运用隐式注册驱动程序的方法
		}
		catch(ClassNotFoundException e)
		{
			e.printStackTrace();
		}
		try
		{
			Connection con = DriverManager.getConnection(url,username,password);//创建连接对象
			Statement st = con.createStatement();//创建sql执行对象
			ResultSet rs = st.executeQuery(sql);//执行sql语句并返回结果集
			while(rs.next())//对结果集进行遍历输出
			{
				Map<String, String> map = new HashMap<String, String>();
				map.put("name", rs.getString("name"));
				map.put("value", rs.getString("value"));
				map.put("description", rs.getString("description"));
				list.add(map);
			}
			//关闭相关的对象
			if(rs != null)
			{
				try
				{
					rs.close();
				}
				catch(SQLException e)
				{
					e.printStackTrace();
				}
			}
			if(st != null)
			{
				try
				{
					st.close();
				}
				catch(SQLException e)
				{
					e.printStackTrace();
				}
			}
			if(con !=null)
			{
				try
				{
					con.close();
				}
				catch(SQLException e)
				{
					e.printStackTrace();
				}
			}
		}
		catch(SQLException e)
		{
			e.printStackTrace();
		}
		return list;
	}
	
	/**
	 * 修改所有的参数
	 */
	public void editParam(JSONArray params){
		
		//获取配置文件里面的数据库连接
		String driver = PropertiesUtils.getCon("driver_class");
		String url = PropertiesUtils.getCon("url");
		String username = PropertiesUtils.getCon("username");
		String password = PropertiesUtils.getCon("password");
		String sql = "delete from COMMON_PARAMS";
		try
		{
			Class.forName(driver);//加载驱动程序，此处运用隐式注册驱动程序的方法
		}
		catch(ClassNotFoundException e)
		{
			e.printStackTrace();
		}
		try
		{
			Connection con = DriverManager.getConnection(url,username,password);//创建连接对象
			Statement st = con.createStatement();//创建sql执行对象
			ResultSet rs = st.executeQuery(sql);//执行sql语句并返回结果集
			
			StringBuffer editSql = new StringBuffer();
			editSql.append("insert into COMMON_PARAMS (NAME,VALUE,DESCRIPTION) values (?,?,?)");
			PreparedStatement pst = (PreparedStatement) con.prepareStatement(editSql.toString());
			
			Object[] array = params.toArray();
			for (int i = 0; i < array.length; i++) {
				Map object = (Map) array[i];
				String name = object.get("name")!=null?object.get("name").toString():"";
				pst.setString(1, name);
				pst.setString(2, object.get("value")!=null?object.get("value").toString():"");
				pst.setString(3, object.get("description")!=null?object.get("description").toString():"");
				pst.addBatch();
			}
			if(array!=null && array.length>0){
				// 执行批量更新
			    pst.executeBatch();
			}
		    // 语句执行完毕，提交本事务
		    con.commit();
			//关闭相关的对象
		    pst.close();
			if(rs != null)
			{
				try
				{
					rs.close();
				}
				catch(SQLException e)
				{
					e.printStackTrace();
				}
			}
			if(st != null)
			{
				try
				{
					st.close();
				}
				catch(SQLException e)
				{
					e.printStackTrace();
				}
			}
			if(con !=null)
			{
				try
				{
					con.close();
				}
				catch(SQLException e)
				{
					e.printStackTrace();
				}
			}
		}
		catch(SQLException e)
		{
			e.printStackTrace();
		}
	}
	
	/*@Test
	public void testGet(){
		getParam();
	}*/
	
}
