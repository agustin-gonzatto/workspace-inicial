document.getElementById("btn").addEventListener("click",()=>{
    if ((document.getElementById("floatingPassword").value.length > 0) && (document.getElementById("floatingInput").value.length > 0)) {
        localStorage.setItem("user",document.getElementById("floatingInput").value);
        window.location.replace("principal.html");
    }else{
        alert("Debe ingresar los datos correctamente.")
    }
});

