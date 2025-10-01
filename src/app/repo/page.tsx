import { Repository } from '@/types/repo'
import Link from 'next/link'
import { FaStar, FaCodeBranch, FaEye } from 'react-icons/fa'

const username = 'dlwpgur03'
const token = process.env.GITHUB_TOKEN

export default async function ReposPage() {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`,
    {
      headers: {
        Authorization: `token ${token}`,
      },
    }
  )
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const repos = await response.json()
  console.log(repos)
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Github Repositories of {username}
      </h2>
      <ul>
        {repos.map((repo: Repository) => (
          <li key={repo.id} className="mb-4 p-4 border border-white rounded-lg hover:shadow-lg transition-shadow">
            <Link href={`/repo/${repo.name}`}>
              <h3 className="text-xl font-bold">{repo.name}</h3>
              <p>{repo.description}</p>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  <FaStar /> {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <FaCodeBranch /> {repo.forks_count}
                </span>
                <span className="flex items-center gap-1">
                  <FaEye /> {repo.watchers_count}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
