<?csv version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output
   method="txt"
   version="1.0"
   encoding="UTF-8"
   indent="yes"
   xml-declaration="no"      
   />
<xsl:template match="/">
Planete;Gain;Coordonnees;Liens2

<xsl:for-each select="html/body/div[4]/div[3]/div/div/div/div[2]/div[2]/div[4]/table/tr">
	<xsl:if test="count(td)=1"><xsl:value-of select="normalize-space(td[1])"/>;;;
	</xsl:if> 
	<xsl:if test="count(td)>1">;<xsl:value-of select="normalize-space(td[2])"/>;<xsl:value-of select="normalize-space(td[3])"/>;<xsl:value-of select="normalize-space(td[2]/a[1]/@href)"/>;
</xsl:if> 
</xsl:for-each>
</xsl:template>

</xsl:stylesheet>