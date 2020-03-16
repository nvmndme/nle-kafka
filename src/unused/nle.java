package com.mukegilecok.nleapi.service;

import java.text.SimpleDateFormat;
import java.util.AbstractList;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.headers.Header;
import org.json.JSONArray;
import org.json.JSONObject;

/**
* @author mukegilecok
*/

@Stateless
@Path("ceisa")
public class dbImporAPI {
    
    @PersistenceContext(unitName = "DBIMPOR_PU")
    private EntityManager em;
    
    @GET
    @Path("documentstatus/{noBl}/{tglBl}")//getHistoryStatus
    @Produces("application/json")
    public Response findStatusByBL(@PathParam("noBl") String noBl, @PathParam("tglBl") String tglBl) {
        List<Object[]> objectQuery = em.createNativeQuery("select TO_CHAR(b.WK_REKAM,'YYYY-MM-DD') WK_REKAM,c.KET_KD STATUS\n" +
        "from TIP_PIB_CTL a, TIP_PIB_STATUS b,TIR_STATUS_PIB c,TID_PIB_DOK d\n" +
        "where b.SEQ_PIB = a.SEQ_PIB\n" +
        "and c.ID_STATUS = b.ID_STATUS\n" +
        "and c.KET_KD is not null\n" +
        "and d.SEQ_PIB = a.SEQ_PIB\n" +
        "and d.JNS_DOK='705' \n"  
        + "and d.NO_DOK='" + noBl + "' and TO_CHAR(d.TGL_DOK,'YYYYMMDD')='" + tglBl + "' order by b.WK_REKAM asc").getResultList();
        //                + "and d.NO_DOK='" + noBl + "' and d.TGL_DOK=TO_DATE('" + tglBl + "', 'yyyymmdd') order by b.WK_REKAM asc").getResultList();
        JSONArray jSONArray = new JSONArray();
        for (Object[] objects : objectQuery) {
            JSONObject jSONObject = new JSONObject();
            jSONObject.put("WK_REKAM", "" + objects[0]);
            jSONObject.put("STATUS", "" + objects[1]);
            jSONArray.put(jSONObject);
        }
        
        JSONObject jSONObjectResult = new JSONObject();
        jSONObjectResult.put("Status PIB", jSONArray);
        
        return Response.status(200).entity(jSONObjectResult.toString()).header("Access-Control-Allow-Origin", "*")
        .header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
        .header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
    }
    
    @GET
    @Path("profil/{npwp}") //getProfil
    @Produces("application/json")
    public Response findProfilList(@PathParam("npwp") String npwp) {
        List<Object[]> objectQuery = em.createNativeQuery("select a.IDENTITAS,a.NAMA NM_PERUSAHAAN,a.ALAMAT,a.TELP_CP TELP,a.NAMA_CP NM_KONTAK_PERSON,a.EMAIL\n" +
        "from WEBSIMPEG.TD_CUSTOMER@dbcustomer a where a.IDENTITAS = SUBSTR('" + npwp + "',1,9)\n").getResultList();
        
        JSONArray jSONArray = new JSONArray();
        for (Object[] objects : objectQuery) {
            JSONObject jSONObject = new JSONObject();
            jSONObject.put("IDENTITAS", "" + objects[0]);
            jSONObject.put("NM_PERUSAHAAN", "" + objects[1]);
            jSONObject.put("ALAMAT", "" + objects[2]);
            jSONObject.put("TELP", "" + objects[3]);
            jSONObject.put("NM_KONTAK_PERSON", "" + objects[4]);
            jSONObject.put("EMAIL", "" + objects[5]);
            jSONArray.put(jSONObject);
        }
        JSONObject jSONObjectResult = new JSONObject();
        jSONObjectResult.put("data Customer", jSONArray);
        
        return Response.status(200).entity(jSONObjectResult.toString()).header("Access-Control-Allow-Origin", "*")
        .header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
        .header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
    }
    
