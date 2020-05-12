/**
 * author: Wondyfarw Hailu
 * date : 10/05/2020
 * Care oparion by AJAX REST call
 *  
 */

(function() {

    getAllCars();

    /**
     * 
     */
    function getAllCars() {
        fetch("http://localhost:8080/careRent//car/newCar")
        .then((response) => {
            if(response.ok) {                
            return response.json();
            } else {
            return Promise.reject({ status: response.status, statusText: response.statusText });
            }
        })
        //.then(response=>response.json())
        .then(cars => {
            let content = "";
            console.log(cars);
            if(books.length > 0) {
                books.forEach(function(car, i) {
                content += `
                        <tr>
                            <th scope="row">${i+1}.</th>
                            <td>${book.isbn}</td>
                            <td>${book.bookTitle}</td>
                            <td>${book.overDueFee}</td>
                            <td>${book.datePublished}</td>
                            <td>${new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2}).format(book.overDueFee)}</td>
                        </tr>
                    `;
                }); 
            } else {
                content += `
                        <tr>
                            <td style="text-align: center;" colspan="9">No Book data found</td>
                        </tr>
                        `;
            };
            document.querySelector("#tbodyBooksList").innerHTML = content;
        })
        .catch(err => {
            const tbodyErrMsg = `<tr>
                                    <td style="text-align: center;" colspan="9"><p style='color:#ff0000;'>We are sorry. The online eLibrary data service is unavailable. Please try again later.</p></td>
                                </tr>`;
            // document.getElementById("tbodyAthletesList").innerHTML = "<p style='color:#ff0000;'>We are sorry. The eTDM Athletes data service is unavailable. Please try again later</p>";
            document.getElementById("tbodyBooksList").innerHTML = tbodyErrMsg;
            console.log("Error message:", err);            
        });
    }

    // Register New Athlete

    // Toggle (display/hide) the form
    $("#lnkBtnNewBookOrClose").click(function(event) {
        event.preventDefault();
        // const newAthleteFormLinkBtn = $(event.target);
        // const formstate = newAthleteFormLinkBtn.data("formstate");
        const formstate = $("#lnkBtnNewBookOrClose").attr("data-formstate");
        if(formstate == "off") {
            $("#lnkBtnNewBookOrClose").text("Close");
            $("#spnPageTitle").text("New Book Registration Form");
            $("#divNewBookForm").show("slow");
            $("#inputBookTitle").focus();
            $("#lnkBtnNewBookOrClose").attr("data-formstate", "on");
        } else {
            $("#lnkBtnNewBookOrClose").text("Register a New Book");
            $("#spnPageTitle").text("List of Books in our Collection");
            $("#divNewBookForm").hide("slow");
            $("#lnkBtnNewBookOrClose").attr("data-formstate", "off");
        }
    });

    // Submit form data
    function setupForSavingNewCar() {
        const bookRegistrationForm = document.getElementById("newBookRegistrationForm");
        const txtBookTitle = document.querySelector("#inputBookTitle");
        const txtISBN = document.querySelector("#inputISBN");
        const txtOverdueFee = document.querySelector("#inputOverdueFee");
        const txtPublisher = document.querySelector("#inputPublisher");
        const dtpDatePublished = document.querySelector("#inputDatePublished");
        //const alertMessageBox = document.getElementById("alertMessageBox");
        bookRegistrationForm.addEventListener("submit", function(e) {
            e.preventDefault();
            //const formData = new FormData(this);
            const bookTitle = txtBookTitle.value;
            const isbn = txtISBN.value;
            const overdueFee = parseInt(txtOverdueFee.value);
            const publisher = txtPublisher.value;
            const dateOfPublished = dtpDatePublished.value;

            const newBookData = {
                "isbn": isbn,
                "bookTitle": bookTitle,
                "overDueFee": overdueFee,
                "publisher": publisher,
                "datePublished": dateOfPublished
            };
            // Remember to set Data/MIME type
            fetch("http://localhost:8080/eLibrary/book/new", {
                method: "post",
                body: JSON.stringify(newBookData),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function(response) {
                return {"status": "ok"}; //response.json();
            }).then(function (jsonResponseData) {
                console.log(jsonResponseData);   
                
                getAllCars();

                txtBookTitle.value = "";     
                txtISBN.value = "";   
                txtOverdueFee.value = "0.00";
                txtPublisher.value = "";
                dtpDatePublished.value = "";  
                txtBookTitle.focus();
                //alertMessageBox.style.display = "inline-block";
            }).catch(function(error) {
                console.error(error);
            })
        });
    }
    setupForSavingNewCar();

})();