package org.flhy.webapp.repository.controller;

import java.io.IOException;
import java.io.OutputStream;
import java.net.URLDecoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.flhy.webapp.utils.Constants;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/mxgraph")
public class MxgraphController {

	/**
	 * 保存mxgraph流程图
	 * @throws IOException 
	 * 
	 */
	@RequestMapping(value = "/save")
	@ResponseBody
	public void save(HttpServletRequest request, HttpServletResponse response) throws IOException {
		if (request.getContentLength() < Constants.MAX_REQUEST_SIZE){
			String filename = request.getParameter("filename");
			String xml = request.getParameter("xml");

			if (filename == null)
			{
				filename = "export";
			}
			
			if (xml != null && xml.length() > 0)
			{
				String format = request.getParameter("format");

				if (format == null)
				{
					format = "xml";
				}

				if (!filename.toLowerCase().endsWith("." + format))
				{
					filename += "." + format;
				}
				
				// Decoding is optional (no plain text values allowed)
				if (xml != null && xml.startsWith("%3C"))
				{
					xml = URLDecoder.decode(xml, "UTF-8");
				}

				response.setContentType("text/plain");
				response.setHeader("Content-Disposition",
						"attachment; filename=\"" + filename
								+ "\"; filename*=UTF-8''" + filename);
				response.setStatus(HttpServletResponse.SC_OK);

				OutputStream out = response.getOutputStream();
				out.write(xml.getBytes("UTF-8"));
				out.flush();
				out.close();
			}
			else
			{
				response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			}
		}
		else
		{
			response.setStatus(HttpServletResponse.SC_REQUEST_ENTITY_TOO_LARGE);
		}
	}
}
