package org.flhy.webapp.param.controller;

public class Param {

	private String name;
	private String value;
	private String description;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	@Override
	public String toString() {
		return "Param [name=" + name + ", value=" + value + ", description="
				+ description + "]";
	}
	
}
