$("#btnUpdateUser").click(function () {
    searchUser($("#Useremail").val()).then(function (user) {
        if (user) {
            //performAuthenticatedRequest();
            // const accessToken = localStorage.getItem('accessToken');
            let value = {
                email: $("#Useremail").val(),
                password: $("#userpass").val(),
                role: $('#Userrole').val()
            }
            console.log(value);
            $.ajax({
                url: "http://localhost:8080/back_End/api/v1/auth/user",
                method: "PUT",
                data: JSON.stringify(value),
                contentType: "application/json",
                success: function (res, textStatus, jsXH) {
                    saveUpdateAlert("Update", resp.message);
                },
                error: function (ob, textStatus, error) {
                    unSuccessUpdateAlert("Update", message);
                }
            });

        } else {
            alert("User not exits.!")
        }
    });
});

$("#btnDeleteUser").click(function () {
    let id = $("#Useremail").val();

    searchUser(id).then(function (isValid) {
        if (isValid == false) {
            alert("No such user..please check the ID")
        } else {


            // performAuthenticatedRequest();
            // const accessToken = localStorage.getItem('accessToken');
            let value = {
                email: $("#Useremail").val(),
                password: $("#userpass").val(),
                role: $('#Userrole').val()
            }
            $.ajax({
                url: "http://localhost:8080/back_End/api/v1/auth/user",
                method: "DELETE",
                data: JSON.stringify(value),
                contentType: "application/json",
                success: function (res) {
                    console.log(res);
                    alert("user Delete Successfully")
                    // swal("Deleted", "Admin Delete Successfully", "success");
                    // adminClear();
                    //getAllAdmins();
                    //captureClear();


                },
                error: function (ob, textStatus, error) {
                    alert("Error user Not Delete")
                }
            });
        }

    });

    /*$("#customerID").prop('disabled', true);
    $("#customerName").prop('disabled', true);
    $("#customerAddress").prop('disabled', true);*/

});

function searchUser(name) {
    return new Promise(function (resolve, reject) {
        /*performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        console.log(accessToken);*/
        $.ajax({
            url: "http://localhost:8080/back_End/api/v1/auth/search/" + name,
            method: "GET",
            dataType: "json",
            success: function (res, textStatus, xhr) {
                if (xhr.status === 200) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            },
            error: function (ob, textStatus, error) {
                resolve(false);
            }
        });
    });

}

/*function loadAllUser() {
    $("#userTable").empty();
    /!*performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');*!/
    $.ajax({
        url: "http://localhost:8080/back_End/api/v1/auth",
        method: "GET",
        /!*headers: {
            'Authorization': 'Bearer ' + accessToken
        },*!/
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
            blindClickEventsE();
            generateEmployeeID();
            setTextFieldValues("", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "","","");
            console.log(res.message);
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }
    });
}*/
