
angular.module('nodeTodo', [])
.controller('mainController', ($scope, $http) => {
  $scope.formData = {};
  $scope.blogData = {};
  // Get all todos
  $http.get('/api/v1/blog')
  .success((data) => {
    $scope.blogData = data;
    console.log(data);
  })
  .error((error) => {
    console.log('Error: ' + error);
  });
  // Create a new todo
  $scope.createBlog = () => {
    $http.post('/api/v1/blog', $scope.formData)
    .success((data) => {
      $scope.formData = {};
      $scope.blogData = data;
      console.log(data);
    })
    .error((error) => {
      console.log('Error: ' + error);
    });
  };
  // Delete a todo
  $scope.deleteBlog = (blogID) => {
    $http.delete('/api/v1/blog/' + blogID)
    .success((data) => {
      $scope.blogData = data;
      console.log(data);
    })
    .error((data) => {
      console.log('Error: ' + data);
    });
  };
});
