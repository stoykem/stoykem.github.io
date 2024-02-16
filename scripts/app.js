"use strict";

// IIFE - Immediately Invoked Function Expression
// AKA - Anonymous Self-Executing Function

(function(){

    let fullName = document.getElementById("fullName");
    let contactNumber = document.getElementById("contactNumber");
    let emailAddress = document.getElementById("emailAddress");

    class Contact
    {
        constructor(fullName, contactNumber, emailAddress)
        {
            this.FullName = fullName || "";
            this.ContactNumber = contactNumber || "";
            this.EmailAddress = emailAddress || "";
        }

        serialize()
        {
            if (this.FullName !== "" && this.ContactNumber !== "" && this.EmailAddress !== "") {
                return `${this.FullName}, ${this.ContactNumber}, ${this.EmailAddress}`;
            }
            console.error("One or more of the properties of the Contact object are missing or invalid");
            return null;
        }

        deserialize(data)
        {
            let propertyArray = data.split(",");
            this.FullName = propertyArray[0];
            this.ContactNumber = propertyArray[1];
            this.EmailAddress = propertyArray[2];
            this.Message = propertyArray[3];
        }
    }

    function Start()
    {
        console.log("App Started!");

        switch (document.title)
        {
            case "Home":
                DisplayHomePage();
                break;
            case "Product":
                DisplayProductsPage();
                break;
            case "Service":
                DisplayServicesPage();
                break;
            case "About":
                DisplayAboutUsPage();
                break;
            case "Contact Us":
                DisplayContactPage();
                break;
            default:
                console.log("Unknown page");
        }
    }
    window.addEventListener("load", Start)

    function DisplayHomePage()
    {
        let AboutUsButton = document.getElementById("AboutUsBtn");
        AboutUsButton.addEventListener("click", function()
        {
            //console.log("About Us Button Clicked!");
            location.href = "about.html";
        });

        let MainContent = document.getElementsByTagName("main")[0];

        // Create the main paragraph element
        let MainParagraph = document.createElement("p");
        MainParagraph.setAttribute("id", "MainParagraph")
        MainParagraph.setAttribute("class", "mt-3")

        // Concatenate the strings using template literals
        let FirstString = "This is";
        let SecondString = `${FirstString} the Main Paragraph.`;

        MainParagraph.textContent = SecondString;
        MainContent.appendChild(MainParagraph);

        // Create the article element
        let Article = document.createElement("article");
        Article.setAttribute("class", "container");

        // Create the article paragraph element
        let ArticleParagraph = document.createElement("p");
        ArticleParagraph.setAttribute("id", "ArticleParagraph");
        ArticleParagraph.setAttribute("class", "mt-3");
        ArticleParagraph.textContent = "This is my article paragraph";

        // Append the article paragraph to the article element
        Article.appendChild(ArticleParagraph);

        // Append the article element to the document body
        document.body.appendChild(Article);
    }

    function DisplayProductsPage()
    {
        console.log("Reached Products Page");
    }

    function DisplayServicesPage()
    {
        console.log("Reached Services Page");
    }

    function DisplayAboutUsPage()
    {
        console.log("Reached About Us Page");
    }

    function DisplayContactPage()
    {
        console.log("Reached Contact Us Page");

        let fullName = document.getElementById("fullName");
        let contactNumber = document.getElementById("contactNumber");
        let emailAddress = document.getElementById("emailAddress");

        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");

        sendButton.addEventListener("click", function(event)
        {
            if(subscribeCheckbox.checked)
            {
                let contact = new Contact(fullName.value, contactNumber.value, emailAddress.value);
                if(contact.serialize())
                {
                    let key = contact.FullName.substring(0,1) + Date.now();
                    localStorage.setItem(key, contact.serialize());
                }
            }
        });
    }

    function DisplayContactListPage()
    {
        console.log("Contact List Page");

        if(localStorage.length > 0)
        {
            let contactList = document.getElementById("contactList");
            let data = "";

            let keys = Object.keys(localStorage);

            let index=1;
            for(const key of keys)
            {
                let contactData = localStorage.getItem(key);
                let contact = new Contact();
                contact.deserialize(contactData);
                data += `<tr>
                            <th scope="row" class="text-center">${index}</th>
                            <td>${contact.FullName}</td>
                            <td>${contact.ContactNumber}</td>
                            <td>${contact.EmailAddress}</td>
                        </tr>`;

                index++;
            }
            contactList.innerHTML = data;
        }
    }

    if (document.title === "Contact List") {
        DisplayContactListPage();
    }



})();
