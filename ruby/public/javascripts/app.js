;$(document).ready(function() {

  fetchUsers();

  $('#users').on('click', '.user .delete', function(event) {
    event.preventDefault();
    var id = $(event.target).data('id');
    $.post('/api/users/' + id, fetchUsers);
  });

  $('#submit').click(function(event) {
    event.preventDefault();

    var $form = $('form'),
        url = $form.attr('action' ),
        user = {};

    user.name = $('#name').val();
    user.job = $('#job').val();
    user.twitter = $('#twitter').val();
    user.gravatar = "FOOO";

    $.post(url, JSON.stringify(user), function(data) {
//      fetchUsers();
      $form[0].reset();
    });
  });

  function fetchUsers() {
    $('#users').html("");
    $.get('/api/users', function(users) {
      if(users.length > 0) {
        for(var i = 0; i < users.length; i++) {
          $('#users').append(getUserHtml(users[i]));
        }
      } else {
        $('#users').append("<h1>No Users :(");
      }
    });
  }

  function getUserHtml(user) {
    var html = "";

    html += "<div class='row user'>";
    html += "  <div class='two columns number'><h1>" + user.id + ".</h1></div>";
    html += "  <div class='ten columns'>";
    html += "    <img class='gravatar' src='https://secure.gravatar.com/avatar/" + user.gravatar + "?s=120&d=retro' />";
    html += "    <h2>" + user.name + "</h2>";
    html += "    <h3 class='subheader'>" + user.job + "</h3>";
    html += "    <h3 class='subheader'><a href='http://twitter.com/" + user.twitter + "'>@" + user.twitter + "</a></h3>";
    html += "  </div>";
    html += "  <a href='#' class='delete' data-id='" + user.id + "'>X</a>";
    html += "</div>";

    return html;
  }
});
