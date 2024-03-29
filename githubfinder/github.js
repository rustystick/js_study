class GitHub{
  constructor(){
    this.client_id = '7a97ee7932fab296b2cd';
    this.client_secret = '1dd3b52cd3c88b8bc63c2e86dd856eac67a84708';
    this.repos_count = 5;
    this.repos_sort = 'created: asc'
  }


  async getUser(user){
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);


    const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repo_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const profile = await profileResponse.json();
    const repos = await repoResponse.json();

    return{
      profile: profile,
      repos: repos
    }
  }

}