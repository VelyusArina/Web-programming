package model;

import java.io.Serializable;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

import lombok.Data;

@Data
public class ElementInfo implements Serializable {
    public ElementInfo() {
    }
    private final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy.MM.dd - HH:mm:ss");
    private int id;
    private double x;
    private double y;
    private double radius;
    private boolean result;
    private Instant instant;
    private double processTime;

//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO, generator = "element_id_seq")
//    @SequenceGenerator(name="id",sequenceName = "element_id_seq")
//    public int getId() {
//        return id;
//    }

    public String getFormatInstant() { return dateTimeFormatter.format(instant.atZone(ZoneId.systemDefault())); }
    public String getFormatResult() {
        return this.result ? "Точка входит в область" : "Точка не входит в область";
    }
    public String getFormatProcessTime() { return java.math.BigDecimal.valueOf(this.processTime).toPlainString() + "c"; }
}
