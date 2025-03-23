document.addEventListener("DOMContentLoaded", () => {
	 const container=document.querySelector('.number-links');
	 const count=document.querySelectorAll('div[id^="ep"]').length;
	 for(let i=1;i<=count;i++){
		  const link=document.createElement('a');
		  link.textContent=`${i} `;
		  link.style.cursor='pointer';
		  link.addEventListener('click',event=>{
			   event.preventDefault();
			   const target=document.querySelector(`#ep${i}`);
			   if(target){
				    target.scrollIntoView({behavior:'smooth'});
				    }});
		  container.appendChild(link);
		  }
	 window.addEventListener('beforeunload',()=>{
		  sessionStorage.setItem('scrollPosition',window.scrollY);
		  });
	 const scrollPosition=sessionStorage.getItem('scrollPosition');
	 if(scrollPosition){
		  window.scrollTo(0,parseInt(scrollPosition,10));
		  sessionStorage.removeItem('scrollPosition');
		  }
	 var hostname=window.location.hostname;
	 var path=window.location.pathname;
	 if(hostname.endsWith("github.io")){
		  var segments=path.split('/');
		  if(segments.length>1&&segments[1]!==""){
			   var baseHref='/'+segments[1]+'/';
			   var links=document.querySelectorAll('.td-main-logo');
			   links.forEach(link=>link.href=baseHref);
			   }}});
