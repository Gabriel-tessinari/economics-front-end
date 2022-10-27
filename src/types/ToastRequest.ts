class ToastRequest {
  message: string;
  severity: string;
  show: boolean;
  status: number;

  constructor(status?: number, message?: string) {
    this.severity = '';
    this.show = false;
    message ? this.message = message : this.message = '';
    status ? this.status = status : this.status = 0;
  }

  config() {
    if(this.status == 200 || this.status == 201) {
      this.severity = 'success';
    } else if(this.status == 422) {
      this.severity = 'warning';
    } else {
      this.severity = 'error';
      this.message = 'Algo de errado ocorreu. Tente novamente.';
    }
  }

  toggleShow() {
    this.show = !this.show;
  }
}

export default ToastRequest;