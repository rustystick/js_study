class GitHub{
  construction(){
    thist.client_id = '7a97ee7932fab296b2cd';
    this.client_secret = '1dd3b52cd3c88b8bc63c2e86dd856eac67a84708';
  }

  async getUser(user){
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_Secret=${this.client_secret}`);

    const profile = await profileResponse.json();

    return{
      profile: profile
    }
  }

}