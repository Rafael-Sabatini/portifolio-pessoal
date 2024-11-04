const modalButton = document.getElementById("modalButton");
const contactModal = document.getElementById("contactModal");

function popAnimation (){
    contactModal.classList.add("popAnimation");
    setTimeout(function(){
        contactModal.classList.remove("popAnimation");
        contactModal.style.display = "block";
    }, 1000);
}

modalButton.addEventListener("click", popAnimation);