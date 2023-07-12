package webflix.webflix.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import pojo.Utilisateur;
import webflix.webflix.Repository.AuthRepository;
import dto.Login;

@RestController
public class AuthController {
    
    @PostMapping("api/hibernate/auth")
	public ResponseEntity<?> Personne(@RequestBody Login login) {
		Utilisateur utilisateur = AuthRepository.getUtilisateur(login);
        
        if (utilisateur == null) {
            return ResponseEntity.status(401).body(null);
        }

        return ResponseEntity.status(200).body(utilisateur);
	} 
}
