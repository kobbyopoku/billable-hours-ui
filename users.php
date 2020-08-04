<?php include("assets/php/header.php"); ?>

<body id="page-top">
  <!-- Begin Preloader -->
  <div id="preloader">
    <div class="canvas">
      <img src="assets/img/logo.png" alt="Ananse - vodafone ghana" class="loader-logo">
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
            <li><a href="users.php" class="active"><i class="ti-user"></i><span>Employees</span></a></li>
            <li><a href="jobs.php"><i class="ti-briefcase"></i><span>Jobs</span></a></li>
            <li><a href="invoices.php"><i class="ti-archive"></i><span>Invoice</span></a></li>
          </ul>
          <!-- End Main Navigation -->
        </nav>
        <!-- End Side Navbar -->
      </div>
      <!-- End Left Sidebar -->
      <div class="content-inner">
        <div class="container-fluid">
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

              <!-- Export -->
              <div class="w3-card-2 w3-white panel widget has-shadow">
                <div class="widget-header bordered no-actions">
                  <div class="row">
                    <div class="col-md-8">
                      <h4>All Employees</h4>
                    </div>
                    <div class="col-md-2">
                      <h4><a href="#" id="manageCustomersBtn"
                          class="btn btn-danger outline-btn pull-right m-l-20 waves-effect waves-light">Record Jobs</a>
                      </h4>
                    </div>
                    <div class="col-md-2">
                      <h4><a href="#" data-toggle="modal" data-target="#addUserModal"
                          class="btn btn-danger btn-gradient-01 pull-right m-l-20 waves-effect waves-light">Add User</a>
                      </h4>
                    </div>
                  </div>

                </div>
                <div class="widget-body">
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
                    <table id="adminUsersTable" class="table mb-0 table-striped table-hover manage-u-table table-css">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>First name</th>
                          <th>Last name</th>
                          <th>Role</th>
                          <th>Email Address</th>
                          <th>Grade</th>
                          <th>Rate</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody id="adminUserData">

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <!-- End Export -->
            </div>

          </div>
          <!-- End Row -->
        </div>
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
        <!-- Offcanvas Sidebar -->

        <!-- End Offcanvas Sidebar -->
      </div>
      <!-- End Content -->
    </div>

    <!-- End Page Content -->

    <!-- MODALS HERE -->
    <!-- /.modal to add users-->
    <div id="addUserModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
      aria-hidden="true" style="display: none;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Add User</h4>
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          </div>

          <div class="modal-body">
            <form id="addUserForm">
              <div class="form-group row d-flex align-items-center mb-5">
                <div class="col-md-12">
                  <label class="form-control-label">First Name</label>
                  <div class="form-group">
                    <div class="input-group">
                      <span class="input-group-addon">
                        <i class="ti-user"></i>
                      </span>
                      <input type="text" class="form-control" id="addFirstName" placeholder="First Name">
                    </div>
                  </div>
                </div>

                <div class="col-md-12">
                  <label class="form-control-label">Last Name</label>
                  <div class="form-group">
                    <div class="input-group">
                      <span class="input-group-addon">
                        <i class="ti-user"></i>
                      </span>
                      <input type="text" class="form-control" id="addLastName" placeholder="Last Name">
                    </div>
                  </div>
                </div>

                <div class="col-md-12">
                  <label class="form-control-label">E-mail Address</label>
                  <div class="form-group">
                    <div class="input-group">
                      <span class="input-group-addon">
                        <i class="ti-email"></i>
                      </span>
                      <input type="email" class="form-control" id="addEmailAddress" placeholder="E-mail Address">
                    </div>
                  </div>
                </div>

                <div class="col-md-12">
                  <label class="form-control-label">Grade</label>
                  <div class="form-group">
                    <div class="input-group">
                      <span class="input-group-addon">
                        <i class="ti-shield"></i>
                      </span>
                      <input type="email" class="form-control" id="addGrade" placeholder="Grade">
                    </div>
                  </div>
                </div>

                <div class="col-md-12">
                  <label class="form-control-label">Rate</label>
                  <div class="form-group">
                    <div class="input-group">
                      <span class="input-group-addon">
                        <i class="ti-money"></i>
                      </span>
                      <input type="email" class="form-control" id="addRate" placeholder="Rate">
                    </div>
                  </div>
                </div>

                <div class="col-md-12">
                  <label class="form-control-label">Role</label>
                  <div class="form-group">
                    <select class="custom-select-roletype form-control" id="addRoletype" name="addRoletype">
                      <option value="">Select role</option>
                      <option value="LAWYER">LAWYER</option>
                      <option value="FINANCE">FINANCE</option>
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
            <button type="button" class="btn btn-danger btn-gradient-01 waves-effect waves-light" id="addUserBtn">Add
              User</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Show more details of user -->
    <div id="moreDetailsAdminUserData" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
      aria-hidden="true" style="display: none;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Profile</h4>
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-4">
                <p>Full Name:</p>
              </div>
              <div class="col-md-8">
                <label>
                  <p id="showAdminFullname"></p>
                </label>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                <p>Username:</p>
              </div>
              <div class="col-md-8">
                <label>
                  <p id="showAdminUsername"></p>
                </label>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                <p>Role:</p>
              </div>
              <div class="col-md-8">
                <label>
                  <p id="showAdminRole"></p>
                </label>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                <p>Status:</p>
              </div>
              <div class="col-md-8">
                <label>
                  <p id="showAdminStatus"></p>
                </label>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                <p>Created By:</p>
              </div>
              <div class="col-md-8">
                <label>
                  <p id="showAdminCreatedBy"></p>
                </label>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                <p>Created Date:</p>
              </div>
              <div class="col-md-8">
                <label>
                  <p id="showAdminCreatedDate"></p>
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


    <!-- Assign Customers to agents modal-->
    <div id="assignCustomersModal" class="modal modal-xl fade" tabindex="-1" role="dialog"
      aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Record Employee Project</h4>
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          </div>

          <div class="modal-body">
            <form id="assignCustomersForm">
              <div class="form-group row d-flex align-items-center mb-5">

                <div class="col-md-12">
                  <label class="form-control-label">Agent</label>
                  <div class="form-group">
                    <select class="custom-select-agentType form-control" id="selectAgentType" name="selectAgentType"
                      data-live-search="true">
                      <option value="">Select Employee</option>
                    </select>
                  </div>
                </div>

                <div class="col-md-12">
                  <label class="form-control-label">Company / Project</label>
                  <div class="form-group">
                    <div class="input-group">
                      <span class="input-group-addon">
                        <i class="ti-id-badge"></i>
                      </span>
                      <input type="text" class="form-control" id="projectName" placeholder="Enter the project name">
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <label class="form-control-label">Date of project</label>
                  <div class="form-group">
                    <div class="input-group">
                      <input type="date" class="form-control" id="projectDate">
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <label class="form-control-label">Start Time</label>
                  <div class="form-group">
                    <div class="input-group">
                      <input type="time" class="form-control" id="startTime">
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <label class="form-control-label">End Time</label>
                  <div class="form-group">
                    <div class="input-group">
                      <input type="time" class="form-control" id="endTime">
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
              id="assignCustomersBtn">Assign Customers</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Customers from main base -->
    <div id="deleteCustomersModal" class="modal modal-xl fade" tabindex="-1" role="dialog"
      aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Delete Customers</h4>
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
  $(document).ready(function() {
    //Hide the error message div
    $('#handleErrorMessages').hide("fast");
    getStoredItem();
    getEmployeeUsersData();

    // Append these data
    appendAgents();
  });


  // FOR CSV UPLOAD

  function uploadDealcsv() {};

  /*------ Method to read uploded csv file ------*/
  uploadDealcsv.prototype.getCsv = function(e) {

    let input = document.getElementById('dealCsv');
    input.addEventListener('change', function() {

      if (this.files && this.files[0]) {

        var myFile = this.files[0];
        var reader = new FileReader();

        reader.addEventListener('load', function(e) {

          let csvdata = e.target.result;
          parseCsv.getParsecsvdata(csvdata); // calling function for parse csv data 
        });

        reader.readAsBinaryString(myFile);
      }
    });
  }

  var parsedata = [];

  /*------- Method to parse csv data and display --------------*/
  uploadDealcsv.prototype.getParsecsvdata = function(data) {

    let newLinebrk = data.split("\n");
    for (let i = 0; i < newLinebrk.length; i++) {

      // remove the line break characters
      parsedata.push(newLinebrk[i].replace(/(\r\n|\n|\r)/gm, ""));
    }
  }

  // File uploaders 
  var parseCsv = new uploadDealcsv();

  // initiate the file uploader
  parseCsv.getCsv();


  // FOR CSV UPLOAD for tag customers

  function uploadTagCustomerscsv() {};

  /*------ Method to read uploded csv file ------*/
  uploadTagCustomerscsv.prototype.getTagCustomersCsv = function(e) {

    let input = document.getElementById('tagCustomerCsv');
    input.addEventListener('change', function() {

      if (this.files && this.files[0]) {

        var myFile = this.files[0];
        var reader = new FileReader();

        reader.addEventListener('load', function(e) {

          let csvdata = e.target.result;
          tagCustomersParseCsv.getTagCustomersParsecsvdata(csvdata); // calling function for parse csv data 
        });

        reader.readAsBinaryString(myFile);
      }
    });
  }

  var tagCustomersParsedata = [];

  /*------- Method to parse csv data and display --------------*/
  uploadTagCustomerscsv.prototype.getTagCustomersParsecsvdata = function(data) {

    let newLinebrk = data.split("\n");
    for (let i = 0; i < newLinebrk.length; i++) {

      // remove the line break characters
      tagCustomersParsedata.push(newLinebrk[i].replace(/(\r\n|\n|\r)/gm, ""));
    }
  }

  var tagCustomersParseCsv = new uploadTagCustomerscsv();
  // initiate the file uploader
  tagCustomersParseCsv.getTagCustomersCsv();



  // FOR CSV UPLOAD for untag customers
  function uploadUntagCustomerscsv() {};

  /*------ Method to read uploded csv file ------*/
  uploadUntagCustomerscsv.prototype.getUntagCustomersCsv = function(e) {

    let input = document.getElementById('untagCustomerCsv');
    input.addEventListener('change', function() {

      if (this.files && this.files[0]) {

        var myFile = this.files[0];
        var reader = new FileReader();

        reader.addEventListener('load', function(e) {

          let csvdata = e.target.result;
          untagCustomersParseCsv.getUntagParsecsvdata(csvdata); // calling function for parse csv data 
        });

        reader.readAsBinaryString(myFile);
      }
    });
  }

  var untagCustomersParsedata = [];

  /*------- Method to parse csv data and display --------------*/
  uploadUntagCustomerscsv.prototype.getUntagParsecsvdata = function(data) {

    let newLinebrk = data.split("\n");
    for (let i = 0; i < newLinebrk.length; i++) {

      // remove the line break characters
      untagCustomersParsedata.push(newLinebrk[i].replace(/(\r\n|\n|\r)/gm, ""));
    }
  }

  var untagCustomersParseCsv = new uploadUntagCustomerscsv();
  // Initiate file uplader
  untagCustomersParseCsv.getUntagCustomersCsv();


  // FOR CSV UPLOAD for delete customers
  function uploadDeleteCustomerscsv() {};

  /*------ Method to read uploded csv file ------*/
  uploadDeleteCustomerscsv.prototype.getDeleteCustomersCsv = function(e) {

    let input = document.getElementById('deleteCustomerCsv');
    input.addEventListener('change', function() {

      if (this.files && this.files[0]) {

        var myFile = this.files[0];
        var reader = new FileReader();

        reader.addEventListener('load', function(e) {

          let csvdata = e.target.result;
          deleteCustomersParseCsv.getDeleteParsecsvdata(csvdata); // calling function for parse csv data 
        });

        reader.readAsBinaryString(myFile);
      }
    });
  }

  var deleteCustomersParsedata = [];

  /*------- Method to parse csv data and display --------------*/
  uploadDeleteCustomerscsv.prototype.getDeleteParsecsvdata = function(data) {

    let newLinebrk = data.split("\n");
    for (let i = 0; i < newLinebrk.length; i++) {

      // remove the line break characters
      deleteCustomersParsedata.push(newLinebrk[i].replace(/(\r\n|\n|\r)/gm, ""));
    }
  }

  var deleteCustomersParseCsv = new uploadDeleteCustomerscsv();
  // Initiate file uplader
  deleteCustomersParseCsv.getDeleteCustomersCsv();
  </script>

  <?php include("assets/php/footer.php"); ?>