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
            <li><a href="jobs.php"><i class="ti-briefcase"></i><span>Jobs</span></a></li>
            <li><a href="invoices.php" class="active"><i class="ti-archive"></i><span>Invoice</span></a></li>
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
              <h4>Invoices</h4>
            </div>

            <div class="col-md-2">
              <h4><a href="#" id="viewPromoBtn"
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
                              <th style="width: 10%">Invoice ID</th>
                              <th style="width: 30%">Company</th>
                              <th style="width: 10%">Status</th>
                              <th style="width: 30%">Date</th>
                              <th style="width: 10%">Item Count</th>
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

      <!-- /.modal to show more details of the customer data-->


      <!-- End Page Content -->
      <div id="feedBackModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true" style="display: none;">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <!-- <h4 class="modal-title"><span id="displayAccountName"></span></h4>  -->
              <h4 class="modal-title">Recent Feedback</span></h4>
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div class="modal-body">

              <div class="row">
                <div class="col-md-4">
                  <p>Agent:</p>
                </div>
                <div class="col-md-8">
                  <label>
                    <p id="showFeedbackAgentName"></p>
                  </label>
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <p>Customer:</p>
                </div>
                <div class="col-md-8">
                  <label>
                    <p id="showCustomerAccountNo"></p>
                  </label>
                </div>
              </div>


              <div class="row">
                <div class="col-md-12">
                  <div class="table-responsive">
                    <table class="table mb-0 table-striped table-hover manage-u-table table-css">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Contact</th>
                          <th>Feedback</th>
                          <th>Reason Locked</th>
                          <th>Comment</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody id="feedbackTableData">
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger btn-gradient-01 waves-effect waves-light"
                data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>


      <!-- More customer details modal -->
      <div id="editBaseViewModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true" style="display: none;">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit <span id="displayAccountName"></span></h4>
              <!-- <h4 class="modal-title">Profile</span></h4>  -->
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-4">
                  <p>Account No.:</p>
                </div>
                <div class="col-md-8">
                  <label>
                    <p id="showAccountNo"></p>
                  </label>
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <p>Account Name:</p>
                </div>
                <div class="col-md-8">
                  <label>
                    <p id="showAccountName"></p>
                  </label>
                </div>
              </div>


              <form id="editBaseViewForm">
                <div class="form-group row d-flex align-items-center mb-5">

                  <div class="col-md-12">
                    <label class="form-control-label">Contact Number</label>
                    <div class="form-group">
                      <div class="input-group">
                        <span class="input-group-addon">
                          <i class="ti-mobile"></i>
                        </span>
                        <input type="text" class="form-control" id="editCustomerContact"
                          placeholder="Enter the contact number">
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
                id="editBaseViewBtn">Edit Info</button>
            </div>
          </div>
        </div>
      </div>


      <!-- View promo modal -->
      <div id="viewPromotionModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true" style="display: none;">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <!-- <h4 class="modal-title"><span id="displayAccountName"></span></h4>  -->
              <h4 class="modal-title">Promotions</span></h4>
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div class="modal-body">
              <div class="table-responsive">
                <table id="promotionTable" class="table mb-0 table-striped table-hover manage-u-table table-css">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                    </tr>
                  </thead>
                  <tbody id="promotionData">

                  </tbody>
                </table>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger btn-gradient-01 waves-effect waves-light"
                data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      <!-- More customer details modal -->
      <div id="moreDetailsCustomerData" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true" style="display: none;">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <!-- <h4 class="modal-title"><span id="displayAccountName"></span></h4>  -->
              <h4 class="modal-title">Profile</span></h4>
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-4">
                  <p>Account No.:</p>
                </div>
                <div class="col-md-8">
                  <label>
                    <p id="showAccountNumber"></p>
                  </label>
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <p>Account Name:</p>
                </div>
                <div class="col-md-8">
                  <label>
                    <p id="showAccountFullName"></p>
                  </label>
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <p>Fixed Line Number:</p>
                </div>
                <div class="col-md-8">
                  <label>
                    <p id="showFixedLine"></p>
                  </label>
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <p>Package:</p>
                </div>
                <div class="col-md-8">
                  <label>
                    <p id="showPackage"></p>
                  </label>
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <p>Status:</p>
                </div>
                <div class="col-md-8">
                  <label>
                    <p id="showStatus"></p>
                  </label>
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <p>Last Payment Date:</p>
                </div>
                <div class="col-md-8">
                  <label>
                    <p id="showLastPaymentDate"></p>
                  </label>
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <p>Expiry Date:</p>
                </div>
                <div class="col-md-8">
                  <label>
                    <p id="showExpiryDate"></p>
                  </label>
                </div>
              </div>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger btn-gradient-01 waves-effect waves-light"
                data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>


      <!-- /.modal to add users-->
      <div id="addFeedbackViewModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true" style="display: none;">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Add Feedback for <span id="feedbackUser"></span></h4>
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>

            <div class="modal-body">
              <form id="addFeedbackForm">
                <div class="form-group row d-flex align-items-center mb-5">

                  <div class="col-md-12">
                    <label class="form-control-label">Contact Number</label>
                    <div class="form-group">
                      <div class="input-group">
                        <span class="input-group-addon">
                          <i class="ti-mobile"></i>
                        </span>
                        <input type="text" class="form-control" id="addcontactno" placeholder="Contact Number">
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <label class="form-control-label">FeedBack on Calls</label>
                    <div class="form-group">
                      <select class="custom-select-roletype form-control" id="addFeedbackType" name="addFeedbackType"
                        onchange="getReasonLocked(this)">
                        <option value="">Select Feedback</option>

                      </select>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <label class="form-control-label">Reason Locked</label>
                    <div class="form-group">
                      <select class="custom-select-roletype form-control" id="addReasonLocked" name="addReasonLocked">
                        <option value="">Select Reason Locked</option>


                      </select>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <label class="form-control-label">Comment</label>
                    <div class="form-group">
                      <textarea id="addComment" class="form-control" placeholder="Add comment"></textarea>
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
                id="addFeedbackBtn">Add Feedback</button>
            </div>
          </div>
        </div>
      </div>



    </div>



    <?php include("assets/php/script-footer.php"); ?>

    <script type="text/javascript">
    $(document).ready(function() {
      //Hide the error message div
      $('#handleErrorMessages').hide("fast");
      getStoredItem();
      getCustomerData();

    });
    </script>

    <?php include("assets/php/footer.php"); ?>