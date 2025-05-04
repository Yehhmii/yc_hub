import Link from 'next/link'
import Image from 'next/image'
import { auth, signIn, signOut } from '@/auth'

const Navbar = async () => {
    const session = await auth()

  return (
    <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
        <nav className='flex items-center justify-between'>
            <Link href="/">
                <Image src="/logo.jpeg" alt="Logo" width={24} height={20} />
            </Link>

            <div className='flex items-center gap-5 text-black'>
                {session && session?.user ? (
                    <>
                        <Link href="/startup/create">
                            <span>Create</span>
                        </Link>

                        <form action={async () => {
                            'use server';

                            await signOut( { redirectTo: '/' });
                        }}>
                            <button type='submit'>Logout</button>
                        </form>

                        <Link href={`/user/${session?.user?.id}`} className='flex items-center gap-2'>
                            <span>{session?.user?.name}</span>
                        </Link> 
                    </>
                ) : (
                    <form action={async () => {
                        'use server'
                        await signIn('github');
                    }} >
                        <button type='submit'>
                            Login
                        </button>
                    </form>
                )}
            </div>
        </nav>
    </header>
  )
}

export default Navbar