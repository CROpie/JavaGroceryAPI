package Groceries;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// this runs the program when the command ./mvnw clean spring-boot:run is entered in the terminal
// causes a whole bunch of things to occur, such as initializing the beans and starting the servlet
@SpringBootApplication
public class GroceryApplication {

	public static void main(String[] args) {
		SpringApplication.run(GroceryApplication.class, args);
	}

}
