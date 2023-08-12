import ExpandCard from "@/components/cards/ExpandCard";
import { fetchExpandById } from "@/lib/actions/expand.action";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {

  if (!params.id) return null
    
  const user = await currentUser();

  if (!user) return null
    
  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding")

  const expand = await fetchExpandById(params.id);
    
  return (
    <section className="relative">
    <div>
      <ExpandCard
        key={expand._id}
        id={expand._id}
        currentUserId={user?.id || ""}
        parentId={expand.parentId}
        content={expand.text}
        author={expand.author}
        community={expand.community}
        createdAt={expand.createdAt}
        comments={expand.children}
      />
    </div>
  </section>     
    )
};

export default Page;
