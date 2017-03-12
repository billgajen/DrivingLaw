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
<body class="home search">
	<div class="wrapper">
		<!--#include file="../_inc/header.aspx"-->
		<section class="row content-area">
			<div class="row-content">
				<div class="col-sm-12">
					<h2>Search Results</h2>
				</div> 
				<div class="col-sm-12 search-result-list">
					<vuture:supersnippet id="Vx605652112123" storedprocedurename="usp_Vx_FrontEnd_Advanced_SiteSearch_Results_Get" runat="server" SiteSearchEnabled='true'>
						<Parameter Name="searchText" Type="NVarChar" Value="<%$ QueryString: searchValue%>" />
						<Parameter Name="intSiteId" Type="Integer" Value="<%$ Application: siteId%>" />
						<Parameter Name="intPage" Type=" Integer" Value="<%$ QueryString: page %>" />
						<parameter name="intMaxRecords" type="Integer" value='10'></parameter>
						<parameter name="enabledEmptyTextSearch" type="Boolean" value='true'></parameter>
						<headertemplate>                    
							<div class="bar">
								<!-- Display result text -->
								<div class="count">
									Your search has turned out <vuture:totalrecordscontrol id="VxTotalRecordsControl" runat="server"></vuture:totalrecordscontrol> results.
								</div>
								<div class="previous_next">
									<vuture:searchpager id="Vx605652112123" runat="server" recordsperpage="10" maxpages="10" nexttext="Next" previoustext="Prev"></vuture:searchpager>
								</div>
							</div>
						</headertemplate>
						<itemtemplate>
							<div class="result">
								<div class="copy">
									<p class="pageLink">
										<a href='<%# Container.GetPageUrl(Container["SiteUrl"], Container["Path"],Container["FileName"], Container["PageType"])%>'><strong><%# Container["PageName"] %></strong></a>
									</p>
									<%# Container["Description"] != "" ? "<p>" + Container["Description"] + "</p>" : "" %>				
								</div>
							</div>
						</itemtemplate>
					</vuture:supersnippet>
				</div>
			</div>
		</section>
	<!--#include file="../_inc/footer.aspx"-->
</body>
</html>