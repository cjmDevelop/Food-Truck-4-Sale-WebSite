
document.querySelector("form").addEventListener("submit", async function (e) {
    e.preventDefault();
    
    const form = this;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;
    
    const messageDiv = document.getElementById("formMessage");

    try {
        const res = await fetch("https://food-truck-4-sale-contact-form-service.onrender.com/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ name, email, message })
        });
    
        const data = await res.json();

        if(data.success) {
            messageDiv.textContent = "Thanks for reaching out! We'll get back to you soon";
            messageDiv.classList.remove("visually-hidden");
            form.reset();
        } else {
            messageDiv.textContent = "Something went wrong. Please try again."
            messageDiv.classList.remove("visually-hidden");
        }

        messageDiv.scrollIntoView({behavior: "smooth", block: "center"});

        setTimeout(() => {
         messageDiv.classList.add("visually-hidden");
        }, 5000);
    } catch (err) {
        console.error("Error submitting form:", err);
        messageDiv.textContent = "Something went wrong. Please try again.";
        messageDiv.classList.remove("visually-hidden");
        messageDiv.scrollIntoView({ behavior: "smooth", block: "center" });
    }
});
    

