//Open the side bar menu
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  //Close the sidebar menu
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }

  //show offensive plays, hide all the others
  function ShowOffense(){
      $("#HomePage").hide();
      $("#DefensivePlays").hide();
      $("#SpecialPlays").hide();
      $("#OffensivePlays").show();
      //close the sidebar menu
      closeNav();
  }

  //show defensive plays, hide all the others
  function ShowDefense(){
      $("#HomePage").hide();
      $("#DefensivePlays").show();
      $("#SpecialPlays").hide();
      $("#OffensivePlays").hide();
      //close the sidebar menu
      closeNav();
  }

  //show special plays, hide all the others
  function ShowSpecial(){
      $("#HomePage").hide();
      $("#DefensivePlays").hide();
      $("#SpecialPlays").show();
      $("#OffensivePlays").hide();
      //close the sidebar menu
      closeNav();
  }

  //hide all plays and show home screen
  function ShowHome(){
      $("#HomePage").show();
      $("#DefensivePlays").hide();
      $("#SpecialPlays").hide();
      $("#OffensivePlays").hide();
      //close the sidebar menu
      closeNav();
  }



// push a play to history localStorage after it is selected.
  function pushHistory(playName, imageURL){
    //prepend the play html to the history div
    $("#history").prepend("<h4><a href='play.html?imageurl=" + encodeURIComponent(imageURL) + "&playname=" + playName + "'> " + playName + "</a></h4><img style='width:250px' src='"+ decodeURIComponent(imageURL) +"'/>");
    //set the history div in localStorage
    localStorage.setItem("history", $("#history").html());
    var href="play.html?playname=%playname%&imageurl=%imageurl%";
    //redirect to the play
    window.location = href.replaceAll("%playname%",playName).replaceAll("%thumbnail%",encodeURIComponent(imageURL)).replaceAll("%imageurl%",encodeURIComponent(imageURL));       
  }

  function layoutPlays(data){
    //template for 1 play
     var template = "<div class=\"thumbnail span3\">" +
        "<img alt=\"\" src=\"%imageurl%\" style=\"width: 100%;\"/>"+
        "<div class=\"caption\">" +
          "<h3>%playname%</h3>" +
          "<p><a href=\"#\" onclick=\"pushHistory('%playname%','%playurl%')\" class=\"btn btn-primary\">View Play</a></p>" +
        "</div>" +
      "</div>";
      
      //for each play in the json file
      $.each( data, function( key, value ) {
          var PlayHTML = template;
          //replace the tokens with the actual values in the json file
          PlayHTML = PlayHTML.replaceAll("%playname%",data[key].PlayName).replaceAll("%thumbnail%",encodeURIComponent(data[key].URLToImage)).replaceAll("%imageurl%",data[key].URLToImage).replaceAll("%playurl%",encodeURIComponent(data[key].URLToImage))
          
          //set the play to the correct menu option
          switch(data[key].Menu){
                case "Offense": 
                $("#OffensePlayCatalog").append(PlayHTML);
                 break;
                case "Defense": 
                $("#DefensePlayCatalog").append(PlayHTML);
                 break;                      
                case "Special": 
                $("#SpecialPlayCatalog").append(PlayHTML);
                 break;
                default: 
                  alert("Cant find this menu, check your play.json file");
                 break;
          }
      });
  }

  //if very first time, this saves the URL they enter into localStorage
  function SavePlaybookURL(){
    localStorage.setItem("playbookURL",$("#playbookURL").val())
    $("#getPlaybookURLDiv").hide();
  }

  //when page is first loaded, once everything is ready
  $(document).ready(function(){
    //try to lookup the playbook
    $("#history").html(localStorage.getItem("history"));
    var playbookURL = localStorage.getItem("playbookURL");
    console.log("Playbook Loaded:" + playbookURL);

    //if the playbook is not found
    if(playbookURL == undefined || playbookURL == ""){
        //show the div to get the playbook URL
        $("#getPlaybookURLDiv").show();
    }else{
        //hide playbook URL div
        $("#getPlaybookURLDiv").hide();

        //get the JSON playbook file
        $.ajax({
          url: playbookURL,
          dataType: "jsonp", 
          type: "GET",
          jsonpCallback: 'plays', 
          contentType: "application/json; charset=utf-8",
          success: function (result, status, xhr) {
              //if the file is successfully retrieved
              layoutPlays(result);
          },
          error: function (xhr, status, error) {
              //if the file isnt retrieved show an error in the console
              console.log("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
          }
        });
        //if this is the first load of the page, open the sidebar nav.
        openNav();
    }
  });
      