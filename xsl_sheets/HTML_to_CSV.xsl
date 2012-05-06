<?csv version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">      
<xsl:template match="/">
Planete;Gain;Coordonnees;Liens2
<xsl:call-template name="writeCSVLineAboutDatacron">
    <xsl:with-param name="planete" select="normalize-space(html/body/div[4]/div[3]/div/div/div/div[2]/div[2]/div[4]/table/tr[2]/td[1])"/>
    <xsl:with-param name="pos" select="3"/>
    <xsl:with-param name="alltr" select="html/body/div[4]/div[3]/div/div/div/div[2]/div[2]/div[4]/table"/>
  </xsl:call-template>
</xsl:template>


<xsl:template name="writeCSVLineAboutDatacron">
   <xsl:param name="pos"/>
   <xsl:param name="planete"/>
   <xsl:param name="alltr"/>       
<xsl:value-of select="$planete"/>;<xsl:value-of select="normalize-space($alltr/tr[$pos]/td[2])"/>;<xsl:value-of select="normalize-space($alltr/tr[$pos]/td[3])"/>;<xsl:value-of select="normalize-space($alltr/tr[$pos]/td[2]/a[1]/@href)"/>;   
<xsl:if test="$pos != count($alltr/tr) and count($alltr/tr[$pos+1]/td)>1">
      <xsl:call-template name="writeCSVLineAboutDatacron">
         <xsl:with-param name="planete" select="$planete"/>
         <xsl:with-param name="pos" select="$pos+1"/>
         <xsl:with-param name="alltr" select="$alltr"/>
      </xsl:call-template>
   </xsl:if>                       
   <xsl:if test="$pos != count($alltr/tr) and count($alltr/tr[$pos+1]/td)=1">
      <xsl:call-template name="writeCSVLineAboutDatacron">
         <xsl:with-param name="planete" select="normalize-space($alltr/tr[$pos+1]/td[1])"/>
         <xsl:with-param name="pos" select="$pos+2"/>
         <xsl:with-param name="alltr" select="$alltr"/>
      </xsl:call-template>
   </xsl:if>
</xsl:template>

</xsl:stylesheet>                                                     