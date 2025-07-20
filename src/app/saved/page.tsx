import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function FavoritesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return <div>Please login</div>;

  const savedTemplates = await prisma.savedTemplate.findMany({
    where: { userId: session.user.id },
    include: {
      template: true,
    },
  });

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-bold">My Favorites</h1>
      {savedTemplates.map(({ template }) => (
        <div key={template.id} className="border p-4">
          <h2 className="text-lg font-semibold">{template.category}</h2>
          <a href={`/template/${template.id}`} className="text-blue-500 underline">View</a>
        </div>
      ))}
    </div>
  );
}
