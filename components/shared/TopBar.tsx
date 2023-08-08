import Link from 'next/link'
import Image from 'next/image'
import { SignedIn } from '@clerk/nextjs/app-beta'
import { OrganizationSwitcher, SignOutButton } from '@clerk/nextjs' 
import {dark} from '@clerk/themes'
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
        <OrganizationSwitcher
          
          appearance={{
            baseTheme: dark,
            elements: {
              orginizationSwitcherTrigger: "py-2 px-4"
            }
          }}
        />
      </div>
    </nav>
  )

}

export default TopBar