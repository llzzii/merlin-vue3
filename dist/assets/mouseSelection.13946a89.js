import{r as p,n as B,d as C,an as R,q as v,s as _,ao as z,z as b,D as o,B as D,C as P,v as V}from"./index.efc8215b.js";const X=f=>{const t=p(!1),e=p(1),s=p({top:0,left:0,width:0,height:0});return{updateMouseSelection:c=>{if(!f.value)return;let r=!0;const n=f.value.getBoundingClientRect(),a=5,m=c.pageX,d=c.pageY,x=m-n.x,M=d-n.y;s.value={top:M,left:x,width:0,height:0},t.value=!1,e.value=4,document.onmousemove=g=>{if(!r)return;const y=g.pageX,k=g.pageY,l=y-m,i=k-d,S=Math.abs(l),w=Math.abs(i);if(S<a||w<a)return;let u=0;l>0&&i>0?u=4:l<0&&i<0?u=1:l>0&&i<0?u=2:l<0&&i>0&&(u=3),s.value={...s.value,width:S,height:w},t.value=!0,e.value=u},document.onmouseup=()=>{document.onmousemove=null,document.onmouseup=null,r=!1,t.value=!1}},mouseSelectionVisible:t,mouseSelection:s,mouseSelectionQuadrant:e}};var Y="/assets/John_Miller.16ee4195.png";const q={class:"img-item"},I=["src"],N=C({__name:"mouseSelection",setup(f){const t=p(),{mouseSelection:e,mouseSelectionVisible:s,mouseSelectionQuadrant:h,updateMouseSelection:c}=X(t),r=n=>{c(n)};return(n,a)=>{const m=R("elementResize");return v(),_("div",{class:"container",ref_key:"viewportRef",ref:t,onMousedown:a[0]||(a[0]=d=>r(d))},[z((v(),_("div",q,[b("img",{src:o(Y)},null,8,I)])),[[m]]),o(s)?(v(),_("div",{key:0,class:D(`mouse-selection quadrant-${o(h)}`),style:P({top:o(e).top+"px",left:o(e).left+"px",width:o(e).width+"px",height:o(e).height+"px"})},null,6)):V("",!0)],544)}}});var A=B(N,[["__scopeId","data-v-899783de"]]);export{A as default};
