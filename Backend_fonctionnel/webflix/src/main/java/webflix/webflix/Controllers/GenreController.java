package webflix.webflix.Controllers;

import java.util.ArrayList;

import pojo.Genre;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import webflix.webflix.Repository.GenreRepository;

@RestController
public class GenreController {

    private static final String prefixMap = "/api/hibernate";

    @GetMapping(prefixMap + "/genres")
    public ArrayList<Genre> Genres() {
        return GenreRepository.getGenres();
    }
}