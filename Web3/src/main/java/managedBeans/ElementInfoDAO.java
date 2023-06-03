package managedBeans;

import model.ElementInfo;

import javax.faces.bean.ManagedBean;
import java.io.Serializable;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@ManagedBean(name="elementInfoDAO")
public class ElementInfoDAO implements Serializable {


    private static final String URL_KEY = "db.url";
    private static final String USER_KEY = "db.user";
    private static final String PASSWORD_KEY = "db.password";

    private Connection getConnection() throws SQLException {
        return DriverManager.getConnection(
                PropertiesUtil.get(URL_KEY),
                PropertiesUtil.get(USER_KEY),
                PropertiesUtil.get(PASSWORD_KEY));
    }
    public void saveElementInfo(ElementInfo elementInfo) throws SQLException {
            Connection connection = getConnection();
            PreparedStatement pst = connection.prepareStatement("INSERT INTO \"elements\" " + //для вставки новой записи в таблицу "elements"
                    "(date,\"processTime\",x, y, radius, result)" +
                    " VALUES(?, ?, ?, ?, ?, ?);");
            pst.setTimestamp(1, Timestamp.from(elementInfo.getInstant()));
            pst.setDouble(2, elementInfo.getProcessTime());
            pst.setDouble(3, elementInfo.getY());
            pst.setDouble(4, elementInfo.getX());
            pst.setDouble(5, elementInfo.getRadius());
            pst.setBoolean(6, elementInfo.isResult());
            pst.execute();
            pst.close();
            connection.close();
    }
    public List<ElementInfo> findAllElementInfos() throws SQLException {
        List<ElementInfo> elementInfos = new ArrayList<ElementInfo>();
            Connection connection = getConnection();
            PreparedStatement prepareStatement = connection.prepareStatement("SELECT "+
                    "date,\"processTime\",x, y, radius, result, id" +
                    " FROM \"elements\";");
            prepareStatement.execute();

            ResultSet result = prepareStatement.getResultSet();
            while(result.next()) {
                ElementInfo elementInfo = new ElementInfo();
                elementInfo.setInstant(result.getTimestamp("date").toInstant());
                elementInfo.setProcessTime(result.getDouble("processTime"));
                elementInfo.setX(result.getDouble("x"));
                elementInfo.setY(result.getDouble("y"));
                elementInfo.setRadius(result.getDouble("radius"));
                elementInfo.setResult(result.getBoolean("result"));
                elementInfo.setId(result.getInt("id"));
                elementInfos.add(elementInfo);
            }
            prepareStatement.close();
            result.close();
            connection.close();
        return elementInfos;
    }
    public void deleteElementInfos() throws SQLException {
            Connection connection = getConnection();
            PreparedStatement prepareStatement = connection.prepareStatement("DELETE FROM \"elements\"");
            prepareStatement.execute();
            prepareStatement.close();
            connection.close();
    }
}
