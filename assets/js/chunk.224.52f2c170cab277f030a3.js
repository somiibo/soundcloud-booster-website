(self.webpackChunkultimate_jekyll=self.webpackChunkultimate_jekyll||[]).push([[224],{224:function(e){var t;e.exports=function(){t=window.Manager.dom();var e=window.Manager.properties.page.queryString;t.select("a[href*=signin], a[href*=signup], a[href*=forgot]").each((function(t){var a=t.getAttribute("href");try{var r=new URL(a);e.forEach((function(e,t){r.searchParams.set(t,e)})),t.setAttribute("href",r.toString())}catch(e){console.warn("Failed to set auth URL",e)}}))}}}]);