package com.dinofestas.api.model;

import jakarta.persistence.*;
import java.util.List;

import com.dinofestas.api.converter.JsonStringListConverter;

@Entity
@Table(name = "itens")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String categoria;

    @Column(nullable = false)
    private Long codigo;

    @Column(nullable = false)
    private Double valor;

    @Column(nullable = false)
    private String tema;

    @Column(columnDefinition = "TEXT")
    @Convert(converter = JsonStringListConverter.class)
    private List<String> imagens;

    // Construtor padrão
    public Item() {}

    // Construtor com parâmetros
    public Item(String nome, Double valor) {
        this.nome = nome;
        this.valor = valor;
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

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public Long getCodigo() {
        return codigo;
    }

    public void setCodigo(Long codigo) {
        this.codigo = codigo;
    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public List<String> getImagens() {
        return imagens;
    }

    public void setImagens(List<String> imagens) {
        this.imagens = imagens;
    }

    public String getTema() {
        return tema;
    }

    public void setTema(String tema) {
        this.tema = tema;
    }
}
