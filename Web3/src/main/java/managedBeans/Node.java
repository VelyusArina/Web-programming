package managedBeans;
import lombok.Data;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.NoneScoped;
import java.io.Serializable;

@Data
@ManagedBean(name="node")
@NoneScoped
public class Node implements Serializable {
    private double x;
    private double y;
    private double radius;
}
