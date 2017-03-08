<!DOCTYPE html>
<!--[if lt IE 7 ]> <html class="no-js ie6 oldie"> <![endif]-->
<!--[if IE 7 ]> <html class="no-js ie7 oldie"> <![endif]-->
<!--[if IE 8 ]> <html class="no-js ie8 oldie"> <![endif]-->
<!--[if IE 9 ]> <html class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--><html class="no-js"><!--<![endif]-->
<head>
	<title>Driving Law</title>
	<!--#include file="../_inc/meta.aspx"-->
	<!--#include file="../_inc/js.aspx"-->
	<!--#include file="../_inc/css.aspx"-->
</head>
<body class="home">
	<div class="wrapper">
		<!--#include file="../_inc/header.aspx"-->
		<section class="row hero">
			<div class="row-content">
				<div class="col-sm-12">
					<div class="hero-item">
						<div class="vx_image">
							<img src="../_images/hero-05.jpg" alt="hero" />
						</div>
						<div class="vx_text hero-item-text">
							<h1>Terms</h1>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="row content-area">
			<div class="row-content">
				<div id="col_01" class="vx_drag vx_blocks_file_blocks-content-area-items col-sm-12">
					<div class="vx_block intro">
						<p>Legal terms can be confusing, but from this page you will be able to find many of these terms explained in plain English with full explanations.</p>
					</div>
					<div class="vx_block">
						<p>This includes not only an offence you may have been charged with, but also some of the language used in correspondence from the Police and the Courts.</p>
						<p>Driving Law believes that the more information our clients have the more successful we will be at avoiding disqualification or disproportionate penalties.</p>
					</div>
				</div>
				<div class="vx_text col-sm-12">
					<h3>Driving Law</h3>
					<h2>Index of terms</h2>
				</div>
				<div class="index-of-terms">
					<Vuture:StoredProcedureRepeaterXMLParser ID="Vx309137189" StoredProcedureName="usp_Vx_FrontEnd_ContentTypeCustomFields_Get" runat="server">
						<Parameter Name="intSitePageId" Type="Integer" Value='<%$ vx: SITE_PAGE_ID%>' />
						<Parameter Name="strContentType" Type="NVarChar" Value="Web.{SiteId}-dl_terms" />
						<parameter name="intMaxRecords" type="Integer" value='120'></parameter>
						<ItemTemplate>
							<div class="col-md-4 col-sm-6 terms-item">
								<div class="item-inner">
									<h3><a href="<%# Container.GetPageUrl(Container["SiteUrl"], Container["Path"], Container["FileName"], Container["PageType"])%>"><%# Container["Term"] %></a></h3>
									<p><%# Container["Short description"] != "" ? Container["Short description"] : "" %></p>
								</div>
							</div>
						</ItemTemplate>
					</Vuture:StoredProcedureRepeaterXMLParser>
				</div>
			</div>
		</section>
		<!--#include file="../_inc/promo.aspx"-->
		<!--#include file="../_inc/common-offences.aspx"-->
	</div>
	<!--#include file="../_inc/footer.aspx"-->
</body>
</html>