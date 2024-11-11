document.addEventListener("DOMContentLoaded", () => {
    const contactEmail = document.getElementById("contactEmail");
    const contactPhone = document.getElementById("contactPhone");
    const userMessage = document.getElementById("userMessage");
    const submitBtn = document.getElementById("submitBtn");

    // Function to validate email
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Function to validate phone number
    function validatePhone(phone) {
        const regex = /\([0-9]+\) [0-9]+-[0-9]+/;
        return regex.test(phone);
    }

    // Function to send contact message to server
    const sendContactMessage = async (formData) => {
        try {
            const response = await fetch('http://localhost:3000/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            createNotif("Dados enviados, aguarde o retorno!", "success");
        } catch (error) {
            console.error('Error sending contact message:', error);
            createNotif("Ocorreu um erro ao enviar a mensagem. Tente novamente mais tarde.", "error");
        }
    };

    // Event listener for form submission
    submitBtn.addEventListener("click", async function (event) {
        event.preventDefault();

        const emailValue = contactEmail.value;
        const phoneValue = contactPhone.value;
        const messageValue = userMessage.value;

        // Validate email
        if (!validateEmail(emailValue)) {
            createNotif("Digite um e-mail válido", "error");
            contactEmail.focus();
            return;
        }

        // Validate phone number
        if (!validatePhone(phoneValue)) {
            createNotif("Digite um número de telefone válido", "error");
            contactPhone.focus();
            return;
        }

        // Prepare form data to send
        const contactData = {
            email: emailValue,
            phone: phoneValue,
            message: messageValue
        };

        // Send the contact data to the server
        await sendContactMessage(contactData);
    });

    // Notification function
    function createNotif(message, type) {
        const notification = document.createElement("span");
        notification.id = "notif";
        notification.classList.add(type);
        notification.textContent = message;
        document.body.appendChild(notification);
        notification.classList.add("popIn");
        setTimeout(() => {
            notification.classList.remove("popIn");
            notification.classList.add("popOut");
        }, 3000);

        setTimeout(() => {
            notification.classList.remove(type);
            notification.textContent = "";
            notification.remove();
        }, 3490);
    }
});
