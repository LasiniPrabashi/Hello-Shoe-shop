

$(document).ready(function (){
    loadAllItem();
});


function setTextFieldValueI(code, Name, qty, itemPicture, category, size, supplier, supName, salePrice, buyPrice, expectedProfit, profitMargin, status) {
    $("#item_code").val(code);
    $("#inv_Item_Desc").val(Name);
    $("#inv_qty").val(qty);
    $("#inv_Item_pic").val(itemPicture);
    $("#inv_Category").val(category);
    $("#size").val(size);
    $("#inv_Supplier_Code").val(supplier);
    $("#inv_Supplier_name").val(supName);
    $("#inv_Unit_price").val(salePrice);
    $("#unit_price_Buy").val(buyPrice);
    $("#Expected_Profit").val(expectedProfit);
    $("#Profit_margin").val(profitMargin);
    $("#Inv_Status").val(status);

    $("#item_code").focus();

    $("#btnAddInventory").attr('disabled', false);
    $("#btnUpdateInventory").attr('disabled', false);
    $("#btnDeleteInventory").attr('disabled', false);
}

$("#btnAddInventory").click(function () {
    var image = $("#img");
    var imageUrl = image.attr('src');
    if (!imageUrl || imageUrl === '../../assets/img/login.jpg') {
        // Handle error scenario
    }

    let formData = $("#InventoryForm").serializeArray();
    formData.push({name: "itemPicture", value: imageUrl});
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/back_End/item",
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        data: formData,
        dataType: "json",
        success: function (res) {
            saveUpdateAlert("Item", res.message);
            // calculateExpectedProfit(); // Calculate expected profit after adding item
            loadAllItem();
        },
        error: function (xhr, status, error) {
            unSuccessUpdateAlert("Item", JSON.parse(xhr.responseText).message);
        }
    });
});

$("#inv_Supplier_Code").on("keypress", function (event) {
    if (event.which === 13) {
        // Enter key pressed
        var search = $("#inv_Supplier_Code").val();
        fetchSupplierName(search);
    }
});

$("#inv_Supplier_Code").empty();
/*performAuthenticatedRequest();
const accessToken = localStorage.getItem('accessToken');*/
$.ajax({
    url:  "http://localhost:8080/back_End/supplier",
    method: "GET",
    /*headers: {
        'Authorization': 'Bearer ' + accessToken
    },*/
    dataType: "json",
    success: function (res) {
        for (let i of res.data) {
            let code = i.code;
            $("#inv_Supplier_Code").append(`<option>${code}</option>`);
        }
    },
    error: function (error) {
        let message = JSON.parse(error.responseText).message;
        console.log(message);
    }
});

$("#inv_Supplier_Code").change(function () {
    var search = $("#inv_Supplier_Code").val();
    fetchSupplierName(search);
});

function fetchSupplierName(code) {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/back_End/supplier/searchSup?code=" + code,
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            $("#inv_Supplier_name").val(res.name);
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
            // Optionally, clear the supplier name field if the supplier code is invalid
            $("#inv_Supplier_name").val('');
        }
    });
}

function loadAllItem() {
    $("#inventoryTable").empty();
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url:  "http://localhost:8080/back_End/item",
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        dataType: "json",
        success: function (res) {
            for (let i of res.data) {
                let code = i.code;
                let name = i.name;
                let qty = i.qty;
                let itemPicture = i.itemPicture || '';
                let category = i.shoeType;
                let size = i.size;
                let supplier = i.supplier;
                let supName = i.supName;
                let salePrice = i.salePrice;
                let buyPrice = i.buyPrice;
                let expectedProfit = i.expectedProfit; // Use the provided expected profit
                let profitMargin = i.profitMargin;
                let status = i.status;

                let supId = supplier?.code || '';

                let row = `<tr><td>${code}</td><td>${name}</td><td>${qty}</td><td>${category}</td><td>${size}</td><td>${supId}</td><td>${supName}</td><td>${salePrice}</td><td>${buyPrice}</td><td>${expectedProfit}</td><td>${profitMargin}</td><td>${status}</td></tr>`;
                $("#inventoryTable").append(row);
            }
            blindClickEventsI();
            setTextFieldValueI("", "", "", "", "", "", "", "", "", "", "", "", "");
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }
    });
}

