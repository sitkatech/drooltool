<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor version="1.0.0" xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"
  xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd">
  <NamedLayer>
    <Name>watershed-dark</Name>
    <UserStyle>
      <Name>watershed-dark</Name>
      <Title>Watershed custom styled polygon</Title>
      <Abstract>Watershed-dark blue/purple fill with 60% transparency and watershed-blue opaque outline</Abstract>
      <FeatureTypeStyle>
        <Rule>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#8B74FF</CssParameter>
              <CssParameter name="fill-opacity">0.1</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke">#8B74FF</CssParameter>
              <CssParameter name="stroke-width">3</CssParameter>
            </Stroke>
          </PolygonSymbolizer>
        </Rule>
        <Rule>
          <Name>Label</Name>
          <MaxScaleDenominator>500000</MaxScaleDenominator>
            <TextSymbolizer>
                <Label>
                    <ogc:PropertyName>WatershedMaskName</ogc:PropertyName>
                </Label>
                <Font>
                    <CssParameter name="font-family">Arial</CssParameter>
                    <CssParameter name="font-size">11</CssParameter>
                    <CssParameter name="font-weight">bold</CssParameter>
                </Font>
                <LabelPlacement>
                    <PointPlacement>
                        <AnchorPoint>
                            <AnchorPointX>0.5</AnchorPointX>
                            <AnchorPointY>0.5</AnchorPointY>
                        </AnchorPoint>
                    </PointPlacement>
                </LabelPlacement>
              	<Halo>
              		<Radius>3</Radius>
              		<Fill>
                		<CssParameter name="fill">#FFFFFF</CssParameter>
              		</Fill>
            	</Halo>
                <Fill>
                  	<CssParameter name="fill">#8B74FF</CssParameter>
                </Fill>
                <VendorOption name="autoWrap">60</VendorOption>
                <VendorOption name="maxDisplacement">150</VendorOption>
                <VendorOption name="repeat">-1</VendorOption>
                <VendorOption name="partials">true</VendorOption>
            </TextSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>