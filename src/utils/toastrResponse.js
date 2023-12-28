import toastr from "toastr";
toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: "toast-bottom-left",
  preventDuplicates: false,
  onclick: undefined,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "2000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};

export const toastSuccess = (message) => {
  toastr.remove();
  toastr.options.positionClass = "toast-top-right";
  toastr.success(message);
};
export const toastError = (message) => {
  toastr.remove();
  toastr.options.positionClass = "toast-top-right";
  toastr.error(message);
};