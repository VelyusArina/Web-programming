package managedBeans;

import AreaCheckingExeption.OutOfRangeException;
import model.ElementInfo;
import model.AreaChecker;
import lombok.Data;

import javax.annotation.PostConstruct;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.inject.Inject;
import java.io.Serializable;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
@SessionScoped
@ManagedBean(name="managedPointBean")
@Data
public class ManagedPointBean implements Serializable {
    private String resultMessage;

    @Inject
    private ElementInfoDAO elementInfoDAO;
    @Inject
    private Node node;

    private List<ElementInfo> points;

    public synchronized void addPoint() {
        try {
            AreaChecker.CheckRange(node);
            ElementInfo elementInfo = AreaChecker.AreaCheck(node);
            elementInfoDAO.saveElementInfo(elementInfo);
            points.add(elementInfo);
            resultMessage = elementInfo.getFormatResult();
            node = new Node();
        } catch (OutOfRangeException | SQLException e){
            resultMessage = e.getMessage();
        }
    }
    public synchronized void deleteAllElements(){
        try {
            elementInfoDAO.deleteElementInfos();
            points = new ArrayList<>();
            node = new Node();
            resultMessage = null;
        } catch (SQLException e){
            resultMessage = e.getMessage();
        }
    }
    @PostConstruct
    public synchronized void init(){
        try {
            points =  elementInfoDAO.findAllElementInfos();
        } catch (SQLException e){
            resultMessage = e.getMessage();
            points = new ArrayList<>();
//            FacesContext.getCurrentInstance().addMessage();
        }
    }
}
