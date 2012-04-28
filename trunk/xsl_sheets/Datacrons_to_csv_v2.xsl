<?csv version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">	
Planete;Gain;Coordonnees;Liens
<xsl:for-each select="/html/body/div/div/div/div/div/div/div/div/table/tbody/tr">
<xsl:if test="count(td)>1"><xsl:value-of select="normalize-space(./tr[1]/td[1])"/>;<xsl:value-of select="normalize-space(td[2])"/>;<xsl:value-of select="normalize-space(td[3])"/>;<xsl:value-of select="normalize-space(td[2]/a[1]/@href)"/>;
</xsl:if> 
    </xsl:for-each>
    </xsl:template>
</xsl:stylesheet>