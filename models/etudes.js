const mongoose=require('mongoose')

const localisationSchema=mongoose.Schema({
    Cnpe:String,
    Tranche:String,
    Systeme:String,
    Numero:Number,
    Bigramme:String,
    Indice:Number
 })

 const brideSchema=mongoose.Schema({
    Type_bride:String,
    Type_face:String,
    A:Number,
    B:Number,
    C:Number,
    Dtp:Number,
    G0:Number,
    G1:Number,
    Ep:Number,
    h:Number,
    Dfs:Number
    
 })

 const boulonSchema=mongoose.Schema({
    Incertitude:Number,
    Coef_frottement:Number,
    Filetage:String,
    Dn:Number,
    Pas:Number,
    Dpe:Number,
    Nombre:Number,
    Materiau:String,
    Ec_boul:Number,
    Syc_boul:Number,
    Sc_boul:Number

 })

 const jointSchema=mongoose.Schema({

    Type:String,
    Dje:Number,
    Dji:Number,
    m:Number,
    Y:Number,
    Pmax:Number
 })

 const categorie_0Schema=mongoose.Schema({
   check:Boolean, 
   Tc:Number,
    Pc:Number,
    Sbride:Number,
    Sboul:Number
 })

 const categorie_2Schema=mongoose.Schema({
    check:Boolean,
    Tc:Number,
    Pc:Number,
    Fa:Number,
    Mf:Number,
    Sbride:Number,
    Sboul:Number,
    Eh_boul:Number,
    Sy_boul:Number
 })

 const categorie_3Schema=mongoose.Schema({
    check:Boolean,
    Tc:Number,
    Pc:Number,
    Fa:Number,
    Mf:Number,
    Sbride:Number,
    Sboul:Number,
    Eh_boul:Number,
    Sy_boul:Number
 })
 const categorie_4Schema=mongoose.Schema({
    check:Boolean,
    Tc:Number,
    Pc:Number,
    Fa:Number,
    Mf:Number,
    Sbride:Number,
    Sboul:Number,
    Eh_boul:Number,
    Sy_boul:Number
 })
 const categorie_EHSchema=mongoose.Schema({
    check:Boolean,
    Tc:Number,
    Pc:Number,
    Fa:Number,
    Mf:Number,
    Sybride:Number,
    Sboul:Number,
    Eh_boul:Number,
    Sy_boul:Number
 })

 const donneeSchema=mongoose.Schema({

     localisation:localisationSchema,
     bride:brideSchema,
     boulon:boulonSchema,
     joint:jointSchema,
     chargement:{
      categorie_0:categorie_0Schema,
      categorie_2:categorie_2Schema,
      categorie_3:categorie_3Schema,
      categorie_4:categorie_4Schema,
      categorie_EH:categorie_EHSchema}
   
 })

 const coupleSchema=mongoose.Schema({
    Couple:Number,
    FSmax:Number,
    FSmin:Number
 })

 const result_jointSchema=mongoose.Schema({
    b0:Number,
    Dje:Number,
    Dji:Number,
    b:Number,
    Dj:Number,
    Fj:Number
 })

 const result_bras_levierSchema=mongoose.Schema({
    hd:Number,
    ht:Number,
    hg:Number,
    R:Number,
    C0:Number
 })

//  const result_effortSchema=mongoose.Schema({
//     Peq:Number,
//     FF:Number,
//     FM:Number,
//     FS:Number
//  })

//  const result_momentSchema=mongoose.Schema({
//     HD:Number,
//     HD_ext:Number,
//     HT:Number,
//     HT_ext:Number,
//     HG:Number,
//     MD:Number,
//     MD_ext:Number,
//     MT:Number,
//     MT_ext:Number,
//     MG:Number,
//     M0:Number,
//  })



//  const result_contrainteSchema=mongoose.Schema({
//     SH:Number,
//     critere_SH:Number,
//     ratio_SH:Number,
//     SR:Number,
//     critere_SR:Number,
//     ratio_SR:Number,
//     ST:Number,
//     critere_ST:Number,
//     ratio_ST:Number,
//     SMAX:Number,
//     critere_SMAX:Number,
//     ratio_SMAX:Number,
//  })

 const result_categorieSchema=mongoose.Schema({
   // effort:result_effortSchema,
    Contrainte_joint:Number,
    Peq:Number,
    FF:Number,
    FM:Number,
    FS:Number,
   // moment:result_momentSchema,
    HD:Number,
    HD_ext:Number,
    HT:Number,
    HT_ext:Number,
    HG:Number,
    MD:Number,
    MD_ext:Number,
    MT:Number,
    MT_ext:Number,
    MG:Number,
    M0:Number,
    Sa:Number,
    ratio_boulon:Number,
  //  contrainte:result_contrainteSchema,
    Sjoint:Number,
    ratio_joint:Number,
    SH:Number,
    critere_SH:Number,
    ratio_SH:Number,
    SR:Number,
    critere_SR:Number,
    ratio_SR:Number,
    ST:Number,
    critere_ST:Number,
    ratio_ST:Number,
    SMAX:Number,
    critere_SMAX:Number,
    ratio_SMAX:Number,

 })




 const resultSchema=mongoose.Schema({
    couple:coupleSchema,
    joint:result_jointSchema,
    FS0:Number,
    bras_levier:result_bras_levierSchema,
    categorie_0:result_categorieSchema,
    categorie_2:result_categorieSchema,
    categorie_3:result_categorieSchema,
    categorie_4:result_categorieSchema,
    categorie_EH:result_categorieSchema,
    Ma:Number,
    Sb:Number,
    Sa_assise:Number,
    Contrainte_joint_assise:Number
 })

 //mettre une date aussi

const etudesSchema=mongoose.Schema({
    user:String,
    donnee:donneeSchema,
    result:resultSchema

})


const etudesModel=mongoose.model('etudes',etudesSchema)

module.exports=etudesModel