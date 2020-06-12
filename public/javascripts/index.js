$(window).ready(function() {
  var scrolling = false;

  var current = 1;

  $(".contactFormContainer").submit(function(e) {
    e.preventDefault();

    var name = $("#formName").val().trim();
    var email = $("#formEmail").val().trim();
    var message = $("#formMessage").val().trim();

    // regexp
    var testEmail = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-z]{2,4}$/);

    if (name != "" && testEmail.test(email) && message != "") {
      $("#responseMessage").text("");
      $("#formName").prop("disabled", true);
      $("#formEmail").prop("disabled", true);
      $("#formMessage").prop("disabled", true);
      $(".contactSubmit").prop("disabled", true);
      $.post('/message',
      {
        name,
        email,
        message
      },
      function(data, status) {
        if(data.message == "success")
        {
          $("#responseMessage").text("Thanks for reaching out! I'll get back to you as soon as I can.");
        }
        else
        {
          $("#formName").prop("disabled", false);
          $("#formEmail").prop("disabled", false);
          $("#formMessage").prop("disabled", false);
          $(".contactSubmit").prop("disabled", false);
          $("#responseMessage").text("There was an error, please try again later or contact me directly at spanosc1@tcnj.edu.");
        }
      });
    }
    else
    {
      $("#responseMessage").text("Please fill out all fields and enter a valid email address.");
    }

  });

  setTimeout(function() {
    $(".landingTitle").addClass("landingTitleAnimated");
    transform1();
  });

  setTimeout(function() {
    $(".landingSub").addClass("landingSubAnimated");
  }, 500);

  document.addEventListener('touchstart', handleTouchStart, false);        
  document.addEventListener('touchmove', handleTouchMove, false);

  var xDown = null;                                                        
  var yDown = null;

  function getTouches(evt) {
    return evt.touches ||             // browser API
          evt.originalEvent.touches; // jQuery
  }                                                     

  function handleTouchStart(evt) {
      const firstTouch = getTouches(evt)[0];                                      
      xDown = firstTouch.clientX;                                      
      yDown = firstTouch.clientY;                                      
  };                                                

  function handleTouchMove(evt) {
      if ( ! xDown || ! yDown ) {
          return;
      }

      var xUp = evt.touches[0].clientX;                                    
      var yUp = evt.touches[0].clientY;

      var xDiff = xDown - xUp;
      var yDiff = yDown - yUp;

      console.log(yDiff);

      if ( yDiff > 20 ) {
          /* up swipe */ 
        scrollDown();
      } else if( yDiff < -20 ) { 
          /* down swipe */
        scrollUp();
      }
      /* reset values */
      xDown = null;
      yDown = null;                                             
  };

  window.addEventListener("wheel", event => {
    if(!scrolling)
    {
      //going down
      if(event.deltaY > 4)
      {
        scrollDown();
      }
      //going up
      else if(event.deltaY < -4)
      {
        scrollUp();
      }
    }
  });

  function scrollDown() {
    scrolling = true;
    switch (current) {
      case 1: //from first
        current = 2;
        transform2();
        hideSection1Up();
        showSection2Up();
        break;
      case 2: //from second
        current = 3;
        transform3();
        hideSection2Up();
        showSection3Up();
        break;
      case 3: //from third
        current = 4;
        transform4();
        hideSection3Up();
        showSection4Up();
        break;
      default:
        break;
    }
    setTimeout(function() {
      scrolling = false;
    }, 1500);
  }

  function scrollUp() {
    scrolling = true;
    switch (current) {
      case 2: //from first
        current = 1;
        transform1();
        hideSection2Down();
        showSection1Up();
        break;
      case 3: //from third
        current = 2;
        transform2();
        hideSection3Down();
        showSection2Down();
        break;
      case 4: //from fourth
        current = 3;
        transform3();
        hideSection4Down();
        showSection3Down();
        break;
      default:
        break;
    }
    setTimeout(function() {
      scrolling = false;
    }, 1500);
  }

  setInterval(function() {
    $(".scrollText").removeClass("scrollTextInvis");
    animateArrows();
  }, 2000);

  // setTimeout(function() {
  //   transform2();
  // }, 2000);

  function animateArrows() {
    $("#scroll1").removeClass("scrollIconInvis");
    $("#scroll4").addClass("scrollIconInvis");
    
    setTimeout(function() {
      $("#scroll2").removeClass("scrollIconInvis");
    }, 100);

    setTimeout(function() {
      $("#scroll1").addClass("scrollIconInvis");
    }, 200);

    setTimeout(function() {
      $("#scroll3").removeClass("scrollIconInvis");
    }, 300);

    setTimeout(function() {
      $("#scroll2").addClass("scrollIconInvis");
    }, 400);

    setTimeout(function() {
      $("#scroll4").removeClass("scrollIconInvis");
    }, 500);

    setTimeout(function() {
      $("#scroll3").addClass("scrollIconInvis");
    }, 600);
  }

  function transform1() {
    $(".transforming").removeClass("transforming2");
    $(".transforming").addClass("transformingFull");
    setTimeout(function() {
      showSection1Up();
      $(".transforming").addClass("transforming1");
    }, 300);
  }

  function transform2() {
    $(".transforming").removeClass("transforming1");
    $(".transforming").removeClass("transforming3");
    $(".transforming").addClass("transformingFull");
    setTimeout(function() {
      $(".transforming").addClass("transforming2");
    }, 300);
  }

  function transform3() {
    $(".transforming").removeClass("transforming2");
    $(".transforming").removeClass("transforming4");
    $(".transforming").addClass("transformingFull");
    setTimeout(function() {
      $(".transforming").addClass("transforming3");
    }, 300);
  }

  function transform4() {
    $(".transforming").removeClass("transforming3");
    $(".transforming").addClass("transformingFull");
    setTimeout(function() {
      $(".transforming").addClass("transforming4");
    }, 300);
  }

  function hideSection1Up() {
    $(".section1").addClass("section1Up");
    $(".aboutContent").css("display", "flex");
    setTimeout(function() {
      $(".landingContent").css("display", "none");
    }, 600);
  }

  function hideSection2Up() {
    $(".section2").addClass("section2Up");
    $(".portfolioContent").css("display", "flex");
    setTimeout(function() {
      $(".aboutContent").css("display", "none");
    }, 600);
  }

  function showSection1Up() {
    setTimeout(function() {
      $(".section1").removeClass("section1Up");
    }, 300);
  }

  function showSection2Up() {
    setTimeout(function() {
      $(".section2:eq(0)").removeClass("section2Down");
    }, 300);
    setTimeout(function() {
      $(".section2:eq(1)").removeClass("section2Down");
    }, 350);
    setTimeout(function() {
      $(".section2:eq(2)").removeClass("section2Down");
    }, 400);
    setTimeout(function() {
      $(".section2:eq(3)").removeClass("section2Down");
    }, 450);
    setTimeout(function() {
      $(".section2:eq(4)").removeClass("section2Down");
    }, 500);
    setTimeout(function() {
      $(".section2:eq(5)").removeClass("section2Down");
    }, 550);
    setTimeout(function() {
      $(".section2:eq(6)").removeClass("section2Down");
    }, 600);
    setTimeout(function() {
      $(".section2:eq(7)").removeClass("section2Down");
    }, 650);
    setTimeout(function() {
      $(".section2:eq(8)").removeClass("section2Down");
    }, 700);
    setTimeout(function() {
      $(".section2:eq(9)").removeClass("section2Down");
    }, 750);
    setTimeout(function() {
      $(".section2:eq(10)").removeClass("section2Down");
    }, 800);
    setTimeout(function() {
      $(".section2:eq(11)").removeClass("section2Down");
    }, 850);
    setTimeout(function() {
      $(".section2:eq(12)").removeClass("section2Down");
    }, 900);
    setTimeout(function() {
      $(".section2:eq(13)").removeClass("section2Down");
    }, 950);
    setTimeout(function() {
      $(".section2:eq(14)").removeClass("section2Down");
    }, 1000);
  }

  function showSection2Down() {
    setTimeout(function() {
      $(".section2:eq(14)").removeClass("section2Up");
    }, 250);
    setTimeout(function() {
      $(".section2:eq(13)").removeClass("section2Up");
    }, 300);
    setTimeout(function() {
      $(".section2:eq(12)").removeClass("section2Up");
    }, 350);
    setTimeout(function() {
      $(".section2:eq(11)").removeClass("section2Up");
    }, 400);
    setTimeout(function() {
      $(".section2:eq(10)").removeClass("section2Up");
    }, 450);
    setTimeout(function() {
      $(".section2:eq(9)").removeClass("section2Up");
    }, 500);
    setTimeout(function() {
      $(".section2:eq(8)").removeClass("section2Up");
    }, 550);
    setTimeout(function() {
      $(".section2:eq(7)").removeClass("section2Up");
    }, 600);
    setTimeout(function() {
      $(".section2:eq(6)").removeClass("section2Up");
    }, 650);
    setTimeout(function() {
      $(".section2:eq(5)").removeClass("section2Up");
    }, 700);
    setTimeout(function() {
      $(".section2:eq(4)").removeClass("section2Up");
    }, 750);
    setTimeout(function() {
      $(".section2:eq(3)").removeClass("section2Up");
    }, 450);
    setTimeout(function() {
      $(".section2:eq(2)").removeClass("section2Up");
    }, 500);
    setTimeout(function() {
      $(".section2:eq(1)").removeClass("section2Up");
    }, 550);
    setTimeout(function() {
      $(".section2:eq(0)").removeClass("section2Up");
    }, 600);
  }

  function hideSection2Down() {
    $(".section2").addClass("section2Down");
    $(".landingContent").css("display", "flex");
    setTimeout(function() {
      $(".aboutContent").css("display", "none");
    }, 600);
  };

  function showSection3Up() {
    setTimeout(function() {
      $(".section3:eq(0)").removeClass("section3Down");
    }, 300);
    setTimeout(function() {
      $(".section3:eq(1)").removeClass("section3Down");
    }, 400);
    setTimeout(function() {
      $(".section3:eq(4)").removeClass("section3Down");
    }, 500);
    setTimeout(function() {
      $(".section3:eq(2)").removeClass("section3Down");
    }, 600);
    setTimeout(function() {
      $(".section3:eq(5)").removeClass("section3Down");
    }, 700);
    setTimeout(function() {
      $(".section3:eq(3)").removeClass("section3Down");
    }, 800);
    setTimeout(function() {
      $(".section3:eq(6)").removeClass("section3Down");
    }, 900);
  }

  function showSection3Down() {
    setTimeout(function() {
      $(".section3:eq(0)").removeClass("section3Up");
    }, 300);
    setTimeout(function() {
      $(".section3:eq(1)").removeClass("section3Up");
    }, 400);
    setTimeout(function() {
      $(".section3:eq(4)").removeClass("section3Up");
    }, 500);
    setTimeout(function() {
      $(".section3:eq(2)").removeClass("section3Up");
    }, 600);
    setTimeout(function() {
      $(".section3:eq(5)").removeClass("section3Up");
    }, 700);
    setTimeout(function() {
      $(".section3:eq(3)").removeClass("section3Up");
    }, 800);
    setTimeout(function() {
      $(".section3:eq(6)").removeClass("section3Up");
    }, 900);
  }

  function hideSection3Down() {
    $(".section3").addClass("section3Down");
    $(".aboutContent").css("display", "flex");
    setTimeout(function() {
      $(".portfolioContent").css("display", "none");    
    }, 600);
  };

  function hideSection3Up() {
    $(".section3").addClass("section3Up");
    $(".contactContent").css("display", "flex");
    setTimeout(function() {
      $(".portfolioContent").css("display", "none"); //change to contact section
    }, 600);
  };

  function showSection4Up() {
    setTimeout(function() {
      $(".section4:eq(0)").removeClass("section4Down");
    }, 300);
    setTimeout(function() {
      $(".section4:eq(1)").removeClass("section4Down");
    }, 400);
    setTimeout(function() {
      $(".section4:eq(2)").removeClass("section4Down");
    }, 500);
    setTimeout(function() {
      $(".section4:eq(3)").removeClass("section4Down");
    }, 600);
    setTimeout(function() {
      $(".section4:eq(4)").removeClass("section4Down");
    }, 700);
    setTimeout(function() {
      $(".section4:eq(5)").removeClass("section4Down");
    }, 800);
  }

  function hideSection4Down() {
    $(".section4").addClass("section4Down");
    $(".portfolioContent").css("display", "flex");
    setTimeout(function() {
      $(".contactContent").css("display", "none");    
    }, 600);
  };
});