// GLOBAL VARIABLES DECLARATIONS
var baseUrl = "http://localhost:8000/"
var apiRoute = "api/v1/"


var addAdminUserApi = baseUrl + apiRoute + "employee";
var loginApi = baseUrl + apiRoute + "login";
var getAllUsers = baseUrl + apiRoute + "employees";
var assignCustomersApi = baseUrl + apiRoute + "job/employee/";
var customerDataApi = baseUrl + apiRoute + "invoices";
var jobsDataApi = baseUrl + apiRoute + "jobs";


var statusCustomerDataApi = baseUrl + apiRoute + "get-customer-data-by-status";
var rgsCustomerDataApi = baseUrl + apiRoute + "get-base-rgs";
var updateCustomerStatus = baseUrl + apiRoute + "update-customer-status";
var updateAdminUserStatus = baseUrl + apiRoute + "user-activation";
var deleteAdminUserStatus = baseUrl + apiRoute + "delete-user";
var editAdminUserApi = baseUrl + apiRoute + "update-user";
var addPromotionApi = baseUrl + apiRoute + "create-promo";
var deletePromoApi = baseUrl + apiRoute + "delete-promo";
var getPromotionsList = baseUrl + apiRoute + "list-all-promos";
var getUnasssignedCustomers = baseUrl + apiRoute + "get-unassigned-customer-data";
var setGlobalTargetApi = baseUrl + apiRoute + "set-global-target";
var updateGlobalTarget = baseUrl + apiRoute + "update-global-target";
var updateActivityTarget = baseUrl + apiRoute + "update-activity-target";
var getStoredGlobalTargetApi = baseUrl + apiRoute + "get-stored-global-target";
var getStoredActivityTargetApi = baseUrl + apiRoute + "get-stored-activity-target";
var performanceDataApi = baseUrl + apiRoute + "all-performance-by-month";
var getTeamRankingApi = baseUrl + apiRoute + "get-team-ranks";
var setActivityTargetApi = baseUrl + apiRoute + "set-activity-target";
var tagCustomersApi = baseUrl + apiRoute + "assign-customer-promos";
var untagCustomersApi = baseUrl + apiRoute + "untag-customer-promos";
var deleteCustomersApi = baseUrl + apiRoute + "delete-customer";
var getPromoNamesApi = baseUrl + apiRoute + "get-all-promos";
var getFeedbackByAgents = baseUrl + apiRoute + "get-customer-feedback";
var subscriberInteractionsApi = baseUrl + apiRoute + "search-feedback";
var allInteractionsApi = baseUrl + apiRoute + "search-feedback-by-date";

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


/**Handle active customers here **/
$("#base-tab-2a").click(function (e) {
    getActiveRgsCustomerData();

});

/**Handle active customers here **/
$("#base-tab-2b").click(function (e) {
    getActiveNonRgsCustomerData();

});

/**Handle INACTIVE customers here **/
$("#base-tab-3").click(function (e) {
    getInActiveCustomerData();

});

/**Handle SUSPENDED customers **/
$("#base-tab-4").click(function (e) {
    getSuspendedCustomerData();

});

