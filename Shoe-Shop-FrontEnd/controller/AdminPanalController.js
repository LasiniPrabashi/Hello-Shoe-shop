

$(document).ready(function() {
    performAuthenticatedRequest();

    function performAuthenticatedRequest() {
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/back_End/sales/TodayOrders",
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            contentType: "application/json",
            dataType: "json",
            success: function(resp) {
                console.log("Response received:", resp); // Log the response for debugging
                if (resp.state === "OK") { // Check for 'state' instead of 'status'
                    let num = resp.data.length; // Assuming 'data' is an array of today's orders
                    $("#todaySales").text(num);
                } else {
                    console.error("Unexpected response format:", resp);
                }
            },
            error: function(ob, statusText, error) {
                console.error("Error fetching today's sales:", statusText, error);
            }
        });
    }
});
