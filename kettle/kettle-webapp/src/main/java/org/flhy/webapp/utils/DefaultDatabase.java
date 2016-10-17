/**
 * 
 */
package org.flhy.webapp.utils;

import org.pentaho.di.core.database.DatabaseMeta;

/**
 * @ClassName DefaultDatabase
 * @Package org.flhy.webapp.utils
 * @Description TODO
 * @author cjw
 * @copyRight 续日科技 solar
 * @Date 2016年10月10日
 * @Version V1.0.0
 *
 */
public class DefaultDatabase {

	public static DatabaseMeta getDefaultDataBase(){
		DatabaseMeta databaseMeta = new DatabaseMeta();
		
		databaseMeta.setDisplayName("myOracle");
		databaseMeta.setHostname("127.0.0.1");
		databaseMeta.setDBName("orcl");
		databaseMeta.setDBPort("1521");
		databaseMeta.setName("c##cjw");
		databaseMeta.setPassword("123456");
		
		return databaseMeta;
	}
}
