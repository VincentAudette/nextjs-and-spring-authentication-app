package dto;

public class AnalyticsDTO {

    private int groupeAge;
    private String province;
    private int jourSemaine;
    private int moisAnnee;
    private int firstResult;
    private int maxResult;

    public int getGroupeAge() { return groupeAge; }
    public String getProvince() { return province; }
    public int getJourSemaine() { return jourSemaine; }
    public int getMoisAnnee() { return moisAnnee; }
    public int getFirstResult() { return firstResult; }
    public int getMaxResult() {return maxResult; }

    public void setGroupeAge(int groupeAge) { this.groupeAge = groupeAge; }
    public void setProvince(String province) { this.province = province; }
    public void setJourSemaine(int jourSemaine) { this.jourSemaine = jourSemaine; }
    public void setMoisAnnee(int moisAnnee) { this.moisAnnee = moisAnnee; }
    public void setFirstResult(int firstResult) { this.firstResult = firstResult; }
    public void setMaxResult(int maxResult) { this.maxResult = maxResult; }
}
