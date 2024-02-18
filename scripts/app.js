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

        AjaxRequest("GET", "header.html", LoadHeader);

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
            case "Contact List":
                DisplayContactListPage();
                break;
            case "Edit Contact":
                DisplayEditPage();
                break;
            case "Login":
                DisplayLoginPage();
                break;
            case "Register":
                DisplayRegisterPage();
                break;
            default:
                console.log("Unknown page");
        }
    }
    window.addEventListener("load", Start)

    function DisplayHomePage() {
        let AboutUsButton = document.getElementById("AboutUsBtn");
        AboutUsButton.addEventListener("click", function () {
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

        AjaxRequest();
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
                AddContact(fullName.value, contactNumber.value, emailAddress.value);
            }
        });

        ContactFormValidation();
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
                            <td class="text-center">
                                <button value="${key}" class="btn btn-primary btn-sm edit">
                                    <i class="fas fa-edit fa-sm">&nbspEdit</i>
                                </button>
                            </td>
                            <td class="text-center">
                                <button value="${key}" class="btn btn-danger btn-sm delete">
                                    <i class="fas fa-trash-alt fa-sm">&nbspDelete</i>
                                </button>
                            </td>
                        </tr>`;

                index++;
            }
            contactList.innerHTML = data;

        }

        $("#addButton").on("click", () =>
        {
            location.href = "edit.html#add";
        });
        $("button.edit").on("click", function() {
            location.href = "edit.html#" + $(this).val();
        });
        $("button.delete").on("click", function() {
            if(confirm("Delete contact, are you sure?"))
            {
                localStorage.removeItem($(this).val());
            }
            location.href = "contact-list.html";
        });
    }

    function DisplayEditPage()
    {
        let page = location.hash.substring(1);
        switch (page)
        {
            case "add":
                $("main>h1").text("Add Contact");
                $("#editButton").html('<i class="fas fa-plus-circle fa-sm"></i> Add')
                $("#editButton").on("click", (event) => {
                    event.preventDefault();
                    AddContact(fullName.value, contactNumber.value, emailAddress.value);
                    location.href = "contact-list.html";
                });
                break;
            default:{
                let contact = new Contact();
                contact.deserialize(localStorage.getItem(page));

                $("#fullName").val(contact.FullName);
                $("#contactNumber").val(contact.ContactNumber);
                $("#emailAddress").val(contact.EmailAddress);

                $("#editButton").on("click", (event) => {
                    event.preventDefault();
                    contact.FullName = $("#fullName").val();
                    contact.ContactNumber = $("#contactNumber").val();
                    contact.EmailAddress = $("#emailAddress").val();

                    localStorage.setItem(page, contact.serialize());

                    location.href = "contact-list.html";
                });
            }
                break;
        }

        $("#cancelButton").on("click", () => {
            location.href = "contact-list.html";
        });

        ContactFormValidation();
    }

    function AddContact(fullName, contactNumber, emailAddress)
    {
        let contact = new Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize())
        {
            let key = contact.FullName.substring(0,1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }

    /**
     * This function will validate field input based on regular expression
     * @param inputFieldId
     * @param regularExpression
     * @param errorMessage
     */
    function ValidateField(inputFieldId, regularExpression, errorMessage)
    {
        let messageArea = $("#messageArea").hide();

        $(inputFieldId).on("blur", function () {
            let inputText = $(this).val();
            if (!regularExpression.test(inputText)) {
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(errorMessage).show();
            } else {
                messageArea.removeClass("alert alert-danger").hide();
            }
        });
    }

    function ContactFormValidation()
    {
        ValidateField("#fullName", /^([A-Za-z]{2,25})\s([A-Za-z]{2,25})$/, "Please enter a valid first and lastname.");
        ValidateField("#contactNumber", /^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/, "Please enter a valid phone contact number.");
        ValidateField("#emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid email address.");
    }

    function DisplayLoginPage()
    {
        console.log("Reached Login Page.");
        $('#messageArea').hide();

        $('#loginButton').on('click', function() {
            let success = false;
            let newUser = new core.User();

            $.get('/data/users.json', function(data) {
                for (const user of data.users) {
                    if ($('#username').val() === user.Username && $('#password').val() === user.Password) {
                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }

                if (success)
                {
                    sessionStorage.setItem('user', newUser.serialize());
                    $('#messageArea').removeClass('alert alert-danger').hide();
                    window.location.href = 'contact-list.html';
                }
                else
                {
                    $('#username').trigger('focus').trigger('select');
                    $('#messageArea').addClass('alert alert-danger').text('Error: Invalid Login Credentials').show();
                }
            });
        });

        $('#cancelButton').on('click', function() {
            $('#loginForm').trigger("reset");
            window.location.href = 'index.html';
        });
    }

    function DisplayRegisterPage()
    {
        console.log("Reached Register Page.");
    }

    function AjaxRequest(method, url, callback)
    {
        let XHR = new XMLHttpRequest();
        XHR.addEventListener("readystatechange", () => {
            if (XHR.readyState === 4 && XHR.status === 200)
            {
                if (typeof callback === "function")
                {
                    callback(XHR.responseText);
                }

                else
                {
                    console.error("ERROR: callback not a function");
                }
            }
        });
        XHR.open(method, url);
        XHR.send();
    }

    function LoadHeader(html_data)
    {
        $("header").html(html_data);
        $('li>a:contains(${document.title})').addClass("active");
        CheckLogin();
    }

    function CheckLogin()
    {
        if (sessionStorage.getItem("user"))
        {
            $("#login").html(`<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`);

            $("#logout").on("click", function(event)
            {
                sessionStorage.clear();
                location.href = "index.html";
            });
        }
        // else
        // {
        //     $("#login").html(`<a class="nav-link" href="login.html"><i class="fas fa-sign-in-alt"></i> Login</a>`);
        // }
    }

    // if (document.title === "Contact List") {
    //     DisplayContactListPage();
    // }



})();