﻿//XJS=comRdReport.xjs
(function()
{
    return function(path)
    {
        var obj;
    
        // User Script
        this.registerScript(path, function() {

        /**
         * @class Active방식 RD report
         * @param oActiveX : ActiveX object
         * @param filePath : mrd 파일 경로
         * @param fileName : mrd 파일명
         * @param sqlParam : 조회조건 parameter
         * @param oOtherArgs : 기타 parameter
         * @return None
         */ 
        this.gfn_viewReportPlugin = function(oActiveX,filePath,fileName,sqlParam,oOtherArgs)
        {	
        	//운영인 경우에만 DkuJdbc
        	var jdbcService = (application.gv_location == "OPR") ? "DkuJdbc" : "TDkuJdbc";
        	
        	//기본 PARAM정보 추가
        	var bText = "대경대학교";
        	var bDate = "YYYY-MM-DD";
        	var sUserId = this.gfn_getUserId();
        	var sUserIp = this.gfn_getUserIp();
        	
        	//활성화된 화면의 MENU_CD를 설정한다.
        	var oChildFrame = null;
        	try{
        		oChildFrame = application.gv_workFrame.getActiveFrame();
        	}catch(e){}		
        	
        	var sMenuCd = (!Eco.isEmpty(oChildFrame)) ? oChildFrame.form.sMenuId : "SAMPLE";
        	
        	var sParam = "/rp [" + sUserId + "] ["+ sUserIp + "] [" + sMenuCd + "] [" + bText + "] [" + bDate + "]";
        	
        	//추가 파라미터 설정
        	for(var idx=0; idx < sqlParam.length; idx++)
        	{
        		if(String(sqlParam[idx]).substr(0,1) != "/")
        		{
        			sParam += " ["+sqlParam[idx]+"]";
        		}
        		else
        		{
        			sParam += " "+sqlParam[idx];
        		}
        	}	
        	
        	sParam+= " /rf [http://220.66.253.47:8080/DataServer/rdagent.jsp]";
        	sParam+= " /rsn ["+jdbcService+"]";	
        	sParam+= " /ruseurlmoniker [0]";		
        	
        	//파일위치설정
        	var sSvcUrl = application.services["svc"].url;
        	var sRDFilePath = sSvcUrl+"mrd/"+filePath+fileName;

        	trace("Plugin isLoaded = "+oActiveX.isLoaded());
        	trace("sRDFilePath = "+sRDFilePath);
        	trace("sParam = "+sParam);
        	
        	//RD option설정
        	oActiveX.setProperty("AutoAdjust",true);
        	oActiveX.setProperty("ZoomRatio",100);
        // 	oActiveX.HideToolBar();
        // 	oActiveX.HideStatusBar();
        // 	oActiveX.SetBackgroundColor(255,255,255);
        // 	oActiveX.ShowSaveExcelDlg(0);
        // 	oActiveX.SetPageLineColor (255,255,255);	

        	try
        	{
        		oActiveX.callMethod("ApplyLicense", "http://220.66.253.47:8080/DataServer/rdagent.jsp");
        	}
        	catch(e)
        	{
        		trace(e.number);
        	}
        	oActiveX.callMethod("FileOpen", sRDFilePath, sParam);	
        }

        //HTML5 함수
        //"http://220.66.253.47:8080/ReportingServer/service?opcode=500&mrd_path=sample.mrd&mrd_param=%2Frfn+%5Bsample.txt%5D&export_type=pdf&protocol=file"
        /**
         * @class html5방식 RD report
         * @param oWebBrowser : Webbrowser object
         * @param filePath : mrd 파일 경로
         * @param fileName : mrd 파일명
         * @param sqlParam : 조회조건 parameter
         * @param oOtherArgs : 기타 parameter
         * @return None
         */ 
        this.gfn_viewReportWeb = function(oWebBrowser,filePath,fileName,sqlParam,oOtherArgs)
        {
        	//운영인 경우에만 DkuJdbc
        	var jdbcService = (application.gv_location == "OPR") ? "DkuJdbc" : "TDkuJdbc";
        	
        	//기본 PARAM정보 추가
        	var bText = "대경대학교";
        	var bDate = "YYYY-MM-DD";
        	var sUserId = this.gfn_getUserId();
        	var sUserIp = this.gfn_getUserIp();
        	
        	//활성화된 화면의 MENU_CD를 설정한다.
        	var oChildFrame = null;
        	try{
        		oChildFrame = application.gv_workFrame.getActiveFrame();
        	}catch(e){}		
        	
        	var sMenuCd = (!Eco.isEmpty(oChildFrame)) ? oChildFrame.form.sMenuId : "SAMPLE";
        	
        	var sParam = "/rp [" + sUserId + "] ["+ sUserIp + "] [" + sMenuCd + "] [" + bText + "] [" + bDate + "]";
        	
        	//추가 파라미터 설정
        	for(var idx=0; idx < sqlParam.length; idx++)
        	{
        		if(String(sqlParam[idx]).substr(0,1) != "/")
        		{
        			sParam += " ["+sqlParam[idx]+"]";
        		}
        		else
        		{
        			sParam += " "+sqlParam[idx];
        		}
        	}	
        	
        	sParam+= " /rf [http://220.66.253.47:8080/DataServer/rdagent.jsp]";
        	sParam+= " /rsn ["+jdbcService+"]";	
        	sParam+= " /ruseurlmoniker [0]";
        	
        	//파라미터 설정
        	var sFileUrl = "http://220.66.253.53/dku/mrd/";//운영경로
        	var sOpCode = "500";
        	var sFilePath = sFileUrl+filePath+fileName;	
        	var sExportType = "pdf";
        	var sProtocol = "file";
        	
        	if(!Eco.isEmpty(oOtherArgs))
        	{
        		sExportType = Eco.isEmpty(oOtherArgs.exporttype)? "pdf":oOtherArgs.exporttype ;
        		sProtocol = Eco.isEmpty(oOtherArgs.protocol)? "file":oOtherArgs.protocol;
        	}	

        	oWebBrowser.set_url("http://220.66.253.47:8080/ReportingServer/service?opcode="+sOpCode+"&mrd_path="+sFilePath+"&mrd_param="+sParam+"&export_type="+sExportType+"&protocol="+sProtocol);
        }
        });


    
        this.loadIncludeScript(path);
        
        obj = null;
    };
}
)();
