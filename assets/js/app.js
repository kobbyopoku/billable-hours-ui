// GLOBAL VARIABLES DECLARATIONS
var baseUrl = "http://localhost:8000/"
var apiRoute = "api/v1/"


var addAdminUserApi = baseUrl + apiRoute + "employee";
var loginApi = baseUrl + apiRoute + "login";
var getAllUsers = baseUrl + apiRoute + "employees";
var assignCustomersApi = baseUrl + apiRoute + "job/employee/";
var customerDataApi = baseUrl + apiRoute + "invoices";
var jobsDataApi = baseUrl + apiRoute + "jobs";
var generateInvoice = baseUrl + apiRoute + "invoice/generate/";
var deleteAdminUserStatus = baseUrl + apiRoute + "employee/"
var deleteJob = baseUrl + apiRoute + "jobs/"


var subscriberStartDate = "";
var subscriberEndDate = "";

var allStartDate = "";
var allEndDate = "";


// MONTHS
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// On Login Check if enter key is pressed
$("#password").keyup(function (event) {
    if (event.keyCode === 13) {
        $("#loginBtn").click();
    }
});
/** RETRY BTN **/
$("#retryBtn").click(function (e) {
    location.reload();
});

/**When promo btn is clicked **/
$("#viewPromoBtn").click(function (e) {
    getPromoData();

});

// TAG AND UNTAG BTN
$("#tagUntagBtn").click(function (e) {
    swal({
        title: "Select an option",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Tag Promo",
        cancelButtonText: "Untag Promo",
        closeOnConfirm: true,
        closeOnCancel: true
    }, function (isConfirm) {
        //THIS WILL HANDLE TAG PROMO BUTTON
        if (isConfirm) {
            $('#tagCustomersModal').modal('show');
            $('#untagCustomersModal').modal('hide');
        } else {
            appendPromoNames();
            $('#untagCustomersModal').modal('show');
            $('#tagCustomersModal').modal('hide');

        }

    });

});

// Manage Customers //Assign and Delete Customers
$("#manageCustomersBtn").click(function (e) {
    swal({
        title: "Select an option",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Record",
        cancelButtonText: "Cancel",
        closeOnConfirm: true,
        closeOnCancel: true
    }, function (isConfirm) {
        //THIS WILL HANDLE ASSIGN CUSTOMERS BUTTON
        if (isConfirm) {
            $('#assignCustomersModal').modal('show');
            $('#deleteCustomersModal').modal('hide');
        } else {
            appendPromoNames();
            $('#deleteCustomersModal').modal('show');
            $('#assignCustomersModal').modal('hide');

        }

    });

});

// SET TARGET BTN
$("#setTargetsBtn").click(function (e) {
    swal({
        title: "Set Target?",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Global Target",
        cancelButtonText: "Activity Target",
        closeOnConfirm: true,
        closeOnCancel: true
    }, function (isConfirm) {
        //THIS WILL HANDLE TAG PROMO BUTTON
        if (isConfirm) {
            $('#setGlobalTargetModal').modal('show');
            $('#setActivityTargetModal').modal('hide');
        } else {
            $('#setActivityTargetModal').modal('show');
            $('#setGlobalTargetModal').modal('hide');
        }

    });

});

// Edit Target Btn
$("#editTargetsBtn").click(function (e) {
    swal({
        title: "Edit Target?",
        text: "",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Global Target",
        cancelButtonText: "Activity Target",
        closeOnConfirm: true,
        closeOnCancel: true
    }, function (isConfirm) {
        //THIS WILL HANDLE TAG PROMO BUTTON
        if (isConfirm) {
            $('#editGlobalTargetModal').modal('show');

            getStoredGlobalTarget();

            $('#editActivityTargetModal').modal('hide');
        } else {
            $('#editActivityTargetModal').modal('show');
            $('#editGlobalTargetModal').modal('hide');
        }

    });

});



/** Remove Item in storge when logout BTN CLICK**/
$("#logoutBtn").click(function (e) {

    swal({
        title: "Are you sure?",
        text: "",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: true,
        showLoaderOnConfirm: true,
        confirmButtonText: "Yes"
    },
            function () {
                sessionStorage.clear();
                window.location.href = "index.php";
            });

});


// Logout Button on the dashboard when clicked
/** Remove Item in storge when logout BTN CLICK**/
$("#logoutDashBtn").click(function (e) {

    swal({
        title: "Are you sure?",
        text: "",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: true,
        showLoaderOnConfirm: true,
        confirmButtonText: "Yes"
    },
            function () {
                sessionStorage.clear();
                window.location.href = "index.php";
            });

});




/** APPEND PROMO NAMES **/

function appendPromoNames() {
    var request = $.ajax({
        url: getPromoNamesApi,
        type: "GET",
        contentType: "application/json"
    });

    request.done(function (data) {
        if (data.RESPONSE_CODE == "200") {
            $('#untagPromoName').empty();
            var allData = data["RESPONSE_DATA"];
            var untagPromoName = $('#untagPromoName');
            untagPromoName.append($("<option></option>").attr("value", "").text("Select Promo"));

            if (allData.length == 0) {
                displayErrorMsgModal("Sorry no promo available");
                return false;
            } else {
                for (i = 0; i < allData.length; i++) {
                    mainData = allData[i];
                    if (mainData != null) {
                        untagPromoName.append($("<option></option>").attr("value", mainData).text(mainData));
                    }
                }
            }
        } else {
            console.log(data)
        }
    });

    // Handle when it failed to connect
    request.fail(function (jqXHR, textStatus) {
        console.log(textStatus);
    });
}

/** APPEND AGENTS **/
var allAgents = [];
function appendAgents() {
    var request = $.ajax({
        url: getAllUsers,
        type: "GET",
        contentType: "application/json"
    });

    request.done(function (data) {
        if (data.status == "200") {
            var allData = data.employees;
            var selectAgentType = $('#selectAgentType');
            var editSelectAgentType = $('#editSelectAgentType');


            for (i = 0; i < allData.length; i++) {
                mainData = allData[i];

                if (mainData.role == "LAWYER") {
                    allAgents.push(mainData.firstName + ' ' + mainData.lastName);
                    selectAgentType.append($("<option></option>").attr("value", mainData.id).text(mainData.firstName + ' ' + mainData.lastName));
                    editSelectAgentType.append($("<option></option>").attr("value", mainData.id).text(mainData.firstName + ' ' + mainData.lastName));
                }

            }
        } else {
            console.log(data)
        }
    });

    // Handle when it failed to connect
    request.fail(function (jqXHR, textStatus) {
        console.log(textStatus);
    });
}

/** GET STORED GLOBAL TARGETS BY MONTHS **/

function getStoredGlobalTarget() {
    var formData = {
        "month": monthNames[new Date().getMonth()]
    };

    formData = JSON.stringify(formData);

    var request = $.ajax({
        url: getStoredGlobalTargetApi,
        type: "POST",
        data: formData,
        contentType: "application/json"
    });
    request.done(function (data) {
        if (data.RESPONSE_CODE == "200") {
            var allData = data["RESPONSE_DATA"];
            $('#editVodafoneCashTarget').val(allData.vfcash_target);
            $('#editUpgradeTarget').val(allData.upgrade_target);
            $('#editDowngradeTarget').val(allData.downgrade_target);
        } else {
            console.log(data)
        }
    });

    // Handle when it failed to connect
    request.fail(function (jqXHR, textStatus) {
        console.log(textStatus);
    });
}

/** APPEND CUSTOMERS (THIS WAS NOT USED , CSV FILE WAS USED INSTEAD**/
function appendCustomers() {
    var request = $.ajax({
        url: getUnasssignedCustomers,
        type: "GET",
        contentType: "application/json"
    });

    request.done(function (data) {
        if (data.RESPONSE_CODE == "200") {
            var allData = data["RESPONSE_DATA"];
            var selectCustomers = $('#selectCustomers');

            for (i = 0; i < allData.length; i++) {
                mainData = allData[i];
                selectCustomers.append($("<option></option>").attr("value", mainData.accountno).text((mainData.acct_name)));
            }

            $('.selectpicker').selectpicker('refresh');
        } else {
            console.log(data)
        }
    });

    // Handle when it failed to connect
    request.fail(function (jqXHR, textStatus) {
        console.log(textStatus);
    });
}

/** LOGIN API **/

$("#loginBtn").click(function (e) {
    e.preventDefault();
    show_loader();
    var username = $('#username').val();
    var password = $('#password').val();

    if ((username == "" || username == undefined) && (password == "" || password == undefined)) {
        displayErrorMsg("Username and password must be filled"); //display Error message
        return false;
    } else if (username == "" || username == undefined) {
        displayErrorMsg("Username must be filled"); //display Error message
        return false;
    } else if (password == "" || password == undefined) {
        displayErrorMsg("Password must be filled"); //display Error message
        return false;
    } else {

        $("#loginBtn").prop("disabled", true);
        var formData = {
            "email": username,
            "password": password
        };

        formData = JSON.stringify(formData);

        var request = $.ajax({
            url: loginApi,
            type: "POST",
            data: formData,
            contentType: "application/json"
        });

        request.done(function (data) {
            if (data.status == "200") {
                document.getElementById("loginForm").reset();
                $("#loginBtn").removeAttr('disabled');

                var userRole = data.employee.role;

                console.log(userRole)
                // Save data to sessionStorage
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('userRole', userRole);

                if (userRole == "FINANCE") {
                    window.location.href = "users.php"
                } else {
                    window.location.href = "jobs.php"
                }

                console.log(data);
                displaySuccessToast((data.message), ""); //DISPLAY TOAST
            } else {
                hide_loader();
                $("#loginBtn").removeAttr('disabled');
                console.log(data)
                displayErrorMsg((data.message)); //display Error message
            }
        });

        // Handle when it failed to connect
        request.fail(function (jqXHR, textStatus) {
            console.log(textStatus);
            $("#loginBtn").removeAttr('disabled');
            //show the error message
            displayErrorMsg("Sorry, something went wrong");
        });

    }

});

