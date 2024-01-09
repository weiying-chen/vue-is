import axios from 'axios';

const getGitHubRepos = async (username, perPage = 10) => {
  try {
    const countResponse = await axios.get(`https://api.github.com/users/${username}`);
    const totalCount = countResponse.data.public_repos;
    const totalPages = Math.ceil(totalCount / perPage);
    const randomPage = totalPages > 1 ? Math.floor(Math.random() * totalPages) + 1 : 1;

    const repoResponse = await axios.get(`https://api.github.com/users/${username}/repos`, {
      params: {
        page: randomPage,
        per_page: perPage,
        sort: 'updated',
      }
    });

    return repoResponse.data;
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error);
    return [];
  }
}

export default getGitHubRepos;
