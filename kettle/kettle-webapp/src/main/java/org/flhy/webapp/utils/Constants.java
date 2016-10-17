/**
 * 
 */
package org.flhy.webapp.utils;

import java.awt.image.BufferedImage;

/**
 * @ClassName Utils
 * @Package com.cjw.framework
 * @Description TODO
 * @author cjw
 * @copyRight 续日科技 solar
 * @Date 2016年9月18日
 * @Version V1.0.0
 *
 */
public class Constants {
	/**
	 * Contains an empty image.
	 */
	public static BufferedImage EMPTY_IMAGE;

	/**
	 * Initializes the empty image.
	 */
	static
	{
		try
		{
			EMPTY_IMAGE = new BufferedImage(1, 1, BufferedImage.TYPE_INT_RGB);
		}
		catch (Exception e)
		{
			// ignore
		}
	}

	/**
	 * Maximum size (in bytes) for request payloads. Default is 10485760 (10MB).
	 */
	public static final int MAX_REQUEST_SIZE = 10485760;

	/**
	 * Maximum area for exports. Default is 10000x10000px.
	 */
	public static final int MAX_AREA = 10000 * 10000;

}
