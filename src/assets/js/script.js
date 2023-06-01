const dashboardNavegacionList = document.querySelectorAll(".dashboard__navigation li");
const dashboardNavegacion = document.querySelector(".dashboard__navigation")
const dashboardBar = document.querySelector(".dashboard__bar")
const dashboardPrincipal = document.querySelector(".dashboard__principal")

function activeLink(){
    console.log(dashboardNavegacionList)
    dashboardNavegacionList.forEach(enlace =>{
        enlace.classList.remove("hovered");
    })

    this.classList.add("hovered");
}


dashboardBar.addEventListener("click",() => {
    dashboardNavegacion.classList.toggle("active")
    dashboardPrincipal.classList.toggle("active")
})




dashboardNavegacionList.forEach(enlace => enlace.addEventListener("mouseover",activeLink));
