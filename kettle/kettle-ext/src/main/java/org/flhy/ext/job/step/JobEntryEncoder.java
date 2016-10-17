package org.flhy.ext.job.step;

import org.flhy.ext.App;
import org.pentaho.di.job.entry.JobEntryCopy;
import org.w3c.dom.Element;

public interface JobEntryEncoder {

	public Element encodeStep(JobEntryCopy jobEntry,App app) throws Exception;
	
}
