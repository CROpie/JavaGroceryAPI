package Groceries;

import org.springframework.data.repository.CrudRepository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called groceryRepository

// CrudRepository is basic, JpaRepository extends it with additional features

public interface GroceryRepository extends CrudRepository<Grocery, Integer> {

}