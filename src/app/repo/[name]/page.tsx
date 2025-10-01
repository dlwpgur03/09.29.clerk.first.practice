import Link from 'next/link'

type RepoPageProps = {
  params: { name: string }
}

export default function RepoPage({ params }: RepoPageProps) {
  return (
    <div className="flex flex-col justify-start items-start max-w-lg">
      <h1>{params.name}</h1>
      <Link
        href="/repo"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Back to Repositories
      </Link>
    </div>
  )
}
