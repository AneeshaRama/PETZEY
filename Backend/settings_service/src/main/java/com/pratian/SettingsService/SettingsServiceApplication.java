package com.pratian.SettingsService;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.servers.Server;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@EnableEurekaClient
@SpringBootApplication
public class SettingsServiceApplication {

	@Value(value = "${swagger.productionURL}")
	public String productionURL;

	public static void main(String[] args) {
		SpringApplication.run(SettingsServiceApplication.class, args);
	}

	@Bean
	public ModelMapper modelMapper(){
		return new ModelMapper();
	}

	@Bean
	public RestTemplate restTemplate(){
		return new RestTemplate();
	}

	@Bean
	public OpenAPI customOpenAPI() {
		Server productionserver = new Server();
		// Server localserver = new Server();
		List<Server> servers = new ArrayList<>();
		productionserver.setUrl(productionURL);
		//  localserver.setUrl(localURL);
		servers.add(productionserver);
		// servers.add(localserver);
		OpenAPI openAPI = new OpenAPI();
		openAPI.setServers(servers);
		return openAPI;

	}

}
