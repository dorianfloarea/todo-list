class BaseModel {
  constructor(data) {
    this.id = this.guid();
    this.data = this.sanitize(data);
  }

  static get storageSpace() {
    return null;
  }

  sanitize(data) {
    return data;
  };
  guid() {
    const s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    };

    return s4() + s4() + '-' +
      s4() + '-' +
      s4() + '-' +
      s4() + '-' +
      s4() + s4() + s4();
  };
}

module.exports = BaseModel;
