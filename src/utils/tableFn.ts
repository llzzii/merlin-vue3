export const setTableHeight=(props)=>{
    let DIFF=14;
    let height=props.tableConfig.height||0;
    if (!props.tableConfig.height) {
        height = window.innerHeight;
      }
      let tmp = document.getElementsByClassName('table-wapper')[0];
      // console.log('tmp',tmp,tmp?.getBoundingClientRect())
      let top=85
      if (tmp) {
        top = tmp.getBoundingClientRect().top;
        if (top === 0) {
            top=85
        }
    }
    let toolbarH=0;
    let pageH=0;
    if (props.toolbar != null) {
        toolbarH=51
    }
    if (props.showPagination) {
        pageH=51
    }
    return height-top- DIFF-toolbarH -pageH;
}