//Get stored item from storage with this function
function getStoredItem() {
    // Get saved data from sessionStorage
    var username = sessionStorage.getItem('username');
    var userRole = sessionStorage.getItem('userRole');

    if (username === null) {
        window.location.href = "index.php";
    } else {
        $("#showUsername").html(username);
    }

    if (userRole == "Agent") {
        displaySuccessToast("Agent account was logged in, redirecting...");
        window.location.href = "agent-base.php"
    }
}

//Get customer data --->>> Base View Page
function getEmployeeJobs() {
    show_loader();

    var table_list = "";
    var editJob = "";
    var deleteJob = "";

    $('#baseViewExportTable').DataTable().destroy();
    $('#customerDataTable').html("");

    var formData = {};
    formData = JSON.stringify(formData);

    var request = $.ajax({
        url: jobsDataApi,
        type: "GET"
    });

//HANDLE response here
    request.done(function (data) {
        if (data.status == "200") {

            var allData = data.jobList;

            for (i = 0; i < allData.length; i++) {
                mainData = allData[i];
                var detailsJson = JSON.stringify(mainData);

                deleteJob = "<a href='#' rel='tooltip' data-job-delete='" + detailsJson + "' class='' data-toggle='tooltip' data-placement='bottom' title='Delete Job'><i class='ti-trash'></i></button>";
                editJob = "<a href='#' rel='tooltip' data-user-edit='" + detailsJson + "' class='' data-toggle='tooltip' data-placement='bottom' title='Edit Job'><i class='ti-pencil'></i></button>";

                table_list +=
                        "<tr width='100%'>" +
                        "<td>" + mainData.id + "</td>" +
                        "<td>" + mainData.employee.firstName + " " + mainData.employee.lastName + "</td>" +
                        "<td>" + mainData.project + "</td>" +
                        "<td >" + mainData.date + "</td>" +
                        "<td>" + mainData.startTime + "</td>" +
                        "<td>" + mainData.endTime + "</td>" +
                        "<td>" + mainData.status + "</td>" +
                        "<td class='td-actions' >" + deleteJob + "&nbsp;" + editJob + "</td>" +
                        "</tr>"

            }


            //Append the tables here
            $('#customerDataTable').html(table_list);

            //Base view table
            $('#baseViewExportTable').DataTable({
                dom: 'Bfrtip',
                scrollX: true,
                select: true,
                buttons: {
                    buttons: [{
                            extend: 'copy',
                            text: 'Copy',
                            title: $('h1').text(),
                            exportOptions: {
                                columns: ':not(.no-print)'
                            },
                            footer: true
                        }, {
                            extend: 'excel',
                            text: 'Excel',
                            title: $('h1').text(),
                            exportOptions: {
                                columns: ':not(.no-print)'
                            },
                            footer: true
                        }, {
                            extend: 'csv',
                            text: 'Csv',
                            title: $('h1').text(),
                            exportOptions: {
                                columns: ':not(.no-print)'
                            },
                            footer: true
                        }, {
                            extend: 'pdf',
                            text: 'Pdf',
                            title: $('h1').text(),
                            exportOptions: {
                                columns: ':not(.no-print)'
                            },
                            footer: true
                        }, {
                            extend: 'print',
                            text: 'Print',
                            title: $('h1').text(),
                            exportOptions: {
                                columns: ':not(.no-print)'
                            },
                            footer: true,
                            autoPrint: true
                        }],
                    dom: {
                        container: {
                            className: 'dt-buttons'
                        },
                        button: {
                            className: 'btn btn-primary'
                        }
                    }
                }
            });

//            hide_loader();
            displaySuccessToast((data.message), ""); //DISPLAY TOAST
        } else {
            displayErrorMsg((data.message));
        }

    });

// Handle when it failed to connect
    request.fail(function (jqXHR, textStatus) {
        console.log(textStatus);
        hide_loader();
        //show the error message
        $('#handleErrorMessages').show("fast");
        // displayErrorMsg("Sorry, something went wrong");
    });

}

function getInvoiceData() {
    show_loader();

    var table_list = "";
    var assignedAgent = "";
    var trafficLight = "";
    var accountDetails = "";
    var moreDetails = "";
    var deleteInvoice = "";
    var displayRgs = "";
    ;
    var lockedBase = 0;

    $('#baseViewExportTable').DataTable().destroy();
    $('#customerDataTable').html("");

    var formData = {};
    formData = JSON.stringify(formData);

    var request = $.ajax({
        url: customerDataApi,
        type: "GET"
    });

//HANDLE response here
    request.done(function (data) {
        if (data.status == "200") {

            var allData = data.invoice;

            for (i = 0; i < allData.length; i++) {
                mainData = allData[i];
                var detailsJson = JSON.stringify(mainData);


                deleteInvoice = "<a href='#' rel='tooltip' data-invoice-delete='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='Feedbacks' ><i class='ti-trash'></i></a>";
                accountDetails = "<a href='#' rel='tooltip' data-invoice-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='View Invoice' style='text-decoration: underline !important;'><i class='ti-eye'></i></a>";


                // check RGS

                table_list +=
                        "<tr width='100%'>" +
                        "<td>" + mainData.id + "</td>" +
                        "<td>" + mainData.company + "</td>" +
                        "<td>" + mainData.invoiceStatus + "</td>" +
                        "<td >" + mainData.invoiceDate + "</td>" +
                        "<td>" + mainData.itemsCount + "</td>" +
                        "<td class='td-actions' >" + deleteInvoice + "&nbsp;" + accountDetails + "</td>" +
                        "</tr>"

            }

            //Append the tables here
            $('#customerDataTable').html(table_list);

            //Base view table
            $('#baseViewExportTable').DataTable({
                dom: 'Bfrtip',
                scrollX: true,
                select: true,
                buttons: {
                    buttons: [{
                            extend: 'copy',
                            text: 'Copy',
                            title: $('h1').text(),
                            exportOptions: {
                                columns: ':not(.no-print)'
                            },
                            footer: true
                        }, {
                            extend: 'excel',
                            text: 'Excel',
                            title: $('h1').text(),
                            exportOptions: {
                                columns: ':not(.no-print)'
                            },
                            footer: true
                        }, {
                            extend: 'csv',
                            text: 'Csv',
                            title: $('h1').text(),
                            exportOptions: {
                                columns: ':not(.no-print)'
                            },
                            footer: true
                        }, {
                            extend: 'pdf',
                            text: 'Pdf',
                            title: $('h1').text(),
                            exportOptions: {
                                columns: ':not(.no-print)'
                            },
                            footer: true
                        }, {
                            extend: 'print',
                            text: 'Print',
                            title: $('h1').text(),
                            exportOptions: {
                                columns: ':not(.no-print)'
                            },
                            footer: true,
                            autoPrint: true
                        }],
                    dom: {
                        container: {
                            className: 'dt-buttons'
                        },
                        button: {
                            className: 'btn btn-primary'
                        }
                    }
                }
            });

//            hide_loader();
            displaySuccessToast((data.message), ""); //DISPLAY TOAST
        } else {
            displayErrorMsg((data.message));
        }

    });

// Handle when it failed to connect
    request.fail(function (jqXHR, textStatus) {
        console.log(textStatus);
        hide_loader();
        //show the error message
        $('#handleErrorMessages').show("fast");
        // displayErrorMsg("Sorry, something went wrong");
    });

}

//SHOW INVOICE DATA MORE DETAILS
$(document).on('click', '[data-invoice-details]', function (e) {

    var jsonDetails = JSON.parse($(this).attr('data-invoice-details'));

    $('#displayAccountName').html((jsonDetails.numberOfHours));
    $('#showAccountNo').html(jsonDetails.unitPrice);
    $('#showAccountName').html((jsonDetails.cost));

    $('#addFeedbackViewModal').modal('show');

});


//ACTIVATE OR DEACTIVATE CUSTOMER DATA

