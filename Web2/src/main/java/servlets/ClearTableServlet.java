package servlets;

import beans.EntriesBean;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class ClearTableServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");

        EntriesBean entries = (EntriesBean) request.getSession().getAttribute("entries");
        if (entries == null) entries = new EntriesBean();
        entries.getEntries().clear();
        request.getSession().setAttribute("entries", entries);

        PrintWriter writer = response.getWriter();
        writer.println(generateEmptyTable());
        writer.close();
    }

    private String generateEmptyTable() {
        return "<table id=\"result-table\">" +
                "<tr class=\"table-header\">" +
                "<th class=\"coords-col\">X</th>" +
                "<th class=\"coords-col\">Y</th>" +
                "<th class=\"coords-col\">R</th>" +
                "<th class=\"time-col\">Локальное время</th>" +
                "<th class=\"time-col\">Время исполнения</th>" +
                "<th class=\"hit-col\">Попадание</th>" +
                "</tr></table>";
    }
}
