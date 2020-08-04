<?php include("assets/php/header.php"); ?>

<body id="page-top">
    <!-- Begin Preloader -->
    <div id="preloader">
        <div class="canvas">
            <img src="assets/img/logo.png" alt="Telesales - vodafone ghana" class="loader-logo">
            <div class="spinner"></div>
        </div>
    </div>
    <!-- End Preloader -->
    <div class="page">
        <!-- Begin Header -->
        <?php include("assets/php/navbar-header.php"); ?>
        <!-- End Header -->
        <!-- Begin Page Content -->
        <div class="page-content d-flex align-items-stretch">
            <div class="w3-card-2 w3-white panel default-sidebar">
                <!-- Begin Side Navbar -->
                <nav class="side-navbar box-scroll sidebar-scroll">
                    <!-- Begin Main Navigation -->
                    <ul class="list-unstyled">
                        <li><a href="users.php"><i class="ti-user"></i><span>Employees</span></a></li>
                        <li><a href="jobs.php" class="active"><i class="ti-briefcase"></i><span>Jobs</span></a></li>
                        <li><a href="invoices.php"><i class="ti-archive"></i><span>Invoice</span></a></li>
                    </ul>
                    <!-- End Main Navigation -->
                </nav>
                <!-- End Side Navbar -->
            </div>
            <!-- End Left Sidebar -->
            <div class="content-inner">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-10">
                            <h4>Jobs</h4>
                        </div>

                        <div class="col-md-2">
                            <h4><a href="#" data-toggle="modal" data-target="#generateInvoiceModal"
                                   class="btn btn-gradient-01 pull-right m-l-20 waves-effect waves-light">Generate Invoice</a></h4>
                        </div>
                    </div>
                    <br />
                    <!-- Begin Row -->
                    <div class="row">
                        <!-- -->
                        <div class="col-xl-12">
                            <div id="handleErrorMessages">
                                <div class="row" align="center">
                                    <div class="col-md-10">
                                        <p>Sorry, something went wrong</p>
                                    </div>
                                    <div class="col-md-2">
                                        <p><button type="button" class="btn btn-danger btn-gradient-01 waves-effect waves-light"
                                                   id="retryBtn">Retry</button></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Export -->

                    <div class="row">
                        <div class="col-md-12">
                            <div class="w3-card-2 w3-white panel widget has-shadow">

                                <div class="widget-body sliding-tabs">
                                    <div class="tab-content pt-3">
                                        <div class="tab-pane fade show active" id="tab-1" role="tabpanel" aria-labelledby="base-tab-1">
                                            <!--Loader and notification messages-->
                                            <div class="loader" style="display: none;">
                                                <div align="center" style="margin-bottom:15px;" class="">
                                                    <div class="-spinner-ring -error-"></div>
                                                    <h5><span class="msgAlertPlaceHolder"></span></h5>
                                                </div>
                                            </div>

                                            <div align="center">
                                                <h5><span class="msgAlertPlaceHolder"></span></h5>
                                            </div>

                                            <div class="table-responsive">
                                                <table id="baseViewExportTable"
                                                       class="table mb-0 table-striped table-hover manage-u-table table-css">
                                                    <thead>
                                                        <tr>
                                                            <th style="width: 10%">Job ID</th>
                                                            <th style="width: 20%">Employee</th>
                                                            <th style="width: 10%">Project</th>
                                                            <th style="width: 20%">Date</th>
                                                            <th style="width: 10%">Start Time</th>
                                                            <th style="width: 10%">End Time</th>
                                                            <th style="width: 10%">Status</th>
                                                            <th width="100%">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody id="customerDataTable">
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <!-- End Row -->

                    <!-- End Container -->
                    <!-- Begin Page Footer-->
                    <footer class="main-footer fixed-footer">
                        <div class="row">
                            <div
                                class="col-xl-6 col-lg-6 col-md-6 col-sm-12 d-flex align-items-center justify-content-xl-start justify-content-lg-start justify-content-md-start justify-content-center">
                                <p class="text-gradient-02">Developed by <b>Godwin Opoku Duah</b></p>
                            </div>
                            <div
                                class="col-xl-6 col-lg-6 col-md-6 col-sm-12 d-flex align-items-center justify-content-xl-end justify-content-lg-end justify-content-md-end justify-content-center">

                            </div>
                        </div>
                    </footer>
                    <!-- End Page Footer -->
                    <a href="#" class="go-top"><i class="la la-arrow-up"></i></a>

                </div>
                <!-- End Content -->
            </div>

            <!-- /.modal to add users-->
            <div id="generateInvoiceModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                 aria-hidden="true" style="display: none;">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Generate Invoice <span id="feedbackUser"></span></h4>
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        </div>

                        <div class="modal-body">
                            <form id="addFeedbackForm">
                                <div class="form-group row d-flex align-items-center mb-5">

                                    <div class="col-md-12">
                                        <label class="form-control-label">Company / Project</label>
                                        <div class="form-group">
                                            <div class="input-group">
                                                <span class="input-group-addon">
                                                    <i class="ti-mobile"></i>
                                                </span>
                                                <input type="text" class="form-control" id="company" placeholder="Company or project name">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            <!--Loader and notification messages-->
                            <div class="modal_loader" style="display: none;">
                                <div align="center" style="margin-bottom:15px;" class="">
                                    <div class="-spinner-ring -error-"></div>
                                    <h5><span class="modalAlertPlaceHolder"></span></h5>
                                </div>
                            </div>

                            <div align="center">
                                <h5><span class="modalAlertPlaceHolder"></span></h5>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-danger btn-gradient-01 waves-effect waves-light"
                                    id="addFeedbackBtn">Generate</button>
                        </div>
                    </div>
                </div>
            </div>



            <!-- Delete Customers from main base -->
            <div id="deleteJobModal" class="modal modal-xl fade" tabindex="-1" role="dialog"
                 aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Delete Job</h4>
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        </div>

                        <div class="modal-body">
                            <form id="deleteCustomersForm">
                                <div class="form-group row d-flex align-items-center mb-5">
                                    <div class="col-md-12">
                                        <label class="form-control-label">Customer File (<span style="color:#E00021;">CSV format
                                                only</span>)</label>
                                        <div class="form-group">
                                            <input type="file" class="form-control" id="deleteCustomerCsv" accept=".csv" />
                                        </div>
                                    </div>
                                </div>
                            </form>

                            <!--Loader and notification messages-->
                            <div class="modal_loader" style="display: none;">
                                <div align="center" style="margin-bottom:15px;" class="">
                                    <div class="-spinner-ring -error-"></div>
                                    <h5><span class="modalAlertPlaceHolder"></span></h5>
                                </div>
                            </div>

                            <div align="center">
                                <h5><span class="modalAlertPlaceHolder"></span></h5>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-danger btn-gradient-01 waves-effect waves-light"
                                    id="deleteCustomersBtn">Delete Customers</button>
                        </div>
                    </div>
                </div>
            </div>


            <!-- /.modal to edit users-->
            <div id="editUserModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                 aria-hidden="true" style="display: none;">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Edit <span id="displayEditUserName"></span></h4>
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        </div>

                        <div class="modal-body">
                            <form id="editUserForm">
                                <div class="form-group row d-flex align-items-center mb-5">

                                    <div class="col-md-12">
                                        <label class="form-control-label">Role</label>
                                        <div class="form-group">
                                            <select class="custom-select-roletype form-control" id="editRoletype" name="editRoletype">
                                                <option value="">Select role</option>
                                                <option value="Super Admin">Super Admin</option>
                                                <option value="Manager">Manager</option>
                                                <option value="Agent">Agent</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            <!--Loader and notification messages-->
                            <div class="modal_loader" style="display: none;">
                                <div align="center" style="margin-bottom:15px;" class="">
                                    <div class="-spinner-ring -error-"></div>
                                    <h5><span class="modalAlertPlaceHolder"></span></h5>
                                </div>
                            </div>

                            <div align="center">
                                <h5><span class="modalAlertPlaceHolder"></span></h5>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default waves-effect" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-danger btn-gradient-01 waves-effect waves-light" id="editUserBtn">Edit
                                User</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <?php include("assets/php/script-footer.php"); ?>

        <script type="text/javascript">
            $(document).ready(function () {
                //Hide the error message div
                $('#handleErrorMessages').hide("fast");
                getStoredItem();
                getEmployeeJobs();

            });
        </script>

        <?php include("assets/php/footer.php"); ?>