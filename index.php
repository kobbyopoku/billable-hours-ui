<?php include("assets/php/header.php"); ?>
    <body class="bg-white">
    <!-- Begin Preloader -->
    <div id="preloader">
        <div class="canvas">
            <img src="assets/img/logo.png" alt="Billable Hours" class="loader-logo">
            <div class="spinner"></div>   
        </div>
    </div>
    <!-- End Preloader -->
    <!-- Begin Container -->
    <div class="container-fluid no-padding h-100">
        <div class="row flex-row h-100 bg-white">
            <!-- Begin Left Content -->
            <div class="col-xl-8 col-lg-6 col-md-5 no-padding">
                <div class="elisyam-bg background-01">
                    <div class="elisyam-overlay overlay-01"></div>
                    <div class="authentication-col-content mx-auto">
                        <h1 class="gradient-text-01">
                            Welcome To Billing Rate System
                        </h1>
                        <span class="description">
                            Employee Billing System
                        </span>
                    </div>
                </div>
            </div>
            <!-- End Left Content -->
            <!-- Begin Right Content -->
            <div class="col-xl-4 col-lg-6 col-md-7 my-auto no-padding">
                <!-- Begin Form -->
                <div class="authentication-form mx-auto">
                    <div class="logo-centered">
                        <a href="">
                            <img src="assets/img/logo.png" alt="ananse">
                        </a>
                    </div>
                    <h3>Sign in to the portal</h3>
                    <form id="loginForm">
                        <div class="group material-input">
						    <input type="text" id="username">
						    <span class="highlight"></span>
						    <span class="bar"></span>
						    <label>Username</label>
                        </div>
                        <div class="group material-input">
						    <input type="password" id="password">
						    <span class="highlight"></span>
						    <span class="bar"></span>
						    <label>Password</label>
                        </div>
                    </form>
                    <div class="row">
                        <div class="col text-left">
                            <!--<div class="styled-checkbox">-->
                                <!--<input type="checkbox" name="checkbox" id="remeber">-->
                                <!--<label for="remeber">Remember me</label>-->
                            <!--</div>-->
                        </div>
                        <!--<div class="col text-right">-->
                            <!--<a href="pages-forgot-password.html">Forgot Password ?</a>-->
                        <!--</div>-->
                    </div>
                    <div class="sign-btn text-center">
                        <a href="#" class="btn btn-lg btn-gradient-01" id="loginBtn">
                            Sign in
                        </a>
                    </div>

                    <!--<div class="register">-->
                        <!--Don't have an account? -->
                        <!--<br>-->
                        <!--<a href="pages-register.html">Request for an account</a>-->
                    <!--</div>-->
                </div>
                <!-- End Form -->  
          
                <!--Loader and notification messages-->
                <br/>
                <div class="loader" style="display: none;">
                    <div align="center" style="margin-bottom:15px;" class="">
                        <div class="-spinner-ring -error-"></div>
                        <h5><span class="msgAlertPlaceHolder"></span></h5>
                    </div>
                </div>

                <div align="center">
                    <h5><span class="msgAlertPlaceHolder"></span></h5>
                </div>                      
            </div>
            <!-- End Right Content -->

            
        </div>
        <!-- End Row -->
    </div>
    <!-- End Container -->    

<?php include("assets/php/script-footer.php"); ?>
<?php include("assets/php/footer.php"); ?>
