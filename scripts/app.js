"use strict";
//TEST2

//IIFE - Immediately Invoked Function Expression
//AKA - Anonymous Self-Executing Function

(function(){

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
        console.log("Reached Contact Page");
    }

})();