package com.pratian.auth.Services;

import com.pratian.auth.Entities.AppUser;
import com.pratian.auth.Entities.JwtRequest;
import com.pratian.auth.Entities.JwtResponse;
import com.pratian.auth.Exceptions.AuthenticationFailedException;
import com.pratian.auth.Repositories.AppUserRepository;
import com.pratian.auth.Utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class JwtService implements UserDetailsService {
    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    public JwtResponse createJwtToken(JwtRequest jwtRequest) throws Exception{
        String username = jwtRequest.getUsername();
        String password = jwtRequest.getPassword();
        authenticate(username, password);

        final UserDetails userDetails = loadUserByUsername(username);
        String newGeneratedToken = jwtUtil.generateToken(userDetails);

        AppUser user = appUserRepository.findByUsername(username);
        return new JwtResponse(user, newGeneratedToken);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser user = appUserRepository.findByUsername(username);
        if(user != null){
            return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getUserPassword(),getAuthorities(user));
        }else{
            throw new UsernameNotFoundException("User not found with username "+ username);
        }
    }

    private void authenticate(String username, String password) {
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        }catch(DisabledException e){
            throw new AuthenticationFailedException("USER DISABLED");
        }catch (BadCredentialsException e){
            throw new AuthenticationFailedException("Invalid username or password");
        }
    }

    private Set getAuthorities(AppUser user){
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + user.getRole()));
        return authorities;
    }
}
