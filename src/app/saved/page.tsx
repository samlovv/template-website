import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import ProfileCategorySelector from '@/components/ProfileCategorySelector';
import FavoritesComp from '@/components/FavoritesComp';


export const metadata = {
  title: 'Your Favorites | TemplateUI',
}


export default async function FavoritesPage() {
  const session = await getServerSession(authOptions);


  if (!session?.user?.id) return <div>Please login</div>;

  const savedTemplates= await prisma.savedTemplate.findMany({
    where: { userId: session.user.id },
    include: {
      template: {
        select: {
          id: true,
          category: true,
          previewUrl: true,
          view: true,
          user: {
            select: {
              nickname: true,
            },
          },
          _count: {
            select: {
                savedBy: true,
            },
            },
        }
    }
   }
  });
  

  return (
    <div className='mt-20 flex min-h-screen'>
    {/* <div className="grid gap-4">
      <h1 className="text-2xl font-bold">My Favorites</h1>
      {savedTemplates.map(({ template }) => (
        <div key={template.id} className="border p-4">
          <h2 className="text-lg font-semibold">{template.category}</h2>
          <a href={`/template/${template.id}`} className="text-blue-500 underline">View</a>
        </div>
      ))}
    </div> */}
    
          <div className='w-1/4 hidden lg:flex'>
            <ProfileCategorySelector/>
          </div>
          <FavoritesComp data={savedTemplates} />
    </div>
  );
}