    @GET
    @Path("activedocuments/{npwp}") //getActiveDocuments
    @Produces("application/json")
    public Response findActiveDocuments(@PathParam("npwp") String npwp) {
        List<Object[]> objectQuery = em.createNativeQuery("select 'PIB' PIB,a.NO_PIB,TO_CHAR(a.TGL_PIB,'YYYY-MM-DD'),b.NO_DOK NO_BL,TO_CHAR(b.TGL_DOK ,'YYYY-MM-DD') TGL_BL,c.KET_KD\n" +
        "from TIP_PIB_CTL a,TID_PIB_DOK b,TIR_STATUS_PIB c\n" + //DEV
        //        "from TIP_PIB_CTL a,TID_PIB_DOK b,DBIMPOR_REP.TIR_STATUS_PIB c\n" +
        "where b.SEQ_PIB = a.SEQ_PIB and b.JNS_DOK='705' \n" +
        "and c.KD_STATUS=a.KD_STATUS\n" +
        "and a.ID_IMP='" + npwp + "'\n" +
        "and (a.TGL_PIB  >= (SYSDATE - (30)))").getResultList();
        JSONArray jSONArray = new JSONArray();
        for (Object[] objects : objectQuery) {
            JSONObject jSONObject = new JSONObject();
            jSONObject.put("PIB", "" + objects[0]);
            jSONObject.put("NO_PIB", "" + objects[1]);
            jSONObject.put("TGL_PIB", "" + objects[2]);
            jSONObject.put("NO_BL", "" + objects[3]);
            jSONObject.put("TGL_BL", "" + objects[4]);
            jSONObject.put("STATUS", "" + objects[5]);
            jSONArray.put(jSONObject);
        }
        
        JSONObject jSONObjectResult = new JSONObject();
        jSONObjectResult.put("Data Active Documents", jSONArray);
        
        return Response.status(200).entity(jSONObjectResult.toString()).header("Access-Control-Allow-Origin", "*")
        .header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
        .header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
    }
    
    @GET
    @Path("noblbc20/{npwp}") //getNOBLBC20List
    @Produces("application/json")
    public Response findNOBLBC20List(@PathParam("npwp") String npwp) {
        List<Object[]> objectQuery = em.createNativeQuery("Select i.NO_DOK NOMOR_BL,TO_CHAR(i.TGL_DOK,'YYYY-MM-DD') TANGGAL_BL\n"
        //                + "from DBIMPOR_REP.tid_pib_hdr h, tid_pib_dok i \n"
        + "from tid_pib_hdr h, tid_pib_dok i \n" //DEV
        + "where h.SEQ_PIB = i.SEQ_PIB \n"
        + "and i.jns_dok = '705' and (i.TGL_DOK  >= (SYSDATE - (30))) \n"
        + "and h.id_perusahaan_imp = '" + npwp + "'").getResultList();
        
        JSONArray jSONArray = new JSONArray();
        for (Object[] objects : objectQuery) {
            JSONObject jSONObject = new JSONObject();
            jSONObject.put("bl_no", "" + objects[0]);
            jSONObject.put("bl_date", "" + objects[1]);
            jSONArray.put(jSONObject);
        }
        JSONObject jSONObjectResult = new JSONObject();
        jSONObjectResult.put("Data BL BC 2.0", jSONArray);
        
        return Response.status(200).entity(jSONObjectResult.toString()).header("Access-Control-Allow-Origin", "*")
        .header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
        .header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
    }
    
    @GET
    @Path("noblbc16/{npwp}") //
    @Produces("application/json")
    public Response findNOBLBC16List(@PathParam("npwp") String npwp) {
        List<Object[]> objectQuery = em.createNativeQuery("SELECT  b.NOMOR_DOKUMEN NOMOR_BL,b.TANGGAL_DOKUMEN TANGGAL_BL\n" +
        "FROM tpb.td_tpb_header a, tpb.TD_TPB_DOKUMEN b\n" +
        "where  a.ID_HEADER =b.ID_HEADER\n" +
        "and b.KODE_JENIS_DOKUMEN='705'\n" +
        "and  (b.TANGGAL_DOKUMEN  >= (SYSDATE - (30))) \n"
        + "and a.ID_PENGUSAHA = '" + npwp + "'").getResultList();
        
        JSONArray jSONArray = new JSONArray();
        for (Object[] objects : objectQuery) {
            JSONObject jSONObject = new JSONObject();
            jSONObject.put("bl_no", "" + objects[0]);
            jSONObject.put("bl_date", "" + objects[1]);
            jSONArray.put(jSONObject);
        }
        JSONObject jSONObjectResult = new JSONObject();
        jSONObjectResult.put("Data BL BC 1.6", jSONArray);
        
        return Response.status(200).entity(jSONObjectResult.toString()).header("Access-Control-Allow-Origin", "*")
        .header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
        .header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
    }
    
