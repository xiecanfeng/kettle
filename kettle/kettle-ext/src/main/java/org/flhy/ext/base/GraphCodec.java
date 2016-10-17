package org.flhy.ext.base;

import org.flhy.ext.App;
import org.pentaho.di.base.AbstractMeta;

public interface GraphCodec {

	public String encode(AbstractMeta meta,App app) throws Exception;
	public AbstractMeta decode(String graphXml,App app) throws Exception;
	
	public static final String TRANS_CODEC = "TransGraph";
	public static final String JOB_CODEC = "JobGraph";
	
}
