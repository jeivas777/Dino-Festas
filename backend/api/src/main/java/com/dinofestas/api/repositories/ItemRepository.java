package com.exemplo.demo.repository;

import com.exemplo.demo.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    // Não é necessário implementar os métodos básicos, o Spring Data JPA faz isso automaticamente.
}
