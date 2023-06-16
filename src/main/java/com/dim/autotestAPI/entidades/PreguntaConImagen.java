package com.dim.autotestAPI.entidades;

import es.mde.acing.utils.ConImagen;

public class PreguntaConImagen extends PreguntaConID implements ConImagen{
	
	private String imagenURL;

	@Override
	public String getImagenURL() {
		return imagenURL;
	}

	public void setImagenURL(String imagenURL) {
		this.imagenURL = imagenURL;
	}
	
	@Override
	public Adjunto getAdjunto() {
		return Adjunto.imagen;
	}

}