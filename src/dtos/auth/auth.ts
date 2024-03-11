export class AuthDTO {
    email: string;
    id: string;
    isActivated: boolean;

    constructor(model: { email: string, _id: string, isActivated: boolean }) {
      this.email = model.email;
      this.id = model._id;
      this.isActivated = model.isActivated;
    }
}