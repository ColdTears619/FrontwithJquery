$(document).ready(function () {
  // Insert data
  $('#insertBtn').on('click', function () {
    var name = $('#nameInput').val();
    var email = $('#emailInput').val();

    if (name && email) {
      $.ajax({
        url: 'https://jsonplaceholder.typicode.com/posts',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ name: name, email: email }),
        success: function (response) {
          
          var newRow = '<tr>' +
            '<td>' + response.name + '</td>' +
            '<td>' + response.email + '</td>' +
            '<td><button class="btn btn-danger deleteBtn">Delete</button></td>' +
            '</tr>';

          $('#dataTable tbody').append(newRow);

          // Clear input fields after insertion
          $('#nameInput').val('');
          $('#emailInput').val('');
        },
        error: function (error) {
          console.error('Error inserting data:', error);
        }
      });
    } else {
      alert('Please enter both name and email.');
    }
  });

  // Delete row
  $(document).on('click', '.deleteBtn', function () {
    var row = $(this).closest('tr');
    var name = row.find('td:first').text();
    var email = row.find('td:nth-child(2)').text();

    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/posts/1',
      method: 'DELETE',
      contentType: 'application/json',
      data: JSON.stringify({ name: name, email: email }),
      success: function (response) {
        row.remove();
      },
      error: function (error) {
        console.error('Error deleting data:', error);
      }
    });
  });

  // Load data
  function loadData() {
    $.ajax({
      url: 'http://jsonplaceholder.typicode.com/users',
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        updateTable(data);
      },
      error: function (error) {
        console.error('Error fetching data:', error);
      }
    });
  }

  // Function to update the table with fetched data
  function updateTable(data) {
    var tbody = $('#dataTable tbody');
    tbody.empty();

    $.each(data, function (index, record) {
      var row = '<tr>' +
        '<td>' + record.name + '</td>' +
        '<td>' + record.email + '</td>' +
        '<td><button class="btn btn-danger deleteBtn">Delete</button></td>' +
        '</tr>';

      tbody.append(row);
    });
  }

  // Load data on page load
  loadData();
});
