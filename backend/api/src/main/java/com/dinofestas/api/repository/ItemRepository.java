package com.dinofestas.api.repository;

import com.dinofestas.api.model.Item;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long>, JpaSpecificationExecutor<Item> { // Adicione JpaSpecificationExecutor
    // O método findByNomeContainingIgnoreCaseOrTemaContainingIgnoreCaseOrCategoriaContainingIgnoreCaseOrCodigo
    // pode se tornar redundante para o endpoint listarTodos se as Specifications cobrirem todos os casos.
    // Avalie se ele ainda é necessário para outros propósitos.
    // Page<Item> findByNomeContainingIgnoreCaseOrTemaContainingIgnoreCaseOrCategoriaContainingIgnoreCaseOrCodigo(
    //       String nome, String tema, String categoria, Long codigo, Pageable pageable);
}