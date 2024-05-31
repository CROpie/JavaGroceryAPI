package Groceries;

// import java.util.Objects;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity // This tells Hibernate to make a table out of this class
public class Grocery {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String itemName;
    private Integer amount;

    // not sure why this "default constructor" is needed
    Grocery() {}

    Grocery(String itemName, Integer amount) {
        this.itemName = itemName;
        this.amount = amount;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getItemName() {
        return this.itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public Integer getAmount() {
        return this.amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    @Override
    public String toString() {
        return String.format("{ itemName: %s, amount: %d }", this.itemName, this.amount);
    }


}
