package beans;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class EntriesBean implements Serializable {
    private List<Entry> entries;

    public EntriesBean(List<Entry> entries) {
        this.entries = entries;
    }

    public EntriesBean() {
        this(new ArrayList<Entry>());
    }

    public List<Entry> getEntries() {
        return entries;
    }

    public void setEntries(List<Entry> entries) {
        this.entries = entries;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        EntriesBean that = (EntriesBean) o;

        return Objects.equals(entries, that.entries);
    }

    @Override
    public int hashCode() {
        return entries != null ? entries.hashCode() : 0;
    }
}
