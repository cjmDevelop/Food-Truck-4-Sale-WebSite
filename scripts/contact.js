

/* Pop-up message for successful completion of contact form. */
document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    
    const form = this;
    const message = document.getElementById("formMessage");
    message.classList.remove("visually-hidden");
    message.scrollIntoView({ behavior: "smooth", block: "center" });
    
    setTimeout(() => {
        form.reset();
    }, 500);
    
    setTimeout(() => {
        message.classList.add("visually-hidden");
    }, 5000);
});

document.getElementById("formMessage").scrollIntoView({ 
    behavior: "smooth", 
    block: "center" 
});
