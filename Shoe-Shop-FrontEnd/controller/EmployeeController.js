
/*let BaseUrl = "http://localhost:8080/back_End/";*/
loadAllEmployee();


/**
 * Employee Save
 * */
$("#btnSaveEmployee").attr('disabled', false);
$("#btnUpdateEmployee").attr('disabled', true);
$("#btnDeleteEmployee").attr('disabled', true);

/**
 * Employee Save
 * Employee ID
 * */
function generateEmployeeID() {
    $("#Employee_code").val("E00-001");
    $.ajax({
        url: "http://localhost:8080/back_End/employee/EmployeeIdGenerate",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (resp) {
            let id = resp.value;
            console.log("id" +id);

            if (id === null){
                $("#Employee_code").val("E00-001" );
            }else {
                let tempId = parseInt(id.split("-")[1]);
                tempId = tempId + 1;
                if (tempId <= 9) {
                    $("#Employee_code").val("E00-00" + tempId);
                } else if (tempId <= 99) {
                    $("#Employee_code").val("E00-0" + tempId);
                } else {
                    $("#Employee_code").val("E00-" + tempId);
                }
            }
        },
        error: function (ob, statusText, error) {

        }
    });
}



/**
 * Button Add New Employee
 * */

$("#btnSaveEmployee").click(function (){

    var image = $("#img");
    var imageUrl = image.attr('src');
    if (!imageUrl || imageUrl === '../../assets/img/login.jpg') {
        //alert("Error");
        //swal("Error", "Take Item Photo.!", "error");
    }

        let formData = $("#EmployeeForm").serialize();
    console.log(formData);
    $.ajax({
        url: "http://localhost:8080/back_End/employee",
        method: "POST",
        data: formData,
        dataType: "application/json",
        success: function (res) {
            console.log(res)
            saveUpdateAlert("Employee", res.message);
            /*generateEmployeeID();*/

        }, error: function (error) {
            unSuccessUpdateAlert("Employee", JSON.parse(error.responseText).message);
        }
    });
});


/**
 * clear input fields Values Method
 * */
function setTextFieldValues(code, name, pic, gender,status,designation,role,birth,joinDate,branch,E_address_1,E_address_2,E_address_3,E_address_4,E_address_5,contact,email,person,EmgContact) {
    $("#Employee_code").val(code);
    $("#employee_name").val(name);
    $("#EProfile_pic").val(pic);
    $("#E_gender").val(gender);
    $("#E_status").val(status);
    $("#designation").val(designation);
    $("#E_AccessRole").val(role);
    $("#E_dob").val(birth);
    $("#E_DOF").val(joinDate);
    $("#E_Attached").val(branch);
    $("#E_address_1").val(E_address_1);
    $("#E_address_2").val(E_address_2);
    $("#E_address_3").val(E_address_3);
    $("#E_address_4").val(E_address_4);
    $("#E_address_5").val(E_address_5);
    $("#E_ContactNo").val(contact);
    $("#E_email").val(email);
    $("#ICE").val(person);
    $("#E_E_contact").val(EmgContact);

    $("#Employee_code").focus();
    // checkValidity(employeeValidations);

    $("#btnAddEmployee").attr('disabled', false);
    $("#btnUpdateEmployee").attr('disabled', false);
    $("#btnDeleteEmployee").attr('disabled',false);
}


/**
load all customers Method
* */

function loadAllEmployee() {
    $("#employeeTable").empty();
    $.ajax({
        url: "http://localhost:8080/back_End/employee/loadAllEmployee",
        method: "GET",
        dataType: "json",
        success: function (res) {
            console.log(res);

            for (let i of res.data) {
                let code = i.code;
                let name = i.name;
                let pic = i.pic || ''; // Use empty string if pic is null
                let gender = i.gender;
                let status = i.status;
                let designation = i.designation;
                let role = i.role;
                let birth = i.birth;
                let joinDate = i.joinDate;
                let branch = i.branch;
                let address = i.address || {}; // Use empty object if address is null
                let contact = i.contact;
                let email = i.email;
                let person = i.person;
                let EmgContact = i.emgContact;
                // Access address properties correctly
                let ad1 = address.address1 || '';
                let ad2 = address.address2 || '';
                let ad3 = address.address3 || '';
                let ad4 = address.address4 || '';
                let ad5 = address.address5 || '';

                // Concatenate address properties
                let addressColumn =` ${ad1}, ${ad2}, ${ad3}, ${ad4}, ${ad5}`;


                let row = `<tr><td>${code}</td><td>${name}</td><td>${gender}</td><td>${status}</td><td>${designation}</td><td>${role}</td><td>${birth}</td><td>${joinDate}</td><td>${branch}</td><td>${addressColumn}</td><td>${contact}</td><td>${email}</td><td>${person}</td><td>${EmgContact}</td></tr>`;
                $("#employeeTable").append(row);
            }
        /*    blindClickEventsE();*/
            generateEmployeeID();
            setTextFieldValues("", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "","","");
            console.log(res.message);
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }
    });
}


$('#EProfile_pic').change(function() {
    var fileInput = $('#EProfile_pic')[0];
    var file = fileInput.files[0];

    if (file && (file.type.includes('image') || file.type === 'image/gif')) {
        var reader = new FileReader();
        reader.onload = function (e) {

            //itmCaptureClear();
            $('#img').attr('src', e.target.result);
        };
        reader.readAsDataURL(file);
        // $("#itmClear").prop("disabled", false);
        $(this).val("");
    } else {
        //$('#itemImgFileError').text('Please upload an image or GIF.');
        //$('#itemImgFileError').css("border", "1px solid #ced4da");
    }

});

/*
$("#search_Id").on("keypress", function (event) {
    if (event.which === 13) {
        var search = $("#search_Id").val();
        $("#employeeTable").empty();
        $.ajax({
            url: employeeBaseUrl + "employee/searchEmployee/?employee_Id="+ search,
            method: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                console.log(res);
                $("#Employee_code").val(res.Employee_code);
                $("#employee_name").val(res.employee_name);
                $("#EProfile_pic").val(res.EProfile_pic);
                $("#E_gender").val(res.E_gender);
                $("#E_status").val(res.E_status);
                $("#email").val(res.email);
                $("#nic_No").val(res.nic_No);
                $("#license_No").val(res.license_No);
                $("#license_Img").prop(res.license_Img);
                $("#driverAvailability").val(res.driverAvailability);
                $("#role_Type").val(res.user.role_Type);
                $("#user_Name").val(res.user.user_Name);
                $("#password").val(res.user.password);


                let row = "<tr><td>" + res.user_Id + "</td><td>" + res.name.firstName + "</td><td>" + res.name.lastName + "</td><td>" + res.contact_No + "</td><td>" + res.address + "</td><td>" + res.email + "</td><td>" + res.nic_No + "</td><td>" + res.license_No + "</td><td>" + res.driverAvailability + "</td><td>" + res.user.role_Type + "</td><td>" + res.user.user_Name + "</td><td>" + res.user.password + "</td></tr>";
                $("#driverTable").append(row);
            },
            error: function (error) {
                loadAllDrivers();
                let message = JSON.parse(error.responseText).message;
                emptyMassage(message);
            }
        })
    }

});*/