    @GET
    @Path("kontainerbc20/{noBl}/{tglBl}")//
    @Produces("application/json")
    public Response findKontainerBC20List(@PathParam("noBl") String noBl, @PathParam("tglBl") String tglBl) {
        List<Object[]> objectQuery = em.createNativeQuery("select a.NO_HOST_BL, TO_CHAR(a.TGL_HOST_Bl,'YYYY-MM-DD'), b.seri_container, b.NO_CONTAINER,\n"
        + "(select ur_muat_container from referensi.tr_muat_container where id_muat_container=b.jenis_muat) jenis_muat , \n"
        + "(select ur_type_container from referensi.tr_type_container where id_type_container=b.jenis_container) type_container,\n"
        + "b.UKURAN_CONTAINER, b.no_seal from dbmanifes.mi_manifes_detail a inner join dbmanifes.mi_manifes_container b on  \n"
        + "a.ID_MANIFES_DETAIL=b.ID_MANIFES_DETAIL\n"
        + "where a.NO_HOST_BL='" + noBl + "' and TO_CHAR(a.TGL_HOST_Bl,'YYYYMMDD')='" + tglBl + "'").getResultList();
        
        JSONArray jSONArray = new JSONArray();
        for (Object[] objects : objectQuery) {
            JSONObject jSONObject = new JSONObject();
            jSONObject.put("bl_no", "" + objects[0]);
            jSONObject.put("bl_date", "" + objects[1]);
            jSONObject.put("seriContainer", "" + objects[2]);
            jSONObject.put("container_no", "" + objects[3]);
            jSONObject.put("jenisMuat", "" + objects[4]);
            jSONObject.put("container_type", "" + objects[5]);
            jSONObject.put("container_size", "" + objects[6]);
            jSONObject.put("noSeal", "" + objects[7]);
            jSONArray.put(jSONObject);
        }
        
        JSONObject jSONObjectResult = new JSONObject();
        jSONObjectResult.put("Data Kontainer BC20", jSONArray);
        
        return Response.status(200).entity(jSONObjectResult.toString()).header("Access-Control-Allow-Origin", "*")
        .header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
        .header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
    }
    
    @GET
    @Path("kontainerbc16/{noBl}/{tglBl}")//getNoContainerList
    @Produces("application/json")
    public Response findKontainerBC16List(@PathParam("noBl") String noBl, @PathParam("tglBl") String tglBl) {
        List<Object[]> objectQuery = em.createNativeQuery("select b.NOMOR_DOKUMEN,TO_CHAR(b.TANGGAL_DOKUMEN,'YYYY-MM-DD'),'' AS SERI_KONTAINER,a.NOMOR_KONTAINER,'' AS JENIS_MUAT,a.KODE_TIPE_KONTAINER,a.KODE_UKURAN_KONTAINER,a.NOMOR_SEGEL\n" +
        "from TPB.TD_TPB_KONTAINER a,tpb.TD_TPB_DOKUMEN b\n" +
        "where b.ID_HEADER = a.ID_HEADER\n" +
        "and b.KODE_JENIS_DOKUMEN='705' "
        + "and b.NOMOR_DOKUMEN='" + noBl + "' "
        + "and TO_CHAR(b.TANGGAL_DOKUMEN,'YYYYMMDD')='" + tglBl + "'").getResultList();
        //                + "and b.TANGGAL_DOKUMEN=TO_DATE('" + tglBl + "', 'yyyymmdd')").getResultList();
        
        JSONArray jSONArray = new JSONArray();
        for (Object[] objects : objectQuery) {
            JSONObject jSONObject = new JSONObject();
            jSONObject.put("bl_no", "" + objects[0]);
            jSONObject.put("bl_date", "" + objects[1]);
            jSONObject.put("seriContainer", "" + objects[2]);
            jSONObject.put("container_no", "" + objects[3]);
            jSONObject.put("jenisMuat", "" + objects[4]);
            jSONObject.put("container_type", "" + objects[5]);
            jSONObject.put("container_size", "" + objects[6]);
            jSONObject.put("noSeal", "" + objects[7]);
            jSONArray.put(jSONObject);
        }
        
        JSONObject jSONObjectResult = new JSONObject();
        jSONObjectResult.put("Data Kontainer BC16", jSONArray);
        
        return Response.status(200).entity(jSONObjectResult.toString()).header("Access-Control-Allow-Origin", "*")
        .header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
        .header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
    }
    
