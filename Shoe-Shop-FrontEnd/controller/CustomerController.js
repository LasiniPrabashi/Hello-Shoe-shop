
loadAllCus()

// Get the current date and time
let currentDateTime = new Date();

// Get the date components
let year = currentDateTime.getFullYear();
let month = currentDateTime.getMonth() + 1;
let day = currentDateTime.getDate();

// Get the time components
let hours = currentDateTime.getHours();
let minutes = currentDateTime.getMinutes();
let seconds = currentDateTime.getSeconds();

// Format the date and time as strings
let formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
let formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

// Set the value of the input field with id 'cusName' to the formatted date and time
$('#recentPurchaseDate').val(`${formattedDate} ${formattedTime}`);

$("#btnSaveCustomer").attr('disabled', false);
$("#btnUpdateCustomer").attr('disabled', false);
$("#btnDeleteCustomer").attr('disabled', false);

function generateCustomerID() {
    $("#cusId").val("C00-001");
    $.ajax({
        url: "http://localhost:8080/back_End/customer/cusIdGenerate",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (resp) {
            let id = resp.value;
            console.log("id" +id);

            if (id === null){
                $("#cusId").val("C00-001" );
            }else {
                let tempId = parseInt(id.split("-")[1]);
                tempId = tempId + 1;
                if (tempId <= 9) {
                    $("#cusId").val("C00-00" + tempId);
                } else if (tempId <= 99) {
                    $("#cusId").val("C00-0" + tempId);
                } else {
                    $("#cusId").val("C00-" + tempId);
                }
            }
        },
        error: function (ob, statusText, error) {

        }
    });
}

function loadAllCus() {
    $("#customerTable").empty();
    $.ajax({
        url: "http://localhost:8080/back_End/customer",
        method: "GET",
        dataType: "json",
        success: function(res) {
            for (let customer of res.data) {
                let code = customer.code;
                let name = customer.name;
                let gender = customer.gender;
                let contact = customer.loyaltyDate;
                let level = customer.level;
                let points = customer.points;
                let dob = customer.dob;
                let address = customer.address || {};
                let time = customer.contact;
                let email = customer.email;


                let ad1 = address.address1 || '';
                let ad2 = address.address2 || '';
                let ad3 = address.address3 || '';
                let ad4 = address.address4 || '';
                let ad5 = address.address5 || '';
                let addressColumn =  `${ad1}, ${ad2}, ${ad3}, ${ad4}, ${ad5}`;

                let row = `<tr><td>${code}</td><td>${name}</td><td>${gender}</td><td>${contact}</td><td>${level}</td><td>${points}</td><td>${dob}</td><td>${addressColumn}</td><td>${time}</td>><td>${email}</td></tr>`;
                $("#suppliersTable").append(row);
            }
            blindClickEventsS()
            generateCustomerID()
            setTextFieldValuesC("","","","","","","","","","","","","","","");
        },
        error: function(error) {
            console.error(error);
        }
    });
}

$("#btnSaveCustomer").click(function (){
    $('#recentPurchaseDate').val(`${formattedDate} ${formattedTime}`);
    let formData = $("#customerForm").serialize();
    console.log(formData);
    $.ajax({
        url: "http://localhost:8080/back_End/customer",
        method: "POST",
        data: formData,
        dataType: "json",
        success: function (res) {
            console.log(res)
            saveUpdateAlert("Customer", res.message);
            loadAllEmployee()
             generateCustomerID()

        }, error: function (error) {
            unSuccessUpdateAlert("Customer", JSON.parse(error.responseText).message);
        }
    });
});

function setTextFieldValuesC(code, name,gender,loyaltyDate,level,loyaltyPoints,dob,address1,address2,address3,address4,address5,contact,email,recentPurchaseDate) {
    $("#cusId").val(code);
    $("#customer_name").val(name);
    $("#gender").val(gender);
    $("#customer_jdlc").val(loyaltyDate);
    $("#level").val(level);
    $("#total_point").val(loyaltyPoints);
    $("#DOB").val(dob);
    $("#c_address_01").val(address1);
    $("#c_address_02").val(address2);
    $("#c_address_03").val(address3);
    $("#c_address_04").val(address4);
    $("#c_address_05").val(address5);
    $("#c_contact_num").val(contact);
    $("#customer_email").val(email);
    $("#recentPurchaseDate").val(recentPurchaseDate);

    $("#cusId").focus();

    // Enable buttons
    $("#btnSaveCustomer").attr('disabled', false);
    $("#btnUpdateCustomer").attr('disabled', false);
    $("#btnDeleteCustomer").attr('disabled', false);
}

function blindClickEventsS() {
    $("#customerTable").on("click", "tr", function () {
        let code = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let gender = $(this).children().eq(2).text();
        let loyaltyDate = $(this).children().eq(3).text();
        let level = $(this).children().eq(4).text();
        let loyaltyPoints = $(this).children().eq(5).text();
        let dob = $(this).children().eq(6).text();
        let addressColumn = $(this).children().eq(7).text(); // Assuming address is in one column

        // Split address into individual components
        let addressComponents = addressColumn.split(', ');
        let address1 = addressComponents[0] || '';
        let address2 = addressComponents[1] || '';
        let address3 = addressComponents[2] || '';
        let address4 = addressComponents[3] || '';
        let address5 = addressComponents[4] || '';

        let contact = $(this).children().eq(8).text();
        let email = $(this).children().eq(9).text();
        let recentPurchaseDate = $(this).children().eq(10).text();



        // Set values to respective input fields
        $("#cusId").val(code);
        $("#customer_name").val(name);
        $("#gender").val(gender);
        $("#customer_jdlc").val(loyaltyDate);
        $("#level").val(level);
        $("#total_point").val(loyaltyPoints);
        $("#DOB").val(dob);
        $("#c_address_01").val(address1);
        $("#c_address_02").val(address2);
        $("#c_address_03").val(address3);
        $("#c_address_04").val(address4);
        $("#c_address_05").val(address5);
        $("#c_contact_num").val(contact);
        $("#customer_email").val(email);
        $("#recentPurchaseDate").val(recentPurchaseDate);

    });

    $("#btnSaveCustomer").attr('disabled',false);
}






