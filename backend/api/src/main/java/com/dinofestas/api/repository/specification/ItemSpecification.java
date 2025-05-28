package com.dinofestas.api.repository.specification; // Crie este pacote ou use um de sua preferência

import com.dinofestas.api.model.Item;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.Predicate; // Para Jakarta EE 9+ (Spring Boot 3.x)
// import javax.persistence.criteria.Predicate; // Para Java EE 8 (Spring Boot 2.x)


public class ItemSpecification {

    /**
     * Cria uma Specification para filtrar itens por uma correspondência exata no campo 'categoria'.
     */
    public static Specification<Item> comCategoriaExata(String categoria) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("categoria"), categoria);
    }

    /**
     * Cria uma Specification para buscar um termo em campos relevantes como 'nome', 'tema' e 'codigo'.
     * O termo de busca é case-insensitive para campos de texto.
     */
    public static Specification<Item> comTermoBuscaNosCampos(String termo) {
        return (root, query, criteriaBuilder) -> {
            String termoLike = "%" + termo.toLowerCase() + "%";

            // Predicado para buscar no nome (case-insensitive)
            Predicate buscaEmNome = criteriaBuilder.like(criteriaBuilder.lower(root.get("nome")), termoLike);
            // Predicado para buscar no tema (case-insensitive)
            Predicate buscaEmTema = criteriaBuilder.like(criteriaBuilder.lower(root.get("tema")), termoLike);

            // Combina as buscas em nome e tema com OR
            Predicate predicadosDeTexto = criteriaBuilder.or(buscaEmNome, buscaEmTema);

            // Tenta buscar também pelo código se o termo for um número
            try {
                Long codigo = Long.parseLong(termo);
                Predicate buscaEmCodigo = criteriaBuilder.equal(root.get("codigo"), codigo);
                // Combina a busca por código com as buscas de texto usando OR
                return criteriaBuilder.or(predicadosDeTexto, buscaEmCodigo);
            } catch (NumberFormatException e) {
                // Se o termo não for um número, retorna apenas as buscas em nome e tema
                return predicadosDeTexto;
            }
        };
    }
}