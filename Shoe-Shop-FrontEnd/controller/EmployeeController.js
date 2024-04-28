
let baseUrl = "http://localhost:8080/back_End/";

loadAllEmployee();

/**
 * Employee Save
 * */
$("#btnSaveEmployee").attr('disabled', true);
$("#btnUpdateEmployee").attr('disabled', true);
$("#btnDeleteEmployee").attr('disabled', true);

/**
 * Employee Save
 * Employee ID
 * */
function generateEmployeeID() {
    $("#Employee_code").val("E00-001");
    $.ajax({
        url: baseUrl + "employee/EmployeeIdGenerate",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (resp) {
            let id = resp.value;
            console.log("id" +id);
            let tempId = parseInt(id.split("-")[1]);
            tempId = tempId + 1;
            if (tempId <= 9) {
                $("#Employee_code").val("E00-00" + tempId);
            } else if (tempId <= 99) {
                $("#Employee_code").val("E00-0" + tempId);
            } else {
                $("#Employee_code").val("E00-" + tempId);
            }
        },
        error: function (ob, statusText, error) {

        }
    });
}

/**
 * Button Add New Employee
 * */

$("#btnSaveEmployee").click(function () {
    let formData = $("#EmployeeForm").serialize();
    console.log(formData);
    $.ajax({
        url: baseUrl + "employee", method: "post", data: formData, dataType: "json", success: function (res) {
            saveUpdateAlert("Employee", res.message);
            loadAllEmployee();
        }, error: function (error) {
            unSuccessUpdateAlert("Employee", JSON.parse(error.responseText).message);
        }
    });
});

/**
 * clear input fields Values Method
 * */
function setTextFieldValues(Employee_code, firstName, Profile_pic, gender,status,role,AccessRole,dob,DOF,branch,line1,line2,line3,line4,line5,ContactNo,email,ICE,contct) {
    $("#Employee_code").val(Employee_code);
    $("#firstName").val(firstName);
    $("#Profile_pic").val(Profile_pic);
    $("#gender").val(gender);
    $("#status").val(status);
    $("#role").val(role);
    $("#AccessRole").val(AccessRole);
    $("#dob").val(dob);
    $("#DOF").val(DOF);
    $("#Attached").val(branch);
    $("#line1").val(line1);
    $("#line2").val(line2);
    $("#line3").val(line3);
    $("#line4").val(line4);
    $("#line5").val(line5);
    $("#ContactNo").val(ContactNo);
    $("#email").val(email);
    $("#ICE").val(ICE);
    $("#contct").val(contct);
    $("#firstName").focus();
    checkValidity(customerValidations);
    $("#btnSaveEmployee").attr('disabled', true);
    $("#btnUpdateEmployee").attr('disabled', true);
    $("#btnDeleteEmployee").attr('disabled', true);
}

/**
load all customers Method
* */
function loadAllEmployee() {
    $("#employeeTable").empty();
    $.ajax({
        url: baseUrl + "employee/loadAllEmployee",
        method: "GET", dataType: "json", success: function (res) {
            console.log(res);

            for (let i of res.data) {
                let code = i.code;
                let firstName = i.firstName;
                let gender = i.gender;
                let status = i.status;
                let role = i.role;
                let AccessRole = i.AccessRole;
                let dob = i.dob;
                let DOF = i.DOF;
                let branch = i.branch;
                let Address = i.Address;
                let ContactNo = i.ContactNo;
                let Email = i.Email;
                let ICE = i.ICE;
                let EmgContact = i.EmgContact;


                let row = "<tr><td>" + code + "</td><td>" + firstName + "</td><td>" + gender + "</td><td>" + status + "</td><td>" + role + "</td><td>" + AccessRole +  "</td><td>" + dob + "</td><td>" + DOF + "</td><td>" + branch + "</td><td>" + Address + "</td><td>" + ContactNo + "</td><td>" + Email + "</td><td>" + ICE + "</td><td>" + EmgContact + "</td></tr>";
                $("#employeeTable").append(row);
            }
            blindClickEvents();
            generateEmployeeID();
            setTextFieldValues("", "", "", "","","","","","","","","","","","","","","","");
            console.log(res.message);
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }

    });
}