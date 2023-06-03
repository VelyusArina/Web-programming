<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<jsp:useBean id="entries" class="beans.EntriesBean" scope="session"/>

<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title>ITMO Lab_2 ArinaVelyus</title>
    <link href="css/style.css" rel="stylesheet" type="text/css"/>
</head>
<body onload="drawCanvas()">
    <div class="conteiner">
        <header class="header">
                <div class="head_indo">Лабораторная работа</div>
                <nav class="link_info">
                    <a class="nav_link" target="_blank" href="https://se.ifmo.ru/courses/web">Вариант: 14778</a>
                    <a class="nav_link" target="_blank" href="https://docs.google.com/spreadsheets/d/1SDtymX4tyDu_MzmZ7l4IkKyc41A-1t-5DiNk6zVMIBU/edit#gid=1794742412">Группа: P32151</a>
                    <a class="nav_link" target="_blank" href="https://github.com/ArinaVelyus">Велюс А.К.</a>
                </nav>
        </header>
    </div>
    <div class="content">
        <div class="content-photo">
            <div class="canvas">
                <canvas id="canvas" width="300" height="300"></canvas>
            </div>
            <div class="data">
                <div class="caption">Данные</div>
                    <div class="coordinates">
                        <div class="row-coordinates">
                            <div class="name-coordinates">X:</div>
                            <input type="text" id="x_field" class="form" placeholder="от -3 до 3" maxlength="5" value="${entries.entries[0].x}">
                        </div>
                        <div class="row-coordinates">
                            <div class="name-coordinates">Y:</div>
                            <input type="text" id="y_field" class="form" placeholder="от -5 до 5" maxlength="5" value="${entries.entries[0].y}">
                        </div>
                        <div class="row-coordinates">
                            <div class="name-coordinates">R:</div>
                            <div name="r_field" class="form">
                                <% for (double i = 1; i <= 3; i = i + 0.5) { %>
                                <label>
                                    <input type="checkbox" class="r_field" name="r" value="<%=i%>">
                                    <%=i%>
                                </label>
                                <% } %>
                            </div>
                        </div>
                        <div class="button-coordinates">
                            <button  type="submit" class="buttons" id="form_submit"  onclick="submit()">Отправить</button>
                            <button  type="reset" class="buttons" id="clear_table"  onclick="clearTable()">Очистить таблицу</button>
                        </div>
                    </div>
            </div>
    </div>
            <div id="output">
                <div class="caption">Результат</div>
                <table id="result-table">
                    <tr class="row" id="tableHeader">
                        <th class="coords-col">X</th>
                        <th class="coords-col">Y</th>
                        <th class="coords-col">R</th>
                        <th class="time-col">Локальное время</th>
                        <th class="time-col">Время исполнения</th>
                        <th class="hit-col">Попадание</th>
                    </tr>
                    <c:forEach var="entry" items="${entries.entries}">
                        <tr class="row ${(entry.hit? "blue": "red")}">
                            <td>${entry.x}</td>
                            <td>${entry.y}</td>
                            <td>${entry.r}</td>
                            <td>${entry.currentTime}</td>
                            <td>${entry.executionTime}</td>
                            <td class="hit-col">${(entry.hit? "YES" : "NO")}</td>
                        </tr>
                    </c:forEach>
                </table>
            </div>
    </div>
    <script src="js/validation.js"></script>
    <script src="js/drawZones.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</body>
</html>