/**Handle predeactive customers **/
$("#base-tab-5").click(function (e) {
    getPredeactiveCustomerData();

});
/**Handle locked customers **/
$("#base-tab-6").click(function (e) {
    getLockedCustomerData();

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
        confirmButtonText: "Assign",
        cancelButtonText: "Delete",
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



// PERFORMANCE VIEW DATE RANGE SELECTOR
function performanceDatePicker() {

    var start = moment().startOf('month');
    var end = moment().endOf('month');

    function cb(start, end) {
        $('#datereportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }

    $('#datereportrange').daterangepicker({
        showCustomRangeLabel: false,
        autoApply: false,
        startDate: start,
        endDate: end,
        ranges: {
            'January': [moment().year(new Date().getFullYear()).month(0).date(1), moment().year(new Date().getFullYear()).month(0).date(31)],
            'February': [moment().year(new Date().getFullYear()).month(1).date(1), moment().year(new Date().getFullYear()).month(1).date(28)],
            'March': [moment().year(new Date().getFullYear()).month(2).date(1), moment().year(new Date().getFullYear()).month(2).date(31)],
            'April': [moment().year(new Date().getFullYear()).month(3).date(1), moment().year(new Date().getFullYear()).month(3).date(30)],
            'May': [moment().year(new Date().getFullYear()).month(4).date(1), moment().year(new Date().getFullYear()).month(4).date(31)],
            'June': [moment().year(new Date().getFullYear()).month(5).date(1), moment().year(new Date().getFullYear()).month(5).date(30)],
            'July': [moment().year(new Date().getFullYear()).month(6).date(1), moment().year(new Date().getFullYear()).month(6).date(31)],
            'August': [moment().year(new Date().getFullYear()).month(7).date(1), moment().year(new Date().getFullYear()).month(7).date(31)],
            'September': [moment().year(new Date().getFullYear()).month(8).date(1), moment().year(new Date().getFullYear()).month(8).date(30)],
            'October': [moment().year(new Date().getFullYear()).month(9).date(1), moment().year(new Date().getFullYear()).month(9).date(31)],
            'November': [moment().year(new Date().getFullYear()).month(10).date(1), moment().year(new Date().getFullYear()).month(10).date(30)],
            'December': [moment().year(new Date().getFullYear()).month(11).date(1), moment().year(new Date().getFullYear()).month(11).date(31)],

        }
    }, cb);

    cb(start, end);

    $('#datereportrange').on('apply.daterangepicker', function (ev, picker) {

        var startDate = picker.startDate.format('YYYY/MM/DD');
        var endDate = picker.endDate.format('YYYY/MM/DD');

        //  do something, like logging an input
        // console.log(picker.startDate.format('YYYY-MM-DD'));
        // console.log(picker.endDate.format('YYYY-MM-DD'));

        // On change of Month, show that particular month data

        var pickerData = "";

        if (picker.startDate.format('MM').startsWith("0")) {
            pickerData = picker.startDate.format('MM').substring(1)
        } else {
            pickerData = picker.startDate.format('MM')
        }

        var selectedMonth = monthNames[pickerData - 1];
        getAllPerformanceData(selectedMonth);

    });

}

// TEAM RANKING VIEW DATE RANGE SELECTOR
function teamRankingDatePicker() {

    var start = moment().startOf('month');
    var end = moment().endOf('month');

    function cb(start, end) {
        $('#teamRankingDateRange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }

    $('#teamRankingDateRange').daterangepicker({
        showCustomRangeLabel: false,
        autoApply: false,
        startDate: start,
        endDate: end,
        ranges: {
            'January': [moment().year(new Date().getFullYear()).month(0).date(1), moment().year(new Date().getFullYear()).month(0).date(31)],
            'February': [moment().year(new Date().getFullYear()).month(1).date(1), moment().year(new Date().getFullYear()).month(1).date(28)],
            'March': [moment().year(new Date().getFullYear()).month(2).date(1), moment().year(new Date().getFullYear()).month(2).date(31)],
            'April': [moment().year(new Date().getFullYear()).month(3).date(1), moment().year(new Date().getFullYear()).month(3).date(30)],
            'May': [moment().year(new Date().getFullYear()).month(4).date(1), moment().year(new Date().getFullYear()).month(4).date(31)],
            'June': [moment().year(new Date().getFullYear()).month(5).date(1), moment().year(new Date().getFullYear()).month(5).date(30)],
            'July': [moment().year(new Date().getFullYear()).month(6).date(1), moment().year(new Date().getFullYear()).month(6).date(31)],
            'August': [moment().year(new Date().getFullYear()).month(7).date(1), moment().year(new Date().getFullYear()).month(7).date(31)],
            'September': [moment().year(new Date().getFullYear()).month(8).date(1), moment().year(new Date().getFullYear()).month(8).date(30)],
            'October': [moment().year(new Date().getFullYear()).month(9).date(1), moment().year(new Date().getFullYear()).month(9).date(31)],
            'November': [moment().year(new Date().getFullYear()).month(10).date(1), moment().year(new Date().getFullYear()).month(10).date(30)],
            'December': [moment().year(new Date().getFullYear()).month(11).date(1), moment().year(new Date().getFullYear()).month(11).date(31)],

        }
    }, cb);

    cb(start, end);

    $('#teamRankingDateRange').on('apply.daterangepicker', function (ev, picker) {

        var startDate = picker.startDate.format('YYYY/MM/DD');
        var endDate = picker.endDate.format('YYYY/MM/DD');

        //  do something, like logging an input
        // console.log(picker.startDate.format('YYYY-MM-DD'));
        // console.log(picker.endDate.format('YYYY-MM-DD'));

        // On change of Month, show that particular month data

        var pickerData = "";

        if (picker.startDate.format('MM').startsWith("0")) {
            pickerData = picker.startDate.format('MM').substring(1)
        } else {
            pickerData = picker.startDate.format('MM')
        }

        var selectedMonth = monthNames[pickerData - 1];
        getTeamRankingData(selectedMonth);

    });

}

// INTERACTIONS HISTORY BY SUBSCRIBER DATE RANGE SELECTOR
function subscriberDateRangePicker() {

    var start = moment().startOf('month');
    var end = moment().endOf('month');

    function cb(start, end) {
        $('#subscriberReportRange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }

    $('#subscriberReportRange').daterangepicker({
        timePicker: true,
        timePickerIncrement: 30,
        timePicker24Hour: true,
        startDate: start,
        endDate: end,
        ranges: {
            'Today': [moment().startOf('day'), moment()],
            'Yesterday': [moment().startOf('day').subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().startOf('day').subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().startOf('day').subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('day').startOf('month'), moment().endOf('month')],
            'Last Month': [moment().startOf('day').subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        locale: {
            format: 'DD-MM-YYYY H:mm:s'
        }
    }, cb);

    cb(start, end);

    $('#subscriberReportRange').on('apply.daterangepicker', function (ev, picker) {

        subscriberStartDate = picker.startDate.format('YYYY-MM-DD H:mm:s');
        subscriberEndDate = picker.endDate.format('YYYY-MM-DD H:mm:s');

        //  do something, like logging an input
        console.log(subscriberStartDate);
        console.log(subscriberEndDate);

    });

}


// INTERACTIONS HISTORY BY SUBSCRIBER DATE RANGE SELECTOR
function allDateRangePicker() {

    var start = moment().startOf('month');
    var end = moment().endOf('month');

    function cb(start, end) {
        $('#allReportRange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }

    $('#allReportRange').daterangepicker({
        timePicker: true,
        timePickerIncrement: 30,
        timePicker24Hour: true,
        startDate: start,
        endDate: end,
        ranges: {
            'Today': [moment().startOf('day'), moment()],
            'Yesterday': [moment().startOf('day').subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().startOf('day').subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().startOf('day').subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('day').startOf('month'), moment().endOf('month')],
            'Last Month': [moment().startOf('day').subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        locale: {
            format: 'DD-MM-YYYY H:mm:s'
        }
    }, cb);

    cb(start, end);

    $('#allReportRange').on('apply.daterangepicker', function (ev, picker) {

        allStartDate = picker.startDate.format('YYYY-MM-DD H:mm:s');
        allEndDate = picker.endDate.format('YYYY-MM-DD H:mm:s');

        //  do something, like logging an input
        console.log(allStartDate);
        console.log(allEndDate);

    });

}

// Handle Promo Date Range Picker
function promoDateRangePicker() {

    var start = moment().startOf('month');
    var end = moment().endOf('month');

    function cb(start, end) {
        $('#addPromoDateRange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }

    $('#addPromoDateRange').daterangepicker({
        timePicker: true,
        timePickerIncrement: 30,
        timePicker24Hour: true,
        startDate: start,
        endDate: end,
        ranges: {
            'Today': [moment().startOf('day'), moment()],
            'Tomorrow': [moment().startOf('day').add(1, 'days'), moment().add(1, 'days')],
            'Next 7 Days': [moment().startOf('day').add(6, 'days'), moment()],
            'Next 30 Days': [moment().startOf('day').add(29, 'days'), moment()],
            'This Month': [moment().startOf('day').startOf('month'), moment().endOf('month')],
        },
        locale: {
            format: 'DD-MM-YYYY H:mm:s'
        }
    }, cb);

    cb(start, end);

    $('#addPromoDateRange').on('apply.daterangepicker', function (ev, picker) {

        allStartDate = picker.startDate.format('YYYY-MM-DD H:mm:s');
        allEndDate = picker.endDate.format('YYYY-MM-DD H:mm:s');

        //  do something, like logging an input
        console.log(allStartDate);
        console.log(allEndDate);

    });

}


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

/** GET STORED ACTIVITY TARGETS BY MONTHS AND SELECTED AGENT**/
function getStoredActivityTarget(selectedAgent) {
    var editSelectAgentType = selectedAgent.value;
    var formData = {
        "agent_id": editSelectAgentType,
        "month": monthNames[new Date().getMonth()]
    };

    formData = JSON.stringify(formData);

    var request = $.ajax({
        url: getStoredActivityTargetApi,
        type: "POST",
        data: formData,
        contentType: "application/json"
    });

    request.done(function (data) {
        if (data.RESPONSE_CODE == "200") {
            var allData = data["RESPONSE_DATA"][0];
            $('#editActivityTarget').val(allData.activity_target);
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
                selectCustomers.append($("<option></option>").attr("value", mainData.accountno).text(toTitleCase(mainData.acct_name)));
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
                displaySuccessToast(toTitleCase(data.message), ""); //DISPLAY TOAST
            } else {
                hide_loader();
                $("#loginBtn").removeAttr('disabled');
                console.log(data)
                displayErrorMsg(toTitleCase(data.message)); //display Error message
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
    var assignedAgent = "";
    var trafficLight = "";
    var accountDetails = "";
    var moreDetails = "";
    var feedBacks = "";
    var displayRgs = "";
    // Counts for the cards
    var activeRgsBase = 0;
    var nonActiveRgsBase = 0;
    var inactiveBase = 0;
    var suspendedBase = 0;
    var preDeactiveBase = 0;
    var lockedBase = 0;

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

                if (mainData.status == "ACTIVE") {
                    // trafficLight = "<i class='la la-circle trans_success' aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='ACTIVE'></i>";
                    feedBacks = "<a href='#' rel='tooltip' data-feedBack-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='Feedbacks' ><i class='ti-comment-alt'></i></a>";
                    moreDetails = "<a href='#' rel='tooltip' data-customer-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='More Details' ><i class='ti-more'></i></a>";
                    accountDetails = "<a href='#' rel='tooltip' data-customer-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='More Details' style='text-decoration: underline !important;'>" + mainData.accountno + "</a>";
                    // activeState = "<a href='#' rel='tooltip' data-customer-deactivate='"+detailsJson+"' class='' data-toggle='tooltip' data-placement='bottom' title='Deactivate Customer'><i class='ti-close'></i></a>";
                } else {
                    feedBacks = "<a href='#' rel='tooltip' data-feedBack-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='Feedbacks' ><i class='ti-comment-alt'></i></a>";
                    // trafficLight = "<i class='la la-circle trans_failed' aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='INACTIVE'></i>";
                    moreDetails = "<a href='#' rel='tooltip' data-customer-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='More Details' ><i class='ti-more'></i></a>";
                    accountDetails = "<a href='#' rel='tooltip' data-customer-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='More Details' style='text-decoration: underline !important;'>" + mainData.accountno + "</a>";
                    // activeState = "<a href='#' rel='tooltip' data-customer-activate='"+detailsJson+"'' class='' data-toggle='tooltip' data-placement='bottom' title='Activate Customer' ><i class='ti-check'></i></a>";
                }

                // check RGS

                table_list +=
                        "<tr width='100%'>" +
                        "<td>" + mainData.id + "</td>" +
                        "<td>" + mainData.employee.firstName + " " + mainData.employee.lastName + "</td>" +
                        "<td>" + mainData.project + "</td>" +
                        "<td >" + mainData.date + "</td>" +
                        "<td>" + mainData.startTime + "</td>" +
                        "<td>" + mainData.endTime + "</td>" +
                        "<td>" + mainData.status + "</td>" +
                        // "<td class='td-actions' width='100%'>"+activeState+"&nbsp;"+feedBacks+ "&nbsp;"+moreDetails+ "</td>"+
                        "<td class='td-actions' >" + feedBacks + "&nbsp;" + moreDetails + "</td>" +
                        "</tr>"

            }

            // Append the counts for each of the cards here
            $("#activeRgsBase").html(activeRgsBase);
            $("#nonActiveRgsBase").html(nonActiveRgsBase);
            $("#inactiveBase").html(inactiveBase);
            $("#suspendedBase").html(suspendedBase);
            $("#preDeactiveBase").html(preDeactiveBase);
            $("#lockedBase").html(lockedBase);

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

            hide_loader();
            // displaySuccessToast(toTitleCase(data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
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

function getCustomerData() {
    show_loader();

    var table_list = "";
    var assignedAgent = "";
    var trafficLight = "";
    var accountDetails = "";
    var moreDetails = "";
    var feedBacks = "";
    var displayRgs = "";
    // Counts for the cards
    var activeRgsBase = 0;
    var nonActiveRgsBase = 0;
    var inactiveBase = 0;
    var suspendedBase = 0;
    var preDeactiveBase = 0;
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

                if (mainData.status == "ACTIVE") {
                    // trafficLight = "<i class='la la-circle trans_success' aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='ACTIVE'></i>";
                    feedBacks = "<a href='#' rel='tooltip' data-feedBack-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='Feedbacks' ><i class='ti-comment-alt'></i></a>";
                    moreDetails = "<a href='#' rel='tooltip' data-customer-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='More Details' ><i class='ti-more'></i></a>";
                    accountDetails = "<a href='#' rel='tooltip' data-customer-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='More Details' style='text-decoration: underline !important;'>" + mainData.accountno + "</a>";
                    // activeState = "<a href='#' rel='tooltip' data-customer-deactivate='"+detailsJson+"' class='' data-toggle='tooltip' data-placement='bottom' title='Deactivate Customer'><i class='ti-close'></i></a>";
                } else {
                    feedBacks = "<a href='#' rel='tooltip' data-feedBack-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='Feedbacks' ><i class='ti-comment-alt'></i></a>";
                    // trafficLight = "<i class='la la-circle trans_failed' aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='INACTIVE'></i>";
                    moreDetails = "<a href='#' rel='tooltip' data-customer-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='More Details' ><i class='ti-more'></i></a>";
                    accountDetails = "<a href='#' rel='tooltip' data-customer-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='More Details' style='text-decoration: underline !important;'>" + mainData.accountno + "</a>";
                    // activeState = "<a href='#' rel='tooltip' data-customer-activate='"+detailsJson+"'' class='' data-toggle='tooltip' data-placement='bottom' title='Activate Customer' ><i class='ti-check'></i></a>";
                }

                // check RGS

                table_list +=
                        "<tr width='100%'>" +
                        "<td>" + mainData.id + "</td>" +
                        "<td>" + mainData.company + "</td>" +
                        "<td>" + mainData.invoiceStatus + "</td>" +
                        "<td >" + mainData.invoiceDate + "</td>" +
                        "<td>" + mainData.itemsCount + "</td>" +
                        // "<td class='td-actions' width='100%'>"+activeState+"&nbsp;"+feedBacks+ "&nbsp;"+moreDetails+ "</td>"+
                        "<td class='td-actions' >" + feedBacks + "&nbsp;" + moreDetails + "</td>" +
                        "</tr>"

            }

            // Append the counts for each of the cards here
            $("#activeRgsBase").html(activeRgsBase);
            $("#nonActiveRgsBase").html(nonActiveRgsBase);
            $("#inactiveBase").html(inactiveBase);
            $("#suspendedBase").html(suspendedBase);
            $("#preDeactiveBase").html(preDeactiveBase);
            $("#lockedBase").html(lockedBase);

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

            hide_loader();
            // displaySuccessToast(toTitleCase(data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
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

//Get active RGS customer data --->>> Base View Page
function getActiveRgsCustomerData() {
    show_loader();

    var table_list = "";
    var assignedAgent = "";
    var trafficLight = "";
    var accountDetails = "";
    var moreDetails = "";
    var feedBacks = "";
    var displayRgs = "";

    $('#activeRgsCustomerTable').DataTable().destroy();

    var formData = {
        "rgs": "Y"
    };

    formData = JSON.stringify(formData);

    var request = $.ajax({
        url: rgsCustomerDataApi,
        type: "POST",
        data: formData,
        contentType: "application/json"
    });

//HANDLE response here
    request.done(function (data) {
        if (data.status == "200") {

            var allData = data["RESPONSE_DATA"];

            for (i = 0; i < allData.length; i++) {
                mainData = allData[i];
                var detailsJson = JSON.stringify(mainData);


                if (mainData.status == "ACTIVE") {
                    // trafficLight = "<i class='la la-circle trans_success' aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='ACTIVE'></i>";
                    feedBacks = "<a href='#' rel='tooltip' data-feedBack-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='Feedbacks' ><i class='ti-comment-alt'></i></a>";
                    moreDetails = "<a href='#' rel='tooltip' data-customer-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='More Details' ><i class='ti-more'></i></a>";
                    accountDetails = "<a href='#' rel='tooltip' data-customer-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='More Details' style='text-decoration: underline !important;'>" + mainData.accountno + "</a>";
                    // activeState = "<a href='#' rel='tooltip' data-customer-deactivate='"+detailsJson+"' class='' data-toggle='tooltip' data-placement='bottom' title='Deactivate Customer'><i class='ti-close'></i></a>";
                } else {
                    feedBacks = "<a href='#' rel='tooltip' data-feedBack-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='Feedbacks' ><i class='ti-comment-alt'></i></a>";
                    // trafficLight = "<i class='la la-circle trans_failed' aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='INACTIVE'></i>";
                    moreDetails = "<a href='#' rel='tooltip' data-customer-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='More Details' ><i class='ti-more'></i></a>";
                    accountDetails = "<a href='#' rel='tooltip' data-customer-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='More Details' style='text-decoration: underline !important;'>" + mainData.accountno + "</a>";
                    // activeState = "<a href='#' rel='tooltip' data-customer-activate='"+detailsJson+"'' class='' data-toggle='tooltip' data-placement='bottom' title='Activate Customer' ><i class='ti-check'></i></a>";
                }


                if (mainData.rgs == "Y") {
                    displayRgs = "YES";
                    activeRgsBase++;
                }

                if (mainData.rgs == "N") {
                    displayRgs = "NO";
                    nonActiveRgsBase++;
                }

                table_list +=
                        "<tr width='100%'>" +
                        "<td>" + parseInt(i + 1) + "</td>" +
                        "<td>" + accountDetails + "</td>" +
                        "<td>" + mainData.sub_identity + "</td>" +
                        "<td >" + toTitleCase(mainData.acct_name) + "</td>" +
                        "<td>" + mainData.fixedline + "</td>" +
                        "<td>" + mainData.offer_name + "</td>" +
                        "<td>GHC " + mainData.advance_payment + "</td>" +
                        "<td>" + mainData.last_cash_payment_date + "</td>" +
                        "<td>" + mainData.bundle_expiry_date + "</td>" +
                        "<td>" + mainData.agent + "</td>" +
                        "<td>" + mainData.promo_name + "</td>" +
                        "<td>" + mainData.gross_add + "</td>" +
                        "<td>" + mainData.feedback + "</td>" +
                        "<td>" + mainData.reason_locked + "</td>" +
                        "<td>" + mainData.comment + "</td>" +
                        "<td>" + mainData.status + "</td>" +
                        "<td>" + displayRgs + "</td>" +
                        // "<td class='td-actions' width='100%'>"+activeState+"&nbsp;"+feedBacks+ "&nbsp;"+moreDetails+ "</td>"+
                        "<td class='td-actions' >" + feedBacks + "&nbsp;" + moreDetails + "</td>" +
                        "</tr>"

            }

            //Append the tables here
            $('#activeRgsCustomerData').html(table_list);

            //Base view table
            $('#activeRgsCustomerTable').DataTable({
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

            hide_loader();
            // displaySuccessToast(toTitleCase(data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
        } else {
            displayErrorMsg(toTitleCase(data.RESPONSE_MESSAGE));
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

//Get active NON-RGS customer data --->>> Base View Page
function getActiveNonRgsCustomerData() {
    show_loader();

    var table_list = "";
    var assignedAgent = "";
    var trafficLight = "";
    var accountDetails = "";
    var moreDetails = "";
    var feedBacks = "";
    var displayRgs = "";

    $('#activeNonRgsCustomerTable').DataTable().destroy();

    var formData = {
        "rgs": "N"
    };

    formData = JSON.stringify(formData);

    var request = $.ajax({
        url: rgsCustomerDataApi,
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


                if (mainData.status == "ACTIVE") {
                    // trafficLight = "<i class='la la-circle trans_success' aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='ACTIVE'></i>";
                    feedBacks = "<a href='#' rel='tooltip' data-feedBack-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='Feedbacks' ><i class='ti-comment-alt'></i></a>";
                    moreDetails = "<a href='#' rel='tooltip' data-customer-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='More Details' ><i class='ti-more'></i></a>";
                    accountDetails = "<a href='#' rel='tooltip' data-customer-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='More Details' style='text-decoration: underline !important;'>" + mainData.accountno + "</a>";
                    // activeState = "<a href='#' rel='tooltip' data-customer-deactivate='"+detailsJson+"' class='' data-toggle='tooltip' data-placement='bottom' title='Deactivate Customer'><i class='ti-close'></i></a>";
                } else {
                    feedBacks = "<a href='#' rel='tooltip' data-feedBack-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='Feedbacks' ><i class='ti-comment-alt'></i></a>";
                    // trafficLight = "<i class='la la-circle trans_failed' aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='INACTIVE'></i>";
                    moreDetails = "<a href='#' rel='tooltip' data-customer-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='More Details' ><i class='ti-more'></i></a>";
                    accountDetails = "<a href='#' rel='tooltip' data-customer-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='More Details' style='text-decoration: underline !important;'>" + mainData.accountno + "</a>";
                    // activeState = "<a href='#' rel='tooltip' data-customer-activate='"+detailsJson+"'' class='' data-toggle='tooltip' data-placement='bottom' title='Activate Customer' ><i class='ti-check'></i></a>";
                }

                if (mainData.rgs == "Y") {
                    displayRgs = "YES";
                }

                if (mainData.rgs == "N") {
                    displayRgs = "NO";
                }

                table_list +=
                        "<tr width='100%'>" +
                        "<td>" + parseInt(i + 1) + "</td>" +
                        "<td>" + accountDetails + "</td>" +
                        "<td>" + mainData.sub_identity + "</td>" +
                        "<td >" + toTitleCase(mainData.acct_name) + "</td>" +
                        "<td>" + mainData.fixedline + "</td>" +
                        "<td>" + mainData.offer_name + "</td>" +
                        "<td>GHC " + mainData.advance_payment + "</td>" +
                        "<td>" + mainData.last_cash_payment_date + "</td>" +
                        "<td>" + mainData.bundle_expiry_date + "</td>" +
                        "<td>" + mainData.agent + "</td>" +
                        "<td>" + mainData.promo_name + "</td>" +
                        "<td>" + mainData.gross_add + "</td>" +
                        "<td>" + mainData.feedback + "</td>" +
                        "<td>" + mainData.reason_locked + "</td>" +
                        "<td>" + mainData.comment + "</td>" +
                        "<td>" + mainData.status + "</td>" +
                        "<td>" + displayRgs + "</td>" +
                        // "<td class='td-actions' width='100%'>"+activeState+"&nbsp;"+feedBacks+ "&nbsp;"+moreDetails+ "</td>"+
                        "<td class='td-actions' >" + feedBacks + "&nbsp;" + moreDetails + "</td>" +
                        "</tr>"

            }

            //Append the tables here
            $('#activeNonRgsCustomerData').html(table_list);

            //Base view table
            $('#activeNonRgsCustomerTable').DataTable({
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

            hide_loader();
            // displaySuccessToast(toTitleCase(data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
        } else {
            displayErrorMsg(toTitleCase(data.RESPONSE_MESSAGE));
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

//Get inactive customer data --->>> Base View Page
function getInActiveCustomerData() {
    show_loader();

    var table_list = "";
    var assignedAgent = "";
    var trafficLight = "";
    var accountDetails = "";
    var moreDetails = "";
    var feedBacks = "";
    var displayRgs = "";

    $('#inActiveCustomerTable').DataTable().destroy();

    var formData = {
        "status": "INACTIVE"
    };

    formData = JSON.stringify(formData);

    var request = $.ajax({
        url: statusCustomerDataApi,
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


                if (mainData.status == "ACTIVE") {
                    // trafficLight = "<i class='la la-circle trans_success' aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='ACTIVE'></i>";
                    feedBacks = "<a href='#' rel='tooltip' data-feedBack-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='Feedbacks' ><i class='ti-comment-alt'></i></a>";
                    moreDetails = "<a href='#' rel='tooltip' data-customer-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='More Details' ><i class='ti-more'></i></a>";
                    accountDetails = "<a href='#' rel='tooltip' data-customer-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='More Details' style='text-decoration: underline !important;'>" + mainData.accountno + "</a>";
                    // activeState = "<a href='#' rel='tooltip' data-customer-deactivate='"+detailsJson+"' class='' data-toggle='tooltip' data-placement='bottom' title='Deactivate Customer'><i class='ti-close'></i></a>";
                } else {
                    feedBacks = "<a href='#' rel='tooltip' data-feedBack-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='Feedbacks' ><i class='ti-comment-alt'></i></a>";
                    // trafficLight = "<i class='la la-circle trans_failed' aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='INACTIVE'></i>";
                    moreDetails = "<a href='#' rel='tooltip' data-customer-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='More Details' ><i class='ti-more'></i></a>";
                    accountDetails = "<a href='#' rel='tooltip' data-customer-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='More Details' style='text-decoration: underline !important;'>" + mainData.accountno + "</a>";
                    // activeState = "<a href='#' rel='tooltip' data-customer-activate='"+detailsJson+"'' class='' data-toggle='tooltip' data-placement='bottom' title='Activate Customer' ><i class='ti-check'></i></a>";
                }

                if (mainData.rgs == "Y") {
                    displayRgs = "YES";
                }

                if (mainData.rgs == "N") {
                    displayRgs = "NO";
                }

                table_list +=
                        "<tr width='100%'>" +
                        "<td>" + parseInt(i + 1) + "</td>" +
                        "<td>" + accountDetails + "</td>" +
                        "<td>" + mainData.sub_identity + "</td>" +
                        "<td >" + toTitleCase(mainData.acct_name) + "</td>" +
                        "<td>" + mainData.fixedline + "</td>" +
                        "<td>" + mainData.offer_name + "</td>" +
                        "<td>GHC " + mainData.advance_payment + "</td>" +
                        "<td>" + mainData.last_cash_payment_date + "</td>" +
                        "<td>" + mainData.bundle_expiry_date + "</td>" +
                        "<td>" + mainData.agent + "</td>" +
                        "<td>" + mainData.promo_name + "</td>" +
                        "<td>" + mainData.gross_add + "</td>" +
                        "<td>" + mainData.feedback + "</td>" +
                        "<td>" + mainData.reason_locked + "</td>" +
                        "<td>" + mainData.comment + "</td>" +
                        "<td>" + mainData.status + "</td>" +
                        "<td>" + displayRgs + "</td>" +
                        // "<td class='td-actions' width='100%'>"+activeState+"&nbsp;"+feedBacks+ "&nbsp;"+moreDetails+ "</td>"+
                        "<td class='td-actions' >" + feedBacks + "&nbsp;" + moreDetails + "</td>" +
                        "</tr>"

            }

            //Append the tables here
            $('#inActiveCustomerData').html(table_list);

            //Base view table
            $('#inActiveCustomerTable').DataTable({
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

            hide_loader();
            // displaySuccessToast(toTitleCase(data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
        } else {
            displayErrorMsg(toTitleCase(data.RESPONSE_MESSAGE));
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

//Get suspended customer data --->>> Base View Page
function getSuspendedCustomerData() {
    show_loader();

    var table_list = "";
    var assignedAgent = "";
    var trafficLight = "";
    var accountDetails = "";
    var moreDetails = "";
    var feedBacks = "";
    var displayRgs = "";

    $('#suspendedCustomerTable').DataTable().destroy();

    var formData = {
        "status": "SUSPENDED"
    };

    formData = JSON.stringify(formData);

    var request = $.ajax({
        url: statusCustomerDataApi,
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


                if (mainData.status == "ACTIVE") {
                    // trafficLight = "<i class='la la-circle trans_success' aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='ACTIVE'></i>";
                    feedBacks = "<a href='#' rel='tooltip' data-feedBack-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='Feedbacks' ><i class='ti-comment-alt'></i></a>";
                    moreDetails = "<a href='#' rel='tooltip' data-customer-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='More Details' ><i class='ti-more'></i></a>";
                    accountDetails = "<a href='#' rel='tooltip' data-customer-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='More Details' style='text-decoration: underline !important;'>" + mainData.accountno + "</a>";
                    // activeState = "<a href='#' rel='tooltip' data-customer-deactivate='"+detailsJson+"' class='' data-toggle='tooltip' data-placement='bottom' title='Deactivate Customer'><i class='ti-close'></i></a>";
                } else {
                    feedBacks = "<a href='#' rel='tooltip' data-feedBack-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='Feedbacks' ><i class='ti-comment-alt'></i></a>";
                    // trafficLight = "<i class='la la-circle trans_failed' aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='INACTIVE'></i>";
                    moreDetails = "<a href='#' rel='tooltip' data-customer-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='More Details' ><i class='ti-more'></i></a>";
                    accountDetails = "<a href='#' rel='tooltip' data-customer-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='More Details' style='text-decoration: underline !important;'>" + mainData.accountno + "</a>";
                    // activeState = "<a href='#' rel='tooltip' data-customer-activate='"+detailsJson+"'' class='' data-toggle='tooltip' data-placement='bottom' title='Activate Customer' ><i class='ti-check'></i></a>";
                }

                if (mainData.rgs == "Y") {
                    displayRgs = "YES";
                }

                if (mainData.rgs == "N") {
                    displayRgs = "NO";
                }

                table_list +=
                        "<tr width='100%'>" +
                        "<td>" + parseInt(i + 1) + "</td>" +
                        "<td>" + accountDetails + "</td>" +
                        "<td>" + mainData.sub_identity + "</td>" +
                        "<td >" + toTitleCase(mainData.acct_name) + "</td>" +
                        "<td>" + mainData.fixedline + "</td>" +
                        "<td>" + mainData.offer_name + "</td>" +
                        "<td>GHC " + mainData.advance_payment + "</td>" +
                        "<td>" + mainData.last_cash_payment_date + "</td>" +
                        "<td>" + mainData.bundle_expiry_date + "</td>" +
                        "<td>" + mainData.agent + "</td>" +
                        "<td>" + mainData.promo_name + "</td>" +
                        "<td>" + mainData.gross_add + "</td>" +
                        "<td>" + mainData.feedback + "</td>" +
                        "<td>" + mainData.reason_locked + "</td>" +
                        "<td>" + mainData.comment + "</td>" +
                        "<td>" + mainData.status + "</td>" +
                        "<td>" + displayRgs + "</td>" +
                        // "<td class='td-actions' width='100%'>"+activeState+"&nbsp;"+feedBacks+ "&nbsp;"+moreDetails+ "</td>"+
                        "<td class='td-actions' >" + feedBacks + "&nbsp;" + moreDetails + "</td>" +
                        "</tr>"

            }

            //Append the tables here
            $('#suspendedCustomerData').html(table_list);

            //Base view table
            $('#suspendedCustomerTable').DataTable({
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

            hide_loader();
            // displaySuccessToast(toTitleCase(data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
        } else {
            displayErrorMsg(toTitleCase(data.RESPONSE_MESSAGE));
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

//Get predeactive customer data --->>> Base View Page
function getPredeactiveCustomerData() {
    show_loader();

    var table_list = "";
    var assignedAgent = "";
    var trafficLight = "";
    var accountDetails = "";
    var moreDetails = "";
    var feedBacks = "";
    var displayRgs = "";

    $('#predeactiveCustomerTable').DataTable().destroy();

    var formData = {
        "status": "PRE DEACTIVE"
    };

    formData = JSON.stringify(formData);

    var request = $.ajax({
        url: statusCustomerDataApi,
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


                if (mainData.status == "ACTIVE") {
                    // trafficLight = "<i class='la la-circle trans_success' aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='ACTIVE'></i>";
                    feedBacks = "<a href='#' rel='tooltip' data-feedBack-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='Feedbacks' ><i class='ti-comment-alt'></i></a>";
                    moreDetails = "<a href='#' rel='tooltip' data-customer-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='More Details' ><i class='ti-more'></i></a>";
                    accountDetails = "<a href='#' rel='tooltip' data-customer-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='More Details' style='text-decoration: underline !important;'>" + mainData.accountno + "</a>";
                    // activeState = "<a href='#' rel='tooltip' data-customer-deactivate='"+detailsJson+"' class='' data-toggle='tooltip' data-placement='bottom' title='Deactivate Customer'><i class='ti-close'></i></a>";
                } else {
                    feedBacks = "<a href='#' rel='tooltip' data-feedBack-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='Feedbacks' ><i class='ti-comment-alt'></i></a>";
                    // trafficLight = "<i class='la la-circle trans_failed' aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='INACTIVE'></i>";
                    moreDetails = "<a href='#' rel='tooltip' data-customer-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='More Details' ><i class='ti-more'></i></a>";
                    accountDetails = "<a href='#' rel='tooltip' data-customer-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='More Details' style='text-decoration: underline !important;'>" + mainData.accountno + "</a>";
                    // activeState = "<a href='#' rel='tooltip' data-customer-activate='"+detailsJson+"'' class='' data-toggle='tooltip' data-placement='bottom' title='Activate Customer' ><i class='ti-check'></i></a>";
                }

                if (mainData.rgs == "Y") {
                    displayRgs = "YES";
                }

                if (mainData.rgs == "N") {
                    displayRgs = "NO";
                }

                table_list +=
                        "<tr width='100%'>" +
                        "<td>" + parseInt(i + 1) + "</td>" +
                        "<td>" + accountDetails + "</td>" +
                        "<td>" + mainData.sub_identity + "</td>" +
                        "<td >" + toTitleCase(mainData.acct_name) + "</td>" +
                        "<td>" + mainData.fixedline + "</td>" +
                        "<td>" + mainData.offer_name + "</td>" +
                        "<td>GHC " + mainData.advance_payment + "</td>" +
                        "<td>" + mainData.last_cash_payment_date + "</td>" +
                        "<td>" + mainData.bundle_expiry_date + "</td>" +
                        "<td>" + mainData.agent + "</td>" +
                        "<td>" + mainData.promo_name + "</td>" +
                        "<td>" + mainData.gross_add + "</td>" +
                        "<td>" + mainData.feedback + "</td>" +
                        "<td>" + mainData.reason_locked + "</td>" +
                        "<td>" + mainData.comment + "</td>" +
                        "<td>" + mainData.status + "</td>" +
                        "<td>" + displayRgs + "</td>" +
                        // "<td class='td-actions' width='100%'>"+activeState+"&nbsp;"+feedBacks+ "&nbsp;"+moreDetails+ "</td>"+
                        "<td class='td-actions' >" + feedBacks + "&nbsp;" + moreDetails + "</td>" +
                        "</tr>"

            }

            //Append the tables here
            $('#predeactiveCustomerData').html(table_list);

            //Base view table
            $('#predeactiveCustomerTable').DataTable({
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

            hide_loader();
            // displaySuccessToast(toTitleCase(data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
        } else {
            displayErrorMsg(toTitleCase(data.RESPONSE_MESSAGE));
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

//Get locked customer data --->>> Base View Page
function getLockedCustomerData() {
    show_loader();

    var table_list = "";
    var assignedAgent = "";
    var trafficLight = "";
    var accountDetails = "";
    var moreDetails = "";
    var feedBacks = "";
    var displayRgs = "";

    $('#lockedCustomerTable').DataTable().destroy();

    var formData = {
        "status": "LOCKED"
    };

    formData = JSON.stringify(formData);

    var request = $.ajax({
        url: statusCustomerDataApi,
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


                if (mainData.status == "ACTIVE") {
                    // trafficLight = "<i class='la la-circle trans_success' aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='ACTIVE'></i>";
                    feedBacks = "<a href='#' rel='tooltip' data-feedBack-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='Feedbacks' ><i class='ti-comment-alt'></i></a>";
                    moreDetails = "<a href='#' rel='tooltip' data-customer-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='More Details' ><i class='ti-more'></i></a>";
                    accountDetails = "<a href='#' rel='tooltip' data-customer-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='More Details' style='text-decoration: underline !important;'>" + mainData.accountno + "</a>";
                    // activeState = "<a href='#' rel='tooltip' data-customer-deactivate='"+detailsJson+"' class='' data-toggle='tooltip' data-placement='bottom' title='Deactivate Customer'><i class='ti-close'></i></a>";
                } else {
                    feedBacks = "<a href='#' rel='tooltip' data-feedBack-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='Feedbacks' ><i class='ti-comment-alt'></i></a>";
                    // trafficLight = "<i class='la la-circle trans_failed' aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='INACTIVE'></i>";
                    moreDetails = "<a href='#' rel='tooltip' data-customer-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='More Details' ><i class='ti-more'></i></a>";
                    accountDetails = "<a href='#' rel='tooltip' data-customer-details='" + detailsJson + "'' class='' data-toggle='tooltip' data-placement='bottom' title='More Details' style='text-decoration: underline !important;'>" + mainData.accountno + "</a>";
                    // activeState = "<a href='#' rel='tooltip' data-customer-activate='"+detailsJson+"'' class='' data-toggle='tooltip' data-placement='bottom' title='Activate Customer' ><i class='ti-check'></i></a>";
                }

                if (mainData.rgs == "Y") {
                    displayRgs = "YES";
                }

                if (mainData.rgs == "N") {
                    displayRgs = "NO";
                }

                table_list +=
                        "<tr width='100%'>" +
                        "<td>" + parseInt(i + 1) + "</td>" +
                        "<td>" + accountDetails + "</td>" +
                        "<td>" + mainData.sub_identity + "</td>" +
                        "<td >" + toTitleCase(mainData.acct_name) + "</td>" +
                        "<td>" + mainData.fixedline + "</td>" +
                        "<td>" + mainData.offer_name + "</td>" +
                        "<td>GHC " + mainData.advance_payment + "</td>" +
                        "<td>" + mainData.last_cash_payment_date + "</td>" +
                        "<td>" + mainData.bundle_expiry_date + "</td>" +
                        "<td>" + mainData.agent + "</td>" +
                        "<td>" + mainData.promo_name + "</td>" +
                        "<td>" + mainData.gross_add + "</td>" +
                        "<td>" + mainData.feedback + "</td>" +
                        "<td>" + mainData.reason_locked + "</td>" +
                        "<td>" + mainData.comment + "</td>" +
                        "<td>" + mainData.status + "</td>" +
                        "<td>" + displayRgs + "</td>" +
                        // "<td class='td-actions' width='100%'>"+activeState+"&nbsp;"+feedBacks+ "&nbsp;"+moreDetails+ "</td>"+
                        "<td class='td-actions' >" + feedBacks + "&nbsp;" + moreDetails + "</td>" +
                        "</tr>"

            }

            //Append the tables here
            $('#lockedCustomerData').html(table_list);

            //Base view table
            $('#lockedCustomerTable').DataTable({
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

            hide_loader();
            // displaySuccessToast(toTitleCase(data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
        } else {
            displayErrorMsg(toTitleCase(data.RESPONSE_MESSAGE));
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


//SHOW CUSTOMER DATA MORE DETAILS
$(document).on('click', '[data-customer-details]', function (e) {

    var jsonDetails = JSON.parse($(this).attr('data-customer-details'));

    $('#displayAccountName').html(toTitleCase(jsonDetails.acct_name));
    $('#showAccountNo').html(jsonDetails.accountno);
    $('#showAccountName').html(toTitleCase(jsonDetails.acct_name));
    // $('#showSubIdentity').html(toTitleCase(jsonDetails.sub_identity));
    $('#showFixedLine').html(jsonDetails.fixedline);
    $('#showPackage').html(jsonDetails.offer_name);
    $('#showStatus').html(jsonDetails.status);
    $('#showAgent').html(jsonDetails.agent);
    // $('#showCurrentBalance').html(jsonDetails.current_bal);
    // $('#showAdvancePayment').html("GHC "+jsonDetails.advance_payment);
    $('#showLastPaymentDate').html(jsonDetails.last_cash_payment_date);
    $('#showExpiryDate').html(jsonDetails.bundle_expiry_date);

    $('#moreDetailsCustomerData').modal('show');

});

// VIEW FEEDBACKS BY AGENTS FOR EACH CUSTOMER
$(document).on('click', '[data-feedBack-details]', function (e) {
    //Empty the body of the feedback table  
    $('#feedbackTableData').html("");

    var jsonDetails = JSON.parse($(this).attr('data-feedBack-details'));
    var customerId = jsonDetails.accountno;

    var formData = {
        "customer_id": customerId
    };

    formData = JSON.stringify(formData);

    var request = $.ajax({
        url: getFeedbackByAgents,
        type: "POST",
        data: formData,
        contentType: "application/json"
    });

    request.done(function (data) {
        if (data.RESPONSE_CODE == "200") {

            var table_list = "";

            var allFeedbacks = data["RESPONSE_DATA"];

            if (allFeedbacks.length == 0) {
                swal({
                    title: "No feedback available",
                    text: "",
                    type: "warning",
                    showCancelButton: false,
                    closeOnConfirm: true,
                    showLoaderOnConfirm: false,
                    confirmButtonText: "Ok"
                });

            } else {

                for (i = 0; i < allFeedbacks.length; i++) {
                    var displayFeedback = allFeedbacks[i];
                    table_list +=
                            "<tr>" +
                            "<td>" + parseInt(i + 1) + "</td>" +
                            "<td>" + displayFeedback.cus_feedback + "</td>" +
                            "<td>" + displayFeedback.reason_locked + "</td>" +
                            "<td>" + displayFeedback.rm_comment + "</td>" +
                            "<td>" + displayFeedback.date + "</td>" +
                            "</tr>"
                }

                // Show these fields
                $('#showFeedbackAgentName').html(jsonDetails.agent);
                $('#showCustomerAccountNo').html(jsonDetails.accountno);

                $('#feedbackTableData').html(table_list);
                $('#feedBackModal').modal('show');

            }


        } else {
            hide_loader();
            $('#feedBackModal').modal('hide');
            swal({
                title: "No feedback available",
                text: "",
                type: "warning",
                showCancelButton: false,
                closeOnConfirm: true,
                showLoaderOnConfirm: false,
                confirmButtonText: "Ok"
            });
        }
    });

    // Handle when it failed to connect
    request.fail(function (jqXHR, textStatus) {
        console.log(textStatus);
        $('#feedBackModal').modal('hide');
        //show the error message
        displayErrorMsg("Sorry, something went wrong");
    });



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
                        getCustomerData();
                        displaySuccessToast(toTitleCase(data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
                    } else {
                        hide_loader();
                        console.log(data)
                        displayErrorMsg(toTitleCase(data.RESPONSE_MESSAGE)); //display Error message
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
                        getCustomerData();
                        displaySuccessToast(toTitleCase(data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
                    } else {
                        hide_loader();
                        console.log(data)
                        displayErrorMsg(toTitleCase(data.RESPONSE_MESSAGE)); //display Error message
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
                        "<td>" + toTitleCase(mainData.promo_name) + "</td>" +
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
            // displaySuccessToast(toTitleCase(data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
        } else {
            displayErrorMsg(toTitleCase(data.RESPONSE_MESSAGE));
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


// START OF ADMIN USERS API
//Get users data --->>> Settings-> View Page
function getAdminUsersData() {
    show_loader();

    var table_list = "";
    var trafficLight = "";
    var deleteUser = "";
    var editUser = "";
    var moreDetails = "";
    var dateUpdated = "";
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
            // displaySuccessToast(toTitleCase(data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
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

    $('#displayEditUserName').html(toTitleCase(jsonDetails.username));
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
                if (data.RESPONSE_CODE == "200") {
                    document.getElementById("editUserForm").reset();
                    $("#editUserBtn").removeAttr('disabled');

                    console.log(data);
                    //get admin user data again here
                    getAdminUsersData();

                    $('#editUserModal').modal('hide');
                    displaySuccessToastModal(toTitleCase(data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
                } else {
                    $("#editUserBtn").removeAttr('disabled');
                    console.log(data)
                    displayErrorMsgModal(toTitleCase(data.RESPONSE_MESSAGE)); //display Error message
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

    $('#displayUserFullname').html(toTitleCase(jsonDetails.userdesc));
    $('#showAdminFullname').html(toTitleCase(jsonDetails.userdesc));
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
                        getAdminUsersData();
                        displaySuccessToast(toTitleCase(data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
                    } else {
                        hide_loader();
                        console.log(data)
                        displayErrorMsg(toTitleCase(data.RESPONSE_MESSAGE)); //display Error message
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
                        getAdminUsersData();
                        displaySuccessToast(toTitleCase(data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
                    } else {
                        hide_loader();
                        console.log(data)
                        displayErrorMsg(toTitleCase(data.RESPONSE_MESSAGE)); //display Error message
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
                    url: deleteAdminUserStatus,
                    type: "POST",
                    data: formData,
                    contentType: "application/json"
                });

                request.done(function (data) {
                    if (data.RESPONSE_CODE == "200") {
                        console.log(data);
                        //get admin user data again here
                        getAdminUsersData();
                        displaySuccessToast(toTitleCase(data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
                    } else {
                        hide_loader();
                        console.log(data)
                        displayErrorMsg(toTitleCase(data.RESPONSE_MESSAGE)); //display Error message
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



//DELETE PROMOTION 
$(document).on('click', '[data-promo-delete]', function (e) {

    var jsonDetails = JSON.parse($(this).attr('data-promo-delete'));

    var formData = {
        "id": jsonDetails.id
    }


    formData = JSON.stringify(formData);

    swal({
        title: "Delete Promo?",
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
                    type: "POST",
                    data: formData,
                    contentType: "application/json"
                });

                request.done(function (data) {
                    if (data.RESPONSE_CODE == "200") {
                        console.log(data);
                        //get promo data again here
                        getPromoData();
                        displaySuccessToast(toTitleCase(data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
                    } else {
                        hide_loader();
                        console.log(data)
                        displayErrorMsg(toTitleCase(data.RESPONSE_MESSAGE)); //display Error message
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
                displaySuccessToastModal(toTitleCase(data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
            } else {
                $("#addPromoBtn").removeAttr('disabled');
                console.log(data)
                displayErrorMsgModal(toTitleCase(data.RESPONSE_MESSAGE)); //display Error message
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
                getAdminUsersData();

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
                //get admin user data again here
                getCustomerData();

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
                getCustomerData();

                $('#tagCustomersModal').modal('hide');
                displaySuccessToastModal(toTitleCase(data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
            } else {
                $("#tagCustomersBtn").removeAttr('disabled');
                console.log(data)
                displayErrorMsgModal(toTitleCase(data.RESPONSE_MESSAGE)); //display Error message
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
                getCustomerData();

                $('#untagCustomersModal').modal('hide');
                displaySuccessToastModal(toTitleCase(data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
            } else {
                $("#untagCustomersBtn").removeAttr('disabled');
                console.log(data)
                displayErrorMsgModal(toTitleCase(data.RESPONSE_MESSAGE)); //display Error message
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
                getCustomerData();

                $('#deleteCustomersModal').modal('hide');
                displaySuccessToastModal(toTitleCase(data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
            } else {
                $("#deleteCustomersBtn").removeAttr('disabled');
                console.log(data)
                displayErrorMsgModal(toTitleCase(data.RESPONSE_MESSAGE)); //display Error message
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



/** PERFORMANCE API STARTS HERE **/

//Get performances 
function getAllPerformanceData(selectedMonth) {
    show_loader();

    var table_list = "";

    $('#performanceViewTable').DataTable().destroy();
    $('#performanceViewData').html("");

    var formData = {
        "month": selectedMonth
    };

    formData = JSON.stringify(formData);

    console.log(formData);

    var request = $.ajax({
        url: performanceDataApi,
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
                        // since it is using colspan=2, we will have 2 tds

                        "<td>" + parseInt(i + 1) + "</td>" +
                        "<td></td>" +
                        // Agent Name
                        "<td>" + mainData.agent_id + "</td>" +
                        "<td></td>" +
                        // Vodafone Cash
                        "<td>" + mainData.vfcash_target + "%" + "</td>" +
                        "<td>" + mainData.vfcash_achievement + "%" + "</td>" +
                        // Upgrade Target
                        "<td>" + mainData.upgrade_target + "%" + "</td>" +
                        "<td>" + mainData.upgrade_achievement + "%" + "</td>" +
                        // Downgrade Target
                        "<td>" + mainData.downgrade_target + "%" + "</td>" +
                        "<td>" + mainData.downgrade_achievement + "%" + "</td>" +
                        // Activity Target
                        "<td>" + mainData.activity_target + "</td>" +
                        "<td>" + mainData.activity_actual + "</td>" +
                        "<td>" + mainData.activity_achievement + "%" + "</td>" +
                        // Activity Actual and Total

                        "<td>" + mainData.total + "%" + "</td>" +
                        "</tr>"

            }

            //Append the tables here
            $('#performanceViewData').html(table_list);

            //Base view table
            $('#performanceViewTable').DataTable({
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
            displaySuccessToast(toTitleCase(data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
        } else {
            displayErrorMsg(toTitleCase(data.RESPONSE_MESSAGE));

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
            displaySuccessToast(toTitleCase(data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
        } else {
            displayErrorMsg(toTitleCase(data.RESPONSE_MESSAGE));

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
                displaySuccessToastModal(toTitleCase(data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
            } else {
                $("#setGlobalTargetBtn").removeAttr('disabled');
                console.log(data)
                displayErrorMsgModal(toTitleCase(data.RESPONSE_MESSAGE)); //display Error message
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
                displaySuccessToastModal(toTitleCase(data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
            } else {
                $("#setActivityTargetBtn").removeAttr('disabled');
                console.log(data)
                displayErrorMsgModal(toTitleCase(data.RESPONSE_MESSAGE)); //display Error message
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
                displaySuccessToastModal(toTitleCase(data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
            } else {
                $("#editSetGlobalTargetBtn").removeAttr('disabled');
                console.log(data)
                displayErrorMsgModal(toTitleCase(data.RESPONSE_MESSAGE)); //display Error message
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
                displaySuccessToastModal(toTitleCase(data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST
            } else {
                $("#editSetActivityTargetBtn").removeAttr('disabled');
                console.log(data)
                displayErrorMsgModal(toTitleCase(data.RESPONSE_MESSAGE)); //display Error message
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

            displaySuccessToast(toTitleCase(data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST


        } else {
            $("#subscriberInteractionTable").hide("fast");
            displayErrorMsg(toTitleCase(data.RESPONSE_MESSAGE));
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

            displaySuccessToast(toTitleCase(data.RESPONSE_MESSAGE), ""); //DISPLAY TOAST


        } else {
            $("#allInteractionTableDiv").hide("fast");
            displayErrorMsg(toTitleCase(data.RESPONSE_MESSAGE));
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
//function toTitleCase(str) {
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
