import toastr from 'toastr'

export const errorHandler = function (error) {
  if (error) {
    toastr.error(`Error ${error.response.status} - ${error.response.statusText}`);
  }
}

export const setToken = function (token) {
  localStorage.setItem('access_token', token);
}

export const getToken = function () {
  return localStorage.getItem('access_token');
}