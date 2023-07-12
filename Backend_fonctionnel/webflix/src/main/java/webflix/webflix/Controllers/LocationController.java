package webflix.webflix.Controllers;

import java.util.ArrayList;

import org.springframework.http.MediaType;
import pojo.Location;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import dto.LocationDTO;
import webflix.webflix.Repository.LocationRepository;

@RestController
public class LocationController {

    private static final String prefixMap = "/api/hibernate";

    @GetMapping(prefixMap + "/films/locations/{idUtilisateur}")
    public ArrayList<Location> Films(@PathVariable(name="idUtilisateur") int idUtilisateur) {
        return LocationRepository.getLocationOfUser(idUtilisateur);
    }

    @PostMapping(prefixMap + "/films/locations")
	public ResponseEntity<?>  NewLocation(@RequestBody LocationDTO locationDTO) {

        int idLocation = LocationRepository.createLocation(locationDTO);

        String error = "";
        if (idLocation == 0) {
            error = "INTERNAL ERROR";
            return ResponseEntity.status(400).contentType(MediaType.APPLICATION_JSON)
                    .body("{\"error\":\"" +error+"\"}");
        }else if( idLocation == -1){
            error = "Client à atteint le maximum de locations permises.";
            return ResponseEntity.status(400).contentType(MediaType.APPLICATION_JSON)
                    .body("{\"error\":\"" +error+"\"}");
        }else if( idLocation == -2){
            error = "Aucun film en inventaire.";
            return ResponseEntity.status(400).contentType(MediaType.APPLICATION_JSON)
                    .body("{\"error\":\"" +error+"\"}");
        }

        return ResponseEntity.status(200).body(idLocation);
	} 
}