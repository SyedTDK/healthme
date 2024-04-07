// This is a dynamic route that will match any path that starts with /chat/ and has a second segment.
//This page will display messages for a specific session from past sessions.

//Fetch messages for the specific session
const getMessages = async (sessionId: number) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        sessionId: sessionId
      }
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
}

export default async function Page({ params }: { params: { slug: number } }) {
  // Fetch messages for the specific session
  const sessionId = params.slug;
  const messages = getMessages(sessionId);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">Chat Session</h1>
        <p className="mt-3 text-2xl">Session ID: {params.slug}</p>
        <div className="mt-3"> {/* Display Messages */}
          {(messages as unknown as any[]).map((message, index) => (
            <div key={index} className="flex justify-end mb-2">
              <div className="bg-blue-500 text-white rounded-lg p-2 max-w-xs">{message}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );

  }