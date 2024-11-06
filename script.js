document.addEventListener("DOMContentLoaded", function() {
    const modalButton = document.getElementById("modalBtn");
    const contactModal = document.getElementById("contactModal");

    function popIn() {
        contactModal.classList.add("popIn");
        setTimeout(function() {
            contactModal.classList.remove("popIn");
        }, 1000);
    }

    modalButton.addEventListener("click", popIn);
});