//ACTIVATE CUSTOMER DATA
$(document).on('click', '[data-customer-activate]', function (e) {

    var jsonDetails = JSON.parse($(this).attr('data-customer-activate'));

    var formData = {
        "accountno": jsonDetails.accountno,
        "status": "ACTIVE"
    }


    formData = JSON.stringify(formData);

    swal({
        title: "Activate Customer?",
        text: "",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: true,
        showLoaderOnConfirm: true,
        confirmButtonText: "Yes"
    },
            function () {
                show_loader();

                var request = $.ajax({
                    url: updateCustomerStatus,
                    type: "POST",
                    data: formData,
                    contentType: "application/json"
                });

                request.done(function (data) {
                    if (data.RESPONSE_CODE == "200") {
                        console.log(data);
                        //get customer data again here
                        getInv();
                        displaySuccessToast((data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
                    } else {
                        hide_loader();
                        console.log(data)
                        displayErrorMsg((data.RESPONSE_MESSAGE)); //display Error message
                    }
                });

                // Handle when it failed to connect
                request.fail(function (jqXHR, textStatus) {
                    console.log(textStatus);
                    //show the error message
                    displayErrorMsg("Sorry, something went wrong");
                });

            });

});


//DEACTIVATE CUSTOMER DATA
$(document).on('click', '[data-customer-deactivate]', function (e) {

    var jsonDetails = JSON.parse($(this).attr('data-customer-deactivate'));

    var formData = {
        "accountno": jsonDetails.accountno,
        "status": "NON-ACTIVE"
    }


    formData = JSON.stringify(formData);

    swal({
        title: "Deactivate Customer?",
        text: "",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: true,
        showLoaderOnConfirm: true,
        confirmButtonText: "Yes"
    },
            function () {
                show_loader();

                var request = $.ajax({
                    url: updateCustomerStatus,
                    type: "POST",
                    data: formData,
                    contentType: "application/json"
                });

                request.done(function (data) {
                    if (data.RESPONSE_CODE == "200") {
                        console.log(data);
                        //get customer data again here
                        getInv();
                        displaySuccessToast((data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
                    } else {
                        hide_loader();
                        console.log(data)
                        displayErrorMsg((data.RESPONSE_MESSAGE)); //display Error message
                    }
                });

                // Handle when it failed to connect
                request.fail(function (jqXHR, textStatus) {
                    console.log(textStatus);
                    //show the error message
                    displayErrorMsg("Sorry, something went wrong");
                });

            });

});


// END OF BASE VIEW API INTEGRATION



// PROMOTION TABLE DATA

function getPromoData() {
    show_loader();

    var table_list = "";
    var trafficLight = "";
    var deletePromo = "";
    var moreDetails = "";
    var dateUpdated = "";
    var formData = {};
    formData = JSON.stringify(formData);

    var request = $.ajax({
        url: getPromotionsList,
        type: "GET"
    });

//HANDLE response here
    request.done(function (data) {
        if (data.RESPONSE_CODE == "200") {

            console.log(data)

            var allData = data["RESPONSE_DATA"];

            for (i = 0; i < allData.length; i++) {
                mainData = allData[i];
                var detailsJson = JSON.stringify(mainData);

                if (mainData.status == "ACTIVE") {
                    trafficLight = "<i class='la la-circle trans_success' aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='ACTIVE'></i>";
                    // moreDetails = "<a href='#' rel='tooltip' data-promo-details='"+detailsJson+"'' class='' data-toggle='tooltip' data-placement='bottom' title='More Details' ><i class='ti-more'></i></button>";
                    // activeState = "<a href='#' rel='tooltip' data-promo-deactivate='"+detailsJson+"' class='' data-toggle='tooltip' data-placement='bottom' title='Deactivate Promo'><i class='ti-close'></i></button>";
                    deletePromo = "<a href='#' rel='tooltip' data-promo-delete='" + detailsJson + "' class='' data-toggle='tooltip' data-placement='bottom' title='Delete Promo'><i class='ti-trash'></i></button>";
                } else {
                    trafficLight = "<i class='la la-circle trans_failed' aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='INACTIVE'></i>";
                    // moreDetails = "<a href='#' rel='tooltip' data-promo-details='"+detailsJson+"'' class='' data-toggle='tooltip' data-placement='bottom' title='More Details' ><i class='ti-more'></i></button>";
                    // activeState = "<a href='#' rel='tooltip' data-promo-activate='"+detailsJson+"'' class='' data-toggle='tooltip' data-placement='bottom' title='Activate Promo' ><i class='ti-check'></i></button>";
                    deletePromo = "<a href='#' rel='tooltip' data-promo-delete='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='Delete Promo' ><i class='ti-trash'></i></button>";
                }

                table_list +=
                        "<tr>" +
                        "<td>" + parseInt(i + 1) + "</td>" +
                        "<td>" + (mainData.promo_name) + "</td>" +
                        "<td>" + mainData.promo_desc + "</td>" +
                        "<td>" + mainData.start_date + "</td>" +
                        "<td>" + mainData.end_date + "</td>" +
                        "<td>" + trafficLight + "</td>" +
                        "<td>" + mainData.created_by + "</td>" +
                        // "<td class='td-actions'>"+activeState+"&nbsp;"+deletePromo+"&nbsp;"+moreDetails+ "</td>"+
                        "<td class='td-actions'>" + deletePromo + "</td>" +
                        "</tr>"

            }

            //Append the tables here
            $('#promotionData').html(table_list);

            //Base view table
            $('#promotionTable').DataTable();

            hide_loader();
            // displaySuccessToast((data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
        } else {
            displayErrorMsg((data.RESPONSE_MESSAGE));
        }

    });

// Handle when it failed to connect
    request.fail(function (jqXHR, textStatus) {
        console.log(textStatus);
        hide_loader();
        //show the error message
        $('#handleErrorMessages').show("fast");
        // displayErrorMsg("Sorry, something went wrong");
    });

}

//ADD CUSTOMER FEEDBACK with contact numbber
$(document).on('click', '[data-addFeedback-details]', function (e) {

    var jsonDetails = JSON.parse($(this).attr('data-addFeedback-details'));

    $("#feedbackUser").html(jsonDetails.acct_name);

    $('#generateInvoiceModal').modal('show');


    /** ADD USER API **/

    $("#addFeedbackBtn").click(function (e) {
        e.preventDefault();
        show_modal_loader();
        var company = $('#company').val();

        if (company == "" || company == undefined) {
            displayErrorMsgModal("Please company or project name");
            return false;
        } else {

            $("#addFeedbackBtn").prop("disabled", true);

            var request = $.ajax({
                url: generateInvoice + company,
                type: "GET",
                contentType: "application/json"
            });

            request.done(function (data) {
                if (data.status == "200") {
                    document.getElementById("addFeedbackForm").reset();
                    $("#addFeedbackBtn").removeAttr('disabled');

                    console.log(data);
                    //get customer data again here
                    getInv();

                    $('#addFeedbackViewModal').modal('hide');
                    displaySuccessToastModal((data.message), ""); //DISPLAY TOAST
                } else {
                    $("#addFeedbackBtn").removeAttr('disabled');
                    console.log(data)
                    displayErrorMsgModal((data.message)); //disp-ay Error message
                }
            });

            // Handle when it failed to connect
            request.fail(function (jqXHR, textStatus) {
                console.log(textStatus);
                //show the error message
                $("#addFeedbackBtn").removeAttr('disabled');
                displayErrorMsgModal("Sorry, something went wrong");
            });

        }

    });

});


// START OF ADMIN USERS API
//Get users data --->>> Settings-> View Page
function getEmployeeUsersData() {
    show_loader();

    var table_list = "";
    var deleteUser = "";
    var editUser = "";
    var moreDetails = "";
    var formData = {};
    formData = JSON.stringify(formData);

    var request = $.ajax({
        url: getAllUsers,
        type: "GET"
    });

//HANDLE response here
    request.done(function (data) {
        if (data.status == "200") {

            var allData = data.employees;

            for (i = 0; i < allData.length; i++) {
                mainData = allData[i];
                var detailsJson = JSON.stringify(mainData);

                if (mainData.role == "LAWYER") {
                    trafficLight = "<i class='la la-circle trans_success' aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='ACTIVE'></i>";
                    moreDetails = "<a href='#' rel='tooltip' data-user-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='More Details' ><i class='ti-more'></i></button>";
                    activeState = "<a href='#' rel='tooltip' data-user-deactivate='" + detailsJson + "' class='' data-toggle='tooltip' data-placement='bottom' title='Deactivate User'><i class='ti-close'></i></button>";
                    deleteUser = "<a href='#' rel='tooltip' data-user-delete='" + detailsJson + "' class='' data-toggle='tooltip' data-placement='bottom' title='Delete User'><i class='ti-trash'></i></button>";
                    editUser = "<a href='#' rel='tooltip' data-user-edit='" + detailsJson + "' class='' data-toggle='tooltip' data-placement='bottom' title='Edit User'><i class='ti-pencil'></i></button>";
                } else {
                    trafficLight = "<i class='la la-circle trans_failed' aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='INACTIVE'></i>";
                    moreDetails = "<a href='#' rel='tooltip' data-user-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='More Details' ><i class='ti-more'></i></button>";
                    activeState = "<a href='#' rel='tooltip' data-user-activate='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='Activate User' ><i class='ti-check'></i></button>";
                    editUser = "<a href='#' rel='tooltip' data-user-edit='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='Edit User' ><i class='ti-pencil'></i></button>";
                }

                table_list +=
                        "<tr>" +
                        "<td>" + parseInt(i + 1) + "</td>" +
                        "<td>" + mainData.firstName + "</td>" +
                        "<td>" + mainData.lastName + "</td>" +
                        "<td>" + mainData.role + "</td>" +
                        "<td>" + mainData.email + "</td>" +
                        "<td>" + mainData.grade + "</td>" +
                        "<td>" + mainData.rate + "</td>" +
                        "<td class='td-actions'>" + activeState + "&nbsp;" + editUser + "&nbsp;" + deleteUser + "&nbsp;" + moreDetails + "</td>" +
                        "</tr>"

            }

            //Append the tables here
            $('#adminUserData').html(table_list);

            //Base view table
            $('#adminUsersTable').DataTable();

            hide_loader();
            // displaySuccessToast((data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
        } else {
            displayErrorMsg(data.message);
        }

    });

// Handle when it failed to connect
    request.fail(function (jqXHR, textStatus) {
        console.log(textStatus);
        hide_loader();
        //show the error message
        $('#handleErrorMessages').show("fast");
        // displayErrorMsg("Sorry, something went wrong");
    });

}


//EDIT ADMIN USER ROLE
$(document).on('click', '[data-user-edit]', function (e) {

    var jsonDetails = JSON.parse($(this).attr('data-user-edit'));

    $('#displayEditUserName').html((jsonDetails.username));
    $('#editRoletype').val(jsonDetails.role);

    $('#editUserModal').modal('show');

    // edit user role here

    $("#editUserBtn").click(function (e) {
        e.preventDefault();
        show_modal_loader();

        var role = $('#editRoletype').val();

        var createdby = "";

        // Get saved data from sessionStorage
        var storedUsername = sessionStorage.getItem('username');

        if (storedUsername != "" || storedUsername != undefined) {
            createdby = storedUsername;
        } else {
            //It means username is not found in storage
            displayErrorMsgModal("Sorry, could not find created by"); //display Error message
            return false;
        }

        if (role == "" || role == undefined) {
            displayErrorMsgModal("Please select a role"); //display Error message
            return false;
        } else {

            $("#editUserBtn").prop("disabled", true);
            var formData = {
                "username": jsonDetails.username,
                "role": role,
            };

            formData = JSON.stringify(formData);

            var request = $.ajax({
                url: editAdminUserApi,
                type: "POST",
                data: formData,
                contentType: "application/json"
            });

            request.done(function (data) {
                if (data.status == "200") {
                    document.getElementById("editUserForm").reset();
                    $("#editUserBtn").removeAttr('disabled');

                    console.log(data);
                    //get admin user data again here
                    getEmployeeUsersData();

                    $('#editUserModal').modal('hide');
                    displaySuccessToastModal((data.message), ""); //DISPLAY TOAST
                } else {
                    $("#editUserBtn").removeAttr('disabled');
                    console.log(data)
                    displayErrorMsgModal((data.message)); //display Error message
                }
            });

            // Handle when it failed to connect
            request.fail(function (jqXHR, textStatus) {
                console.log(textStatus);
                //show the error message
                $("#editUserBtn").removeAttr('disabled');
                displayErrorMsgModal("Sorry, something went wrong");
            });

        }

    });

});


//SHOW ADMIN USER DATA MORE DETAILS
$(document).on('click', '[data-user-details]', function (e) {

    var jsonDetails = JSON.parse($(this).attr('data-user-details'));
    var status = "";

    if (jsonDetails.status == "" || jsonDetails.status == undefined) {
        status = "Inactive"
    } else {
        status = jsonDetails.status
    }

    $('#displayUserFullname').html((jsonDetails.userdesc));
    $('#showAdminFullname').html((jsonDetails.userdesc));
    $('#showAdminUsername').html(jsonDetails.username);
    $('#showAdminRole').html(jsonDetails.role);
    $('#showAdminStatus').html(status);
    $('#showAdminCreatedBy').html(jsonDetails.createdby);
    $('#showAdminCreatedDate').html(jsonDetails.createddate);


    $('#moreDetailsAdminUserData').modal('show');

});

//ACTIVATE OR DEACTIVATE ADMIN USER DATA

//ACTIVATE ADMIN USER DATA
$(document).on('click', '[data-user-activate]', function (e) {

    var jsonDetails = JSON.parse($(this).attr('data-user-activate'));

    var formData = {
        "username": jsonDetails.username,
        "status": "active"
    }


    formData = JSON.stringify(formData);

    swal({
        title: "Activate User?",
        text: "",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: true,
        showLoaderOnConfirm: true,
        confirmButtonText: "Yes"
    },
            function () {
                show_loader();

                var request = $.ajax({
                    url: updateAdminUserStatus,
                    type: "POST",
                    data: formData,
                    contentType: "application/json"
                });

                request.done(function (data) {
                    if (data.RESPONSE_CODE == "200") {
                        console.log(data);
                        //get customer data again here
                        getEmployeeUsersData();
                        displaySuccessToast((data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
                    } else {
                        hide_loader();
                        console.log(data)
                        displayErrorMsg((data.RESPONSE_MESSAGE)); //display Error message
                    }
                });

                // Handle when it failed to connect
                request.fail(function (jqXHR, textStatus) {
                    console.log(textStatus);
                    //show the error message
                    displayErrorMsg("Sorry, something went wrong");
                });

            });

});


//DEACTIVATE ADMIN USER DATA
$(document).on('click', '[data-user-deactivate]', function (e) {

    var jsonDetails = JSON.parse($(this).attr('data-user-deactivate'));

    var formData = {
        "username": jsonDetails.username,
        "status": "inactive"
    }


    formData = JSON.stringify(formData);

    swal({
        title: "Deactivate User?",
        text: "",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: true,
        showLoaderOnConfirm: true,
        confirmButtonText: "Yes"
    },
            function () {
                show_loader();

                var request = $.ajax({
                    url: updateAdminUserStatus,
                    type: "POST",
                    data: formData,
                    contentType: "application/json"
                });

                request.done(function (data) {
                    if (data.RESPONSE_CODE == "200") {
                        console.log(data);
                        //get admin user data again here
                        getEmployeeUsersData();
                        displaySuccessToast((data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
                    } else {
                        hide_loader();
                        console.log(data)
                        displayErrorMsg((data.RESPONSE_MESSAGE)); //display Error message
                    }
                });

                // Handle when it failed to connect
                request.fail(function (jqXHR, textStatus) {
                    console.log(textStatus);
                    //show the error message
                    displayErrorMsg("Sorry, something went wrong");
                });

            });

});

//DELETE ADMIN USER DATA
$(document).on('click', '[data-user-delete]', function (e) {

    var jsonDetails = JSON.parse($(this).attr('data-user-delete'));

    var formData = {
        "username": jsonDetails.username
    }


    formData = JSON.stringify(formData);

    swal({
        title: "Delete User?",
        text: "",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: true,
        showLoaderOnConfirm: true,
        confirmButtonText: "Yes"
    },
            function () {
                show_loader();

                var request = $.ajax({
                    url: deleteAdminUserStatus + jsonDetails.id,
                    type: "POST",
                    data: formData,
                    contentType: "application/json"
                });

                request.done(function (data) {
                    if (data.status == "200") {
                        console.log(data);
                        //get admin user data again here
                        getEmployeeUsersData();
                        displaySuccessToast((data.message), ""); //DISPLAY TOAST
                    } else {
                        hide_loader();
                        console.log(data)
                        displayErrorMsg((data.message)); //display Error message
                    }
                });

                // Handle when it failed to connect
                request.fail(function (jqXHR, textStatus) {
                    console.log(textStatus);
                    //show the error message
                    displayErrorMsg("Sorry, something went wrong");
                });

            });

});


//DELETE JOB DATA
$(document).on('click', '[data-job-delete]', function (e) {

    var jsonDetails = JSON.parse($(this).attr('data-job-delete'));

    swal({
        title: "Delete Job?",
        text: "",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: true,
        showLoaderOnConfirm: true,
        confirmButtonText: "Yes"
    },
            function () {
                show_loader();

                var request = $.ajax({
                    url: deleteJob + jsonDetails.id,
                    type: "DELETE",
                    contentType: "application/json"
                });

                request.done(function (data) {
                    if (data.status == "200") {
                        console.log(data);
                        //get admin user data again here
                        getEmployeeUsersData();
                        displaySuccessToast((data.message), ""); //DISPLAY TOAST
                    } else {
                        hide_loader();
                        console.log(data)
                        displayErrorMsg((data.message)); //display Error message
                    }
                });

                // Handle when it failed to connect
                request.fail(function (jqXHR, textStatus) {
                    console.log(textStatus);
                    //show the error message
                    displayErrorMsg("Sorry, something went wrong");
                });
            });
});


//EDIT ADMIN USER ROLE
$(document).on('click', '[data-job-edit]', function (e) {
    var jsonDetails = JSON.parse($(this).attr('data-job-edit'));
    $('#displayEditUserName').html((jsonDetails.username));
    $('#editRoletype').val(jsonDetails.role);
    $('#editUserModal').modal('show');

    // edit user role here

    $("#editUserBtn").click(function (e) {
        e.preventDefault();
        show_modal_loader();
        var role = $('#editRoletype').val();
        var createdby = "";
        // Get saved data from sessionStorage
        var storedUsername = sessionStorage.getItem('username');
        if (storedUsername != "" || storedUsername != undefined) {
            createdby = storedUsername;
        } else {
            //It means username is not found in storage
            displayErrorMsgModal("Sorry, could not find created by"); //display Error message
            return false;
        }
        if (role == "" || role == undefined) {
            displayErrorMsgModal("Please select a role"); //display Error message
            return false;
        } else {

            $("#editUserBtn").prop("disabled", true);
            var formData = {
                "username": jsonDetails.username,
                "role": role,
            };

            formData = JSON.stringify(formData);

            var request = $.ajax({
                url: editAdminUserApi,
                type: "POST",
                data: formData,
                contentType: "application/json"
            });

            request.done(function (data) {
                if (data.status == "200") {
                    document.getElementById("editUserForm").reset();
                    $("#editUserBtn").removeAttr('disabled');

                    console.log(data);
                    //get admin user data again here
                    getEmployeeUsersData();

                    $('#editUserModal').modal('hide');
                    displaySuccessToastModal((data.message), ""); //DISPLAY TOAST
                } else {
                    $("#editUserBtn").removeAttr('disabled');
                    console.log(data)
                    displayErrorMsgModal((data.message)); //display Error message
                }
            });
            // Handle when it failed to connect
            request.fail(function (jqXHR, textStatus) {
                console.log(textStatus);
                //show the error message
                $("#editUserBtn").removeAttr('disabled');
                displayErrorMsgModal("Sorry, something went wrong");
            });
        }
    });
});


//DELETE INVOICE 
$(document).on('click', '[data-invoice-delete]', function (e) {

    var jsonDetails = JSON.parse($(this).attr('data-promo-delete'));

    var formData = {
        "id": jsonDetails.id
    }


    formData = JSON.stringify(formData);

    swal({
        title: "Delete Invoice?",
        text: "",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: true,
        showLoaderOnConfirm: true,
        confirmButtonText: "Yes"
    },
            function () {
                show_loader();

                var request = $.ajax({
                    url: deletePromoApi,
                    type: "DELETE",
                    data: formData,
                    contentType: "application/json"
                });

                request.done(function (data) {
                    if (data.status == "200") {
                        console.log(data);
                        //get promo data again here
                        getPromoData();
                        displaySuccessToast((data.message), ""); //DISPLAY TOAST
                    } else {
                        hide_loader();
                        console.log(data)
                        displayErrorMsg((data.message)); //display Error message
                    }
                });

                // Handle when it failed to connect
                request.fail(function (jqXHR, textStatus) {
                    console.log(textStatus);
                    //show the error message
                    displayErrorMsg("Sorry, something went wrong");
                });

            });

});

/** ADD PROMOTION API **/

$("#addPromoBtn").click(function (e) {
    e.preventDefault();
    show_modal_loader();
    var addPromoName = $('#addPromoName').val();
    var addPromoDescription = $('#addPromoDescription').val();
    var addPromoStartDate = $('#addPromoStartDate').val();
    var addPromoEndDate = $('#addPromoEndDate').val();
    var addPromoStatus = $('#addPromoStatus').val();

    var createdby = "";

    // Get saved data from sessionStorage
    var storedUsername = sessionStorage.getItem('username');

    if (storedUsername != "" || storedUsername != undefined) {
        createdby = storedUsername;
    } else {
        //It means username is not found in storage
        displayErrorMsgModal("Sorry, could not find created by"); //display Error message
        return false;
    }

    if ((addPromoName == "" || addPromoName == undefined) && (addPromoDescription == "" || addPromoDescription == undefined) && (addPromoStartDate == "" || addPromoStartDate == undefined) && (addPromoEndDate == "" || addPromoEndDate == undefined) && (addPromoStatus == "" || addPromoStatus == undefined)) {
        displayErrorMsgModal("All fields are required"); //display Error message
        return false;
    } else if (addPromoName == "" || addPromoName == undefined) {
        displayErrorMsgModal("Promo Name must be filled"); //display Error message
        return false;
    } else if (addPromoDescription == "" || addPromoDescription == undefined) {
        displayErrorMsgModal("Promo description must be filled"); //display Error message
        return false;
    } else if (addPromoStartDate == "" || addPromoStartDate == undefined) {
        displayErrorMsgModal("Please enter a promo start date"); //display Error message
        return false;
    } else if (addPromoEndDate == "" || addPromoEndDate == undefined) {
        displayErrorMsgModal("Please enter a promo end date"); //display Error message
        return false;
    } else if (addPromoStatus == "" || addPromoStatus == undefined) {
        displayErrorMsgModal("Please select promo status"); //display Error message
        return false;
    } else {

        $("#addPromoBtn").prop("disabled", true);
        var formData =
                {
                    "promo_name": addPromoName,
                    "promo_desc": addPromoDescription,
                    "createdby": createdby,
                    "start_date": addPromoStartDate,
                    "endDate": addPromoEndDate,
                    "status": addPromoStatus
                };

        formData = JSON.stringify(formData);

        console.log(formData)

        var request = $.ajax({
            url: addPromotionApi,
            type: "POST",
            data: formData,
            contentType: "application/json"
        });

        request.done(function (data) {
            if (data.RESPONSE_CODE == "200") {
                document.getElementById("addPromoForm").reset();
                $("#addPromoBtn").removeAttr('disabled');

                console.log(data);
                //get admin user data again here
                getPromoData();

                $('#addPromoViewModal').modal('hide');
                displaySuccessToastModal((data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
            } else {
                $("#addPromoBtn").removeAttr('disabled');
                console.log(data)
                displayErrorMsgModal((data.RESPONSE_MESSAGE)); //display Error message
            }
        });

        // Handle when it failed to connect
        request.fail(function (jqXHR, textStatus) {
            console.log(textStatus);
            //show the error message
            $("#addPromoBtn").removeAttr('disabled');
            displayErrorMsgModal("Sorry, something went wrong");
        });

    }

});



/** ADD USER API **/

$("#addUserBtn").click(function (e) {
    e.preventDefault();
    show_modal_loader();
    var firstName = $('#addFirstName').val();
    var lastName = $('#addLastName').val();
    var grade = $('#addGrade').val();
    var rate = $('#addRate').val();
    var role = $('#addRoletype').val();
    var email = $('#addEmailAddress').val();
    var createdby = "";

    // Get saved data from sessionStorage
    var storedUsername = sessionStorage.getItem('username');

    if (storedUsername != "" || storedUsername != undefined) {
        createdby = storedUsername;
    } else {
        //It means username is not found in storage
        displayErrorMsgModal("Sorry, could not find created by"); //display Error message
        return false;
    }

    if ((firstName == "" || firstName == undefined) ||
            (lastName == "" || lastName == undefined) ||
            (rate == "" || rate == undefined) ||
            (grade == "" || grade == undefined) ||
            (role == "" || role == undefined) ||
            (email == "" || email == undefined)) {
        displayErrorMsgModal("All fields are required"); //display Error message
        return false;
    } else {

        $("#addUserBtn").prop("disabled", true);
        var formData = {
            "firstName": firstName,
            "lastName": lastName,
            "password": email,
            "rate": rate,
            "role": role,
            "grade": grade,
            "email": email
        };

        formData = JSON.stringify(formData);

        var request = $.ajax({
            url: addAdminUserApi,
            type: "POST",
            data: formData,
            contentType: "application/json"
        });

        request.done(function (data) {
            if (data.status == "200") {
                document.getElementById("addUserForm").reset();
                $("#addUserBtn").removeAttr('disabled');

                console.log(data);
                //get admin user data again here
                getEmployeeUsersData();

                $('#addUserModal').modal('hide');
                displaySuccessToastModal((data.message), ""); //DISPLAY TOAST
            } else {
                $("#addUserBtn").removeAttr('disabled');
                console.log(data)
                displayErrorMsgModal((data.message)); //display Error message
            }
        });

        // Handle when it failed to connect
        request.fail(function (jqXHR, textStatus) {
            console.log(textStatus);
            //show the error message
            $("#addUserBtn").removeAttr('disabled');
            displayErrorMsgModal("Sorry, something went wrong");
        });
    }
});

/** ASSIGN CUSTOMERS API **/

$("#assignCustomersBtn").click(function (e) {
    e.preventDefault();
    show_modal_loader();

    var employee = $('#selectAgentType').val();
    var projectName = $('#projectName').val();
    var projectDate = $('#projectDate').val();
    var startTime = $('#startTime').val();
    var endTime = $('#endTime').val();

    var assignedBy = "";

    // console.log("Customer list is ");
    // console.log(parsedata.slice(0, -1));

    // Use slice to remove the last item in the array because it is empty
    var customer_list = parsedata.slice(0, -1);


    // Get saved data from sessionStorage
    var storedUsername = sessionStorage.getItem('username');


    if (employee == "" || employee == undefined) {
        displayErrorMsgModal("Please select an agent"); //display Error message
        return false;
    } else if ((projectName == "" || projectName == undefined) ||
            (projectDate == "" || projectDate == undefined) ||
            (endTime == "" || endTime == undefined) ||
            (startTime == "" || startTime == undefined)) {
        displayErrorMsgModal("Please fill all inputs"); //display Error message
        return false;
    } else {

        $("#assignCustomersBtn").prop("disabled", true);
        var formData = {
            "project": projectName,
            "date": projectDate,
            "startTime": startTime,
            "endTime": endTime
        };

        formData = JSON.stringify(formData);

        console.log(formData);


        var request = $.ajax({
            url: assignCustomersApi + employee,
            type: "POST",
            data: formData,
            contentType: "application/json"
        });

        request.done(function (data) {
            if (data.status == "200") {
                document.getElementById("assignCustomersForm").reset();
                $("#assignCustomersBtn").removeAttr('disabled');

                console.log(data);

                $('#assignCustomersModal').modal('hide');
                displaySuccessToastModal((data.message), ""); //DISPLAY TOAST
            } else {
                $("#assignCustomersBtn").removeAttr('disabled');
                console.log(data)
                displayErrorMsgModal((data.message)); //display Error message
            }
        });

        // Handle when it failed to connect
        request.fail(function (jqXHR, textStatus) {
            console.log(textStatus);
            //show the error message
            $("#assignCustomersBtn").removeAttr('disabled');
            displayErrorMsgModal("Sorry, something went wrong");
        });

    }

});



// TAG CUSTOMERS API
$("#tagCustomersBtn").click(function (e) {
    e.preventDefault();
    show_modal_loader();
    var tagPromoName = $('#tagPromoName').val();
    var customerBadgeLabel = $('#customerBadgeLabel').val();
    // var customer_list = $('#selectCustomers').val();

    var assignedBy = "";


    // console.log("Customer list is ");
    // console.log(parsedata.slice(0, -1));

    // Use slice to remove the last item in the array because it is empty
    var customer_list = tagCustomersParsedata.slice(0, -1);

    // console.log("seeeee")
    // console.log(customer_list)


    // Get saved data from sessionStorage
    var storedUsername = sessionStorage.getItem('username');

    if (storedUsername != "" || storedUsername != undefined) {
        assignedBy = storedUsername;
    } else {
        //It means username is not found in storage
        displayErrorMsgModal("Sorry, could not find name of who assigned customers"); //display Error message
        return false;
    }

    if (tagPromoName == "" || tagPromoName == undefined) {
        displayErrorMsgModal("Please enter your promo name"); //display Error message
        return false;
    } else if (customer_list.length == 0 || customer_list == undefined) {
        displayErrorMsgModal("Please upload your csv file"); //display Error message
        return false;
    } else {

        $("#tagCustomersBtn").prop("disabled", true);
        var formData = {
            "manager": assignedBy,
            "promo_name": tagPromoName,
            "customer_list": customer_list
        };

        formData = JSON.stringify(formData);

        console.log(formData);

        var request = $.ajax({
            url: tagCustomersApi,
            type: "POST",
            data: formData,
            contentType: "application/json"
        });

        request.done(function (data) {
            if (data.RESPONSE_CODE == "200") {
                document.getElementById("tagCustomersForm").reset();
                $("#tagCustomersBtn").removeAttr('disabled');

                console.log(data);
                //get admin user data again here
                getInv();

                $('#tagCustomersModal').modal('hide');
                displaySuccessToastModal((data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
            } else {
                $("#tagCustomersBtn").removeAttr('disabled');
                console.log(data)
                displayErrorMsgModal((data.RESPONSE_MESSAGE)); //display Error message
            }
        });

        // Handle when it failed to connect
        request.fail(function (jqXHR, textStatus) {
            console.log(textStatus);
            //show the error message
            $("#tagCustomersBtn").removeAttr('disabled');
            displayErrorMsgModal("Sorry, something went wrong");
        });

    }

});

// UNTAG CUSTOMERS
$("#untagCustomersBtn").click(function (e) {
    e.preventDefault();
    show_modal_loader();
    // var untagPromoName = $('#untagPromoName').val();
    var customerBadgeLabel = $('#customerBadgeLabel').val();
    // var customer_list = $('#selectCustomers').val();

    var assignedBy = "";

    // console.log("Customer list is ");
    // console.log(parsedata.slice(0, -1));

    // Use slice to remove the last item in the array because it is empty
    var customer_list = untagCustomersParsedata.slice(0, -1);


    // Get saved data from sessionStorage
    var storedUsername = sessionStorage.getItem('username');

    if (storedUsername != "" || storedUsername != undefined) {
        assignedBy = storedUsername;
    } else {
        //It means username is not found in storage
        displayErrorMsgModal("Sorry, could not find name of who assigned customers"); //display Error message
        return false;
    }

    // if (untagPromoName == "" || untagPromoName == undefined) {
    //     displayErrorMsgModal("Please select a promo name"); //display Error message
    //     return false;
    // }
    if (customer_list.length == 0 || customer_list == undefined) {
        displayErrorMsgModal("Please upload your csv file"); //display Error message
        return false;
    } else {

        $("#untagCustomersBtn").prop("disabled", true);
        var formData = {
            "manager": assignedBy,
            // "promo_name": tagPromoName,
            "customer_list": customer_list
        };

        formData = JSON.stringify(formData);

        console.log(formData);

        var request = $.ajax({
            url: untagCustomersApi,
            type: "POST",
            data: formData,
            contentType: "application/json"
        });

        request.done(function (data) {
            if (data.RESPONSE_CODE == "200") {
                document.getElementById("untagCustomersForm").reset();
                $("#untagCustomersBtn").removeAttr('disabled');

                console.log(data);
                //get admin user data again here
                getInv();

                $('#untagCustomersModal').modal('hide');
                displaySuccessToastModal((data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
            } else {
                $("#untagCustomersBtn").removeAttr('disabled');
                console.log(data)
                displayErrorMsgModal((data.RESPONSE_MESSAGE)); //display Error message
            }
        });

        // Handle when it failed to connect
        request.fail(function (jqXHR, textStatus) {
            console.log(textStatus);
            //show the error message
            $("#untagCustomersBtn").removeAttr('disabled');
            displayErrorMsgModal("Sorry, something went wrong");
        });

    }

});

// DELETE CUSTOMERS
$("#deleteCustomersBtn").click(function (e) {
    e.preventDefault();
    show_modal_loader();


    var assignedBy = "";

    // console.log("Customer list is ");
    // console.log(parsedata.slice(0, -1));

    // Use slice to remove the last item in the array because it is empty
    var customer_list = deleteCustomersParsedata.slice(0, -1);


    if (customer_list.length == 0 || customer_list == undefined) {
        displayErrorMsgModal("Please upload your csv file"); //display Error message
        return false;
    } else {

        $("#deleteCustomersBtn").prop("disabled", true);
        var formData = {
            "customer_list": customer_list
        };

        formData = JSON.stringify(formData);

        console.log(formData);

        var request = $.ajax({
            url: deleteCustomersApi,
            type: "POST",
            data: formData,
            contentType: "application/json"
        });

        request.done(function (data) {
            if (data.RESPONSE_CODE == "200") {
                document.getElementById("deleteCustomersForm").reset();
                $("#deleteCustomersBtn").removeAttr('disabled');

                console.log(data);
                //get admin user data again here
                getInvoiceData();

                $('#deleteCustomersModal').modal('hide');
                displaySuccessToastModal((data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
            } else {
                $("#deleteCustomersBtn").removeAttr('disabled');
                console.log(data)
                displayErrorMsgModal((data.RESPONSE_MESSAGE)); //display Error message
            }
        });

        // Handle when it failed to connect
        request.fail(function (jqXHR, textStatus) {
            console.log(textStatus);
            //show the error message
            $("#deleteCustomersBtn").removeAttr('disabled');
            displayErrorMsgModal("Sorry, something went wrong");
        });

    }

});


/** TEAM RANKING API STARTS HERE **/

//Get team ranking 
function getTeamRankingData(selectedMonth) {
    show_loader();

    var table_list = "";

    $('#teamRankingViewTable').DataTable().destroy();
    $('#teamRankingViewData').html("");

    var formData = {
        "month": selectedMonth
    };

    formData = JSON.stringify(formData);

    console.log(formData);

    var request = $.ajax({
        url: getTeamRankingApi,
        type: "POST",
        data: formData,
        contentType: "application/json"
    });

//HANDLE response here
    request.done(function (data) {
        if (data.RESPONSE_CODE == "200") {

            console.log(data);

            var allData = data["RESPONSE_DATA"];

            var r = 0;

            for (i = 0; i < Object.keys(allData).length; i++) {
                mainDataOverallRank = allData["total_rank"][i];

                mainDataVf = allData["vfcash_rank"][i];

                mainDataUp = allData["upgrade_rank"][i];
                var detailsJsonUp = JSON.stringify(mainDataUp);

                mainDataDo = allData["downgrade_rank"][i];
                var detailsJsonDo = JSON.stringify(mainDataDo);

                mainDataAc = allData["activity_rank"][i];
                var detailsJsonAc = JSON.stringify(mainDataAc);


                var overallRank = "";
                var vfc = "";
                var upg = "";
                var dom = "";
                var act = "";

                if (mainDataOverallRank != undefined) {
                    overallRank = mainDataOverallRank.agent_id;
                }
                if (mainDataVf != undefined) {
                    vfc = mainDataVf.agent_id;
                }
                if (mainDataUp != undefined) {
                    upg = mainDataUp.agent_id;
                }
                if (mainDataDo != undefined) {
                    dom = mainDataDo.agent_id;
                }
                if (mainDataAc != undefined) {
                    act = mainDataAc.agent_id;
                }

                if (overallRank != "" && vfc != "" && upg != "" && dom != "" && act != "") {

                    table_list +=
                            "<tr width='100%'>" +
                            // since it is using colspan=2, we will have 2 tds

                            "<td>" + parseInt(r += 1) + "</td>" +
                            "<td>" + vfc + "</td>" +
                            "<td>" + upg + "</td>" +
                            "<td>" + dom + "</td>" +
                            "<td>" + act + "</td>" +
                            "<td>" + overallRank + "</td>" +
                            "</tr>"

                }


            }

            //Append the tables here
            $('#teamRankingViewData').html(table_list);

            //Base view table
            $('#teamRankingViewTable').DataTable({
                dom: 'Bfrtip',
                scrollX: true,
                select: true,
                buttons: {
                    buttons: [{
                            extend: 'copy',
                            text: 'Copy',
                            title: $('h1').text(),
                            exportOptions: {
                                columns: ':not(.no-print)'
                            },
                            footer: true
                        }, {
                            extend: 'excel',
                            text: 'Excel',
                            title: $('h1').text(),
                            exportOptions: {
                                columns: ':not(.no-print)'
                            },
                            footer: true
                        }, {
                            extend: 'csv',
                            text: 'Csv',
                            title: $('h1').text(),
                            exportOptions: {
                                columns: ':not(.no-print)'
                            },
                            footer: true
                        }, {
                            extend: 'pdf',
                            text: 'Pdf',
                            title: $('h1').text(),
                            exportOptions: {
                                columns: ':not(.no-print)'
                            },
                            footer: true
                        }, {
                            extend: 'print',
                            text: 'Print',
                            title: $('h1').text(),
                            exportOptions: {
                                columns: ':not(.no-print)'
                            },
                            footer: true,
                            autoPrint: true
                        }],
                    dom: {
                        container: {
                            className: 'dt-buttons'
                        },
                        button: {
                            className: 'btn btn-primary'
                        }
                    }
                }
            });

            // hide_loader();
            displaySuccessToast((data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
        } else {
            displayErrorMsg((data.RESPONSE_MESSAGE));

        }

    });

// Handle when it failed to connect
    request.fail(function (jqXHR, textStatus) {
        console.log(textStatus);
        hide_loader();
        //show the error message
        $('#handleErrorMessages').show("fast");
        // displayErrorMsg("Sorry, something went wrong");

    });

}


// SET GLOBAL TARGET

$("#setGlobalTargetBtn").click(function (e) {
    e.preventDefault();
    show_modal_loader();
    var setVodafoneCashTarget = $('#setVodafoneCashTarget').val();
    var setUpgradeTarget = $('#setUpgradeTarget').val();
    var setDowngradeTarget = $('#setDowngradeTarget').val();

    var assignedBy = "";

    // Get saved data from sessionStorage
    var storedUsername = sessionStorage.getItem('username');

    if (storedUsername != "" || storedUsername != undefined) {
        assignedBy = storedUsername;
    } else {
        //It means username is not found in storage
        displayErrorMsgModal("Sorry, could not find name of who is setting targets"); //display Error message
        return false;
    }

    if (setVodafoneCashTarget == "" || setVodafoneCashTarget == undefined) {
        displayErrorMsgModal("Please enter target for vodafone cash"); //display Error message
        return false;
    } else if (setUpgradeTarget == "" || setUpgradeTarget == undefined) {
        displayErrorMsgModal("Please enter target for upgrade"); //display Error message
        return false;
    } else if (setDowngradeTarget == "" || setDowngradeTarget == undefined) {
        displayErrorMsgModal("Please enter target for downgrade"); //display Error message
        return false;
    } else if (allAgents.length == 0 || allAgents == undefined) {
        displayErrorMsgModal("Please ensure that all agents are added"); //display Error message
        return false;
    } else {

        $("#setGlobalTargetBtn").prop("disabled", true);

        var formData = {
            "manager": assignedBy,
            "agent_list": allAgents,
            "upgrade_target": setUpgradeTarget,
            "downgrade_target": setDowngradeTarget,
            "vfcash_target": setVodafoneCashTarget,
            "month": monthNames[new Date().getMonth()]
        };

        formData = JSON.stringify(formData);

        console.log(formData);

        var request = $.ajax({
            url: setGlobalTargetApi,
            type: "POST",
            data: formData,
            contentType: "application/json"
        });

        request.done(function (data) {
            if (data.RESPONSE_CODE == "200") {
                document.getElementById("setGlobalTargetForm").reset();
                $("#setGlobalTargetBtn").removeAttr('disabled');

                console.log(data);
                // get the performance data for the current month here
                var selectedMonth = monthNames[new Date().getMonth()];
                getAllPerformanceData(selectedMonth);

                $('#setGlobalTargetModal').modal('hide');
                displaySuccessToastModal((data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
            } else {
                $("#setGlobalTargetBtn").removeAttr('disabled');
                console.log(data)
                displayErrorMsgModal((data.RESPONSE_MESSAGE)); //display Error message
            }
        });

        // Handle when it failed to connect
        request.fail(function (jqXHR, textStatus) {
            console.log(textStatus);
            //show the error message
            $("#setGlobalTargetBtn").removeAttr('disabled');
            displayErrorMsgModal("Sorry, something went wrong");
        });

    }

});

// SET ACTIVITY TARGET

$("#setActivityTargetBtn").click(function (e) {
    e.preventDefault();
    show_modal_loader();
    var selectAgentType = $('#selectAgentType').val();
    var activityTarget = $('#activityTarget').val();

    var assignedBy = "";

    // Get saved data from sessionStorage
    var storedUsername = sessionStorage.getItem('username');

    if (storedUsername != "" || storedUsername != undefined) {
        assignedBy = storedUsername;
    } else {
        //It means username is not found in storage
        displayErrorMsgModal("Sorry, could not find name of who is setting targets"); //display Error message
        return false;
    }

    if (selectAgentType == "" || selectAgentType == undefined) {
        displayErrorMsgModal("Please select an agent"); //display Error message
        return false;
    } else if (activityTarget == "" || activityTarget == undefined) {
        displayErrorMsgModal("Please enter activity target for selected agent"); //display Error message
        return false;
    } else {

        $("#setActivityTargetBtn").prop("disabled", true);

        var formData = {
            "agent_id": selectAgentType,
            "activity_target": activityTarget,
            "month": monthNames[new Date().getMonth()]
        };

        formData = JSON.stringify(formData);

        console.log(formData);

        var request = $.ajax({
            url: setActivityTargetApi,
            type: "POST",
            data: formData,
            contentType: "application/json"
        });

        request.done(function (data) {
            if (data.RESPONSE_CODE == "200") {
                document.getElementById("setActivityTargetForm").reset();
                $("#setActivityTargetBtn").removeAttr('disabled');

                console.log(data);
                // get the performance data for the current month here
                var selectedMonth = monthNames[new Date().getMonth()];
                getAllPerformanceData(selectedMonth);

                $('#setActivityTargetModal').modal('hide');
                displaySuccessToastModal((data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
            } else {
                $("#setActivityTargetBtn").removeAttr('disabled');
                console.log(data)
                displayErrorMsgModal((data.RESPONSE_MESSAGE)); //display Error message
            }
        });

        // Handle when it failed to connect
        request.fail(function (jqXHR, textStatus) {
            console.log(textStatus);
            //show the error message
            $("#setActivityTargetBtn").removeAttr('disabled');
            displayErrorMsgModal("Sorry, something went wrong");
        });

    }

});


// EDIT SET GLOBAL TARGET
$("#editSetGlobalTargetBtn").click(function (e) {
    e.preventDefault();
    show_modal_loader();
    var setVodafoneCashTarget = $('#editVodafoneCashTarget').val();
    var setUpgradeTarget = $('#editUpgradeTarget').val();
    var setDowngradeTarget = $('#editDowngradeTarget').val();

    var assignedBy = "";

    // Get saved data from sessionStorage
    var storedUsername = sessionStorage.getItem('username');

    if (storedUsername != "" || storedUsername != undefined) {
        assignedBy = storedUsername;
    } else {
        //It means username is not found in storage
        displayErrorMsgModal("Sorry, could not find name of who is setting targets"); //display Error message
        return false;
    }

    if (setVodafoneCashTarget == "" || setVodafoneCashTarget == undefined) {
        displayErrorMsgModal("Please enter target for vodafone cash"); //display Error message
        return false;
    } else if (setUpgradeTarget == "" || setUpgradeTarget == undefined) {
        displayErrorMsgModal("Please enter target for upgrade"); //display Error message
        return false;
    } else if (setDowngradeTarget == "" || setDowngradeTarget == undefined) {
        displayErrorMsgModal("Please enter target for downgrade"); //display Error message
        return false;
    }

    // else if (allAgents.length == 0 || allAgents == undefined) {
    //     displayErrorMsgModal("Please ensure that all agents are added"); //display Error message
    //     return false;
    // }

    else {

        $("#editSetGlobalTargetBtn").prop("disabled", true);

        var formData = {
            "manager": assignedBy,
            // "agent_list": allAgents,
            "upgrade_target": setUpgradeTarget,
            "downgrade_target": setDowngradeTarget,
            "vfcash_target": setVodafoneCashTarget,
            "month": monthNames[new Date().getMonth()]
        };

        formData = JSON.stringify(formData);

        console.log(formData);

        var request = $.ajax({
            url: updateGlobalTarget,
            type: "POST",
            data: formData,
            contentType: "application/json"
        });

        request.done(function (data) {
            if (data.RESPONSE_CODE == "200") {
                document.getElementById("editGlobalTargetForm").reset();
                $("#editSetGlobalTargetBtn").removeAttr('disabled');

                console.log(data);
                // get the performance data for the current month here
                var selectedMonth = monthNames[new Date().getMonth()];
                getAllPerformanceData(selectedMonth);

                $('#editGlobalTargetModal').modal('hide');
                displaySuccessToastModal((data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
            } else {
                $("#editSetGlobalTargetBtn").removeAttr('disabled');
                console.log(data)
                displayErrorMsgModal((data.RESPONSE_MESSAGE)); //display Error message
            }
        });

        // Handle when it failed to connect
        request.fail(function (jqXHR, textStatus) {
            console.log(textStatus);
            //show the error message
            $("#editSetGlobalTargetBtn").removeAttr('disabled');
            displayErrorMsgModal("Sorry, something went wrong");
        });

    }

});

// SET ACTIVITY TARGET

$("#editSetActivityTargetBtn").click(function (e) {
    e.preventDefault();
    show_modal_loader();
    var selectAgentType = $('#editSelectAgentType').val();
    var activityTarget = $('#editActivityTarget').val();

    var assignedBy = "";

    // Get saved data from sessionStorage
    var storedUsername = sessionStorage.getItem('username');

    if (storedUsername != "" || storedUsername != undefined) {
        assignedBy = storedUsername;
    } else {
        //It means username is not found in storage
        displayErrorMsgModal("Sorry, could not find name of who is setting targets"); //display Error message
        return false;
    }

    if (selectAgentType == "" || selectAgentType == undefined) {
        displayErrorMsgModal("Please select an agent"); //display Error message
        return false;
    } else if (activityTarget == "" || activityTarget == undefined) {
        displayErrorMsgModal("Please enter activity target for selected agent"); //display Error message
        return false;
    } else {

        $("#editSetActivityTargetBtn").prop("disabled", true);

        var formData = {
            "agent_id": selectAgentType,
            "activity_target": activityTarget,
            "month": monthNames[new Date().getMonth()]
        };

        formData = JSON.stringify(formData);

        console.log(formData);

        var request = $.ajax({
            url: updateActivityTarget,
            type: "POST",
            data: formData,
            contentType: "application/json"
        });

        request.done(function (data) {
            if (data.RESPONSE_CODE == "200") {
                document.getElementById("editActivityModalForm").reset();
                $("#editSetActivityTargetBtn").removeAttr('disabled');

                console.log(data);
                // get the performance data for the current month here
                var selectedMonth = monthNames[new Date().getMonth()];
                getAllPerformanceData(selectedMonth);

                $('#editActivityTargetModal').modal('hide');
                displaySuccessToastModal((data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
            } else {
                $("#editSetActivityTargetBtn").removeAttr('disabled');
                console.log(data)
                displayErrorMsgModal((data.RESPONSE_MESSAGE)); //display Error message
            }
        });

        // Handle when it failed to connect
        request.fail(function (jqXHR, textStatus) {
            console.log(textStatus);
            //show the error message
            $("#editSetActivityTargetBtn").removeAttr('disabled');
            displayErrorMsgModal("Sorry, something went wrong");
        });

    }

});


// GET INTERACTIONS BY SUBSCRIBER
$("#subscriberInteractionsBtn").click(function (e) {

    e.preventDefault();
    show_loader();

    var primaryKeySearch = $('#primaryKeySearch').val();
    var subscriberReportRange = $('#subscriberReportRange').val();

    // console.log(subscriberReportRange.substr(0, 18))
    // console.log(subscriberReportRange.substr(20, 21))

    if (primaryKeySearch == "" || primaryKeySearch == undefined) {
        displayErrorMsg("Please enter either an account number or fixed line number"); //display Error message
        return false;
    }

    if ((subscriberStartDate == "" || subscriberStartDate == undefined) && (subscriberEndDate == "" || subscriberEndDate == undefined)) {

        // since subscriberstartdate and subscriber end date was not selected, use default from the dateRange field 
        subscriberStartDate = subscriberReportRange.substr(0, 18).trim();
        subscriberEndDate = subscriberReportRange.substr(20, 21).trim();
    }


    var table_list = "";

    $('#subscriberInteractionsTable').DataTable().destroy();

    var formData = {
        "primarykey": primaryKeySearch,
        "startDate": subscriberStartDate,
        "endDate": subscriberEndDate
    };

    formData = JSON.stringify(formData);

    console.log(formData);

    var request = $.ajax({
        url: subscriberInteractionsApi,
        type: "POST",
        data: formData,
        contentType: "application/json"
    });

//HANDLE response here
    request.done(function (data) {
        if (data.RESPONSE_CODE == "200") {

            var allData = data["RESPONSE_DATA"];

            for (i = 0; i < allData.length; i++) {
                mainData = allData[i];
                var detailsJson = JSON.stringify(mainData);

                table_list +=
                        "<tr width='100%'>" +
                        "<td>" + parseInt(i + 1) + "</td>" +
                        "<td>" + mainData.agent_id + "</td>" +
                        "<td>" + mainData.customer_id + "</td>" +
                        "<td >" + mainData.fixedline_number + "</td>" +
                        "<td>" + mainData.cus_feedback + "</td>" +
                        "<td>" + mainData.reason_locked + "</td>" +
                        "<td>" + mainData.rm_comment + "</td>" +
                        "<td>" + mainData.date + "</td>" +
                        "</tr>"

            }

            $("#subscriberInteractionTable").show("fast");

            //Append the tables here
            $('#subscriberInteractionsData').html(table_list);

            //Base view table
            $('#subscriberInteractionsTable').DataTable({
                dom: 'Bfrtip',
                scrollX: true,
                select: true,
                buttons: {
                    buttons: [{
                            extend: 'copy',
                            text: 'Copy',
                            title: $('h1').text(),
                            exportOptions: {
                                columns: ':not(.no-print)'
                            },
                            footer: true
                        }, {
                            extend: 'excel',
                            text: 'Excel',
                            title: $('h1').text(),
                            exportOptions: {
                                columns: ':not(.no-print)'
                            },
                            footer: true
                        }, {
                            extend: 'csv',
                            text: 'Csv',
                            title: $('h1').text(),
                            exportOptions: {
                                columns: ':not(.no-print)'
                            },
                            footer: true
                        }, {
                            extend: 'pdf',
                            text: 'Pdf',
                            title: $('h1').text(),
                            exportOptions: {
                                columns: ':not(.no-print)'
                            },
                            footer: true
                        }, {
                            extend: 'print',
                            text: 'Print',
                            title: $('h1').text(),
                            exportOptions: {
                                columns: ':not(.no-print)'
                            },
                            footer: true,
                            autoPrint: true
                        }],
                    dom: {
                        container: {
                            className: 'dt-buttons'
                        },
                        button: {
                            className: 'btn btn-primary'
                        }
                    }
                }
            });

            displaySuccessToast((data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST


        } else {
            $("#subscriberInteractionTable").hide("fast");
            displayErrorMsg((data.RESPONSE_MESSAGE));
        }

    });

// Handle when it failed to connect
    request.fail(function (jqXHR, textStatus) {
        console.log(textStatus);
        hide_loader();
        //show the error message
        $('#handleErrorMessages').show("fast");
        $("#subscriberInteractionTable").hide("fast");
        // displayErrorMsg("Sorry, something went wrong");
    });

});



// GET ALL INTERACTIONS BY DATE RANGE
$("#allInteractionsBtn").click(function (e) {

    e.preventDefault();
    show_loader();

    var allReportRange = $('#allReportRange').val();

    // console.log(allReportRange.substr(0, 18))
    // console.log(allReportRange.substr(20, 21))

    if ((allStartDate == "" || allStartDate == undefined) && (allEndDate == "" || allEndDate == undefined)) {

        // since allstartdate and all end date was not selected, use default from the dateRange field 
        allStartDate = allReportRange.substr(0, 18).trim();
        allEndDate = allReportRange.substr(20, 21).trim();
    }


    var table_list = "";

    $('#allInteractionsTable').DataTable().destroy();

    var formData = {
        "startDate": allStartDate,
        "endDate": allEndDate
    };

    formData = JSON.stringify(formData);

    console.log(formData);

    var request = $.ajax({
        url: allInteractionsApi,
        type: "POST",
        data: formData,
        contentType: "application/json"
    });

//HANDLE response here
    request.done(function (data) {
        if (data.RESPONSE_CODE == "200") {

            var allData = data["RESPONSE_DATA"];

            for (i = 0; i < allData.length; i++) {
                mainData = allData[i];
                var detailsJson = JSON.stringify(mainData);

                table_list +=
                        "<tr width='100%'>" +
                        "<td>" + parseInt(i + 1) + "</td>" +
                        "<td>" + mainData.agent_id + "</td>" +
                        "<td>" + mainData.customer_id + "</td>" +
                        "<td >" + mainData.fixedline_number + "</td>" +
                        "<td>" + mainData.cus_feedback + "</td>" +
                        "<td>" + mainData.reason_locked + "</td>" +
                        "<td>" + mainData.rm_comment + "</td>" +
                        "<td>" + mainData.date + "</td>" +
                        "</tr>"

            }

            $("#allInteractionTableDiv").show("fast");

            //Append the tables here
            $('#allInteractionsData').html(table_list);

            //Base view table
            $('#allInteractionsTable').DataTable({
                dom: 'Bfrtip',
                scrollX: true,
                select: true,
                buttons: {
                    buttons: [{
                            extend: 'copy',
                            text: 'Copy',
                            title: $('h1').text(),
                            exportOptions: {
                                columns: ':not(.no-print)'
                            },
                            footer: true
                        }, {
                            extend: 'excel',
                            text: 'Excel',
                            title: $('h1').text(),
                            exportOptions: {
                                columns: ':not(.no-print)'
                            },
                            footer: true
                        }, {
                            extend: 'csv',
                            text: 'Csv',
                            title: $('h1').text(),
                            exportOptions: {
                                columns: ':not(.no-print)'
                            },
                            footer: true
                        }, {
                            extend: 'pdf',
                            text: 'Pdf',
                            title: $('h1').text(),
                            exportOptions: {
                                columns: ':not(.no-print)'
                            },
                            footer: true
                        }, {
                            extend: 'print',
                            text: 'Print',
                            title: $('h1').text(),
                            exportOptions: {
                                columns: ':not(.no-print)'
                            },
                            footer: true,
                            autoPrint: true
                        }],
                    dom: {
                        container: {
                            className: 'dt-buttons'
                        },
                        button: {
                            className: 'btn btn-primary'
                        }
                    }
                }
            });

            displaySuccessToast((data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST


        } else {
            $("#allInteractionTableDiv").hide("fast");
            displayErrorMsg((data.RESPONSE_MESSAGE));
        }

    });

// Handle when it failed to connect
    request.fail(function (jqXHR, textStatus) {
        console.log(textStatus);
        hide_loader();
        //show the error message
        $('#handleErrorMessages').show("fast");
        $("#allInteractionTableDiv").hide("fast");
        // displayErrorMsg("Sorry, something went wrong");
    });

});






//AJAX SETUP
$.ajaxSetup({
    timeout: 300000
});



/** UTILITIES FUNCTIONS STARTS HERE **/

//TO SENTENCE CASE
//function (str) {
//    return str.replace(
//        /\w\S*/g,
//        function(txt) {
//            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
//        }
//    );
//}

//RETURN BOOLEAN VALUES
function getBoolean(value) {
    switch (value) {
        case true:
        case "true":
        case 1:
        case "1":
        case "on":
        case "yes":
            return true;
        default:
            return false;
    }
}


/**
 *Show Loader Functions
 */
function show_loader() {
//    if (msg == '' || msg == undefined){
//        msg="Loading...";
//    }
    $(".loader").html('<div align="center" style="margin:0 auto; margin-top:30px;" class="text-center">' +
            '<div class="-spinner-ring -error-"></div>' +
            '</div>')
    $(".loader").show("fast");
}

/**
 *Hide Loader Functions
 */
function hide_loader() {
    $(".loader").html("")
    $(".loader").hide("fast");
}

function displaySuccessMsg(msg) {
    hide_loader();

    $(".msgAlertPlaceHolder").html("<div class='alert alert-success alert-dismissable fadeIn'><p class='text-center'>" +
            msg + "</p></div>");
    setTimeout(function () {
        $(".msgAlertPlaceHolder").html('');
    }, 7000);
}

function displayErrorMsg(msg) {
    hide_loader();
    $(".msgAlertPlaceHolder").html("<div class='alert alert-danger alert-dismissable fadeIn'><p class='text-center'>" +
            msg + "</p></div>");
    $(".loader").show('fast');
    setTimeout(function () {
        $(".msgAlertPlaceHolder").html('');
    }, 5000);
}

function displaySuccessToast(head, msg) {
    hide_loader();

    $.toast({
        heading: head,
        text: msg,
        position: 'top-right',
        loaderBg: '#E00201',
        icon: 'success',
        hideAfter: 3500,
        stack: 6
    });
}


/**
 *Show Modal Loader Functions
 */
function show_modal_loader() {
//    if (msg == '' || msg == undefined){
//        msg="Loading...";
//    }
    $(".modal_loader").html('<div align="center" style="margin:0 auto; margin-top:30px;" class="text-center">' +
            '<div class="-spinner-ring -error-"></div>' +
            '</div>')
    $(".modal_loader").show("fast");
}

/**
 *Hide modal Loader Functions
 */
function hide_modal_loader() {
    $(".modal_loader").html("")
    $(".modal_loader").hide("fast");
}

function displayErrorMsgModal(msg) {
    //hide loader
    hide_modal_loader();

    $(".modalAlertPlaceHolder").html("<div class='alert alert-danger alert-dismissable fadeIn'><p class='text-left'>" +
            msg + "</p></div>");
    setTimeout(function () {
        $(".modalAlertPlaceHolder").html('');
    }, 5000);
}

function displaySuccessToastModal(head, msg) {
    hide_modal_loader();

    $.toast({
        heading: head,
        text: msg,
        position: 'top-right',
        loaderBg: '#E00201',
        icon: 'success',
        hideAfter: 3500,
        stack: 6
    });
}
