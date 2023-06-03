package model;

import AreaCheckingExeption.OutOfRangeException;
import managedBeans.Node;

import java.time.Instant;

public class AreaChecker {
    public static ElementInfo AreaCheck(Node node){
        long start = System.nanoTime();
        ElementInfo elementInfo = new ElementInfo();
        elementInfo.setX(node.getX());
        elementInfo.setY(node.getY());
        elementInfo.setRadius(node.getRadius());
        elementInfo.setResult(AreaCheckCondition(node));
       // elementInfo.setResult(AreaCheckData(node));
        elementInfo.setInstant(Instant.now());
        elementInfo.setProcessTime((System.nanoTime() - start) / 1000000000.);
        return elementInfo;
    }
    public static boolean AreaCheckCondition(Node node) {
        return (
                (node.getY() <= node.getRadius()/2 && node.getY() >= 0 && node.getX() <= node.getRadius() && node.getX()>=0) ||
                        (node.getY() >= 0 && node.getX() <= 0 && node.getY() <= 2*node.getX() + node.getRadius()) ||
                        (node.getY() <= 0 && node.getX() >= 0 && node.getY() * node.getY() + node.getX() * node.getX() <= node.getRadius() * node.getRadius())
        );
    }
    public static void CheckRange(Node node) throws OutOfRangeException {
        if (!(node.getRadius() >= 1 && node.getRadius() <= 5))
            throw new OutOfRangeException("Радиус выходит из области допустимых значений[1,2,3,4,5]");
        if (!(node.getY() >= -6.25 && node.getY() <= 6.25))
            throw new OutOfRangeException("Y выходит из области допустимых значений(-6.25,6.25)");
        if (!(node.getX() >= -6.25 && node.getX() <= 6.25))
            throw new OutOfRangeException("X выходит из области допустимых значений(-6.25,6.25)");
    }
    public static boolean AreaCheckData(Node node) {
        if (node.getX() > -4 && node.getX() < 4){
            return true;
        }
        if (node.getY() > -3 && node.getY() < 3){
            return true;
        }
        if(node.getRadius() == 1 || node.getRadius() == 2 || node.getRadius() == 3 || node.getRadius() == 4 || node.getRadius() == 5){
            return true;
        }
        return false;
    }
}
