window.onload = function() {
  var nav_offset_top = $("header").height() + 50;

  function navbarFixed() {
    if ($(".header_area").length) {
      $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll >= nav_offset_top) {
          $(".header_area").addClass("navbar_fixed");
        } else {
          $(".header_area").removeClass("navbar_fixed");
        }
        return true;
      });
    }
  }
  navbarFixed();

  skrollr.init({
    forceHeight: false
  });

  if ($(".testimonial").length) {
    $(".testimonial").owlCarousel({
      loop: true,
      margin: 30,
      items: 5,
      nav: false,
      dots: true,
      responsiveClass: true,
      slideSpeed: 300,
      paginationSpeed: 500,
      responsive: {
        0: {
          items: 1
        }
      }
    });
  }
  if (!localStorage.owners) {
    $.ajax(
      "https://api.github.com/orgs/holostellar/members?role=all&filter=all"
    )
      .done(function(data) {
        const owners = [];
        data.forEach(x => {
          $.ajax(x.url).done(function(user) {
            owners.push(user);
            document.getElementById("team").innerHTML += `
            <div class="col-md-6 col-lg-4">
                <div class="team-card">
                <img class="card-img rounded-0" src="${user.avatar_url}" alt="">
                <div class="team-card-overlay">
                    <div class="media">
                    <div class="media-body">
                        <h4><a href="${user.html_url}">${user.name}</a></h4>
                        <blockquote>${user.bio ||
                          "Co-owner of HoloStellar"}</blockquote>
                    </div>
                    </div>
                </div>
                </div>
            </div>`;
            localStorage.owners = JSON.stringify(owners);
          });
        });
        $("#loader").fadeOut();
      })
      .catch(err => {
        $("#loader").fadeOut();
        document.getElementById("team").style.display = "none";
      });
  } else {
    JSON.parse(localStorage.owners).forEach(function(user) {
      document.getElementById("team").innerHTML += `
      <div class="col-md-6 col-lg-4">
          <div class="team-card">
          <img class="card-img rounded-0" src="${user.avatar_url}" alt="">
          <div class="team-card-overlay">
              <div class="media">
              <div class="media-body">
                  <h4><a href="${user.html_url}">${user.name}</a></h4>
                  <blockquote>${user.bio ||
                    "Co-owner of HoloStellar"}</blockquote>
              </div>
              </div>
          </div>
          </div>
      </div>`;
    });
    $("#loader").fadeOut();
  }
};
