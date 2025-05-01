package com.dinofestas.api.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

import com.dinofestas.api.converter.JsonStringListConverter;

@Entity
@Table(name = "kits")
public class Kit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Categoria> categorias = new ArrayList<>();

    @Convert(converter = JsonStringListConverter.class)
    @Column(columnDefinition = "TEXT")
    private List<String> imagens;
    
    private Double valor;


    public List<String> getImagens() {
        return imagens;
    }

    public void setImagens(List<String> imagens) {
        this.imagens = imagens;
    }
// A classe Kit não precisa de um relacionamento explícito com Categoria

    // Construtor padrão
    public Kit() {}

    // Construtor com parâmetros
    public Kit(String nome) {
        this.nome = nome;
    }

    // Getters e Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public List<Categoria> getCategorias() {
        return categorias;
    }

    public void setCategorias(List<Categoria> categorias) {
        this.categorias = categorias;
    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }
}
