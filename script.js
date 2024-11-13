document.addEventListener("DOMContentLoaded", () => {
    const contactEmail = document.getElementById("contactEmail");
    const contactPhone = document.getElementById("contactPhone");
    const userMessage = document.getElementById("userMessage");
    const submitBtn = document.getElementById("submitBtn");

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function validatePhone(phone) {
        const regex = /\([0-9]+\) [0-9]+-[0-9]+/;
        return regex.test(phone);
    }

    function formatPhoneNumber(phone) {
        const digits = phone.replace(/\D/g, '');

        if (digits.length === 10) {
            return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6, 10)}`;
        } else if (digits.length === 11) {

            return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
        }

        return phone;
    }

    const sendContactMessage = async (formData) => {
        try {
            const response = await fetch('http://localhost:3000/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            console.log(result);

            const emailValue = contactEmail.value;
            const phoneValue = contactPhone.value;
            const messageValue = userMessage.value;

            contactEmail.value = "";
            contactPhone.value = "";
            userMessage.value = "";
            createNotif("Dados enviados, entrarei em contato em breve!", "success");
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

        if (!validateEmail(emailValue)) {
            createNotif("Digite um e-mail válido", "error");
            contactEmail.focus();
            return;
        }

        if (!validatePhone(phoneValue)) {
            const formattedPhone = formatPhoneNumber(phoneValue);
            
            if (validatePhone(formattedPhone)) {
                contactPhone.value = formattedPhone;
            } else {
                createNotif("Digite um número de telefone válido", "error");
                contactPhone.focus();
                return;
            }
        }

        const contactData = {
            email: emailValue,
            phone: phoneValue,
            message: messageValue
        };

        await sendContactMessage(contactData);
    });

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