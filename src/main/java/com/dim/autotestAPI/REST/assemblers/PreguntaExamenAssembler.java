package com.dim.autotestAPI.REST.assemblers;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import com.dim.autotestAPI.REST.models.PreguntaExamenModel;
import com.dim.autotestAPI.REST.models.PreguntaExamenPostModel;
import com.dim.autotestAPI.entidades.ExamenConID;
import com.dim.autotestAPI.entidades.PreguntaExamenConID;

import es.mde.acing.utils.PreguntaExamen;

import com.dim.autotestAPI.REST.controllers.ExamenController;

@Component
public class PreguntaExamenAssembler<T extends PreguntaExamen>
		implements RepresentationModelAssembler<T, PreguntaExamenModel> {

	@Override
	public PreguntaExamenModel toModel(T entity) {
		PreguntaExamenModel model = new PreguntaExamenModel();
		model.setId(((PreguntaExamenConID) entity).getId());
		model.setAcertada(entity.isAcertada());
		model.setRespuesta(entity.getRespuesta());
		model.setCorrecta(entity.getPregunta().getOpcionCorrecta());
		model.setEnunciado(entity.getPregunta().getEnunciado());
		String[] incorrectas = { entity.getPregunta().getOpcionInCorrecta1(),
				entity.getPregunta().getOpcionInCorrecta2(), entity.getPregunta().getOpcionInCorrecta3() };
		model.setIncorrectas(incorrectas);

		model.add(
				linkTo(methodOn(ExamenController.class).one(((ExamenConID) entity.getExamen()).getId())).withRel("examen")
				);
		return model;
	}

	public PreguntaExamenConID toEntity(PreguntaExamenPostModel model) {
		PreguntaExamenConID entity = new PreguntaExamenConID();
		entity.setAcertada(false); // Hasta que no se haga el examen es false
		entity.setRespuesta(model.getRespuesta());
		entity.setCorrecta(model.getCorrecta());

		entity.setExamen(model.getExamen());
		entity.setPregunta(model.getPregunta());
		return entity;
	}

	public CollectionModel<PreguntaExamenModel> toCollection(List<T> lista) {
		CollectionModel<PreguntaExamenModel> collection = CollectionModel
				.of(lista.stream().map(this::toModel).collect(Collectors.toList()));
		return collection;
	}

}