package com.dinofestas.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dinofestas.api.model.CategoriasDisponiveis;

@Repository
public interface CategoriasDisponiveisRepository extends JpaRepository<CategoriasDisponiveis, Long> {
  
}
