<?csv version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
Planete;Gain;Coordonnees;Liens2       
  <xsl:call-template name="processDataCron_line">
    <xsl:with-param name="planete" select="normalize-space(html/body/div[4]/div[3]/div/div/div/div[2]/div[2]/div[4]/table/tr[1]/td[1])"/>
    <xsl:with-param name="pos" select="2"/>
    <xsl:with-param name="alltr" select="html/body/div[4]/div[3]/div/div/div/div[2]/div[2]/div[4]/table/tr"/>
  </xsl:call-template>
</xsl:template>


<xsl:template name="writeCSVLineAboutDatacron">
   <xsl:param name="pos"/>
   <xsl:param name="planete"/>
   <xsl:param name="alltr"/>
   
   <!-- Ecriture de la ligne CSV -->
   
   <xsl:value-of select="$planete"/>;<xsl:value-of select="normalize-space(td[2])"/><xsl:copy-of select="$planete"/>;<xsl:value-of select="normalize-space(td[3])"/>;<xsl:value-of select="normalize-space(td[2]/a[1]/@href)"/>;
   
   <!-- Appel conditionnelle si un ligne existe et pas de changement de planète -->
   <xsl:if test="pos != count($alltr) and count($alltr[$pos+1]/td)>1">
      <xsl:call-template name="processDataCron_line">
         <xsl:with-param name="planete" select="$planete"/>
         <xsl:with-param name="pos" select="$pos+1"/>
         <xsl:with-param name="alltr" select="$alltr"/>
      </xsl:call-template>
   </xsl:if>
   
   <!-- Appel conditionnelle si un ligne existe et changement de planète -->
   <xsl:if test="pos != count($alltr) and count($alltr[$pos+1]/td)=1">
      <xsl:call-template name="processDataCron_line">
         <xsl:with-param name="planete" select="normalize-space($alltr[$pos+1]/td[1])"/>
         <xsl:with-param name="pos" select="$pos+2"/>
         <xsl:with-param name="alltr" select="$alltr"/>
      </xsl:call-template>
   </xsl:if>
   
   
   
<xsl:template>

</xsl:stylesheet>                                                     