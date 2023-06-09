package com.dim.autotestAPI.REST.assemblers;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import com.dim.autotestAPI.REST.models.AlumnoPostModel;
import com.dim.autotestAPI.entidades.AlumnoConID;
import com.dim.autotestAPI.REST.controllers.AlumnoController;

@Component
public class AlumnoPostAssembler implements RepresentationModelAssembler<AlumnoConID, AlumnoPostModel> {

	@Override
	public AlumnoPostModel toModel(AlumnoConID entity) {
		AlumnoPostModel model = new AlumnoPostModel();
		model.setNombre(entity.getNombre());
		model.setApellidos(entity.getApellidos());

		// Para la relacion
		model.add(
				linkTo(methodOn(AlumnoController.class).one(((AlumnoConID) entity).getId())).withSelfRel(),
		     	linkTo(methodOn(AlumnoController.class).examenes(entity.getId())).withRel("examenes")
				);
		return model;
	}

	public AlumnoConID toEntity(AlumnoPostModel model) {
		AlumnoConID entity = new AlumnoConID();
		entity.setNombre(model.getNombre());
		entity.setApellidos(model.getApellidos());

		// Para la releacion
		// No necesitamos nada aqui.
		return entity;
	}

}
