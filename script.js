document.addEventListener("DOMContentLoaded", function () 
{
    // Display current year
    const year = document.getElementById("year");
    if (year) 
    {
        year.textContent = new Date().getFullYear();
    }

    async function sendEnquiry(form, status, button) 
    {
        button.disabled = true;
        button.textContent = "Sending...";
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        data._subject = "New Enquiry - Frosty Scoops";
        data._template = "table";
        try 
        {
            const response = await fetch(
                "https://formsubmit.co/ajax/frostyscoops.bkt@gmail.com",
                {
                    method: "POST",
                    headers: 
                    {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            );
            const result = await response.json();
            if (!response.ok || result.success !== true &&
                result.success !== "true") 
            {
                throw new Error(result.message || "Unable to send enquiry.");
            }
            status.textContent = "Thank you! Your message has been sent successfully.";
            status.style.color = "green";
            form.reset();

        } 
        catch (error) 
        {
            console.error("Form submission error:", error);
            status.textContent = "Sorry, something went wrong. Please try again.";
            status.style.color = "red";
        }
        button.disabled = false;
        button.textContent = "Send Message";
    }

    const contactForm = document.getElementById("contactForm");
    if (contactForm) 
    {
        contactForm.addEventListener("submit", function (event) 
        {
            event.preventDefault();
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();

            let valid = true;
            document.querySelectorAll(".error-message").forEach(function (error) 
            { error.textContent = ""; });
            document.getElementById("successMessage").textContent = "";
            if (name.length < 3) 
            {
                document.getElementById("nameError").textContent ="Name must contain at least 3 characters.";
                valid = false;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email))
            {
                document.getElementById("emailError").textContent = "Please enter a valid email address.";
                valid = false;
            }
            if (subject.length < 3) 
            {
                document.getElementById("subjectError").textContent = "Subject must contain at least 3 characters.";
                valid = false;
            }
            if (message.length < 10)
            {
                document.getElementById("messageError").textContent ="Message must contain at least 10 characters.";
                valid = false;
            }
            if (valid) 
            {
                const status = document.getElementById("successMessage");
                const button = contactForm.querySelector("button[type='submit']");
                sendEnquiry(contactForm, status, button);
            }
        });
    }
    const enquiryForm = document.getElementById("enquiryForm");
    if (enquiryForm) 
    {
        enquiryForm.addEventListener("submit", function (event) 
        {
            event.preventDefault();
            const status = document.getElementById("formStatus");
            const button = enquiryForm.querySelector("button[type='submit']");
            sendEnquiry(enquiryForm, status, button);
        });
    }
});
