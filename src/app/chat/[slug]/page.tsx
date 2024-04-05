// This is a dynamic route that will match any path that starts with /chat/ and has a second segment.
//This page will display messages for a specific session from past sessions.

export default function Page({ params }: { params: { slug: string } }) {
    return <div>My Post: {params.slug}</div>
  }