function blindClickEventsI() {
    $("#inventoryTable").on("click", "tr", function () {
        let code = $(this).children().eq(0).text();
        let Name = $(this).children().eq(1).text();
        let qty = $(this).children().eq(2).text();
        let category = $(this).children().eq(3).text();
        let size = $(this).children().eq(4).text();
        let supplier = $(this).children().eq(5).text();
        let supName = $(this).children().eq(6).text();
        let salePrice = $(this).children().eq(7).text();
        let buyPrice = $(this).children().eq(8).text();
        let expectedProfit = $(this).children().eq(9).text();
        let profitMargin = $(this).children().eq(10).text();
        let status = $(this).children().eq(11).text();

        setTextFieldValueI(code, Name, qty, "", category, size, supplier, supName, salePrice, buyPrice, expectedProfit, profitMargin, status);
    });

    $("#btnAddInventory").attr('disabled', false);
    $("#btnUpdateInventory").attr('disabled', false);
    $("#btnDeleteInventory").attr('disabled', false);
}

$("#btnUpdateInventory").click(function () {
    var image = $("#img");
    var imageUrl = image.attr('src');
    if (!imageUrl || imageUrl === '../../assets/img/login.jpg') {
        // Handle error scenario
    }

    let formData = $("#InventoryForm").serializeArray();
    formData.push({name: "itemPicture", value: imageUrl});
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/back_End/item",
        method: "PUT",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        data: formData,
        dataType: "json",
        success: function (res) {
            saveUpdateAlert("Item", res.message);
            loadAllItem();
        },
        error: function (xhr, status, error) {
            unSuccessUpdateAlert("Item", JSON.parse(xhr.responseText).message);
        }
    });
});

$("#btnDeleteInventory").click(function () {
    let code = $("#item_code").val();
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url:  "http://localhost:8080/back_End/item?code=" + code,
        method: "DELETE",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        dataType: "json",
        success: function (resp) {
            saveUpdateAlert("Item", resp.message);
            loadAllItem();
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            unSuccessUpdateAlert("Item", message);
        }
    });
});

$('#inv_Item_pic').change(function() {
    var fileInput = $('#inv_Item_pic')[0];
    var file = fileInput.files[0];

    if (file && (file.type.includes('image') || file.type === 'image/gif')) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#img').attr('src', e.target.result);
        };
        reader.readAsDataURL(file);
        $(this).val("");
    } else {
        // Handle error scenario
    }
});

//
// $("#search_inv_Id").on("keypress", function (event) {
//     if (event.which === 13) {
//         var search = $("#search_inv_Id").val();
//         $("#inventoryTable").empty();
//         $.ajax({
//             url: itemBaseUrl + "item/searchItem?code=" + search,
//             method: "GET",
//             contentType: "application/json",
//             dataType: "json",
//             success: function (res) {
//                 let code = res.code;
//                 let Name = res.name;
//                 let qty = res.qty;
//                 let category = res.shoeType;
//                 let size = res.size;
//                 let supplier = res.supplier?.code || '';
//                 let supName = res.supName;
//                 let salePrice = res.salePrice;
//                 let buyPrice = res.buyPrice;
//                 let expectedProfit = salePrice - buyPrice; // Calculate expected profit
//                 let profitMargin = res.profitMargin;
//                 let status = res.status;
//
//                 let row = <tr><td>${code}</td><td>${Name}</td><td>${qty}</td><td>${category}</td><td>${size}</td><td>${supplier}</td><td>${supName}</td><td>${salePrice}</td><td>${buyPrice}</td><td>${expectedProfit}</td><td>${profitMargin}</td><td>${status}</td></tr>;
//                 $("#inventoryTable").append(row);
//                 blindClickEventsI();
//             },
//             error: function (xhr) {
//                 let message = JSON.parse(xhr.responseText).message;
//                 emptyMassage(message);
//                 loadAllItem();
//             }
//         });
//     }
// });


