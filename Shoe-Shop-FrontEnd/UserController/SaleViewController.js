
loadAllSales()


function loadAllSales() {
    $("#tblOrder").empty();
    $.ajax({
        url:  "http://localhost:8080/back_End/sales/LoadSales",
        method: "GET",
        dataType: "json",
        success: function (res) {
            console.log(res);

            for (let i of res.data) {
                let oid = i.oid;
                let date = i.date;
                let total = i.total;
                let Payment = i.Payment;
                let totalPoint = i.point;
                let cashierName = i.cashierName;
                let customerName = i.cusName;

                let row = "<tr><td>" + oid + "</td><td>" + date + "</td><td>" + total + "</td><td>" + Payment + "</td><td>"+ totalPoint + "</td><td>" + cashierName + "</td><td>" + customerName + "</td></tr>";
                $("#tblOrder").append(row);
            }
            console.log(res.message);
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }

    });
}

/*
function loadAllOrderDetails() {
    $("#tblOrderDetails").empty();
    $.ajax({
        url: "http://localhost:8080/back_End/sales",
        method: "GET",
        dataType: "json",
        success: function (res) {
            console.log(res);

            for (let i of res.data) {
                let oid = i.oid;
                let itemCode = i.itemCode;
                let qty = i.qty;
                let unitPrice = i.unitPrice;

                let row = "<tr><td>" + oid + "</td><td>" + itemCode + "</td><td>" + qty + "</td><td>" + unitPrice + "</td></tr>";
                $("#tblOrderDetails").append(row);
            }
            console.log(res.message);
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }

    });
}*/
