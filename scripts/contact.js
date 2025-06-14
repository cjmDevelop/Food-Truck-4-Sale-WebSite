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


/* Truck note logic for onclick on food truck map icon. */
const note = document.getElementById("truckNote");
const icon = document.getElementById("truckIcon");
function toggleTruckNote() {
    const isVisible = note.style.display === "block";
    note.style.display = isVisible ? "none" : "block";
    if (!isVisible) {
        document.addEventListener("click", handleOutsideClick);
    } else {
        document.removeEventListener("click", handleOutsideClick);
    }
}
function handleOutsideClick(event) {
    if (!note.contains(event.target) && event.target !== icon) {
        note.style.display = "none";
        document.removeEventListener("click", handleOutsideClick);
    }
}