$("#search_inv_Id").on("keypress", function (event) {
    if (event.which === 13) {
        var search = $("#search_inv_Id").val();
        $("#inventoryTable").empty();
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url:"http://localhost:8080/back_End/item/searchItem",
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            data: {
                code: search,
                name: search
            },
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                let code = res.code;
                let Name = res.name;
                let qty = res.qty;
                let category = res.shoeType;
                let size = res.size;
                let supplier = res.supplier?.code || '';
                let supName = res.supName;
                let salePrice = res.salePrice;
                let buyPrice = res.buyPrice;
                let expectedProfit = salePrice - buyPrice; // Calculate expected profit
                let profitMargin = res.profitMargin;
                let status = res.status;

                let row = `<tr><td>${code}</td><td>${Name}</td><td>${qty}</td><td>${category}</td><td>${size}</td><td>${supplier}</td><td>${supName}</td><td>${salePrice}</td><td>${buyPrice}</td><td>${expectedProfit}</td><td>${profitMargin}</td><td>${status}</td></tr>`;
                $("#inventoryTable").append(row);
                blindClickEventsI();
            },
            error: function (error) {
                loadAllItem();
                let message = JSON.parse(error.responseText).message;
                Swal.fire({
                    icon: "error",
                    title: "Request failed",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    }
});




function profitMargin() {
    let salePrice = parseFloat($("#inv_Unit_price").val());
    let buyPrice = parseFloat($("#unit_price_Buy").val());

    if (!isNaN(salePrice) && !isNaN(buyPrice)) {
        let profit = salePrice - buyPrice;
        let profitMargin = Math.round((profit / salePrice) * 100);
        profitMargin = profitMargin.toFixed(1);
        $("#Expected_Profit").val(profit);
        $("#Profit_margin").val(profitMargin);
    } else {
        $("#Expected_Profit").val('');
        $("#Profit_margin").val('');
    }
}
// Attach an event listener to the buyPrice input field
$("#unit_price_Buy").on("input", function() {
    // Call the profitMargin function
    profitMargin();
});




/*
$(document).ready(function () {
    loadAllItem();
});


$("#btnSaveInventory").attr('disabled', false);
$("#btnUpdateInventory").attr('disabled', false);
$("#btnDeleteInventory").attr('disabled', false);

$("#btnSaveInventory").click(function() {

    var image = $("#imgItem");
    var imageUrl = image.attr('src');
    if (!imageUrl || imageUrl === '../../assest/img/login.jpg') {
        alert("Error");
    }

    let formData = $("#InventoryForm").serializeArray();
    formData.push({name: "itemPicture", value: imageUrl});
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');

    $.ajax({
        success: function(res) {
            saveUpdateAlert("Item", res.message);
            loadAllItem();
        },
        url: "http://localhost:8080/back_End/item",
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        data: formData,
        dataType: "json",
        error: function(xhr, status, error) {
            unSuccessUpdateAlert("Item", JSON.parse(xhr.responseText).message);
            try {

                let message = JSON.parse(error.responseText).message;
                console.log(message);
            } catch (e) {

                console.error("Failed to parse JSON response:", e);
                console.error("Response text:", error.responseText);
            }
        }
    });
});


function loadAllItem() {
    $("#inventoryTable").empty();
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/back_End/item",
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        dataType: "json",
        success: function (res) {
            console.log(" item : "+res)
            for (let i of res.data) {
                let code = i.code;
                let name = i.name;
                let qty = i.qty;
                let itemPicture = i.itemPicture || '';
                let category = i.category;
                let size = i.size;
                let supplier = i.supplier;
                let supName = i.supName;
                let salePrice = i.salePrice;
                let buyPrice = i.buyPrice;
                let expectedProfit = i.expectedProfit;
                let profitMargin = i.profitMargin;
                let status = i.status;

               let supId = supplier?.code || '';

                let row = `<tr><td>${code}</td><td>${name}</td><td>${qty}</td><td>${category}</td><td>${size}</td><td>${supId}</td><td>${supName}</td><td>${salePrice}</td><td>${buyPrice}</td><td>${expectedProfit}</td><td>${profitMargin}</td><td>${status}</td></tr>`;
                $("#inventoryTable").append(row);
            }
            blindClickEventsI();
            setTextFieldValuesI("", "", "", "", "", "", "", "", "", "", "", "");
        },
        error: function (error) {
        }
    });
}

$("#supplier_id").empty();
$.ajax({
    url: "http://localhost:8080/back_End/supplier",
    method: "GET",
    dataType: "json",
    success: function (res) {
        console.log(res);

        for (let i of res.data) {
            let id = i.code;

            $("#supplier_id").append(`<option>${id}</option>`);
        }
        console.log(res.message);
    },
    error: function (error) {
        let message = JSON.parse(error.responseText).message;
        console.log(message);
    }

});


$("#supplier_id").keypress(function (e) {
    if (e.which == 13) { // Enter key pressed
        var search = $("#supplier_id").val();
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/back_End/supplier/searchSup?code="+ search,
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                console.log(res);
                $("#supName").val(res.name);
                // $("#point").val(res.loyaltyPoints);
                // $("#qtyOnHand").val(res.qty);
            },
            error: function (error) {
                let message = JSON.parse(error.responseText).message;
                console.log(message);
            }
        });
    }
});




$('#itemPicture').change(function() {
    var fileInput = $('#itemPicture')[0];
    var file = fileInput.files[0];

    if (file && (file.type.includes('image') || file.type === 'image/gif')) {
        var reader = new FileReader();
        reader.onload = function (e) {

            //itmCaptureClear();
            $('#imgItem').attr('src', e.target.result);
        };
        reader.readAsDataURL(file);
        // $("#itmClear").prop("disabled", false);
        $(this).val("");
    } else {
        //$('#itemImgFileError').text('Please upload an image or GIF.');
        //$('#itemImgFileError').css("border", "1px solid #ced4da");
    }

});

function setTextFieldValuesI(code, name, qty, Item_pic, category, supplier, Supplier_name, Unit_price, buyPrice, expectedProfit, profitMargin, Status) {
    $("#itemId").val(code);
    $("#itemName").val(name);
    $("#qty").val(qty);
    $("#Item_pic").val(Item_pic);
    $("#category").val(category);
    $("#size").val(size);
    $("#supplier_id").val(supplier);
    $("#supName").val(Supplier_name);
    $("#salePrice").val(Unit_price);
    $("#buyPrice").val(buyPrice);
    $("#expectedProfit").val(expectedProfit);
    $("#profitMargin").val(profitMargin);
    $("#status").val(Status);

    $("#itemId").focus();
    $("#btnSaveInventory").attr('disabled', false);
    $("#btnUpdateEmployee").attr('disabled', false);
    $("#btnDeleteEmployee").attr('disabled', false);

}

$("#btnUpdateInventory").click(function () {
    let formData = $("#InventoryForm").serialize();
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/back_End/item",
        method: "PUT",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        data: formData,
        dataType: "json",
        success: function (res) {
            saveUpdateAlert("Item updated", res.message);
            loadAllSupplier();
        },
        error: function (xhr, status, error) {
            unSuccessUpdateAlert("Item update failed", JSON.parse(xhr.responseText).message);
        }
    });
});

$("#btnDeleteInventory").click(function () {
    let id = $("#itemId").val();
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
        url: "http://localhost:8080/back_End/item?code=" + id,
        method: "DELETE",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        dataType: "json",
        success: function (resp) {
            saveUpdateAlert("Supplier", resp.message);
            loadAllItem();
        },
        error: function (xhr, status, error) {
            let message = JSON.parse(xhr.responseText).message;
            unSuccessUpdateAlert("Supplier", message);
        }
    });
});

function blindClickEventsI() {
    $("#inventoryTable").on("click", "tr", function () {
        let code = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let qty = $(this).children().eq(2).text();
       /!* let Item_pic = $(this).children().eq(3).text();*!/
        let category = $(this).children().eq(3).text();
        let size = $(this).children().eq(4).text();
        let supplier = $(this).children().eq(5).text();
        let Supplier_name = $(this).children().eq(6).text();
        let Unit_price = $(this).children().eq(7).text();
        let buyPrice = $(this).children().eq(8).text();
        let expectedProfit = $(this).children().eq(9).text();
        let profitMargin = $(this).children().eq(10).text();
        let Status = $(this).children().eq(11).text();


        // Set values to respective input fields
        $("#itemId").val(code);
        $("#itemName").val(name);
        $("#qty").val(qty);
       /!* $("#Item_pic").val(Item_pic);*!/
        $("#category").val(category);
        $("#size").val(size);
        $("#supplier_id").val(supplier);
        $("#supName").val(Supplier_name);
        $("#salePrice").val(Unit_price);
        $("#buyPrice").val(buyPrice);
        $("#expectedProfit").val(expectedProfit);
        $("#profitMargin").val(profitMargin);
        $("#status").val(Status);

    });

    $("#btnSaveInventory").attr('disabled',false);
}

$("#form1").on("keypress", function (event) {
    if (event.which === 13) {
        var search = $("#form1").val();
        $("#inventoryTable").empty();
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/back_End/item/searchItem",
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            data: {
                code: search,
                name: search
            },
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                console.log(res);
                if (res) {
                    let code = res.code;
                    let name = res.name;
                    let qty = res.shoeType;
                    let category = res.size;
                    let size = res.qty;
                    let supplier = res.supplier;
                    let supName = res.supName;
                    let salePrice = res.salePrice;
                    let buyPrice = res.buyPrice;
                    let expectedProfit = res.expectedProfit;
                    let profitMargin = res.profitMargin;
                    let status = res.status;

                    let supId = supplier_id.code;


                    let row = "<tr>" +
                        "<td>" + code + "</td>" +
                        "<td>" + name + "</td>" +
                        "<td>" + category + "</td>" +
                        "<td>" + size + "</td>" +
                        "<td>" + qty + "</td>" +
                        "<td>" + supId + "</td>" +
                        "<td>" + supName + "</td>" +
                        "<td>" + salePrice + "</td>" +
                        "<td>" + buyPrice + "</td>" +
                        "<td>" + expectedProfit + "</td>" +
                        "<td>" + profitMargin + "</td>" +
                        "<td>" + status + "</td>" +
                        "</tr>";
                    $("#inventoryTable").append(row);
                    blindClickEventsI();
                }
            },
            error: function (error) {
                loadAllItem();
                /!*let message = JSON.parse(error.responseText).message;
                console.error("Error:", message);*!/
            }
        });
    }
});




/!*$("#form3").on("keypress", function (event) {
    if (event.which === 13) {
        var search = $("#form").val();
        $("#inventoryTable").empty();
        $.ajax({
            url: "http://localhost:8080/back_End/item/searchItem?code=" + search,
            method: "GET",
            contentType: "application/json",
            dataType: "json",
            data: { supplier_Id: search }, // Send the search parameter as an object
            success: function (res) {
                console.log(res);
                if (res) {
                    let code = res.code;
                    let name = res.name;
                    let qty = res.qty;
                    let itemPicture = i.itemPicture || '';
                    let category = res.category;
                    let size = res.size;
                    let supplier = res.supplier;
                    let supName = res.supName;
                    let salePrice = res.salePrice;
                    let buyPrice = res.buyPrice;
                    let expectedProfit = res.expectedProfit;
                    let profitMargin = res.profitMargin;
                    let status = res.status;

                    let supId = supplier.code;

                    let row = `<tr><td>${code}</td><td>${name}</td><td>${qty}</td><td>${category}</td><td>${size}</td><td>${supId}</td><td>${supName}</td><td>${salePrice}</td><td>${buyPrice}</td><td>${expectedProfit}</td><td>${profitMargin}</td><td>${status}</td></tr>`;
                    $("#inventoryTable").append(row);
                    blindClickEventsI()
                } else {
                    // No data found
                    console.log("No data found");
                    // Handle this case if required
                }
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
                loadAllItem() // Load all employees as fallback
                let message = xhr.responseJSON ? xhr.responseJSON.message : "An error occurred";
                emptyMassage(message);
            }
        });
    }
});*!/

function profitMargin(){
    let salePrice = parseFloat($("#salePrice").val());
    let buyPrice = parseFloat($("#buyPrice").val());

    if (!isNaN(salePrice) && !isNaN(buyPrice)) {
        let profit = salePrice - buyPrice;
        let profitMargin = Math.round((profit / salePrice) * 100);
        profitMargin = profitMargin.toFixed(1);
        $("#expectedProfit").val(profit);
        $("#profitMargin").val(profitMargin);
    } else {
        $("#expectedProfit").val('');
        $("#profitMargin").val('');
    }
}

// Attach an event listener to the buyPrice input field
$("#buyPrice").on("input", function() {
    // Call the profitMargin function
    profitMargin();
});


*/
