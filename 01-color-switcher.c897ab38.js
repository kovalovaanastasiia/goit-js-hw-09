const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]");let o=null;function r(){e.setAttribute("disabled","true")}t.addEventListener("click",(function r(){t.setAttribute("disabled","true"),e.removeAttribute("disabled"),document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`,o=setTimeout(r,1e3)})),e.addEventListener("click",(function(){r(),clearInterval(o),t.removeAttribute("disabled")})),r();
//# sourceMappingURL=01-color-switcher.c897ab38.js.map
