"use strict";

// IIFE - Immediately Invoked Function Expression
// AKA - Anonymous Self-Executing Function

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
        console.log("Reached Contact Page");
    }

})();
