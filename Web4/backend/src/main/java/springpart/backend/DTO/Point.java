package springpart.backend.DTO;

import springpart.backend.entity.PointEntity;

import java.time.format.DateTimeFormatter;

public class Point {
    private Long id;
    private double x;
    private double y;
    private double r;
    private boolean hit;
    private String date;
    private String user;
    private static final DateTimeFormatter userFriendlyFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public static Point toModel(PointEntity point) {
        if(point == null) return null;
        Point model = new Point();
        model.setId(point.getId());
        model.setX(point.getX());
        model.setY(point.getY());
        model.setR(point.getR());
        model.setHit(point.isHit());
        model.setDate(userFriendlyFormat.format(point.getDate()));
        model.setUser(point.getUser().getUsername());
        return model;
    }
    public Point() {
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public boolean isHit() {
        return hit;
    }

    public void setHit(boolean hit) {
        this.hit = hit;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }
}
