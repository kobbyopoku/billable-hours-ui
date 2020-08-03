<?php  ?>

<header class="header">
  <nav class="navbar fixed-top">
    <!-- Begin Search Box-->
    <div class="search-box">
      <button class="dismiss"><i class="ion-close-round"></i></button>
      <form id="searchForm" action="#" role="search">
        <input type="search" placeholder="Search something ..." class="form-control">
      </form>
    </div>
    <!-- End Search Box-->
    <!-- Begin Topbar -->
    <div class="navbar-holder d-flex align-items-center align-middle justify-content-between">
      <!-- Begin Logo -->
      <div class="navbar-header">
        <a href="" class="navbar-brand">
          <div class="brand-image brand-big">
            <img src="assets/img/logo-big-2.png" alt="logo" class="logo-big">
          </div>
          <div class="brand-image brand-small">
            <img src="assets/img/logo.png" alt="logo" class="logo-small">
          </div>
        </a>
        <!-- Toggle Button -->
        <a id="toggle-btn" href="#" class="menu-btn active">
          <span></span>
          <span></span>
          <span></span>
        </a>
        <!-- End Toggle -->
      </div>
      <!-- End Logo -->
      <!-- Begin Navbar Menu -->
      <ul class="nav-menu list-unstyled d-flex flex-md-row align-items-md-center pull-right">
        <h6 class="page-header-title"><span id="showUsername"></span></h6>
        <!-- Search -->
        <!-- End Search -->
        <!-- Begin Notifications -->

        <!-- End Notifications -->
        <!-- User -->
        <li class="nav-item dropdown"><a id="user" rel="nofollow" data-target="#" href="#" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false" class="nav-link"><img src="assets/img/avatar/avatar-01.jpg"
              alt="..." class="avatar rounded-circle"></a>
          <ul aria-labelledby="user" class="user-size dropdown-menu">
            <li class="welcome">
              <!--   <a href="#" class="edit-profil"><i class="la la-gear"></i></a> -->
              <img src="assets/img/avatar/avatar-01.jpg" alt="..." class="rounded-circle">
            </li>
            <!-- <li>
                            <a href="#" class="dropdown-item"> 
                                Profile
                            </a>
                        </li>
                        <li class="separator"></li>
                        <li>
                            <a href="#" class="dropdown-item no-padding-bottom"> 
                                Settings
                            </a>
                        </li> -->
            <li class="separator"></li>

            <li>
              <a href="#" id="logoutBtn" class="dropdown-item no-padding-top">
                Log Out
              </a>
            </li>
          </ul>
        </li>
        <!-- End User -->
        <!-- Begin Quick Actions -->
        <!-- End Quick Actions -->
      </ul>
      <!-- End Navbar Menu -->
    </div>
    <!-- End Topbar -->
  </nav>
</header>