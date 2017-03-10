<section class="row common-offences">
	<div class="row-content">
		<div class="vx_text col-sm-12">
			<h3>Driving Law</h3>
			<h2>Common offences</h2>
		</div>
		<ul class="col-sm-12">
			<vuture:storedprocedurerepeaterxmlparser id="Vx235719613" storedprocedurename="usp_Vx_FrontEnd_ContentTypeCustomFields_Get" runat="server">
				<parameter name="intSitePageId" type="Integer" value='<%$ vx: SITE_PAGE_ID%>'></parameter>
				<parameter name="strContentType" type="NVarChar" value="Web.{SiteId}-dl_offence"></parameter>
				<itemtemplate>
					<li <%# Container["Common offence"] == "on" ? "" : "style=\'display: none\'" %>><a href="<%# Container.GetPageUrl(Container["SiteUrl"], Container["Path"], Container["FileName"], Container["PageType"])%>"><span class="icon icon-plus-circled"></span><%# Container["Common offence link text"] %></a></li>
				</itemtemplate>
			</vuture:storedprocedurerepeaterxmlparser>

			<li><a href="/offenses/"><span class="icon icon-plus-circled"></span>View all driving law offences</a></li>
		</ul>
	</div>
</section>
