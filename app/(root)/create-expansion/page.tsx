import PostExpand from "@/components/forms/PostExpand";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page() {

  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect('/onboarding');


  return (
      <>
      <h1 className="head-text"> Expand An Idea</h1>
      <PostExpand userId={userInfo._id} />
      </>
    )
}

export default Page;