    @GET
    @Path("kontainersp3b/{noBC11}/{tglBC11}")//
    @Produces("application/json")
    public Response findKontainerSP3BList(@PathParam("noBC11") String noBl, @PathParam("tglBC11") String tglBl) {
        List<Object[]> objectQuery = em.createNativeQuery("SELECT b.NO_HOST_BL,TO_CHAR(b.TGL_HOST_BL,'YYYY-MM-DD') TGL_HOST_BL,c.SERI_CONTAINER,c.NO_CONTAINER,c.JENIS_MUAT,c.TYPE_CONTAINER,c.UKURAN_CONTAINER,c.NO_SEAL  \n" +
        "    FROM DBMANIFES.MO_MANIFES_HEADER a,DBMANIFES.MO_MANIFES_DETAIL b,DBMANIFES.MO_MANIFES_CONTAINER c\n" +
        "    where  b.ID_MANIFES_HEADER=a.ID_MANIFES_HEADER\n" +
        "    and c.ID_MANIFES_DETAIL = b.ID_MANIFES_DETAIL  "
        + "and a.NO_BC11='" + noBl + "' "
        + "and TO_CHAR(a.TGL_BC11,'YYYYMMDD')='" + tglBl + "'").getResultList();
        //                + "and b.TANGGAL_DOKUMEN=TO_DATE('" + tglBl + "', 'yyyymmdd')").getResultList();
        
        JSONArray jSONArray = new JSONArray();
        for (Object[] objects : objectQuery) {
            JSONObject jSONObject = new JSONObject();
            jSONObject.put("bl_no", "" + objects[0]);
            jSONObject.put("bl_date", "" + objects[1]);
            jSONObject.put("seriContainer", "" + objects[2]);
            jSONObject.put("container_no", "" + objects[3]);
            jSONObject.put("jenisMuat", "" + objects[4]);
            jSONObject.put("container_type", "" + objects[5]);
            jSONObject.put("container_size", "" + objects[6]);
            jSONObject.put("noSeal", "" + objects[7]);
            jSONArray.put(jSONObject);
        }
        
        JSONObject jSONObjectResult = new JSONObject();
        jSONObjectResult.put("Data Kontainer SP3B", jSONArray);
        
        return Response.status(200).entity(jSONObjectResult.toString()).header("Access-Control-Allow-Origin", "*")
        .header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
        .header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
    }
    
    @GET
    @Path("imporstatus/{npwp}") //
    @Produces("application/json")
    public Response findStatusImporList(@PathParam("npwp") String npwp) {
        List<Object[]> objectQuery = em.createNativeQuery("select distinct a.NO_PIB,TO_CHAR(a.TGL_PIB,'YYYY-MM-DD'),b.KET_KD\n"
        + "from TIP_PIB_CTL a,TIR_STATUS_PIB b\n"
        + "where b.KD_STATUS=a.KD_STATUS \n"
        + "and (a.TGL_PIB  >= (SYSDATE - (90)))\n"
        + "and a.ID_IMP='" + npwp + "'").getResultList();
        JSONArray jSONArray = new JSONArray();
        for (Object[] objects : objectQuery) {
            JSONObject jSONObject = new JSONObject();
            jSONObject.put("pib_no", "" + objects[0]);
            jSONObject.put("pib_date", "" + objects[1]);
            jSONObject.put("pib_status", "" + objects[2]);
            jSONArray.put(jSONObject);
        }
        JSONObject jSONObjectResult = new JSONObject();
        jSONObjectResult.put("data status impor", jSONArray);
        
        return Response.status(200).entity(jSONObjectResult.toString()).header("Access-Control-Allow-Origin", "*")
        .header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT")
        .header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With").build();
    }

    protected EntityManager getEntityManager() {
        return em;
    }
    
}