/*global $, console, alert, confirm, prompt*/
$(document).ready(function () {
    
    "use strict";
    
    
    var contents, url, fn, ln, em, sb, ms, dt, errors, collect, fb, i, xhr, pattern;
    
    // storage for contents
    
    contents = {};
    dt = {};
    errors = [];
    /*
    Load the first content by default
    (on the page load): */
    $(".container").load("./partials/home.html", function (pageRsp) {
        contents["./partials/home.html"] = pageRsp;
    });

    function handleResponse(response) {
        $(".feedback").html(response);
    }
    
    function handleErrors(jqXHR, textStatus, errorThrown) {
        console.log("textStatus: " + textStatus + "\n" + "errorThrown: " + errorThrown);
    }
    
    function validateForm(ev) {
        
        ev.preventDefault();

        fn = $("#fname").val();
        ln = $("#lname").val();
        em = $("input[type=\"em\"]").val();
        sb = $("#subject").val();
        ms = $("#message").val();
        pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

        if (fn !== "") {
            dt.name = fn;
        } else {
            errors.push("First Name?");
        }

        if (ln !== "") {
            dt.name = ln;
        } else {
            errors.push("Last Name?");
        }
        
        if (em !== "") {
            //evaluate email format
            if (pattern.test(em)) {

                dt.email = em;
            } else {
                errors.push("Invalid Email!");
            }
        } else {
            errors.push("Email Address?");
        }
        
        
        if (sb !== "") {
            dt.subject = sb;
        } else {
            errors.push("Subject?");
        }
        if (ms !== "") {
            dt.message = ms;
        } else {
            errors.push("Message?");
        }

        if (errors.length === 0) {
        //handle ajax 
            $.ajax({
                type: "post",
                url: "./php/service.php",
                data: dt,
                dataType: "text"
            }).done(handleResponse).fail(handleErrors);
        } else {
            collect = "Please fix the following errors:" + "<ul>";
            for (i = 0; i < errors.length; i += 1) {
                collect += "<li>" + errors[i] + "</li>";
            }
            $(".feedback").html(collect);
            errors = [];
            collect = "";
        }
    }
    
    /*
    // test 
    console.log(Pages); */
    
    
    function storeContents(container) {
        
        // if content already exists inside Pages
        if (contents[container]) {
            
            // load the content from Pages
            $(".container").html(contents[container]);
            
            console.log("Loaded from array!");
            
        } else {
            
            // load the content by ajax request
            $(".container").load(container, function (pageRsp) {
                
                contents[url] = pageRsp;
                
                console.log("Loaded by ajax request!");
            });
        }   
    }
    
    
    // what happens when link is clicked
    $("nav a").on("click", function (ev) {
        //alert("hello");
        
        ev.preventDefault();
        
        url = $(this).attr("href");
        
        /*
        // test
        console.log(url); */
        
        storeContents(url);
        $(".container").on("submit", "form", validateForm);
        
    });
    
    
    
    
    
    
    
    
});