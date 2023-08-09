import Link from 'next/link'
import Image from 'next/image'
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  UserProfile
} from "@clerk/nextjs";import { OrganizationSwitcher, SignOutButton } from '@clerk/nextjs' 
import { dark } from '@clerk/themes'
import User from '@/lib/models/user.model';

function TopBar() {
  
  return (
    <nav className='topbar'>
      <Link href="/" className='flex items-center gap-4'>
        <Image src='/assets/logo.svg' width={28} height={28} alt='logo' />
        <p className='text-heading3-bold text-light-1 max-xs:hidden'>Expand</p>
      </Link>
      <div className='flex items-center gap-1'>
        <div className='block md:hidden'>
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image src='/assets/logout.svg' width={24} height={24} alt='signout' />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <UserButton
          afterSignOutUrl="/"
          userProfileMode='modal'
          showName={true}
         
          appearance={{
            baseTheme: dark,
            layout: {
              shimmer: true,
           }
            
          }}

        />
        <p className='text-white'>{}</p>

      </div>
    </nav>
  )

}

export default TopBar